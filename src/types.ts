export interface VocabItem {
  id: string;
  arabic: string;
  urdu: string;
}

export interface RootWordItem {
  id: string;
  letters: string; // e.g. "ش - ك - ر"
  word: string;    // e.g. "شُكْر"
}

export interface VerseItem {
  id: string;
  arabic: string;
  urdu: string;
}

export interface Sabaq {
  sabaqNumber: number;
  titleUrdu: string;
  titleEnglish: string;
  vocabulary: VocabItem[];
  missingLetters: string[];
  rootWords: RootWordItem[];
  verses: VerseItem[];
  hasSubsections?: boolean;
}

export type ViewMode = 'single' | 'all' | 'print-preview';
