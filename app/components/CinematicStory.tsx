'use client';
import { motion, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { withBase } from '../utils';

// --- THE NARRATIVE SCRIPT ---
const scenes = [
    // 1. THE OBSERVATION
    {
        id: "sheep",
        image: withBase("/images/sheep.jpg"),
        text: "The Herd.",
        subtext: "You know this is a sheep. But how do you know which is which? Do you show any partiality? Any bias? To you, it is just a number."
    },

    // 2. THE PROBLEM (THE LOST BUFFALO)
    {
        id: "buffalo",
        image: withBase("/images/buffaloes.jpg"),
        text: "The Crisis.",
        subtext: "Suppose you have 2 buffaloes and you lose them. How do you ask around? 'Have you seen a black buffalo?' They all look the same. The police cannot help you without an identifier."
    },

    // 3. THE SOLUTION (OWNERSHIP)
    {
        id: "tag",
        image: withBase("/images/ear-tag.jpg"), // Image of a cow with a yellow ear tag
        text: "The Ear Tag.",
        subtext: "So we invented the Cattle Census. The yellow tag. Now, it is not just a buffalo; it is Asset #4092 linked to an Owner. We did this for ownership."
    },

    // 4. THE STRAY VS DOMESTIC
    {
        id: "stray",
        image: withBase("/images/stray.jpg"), // Dark forest or stray animal
        text: "The Wild.",
        subtext: "A stray buffalo should live on its own in the jungle. If it is useful to you, you extend protection. You feed it, guard it, and eventually kill it in a 'humanitarian' way."
    },

    // 5. THE MACHINES
    {
        id: "cars",
        image: withBase("/images/white-cars.jpg"), // Traffic with many white cars
        text: "The Assembly Line.",
        subtext: "Look at the machines. White cars. Black bikes. They are mass-produced clones. To the naked eye, there is no difference."
    },

    // 6. THE RTO (MACHINE IDENTITY)
    {
        id: "plate",
        image: withBase("/images/number-plate.jpg"), // Close up of license plate
        text: "The Registration.",
        subtext: "To claim ownership, we attach the machine to the RTO. A State Code. A Number. Now, if it is lost, we know exactly who it belongs to."
    },

    // 7. THE HUMAN CONTEXT
    {
        id: "tribe",
        image: withBase("/images/tribe.jpg"), // Tribal person or deep nature
        text: "The Intelligent Species.",
        subtext: "If you are born human, you are the apex. If you live alone in the wild like a tribe, fine. We treat you as wildlife. We don't bother you."
    },

    // 8. THE SOCIETY (RELIGION/NATIONALITY)
    {
        id: "crowd",
        image: withBase("/images/crowd.jpg"),
        text: "The Society.",
        subtext: "But if you come into human society, we must identify you. Which religion? Which nationality? We need systems to know which group claims you."
    },

    // 9. THE INSTITUTION (SCHOOL/OFFICE)
    {
        id: "school",
        image: withBase("/images/school-uniforms.jpg"),
        text: "The Responsibility.",
        subtext: "A kid in a uniform belongs to that school; it is their responsibility. An employee belongs to that company. You are always mapped to an owner."
    }
];

export default function CinematicStory() {
    const [activeScene, setActiveScene] = useState(0);

    return (
        <div className="bg-black font-sans">

            {/* 1. THE STICKY BACKGROUND LAYER */}
            <div className="fixed inset-0 z-0 w-full h-full">
                {scenes.map((scene, index) => (
                    <motion.div
                        key={scene.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === activeScene ? 1 : 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }} // Smooth cross-fade
                        className="absolute inset-0"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={scene.image}
                                alt={scene.text}
                                fill
                                className="object-cover grayscale brightness-[0.3] contrast-125"
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90"></div>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 2. THE SCROLLABLE TEXT TRIGGER LAYER */}
            <div className="relative z-10">
                {scenes.map((scene, index) => (
                    <SceneTrigger
                        key={scene.id}
                        index={index}
                        data={scene}
                        onEnter={() => setActiveScene(index)}
                    />
                ))}

                {/* 3. FINAL LINK TO DATA */}
                <div className="h-[80vh] flex flex-col items-center justify-center">
                    <p className="text-stone-500 font-mono text-xs uppercase tracking-[0.4em] mb-8 animate-pulse">
                        End of Narrative
                    </p>
                    <Link href="/stats" className="group relative px-10 py-5 bg-stone-950/80 backdrop-blur-xl border border-stone-800 rounded-full overflow-hidden transition-all hover:border-stone-500">
                        <div className="relative z-10 flex items-center gap-4 text-stone-300 group-hover:text-white transition-colors">
                            <span className="font-mono text-xs uppercase tracking-widest">Verify The Data</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// --- HELPER COMPONENT ---
function SceneTrigger({ data, index, onEnter }: { data: any, index: number, onEnter: () => void }) {
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
        <div ref={ref} className="h-[150vh] flex items-center justify-center">
            <div className="max-w-4xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="font-mono text-xs text-stone-600 mb-6 uppercase tracking-[0.5em]"
                >
                    Phase {String(index + 1).padStart(2, '0')}
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-serif text-5xl md:text-8xl text-stone-100 mb-10 text-glow uppercase leading-none tracking-tight"
                >
                    {data.text}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-20%" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="font-serif text-xl md:text-3xl text-stone-400 font-light italic leading-relaxed max-w-2xl mx-auto"
                >
                    "{data.subtext}"
                </motion.p>
            </div>
        </div>
    );
}