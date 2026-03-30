import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged, getUserProfile, createUserProfile, updateUserXP, completeMission, getDailyMissionsStatus, LEVEL_XP, LEVEL_NAMES, LEVEL_COLORS, db } from '../firebase';
import { loginUser, registerUser, logoutUser } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [dailyMissions, setDailyMissions] = useState({});
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let profileUnsub = null;

    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Initial profile fetch or creation
        let profile = await getUserProfile(user.uid);
        if (!profile) {
          await createUserProfile(user.uid, { email: user.email, displayName: user.displayName || 'Estudiante' });
          profile = await getUserProfile(user.uid);
        }

        // --- SESSION SECURITY AND PRO EXPIRATION LISTENER ---
        profileUnsub = onSnapshot(doc(db, "usuarios", user.uid), async (docSnap) => {
          if (!docSnap.exists()) return;
          const data = docSnap.data();

          // 1. Session Check (Anti-Account Sharing)
          const localSessionId = localStorage.getItem(`session_${user.uid}`);
          if (data.sessionId && localSessionId && data.sessionId !== localSessionId) {
            alert('🚫 Sesión cerrada: Se ha detectado un inicio de sesión en otro dispositivo.');
            logout();
            return;
          }

          // 2. Pro Expiration Check
          if (data.isPro && data.proEndDate) {
            const now = new Date();
            const endDate = data.proEndDate.toDate ? data.proEndDate.toDate() : new Date(data.proEndDate);
            if (now > endDate) {
              await updateDoc(doc(db, "usuarios", user.uid), { isPro: false });
              alert('⏰ Tu suscripción PRO ha vencido. ¡Renueva ahora para seguir disfrutando de los beneficios!');
              // profile state will update from next snapshot or manually below
            }
          }

          setUserProfile(data);
        });

        const missions = await getDailyMissionsStatus(user.uid);
        setDailyMissions(missions);
      } else {
        setUserProfile(null);
        setDailyMissions({});
        if (profileUnsub) profileUnsub();
      }
      setAuthLoading(false);
    });
    return () => {
      unsub();
      if (profileUnsub) profileUnsub();
    };
  }, []);

  const login = async (email, password) => {
    const cred = await loginUser(email, password);
    const user = cred.user;

    // Generate new session ID
    const newSessionId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(`session_${user.uid}`, newSessionId);
    
    // Update sessionId in Firestore
    await updateDoc(doc(db, "usuarios", user.uid), { sessionId: newSessionId });
    
    let profile = await getUserProfile(user.uid);
    if (!profile) {
      await createUserProfile(user.uid, { email: user.email, displayName: user.displayName || 'Estudiante' });
      profile = await getUserProfile(user.uid);
    }
    setUserProfile(profile);
    const missions = await getDailyMissionsStatus(user.uid);
    setDailyMissions(missions);
    return user;
  };

  const register = async (email, password, displayName) => {
    const user = await registerUser(email, password, displayName);
    const profile = await getUserProfile(user.uid);
    setUserProfile(profile);
    setDailyMissions({});
    return user;
  };

  const logout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setUserProfile(null);
    setDailyMissions({});
  };

  const awardXP = async (amount) => {
    if (!currentUser) return;
    const updated = await updateUserXP(currentUser.uid, amount);
    if (updated) {
      setUserProfile(prev => ({ ...prev, xp: updated.xp, nivel: updated.nivel, streak: updated.streak }));
    }
  };

  const tryCompleteMission = async (missionId, xpReward) => {
    if (!currentUser || dailyMissions[missionId]) return false;
    const done = await completeMission(currentUser.uid, missionId, xpReward);
    if (done) {
      setDailyMissions(prev => ({ ...prev, [missionId]: true }));
      setUserProfile(prev => {
        if (!prev) return prev;
        const newXP = (prev.xp || 0) + xpReward;
        return { ...prev, xp: newXP };
      });
    }
    return done;
  };

  const getLevelInfo = (xp = 0) => {
    const nivel = userProfile?.nivel ?? 0;
    const currentXP = xp || userProfile?.xp || 0;
    const nextXP = LEVEL_XP[Math.min(nivel + 1, 5)];
    const currentLevelXP = LEVEL_XP[nivel];
    const progress = nivel >= 5 ? 100 : Math.round(((currentXP - currentLevelXP) / (nextXP - currentLevelXP)) * 100);
    return {
      nivel,
      name: LEVEL_NAMES[nivel],
      color: LEVEL_COLORS[nivel],
      currentXP,
      nextXP,
      progress: Math.max(0, Math.min(100, progress))
    };
  };

  const refreshProfile = async () => {
    if (!currentUser) return;
    const profile = await getUserProfile(currentUser.uid);
    setUserProfile(profile);
    const missions = await getDailyMissionsStatus(currentUser.uid);
    setDailyMissions(missions);
  };

  const value = {
    currentUser,
    userProfile,
    dailyMissions,
    authLoading,
    login,
    register,
    logout,
    awardXP,
    tryCompleteMission,
    getLevelInfo,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
