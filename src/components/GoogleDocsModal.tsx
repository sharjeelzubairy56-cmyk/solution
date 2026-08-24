import React, { useState } from 'react';
import { exportToGoogleDocs, getGoogleAccessToken, downloadDocsHtmlFile, buildFormattedSabaqsText, GoogleDocsExportResult } from '../utils/googleDocsApi';
import { ExternalLink, CheckCircle2, AlertCircle, Loader2, FileText, X, Download, Copy, Check } from 'lucide-react';

interface GoogleDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleDocsModal: React.FC<GoogleDocsModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [result, setResult] = useState<GoogleDocsExportResult | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setLoading(true);
    setResult(null);
    setStatusText('Connecting to Google Drive...');

    try {
      const token = await getGoogleAccessToken();
      setStatusText('Creating and formatting Google Doc for Sabaqs 1-19...');
      const res = await exportToGoogleDocs(token);
      setResult(res);
    } catch (err: any) {
      setResult({
        success: false,
        error: err.message || 'Direct Google Docs popup was blocked or unavailable. You can use the "Download as Editable Doc" button below!',
      });
    } finally {
      setLoading(false);
      setStatusText('');
    }
  };

  const handleDownloadDoc = () => {
    downloadDocsHtmlFile('Muallim_ul_Quran_Unit1_Complete_Sabaq_1_to_19.doc');
  };

  const handleCopyText = () => {
    const text = buildFormattedSabaqsText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" dir="rtl">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative text-right">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-latin">Google Docs & Word Export</h3>
            <p className="text-sm text-slate-500">
              سبق 1 تا 19 کا مکمل ڈیٹا قابلِ ترمیم فائل میں ایکسپورٹ کریں
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-6 text-sm text-slate-700 space-y-2 border border-slate-200">
          <div className="flex items-start gap-2">
            <span className="font-bold text-indigo-600">•</span>
            <span>تمام 19 اسباق کے مکمل حل شدہ سوالات و جوابات شامل ہیں۔</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-indigo-600">•</span>
            <span>عربی اور اردو فونٹس اور ٹیبلز کے ساتھ انتہائی خوبصورت فارمیٹنگ۔</span>
          </div>
        </div>

        {result?.success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
            <div className="flex items-center gap-2 mb-2 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              گوگل ڈاکومنٹ کامیابی سے بن گیا ہے!
            </div>
            <p className="text-sm text-emerald-700 mb-3">
              آپ کا تمام 19 اسباق پر مشتمل ڈاکومنٹ تیار ہے۔
            </p>
            <a
              href={result.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm transition-colors"
            >
              گوگل ڈاکس میں کھولیں <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {result?.error && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-amber-800">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>متبادل طریقہ کار دستیاب ہے:</span>
            </div>
            <p className="text-xs text-amber-700">{result.error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleDownloadDoc}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>ڈاکومنٹ فائل ڈاؤنلوڈ کریں (.doc / Google Docs)</span>
          </button>

          <button
            onClick={handleCopyText}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">مکمل ٹیکسٹ کاپی ہو گیا!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>تمام ٹیکسٹ کاپی کریں (Copy to Clipboard)</span>
              </>
            )}
          </button>

          <button
            onClick={handleExport}
            disabled={loading}
            className="w-full py-2 px-4 bg-white hover:bg-slate-50 text-indigo-700 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors border border-indigo-200 text-xs"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{statusText || 'کنیکٹ ہو رہا ہے...'}</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-3.5 h-3.5" />
                <span>براہِ راست گوگل ڈرائیو میں محفوظ کریں (Cloud OAuth)</span>
              </>
            )}
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            بند کریں (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
