'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function TheHerd() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Generate 100 "Sheep" (Numbers 1 to 100)
    const sheep = Array.from({ length: 100 }, (_, i) => i + 1);

    return (
        <section className="min-h-screen bg-stone-950 flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">

            {/* 1. THE METAPHOR (Text) */}
            <div className="max-w-3xl text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-8 leading-tight text-glow">
                        "The Shepherd has 100 sheep."
                    </h2>
                    <div className="flex flex-col gap-6 text-stone-400 text-lg md:text-xl font-light leading-relaxed font-serif italic">
                        <p>
                            He shows no bias on which one to eat first. To the system, the stock is identical.
                        </p>
                        <p className="text-white">
                            We need identity not to be seen, but to identify who we are.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* 2. THE GRID (Visual Proof) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 grid grid-cols-10 gap-2 md:gap-3 p-6 border border-stone-800 bg-black/40 backdrop-blur-sm rounded-xl shadow-2xl"
            >
                {sheep.map((num) => (
                    <SheepNode
                        key={num}
                        num={num}
                        isHovered={hoveredIndex === num}
                        onHover={() => setHoveredIndex(num)}
                        onLeave={() => setHoveredIndex(null)}
                    />
                ))}
            </motion.div>

            {/* Background Ambient Glow (Red for the "Shepherd/Danger" vibe) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>
        </section>
    );
}

// Sub-component for individual nodes
function SheepNode({ num, isHovered, onHover, onLeave }: any) {
    return (
        <motion.div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={`
        relative w-6 h-6 md:w-10 md:h-10 flex items-center justify-center rounded cursor-crosshair transition-all duration-300
        ${isHovered ? 'bg-white scale-125 z-20' : 'bg-stone-900/80 hover:bg-stone-800'}
      `}
        >
            {/* State 1: The Number (The System's View) */}
            <span className={`text-[8px] md:text-[10px] font-mono transition-colors ${isHovered ? 'text-black font-bold' : 'text-stone-700'}`}>
                {isHovered ? 'ME' : num}
            </span>

            {/* State 2: The Identity Glow (Only when hovered) */}
            {isHovered && (
                <motion.div
                    layoutId="glow"
                    className="absolute inset-0 rounded bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}
        </motion.div>
    );
}