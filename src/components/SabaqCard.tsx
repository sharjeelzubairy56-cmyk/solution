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
  isFirst = false,
  searchQuery = '',
  showMainBanner = true,
}) => {
  const highlightMatch = (text: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.trim()})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={i} className="bg-amber-100 text-amber-950 rounded px-1 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="sabaq-page-card bg-white p-6 sm:p-8 md:p-10 max-w-4xl mx-auto mb-8 rounded-xl shadow-xs border border-slate-200 page-break-inside-avoid print:p-0 print:border-none print:shadow-none print:mb-8 transition-shadow hover:shadow-sm">
      {/* Top Banner - Polished Professional header */}
      {(showMainBanner || sabaq.sabaqNumber === 1) && (
        <div className="mb-6 rounded-xl bg-slate-50 border border-slate-200/80 py-5 px-6 text-center print:bg-slate-50">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2 font-latin">
            Unit 1 Solution Master Reference
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-arabic tracking-wide">
            معلم القرآن یونٹ 1 - مکمل حل شدہ مشقیں
          </h1>
        </div>
      )}

      {/* Lesson Title Header with Professional Indigo Border */}
      <div className="mb-6 border-b-2 border-indigo-600 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-latin tracking-tight">
            {sabaq.titleEnglish}
          </h2>
        </div>
        <span className="text-lg font-semibold text-slate-700 font-arabic">
          {sabaq.titleUrdu}
        </span>
      </div>

      {/* Section 1: Vocabulary Questions */}
      {sabaq.vocabulary.length > 0 && (
        <div className="mb-8">
          <div className="text-left mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Vocabulary Questions
            </h3>
            <span className="text-xs text-slate-600 font-urdu">الفاظ و معانی ({sabaq.vocabulary.length})</span>
          </div>

          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <table className="w-full text-right border-collapse" dir="rtl">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="py-2.5 px-4 font-bold text-slate-800 text-base border-l border-slate-200 w-1/2 font-arabic">
                    عربی لفظ
                  </th>
                  <th className="py-2.5 px-4 font-bold text-slate-800 text-base w-1/2 font-arabic">
                    اردو مطلب
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sabaq.vocabulary.map((item, idx) => (
                  <tr
                    key={item.id || idx}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-2.5 px-4 text-lg font-medium text-slate-900 border-l border-slate-200 font-arabic leading-relaxed">
                      {highlightMatch(item.arabic)}
                    </td>
                    <td className="py-2.5 px-4 text-sm font-normal text-slate-700 font-urdu leading-loose">
                      {highlightMatch(item.urdu)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 2: Missing Letters & Harakat */}
      {sabaq.missingLetters.length > 0 && (
        <div className="mb-8">
          <div className="text-left mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Missing Letters & Harakat
            </h3>
            <span className="text-xs text-slate-600 font-urdu">الفاظ بمع اعراب</span>
          </div>

          <div className="bg-slate-50/60 p-5 rounded-lg border border-slate-200">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right" dir="rtl">
              {sabaq.missingLetters.map((word, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 bg-white rounded-md border border-slate-200/70 text-lg font-semibold text-slate-900 font-arabic shadow-2xs"
                >
                  <span className="text-xs font-sans text-slate-600">{idx + 1}.</span>
                  <span>{highlightMatch(word)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Section 3: Root Words (Haroof) */}
      {sabaq.rootWords.length > 0 && (
        <div className="mb-8">
          <div className="text-left mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Root Words (Haroof)
            </h3>
            <span className="text-xs text-slate-600 font-urdu">حروفِ اصلیہ و مادہ</span>
          </div>

          <div className="bg-slate-50/60 p-5 rounded-lg border border-slate-200">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right" dir="rtl">
              {sabaq.rootWords.map((item, idx) => (
                <li
                  key={item.id || idx}
                  className="flex items-center justify-between px-3 py-2 bg-white rounded-md border border-slate-200/70 text-lg font-medium text-slate-900 font-arabic shadow-2xs"
                >
                  <span className="text-xs font-sans text-indigo-600 font-semibold px-2 py-0.5 bg-indigo-50 rounded border border-indigo-100">
                    مادہ
                  </span>
                  <span>
                    <span className="font-semibold text-indigo-900">{highlightMatch(item.letters)}</span>
                    <span className="mx-2 text-slate-300">:</span>
                    <span className="font-bold text-slate-900">{highlightMatch(item.word)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Section 4: Quranic Verses / Phrases */}
      {sabaq.verses.length > 0 && (
        <div className="mb-4">
          <div className="text-left mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider font-latin flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {sabaq.sabaqNumber === 13 ? 'Quranic Verses & Phrases' : 'Quranic Verses'}
            </h3>
            <span className="text-xs text-slate-600 font-urdu">قرآنی تراکیب و آیات ({sabaq.verses.length})</span>
          </div>

          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <table className="w-full text-right border-collapse" dir="rtl">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="py-2.5 px-4 font-bold text-slate-800 text-base border-l border-slate-200 w-1/2 font-arabic">
                    قرآنی لفظ/حصہ
                  </th>
                  <th className="py-2.5 px-4 font-bold text-slate-800 text-base w-1/2 font-arabic">
                    اردو ترجمہ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sabaq.verses.map((item, idx) => (
                  <tr
                    key={item.id || idx}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-2.5 px-4 text-lg font-semibold text-slate-900 border-l border-slate-200 font-arabic leading-relaxed">
                      {highlightMatch(item.arabic)}
                    </td>
                    <td className="py-2.5 px-4 text-sm font-normal text-slate-700 font-urdu leading-loose">
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
