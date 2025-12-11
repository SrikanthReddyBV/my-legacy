'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

// --- THE NARRATIVE ---
const scenes = [
    {
        id: 'sheep',
        img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Sheep_India_2.jpg",
        title: "The Biological Unit",
        text: "Here is a sheep. To the wild, it is just a life. Grazing, breathing, existing. It has no name. It has no worry about tomorrow. It follows the grass, innocent of the economy that surrounds it."
    },
    {
        id: 'shepherd',
        img: "https://upload.wikimedia.org/wikipedia/commons/6/67/Sheep_and_herder_India.jpg",
        title: "The Manager",
        text: "And here is the Shepherd. He may not know physics, but he knows counting. He protects them from the wolf, not because he loves them, but because a dead sheep is a loss of capital. He manages the herd to maximize his inventory."
    },
    {
        id: 'school',
        img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2670&auto=format&fit=crop",
        title: "The Training",
        text: "He wants his children to be safe, so he sends them to school. Same uniform. Same rows. Same bell. They learn to sit still. They are being batched, graded, and quality-checked for the workforce."
    },
    {
        id: 'house',
        img: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2667&auto=format&fit=crop",
        title: "The Cage",
        text: "He builds a shelter. Mud hut or concrete box. It protects him from rain, but mostly it proves he exists. He works thirty years to own the key to his own cage, yet he calls it a home."
    },
    {
        id: 'end',
        img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2661&auto=format&fit=crop",
        title: "The Truth",
        text: "One day, the counting stops. The herd remains. The ledger remains. But the man is gone. Born naked. Died naked. Just a tourist passing through."
    }
];

export default function DescriptiveGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const newIndex = Math.min(scenes.length - 1, Math.floor(latest * scenes.length));
        setIndex(newIndex);
    });

    return (
        <section ref={containerRef} className="relative bg-black min-h-[600vh] w-full selection:bg-white/20">

            {/* STICKY CONTENT VIEWPORT */}
            <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">

                {/* 1. LEFT SIDE: THE IMAGE (Massive) */}
                <div className="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden bg-zinc-900">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={scenes[index].id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                src={scenes[index].img}
                                className="w-full h-full object-cover grayscale-[20%] contrast-125"
                                alt="Narrative scene"
                            />
                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* 2. RIGHT SIDE: THE STORY */}
                <div className="w-full md:w-2/5 h-1/2 md:h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-black">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={scenes[index].id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-md"
                        >
                            <span className="text-zinc-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">
                                Exhibit 0{index + 1}
                            </span>

                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 tracking-tight">
                                {scenes[index].title}
                            </h2>

                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-serif italic text-justify md:text-left">
                                {scenes[index].text}
                            </p>

                            {/* Decorative divider */}
                            <div className="mt-12 h-[1px] w-12 bg-zinc-800" />
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

            {/* PROGRESS HINT */}
            <div className="fixed bottom-10 right-10 flex gap-2 z-50">
                {scenes.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 transition-all duration-700 ${i === index ? 'w-8 bg-white' : 'w-2 bg-zinc-800'}`}
                    />
                ))}
            </div>
        </section>
    );
}