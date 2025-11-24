'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../config';

export default function Disclaimer({ onAccept }: { onAccept: () => void }) {
    return (
        <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center px-6">
            {/* Subtle Grain Texture for Film Look */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }} // Very slow, cinematic fade
                className="max-w-xl w-full text-center relative z-10"
            >

                {/* Decorative Top Line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-px bg-white mx-auto mb-12"
                />

                {/* The Text */}
                <div className="space-y-8 mb-16">
                    {DISCLAIMER_TEXT.map((line, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 + (i * 0.2) }} // Staggered fade in
                            className={`
                leading-relaxed tracking-wide
                ${i === 0 ? "font-mono text-xs text-stone-500 uppercase tracking-[0.4em] mb-8" : "font-serif text-lg md:text-2xl text-stone-300 font-light"}
                ${i === DISCLAIMER_TEXT.length - 1 ? "italic text-white" : ""}
              `}
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>

                {/* The Button */}
                <motion.button
                    onClick={onAccept}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="group inline-flex items-center gap-4 px-8 py-3 border-b border-stone-800 hover:border-white transition-all duration-500"
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-500 group-hover:text-white transition-colors">
                        Enter The Archive
                    </span>
                    <ArrowRight size={14} className="text-stone-500 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
                </motion.button>

            </motion.div>
        </div>
    );
}