"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type OutputLine = {
  id: string;
  type: "command" | "result" | "error" | "system";
  content: string | JSX.Element;
};

const COMMANDS: Record<string, string | JSX.Element> = {
  help: (
    <div className="flex flex-col gap-1 text-white/80">
      <span className="text-accent-cyan mb-2">Available commands:</span>
      <div className="grid grid-cols-2 max-w-sm">
        <span>whoami</span><span>contact</span>
        <span>education</span><span>certifications</span>
        <span>skills</span><span>achievements</span>
        <span>projects</span><span>training</span>
        <span>hire</span><span>clear</span>
      </div>
    </div>
  ),
  whoami: (
    <div className="flex flex-col gap-1">
      <span className="text-white">Koushik Rangaraju — Cloud Student & Full Stack Developer</span>
      <span className="text-white/80">📍 Hyderabad, India | 🎓 LPU B.Tech CSE</span>
    </div>
  ),
  education: (
    <div className="flex flex-col gap-3">
      <div>
        <span className="text-accent-gold">🎓 Lovely Professional University</span> — B.Tech CSE (2023–Present) | CGPA: 6.8
      </div>
      <div>
        <span className="text-accent-blue">📚 SR Junior College, Hyderabad</span> — MPC Intermediate (92%)
      </div>
      <div>
        <span className="text-accent-emerald">🏫 Mount Litera Zee School, Hyderabad</span> — Matriculation (86%)
      </div>
    </div>
  ),
  skills: (
    <div className="flex flex-col gap-1 text-white/90">
      <div className="flex"><span className="w-24 text-accent-cyan">Languages</span>: C, C++, Java, Python</div>
      <div className="flex"><span className="w-24 text-accent-cyan">Web</span>: HTML, CSS</div>
      <div className="flex"><span className="w-24 text-accent-cyan">Backend</span>: Spring Boot, REST API, Postman</div>
      <div className="flex"><span className="w-24 text-accent-cyan">Tools</span>: MySQL, AWS, Docker, Git, GitHub</div>
    </div>
  ),
  projects: (
    <div className="flex flex-col gap-2">
      <div>
        <a href="https://phenomenal-profiterole-f3074b.netlify.app/" target="_blank" rel="noreferrer" className="text-accent-emerald hover:underline">1. Online Friend Sphere Platform ↗</a>
        <br/><span className="text-white/70">Full Stack Social Networking (Spring Boot, MySQL)</span>
      </div>
      <div>
        <a href="https://cloudcompass.bolt.host/" target="_blank" rel="noreferrer" className="text-accent-blue hover:underline">2. Cloud Compass ↗</a>
        <br/><span className="text-white/70">Responsive Educational Cloud Concepts (HTML, AWS EC2)</span>
      </div>
    </div>
  ),
  contact: (
    <div className="flex flex-col gap-1">
      <div><span className="text-accent-cyan w-20 inline-block">Email:</span> koushikrangaraju2005@gmail.com</div>
      <div><span className="text-accent-cyan w-20 inline-block">Phone:</span> +91-9848706282</div>
      <div><span className="text-accent-cyan w-20 inline-block">GitHub:</span> github.com/koushikRangaraju</div>
      <div><span className="text-accent-cyan w-20 inline-block">LinkedIn:</span> linkedin.com/in/rangaraju-koushik-92434b28b/</div>
    </div>
  ),
  certifications: (
    <div className="flex flex-col gap-1 text-white/90">
      <div>🏅 <span className="text-accent-purple">Cloud Computing Intern</span> — Infosys Springboard (Jul 2025)</div>
      <div>🏅 <span className="text-accent-pink">Code-A-Haunt</span> — Lovely Professional University (Sep 2025)</div>
      <div>🏅 <span className="text-accent-gold">Master of Facebook Ads</span> — Udemy (Oct 2023)</div>
    </div>
  ),
  achievements: (
    <div className="flex flex-col gap-2 text-white/90">
      <div>🏆 <span className="text-accent-gold">Hack With Vertos</span> (Echo LPU) — Cleared 2 rounds (Feb 2024)</div>
      <div>⭐ <span className="text-accent-pink">HackerRank</span> — Python 4-Star Rating (50+ solved)</div>
    </div>
  ),
  training: (
    <div className="flex flex-col gap-1">
      <span className="text-accent-cyan">DSA Summer Bootcamp</span> (Jun–Jul 2025)
      <span className="text-white/70">100+ problems solved. Stacks, queues, recursion, C++ STL applications.</span>
    </div>
  ),
  hire: (
    <span className="text-accent-emerald animate-pulse">🚀 Initiating hire sequence... Great choice, Koushik is available! Contact: koushikrangaraju2005@gmail.com</span>
  ),
};

const INITIAL_TEXT = `> whoami
Koushik Rangaraju — Cloud Student & Full Stack Developer
📍 Hyderabad, India | 🎓 LPU B.Tech CSE

> education
🎓 Lovely Professional University — B.Tech CSE (2023–Present) | CGPA: 6.8
📚 SR Junior College, Hyderabad — MPC Intermediate (92%)
🏫 Mount Litera Zee School, Hyderabad — Matriculation (86%)

> skills
Languages  : C, C++, Java, Python
Web        : HTML, CSS
Backend    : Spring Boot, REST API, Postman
Tools      : MySQL, AWS, Docker, Git, GitHub

> certifications
🏅 Cloud Computing Intern — Infosys Springboard (Jul 2025)
🏅 Code-A-Haunt — Lovely Professional University (Sep 2025)
🏅 Master of Facebook Ads — Udemy (Oct 2023)

> status
🟢 Open to Work — Full-time | Internship | Freelance`;

export default function InteractiveTerminal() {
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isTypingInit, setIsTypingInit] = useState(true);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-typing initialization
  useEffect(() => {
    let currentText = "";
    let i = 0;
    const lines = INITIAL_TEXT.split("\n");
    let currentLineIdx = 0;

    const typeWriter = setInterval(() => {
      if (currentLineIdx >= lines.length) {
        clearInterval(typeWriter);
        setIsTypingInit(false);
        return;
      }

      currentText = lines[currentLineIdx];
      
      setOutput((prev) => {
        // Find if line already exists, update it, else add it
        const exists = prev.find(p => p.id === `init-${currentLineIdx}`);
        if (exists) {
            return prev;
        } else {
            return [...prev, { id: `init-${currentLineIdx}`, type: "system", content: currentText }];
        }
      });
      
      currentLineIdx++;
      if(bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, 150);

    return () => clearInterval(typeWriter);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add command to history
    setHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);

    // Add command echo
    const echoLine: OutputLine = { id: Date.now().toString(), type: "command", content: trimmed };
    
    if (trimmed === "clear") {
      setOutput([]);
      return;
    }

    const response = COMMANDS[trimmed] || "Command not found. Type 'help' for available commands.";
    const resultLine: OutputLine = { 
      id: (Date.now() + 1).toString(), 
      type: COMMANDS[trimmed] ? "result" : "error", 
      content: response 
    };

    setOutput(prev => [...prev, echoLine, resultLine]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx < history.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <section className="w-full py-24 px-6 md:px-12 mx-auto max-w-[1000px] relative z-10 font-mono">
      
      {/* HEADER */}
      <div className="mb-12 text-center md:text-left">
        <span className="font-label text-accent-cyan tracking-[0.3em] uppercase text-sm font-semibold mb-4 block">
          TALK TO ME
        </span>
        <h2 
          className="font-heading font-bold text-[clamp(28px,4vw,56px)] leading-tight bg-clip-text text-transparent inline-block"
          style={{ backgroundImage: "linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)" }}
        >
          Interactive Terminal
        </h2>
      </div>

      {/* TERMINAL WINDOW */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)] border border-border/glass bg-[#0d1117] flex flex-col"
        style={{ minHeight: "420px" }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* TITLE BAR */}
        <div className="h-10 border-b border-white/10 flex items-center px-4 relative bg-[#010409]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-white/40 text-xs">
            koushik@portfolio:~$
          </div>
        </div>

        {/* TERMINAL BODY */}
        <div 
          className="flex-1 p-6 overflow-y-auto text-[13px] md:text-[14px] leading-[1.6] relative"
          style={{ maxHeight: "500px" }}
        >
          {/* Scanline CRT overlay effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[repeating-linear-gradient(transparent,transparent_2px,#fff_3px,#fff_4px)] z-0" />
          
          <div className="relative z-10 flex flex-col gap-1 text-white whitespace-pre-wrap">
            {output.map((line) => (
              <div key={line.id} className="mb-1">
                {line.type === "command" && (
                  <div className="flex gap-2">
                    <span className="text-accent-cyan shrink-0">{">"}</span>
                    <span>{line.content}</span>
                  </div>
                )}
                {line.type === "error" && (
                  <div className="text-[#ff5f57]">{line.content}</div>
                )}
                {line.type === "result" && (
                  <div className="text-white/90 ml-3">{line.content}</div>
                )}
                {line.type === "system" && (
                  <div className={String(line.content).startsWith(">") ? "text-accent-emerald mt-4" : "text-white/80"}>
                    {line.content}
                  </div>
                )}
              </div>
            ))}
            
            {/* INPUT ROW */}
            {!isTypingInit && (
              <div className="flex gap-2 mt-4 items-center relative">
                <span className="text-accent-cyan shrink-0">{">"}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent outline-none flex-1 text-white border-none focus:ring-0 p-0"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="absolute right-0 text-white/30 text-xs hidden sm:block">
                  Type &apos;help&apos;
                </span>
              </div>
            )}
            <div ref={bottomRef} className="h-4" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
