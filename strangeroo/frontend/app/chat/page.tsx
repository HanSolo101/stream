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
  timestamp: string;
}

const COMMON_TAGS = ['chill', 'gaming', 'music', 'coding', 'movies', 'anime', 'dating', 'books'];

export default function ChatPage() {
  const [chatState, setChatState] = useState<'idle' | 'searching' | 'connected' | 'disconnected'>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [interests, setInterests] = useState<string[]>(['chill']);
  const [customTagInput, setCustomTagInput] = useState('');
  const [strangerTyping, setStrangerTyping] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, strangerTyping]);

  // Keyboard shortcut: Esc to Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (chatState === 'connected' || chatState === 'disconnected') {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chatState]);

  const toggleTag = (tag: string) => {
    if (interests.includes(tag)) {
      setInterests(interests.filter((t) => t !== tag));
    } else {
      if (interests.length < 5) {
        setInterests([...interests, tag]);
      }
    }
  };

  const addCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customTagInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean && !interests.includes(clean) && interests.length < 5) {
      setInterests([...interests, clean]);
      setCustomTagInput('');
    }
  };

  const handleStartSearch = () => {
    setChatState('searching');
    setMessages([]);

    // Simulate match connection after 2 seconds
    setTimeout(() => {
      setChatState('connected');
      setMessages([
        {
          id: 'sys-1',
          sender: 'system',
          text: `Connected with a Stranger! Both of you like: ${interests.map((t) => '#' + t).join(', ')}. Say hi! 👋`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      inputRef.current?.focus();

      // Simulate a stranger replying after 3 seconds for interactive demo
      setTimeout(() => {
        setStrangerTyping(true);
        setTimeout(() => {
          setStrangerTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: 'st-1',
              sender: 'stranger',
              text: 'Hey there! How is your day going? 😊',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
        }, 1800);
      }, 1500);
    }, 2200);
  };

  const handleNext = () => {
    if (chatState === 'searching') return;
    handleStartSearch();
  };

  const handleStop = () => {
    setChatState('disconnected');
    setMessages((prev) => [
      ...prev,
      {
        id: 'sys-end',
        sender: 'system',
        text: 'You disconnected the chat.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || chatState !== 'connected') return;

    const newMsg: Message = {
      id: 'self-' + Date.now(),
      sender: 'self',
      text: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');

    // Trigger mock stranger response if it's the first user reply
    if (messages.filter((m) => m.sender === 'self').length === 0) {
      setTimeout(() => {
        setStrangerTyping(true);
        setTimeout(() => {
          setStrangerTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: 'st-2',
              sender: 'stranger',
              text: 'Nice to meet you! What hobbies do you enjoy the most?',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
        }, 2000);
      }, 1200);
    }
  };

  const handleConfirmReport = (reason: string, details: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: 'sys-report',
        sender: 'system',
        text: `Stranger was reported for "${reason}" and blocked.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setTimeout(() => {
      handleStartSearch();
    }, 1500);
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

      <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-3 sm:p-6 gap-3">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-900/80 border border-gray-800 rounded-2xl px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  chatState === 'connected'
                    ? 'bg-emerald-500 animate-pulse'
                    : chatState === 'searching'
                    ? 'bg-amber-500 animate-ping'
                    : 'bg-gray-500'
                }`}
              />
              <span className="text-sm font-semibold text-gray-200">
                {chatState === 'connected' && 'Connected with Stranger'}
                {chatState === 'searching' && 'Finding partner...'}
                {chatState === 'disconnected' && 'Chat ended'}
                {chatState === 'idle' && 'Ready to connect'}
              </span>
            </div>

            {chatState === 'connected' && (
              <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md font-mono">
                E2E Encrypted
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/60 hover:bg-gray-800 text-xs transition-colors"
              title="Toggle sound"
            >
              {soundEnabled ? '🔔 Sound On' : '🔕 Mute'}
            </button>

            {chatState === 'connected' && (
              <>
                <button
                  onClick={() => setReportOpen(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-400 bg-red-950/40 border border-red-800/60 hover:bg-red-900/60 transition-colors"
                >
                  🚨 Report
                </button>
                <button
                  onClick={handleStop}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  Stop
                </button>
              </>
            )}

            {(chatState === 'connected' || chatState === 'disconnected') && (
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

        {/* Main Content Area */}
        <div className="flex-1 min-h-[460px] bg-gray-900/50 border border-gray-800/80 rounded-2xl flex flex-col overflow-hidden relative shadow-inner">
          {chatState === 'idle' ? (
            /* Idle Screen / Interest Picker */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-3xl mb-4 text-indigo-400 shadow-lg">
                💬
              </div>
              <h2 className="text-2xl font-bold font-display text-white mb-2">Random Text Chat</h2>
              <p className="text-sm text-gray-400 mb-6">
                Connect with random people across India and the world. Choose your interests to match with people into the same things!
              </p>

              {/* Interest Selector */}
              <div className="w-full mb-6">
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Match by interests (select up to 5):
                </label>
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {COMMON_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        interests.includes(tag)
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                          : 'bg-gray-800/60 text-gray-400 border-gray-700/80 hover:border-gray-600 hover:text-gray-200'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

                <form onSubmit={addCustomTag} className="flex gap-2 max-w-xs mx-auto">
                  <input
                    type="text"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    placeholder="Add custom topic..."
                    className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs rounded-xl text-gray-300 font-semibold"
                  >
                    + Add
                  </button>
                </form>
              </div>

              <button
                onClick={handleStartSearch}
                className="w-full sm:w-auto px-10 py-3.5 rounded-xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-orange-500 hover:from-indigo-500 hover:to-orange-400 shadow-xl shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95"
              >
                Start Chatting Now →
              </button>
            </div>
          ) : chatState === 'searching' ? (
            /* Searching Radar */
            <MatchingOverlay mode="text" interests={interests} onCancel={() => setChatState('idle')} />
          ) : (
            /* Active / Disconnected Chat Screen */
            <div className="flex-1 flex flex-col h-full">
              {/* Safety notice banner */}
              <div className="bg-amber-950/30 border-b border-amber-800/40 px-4 py-2 text-xs text-amber-300/80 flex items-center justify-between">
                <span>⚠️ Safety notice: Never share personal details, phone numbers, UPI IDs, or OTPs.</span>
                <Link href="/terms" className="underline hover:text-amber-200 ml-2">Rules</Link>
              </div>

              {/* Messages list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => {
                  if (m.sender === 'system') {
                    return (
                      <div key={m.id} className="text-center my-3">
                        <span className="inline-block text-xs bg-gray-800/80 border border-gray-700/60 text-gray-300 px-3 py-1.5 rounded-full font-medium shadow-sm">
                          {m.text}
                        </span>
                      </div>
                    );
                  }

                  const isSelf = m.sender === 'self';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'} animate-slide-up`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-gray-500 font-medium">
                        <span>{isSelf ? 'You' : 'Stranger'}</span>
                        <span>•</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <div
                        className={`max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md ${
                          isSelf
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-none'
                            : 'bg-gray-800 border border-gray-700/70 text-gray-100 rounded-tl-none'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}

                {strangerTyping && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 italic py-1 px-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                    <span>Stranger is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Disconnected state prompt */}
              {chatState === 'disconnected' && (
                <div className="p-4 bg-gray-950/80 border-t border-gray-800 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
                  <span className="text-sm text-gray-400">Stranger has left or chat stopped.</span>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all"
                  >
                    Find Next Stranger (Esc)
                  </button>
                </div>
              )}

              {/* Chat Input Bar */}
              {chatState === 'connected' && (
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 bg-gray-950/90 border-t border-gray-800 flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message... (Press Enter to send)"
                    className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-orange-500 hover:from-indigo-500 hover:to-orange-400 disabled:opacity-40 disabled:hover:from-indigo-600 transition-all shadow-md active:scale-95"
                  >
                    Send ➔
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
