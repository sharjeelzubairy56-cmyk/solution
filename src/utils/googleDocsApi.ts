import { SABAQS_DATA } from '../data/sabaqsData';

declare global {
  interface Window {
    google?: any;
  }
}

export interface GoogleDocsExportResult {
  success: boolean;
  documentId?: string;
  documentUrl?: string;
  error?: string;
}

export async function getGoogleAccessToken(clientId?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.oauth2) {
      reject(new Error('Google Identity Services script is loading or unavailable in this sandbox. You can use direct .doc download or copy format below!'));
      return;
    }

    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId || '309301827731-apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive.file',
        callback: (response: any) => {
          if (response.error !== undefined) {
            reject(new Error(response.error_description || response.error));
            return;
          }
          resolve(response.access_token);
        },
      });

      tokenClient.requestAccessToken({ prompt: 'consent' });
    } catch (err: any) {
      reject(err);
    }
  });
}

/**
 * Builds formatted text representation of all 19 Sabaqs.
 */
export function buildFormattedSabaqsText(): string {
  let docText = `معلم القرآن یونٹ 1 - مکمل حل شدہ مشقیں (سبق 1 تا 19)\n`;
  docText += `Muallim-ul-Quran Unit 1 - Complete Solved Exercises (Lessons 1 to 19)\n\n`;

  for (const sabaq of SABAQS_DATA) {
    docText += `==================================================\n`;
    docText += `${sabaq.titleEnglish} | ${sabaq.titleUrdu}\n`;
    docText += `==================================================\n\n`;

    if (sabaq.q1Vocab && sabaq.q1Vocab.length > 0) {
      docText += `[ سوال 1: عربی الفاظ کا اردو مطلب ]\n`;
      sabaq.q1Vocab.forEach((v, idx) => {
        docText += `${idx + 1}. ${v.arabic}  --->  ${v.urdu}\n`;
      });
      docText += `\n`;
    }

    if (sabaq.q2UrduToArabic && sabaq.q2UrduToArabic.length > 0) {
      docText += `[ سوال 2: الفاظ کا عربی ترجمہ ]\n`;
      sabaq.q2UrduToArabic.forEach((item, idx) => {
        docText += `${idx + 1}. ${item.urdu}  --->  ${item.arabic}\n`;
      });
      docText += `\n`;
    }

    if (sabaq.q3Explanation && sabaq.q3Explanation.length > 0) {
      docText += `[ سوال 3: تفصیلی تعارف و مفہوم ]\n`;
      sabaq.q3Explanation.forEach((item, idx) => {
        docText += `${idx + 1}. ${item.word}: ${item.explanation}\n`;
      });
      docText += `\n`;
    }

    if (sabaq.q4MissingLetters && sabaq.q4MissingLetters.length > 0) {
      docText += `[ سوال 4: نامکمل الفاظ کی تکمیل ]\n`;
      sabaq.q4MissingLetters.forEach((word, idx) => {
        docText += `${idx + 1}. ${word}\n`;
      });
      docText += `\n`;
    }

    if (sabaq.q5Harakat && sabaq.q5Harakat.length > 0) {
      docText += `[ سوال 5: اعراب و حرکات ]\n`;
      sabaq.q5Harakat.forEach((word, idx) => {
        docText += `${idx + 1}. ${word}\n`;
      });
      docText += `\n`;
    }

    if (sabaq.q6RootWords && sabaq.q6RootWords.length > 0) {
      docText += `[ سوال 6: حروف اصلیہ و مادہ ]\n`;
      sabaq.q6RootWords.forEach((r, idx) => {
        docText += `${idx + 1}. مادہ (${r.letters}) ➔ ${r.word}\n`;
      });
      docText += `\n`;
    }

    if (sabaq.q7Verses && sabaq.q7Verses.length > 0) {
      docText += `[ سوال 7: قرآنی تراکیب، قطعات و آیات کا ترجمہ ]\n`;
      sabaq.q7Verses.forEach((verse, idx) => {
        docText += `${idx + 1}. ${verse.arabic}  --->  ${verse.urdu}\n`;
      });
      docText += `\n`;
    }

    docText += `\n\n`;
  }
  return docText;
}

/**
 * Generates an editable HTML document that opens seamlessly in Google Docs and MS Word.
 */
export function downloadDocsHtmlFile(filename = 'Muallim_ul_Quran_Unit1_Complete_Sabaq_1_to_19.doc'): void {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Muallim-ul-Quran Unit 1 Solution</title>
      <style>
        body { font-family: Arial, sans-serif; direction: rtl; text-align: right; margin: 30px; }
        h1 { color: #1e1b4b; text-align: center; font-size: 24pt; }
        h2 { color: #4338ca; border-bottom: 2px solid #4338ca; padding-bottom: 5px; margin-top: 30px; }
        h3 { color: #3730a3; font-size: 14pt; margin-top: 15px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background-color: #f1f5f9; padding: 10px; border: 1px solid #cbd5e1; text-align: right; }
        td { padding: 8px 10px; border: 1px solid #cbd5e1; font-size: 13pt; }
        .arabic { font-family: 'Amiri', 'Traditional Arabic', serif; font-size: 16pt; font-weight: bold; }
        .urdu { font-family: 'Jameel Noori Nastaleeq', 'Urdu Typesetting', serif; font-size: 13pt; }
        .list-box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px; }
      </style>
    </head>
    <body>
      <h1>معلم القرآن یونٹ 1 - مکمل حل شدہ مشقیں (1 تا 19)</h1>
      <p style="text-align:center; color:#64748b;">Muallim ul Quran Unit 1 Solution Reference (Sabaq 1 to 19)</p>
      ${SABAQS_DATA.map(
        (sabaq) => `
        <div style="page-break-before: always; margin-top: 40px;">
          <h2>${sabaq.titleEnglish} | ${sabaq.titleUrdu}</h2>
          
          ${
            sabaq.q1Vocab && sabaq.q1Vocab.length > 0
              ? `
            <h3>سوال 1: عربی الفاظ کا مطلب</h3>
            <table>
              <tr><th>عربی لفظ</th><th>اردو معنی</th></tr>
              ${sabaq.q1Vocab.map((v) => `<tr><td class="arabic">${v.arabic}</td><td class="urdu">${v.urdu}</td></tr>`).join('')}
            </table>
          `
              : ''
          }

          ${
            sabaq.q2UrduToArabic && sabaq.q2UrduToArabic.length > 0
              ? `
            <h3>سوال 2: الفاظ کو عربی میں کیا کہتے ہیں؟</h3>
            <table>
              <tr><th>اردو لفظ</th><th>عربی لفظ</th></tr>
              ${sabaq.q2UrduToArabic.map((v) => `<tr><td class="urdu">${v.urdu}</td><td class="arabic">${v.arabic}</td></tr>`).join('')}
            </table>
          `
              : ''
          }

          ${
            sabaq.q4MissingLetters && sabaq.q4MissingLetters.length > 0
              ? `
            <h3>سوال 4: نامکمل الفاظ کی تکمیل</h3>
            <div class="list-box">
              ${sabaq.q4MissingLetters.map((m) => `<p class="arabic">• ${m}</p>`).join('')}
            </div>
          `
              : ''
          }

          ${
            sabaq.q5Harakat && sabaq.q5Harakat.length > 0
              ? `
            <h3>سوال 5: حرکات و اعراب</h3>
            <div class="list-box">
              ${sabaq.q5Harakat.map((h) => `<span class="arabic" style="display:inline-block; margin: 5px 15px;">${h}</span>`).join('')}
            </div>
          `
              : ''
          }

          ${
            sabaq.q6RootWords && sabaq.q6RootWords.length > 0
              ? `
            <h3>سوال 6: حروفِ اصلیہ و مادہ</h3>
            <div class="list-box">
              ${sabaq.q6RootWords.map((r) => `<p><strong style="color:#4338ca;">مادہ (${r.letters})</strong> ➔ <span class="arabic">${r.word}</span></p>`).join('')}
            </div>
          `
              : ''
          }

          ${
            sabaq.q7Verses && sabaq.q7Verses.length > 0
              ? `
            <h3>سوال 7: قرآنی تراکیب و آیات کا ترجمہ</h3>
            <table>
              <tr><th>قرآنی آیت / قطعہ</th><th>اردو ترجمہ</th></tr>
              ${sabaq.q7Verses.map((v) => `<tr><td class="arabic">${v.arabic}</td><td class="urdu">${v.urdu}</td></tr>`).join('')}
            </table>
          `
              : ''
          }
        </div>
      `
      ).join('')}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Creates a comprehensive Google Doc containing all 19 Sabaqs formatted cleanly.
 */
export async function exportToGoogleDocs(accessToken: string): Promise<GoogleDocsExportResult> {
  try {
    // 1. Create a blank Google Document
    const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'معلم القرآن - یونٹ 1 مکمل حل شدہ مشقیں (سبق 1 تا 19)',
      }),
    });

    if (!createRes.ok) {
      const errJson = await createRes.json();
      throw new Error(errJson.error?.message || 'Failed to create Google Doc');
    }

    const docData = await createRes.json();
    const documentId = docData.documentId;

    // 2. Build plain text content
    const docText = buildFormattedSabaqsText();

    // 3. Insert content into the document
    await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: docText,
            },
          },
        ],
      }),
    });

    const documentUrl = `https://docs.google.com/document/d/${documentId}/edit`;

    return {
      success: true,
      documentId,
      documentUrl,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'An error occurred while exporting to Google Docs',
    };
  }
}
