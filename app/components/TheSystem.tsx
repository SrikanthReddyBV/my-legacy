'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Hash, Users, Briefcase, Fingerprint } from 'lucide-react';

// --- THE PIPELINE DATA (Based on your text) ---
const stages = [
    {
        title: "The Coordinate",
        icon: <MapPin className="w-5 h-5" />,
        text: "If you are born in a village where there is no facility, your destiny is pre-calculated. You are considered 'Tribal' not by choice, but by coordinate. The location defines the ceiling.",
        highlight: "Origin = Destiny"
    },
    {
        title: "The Number (1-100)",
        icon: <Hash className="w-5 h-5" />,
        text: "You go to school because the law says 'Right to Education.' But inside, you are assigned a Roll Number: 1 to 100. You are remembered by that number. Your complexity is collapsed into an integer.",
        highlight: "Identity = Integer"
    },
    {
        title: "The Competition",
        icon: <Users className="w-5 h-5" />,
        text: "From all schools, numbers compete against other numbers. If you score high, you are processed to the next belt. If you score low, you are discarded. The system filters for compliance, not genius.",
        highlight: "Value = Rank"
    },
    {
        title: "The Rental",
        icon: <Briefcase className="w-5 h-5" />,
        text: "You belong to a company as long as you work for that company. You wear their badge. You use their email. When you leave, they recover the identity. You were never the owner; you were a subscriber.",
        highlight: "Status = Rented"
    },
    {
        title: "The Awakening",
        icon: <Fingerprint className="w-5 h-5" />,
        text: "This Archive exists to document the human behind the number. To prove that we existed outside the payroll. To break the loop.",
        highlight: "Legacy = Freedom"
    }
];

export default function TheSystem() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // The Line Animation: Fills up as you scroll
    const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-stone-950 py-32 overflow-hidden">

            {/* SECTION TITLE */}
            <div className="text-center mb-32 relative z-10 px-4">
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-4 text-glow">The Pipeline</h2>
                <p className="font-mono text-stone-500 text-xs uppercase tracking-[0.3em]">
                    Algorithmic Determinism
                </p>
            </div>

            <div className="max-w-5xl mx-auto relative px-6">

                {/* THE CENTRAL TRACK (Grey Background Line) */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-stone-800 transform -translate-x-1/2"></div>

                {/* THE GLOWING TRACK (Fills on Scroll) */}
                <motion.div
                    style={{ height: lineHeight }}
                    className="absolute left-8 md:left-1/2 top-0 w-px bg-linear-to-b from-white via-cyan-500 to-transparent transform -translate-x-1/2 z-0 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                />

                {/* THE STAGES */}
                <div className="space-y-32 md:space-y-48">
                    {stages.map((stage, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20%" }}
                            transition={{ duration: 0.8 }}
                            className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >

                            {/* 1. CONTENT CARD */}
                            <div className="w-full md:w-1/2 pl-20 md:pl-0 md:px-16">
                                <div className={`flex flex-col ${i % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}>

                                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">{stage.title}</h3>

                                    <p className="text-stone-400 font-light leading-relaxed text-sm md:text-lg mb-6">
                                        {stage.text}
                                    </p>

                                    <div className="inline-block px-4 py-2 border border-stone-800 rounded-full bg-stone-900/50 backdrop-blur-md">
                                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                                            {stage.highlight}
                                        </span>
                                    </div>

                                </div>
                            </div>

                            {/* 2. CENTER NODE (The Icon) */}
                            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-stone-950 border border-stone-700 rounded-full flex items-center justify-center z-10 shadow-2xl group hover:border-white transition-all duration-500">
                                    <div className="text-stone-500 group-hover:text-white transition-colors duration-300">
                                        {stage.icon}
                                    </div>
                                </div>
                            </div>

                            {/* 3. EMPTY SPACER (For Layout Balance) */}
                            <div className="w-full md:w-1/2 hidden md:block"></div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}