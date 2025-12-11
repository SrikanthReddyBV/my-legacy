'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Film, MapPin, Terminal, Plus, Minus, PlayCircle, History, Shield, Radio } from 'lucide-react';
import { title } from 'process';

// --- IMAGE HELPER ---
const p = (path: string) => process.env.NODE_ENV === 'production' ? path : path;

// --- DATA SECTION ---

const manifesto = {
    name: "Badvel Venkata Srikanth Reddy",
    title: "The Architect",
    location: "Bengaluru, India",
    bio: [
        "I was born in a coordinate where destiny is usually calculated by the village you live in. I refused the calculation.",
        "I am a student of patterns. I look at society and see source code. The sheep, the school uniforms, the corporate badges—they are all just functions in a larger loop.",
        "This archive is my attempt to document the system, verify the data, and perhaps, find the exit."
    ]
};

const timeline = [
    { year: "199X", event: "The Origin", desc: "Born in Andhra Pradesh. The simulation begins." },
    { year: "20XX", event: "The Migration", desc: "Left the village. Realized the world is larger than the herd." },
    { year: "20XX", event: "The Awakening", desc: "Discovered Computer Science. Realized that reality can be programmed." },
    { year: "202X", event: "The Realization", desc: "Understood that freedom is the only currency that matters." },
];

const principles = [
    "Truth > Comfort",
    "Create > Consume",
    "Freedom > Security",
    "Logic > Emotion"
];

// --- LIBRARY (BOOKS) ---
const library = [
    { title: "Sapiens", author: "Yuval Noah Harari", tag: "History", takeaway: "We rule the world because we can believe in fictional stories (Money, Gods, Nations)." },
    { title: "The Beginning of Infinity", author: "David Deutsch", tag: "Science", takeaway: "Problems are inevitable. But all problems are soluble." },
    { title: "Skin in the Game", author: "Nassim Taleb", tag: "Philosophy", takeaway: "Never trust a person who doesn't have something to lose if they are wrong." },
];

// --- CINEMA (MOVIES) ---
const cinema = [
    { title: "Interstellar", author: "Christopher Nolan", tag: "Sci-Fi", takeaway: "Love is the only thing that transcends time and space." },
    { title: "The Matrix", author: "The Wachowskis", tag: "Philosophy", takeaway: "The world is a system designed to blind you from the truth." },
    { title: "C/o Kancharapalem", author: "Venkatesh Maha", tag: "Reality", takeaway: "God is just a layer. Love strips us naked." },
];

// --- SIGNALS (YOUTUBE / PODCASTS) ---
const youtube = [
    {
        title: "Lakdikapool",
        channel: "Puri Jagannadh",
        url: "https://www.youtube.com/embed/MiJCKVBlyLU",
        takeaway: "Hakoona Matata"
    },
    {
        title: "Suicide",
        channel: "Puri Jagannadh",
        url: "https://www.youtube.com/embed/QbGKy8lZovQ",
        takeaway: "Solve your problems and then die"
    },
    {
        title: "Character",
        channel: "Puri Jagannadh",
        url: "https://www.youtube.com/embed/QGVoDpOEwB4",
        takeaway: "Be anti-social"
    },
    {
        title: "Marriage",
        channel: "Puri Jagannadh",
        url: "https://www.youtube.com/embed/t7_sXiHWpW8",
        takeaway: "It's a contract, not a celebration"
    }
];

const faq = [
    {
        question: "Do you believe in God?",
        type: "video",
        videos: [
            {
                url: "https://www.youtube.com/embed/9D05ej8u-gU", // Carl Sagan
                caption: "Perspective: The Pale Blue Dot."
            }
        ]
    },
    {
        question: "Why this website?",
        type: "text",
        answer: "Because biology is temporary. Code is persistent. We spend 80 years building a life, and it vanishes when the brain shuts down. This is my backup drive."
    }
];

// --- COMPONENT ---
export default function AboutPage() {
    const [activeTab, setActiveTab] = useState<'books' | 'movies' | 'youtube'>('books');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-stone-950 text-white selection:bg-white selection:text-black">

            {/* NAVIGATION */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-xs uppercase tracking-widest">Return</span>
                </Link>
                <div className="font-mono text-xs text-stone-500 uppercase tracking-widest hidden md:block">
                    Dossier: SR-001
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">

                {/* 1. THE HEADER */}
                <section className="mb-24">
                    <div className="flex flex-col md:flex-row gap-10 items-start">
                        {/* PHOTO */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                            className="w-full md:w-1/3 relative aspect-[3/4] grayscale contrast-125 border border-stone-800 rounded-sm overflow-hidden"
                        >
                            <Image src={p("/images/dad.jpg")} alt="Profile" fill className="object-cover" />
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        </motion.div>

                        {/* TEXT */}
                        <div className="w-full md:w-2/3">
                            <motion.h1
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                                className="font-serif text-4xl md:text-5xl text-white mb-2 leading-tight"
                            >
                                {manifesto.name}
                            </motion.h1>
                            <p className="font-mono text-xs text-red-500 uppercase tracking-widest mb-8">{manifesto.title}</p>

                            <div className="space-y-6 text-stone-400 font-light text-lg leading-relaxed">
                                {manifesto.bio.map((paragraph, i) => (
                                    <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + (i * 0.1) }}>
                                        {paragraph}
                                    </motion.p>
                                ))}
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-stone-600">
                                <MapPin size={12} />
                                <span>{manifesto.location}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. THE TIMELINE */}
                <section className="mb-32 border-t border-stone-900 pt-16">
                    <div className="flex items-center gap-3 mb-10">
                        <History size={18} className="text-stone-600" />
                        <h2 className="font-mono text-xs text-stone-500 uppercase tracking-[0.3em]">Chronology</h2>
                    </div>
                    <div className="space-y-8 border-l border-stone-800 ml-2 pl-8 relative">
                        {timeline.map((item, i) => (
                            <div key={i} className="relative">
                                <span className="absolute -left-[37px] top-1 h-4 w-4 bg-stone-950 border border-stone-700 rounded-full"></span>
                                <div className="font-mono text-xs text-red-500 mb-1">{item.year}</div>
                                <div className="font-serif text-xl text-white mb-1">{item.event}</div>
                                <div className="text-stone-500 text-sm font-light">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. THE CODE */}
                <section className="mb-32">
                    <div className="flex items-center gap-3 mb-10">
                        <Shield size={18} className="text-stone-600" />
                        <h2 className="font-mono text-xs text-stone-500 uppercase tracking-[0.3em]">Core Principles</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {principles.map((p, i) => (
                            <div key={i} className="p-4 border border-stone-900 bg-stone-900/10 rounded text-stone-400 font-mono text-xs uppercase tracking-widest text-center">
                                {p}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. THE ARCHIVE (Inputs) */}
                <section className="mb-32">
                    {/* TABS */}
                    <div className="flex items-center gap-6 md:gap-8 mb-8 border-b border-stone-800 pb-4 overflow-x-auto">
                        <button onClick={() => setActiveTab('books')} className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${activeTab === 'books' ? 'text-white' : 'text-stone-600 hover:text-stone-400'}`}>
                            <BookOpen size={14} /> Library
                        </button>
                        <button onClick={() => setActiveTab('movies')} className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${activeTab === 'movies' ? 'text-white' : 'text-stone-600 hover:text-stone-400'}`}>
                            <Film size={14} /> Cinema
                        </button>
                        <button onClick={() => setActiveTab('youtube')} className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${activeTab === 'youtube' ? 'text-white' : 'text-stone-600 hover:text-stone-400'}`}>
                            <Radio size={14} /> Signals
                        </button>
                    </div>

                    {/* CONTENT RENDER */}
                    <div className="grid gap-4">

                        {/* --- BOOKS & MOVIES (LIST VIEW) --- */}
                        {(activeTab === 'books' || activeTab === 'movies') && (activeTab === 'books' ? library : cinema).map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group border border-stone-900 bg-stone-900/20 p-6 rounded-lg hover:border-stone-700 transition-colors">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="font-serif text-xl text-stone-200 group-hover:text-white transition-colors">{item.title}</h3>
                                    <span className="font-mono text-[10px] text-stone-600 uppercase tracking-widest">{item.tag}</span>
                                </div>
                                <p className="font-mono text-xs text-stone-500 mb-4 uppercase tracking-wider">{item.author}</p>
                                <p className="font-serif italic text-stone-500 group-hover:text-stone-300 transition-colors">"{item.takeaway}"</p>
                            </motion.div>
                        ))}

                        {/* --- YOUTUBE (VIDEO GRID VIEW) --- */}
                        {activeTab === 'youtube' && (
                            <div className="grid grid-cols-1 gap-8">
                                {youtube.map((item, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group border border-stone-900 bg-stone-900/20 rounded-lg overflow-hidden hover:border-stone-700 transition-colors">

                                        {/* Video Embed */}
                                        <div className="aspect-video bg-black relative">
                                            <iframe src={item.url} className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700" allowFullScreen />
                                        </div>

                                        {/* Text Info */}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-serif text-xl text-stone-200 group-hover:text-white transition-colors">{item.title}</h3>
                                                <span className="font-mono text-[10px] text-stone-600 uppercase tracking-widest">{item.channel}</span>
                                            </div>
                                            <p className="font-serif italic text-stone-500 text-sm group-hover:text-stone-300 transition-colors mt-3">"{item.takeaway}"</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                    </div>
                </section>

                {/* 5. THE INQUIRY (FAQ) */}
                <section className="mb-24 border-t border-stone-900 pt-16">
                    <div className="flex items-center gap-3 mb-10">
                        <Terminal size={18} className="text-stone-600" />
                        <h2 className="font-mono text-xs text-stone-500 uppercase tracking-[0.3em]">The Inquiry</h2>
                    </div>

                    <div className="space-y-4">
                        {faq.map((item: any, i) => (
                            <div key={i} className="border border-stone-900 bg-stone-900/20 rounded overflow-hidden">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left group hover:bg-stone-900/40 transition-colors">
                                    <span className="font-serif text-xl text-stone-300 group-hover:text-white transition-colors">{item.question}</span>
                                    {openFaq === i ? <Minus size={16} className="text-stone-500" /> : <Plus size={16} className="text-stone-500" />}
                                </button>

                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                            <div className="p-6 pt-0 pl-8">
                                                {item.type === 'text' && (
                                                    <p className="font-serif text-stone-400 italic leading-relaxed">"{item.answer}"</p>
                                                )}
                                                {item.type === 'video' && item.videos && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {item.videos.map((vid: any, vIndex: number) => (
                                                            <div key={vIndex} className="w-full">
                                                                <div className="aspect-video bg-black border border-stone-800 rounded relative overflow-hidden">
                                                                    <iframe src={vid.url} className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700" allowFullScreen />
                                                                </div>
                                                                <div className="flex items-center gap-2 mt-3 text-stone-600">
                                                                    <PlayCircle size={12} />
                                                                    <span className="font-mono text-[10px] uppercase tracking-wide">{vid.caption}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="text-center opacity-40 py-10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em]">End of Dossier</p>
                </footer>

            </div>
        </main>
    );
}