export interface Q1Item {
  arabic: string;
  urdu: string;
}

export interface Q2Item {
  urdu: string;
  arabic: string;
}

export interface Q3Item {
  word: string;
  explanation: string;
}

export interface Q4Item {
  incomplete: string;
  complete: string;
}

export interface Q5Item {
  withoutHarakat: string;
  withHarakat: string;
}

export interface Q6Item {
  letters: string;
  word: string;
}

export interface Q7Item {
  arabic: string;
  urdu: string;
  highlight?: string;
}

export interface GrammarRuleItem {
  arabic: string;
  urdu: string;
  explanation?: string;
}

export interface Sabaq {
  sabaqNumber: number;
  titleUrdu: string;
  titleEnglish: string;
  introText?: string;
  importantNotes?: string[];
  lessonVocab: Q1Item[];        // دائیں جانب کے تمام بنیادی الفاظ و معانی (Words and Meanings at the right side of the lesson)
  q1Vocab: Q1Item[];            // مشق - سوال 1: عربی الفاظ کا مطلب بتائیں
  q2UrduToArabic?: Q2Item[];    // مشق - سوال 2: الفاظ کو عربی میں کیا کہتے ہیں
  q3Explanation?: Q3Item[];     // مشق - سوال 3: ان الفاظ کے بارے میں کیا جانتے ہیں
  q4MissingLetters: string[];   // مشق - سوال 4: نامکمل الفاظ مکمل کریں
  q5Harakat: string[];          // مشق - سوال 5: مناسب حرکات لگائیں
  q6RootWords: Q6Item[];        // مشق - سوال 6: حروف ملا کر ایک لفظ بنائیں
  q7Verses: Q7Item[];           // مشق - سوال 7: قرآنی قطعات و آیات کا ترجمہ
  grammarExercises?: {          // فارمولا / اضافی مشقیں (سبق 12 تا 19)
    title: string;
    items: GrammarRuleItem[];
  }[];
}
