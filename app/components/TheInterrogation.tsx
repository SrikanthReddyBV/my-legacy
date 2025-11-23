'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageSquare, PlayCircle } from 'lucide-react';

// --- YOUR ANSWERS ---
const records = [
    {
        id: "Q-001",
        question: "Do you believe in God?",
        type: "video",
        // Replace with the EMBED URL (e.g., https://www.youtube.com/embed/VIDEO_ID)
        videoUrl: "https://www.youtube.com/embed/9D05ej8u-gU", // Example: Carl Sagan's Pale Blue Dot
        caption: "The universe is too vast for a single deity, but too complex to be an accident. This video explains my stance."
    },
    {
        id: "Q-002",
        question: "What is your political ideology?",
        type: "text",
        answer: "I do not subscribe to parties. I subscribe to systems. Politics is often the management of bias. I prefer the management of truth through data and verifiable outcomes."
    },
    {
        id: "Q-003",
        question: "Why this obsession with 'Legacy'?",
        type: "text",
        answer: "Because biology is temporary. Code is persistent. We spend 80 years building a life, only for it to vanish when the neurons stop firing. This archive is an attempt to persist beyond the biological limit."
    },
    {
        id: "Q-004",
        question: "What is the meaning of life?",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/MBRqu0YOH14", // Example: Kurzgesagt
        caption: "Optimistic Nihilism. If the universe has no purpose, we get to dictate our own."
    }
];

export default function TheInterrogation() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 border-t border-stone-900">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-12">
                <MessageSquare className="text-stone-600" size={20} />
                <h2 className="font-mono text-xs text-stone-500 uppercase tracking-[0.3em]">
                    The Interrogation (FAQ)
                </h2>
            </div>

            {/* THE QUESTIONS LIST */}
            <div className="space-y-4">
                {records.map((record, index) => (
                    <div
                        key={record.id}
                        className={`border border-stone-900 bg-stone-900/20 rounded-lg overflow-hidden transition-all duration-500 ${openIndex === index ? 'border-stone-700 bg-stone-900/40' : 'hover:border-stone-800'}`}
                    >

                        {/* THE CLICKABLE QUESTION */}
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between p-6 text-left group"
                        >
                            <div className="flex items-center gap-6">
                                <span className="font-mono text-xs text-stone-600 group-hover:text-stone-400 transition-colors">
                                    {record.id}
                                </span>
                                <span className="font-serif text-xl md:text-2xl text-stone-300 group-hover:text-white transition-colors">
                                    {record.question}
                                </span>
                            </div>

                            <div className="text-stone-600 group-hover:text-white transition-colors">
                                {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                            </div>
                        </button>

                        {/* THE ANSWER (EXPANDABLE) */}
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <div className="p-6 pt-0 pl-16 md:pl-20 border-t border-stone-800/50">

                                        {/* --- IF TEXT TYPE --- */}
                                        {record.type === 'text' && (
                                            <p className="font-serif italic text-stone-400 text-lg leading-relaxed">
                                                "{record.answer}"
                                            </p>
                                        )}

                                        {/* --- IF VIDEO TYPE --- */}
                                        {record.type === 'video' && (
                                            <div className="w-full max-w-2xl">
                                                <div className="relative aspect-video rounded-md overflow-hidden border border-stone-800 bg-black">
                                                    <iframe
                                                        src={record.videoUrl}
                                                        title="Embedded Video"
                                                        className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                                {record.caption && (
                                                    <div className="flex items-start gap-2 mt-4 text-stone-500">
                                                        <PlayCircle size={14} className="mt-1 flex-shrink-0" />
                                                        <p className="font-mono text-xs uppercase tracking-wide leading-relaxed">
                                                            {record.caption}
                                                        </p>
                                                    </div>
                                                )}
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
    );
}