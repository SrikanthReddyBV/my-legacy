'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw } from 'lucide-react';

// --- 1. THE SCRIPT (With Timing) ---
const movieScript = [
    {
        id: 1,
        img: "https://images.unsplash.com/photo-1484557985045-6f550bf43735?q=80&w=2694&auto=format&fit=crop", // Sheep
        text: "This is a sheep.",
        sub: "It eats. It sleeps. It follows.",
        duration: 5000 // 5 seconds
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1504566728033-6c84307db113?q=80&w=2600&auto=format&fit=crop", // Buffalo
        text: "This is a buffalo.",
        sub: "Stronger. Bigger. But still... a follower.",
        duration: 5000
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1534981197940-593644a49652?q=80&w=2752&auto=format&fit=crop", // Herd
        text: "This is a herd.",
        sub: "Individual fear creates collective safety.",
        duration: 6000
    },
    {
        id: 4,
        img: "https://images.unsplash.com/photo-1473183579198-5c4d241772f7?q=80&w=2669&auto=format&fit=crop", // Shepherd
        text: "This is the Shepherd.",
        sub: "He loves the sheep. Because he loves the wool. And the meat.",
        duration: 7000
    },
    {
        id: 5,
        img: "https://images.unsplash.com/photo-1542282946-7788195861b7?q=80&w=2670&auto=format&fit=crop", // Human Uniforms
        text: "Now... look at us.",
        sub: "Uniforms. Idols. Flags.",
        duration: 6000
    },
    {
        id: 6,
        img: "https://images.unsplash.com/photo-1531233633649-0d195f190d79?q=80&w=2674&auto=format&fit=crop", // Crowd
        text: "We are just a herd with better costumes.",
        sub: "The fence is in your mind.",
        duration: 8000
    }
];

export default function CinemaMode() {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false); // Start paused or true to auto-start
    const [hasEnded, setHasEnded] = useState(false);

    // --- Auto-Advance Logic ---
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isPlaying && !hasEnded) {
            const currentDuration = movieScript[index].duration;

            timer = setTimeout(() => {
                if (index < movieScript.length - 1) {
                    setIndex((prev) => prev + 1);
                } else {
                    setIsPlaying(false);
                    setHasEnded(true);
                }
            }, currentDuration);
        }

        return () => clearTimeout(timer);
    }, [index, isPlaying, hasEnded]);

    // Restart Handler
    const handleRestart = () => {
        setIndex(0);
        setHasEnded(false);
        setIsPlaying(true);
    };

    const currentScene = movieScript[index];

    return (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col items-center justify-center">

            {/* --- LAYER 1: THE MOVIE SCREEN --- */}
            <div className="relative w-full h-full md:w-[90%] md:h-[80%] overflow-hidden bg-black shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentScene.id}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 2, ease: "easeOut" } // Fade in speed
                        }}
                        exit={{ opacity: 0, transition: { duration: 1 } }}
                        className="absolute inset-0"
                    >
                        {/* The Image with "Ken Burns" Slow Zoom Effect */}
                        <motion.div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${currentScene.img})` }}
                            animate={{ scale: [1, 1.05] }} // Subtle zoom during the slide
                            transition={{ duration: currentScene.duration / 1000, ease: "linear" }}
                        />

                        {/* Dark Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    </motion.div>
                </AnimatePresence>

                {/* --- LAYER 2: SUBTITLES / TEXT --- */}
                <div className="absolute bottom-10 left-0 w-full text-center px-4 pb-8 md:pb-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentScene.text}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            <h2 className="font-serif text-3xl md:text-5xl text-white mb-4 drop-shadow-md">
                                {currentScene.text}
                            </h2>
                            <p className="font-sans text-sm md:text-lg text-zinc-400 uppercase tracking-[0.2em]">
                                {currentScene.sub}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- LAYER 3: GRAIN OVERLAY (Cinematic Feel) --- */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </div>

            {/* --- CONTROLS --- */}
            {/* Hidden during play, visible on hover or if paused */}
            <div className="absolute bottom-6 flex gap-6 z-50">
                {!hasEnded && (
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-zinc-500 hover:text-white transition-colors"
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                )}

                {hasEnded && (
                    <button
                        onClick={handleRestart}
                        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase tracking-widest text-xs"
                    >
                        <RefreshCw size={16} /> Replay Story
                    </button>
                )}
            </div>

            {/* --- LETTERBOX BARS (Optional: Covers top/bottom if on huge screens) --- */}
            <div className="hidden md:block absolute top-0 w-full h-[10%] bg-black z-40"></div>
            <div className="hidden md:block absolute bottom-0 w-full h-[10%] bg-black z-40"></div>

            {/* --- PROGRESS BAR (Optional) --- */}
            {isPlaying && (
                <motion.div
                    key={index}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: currentScene.duration / 1000, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-red-700 z-50"
                />
            )}
        </div>
    );
}