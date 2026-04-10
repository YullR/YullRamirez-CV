import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  ShieldCheck, 
  Headphones, 
  Settings, 
  Globe, 
  Mail, 
  Linkedin, 
  ChevronRight, 
  Server, 
  Network, 
  Monitor, 
  Cpu, 
  Clock, 
  Award,
  BookOpen,
  MessageSquare,
  Send,
  Loader2,
  Briefcase,
  ExternalLink,
  Wifi,
  User,
  MapPin
} from 'lucide-react';

// --- CONFIGURACIÓN DE DATOS ---
const DATA = {
  es: {
    role: "Ingeniero de Soporte TI",
    tagline: "Especialista en Soporte Remoto & Infraestructura",
    valueProp: "Asegurando la continuidad tecnológica de empresas globales mediante soporte técnico de alto impacto y gestión proactiva.",
    about: "Ingeniero de Sistemas con más de 10 años de experiencia. Actualmente trabajando como freelance proporcionando soporte técnico nivel 1 y 2 de manera remota para el mercado internacional, con altos estándares de calidad y eficiencia.",
    sections: {
      experience: "Trayectoria Profesional",
      skills: "Habilidades & Tecnologías",
      education: "Formación Académica",
      ai: "Chat con Consultor IA"
    },
    skills: [
      { name: "Soporte Remoto Internacional", level: 99, icon: <Globe className="w-4 h-4" /> },
      { name: "Gestión de Tickets (GLPI/Jira)", level: 95, icon: <Settings className="w-4 h-4" /> },
      { name: "Office 365 & Azure Admin", level: 92, icon: <Monitor className="w-4 h-4" /> },
      { name: "Windows/Linux Server", level: 88, icon: <Server className="w-4 h-4" /> },
      { name: "Resolución de Incidencias N1/N2", level: 98, icon: <Headphones className="w-4 h-4" /> },
      { name: "Redes & Conectividad", level: 90, icon: <Wifi className="w-4 h-4" /> }
    ],
    experience: [
      {
        company: "Freelance - Soporte Internacional",
        period: "2026 - Actualidad",
        title: "Especialista en Soporte TI Remoto",
        desc: "Provisión de soporte técnico nivel 1 y 2 para clientes corporativos internacionales. Diagnóstico avanzado de hardware/software, configuración de VPNs, administración de usuarios y gestión de estaciones de trabajo.",
        tags: ["Soporte Global", "Remoto", "Correos", "ITSM"]
      },
      {
        company: "Universidad Libre",
        period: "2015 - Actualidad",
        title: "Coordinador de Mesa de Ayuda / Ingeniero de Soporte",
        desc: "Liderazgo de soporte técnico institucional. Administración de servidores Ubuntu y Windows, y gestión de infraestructura de red para gran escala de usuarios.",
        tags: ["Liderazgo", "GLPI", "Ubuntu Server", "O365"]
      },
      {
        company: "Univ. Francisco de Paula Santander",
        period: "2014 - 2015",
        title: "Auxiliar de Soporte TI",
        desc: "Mantenimiento preventivo y correctivo. Resolución de problemas técnicos básicos de hardware y software.",
        tags: ["Mantenimiento", "PC Support"]
      }
    ],
    education: [
      { school: "Universidad Libre", degree: "Maestría en Pedagogía Digital (En curso)" },
      { school: "Universidad Libre", degree: "Especialización en Gerencia de Proyectos" },
      { school: "UFPS", degree: "Ingeniería de Sistemas" }
    ],
    aiPlaceholder: "Pregúntame sobre la experiencia de Yull...",
    aiSystem: "Eres un asistente virtual que representa a Yull Ramírez. Yull actualmente trabaja como freelance dando soporte remoto internacional. Responde de forma profesional, breve y destacando su eficiencia operativa en entornos remotos y su dominio de herramientas de gestión de tickets."
  },
  en: {
    role: "IT Support Engineer",
    tagline: "Remote Support & Infrastructure Specialist",
    valueProp: "Ensuring the technological continuity of global companies through high-impact technical support and proactive management.",
    about: "Systems Engineer with 10+ years of experience. Currently working as a freelance providing level 1 and 2 technical support remotely for the international market, with high quality and efficiency standards.",
    sections: {
      experience: "Professional Experience",
      skills: "Skills & Technologies",
      education: "Education",
      ai: "Consult with AI"
    },
    skills: [
      { name: "International Remote Support", level: 99, icon: <Globe className="w-4 h-4" /> },
      { name: "Ticket Management (GLPI/Jira)", level: 95, icon: <Settings className="w-4 h-4" /> },
      { name: "Office 365 & Azure Admin", level: 92, icon: <Monitor className="w-4 h-4" /> },
      { name: "Windows/Linux Server", level: 88, icon: <Server className="w-4 h-4" /> },
      { name: "Level 1/2 Incident Resolution", level: 98, icon: <Headphones className="w-4 h-4" /> },
      { name: "Networking & Connectivity", level: 90, icon: <Wifi className="w-4 h-4" /> }
    ],
    experience: [
      {
        company: "Freelance - International Support",
        period: "2024 - Present",
        title: "Remote IT Support Specialist",
        desc: "Providing Level 1 & 2 technical support for international corporate clients. Advanced hardware/software diagnostics, VPN configuration, user administration, and workstation management.",
        tags: ["Global Support", "Remote", "VPN", "ITSM"]
      },
      {
        company: "Libre University",
        period: "2015 - 2024",
        title: "Help Desk Coordinator / Support Engineer",
        desc: "Institutional technical support leadership. Ubuntu and Windows server administration, and network infrastructure management for a large scale of users.",
        tags: ["Leadership", "GLPI", "Ubuntu Server", "O365"]
      },
      {
        company: "UFPS University",
        period: "2010 - 2012",
        title: "IT Support Assistant",
        desc: "Preventive and corrective maintenance. Resolution of basic hardware and software technical issues.",
        tags: ["Maintenance", "PC Support"]
      }
    ],
    education: [
      { school: "Universidad Libre", degree: "Master in Digital Pedagogy (In progress)" },
      { school: "Universidad Libre", degree: "Project Management Specialization" },
      { school: "UFPS", degree: "Systems Engineering" }
    ],
    aiPlaceholder: "Ask me about Yull's experience...",
    aiSystem: "You are a virtual assistant representing Yull Ramírez. Yull currently works as a freelance providing remote international support. Respond professionally, briefly, and highlighting his operational efficiency in remote environments and his mastery of ticket management tools."
  }
};

const App = () => {
  const [lang, setLang] = useState('es');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const t = DATA[lang];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const apiKey = ""; 
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMsg }] }],
          systemInstruction: { parts: [{ text: t.aiSystem }] }
        })
      });
      const result = await response.json();
      const aiText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Tengo un problema técnico. Intenta de nuevo.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error de red." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* --- NAV --- */}
      <nav className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-lg text-white px-6 py-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/20">YR</div>
          <div>
            <h1 className="text-base font-semibold tracking-tight">Yull Ramírez</h1>
            <p className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-widest">{t.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="flex items-center gap-2 text-[11px] font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all"
          >
            <Globe size={12} className="text-emerald-400" />
            {lang.toUpperCase()}
          </button>
          <div className="h-4 w-px bg-white/10 mx-1"></div>
          <a href="https://www.linkedin.com/in/yullramirez" target="_blank" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
            <Linkedin size={18} />
          </a>
        </div>
      </nav>

      {/* --- HERO CON TU FOTO --- */}
      <header className="relative bg-[#0F172A] text-white pt-24 pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 blur-[120px] rounded-full transform translate-x-1/2"></div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Disponible para Trabajo Remoto</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-semibold tracking-tighter leading-[1.1] mb-8">
              Soporte de ingeniería <br/>
              <span className="text-slate-400 font-light italic">sin fronteras.</span>
            </h2>
            
            <p className="text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-12 opacity-90 mx-auto md:mx-0">
              {t.valueProp}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Globe className="text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">Soporte TI</p>
                  <p className="text-xs text-slate-400">Freelance Remoto</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <ShieldCheck className="text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">ITIL / SLA</p>
                  <p className="text-xs text-slate-400">Gestión por Procesos</p>
                </div>
              </div>
            </div>
          </div>

          {/* FOTO REAL ENLAZADA */}
          <div className="relative group">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-[3rem] bg-emerald-500/20 border-2 border-emerald-500/20 p-3 overflow-hidden transform rotate-2 group-hover:rotate-0 transition-all duration-700 shadow-2xl shadow-emerald-500/10">
                <div className="w-full h-full rounded-[2.5rem] bg-slate-800 flex items-center justify-center overflow-hidden relative">
                    <img 
                        src="https://i.postimg.cc/B6gSkbjB/yullr.jpg" 
                        alt="Yull Ramírez" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="max-w-6xl mx-auto -mt-16 relative z-20 px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <div className="w-4 h-px bg-emerald-500"></div> Perfil Personal
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 italic">"{t.about}"</p>
              <div className="pt-6 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-3 text-slate-600 group">
                   <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                    <MapPin size={16} className="text-emerald-600" />
                   </div>
                   <span className="text-sm font-medium">Remoto / Colombia</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 group">
                   <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                    <Mail size={16} className="text-emerald-600" />
                   </div>
                   <span className="text-sm font-medium">yullr@outlook.com</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <div className="w-4 h-px bg-emerald-500"></div> {t.sections.skills}
              </h3>
              <div className="space-y-6">
                {t.skills.map((s, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <span className="text-emerald-500">{s.icon}</span> {s.name}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{s.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" style={{ width: `${s.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-10 flex items-center gap-2">
                <div className="w-4 h-px bg-emerald-500"></div> {t.sections.experience}
              </h3>
              <div className="space-y-12">
                {t.experience.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l border-slate-100 group">
                    <div className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full ${i === 0 ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : 'bg-slate-200'}`}></div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <h4 className="text-xl font-bold text-slate-900">
                        {exp.company}
                        {i === 0 && <span className="ml-3 text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded uppercase tracking-tighter">Actual</span>}
                      </h4>
                      <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">{exp.period}</span>
                    </div>
                    <p className="text-emerald-600 font-semibold text-sm mb-4">{exp.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{exp.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, idx) => (
                        <span key={idx} className="text-[9px] font-black uppercase px-2 py-1 rounded-md bg-slate-50 text-slate-500 border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0F172A] p-10 rounded-[2rem] text-white relative">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-8">{t.sections.education}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.education.map((e, i) => (
                  <div key={i} className="border-l-2 border-emerald-500/30 pl-4">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">{e.school}</p>
                    <p className="text-sm font-medium leading-tight">{e.degree}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- BOTÓN CHAT IA --- */}
      <div className="fixed bottom-8 right-8 z-[100]">
        {chatOpen && (
          <div className="absolute bottom-20 right-0 w-[360px] h-[520px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
            <div className="bg-[#0F172A] p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-xs text-white">YR</div>
                <div>
                  <p className="text-sm font-bold">Consultor IA de Yull</p>
                  <p className="text-[10px] text-emerald-400 uppercase font-black tracking-widest">En línea</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="opacity-50 hover:opacity-100">✕</button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 text-sm">
              {messages.length === 0 && <p className="text-center text-slate-400 py-20 px-4">Pregunta sobre la experiencia de Yull en soporte remoto o gestión de TI.</p>}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] text-slate-400 font-bold uppercase animate-pulse">Escribiendo...</div>}
            </div>

            <div className="p-4 bg-white border-t border-slate-50 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.aiPlaceholder}
                className="flex-1 bg-slate-100 border-none rounded-xl py-3 px-4 text-sm outline-none"
              />
              <button onClick={handleSend} className="bg-emerald-500 text-white p-3 rounded-xl hover:bg-emerald-600">
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
        
        <button onClick={() => setChatOpen(!chatOpen)} className="bg-[#0F172A] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-2 group border border-white/10 transition-all hover:bg-emerald-600">
          <span className="hidden group-hover:block text-xs font-bold uppercase tracking-widest pl-2">Chat Consultor</span>
          <MessageSquare size={24} />
        </button>
      </div>

      <footer className="bg-white py-12 text-center border-t border-slate-100">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
           Infraestructura TI • Yull Ramírez 2024
         </p>
      </footer>
    </div>
  );
};

export default App;
