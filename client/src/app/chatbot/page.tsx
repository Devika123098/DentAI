'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Activity, Terminal } from "lucide-react";
import { sendMessageMock } from '@/services/gemini-chat';
import type { ChatMessage } from '@/types/chatbot';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: 'assistant',
      content: "Session initialized. I can help with radiology interpretation, treatment planning, and evidence-based follow-up recommendations.",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const response = await sendMessageMock(newHistory);
      setMessages([...newHistory, response]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-8 max-w-5xl mx-auto">
      <header className="flex justify-between items-center border-b border-[var(--color-border)] pb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-outfit font-bold tracking-tight text-[var(--color-foreground)]"
          >
            Clinical Assistant
          </motion.h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] animate-pulse" />
            <p className="text-xs text-[var(--color-muted-foreground)]">Connection active • Average latency 12 ms</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 border border-[var(--color-border)] bg-[var(--color-secondary)] rounded-xl">
            <span className="text-xs font-medium text-[var(--color-foreground)]">Secure session: XA-482</span>
          </div>
        </div>
      </header>

      <Card className="flex flex-col flex-1 overflow-hidden bg-[var(--color-card)] border-[var(--color-border)] shadow-2xl relative">
        <CardHeader className="bg-[var(--color-secondary)]/60 border-b border-[var(--color-border)] py-5 px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl border border-[var(--color-border)] flex items-center justify-center bg-[var(--color-background)]">
                <Bot className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="text-sm font-outfit font-semibold text-[var(--color-foreground)]">Assistant Engine</h3>
                <p className="text-xs text-[var(--color-muted-foreground)]">Clinical model v1.5</p>
              </div>
            </div>
            <div className="flex gap-2">
               {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-[var(--color-border)] rounded-full" />)}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 overflow-hidden relative bg-[var(--color-surface-soft)]/60">
          <div ref={scrollRef} className="h-full overflow-y-auto p-10 space-y-10 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-6 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center ${msg.role === 'user' ? 'bg-[var(--color-primary)] border-[var(--color-primary)] shadow-[var(--glow-shadow)]' : 'bg-[var(--color-card)] border-[var(--color-border)]'}`}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4 text-[var(--color-primary-foreground)]" />
                    ) : (
                      <Bot className="w-4 h-4 text-[var(--color-primary)]" />
                    )}
                  </div>
                  <div className={`flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-6 py-5 rounded-2xl text-sm leading-relaxed border shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-[var(--color-primary)]/20 border-[var(--color-primary)]/40 text-[var(--color-foreground)]' 
                        : 'bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-muted-foreground)]'
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[11px] opacity-50">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[var(--color-primary)] animate-pulse" />
                </div>
                <div className="px-6 py-4 bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-xl flex gap-1.5 items-center">
                  <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1 h-1 bg-[var(--color-primary)] rounded-full animate-bounce" />
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-8 bg-[var(--color-secondary)]/60 border-t border-[var(--color-border)]">
          <form onSubmit={handleSend} className="flex gap-4 w-full group">
            <div className="relative flex-1">
              <Input
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about findings, diagnosis, or treatment planning..." 
                className="w-full h-14 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] focus:border-[var(--color-primary)] px-6 py-5 text-sm outline-none transition-all placeholder:opacity-80 text-[var(--color-foreground)]"
                disabled={loading}
              />
              <div className="absolute top-0 right-0 h-full w-12 flex items-center justify-center opacity-20">
                <Terminal className="w-3 h-3 text-[var(--color-foreground)]" />
              </div>
            </div>
            <Button
              type="submit" 
              disabled={loading || !input.trim()}
              className="h-14 px-10 rounded-full"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

