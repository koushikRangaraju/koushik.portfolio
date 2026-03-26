"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, User, Calendar } from "lucide-react";

const INITIAL_MESSAGES = [
  { id: 1, author: "Siddhartha", message: "Love the new Luffy cursor! The animations are super smooth now.", date: "Feb 24, 2025" },
  { id: 2, author: "Srinivas", message: "The Cloud Compass project is really well explained. Great job on the UI!", date: "Feb 22, 2025" },
  { id: 3, author: "Ravi", message: "Cleanest portfolio I've seen in a while. The dark mode is perfect.", date: "Feb 20, 2025" },
];

export default function GuestbookPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsSubmitting(true);
    // Mocking an API call
    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        author: name,
        message: message,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setMessages([newMessage, ...messages]);
      setName("");
      setMessage("");
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 mx-auto max-w-[900px] relative z-10 w-full flex flex-col">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <span className="font-mono text-accent-emerald tracking-[0.2em] uppercase text-[11px] mb-4 block">
          COMMUNITY WALL
        </span>
        <h1 className="font-display font-[900] text-[clamp(48px,8vw,96px)] leading-none text-white mb-6">
          Guestbook.
        </h1>
        <p className="font-body text-[#aaaaaa] text-[18px] max-w-2xl leading-[1.6]">
          Leave a message, say hi, or share your thoughts on my work. Your feedback keeps me motivated to build more!
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
        
        {/* SIGN FORM */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 w-full space-y-8 sticky top-32"
        >
          <div className="p-8 rounded-[24px] bg-[#111111] border border-[#1f1f1f] space-y-6">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-3">
              <Send size={20} className="text-accent-emerald" />
              Sign the Guestbook
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#555555] ml-2">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-4 text-white font-body focus:border-accent-emerald/50 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#555555] ml-2">Message</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={4}
                  className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-4 text-white font-body focus:border-accent-emerald/50 outline-none transition-all resize-none"
                  required
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-display font-bold rounded-xl hover:bg-accent-emerald hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                data-cursor="hover"
              >
                {isSubmitting ? "Sending..." : "Post Message"}
              </button>
            </form>

            <AnimatePresence>
              {showSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-2 text-accent-emerald font-mono text-xs uppercase tracking-widest"
                >
                  Message posted successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* MESSAGES LIST */}
        <div className="lg:w-1/2 w-full space-y-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#555555] ml-4 mb-6">
            Recent Entries
          </h2>
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-[20px] bg-[#0d0d0d] border border-[#1a1a1a] space-y-4"
              >
                <p className="text-[#aaaaaa] font-body text-[15px] leading-relaxed italic">
                  &quot;{msg.message}&quot;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#111111] border border-[#1f1f1f] flex items-center justify-center">
                      <User size={14} className="text-[#555555]" />
                    </div>
                    <span className="font-body font-[600] text-white text-sm">
                      {msg.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#555555] uppercase tracking-tighter">
                    <Calendar size={12} />
                    {msg.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

