import React from 'react';
import { Sabaq } from '../types';

interface SabaqCardProps {
  sabaq: Sabaq;
  isFirst?: boolean;
  searchQuery?: string;
  showMainBanner?: boolean;
}

export const SabaqCard: React.FC<SabaqCardProps> = ({
  sabaq,
  searchQuery = '',
  showMainBanner = true,
}) => {
  const highlightMatch = (text: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.trim()})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={i} className="bg-amber-200 text-amber-950 rounded px-1 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="sabaq-page-card bg-white p-6 sm:p-8 md:p-10 max-w-4xl mx-auto mb-8 rounded-xl shadow-xs border border-slate-200 page-break-inside-avoid print:p-0 print:border-none print:shadow-none print:mb-8 transition-shadow hover:shadow-sm">
      {/* Top Banner */}
      {showMainBanner && sabaq.sabaqNumber === 1 && (
        <div className="mb-6 rounded-xl bg-slate-50 border border-slate-200/80 py-5 px-6 text-center print:bg-slate-50">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2 font-latin">
            Unit 1 Complete Reference (Sabaq 1 to 19)
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-arabic tracking-wide">
            معلم القرآن یونٹ 1 - مکمل حل شدہ مشقیں (1 تا 19)
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-urdu">
            تمام اسباق کی مشقوں کا مستند و جامع حل بغیر کسی غلطی کے
          </p>
        </div>
      )}

      {/* Lesson Title Header with Professional Indigo Bar */}
      <div className="mb-6 border-b-2 border-indigo-600 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-latin tracking-tight">
            {sabaq.titleEnglish}
          </h2>
        </div>
        <span className="text-xl font-bold text-indigo-900 font-arabic">
          {sabaq.titleUrdu}
        </span>
      </div>

      {/* سوال 1: عربی الفاظ کا اردو میں مطلب */}
      {sabaq.q1Vocab && sabaq.q1Vocab.length > 0 && (
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Q1. Vocabulary Meaning (الفاظ و معانی)
            </h3>
            <span className="text-xs font-semibold text-slate-600 font-urdu">
              سوال 1: عربی الفاظ کا مطلب بتائیں ({sabaq.q1Vocab.length})
            </span>
          </div>

          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <table className="w-full text-right border-collapse" dir="rtl">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-2.5 px-4 font-bold text-slate-800 text-base border-l border-slate-200 w-1/2 font-arabic">
                    عربی لفظ
                  </th>
                  <th className="py-2.5 px-4 font-bold text-slate-800 text-base w-1/2 font-arabic">
                    اردو معنی / مطلب
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sabaq.q1Vocab.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 text-lg font-semibold text-slate-900 border-l border-slate-200 font-arabic leading-relaxed">
                      {highlightMatch(item.arabic)}
                    </td>
                    <td className="py-2.5 px-4 text-sm font-medium text-slate-700 font-urdu leading-loose">
                      {highlightMatch(item.urdu)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* سوال 2: اردو الفاظ کی عربی */}
      {sabaq.q2UrduToArabic && sabaq.q2UrduToArabic.length > 0 && (
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Q2. Urdu to Arabic (عربی ترجمہ)
            </h3>
            <span className="text-xs font-semibold text-slate-600 font-urdu">
              سوال 2: ان الفاظ کو عربی میں کیا کہتے ہیں؟
            </span>
          </div>

          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <table className="w-full text-right border-collapse" dir="rtl">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-2.5 px-4 font-bold text-slate-800 text-base border-l border-slate-200 w-1/2 font-arabic">
                    اردو لفظ
                  </th>
                  <th className="py-2.5 px-4 font-bold text-slate-800 text-base w-1/2 font-arabic">
                    عربی لفظ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sabaq.q2UrduToArabic.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 text-sm font-medium text-slate-700 border-l border-slate-200 font-urdu">
                      {highlightMatch(item.urdu)}
                    </td>
                    <td className="py-2.5 px-4 text-lg font-bold text-indigo-950 font-arabic">
                      {highlightMatch(item.arabic)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* سوال 3: تفصیلی تعارف و مفہوم */}
      {sabaq.q3Explanation && sabaq.q3Explanation.length > 0 && (
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Q3. Explanations (تفصیلی معلومات)
            </h3>
            <span className="text-xs font-semibold text-slate-600 font-urdu">
              سوال 3: ان الفاظ کے بارے میں کیا جانتے ہیں؟
            </span>
          </div>

          <div className="bg-slate-50/80 p-4 sm:p-5 rounded-lg border border-slate-200 space-y-3" dir="rtl">
            {sabaq.q3Explanation.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-md border border-slate-200/80 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start"
              >
                <span className="text-base font-bold text-indigo-900 font-arabic min-w-[100px] shrink-0 border-b sm:border-b-0 sm:border-l border-slate-200 sm:pl-3 pb-1 sm:pb-0">
                  {highlightMatch(item.word)}:
                </span>
                <span className="text-sm text-slate-700 font-urdu leading-relaxed">
                  {highlightMatch(item.explanation)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* سوال 4: نامکمل الفاظ مکمل کریں */}
      {sabaq.q4MissingLetters && sabaq.q4MissingLetters.length > 0 && (
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Q4. Completed Words (نامکمل الفاظ کی تکمیل)
            </h3>
            <span className="text-xs font-semibold text-slate-600 font-urdu">
              سوال 4: نامکمل الفاظ کو مکمل کریں ({sabaq.q4MissingLetters.length})
            </span>
          </div>

          <div className="bg-slate-50/70 p-4 sm:p-5 rounded-lg border border-slate-200">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-right" dir="rtl">
              {sabaq.q4MissingLetters.map((word, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 bg-white rounded-md border border-slate-200 text-base font-semibold text-slate-900 font-arabic shadow-2xs"
                >
                  <span className="text-xs font-sans text-slate-600 font-semibold">{idx + 1}.</span>
                  <span>{highlightMatch(word)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* سوال 5: مناسب حرکات و اعراب لگائیں */}
      {sabaq.q5Harakat && sabaq.q5Harakat.length > 0 && (
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Q5. Diacritics & Harakat (اعراب و حرکات)
            </h3>
            <span className="text-xs font-semibold text-slate-600 font-urdu">
              سوال 5: مناسب حرکات و اعراب لگائیں ({sabaq.q5Harakat.length})
            </span>
          </div>

          <div className="bg-slate-50/70 p-4 sm:p-5 rounded-lg border border-slate-200">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-right" dir="rtl">
              {sabaq.q5Harakat.map((word, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-center px-3 py-2 bg-white rounded-md border border-slate-200 text-lg font-bold text-indigo-950 font-arabic shadow-2xs"
                >
                  {highlightMatch(word)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* سوال 6: مادہ / حروفِ اصلیہ ملا کر لفظ بنانا */}
      {sabaq.q6RootWords && sabaq.q6RootWords.length > 0 && (
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Q6. Root Letters (مادہ و حروفِ اصلیہ)
            </h3>
            <span className="text-xs font-semibold text-slate-600 font-urdu">
              سوال 6: حروف ملا کر ایک لفظ بنائیں
            </span>
          </div>

          <div className="bg-slate-50/70 p-4 sm:p-5 rounded-lg border border-slate-200">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-right" dir="rtl">
              {sabaq.q6RootWords.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-3.5 py-2 bg-white rounded-md border border-slate-200 text-base font-medium text-slate-900 font-arabic shadow-2xs"
                >
                  <span className="text-xs font-sans text-indigo-700 font-bold px-2 py-0.5 bg-indigo-50 rounded border border-indigo-100">
                    مادہ
                  </span>
                  <span>
                    <span className="font-bold text-indigo-800">{highlightMatch(item.letters)}</span>
                    <span className="mx-2 text-slate-400">➔</span>
                    <span className="font-bold text-slate-900">{highlightMatch(item.word)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* سوال 7: قرآنی تراکیب، قطعات و آیات */}
      {sabaq.q7Verses && sabaq.q7Verses.length > 0 && (
        <div className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Q7. Quranic Verses & Translations (قرآنی قطعات و آیات کا ترجمہ)
            </h3>
            <span className="text-xs font-semibold text-slate-600 font-urdu">
              سوال 7: قرآنی آیات کا ترجمہ ({sabaq.q7Verses.length})
            </span>
          </div>

          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <table className="w-full text-right border-collapse" dir="rtl">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-2.5 px-4 font-bold text-slate-800 text-base border-l border-slate-200 w-1/2 font-arabic">
                    قرآنی آیت / قطعہ
                  </th>
                  <th className="py-2.5 px-4 font-bold text-slate-800 text-base w-1/2 font-arabic">
                    اردو ترجمہ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sabaq.q7Verses.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 text-lg font-semibold text-slate-900 border-l border-slate-200 font-arabic leading-relaxed">
                      {highlightMatch(item.arabic)}
                    </td>
                    <td className="py-2.5 px-4 text-sm font-medium text-slate-700 font-urdu leading-loose">
                      {highlightMatch(item.urdu)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
