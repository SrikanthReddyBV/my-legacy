'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

// --- 1. THE VISUAL EVIDENCE SEQUENCE ---
const sequence = [
    {
        id: 'sheep',
        img: "https://upload.wikimedia.org/wikipedia/commons/6/67/Sheep_and_herder_India.jpg"
    },
    {
        id: 'school',
        img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 'police',
        img: "https://upload.wikimedia.org/wikipedia/commons/3/35/Mumbai_Traffic_Police.jpg"
    },
    {
        id: 'army',
        img: "https://images.unsplash.com/photo-1580129931178-d081a636779e?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 'delivery-1',
        img: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c301?q=80&w=2600&auto=format&fit=crop"
    },
    {
        id: 'delivery-2',
        img: "https://i.pinimg.com/originals/1d/e2/60/1de260946561399dc3639f63303d3d5d.jpg"
    },
    {
        id: 'traffic-cars',
        img: "https://images.unsplash.com/photo-1566847438217-76e82d383f84?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 'traffic-bikes',
        img: "https://images.unsplash.com/photo-1558545867-657e15933c33?q=80&w=2670&auto=format&fit=crop"
    }
];

export default function TheVisualEvidence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Track scroll progress through the long container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- THE FIX IS HERE ---
    // We use useMotionValueEvent instead of useTransform.
    // This listens for changes safely without breaking the render loop.
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const rawIndex = Math.floor(latest * sequence.length);
        const newIndex = Math.min(sequence.length - 1, Math.max(0, rawIndex));

        // ONLY update state if it is different. This prevents the re-render loop.
        setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
    });

    return (
        <section
            ref={containerRef}
            // 900vh height ensures we have plenty of scroll space for 8 images
            className="relative w-full bg-[#0a0a0a] min-h-[900vh]"
        >

            {/* --- FIXED VISUAL STAGE --- */}
            <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={sequence[activeIndex].id}
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        {/* The Image with slow zoom effect & Noir filters */}
                        <motion.img
                            src={sequence[activeIndex].img}
                            alt="evidence"
                            className="w-full h-full object-cover grayscale-[30%] contrast-110 brightness-90"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.1 }} // Slow Ken Burns zoom effect
                            transition={{ duration: 10, ease: "linear" }}
                        />

                        {/* Cinematic Overlays */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                    </motion.div>
                </AnimatePresence>

                {/* Progress Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {sequence.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} />
                    ))}
                </div>
            </div>


            {/* --- SCROLL SPACER --- */}
            <div className="h-[800vh] w-full pointer-events-none relative z-10"></div>


            {/* --- THE FINAL REVEAL (The Theory) --- */}
            <div className="relative z-20 h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-8 md:p-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-3xl"
                >
                    <span className="font-mono text-xs text-red-500 tracking-[0.5em] uppercase mb-8 block animate-pulse">
                        Final Analysis
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 leading-tight font-serif">
                        The Difference is an Illusion.
                    </h1>

                    <div className="space-y-6 text-xl md:text-2xl text-neutral-400 font-light leading-relaxed font-sans">
                        <p>
                            You watched them pass. Different uniforms. Different colors. Different masters.
                        </p>
                        <p>
                            But the pattern is identical.
                        </p>
                        <p className="text-white font-normal">
                            Whether it is wool, a degree, a badge, or a delivery box—it is all just inventory management.
                        </p>
                        <p>
                            We kept the herd behavior. We just upgraded the costumes.
                        </p>
                    </div>

                    <div className="mt-24">
                        <p className="text-xs text-neutral-600 font-mono uppercase tracking-widest">
                            End of Record.
                        </p>
                    </div>
                </motion.div>
            </div>

        </section>
    );
}