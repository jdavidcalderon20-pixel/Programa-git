import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// ─── AUTH ───────────────────────────────────────────────────────────────────

export const registerUser = async (email, password, displayName) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(cred.user.uid, { email, displayName });
  return cred.user;
};

export const loginUser = async (email, password) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  // We'll update the sessionId in AuthContext after getting the credential
  return cred;
};

export const logoutUser = () => signOut(auth);

export { onAuthStateChanged };

// ─── USER PROFILE ────────────────────────────────────────────────────────────

export const createUserProfile = async (uid, data) => {
  const ref = doc(db, "usuarios", uid);
  await setDoc(ref, {
    displayName: data.displayName || "Estudiante",
    email: data.email,
    xp: 0,
    nivel: 0,
    streak: 0,
    lastStudyDate: null,
    isPro: false,
    proStartDate: null,
    proEndDate: null,
    sessionId: null,
    subscriptionDate: null,
    isBetaTester: false,
    createdAt: new Date().toISOString(),
  });
};

export const getUserProfile = async (uid) => {
  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

export const updateUserXP = async (uid, xpToAdd) => {
  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const data = snap.data();
  const newXP = (data.xp || 0) + xpToAdd;
  const nivel = calcLevel(newXP);
  // Update streak
  const today = new Date().toDateString();
  const lastDate = data.lastStudyDate;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const streakNew = lastDate === yesterday ? (data.streak || 0) + 1
    : lastDate === today ? (data.streak || 0)
    : 1;
  await updateDoc(ref, { xp: newXP, nivel, streak: streakNew, lastStudyDate: today });
  return { xp: newXP, nivel, streak: streakNew };
};

export const calcLevel = (xp) => {
  if (xp >= 1500) return 5;
  if (xp >= 900) return 4;
  if (xp >= 500) return 3;
  if (xp >= 250) return 2;
  if (xp >= 100) return 1;
  return 0;
};

export const LEVEL_NAMES = ['Recluta', 'Aprendiz', 'Estudiante', 'Avanzado', 'Experto', 'Maestro'];
export const LEVEL_XP = [0, 100, 250, 500, 900, 1500];
export const LEVEL_COLORS = ['#94a3b8', '#60a5fa', '#34d399', '#f59e0b', '#f87171', '#a78bfa'];

// ─── DAILY MISSIONS ──────────────────────────────────────────────────────────

const todayKey = () => new Date().toISOString().split('T')[0];

export const getDailyMissionsStatus = async (uid) => {
  const ref = doc(db, "misiones", `${uid}_${todayKey()}`);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : {};
};

export const completeMission = async (uid, missionId, xpReward) => {
  const dayKey = todayKey();
  const ref = doc(db, "misiones", `${uid}_${dayKey}`);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};
  if (data[missionId]) return false; // already done
  await setDoc(ref, { ...data, [missionId]: true, date: dayKey }, { merge: true });
  await updateUserXP(uid, xpReward);
  return true;
};

// ─── EXAM HISTORY ────────────────────────────────────────────────────────────

export const saveExamHistory = async (uid, examData) => {
  const ref = collection(db, "historial");
  await addDoc(ref, { uid, ...examData, createdAt: new Date().toISOString() });
};

export const getExamHistory = async (uid) => {
  const q = query(collection(db, "historial"), where("uid", "==", uid));
  const snap = await getDocs(q);
  const results = [];
  snap.forEach(d => results.push({ id: d.id, ...d.data() }));
  results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return results;
};

export const updateExamTags = async (docId, tags) => {
  await updateDoc(doc(db, "historial", docId), { tags });
};

// ─── LEGACY (keep for compatibility) ─────────────────────────────────────────

export const saveResult = async (resultData) => {
  try {
    await addDoc(collection(db, "resultados"), { ...resultData, creadoEn: new Date() });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getResultsByStudentName = async (studentName) => {
  try {
    const q = query(collection(db, "resultados"), where("studentName", "==", studentName));
    const snap = await getDocs(q);
    const results = [];
    snap.forEach(d => results.push({ id: d.id, ...d.data() }));
    results.sort((a, b) => new Date(b.date) - new Date(a.date));
    return results;
  } catch (e) {
    return [];
  }
};
