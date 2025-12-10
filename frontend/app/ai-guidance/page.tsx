'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Send, Bot, User, Sparkles, BookOpen, Target, TrendingUp, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIGuidancePage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI career guide powered by Claude Sonnet 4. Ask me anything about:\n\n- 🎯 Career roadmaps and timelines\n- 📚 Learning resources (free & paid)\n- 💡 Skill development strategies\n- 📈 Industry trends and insights\n- ✨ Personalized guidance for your goals\n\nWhat would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    if (!token) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Please log in again to continue using AI guidance.' 
      }]);
      router.push('/login');
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/ai-guidance/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          messages: messages,
          custom_query: input
        })
      });

      if (response.status === 401) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Your session has expired. Please log in again.' 
        }]);
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to get response');
      }

      const data = await response.json();
      const aiMessage: Message = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Please try again.'}` 
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const quickPrompts = [
    { icon: Target, text: "AI/ML Engineer roadmap", prompt: "I want to become an AI/ML Engineer. Can you create a detailed roadmap with timeline, skills to learn, and resources?" },
    { icon: BookOpen, text: "Best free Python courses", prompt: "What are the best free courses and resources to learn Python for data science and backend development?" },
    { icon: TrendingUp, text: "Latest tech trends 2025", prompt: "What are the hottest tech skills and career paths in 2025? What should I focus on?" },
    { icon: Sparkles, text: "Career switch to tech", prompt: "I'm switching careers into tech. What's the best path for me and how long will it take?" }
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-safe">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 pt-20 sm:pt-24">
        {/* Header */}
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-in fade-in slide-in-from-top-5 duration-500">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-sky-500 to-purple-600 rounded-lg shadow-lg shadow-purple-500/50">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text">AI Career Guidance</h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Get personalized advice, roadmaps, and learning resources powered by Claude Sonnet 4
          </p>
        </div>

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-in fade-in slide-in-from-top-5 duration-500" style={{animationDelay: '100ms'}}>
            <h2 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Start</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {quickPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickPrompt(item.prompt)}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 text-left group"
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors duration-200">{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-5 duration-500" style={{animationDelay: '200ms'}}>
          <div className="h-[50vh] sm:h-[55vh] lg:h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2">
            <div className="space-y-4 sm:space-y-6">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 sm:gap-4 animate-in fade-in slide-in-from-bottom-3 duration-300 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-emerald-500 to-sky-500 shadow-emerald-500/50' 
                      : 'bg-gradient-to-r from-purple-500 to-sky-500 shadow-purple-500/50'
                  }`}>
                    {message.role === 'user' ? <User className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bot className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <div className={`flex-1 max-w-[85%] sm:max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.01] ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-sky-500/20 to-purple-500/20 border border-sky-500/30 shadow-lg shadow-sky-500/20'
                        : 'bg-white/5 border border-white/10 shadow-lg hover:bg-white/[0.07]'
                    }`}>
                      <ReactMarkdown 
                        className="prose prose-invert prose-sm sm:prose-base max-w-none text-xs sm:text-sm leading-relaxed"
                        components={{
                          a: ({node, ...props}: any) => <a {...props} className="text-sky-400 hover:text-sky-300 underline decoration-1 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer" />,
                          code: ({node, ...props}: any) => <code {...props} className="bg-black/30 px-1.5 py-0.5 rounded text-sky-300 text-xs" />,
                          pre: ({node, ...props}: any) => <pre {...props} className="bg-black/30 p-2 sm:p-3 rounded-lg overflow-x-auto text-xs" />,
                          ul: ({node, ...props}: any) => <ul {...props} className="space-y-1 my-2" />,
                          ol: ({node, ...props}: any) => <ol {...props} className="space-y-1 my-2" />,
                          li: ({node, ...props}: any) => <li {...props} className="ml-4" />,
                          h1: ({node, ...props}: any) => <h1 {...props} className="text-lg sm:text-xl font-bold mt-4 mb-2" />,
                          h2: ({node, ...props}: any) => <h2 {...props} className="text-base sm:text-lg font-bold mt-3 mb-2" />,
                          h3: ({node, ...props}: any) => <h3 {...props} className="text-sm sm:text-base font-bold mt-2 mb-1" />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 sm:gap-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-500 to-sky-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 shadow-lg">
                      <div className="flex gap-1.5 sm:gap-2">
                        <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 sticky bottom-0 sm:relative animate-in fade-in slide-in-from-bottom-5 duration-500" style={{animationDelay: '300ms'}}>
          <div className="flex gap-2 sm:gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask me anything about your career..."
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white placeholder-gray-500 text-sm sm:text-base transition-all duration-200"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-sky-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50 min-w-[60px] sm:min-w-[80px]"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center hidden sm:block">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
