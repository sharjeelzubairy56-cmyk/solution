import React, { useState } from 'react';
import { exportToGoogleDocs, getGoogleAccessToken, GoogleDocsExportResult } from '../utils/googleDocsApi';
import { ExternalLink, CheckCircle2, AlertCircle, Loader2, FileText, X } from 'lucide-react';

interface GoogleDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleDocsModal: React.FC<GoogleDocsModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [result, setResult] = useState<GoogleDocsExportResult | null>(null);

  if (!isOpen) return null;

  const handleExport = async () => {
    setLoading(true);
    setResult(null);
    setStatusText('Authenticating with Google Workspace...');

    try {
      const token = await getGoogleAccessToken();
      setStatusText('Creating and formatting Google Doc for Sabaq 1-19...');
      const res = await exportToGoogleDocs(token);
      setResult(res);
    } catch (err: any) {
      setResult({
        success: false,
        error: err.message || 'Authentication or export failed. Please check popup permissions.',
      });
    } finally {
      setLoading(false);
      setStatusText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-latin">Export to Google Docs</h3>
            <p className="text-sm text-slate-500">
              Create an editable Google Doc for all 19 Sabaq exercises
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-6 text-sm text-slate-600 space-y-2 border border-slate-100">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-indigo-600">•</span>
            <span>All 19 Sabaqs formatted with complete Vocabulary, Missing letters, Root words & Verses.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold text-indigo-600">•</span>
            <span>Directly saved to your Google Drive for easy collaboration and cloud access.</span>
          </div>
        </div>

        {result?.success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
            <div className="flex items-center gap-2 mb-2 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Document Created Successfully!
            </div>
            <p className="text-sm text-emerald-700 mb-3">
              Your Google Document with all 19 lessons is ready.
            </p>
            <a
              href={result.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm transition-colors"
            >
              Open in Google Docs <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {result?.error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold mb-1">Export Error</p>
              <p>{result.error}</p>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleExport}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 rounded-lg flex items-center gap-2 transition-colors shadow-xs"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{statusText || 'Exporting...'}</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>Export to Google Docs</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
