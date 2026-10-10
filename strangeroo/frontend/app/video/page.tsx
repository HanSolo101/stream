'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import MatchingOverlay from '@/components/MatchingOverlay';
import ReportModal from '@/components/ReportModal';
import AgeGateModal from '@/components/AgeGateModal';

interface Message {
  id: string;
  sender: 'self' | 'stranger' | 'system';
  text: string;
}

export default function VideoChatPage() {
  const [sessionState, setSessionState] = useState<'idle' | 'searching' | 'connected' | 'disconnected'>('idle');
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [blurActive, setBlurActive] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [chatDrawerOpen, setChatDrawerOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState<boolean | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize camera preview
  useEffect(() => {
    let activeStream: MediaStream | null = null;
    async function startCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          activeStream = stream;
          localStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          setCameraPermissionGranted(true);
        } else {
          setCameraPermissionGranted(false);
        }
      } catch (err) {
        console.warn('Camera access not granted or not available:', err);
        setCameraPermissionGranted(false);
      }
    }

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Keyboard shortcut Esc to Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (sessionState === 'connected' || sessionState === 'disconnected') {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sessionState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleMic = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = micMuted;
      });
    }
    setMicMuted(!micMuted);
  };

  const toggleCamera = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = cameraOff;
      });
    }
    setCameraOff(!cameraOff);
  };

  const handleStartSearch = () => {
    setSessionState('searching');
    setMessages([]);

    setTimeout(() => {
      setSessionState('connected');
      setMessages([
        {
          id: 'v-sys-1',
          sender: 'system',
          text: 'Video call established! Say hello to your stranger. 👋',
        },
      ]);
    }, 2500);
  };

  const handleNext = () => {
    if (sessionState === 'searching') return;
    handleStartSearch();
  };

  const handleStop = () => {
    setSessionState('disconnected');
    setMessages((prev) => [
      ...prev,
      {
        id: 'v-sys-end',
        sender: 'system',
        text: 'Video chat disconnected.',
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: 'self-' + Date.now(),
        sender: 'self',
        text: inputText.trim(),
      },
    ]);
    setInputText('');
  };

  const handleConfirmReport = (reason: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: 'rep-' + Date.now(),
        sender: 'system',
        text: `Stranger reported for ${reason} and blocked.`,
      },
    ]);
    setTimeout(() => {
      handleStartSearch();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <AgeGateModal />
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        onConfirmReport={handleConfirmReport}
      />

      <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-3 sm:p-5 gap-3">
        {/* Status & Control Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-900/80 border border-gray-800 rounded-2xl px-4 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span
              className={`w-3 h-3 rounded-full ${
                sessionState === 'connected'
                  ? 'bg-emerald-500 animate-pulse'
                  : sessionState === 'searching'
                  ? 'bg-amber-500 animate-ping'
                  : 'bg-gray-500'
              }`}
            />
            <span className="text-sm font-semibold text-gray-200">
              {sessionState === 'connected' && 'Live Video Connected'}
              {sessionState === 'searching' && 'Looking for next stranger...'}
              {sessionState === 'disconnected' && 'Call ended'}
              {sessionState === 'idle' && 'Camera Ready'}
            </span>

            {cameraPermissionGranted === false && (
              <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-md">
                Camera simulated
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setChatDrawerOpen(!chatDrawerOpen)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              💬 {chatDrawerOpen ? 'Hide Chat' : 'Show Chat'}
            </button>

            {sessionState === 'connected' && (
              <>
                <button
                  onClick={() => setReportOpen(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-400 bg-red-950/40 border border-red-800/60 hover:bg-red-900/60 transition-colors"
                >
                  🚨 Report
                </button>
                <button
                  onClick={handleStop}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  Stop
                </button>
              </>
            )}

            {(sessionState === 'connected' || sessionState === 'disconnected') && (
              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-orange-500 hover:from-indigo-500 hover:to-orange-400 shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>Next Stranger</span>
                <kbd className="hidden sm:inline text-[10px] bg-black/30 px-1 py-0.5 rounded">Esc</kbd>
              </button>
            )}
          </div>
        </div>

        {/* Video Canvas & Side Chat Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-3 min-h-[520px]">
          {/* Main Video Section (3 cols on large screens) */}
          <div
            className={`relative bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden flex flex-col justify-between ${
              chatDrawerOpen ? 'lg:col-span-3' : 'lg:col-span-4'
            }`}
          >
            {sessionState === 'idle' ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-orange-500 flex items-center justify-center text-4xl mb-4 shadow-xl shadow-indigo-600/30">
                  📹
                </div>
                <h2 className="text-2xl font-bold font-display text-white mb-2">Random Video Chat</h2>
                <p className="text-sm text-gray-400 mb-6 max-w-md">
                  Face-to-face peer-to-peer conversations with verified strangers. Your connection is direct and private.
                </p>
                <button
                  onClick={handleStartSearch}
                  className="px-8 py-3.5 rounded-xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-orange-500 hover:from-indigo-500 hover:to-orange-400 shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
                >
                  Start Video Chat ➔
                </button>
              </div>
            ) : sessionState === 'searching' ? (
              <MatchingOverlay mode="video" onCancel={() => setSessionState('idle')} />
            ) : (
              /* Remote Video Feed */
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                {sessionState === 'connected' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-center p-6">
                    {/* Simulated remote video avatar */}
                    <div className="relative mb-4">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500/20 to-orange-500/20 border-2 border-indigo-500/40 flex items-center justify-center text-5xl shadow-2xl">
                        👤
                      </div>
                      <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-gray-900 rounded-full animate-pulse" />
                    </div>
                    <div className="text-base font-bold text-white mb-1">Stranger Connected</div>
                    <p className="text-xs text-gray-400 font-mono">
                      WebRTC Direct Peer Connection (P2P) • 720p 30fps
                    </p>
                  </div>
                ) : (
                  <div className="text-center p-6 text-gray-400">
                    <p className="text-base font-semibold mb-2">Call Ended</p>
                    <p className="text-xs text-gray-500 mb-4">Click below or press Esc to start a new chat</p>
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all"
                    >
                      Find Next Stranger
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Local PiP (Picture-in-Picture) Video Preview */}
            <div className="absolute top-4 right-4 z-20 w-36 sm:w-48 aspect-video rounded-xl overflow-hidden bg-gray-950 border-2 border-gray-700/80 shadow-2xl">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transform -scale-x-100 ${
                  cameraOff ? 'hidden' : ''
                } ${blurActive ? 'filter blur-md' : ''}`}
              />

              {cameraOff && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-500 text-xs">
                  <span className="text-lg mb-1">🚫</span>
                  <span>Camera Off</span>
                </div>
              )}

              <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-gray-300 font-medium">
                You {micMuted && '• 🔇'}
              </div>
            </div>

            {/* Bottom Floating Video Controls */}
            <div className="p-3 bg-gray-950/80 backdrop-blur-md border-t border-gray-800 flex items-center justify-center gap-3">
              <button
                onClick={toggleMic}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                  micMuted
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-gray-800/80 text-gray-200 border-gray-700 hover:bg-gray-800'
                }`}
                title={micMuted ? 'Unmute Mic' : 'Mute Mic'}
              >
                {micMuted ? '🔇 Mic Off' : '🎙️ Mic On'}
              </button>

              <button
                onClick={toggleCamera}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                  cameraOff
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-gray-800/80 text-gray-200 border-gray-700 hover:bg-gray-800'
                }`}
                title={cameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
              >
                {cameraOff ? '🚫 Cam Off' : '📹 Cam On'}
              </button>

              <button
                onClick={() => setBlurActive(!blurActive)}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                  blurActive
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-gray-800/80 text-gray-200 border-gray-700 hover:bg-gray-800'
                }`}
                title="Toggle privacy background blur"
              >
                {blurActive ? '✨ Blur On' : '🌫️ Blur Off'}
              </button>
            </div>
          </div>

          {/* Side Text Chat Drawer */}
          {chatDrawerOpen && (
            <div className="lg:col-span-1 bg-gray-900/60 border border-gray-800 rounded-2xl flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-800 bg-gray-950/40 flex items-center justify-between text-xs font-semibold text-gray-300">
                <span>In-Call Chat</span>
                <span className="text-gray-500">{messages.length} messages</span>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 my-8 text-xs">
                    No messages yet. Send a message to chat while on video!
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-2.5 rounded-xl ${
                        m.sender === 'system'
                          ? 'bg-gray-800/50 text-gray-400 text-center text-[11px]'
                          : m.sender === 'self'
                          ? 'bg-indigo-600/80 text-white ml-4'
                          : 'bg-gray-800 text-gray-200 mr-4'
                      }`}
                    >
                      <div className="text-[10px] text-gray-400 mb-0.5">
                        {m.sender === 'self' ? 'You' : m.sender === 'stranger' ? 'Stranger' : ''}
                      </div>
                      <div>{m.text}</div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-2 border-t border-gray-800 bg-gray-950/60 flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Chat message..."
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
