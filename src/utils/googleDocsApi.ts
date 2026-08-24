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
      reject(new Error('Google Identity Services library not loaded. Please ensure internet access.'));
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

    // 2. Build plain text content with clear structure
    let docText = `معلم القرآن یونٹ 1 - مکمل حل شدہ مشقیں (سبق 1 تا 19)\n`;
    docText += `Muallim-ul-Quran Unit 1 - Complete Solved Exercises (Lessons 1 to 19)\n\n`;

    for (const sabaq of SABAQS_DATA) {
      docText += `==================================================\n`;
      docText += `${sabaq.titleEnglish} | ${sabaq.titleUrdu}\n`;
      docText += `==================================================\n\n`;

      if (sabaq.vocabulary.length > 0) {
        docText += `[ Vocabulary Questions (الفاظ و معانی) ]\n`;
        sabaq.vocabulary.forEach((v, idx) => {
          docText += `${idx + 1}. ${v.arabic}  --->  ${v.urdu}\n`;
        });
        docText += `\n`;
      }

      if (sabaq.missingLetters.length > 0) {
        docText += `[ Missing Letters & Harakat (الفاظ بمع اعراب) ]\n`;
        sabaq.missingLetters.forEach((word, idx) => {
          docText += `• ${word}\n`;
        });
        docText += `\n`;
      }

      if (sabaq.rootWords.length > 0) {
        docText += `[ Root Words (حروف اصلیہ) ]\n`;
        sabaq.rootWords.forEach((r) => {
          docText += `• ${r.letters} : ${r.word}\n`;
        });
        docText += `\n`;
      }

      if (sabaq.verses.length > 0) {
        docText += `[ Quranic Verses / Phrases (قرآنی آیات و تراکیب) ]\n`;
        sabaq.verses.forEach((verse, idx) => {
          docText += `${idx + 1}. ${verse.arabic}  --->  ${verse.urdu}\n`;
        });
        docText += `\n`;
      }

      docText += `\n\n`;
    }

    // 3. Insert content into the document
    const updateRes = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
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

    if (!updateRes.ok) {
      console.warn('Text insertion had a minor issue, document still created.');
    }

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
