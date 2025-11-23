'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { withBase } from '../utils';

// --- THE SCRIPT ---
const storyChapters = [
    {
        id: "01",
        title: "THE HERD",
        scientificName: "OVIS ARIES", // The Data Link
        status: "TRACKED",
        image: withBase("/images/sheep.jpg"), // Needs a photo of a massive herd
        text: "This is a sheep. It follows the one in front. It finds safety in numbers. It does not know it is being counted. It does not know it is owned."
    },
    {
        id: "02",
        title: "THE COLONY",
        scientificName: "FORMICIDAE",
        status: "COLLECTIVE",
        image: withBase("/images/ants.jpg"), // Needs a macro shot of ants
        text: "These are ants. No single ant has an identity. They are biological machines programmed for the colony. To be an individual is to be a defect."
    },
    {
        id: "03",
        title: "THE MASK",
        scientificName: "MATERIAL LAYER",
        status: "ARTIFICIAL",
        image: withBase("/images/clothing.jpg"), // A photo of a suit, or hanging clothes
        text: "This is clothing. We use it to signal status. We classify humans by the fabric they drape over their skin. A tie commands respect; rags invite pity. But it is just cotton and polyester."
    },
    {
        id: "04",
        title: "THE ETERNAL TRUTH",
        scientificName: "HOMO SAPIENS",
        status: "EXPOSED",
        image: withBase("/images/skin.jpg"), // Abstract texture of skin or a silhouette
        text: "We are born naked. We die naked. Everything in between is a costume. The universe does not tax your soul, but society taxes your existence."
    },
    {
        id: "05",
        title: "THE TAX",
        scientificName: "EXCEPTIONALISM",
        status: "PENALIZED",
        image: withBase("/images/crowd.jpg"), // A blurred crowd or a skyscraper
        text: "Any superpower you possess will be taxed. If you are too fast, they slow you down. If you are too rich, they take your gold. Mediocrity is free; Excellence is expensive."
    },
    {
        id: "06",
        title: "THE APEX",
        scientificName: "FREEDOM",
        status: "UNBOUND",
        image: withBase("/images/tiger.jpg"), // A lone tiger, wolf, or eagle
        text: "There is nothing above Freedom. It is the ultimate value. An Apex Predator chooses its own path. Sometimes, the strongest choice is not to reproduce the cycle, but to end it."
    }
];

export default function VisualStory() {
    return (
        <div className="bg-stone-950">
            {storyChapters.map((chapter, index) => (
                <StorySlide key={chapter.id} chapter={chapter} index={index} />
            ))}
        </div>
    );
}

// --- SUB-COMPONENT: SINGLE SLIDE ---
function StorySlide({ chapter, index }: { chapter: any, index: number }) {
    const ref = useRef(null);

    // Parallax Logic
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Image moves slower than text (Parallax)
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    // Text fades out as you scroll past
    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

    return (
        <section
            ref={ref}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center border-b border-stone-900"
        >

            {/* 1. BACKGROUND IMAGE (Parallax) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
                    <img
                        src={chapter.image}
                        alt={chapter.title}
                        className="w-full h-full object-cover grayscale brightness-[0.3] contrast-125"
                    />
                    {/* Noise Overlay for "Legacy" feel */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </motion.div>
            </div>

            {/* 2. THE DATA HUD (Connecting to your future Stats page) */}
            <div className="absolute top-8 left-8 z-20 font-mono text-[10px] md:text-xs text-stone-500 tracking-widest space-y-2">
                <div className="border-l border-stone-600 pl-3">
                    <p>REF: {chapter.id}</p>
                    <p>SUB: {chapter.scientificName}</p>
                    <p className="text-red-900/80 animate-pulse">STATUS: {chapter.status}</p>
                </div>
            </div>

            {/* 3. THE NARRATIVE (Center Stage) */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 max-w-4xl px-6 text-center"
            >
                {/* Title */}
                <h2 className="font-serif text-5xl md:text-8xl text-stone-200 mb-8 tracking-tight text-glow uppercase">
                    {chapter.title}
                </h2>

                {/* The Philosophy */}
                <p className="font-serif text-xl md:text-3xl text-stone-300 leading-relaxed font-light italic">
                    "{chapter.text}"
                </p>

                {/* Decorator Line */}
                <div className="mt-12 h-px w-24 bg-linear-to-r from-transparent via-stone-500 to-transparent mx-auto opacity-50"></div>
            </motion.div>

        </section>
    );
}