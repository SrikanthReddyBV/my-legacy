'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { withBase } from '../utils';

// --- DATA ---
const slides = [
    { id: 1, src: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&q=90", title: "The Beginning", date: "2010" },
    { id: 2, src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&q=90", title: "The Ascent", date: "2012" },
    { id: 3, src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1600&q=90", title: "The Summit", date: "2015" },
    { id: 4, src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1600&q=90", title: "The Lesson", date: "2018" },
    { id: 5, src: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=1600&q=90", title: "The Architecture", date: "2020" },
];

export default function CinematicSlidesPage() {
    const [index, setIndex] = useState(0);

    // --- INFINITE LOOP ENGINE ---
    useEffect(() => {
        const timer = setInterval(() => {
            // Moves to next index, wraps around to 0 when it hits the end
            setIndex((prev) => (prev + 1) % slides.length);
        }, 6000); // 6 Seconds per slide

        return () => clearInterval(timer);
    }, []);

    const currentSlide = slides[index];

    return (
        <main className="fixed inset-0 w-screen h-screen bg-black overflow-hidden selection:bg-white selection:text-black">

            {/* 1. PERMANENT CINEMATIC OVERLAYS (Grain + Vignette + Gloss) */}
            <div className="absolute inset-0 z-40 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
                {/* Heavy Vignette for focus */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
                {/* Glossy sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20 mix-blend-overlay"></div>
            </div>

            {/* 2. MINIMAL NAVIGATION (Fade out on idle could be added, but kept visible for UX) */}
            <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white/60 hover:text-white transition-colors">
                <Link href="/" className="flex items-center gap-2 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-xs uppercase tracking-widest">Return to Base</span>
                </Link>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50">
                    Memory Stream • {index + 1}/{slides.length}
                </div>
            </nav>

            {/* 3. THE DISSOLVE ENGINE */}
            <AnimatePresence mode='popLayout'>
                {/* popLayout ensures the exiting image stays in place while the new one fades in on top */}
                <motion.div
                    key={index} // Changing key triggers the animation
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }} // Slow, dreamy fade (2 seconds)
                    className="absolute inset-0 w-full h-full"
                >
                    {/* THE IMAGE + KEN BURNS ZOOM */}
                    <div className="relative w-full h-full">
                        <motion.div
                            className="relative w-full h-full"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.15 }} // Slowly zooms in
                            transition={{ duration: 10, ease: "linear" }} // Takes longer than the slide duration so it never stops moving
                        >
                            <Image
                                src={currentSlide.src}
                                alt={currentSlide.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Text Gradient Protection */}
                        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                    </div>

                    {/* CAPTION (Fades in slightly later for drama) */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }} // Wait 1s before showing text
                        className="absolute bottom-16 left-6 md:left-16 z-30 max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-16 bg-white/50"></div>
                            <span className="font-mono text-xs text-white/70 uppercase tracking-[0.4em]">
                                {currentSlide.date}
                            </span>
                        </div>
                        <h1 className="font-serif text-5xl md:text-8xl text-white text-glow leading-none tracking-tight drop-shadow-2xl">
                            {currentSlide.title}
                        </h1>
                    </motion.div>

                </motion.div>
            </AnimatePresence>

        </main>
    );
}