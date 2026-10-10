'use client';

import { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReport: (reason: string, details: string) => void;
  peerId?: string;
}

const REPORT_REASONS = [
  { id: 'harassment', label: 'Harassment or Bullying', icon: '🛑' },
  { id: 'nudity', label: 'Inappropriate Content or Nudity', icon: '🔞' },
  { id: 'minor', label: 'Suspected Minor / Under 18', icon: '⚠️' },
  { id: 'hate', label: 'Hate Speech or Racism', icon: '🚫' },
  { id: 'spam', label: 'Bot, Spam, or Commercial Ad', icon: '🤖' },
  { id: 'other', label: 'Other Harmful Behavior', icon: '📝' },
];

export default function ReportModal({ isOpen, onClose, onConfirmReport, peerId }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('harassment');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onConfirmReport(selectedReason, details);
      setSubmitted(false);
      setDetails('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="max-w-md w-full bg-gray-900 border border-red-500/30 rounded-2xl p-6 shadow-2xl relative text-left">
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center text-2xl mx-auto animate-bounce">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white">Report Submitted & User Blocked</h3>
            <p className="text-sm text-gray-400">
              This stranger has been disconnected and blocked. Finding you a new partner...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚨</span>
                <h3 className="text-lg font-bold text-white">Report & Block Stranger</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Select the primary reason for reporting this user. They will be immediately blocked from matching with you again, and flagged for moderation review.
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {REPORT_REASONS.map((r) => (
                <label
                  key={r.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                    selectedReason === r.id
                      ? 'border-red-500/60 bg-red-500/10 text-white shadow-sm'
                      : 'border-gray-800 bg-gray-950/60 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="report_reason"
                    value={r.id}
                    checked={selectedReason === r.id}
                    onChange={() => setSelectedReason(r.id)}
                    className="accent-red-500"
                  />
                  <span>{r.icon}</span>
                  <span className="font-medium">{r.label}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="What happened? (No sensitive info will be saved)"
                rows={2}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-lg shadow-red-600/30"
              >
                Block & Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
