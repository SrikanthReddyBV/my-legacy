'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { withBase } from '../utils';

// --- 1. DEFINE YOUR TYPES (Updated quote type) ---
type Slide =
    | { type: 'title'; text: string; subtext?: string; duration: number }
    // Added optional 'image' to quote type
    | { type: 'quote'; text: string; author: string; image?: string; source?: string; duration: number }
    | { type: 'faces'; title: string; people: { name: string; role?: string; image: string; url?: string }[]; duration: number }
    | { type: 'list'; title: string; items: { name: string; url?: string }[]; duration: number }
    | { type: 'message'; text: string; duration: number };

// --- 2. YOUR SCRIPT ---
const creditsScript: Slide[] = [
    {
        type: 'quote',
        text: '"We are just an advanced breed of monkeys on a minor planet of a very average star."',
        author: "Stephen Hawking",
        // Example: Add author image here if you have it (e.g., /images/hawking.jpg)
        // image: withBase("/images/hawking.jpg"), 
        source: "https://en.wikipedia.org/wiki/A_Brief_History_of_Time",
        duration: 8000
    },
    {
        type: 'quote',
        text: '"In individuals, insanity is rare; but in groups, parties, nations and epochs, it is the rule."',
        author: "Friedrich Nietzsche",
        source: "",
        duration: 8000
    },
    // {
    //     type: 'quote',
    //     text: '"Man is the creature who does not know what to desire, and he turns to others in order to make up his mind. We desire what others desire because we imitate their desires."',
    //     author: "René Girard",
    //     source: "https://en.wikipedia.org/wiki/Mimetic_theory",
    //     duration: 10000
    // },
    {
        type: 'quote',
        text: '"ఏ దేశ చరిత్ర చూసినా ఏమున్నది గర్వకారణం? నర జాతి చరిత్ర సమస్తం పరపీడన పరాయణత్వం!"',
        author: "శ్రీ శ్రీ",
        image: withBase("/images/srisri.jpeg"),
        source: "https://en.wikipedia.org/wiki/Mahaprasthanam",
        duration: 8000
    },
    {
        type: 'quote',
        text: '"All of these years of my service towards mankind did not bring me nothing but assaults and humiliations."',
        author: "Nikola Tesla",
        image: withBase("/images/tesla.jpeg"),
        source: "https://en.wikipedia.org/wiki/Nikola_Tesla",
        duration: 8000
    },
    {
        type: 'quote',
        text: '"Freedom to me is the ultimate value. There is nothing higher than freedom"',
        author: "OSHO",
        image: withBase("/images/osho.jpg"),
        source: "https://youtu.be/5ocbZhRQS9I?si=gLKL_4bZxKRr0wcT",
        duration: 10000
    },
    {
        type: 'quote',
        text: "Marriage infact is a precaution taken by the soceity that nobody becomes a rebel. That no body becomes an individual.",
        author: "OSHO",
        image: withBase("/images/osho.jpg"),
        source: "https://youtu.be/CXlMz1Ja2VM?si=1JlB1NmtkmtMZyd_",
        duration: 10000
    },
    {
        type: 'quote',
        text: "Marriage is in it's naked reality a strategy by the soceity to keep everybody under control. And it is in such a subtle way that nobody thinks it atleast in the beginning that it is going to be an imprisonment a lifelong slavery.",
        author: "OSHO",
        image: withBase("/images/osho.jpg"),
        source: "https://youtu.be/CXlMz1Ja2VM?si=Nme_aQMcbaniIhTU",
        duration: 14000
    },
    {
        type: 'quote',
        text: "Marriage has been used by all the soceities in the world in all the ages past as a psychological imprisonment.",
        author: "OSHO",
        image: withBase("/images/osho.jpg"),
        source: "https://youtu.be/CXlMz1Ja2VM?si=Nme_aQMcbaniIhTU",
        duration: 10000
    },
    {
        type: 'quote',
        text: "మనలాంటి యావరేజ్ పీపుల్. పిట్టా బ్రెయిన్స్ ఉన్న వాళ్ళు మాత్రమే పెళ్లి చేసుకుంటారు. జీనియస్ లు ఎవ్వరూ పెళ్లి చేసుకోరు.",
        author: "పురి జగన్నాధ్",
        image: withBase("/images/puri.jpg"),
        source: "https://youtu.be/t7_sXiHWpW8?si=cOyUJOBE_v3UjDrk",
        duration: 8000
    },
    {
        type: 'quote',
        text: "పెళ్లి చేసుకోవడం తప్పని ఏ మతమూ చెప్పదు. చెప్తే మతం ఎగిరిపోద్ది. పెళ్లి చేసుకోక పోతే ప్రీస్ట్ కు పనుండదు. పూజారి కట్ అయితే పూజలు, వ్రతాలు కట్. గుడికెళ్ళే పనుండదు. రిలీజియన్ కట్. ఫైనల్ గా యు లూజ్ కనెక్షన్ విత్ గాడ్. అందుకే వాళ్ళు పెళ్లి గురించి నిజాలు చెప్పరు.",
        author: "పురి జగన్నాధ్",
        image: withBase("/images/puri.jpg"),
        source: "https://youtu.be/t7_sXiHWpW8?si=cOyUJOBE_v3UjDrk",
        duration: 12000
    },
    {
        type: 'quote',
        text: "మిమ్మల్ని మీరు తాడేసి కట్టేసుకోకండి. గానిగెద్దు లాగా అక్కడే తిరుగుతారు.",
        author: "పురి జగన్నాధ్",
        image: withBase("/images/puri.jpg"),
        source: "https://youtu.be/t7_sXiHWpW8?si=cOyUJOBE_v3UjDrk",
        duration: 8000
    },
    {
        type: 'quote',
        text: "Freedom has ultimate value. Breeding and feeding is an endless trauma.",
        author: "Puri Jagannadh",
        image: withBase("/images/puri.jpg"),
        source: "https://youtu.be/t7_sXiHWpW8?si=cOyUJOBE_v3UjDrk",
        duration: 8000
    },
    {
        type: 'faces',
        title: "Thanks for the Engineering Degree",
        duration: 8000,
        people: [
            { name: "Y S Rajasekhara Reddy", role: "Former Chief Minister of Andhra Pradesh", image: withBase("/images/ysr.webp"), url: "https://en.wikipedia.org/wiki/Y._S._Rajasekhara_Reddy" },
            { name: "Y S Jaganmohan Reddy", role: "Former Chief Minister of Andhra Pradesh", image: withBase("/images/ysjagan.jpg"), url: "https://en.wikipedia.org/wiki/Y._S._Jagan_Mohan_Reddy" },
        ]
    },
    {
        type: 'faces',
        title: "Thanks for NTR Bharosa & NTR Vaidya Seva",
        duration: 8000,
        people: [
            { name: "Nara Chandrababu Naidu", role: "Chief Minister of Andhra Pradesh", image: withBase("/images/cbn.jpg"), url: "https://en.wikipedia.org/wiki/N._Chandrababu_Naidu" },
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
            { name: "Puri Jagannadh", role: "For Puri Musings", image: withBase("/images/puri.jpg"), url: "https://en.wikipedia.org/wiki/Puri_Jagannadh" },
            { name: "RGV", role: "For Ramuism", image: withBase("/images/rgv.jpg"), url: "https://en.wikipedia.org/wiki/Ram_Gopal_Varma" },
        ]
    },
    {
        type: 'faces',
        title: "And Ofcourse",
        duration: 8000,
        people: [
            { name: "OSHO", role: "For being OSHO", image: withBase("/images/osho.jpg"), url: "https://en.wikipedia.org/wiki/Rajneesh" },
        ]
    },
    {
        type: 'list',
        title: "Thanks",
        duration: 10000,
        items: [
            { name: "Pankaj Kumar Agarwal", url: "https://www.linkedin.com/in/pankaj-agarwal-723a686/" },
            { name: "Rafi Ali Khan", url: "https://www.linkedin.com/in/rafialikhan/" },
            { name: "Shyam Sundar M", url: "https://www.linkedin.com/in/shyamsundarm/" },
            { name: "Sankaranarayanan (Sankar) Viswanathan", url: "https://www.linkedin.com/in/sankarviswanathan/" },
            { name: "Bhavish Aggarwal", url: "https://twitter.com/bhash" }
        ]
    },
    {
        type: 'message',
        text: "This is a small attempt to show what is obvious. Which has been said by many great minds before me.",
        duration: 8000
    },
    {
        type: 'title',
        text: "Welcome",
        duration: 6000
    },
    // {
    //     type: 'title',
    //     text: "Badvel Venkata Srikanth Reddy",
    //     subtext: "THE DIGITAL LEGACY OF",
    //     duration: 6000
    // },
];

// --- 3. THE COMPONENT ---
export default function Intro({ onFinish }: { onFinish: () => void }) {
    const [index, setIndex] = useState(0);

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'ArrowRight') navigate('next');
            else if (e.code === 'ArrowLeft') navigate('prev');
            else if (e.code === 'Space' || e.code === 'Escape') onFinish();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate, onFinish]);

    useEffect(() => {
        const currentSlide = creditsScript[index];
        const timer = setTimeout(() => {
            navigate('next');
        }, currentSlide.duration);
        return () => clearTimeout(timer);
    }, [index, navigate]);

    const slide = creditsScript[index];

    const isUrl = (str?: string) => {
        if (!str) return false;
        try { new URL(str); return true; } catch { return false; }
    };

    return (
        <motion.div
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white px-6 overflow-hidden select-none"
        >
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80"></div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center"
                >

                    {/* --- TYPE 1: TITLE CARD --- */}
                    {slide.type === 'title' && (
                        <div className="text-center flex flex-col items-center justify-center gap-6">
                            {slide.subtext && (
                                /* VISIBILITY FIX: lighter zinc-400 */
                                <p className="font-sans text-zinc-400 tracking-[0.4em] uppercase text-[10px] md:text-xs animate-pulse">
                                    {slide.subtext}
                                </p>
                            )}
                            <h1 className="font-serif font-bold text-2xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 drop-shadow-xl">
                                {slide.text}
                            </h1>
                        </div>
                    )}

                    {/* --- TYPE 2: QUOTE (WITH AUTHOR IMAGE + VISIBILITY FIX) --- */}
                    {slide.type === 'quote' && (
                        <div className="max-w-3xl text-center flex flex-col items-center">
                            <p className="font-serif text-2xl md:text-4xl italic leading-relaxed text-zinc-200 text-glow">
                                {slide.text}
                            </p>
                            <div className="mt-8 h-px w-12 bg-zinc-700 mx-auto"></div>

                            {/* Author Info Block */}
                            <div className="mt-6 flex items-center justify-center gap-4">
                                {/* Optional Author Image */}
                                {slide.image && (
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700 grayscale contrast-125">
                                        <Image src={slide.image} alt={slide.author} fill className="object-cover" />
                                    </div>
                                )}
                                {/* VISIBILITY FIX: text-zinc-300 instead of 500 */}
                                <p className="text-sm text-zinc-300 uppercase tracking-[0.3em] font-sans font-semibold">
                                    {slide.author}
                                </p>
                            </div>

                            {/* Clickable Source */}
                            {slide.source && (
                                isUrl(slide.source) ? (
                                    <a
                                        href={slide.source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        // VISIBILITY FIX: text-zinc-400 and hover text-zinc-200
                                        className="mt-4 flex items-center gap-2 text-xs text-zinc-400 font-serif italic tracking-wide hover:text-zinc-200 transition-colors cursor-pointer group"
                                    >
                                        <span>( Source )</span>
                                        <ExternalLink size={12} className="opacity-70 group-hover:opacity-100" />
                                    </a>
                                ) : (
                                    <p className="mt-4 text-xs text-zinc-400 font-serif italic tracking-wide">
                                        ( {slide.source} )
                                    </p>
                                )
                            )}
                        </div>
                    )}

                    {/* --- TYPE 3: FACES --- */}
                    {slide.type === 'faces' && (
                        <div className="w-full text-center">
                            {/* VISIBILITY FIX: text-zinc-400 */}
                            <h2 className="text-zinc-400 text-xs uppercase tracking-[0.5em] mb-12">{slide.title}</h2>
                            <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                                {slide.people.map((person, i) => (
                                    <motion.div
                                        key={person.name + i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
                                        className="flex flex-col items-center group"
                                    >
                                        <div className={`relative w-24 h-24 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden border border-zinc-800 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-colors ${person.url ? 'cursor-pointer hover:border-zinc-500' : ''}`}>
                                            {person.url ? (
                                                <a href={person.url} target="_blank" rel="noopener noreferrer">
                                                    <Image src={person.image} alt={person.name} fill className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                                                </a>
                                            ) : (
                                                <Image src={person.image} alt={person.name} fill className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700" />
                                            )}
                                        </div>

                                        {person.url ? (
                                            <a href={person.url} target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors">
                                                <h3 className="font-serif text-lg md:text-2xl text-zinc-200 tracking-wide flex items-center justify-center gap-2">
                                                    {person.name}
                                                </h3>
                                            </a>
                                        ) : (
                                            <h3 className="font-serif text-lg md:text-2xl text-zinc-200 tracking-wide">{person.name}</h3>
                                        )}

                                        {/* VISIBILITY FIX: text-zinc-400 */}
                                        {person.role && <p className="text-xs text-zinc-400 uppercase tracking-widest mt-2">{person.role}</p>}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- TYPE 4: LIST --- */}
                    {slide.type === 'list' && (
                        <div className="text-center">
                            <h2 className="text-zinc-400 text-xs uppercase tracking-[0.5em] mb-10">{slide.title}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                                {slide.items.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.15 + 0.3 }}
                                    >
                                        {item.url ? (
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-3 group cursor-pointer"
                                            >
                                                <span className="font-serif text-xl md:text-2xl text-zinc-300 group-hover:text-white transition-colors">
                                                    {item.name}
                                                </span>
                                                {/* VISIBILITY FIX: text-zinc-500 */}
                                                <Linkedin size={18} className="text-zinc-500 group-hover:text-[#0077b5] transition-colors" />
                                            </a>
                                        ) : (
                                            <span className="font-serif text-xl md:text-2xl text-zinc-300">
                                                {item.name}
                                            </span>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- NEW TYPE: MESSAGE CARD (For Paragraphs) --- */}
                    {slide.type === 'message' && (
                        <div className="max-w-2xl text-center px-4">
                            <p className="font-serif text-xl md:text-3xl text-zinc-200 leading-relaxed font-light whitespace-pre-line tracking-wide">
                                {slide.text}
                            </p>
                            <div className="mt-12 h-px w-12 bg-zinc-800 mx-auto"></div>
                        </div>
                    )}

                </motion.div>
            </AnimatePresence>

            {/* Navigation Hints */}
            <div className="absolute bottom-8 w-full flex flex-col items-center gap-2">
                <div className="flex gap-2 mb-2">
                    {creditsScript.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-white' : 'w-1 bg-zinc-800'}`} />
                    ))}
                </div>
                {/* VISIBILITY FIX: text-zinc-500 */}
                <div className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] flex gap-4">
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