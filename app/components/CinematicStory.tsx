'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { withBase } from '../utils';

// --- THE SCRIPT ---
const scenes = [
    {
        id: 1,
        image: "https://images.pexels.com/photos/12122505/pexels-photo-12122505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // The Sheep
        text: "This is a sheep.",
        subtext: "To the Shepherd, it is inventory. He shows no bias. He will feed it, protect it, and eventually consume it. This is called 'humanitarian' care."
    },
    {
        id: 2,
        image: withBase("/images/stray-sheep.jpg"), // Replace with an image of a lost/stray sheep or dark forest
        text: "The Outsider.",
        subtext: "If a sheep belongs to another Shepherd, it is an enemy. If it is a stray, it belongs to the jungle. It is not welcome among the civilized herd."
    },
    {
        id: 3,
        image: withBase("/images/tiger.jpg"), // Replace with a Tiger/Predator image
        text: "The Cost of Freedom.",
        subtext: "We domesticate the sheep because they are useful. We fear the Tiger because it is free. So we cage it. Society tolerates submission; it fears autonomy."
    },
    {
        id: 4,
        image: withBase("/images/school-uniforms.webp"), // Replace with School kids
        text: "The First Uniform.",
        subtext: "To manage the herd, we need tags. It starts with a school uniform. A Roll Number (1-100). We teach children to look the same, walk the same, and compete for the Shepherd's favor."
    },
    {
        id: 5,
        image: withBase("/images/employees.webp"), // Replace with Corporate/Swiggy/Factory workers
        text: "The Identification.",
        subtext: "We grow up, but the tags just change. Caste. Religion. Nationality. Company Badge. We need these systems to answer one question: 'Which sheep are you?'"
    },
    {
        id: 6,
        image: withBase("/images/freedom-sky.jpg"), // Abstract sky or mountaintop
        text: "The Ultimate Value.",
        subtext: "There is nothing higher than Freedom. To exist without a tag. To survive without a Shepherd. That is the only true Enlightenment.",
        isFinal: true
    }
];

export default function CinematicStory() {
    // We track which scene is currently active based on scroll
    const [activeScene, setActiveScene] = useState(0);

    return (
        <div className="bg-black">
            {/* 1. THE STICKY BACKGROUND (Changes based on activeScene) */}
            <div className="fixed inset-0 z-0 w-full h-full">
                {scenes.map((scene, index) => (
                    <motion.div
                        key={scene.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === activeScene ? 1 : 0 }}
                        transition={{ duration: 1.5 }} // Slow cross-fade
                        className="absolute inset-0"
                    >
                        <div className="relative w-full h-full">
                            <img
                                src={scene.image}
                                alt="Scene"
                                className="w-full h-full object-cover grayscale brightness-[0.4]"
                            />
                            {/* Cinematic Vignette & Grain */}
                            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black opacity-90"></div>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 2. THE SCROLLABLE TEXT LAYER */}
            <div className="relative z-10">
                {scenes.map((scene, index) => (
                    <SceneTrigger
                        key={scene.id}
                        index={index}
                        data={scene}
                        onEnter={() => setActiveScene(index)}
                    />
                ))}

                {/* 3. THE LINK TO DATA (At the very end) */}
                <div className="h-screen flex items-center justify-center">
                    <Link href="/stats" className="group relative px-8 py-4 bg-stone-900/50 backdrop-blur-md border border-stone-800 rounded-full overflow-hidden transition-all hover:border-white hover:bg-black">
                        <div className="relative z-10 flex items-center gap-4 text-stone-400 group-hover:text-white transition-colors">
                            <span className="font-mono text-xs uppercase tracking-widest">Verify The Data</span>
                            <ArrowRight size={16} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Helper Component to detect scroll position
function SceneTrigger({ data, index, onEnter }: { data: any, index: number, onEnter: () => void }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });

    // Use a hook to trigger state change when this section is in view
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (v > 0 && v < 1) {
                onEnter();
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, onEnter]);

    return (
        <div ref={ref} className="h-[150vh] flex items-center justify-center">
            <div className="max-w-4xl px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 1 }}
                    className="font-serif text-5xl md:text-8xl text-white mb-8 text-glow uppercase leading-none"
                >
                    {data.text}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="font-serif text-xl md:text-3xl text-stone-300 font-light italic leading-relaxed max-w-2xl mx-auto"
                >
                    "{data.subtext}"
                </motion.p>
            </div>
        </div>
    );
}