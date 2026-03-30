import { mathContent } from './math';
import { readingContent } from './critical_reading';
import { socialContent } from './social_sciences';
import { naturalContent } from './natural_sciences';
import { englishContent } from './english';

export const STUDY_CONTENT = {
  [mathContent.name]: mathContent,
  [readingContent.name]: readingContent,
  [socialContent.name]: socialContent,
  [naturalContent.name]: naturalContent,
  [englishContent.name]: englishContent,
};
