'use client';
import { motion, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { withBase } from '../utils';

// --- THE STORY SCRIPT ---
const narrative = [
    // ACT 1: THE ANIMAL (Utility & Identification)
    {
        id: "buffalo",
        image: withBase("/images/buffalo.jpg"),
        chapter: "I. THE ASSET",
        title: "The Value of Utility",
        text: "This is a buffalo. It gives milk. It has value. Because it is useful to me, I feed it. I protect it. I mourn it when it dies. This is not just love; it is resource management."
    },
    {
        id: "herd",
        image: withBase("/images/herd.jpg"),
        chapter: "I. THE ASSET",
        title: "The Problem of Sameness",
        text: "If I have two, I know I have two. That is simple math. But if one gets lost in the herd, how do I claim it? To the stranger, all buffaloes look the same."
    },
    {
        id: "tag",
        image: withBase("/images/ear-tag.jpg"),
        chapter: "I. THE ASSET",
        title: "The Identification",
        text: "So we invented the Tag. The Livestock Census. We pierce the ear with plastic. Now, it is not just a beast; it is a registered number. The system can now police the ownership."
    },

    // ACT 2: THE HUMAN (Tribal to Institutional)
    {
        id: "tribe",
        image: withBase("/images/tribe.jpg"),
        chapter: "II. THE TRIBE",
        title: "The Genetic Asset",
        text: "Humans are no different. We form tribes to manage our own stock. Marriage, lineage, the preference for a male heir—it is all an ancient strategy to ensure our genetic capital survives rivalry."
    },
    {
        id: "school",
        image: withBase("/images/school-uniform.jpg"),
        chapter: "II. THE TRIBE",
        title: "The Institutional Tag",
        text: "We want better for our stock. So we send them to the factory of education. We put them in uniforms. We replace names with Roll Numbers. Attendance is not about presence; it is about inventory check."
    },
    {
        id: "corporate",
        image: withBase("/images/id-card.jpg"),
        chapter: "II. THE TRIBE",
        title: "The Leased Identity",
        text: "You grow up, but the tag remains. You wear the company ID. You are User #4920. If you are laid off, the ID dies. The email vanishes. You never owned your status; you were just renting it."
    },

    // ACT 3: THE PROPERTY vs THE SOUL
    {
        id: "vehicle",
        image: withBase("/images/number-plate.jpg"),
        chapter: "III. THE PROPERTY",
        title: "The Registered Machine",
        text: "Look at a car. We know its Make, its Model, its State Code, its Owner. It is a dead object, perfectly tracked. You can own a car. You can own a cow. You can own a house."
    },
    {
        id: "freedom",
        image: withBase("/images/sky.jpg"),
        chapter: "IV. THE TRUTH",
        title: "The Unownable",
        text: "But you cannot own a human. We are the Apex. We can be tracked, tagged, and taxed, but the soul rejects the cage. For a human, Freedom is the only currency that holds ultimate value."
    }
];

export default function VisualNarrative() {
    const [activeScene, setActiveScene] = useState(0);

    return (
        <div className="bg-black font-sans relative">

            {/* 1. THE CINEMATIC VIEWPORT (Sticky Background) */}
            <div className="fixed inset-0 z-0 w-full h-full">
                {narrative.map((scene, index) => (
                    <motion.div
                        key={scene.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === activeScene ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={scene.image}
                                alt={scene.title}
                                fill
                                className="object-cover grayscale brightness-[0.3] contrast-125"
                                priority={index === 0}
                            />
                            {/* Vignette for focus */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
                            {/* Scanline Texture */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 2. THE SCROLLABLE STORY TRACK */}
            <div className="relative z-10">
                {narrative.map((scene, index) => (
                    <StoryCard
                        key={scene.id}
                        data={scene}
                        index={index}
                        onEnter={() => setActiveScene(index)}
                    />
                ))}
                {/* REMOVED THE EXTRA LINK SECTION HERE */}
                {/* The user will simply scroll past this into the next component (TheLedger) */}
                <div className="h-[20vh]"></div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENT: THE TEXT CARD ---
function StoryCard({ data, index, onEnter }: { data: any, index: number, onEnter: () => void }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (v > 0 && v < 1) {
                onEnter();
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, onEnter]);

    return (
        <div ref={ref} className="h-[130vh] flex items-center justify-center md:justify-end md:pr-24">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-black/40 backdrop-blur-lg border-l-2 border-white p-8 max-w-lg rounded-r-sm shadow-2xl mr-4 ml-4 md:mr-0"
            >
                {/* Chapter Header */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.3em]">
                        {data.chapter}
                    </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
                    {data.title}
                </h2>

                {/* The Story Text */}
                <p className="font-sans text-sm md:text-lg text-stone-300 leading-relaxed font-light opacity-90">
                    {data.text}
                </p>
            </motion.div>
        </div>
    );
}