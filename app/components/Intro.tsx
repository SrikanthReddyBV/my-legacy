'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { withBase } from '../utils';

// --- 1. DEFINE YOUR TYPES ---
type Slide =
    | { type: 'title'; text: string; subtext?: string; duration: number }
    | { type: 'quote'; text: string; author: string; source?: string; duration: number }
    | { type: 'faces'; title: string; people: { name: string; role?: string; image: string }[]; duration: number }
    | { type: 'list'; title: string; items: string[]; duration: number };

// --- 2. YOUR SCRIPT ---
const creditsScript: Slide[] = [
    // --- CARD 1: THE NAME (UPDATED) ---
    {
        type: 'title',
        text: "Badvel Venkata Srikanth Reddy", // Single line now
        subtext: "THE DIGITAL LEGACY OF",
        duration: 8000
    },
    {
        type: 'quote',
        text: '"We are just an advanced breed of monkeys on a minor planet of a very average star."',
        author: "Stephen Hawking",
        source: "A Brief History of Time",
        duration: 6000
    },
    {
        type: 'quote',
        text: '"In individuals, insanity is rare; but in groups, parties, nations and epochs, it is the rule."',
        author: "Friedrich Nietzsche",
        source: "",
        duration: 6000
    },
    {
        type: 'quote',
        text: '"ఏ దేశ చరిత్ర చూసినా ఏమున్నది గర్వకారణం? నర జాతి చరిత్ర సమస్తం పరపీడన పరాయణత్వం!"',
        author: "శ్రీ శ్రీ",
        source: "మహాప్రస్థానం",
        duration: 6000
    },
    {
        type: 'faces',
        title: "Dedicated To The Giants",
        duration: 6000,
        people: [
            { name: "Alan Turing", role: "The Architect", image: withBase("/images/turing.jpg") },
            { name: "Grace Hopper", role: "The Visionary", image: withBase("/images/hopper.jpg") },
        ]
    },
    {
        type: 'faces',
        title: "To My Parents",
        duration: 8000,
        people: [
            { name: "Badvel Rajeswari", role: "Amma", image: withBase("/images/mom.jpeg") },
            { name: "Badvel Lakshmi Reddy", role: "Nanna", image: withBase("/images/dad.jpeg") },
        ]
    },
    {
        type: 'faces',
        title: "Special Mentions",
        duration: 8000,
        people: [
            { name: "Puri Jagannadh", role: "For his Puri Musings", image: withBase("/images/puri.jpg") },
            { name: "RGV", role: "For Ramuism", image: withBase("/images/rgv.jpg") },
        ]
    },
    {
        type: 'list',
        title: "With Special Thanks",
        duration: 5000,
        items: [
            "The Open Source Community",
            "Next.js Core Team",
            "Wikipedia Editors",
            "The Internet Archive",
            "My High School Physics Teacher"
        ]
    },
    {
        type: 'title',
        text: "Welcome",
        duration: 6000
    }
];

// --- 3. THE COMPONENT ---
export default function Intro({ onFinish }: { onFinish: () => void }) {
    const [index, setIndex] = useState(0);

    // Logic to move Forward/Backward
    const navigate = useCallback((direction: 'next' | 'prev') => {
        if (direction === 'next') {
            if (index < creditsScript.length - 1) {
                setIndex(prev => prev + 1);
            } else {
                onFinish();
            }
        } else {
            if (index > 0) {
                setIndex(prev => prev - 1);
            }
        }
    }, [index, onFinish]);

    // Keyboard Listeners
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'ArrowRight') navigate('next');
            else if (e.code === 'ArrowLeft') navigate('prev');
            else if (e.code === 'Space' || e.code === 'Escape') onFinish();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate, onFinish]);

    // Auto-Advance Timer
    useEffect(() => {
        const currentSlide = creditsScript[index];
        const timer = setTimeout(() => {
            navigate('next');
        }, currentSlide.duration);

        return () => clearTimeout(timer);
    }, [index, navigate]);

    const slide = creditsScript[index];

    return (
        <motion.div
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white px-6 overflow-hidden select-none"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80"></div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={index}
                    // Cinematic Fade Animation
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center"
                >

                    {/* --- TYPE 1: TITLE CARD (REFINED & SMALLER) --- */}
                    {slide.type === 'title' && (
                        <div className="text-center flex flex-col items-center justify-center gap-6">

                            {/* SUBTEXT */}
                            {slide.subtext && (
                                <p className="font-sans text-zinc-500 tracking-[0.4em] uppercase text-[10px] md:text-xs animate-pulse">
                                    {slide.subtext}
                                </p>
                            )}

                            {/* NAME (Single Line, Smaller, Wider Tracking) */}
                            <h1 className="font-serif font-bold text-2xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-xl">
                                {slide.text}
                            </h1>
                        </div>
                    )}

                    {/* --- TYPE 2: QUOTE --- */}
                    {slide.type === 'quote' && (
                        <div className="max-w-3xl text-center flex flex-col items-center">
                            <p className="font-serif text-2xl md:text-4xl italic leading-relaxed text-zinc-200 text-glow">
                                {slide.text}
                            </p>
                            <div className="mt-8 h-px w-12 bg-zinc-700 mx-auto"></div>
                            <p className="mt-4 text-sm text-zinc-400 uppercase tracking-[0.3em] font-sans font-semibold">
                                {slide.author}
                            </p>
                            {slide.source && (
                                <p className="mt-2 text-xs text-zinc-600 font-serif italic tracking-wide">
                                    ( {slide.source} )
                                </p>
                            )}
                        </div>
                    )}

                    {/* --- TYPE 3: FACES --- */}
                    {slide.type === 'faces' && (
                        <div className="w-full text-center">
                            <h2 className="text-zinc-600 text-xs uppercase tracking-[0.5em] mb-12">{slide.title}</h2>
                            <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                                {slide.people.map((person, i) => (
                                    <motion.div
                                        key={person.name + i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
                                        className="flex flex-col items-center group"
                                    >
                                        <div className="relative w-24 h-24 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden border border-zinc-800 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                            <img
                                                src={person.image}
                                                alt={person.name}
                                                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                                            />
                                        </div>
                                        {person.name && (
                                            <h3 className="font-serif text-lg md:text-2xl text-zinc-200 tracking-wide">{person.name}</h3>
                                        )}
                                        {person.role && <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">{person.role}</p>}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- TYPE 4: LIST --- */}
                    {slide.type === 'list' && (
                        <div className="text-center">
                            <h2 className="text-zinc-600 text-xs uppercase tracking-[0.5em] mb-10">{slide.title}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                                {slide.items.map((item, i) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.15 + 0.3 }}
                                        className="font-serif text-xl md:text-2xl text-zinc-300"
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                </motion.div>
            </AnimatePresence>

            {/* Navigation Hints / Footer */}
            <div className="absolute bottom-8 w-full flex flex-col items-center gap-2">
                <div className="flex gap-2 mb-2">
                    {creditsScript.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-white' : 'w-1 bg-zinc-800'}`}
                        />
                    ))}
                </div>
                <div className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] flex gap-4">
                    <span className="hidden md:inline">← Prev</span>
                    <button onClick={onFinish} className="hover:text-white transition-colors border-b border-transparent hover:border-white">
                        Space to Skip
                    </button>
                    <span className="hidden md:inline">Next →</span>
                </div>
            </div>
        </motion.div>
    );
}