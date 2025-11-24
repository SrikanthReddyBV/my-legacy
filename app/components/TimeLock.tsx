'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LAUNCH_DATE } from '../config';
import { Lock } from 'lucide-react';

export default function TimeLock({ onUnlock }: { onUnlock: () => void }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setInterval(() => {
            const remaining = calculateTimeLeft();
            setTimeLeft(remaining);

            if (Object.keys(remaining).length === 0) {
                clearInterval(timer);
                onUnlock();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [onUnlock]);

    function calculateTimeLeft() {
        const difference = +new Date(LAUNCH_DATE) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                m: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }

    if (!isMounted) return <div className="bg-black min-h-screen"></div>;

    return (
        <div className="fixed inset-0 z-[70] bg-black flex flex-col items-center justify-center text-white px-6 overflow-hidden select-none">

            {/* --- 1. SHARED CINEMATIC BACKGROUND (Matches Intro) --- */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80"></div>

            {/* Breathing Light Effect */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">

                {/* --- 2. THE TITLE (Matches Intro Font/Gradient) --- */}
                <div className="mb-16 text-center space-y-6">
                    <div className="flex justify-center mb-6">
                        <Lock size={20} className="text-zinc-600" />
                    </div>
                    <h1 className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 drop-shadow-2xl">
                        Unlocks In
                    </h1>
                    <div className="h-px w-24 bg-zinc-800 mx-auto"></div>
                </div>

                {/* --- 3. THE COUNTDOWN (Ultra-Clean) --- */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {Object.keys(timeLeft).length > 0 ? (
                        <>
                            <TimeBox val={(timeLeft as any).d} label="DAYS" />
                            <Separator />
                            <TimeBox val={(timeLeft as any).h} label="HOURS" />
                            <Separator />
                            <TimeBox val={(timeLeft as any).m} label="MINUTES" />
                            <Separator />
                            <TimeBox val={(timeLeft as any).s} label="SECONDS" />
                        </>
                    ) : (
                        <div className="text-white font-mono text-xl tracking-[0.5em] animate-pulse">
                            SYSTEM UNLOCKED
                        </div>
                    )}
                </div>

                {/* --- 4. THE FOOTER (Matches Intro Subtext) --- */}
                <div className="mt-24 text-center">
                    <p className="font-mono text-[10px] md:text-xs text-zinc-600 uppercase tracking-[0.4em] mb-4">
                        Scheduled For
                    </p>
                    <p className="font-serif text-xl text-zinc-400 tracking-wider">
                        {new Date(LAUNCH_DATE).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>

            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function TimeBox({ val, label }: { val: number, label: string }) {
    return (
        <div className="flex flex-col items-center">
            {/* Number: Massive, Thin, Monospace */}
            <div className="text-5xl md:text-8xl font-light font-mono text-white tracking-tighter drop-shadow-lg tabular-nums">
                {String(val).padStart(2, '0')}
            </div>
            {/* Label: Tiny, Zinc color */}
            <span className="text-[9px] md:text-[10px] text-zinc-600 mt-4 uppercase tracking-[0.4em]">
                {label}
            </span>
        </div>
    );
}

function Separator() {
    return (
        <div className="hidden md:block text-4xl md:text-7xl font-thin text-zinc-800 -mt-2 select-none animate-pulse">
            :
        </div>
    )
}