'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Server } from 'lucide-react';

// --- 1. THE NARRATIVE SCRIPT ---
const storyStages = [
    {
        id: "sheep",
        // Wikimedia Image: Single Sheep
        img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Sheep_India_2.jpg",
        title: "The Sheep",
        text: "This is a sheep. \nTo nature, it is a life. To us, it is a harmless animal."
    },
    {
        id: 'shepherd',
        // Wikimedia Image: Indian Shepherd
        img: "https://upload.wikimedia.org/wikipedia/commons/6/67/Sheep_and_herder_India.jpg",
        title: "The Shepherd",
        text: "This is a Shepherd. \nA boy herding the sheep. He may not know physics, but he knows counting."
    },
    {
        id: 'math',
        img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop",
        title: "The Calculation",
        text: "He does the math. \n1 Sheep = ₹10,000. \n10 Sheep = ₹1 Lakh. \n\nHe protects them from the wolf not out of love, but because a dead sheep is a loss of capital. He manages the herd to maximize profit."
    },
    {
        id: 'dog',
        img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2688&auto=format&fit=crop",
        title: "The Police",
        text: "He keeps a dog. The dog is strong enough to kill the sheep, but it doesn't. It herds them. It polices them. \n\nThe sheep fear the dog, but they rely on it for safety. In our world, we call this 'Law and Order'."
    },
    {
        id: 'house',
        img: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2667&auto=format&fit=crop",
        title: "The Coop",
        text: "Now look at us. We build concrete boxes stacked to the sky. \n\nThe Shepherd builds a pen to keep his assets safe. We sign a 20-year mortgage to keep ourselves in a 'Pen' called an Apartment. The logic is identical."
    },
    {
        id: 'car',
        img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop",
        title: "The Transport",
        text: "We buy metal boxes on wheels. We pay tax to buy them, tax to fuel them, and tax to drive them. \n\nWe convince ourselves it is freedom. In reality, it is just a mechanism to transport labor (You) to the factory (Office)."
    },
    {
        id: 'money',
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop",
        title: "The Illusion",
        text: "The Shepherd trades wool for coin. We trade life for paper. \n\nMoney is just a receipt. It is a claim on society. But gold cannot build bridges. Paper cannot heal bones. We chase the symbol, not the reality."
    },
    {
        id: 'freedom',
        img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2661&auto=format&fit=crop",
        title: "The Truth",
        text: "The ultimate truth: You were born naked. You will die naked. \n\nThe Shepherd dies. The Prime Minister dies. The sheep dies. \n\nThe only thing that matters is Freedom. Everything else is just inventory management."
    }
];

// --- 2. SYSTEM ENDPOINTS ---
const systemEndpoints = [
    { name: "UIDAI Registry", type: "Identity", status: "Active", latency: "12ms" },
    { name: "Land Records", type: "Coop Ownership", status: "Indexed", latency: "Monthly" },
    { name: "Vahan Database", type: "Transport Log", status: "Scanning", latency: "Real-time" },
    { name: "Credit Bureau", type: "Financial Score", status: "Tracking", latency: "Daily" },
];

export default function TheRealistTruth() {
    const [activeStage, setActiveStage] = useState(0);

    return (
        <section className="relative w-full min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white selection:text-black">

            {/* --- LEFT PANEL: THE MUSEUM FRAME (Sticky) --- */}
            <div className="hidden md:flex fixed top-0 left-0 w-1/2 h-screen items-center justify-center p-6 lg:p-12">
                <div className="relative w-full max-w-5xl aspect-video bg-neutral-900 border-4 border-neutral-800 shadow-2xl flex items-center justify-center overflow-hidden">

                    {/* Inner Matte */}
                    <div className="absolute inset-0 border-[20px] border-[#151515] z-20 pointer-events-none"></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStage}
                            initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center"
                        >
                            <img
                                src={storyStages[activeStage].img}
                                alt="exhibit"
                                // FIX: Updated Tailwind syntax for arbitrary values
                                className="max-w-full max-h-full object-contain opacity-90 grayscale-[20%] sepia-[10%] contrast-110"
                            />

                            {/* Film Grain */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Caption Tag */}
                    <div className="absolute bottom-8 right-8 z-30 bg-black/80 backdrop-blur-md px-4 py-2 border-l-2 border-emerald-500">
                        <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Exhibit 0{activeStage + 1}</p>
                    </div>
                </div>
            </div>

            {/* --- RIGHT PANEL: THE NARRATIVE SCROLL --- */}
            <div className="w-full md:w-1/2 ml-auto relative z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-l border-white/5">

                {/* Narrative Blocks */}
                {storyStages.map((stage, index) => (
                    <NarrativeBlock
                        key={stage.id}
                        stage={stage}
                        index={index}
                        onActive={setActiveStage}
                    />
                ))}

                {/* --- FOOTER: SYSTEM STATUS --- */}
                <div className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-20 bg-neutral-900 border-t border-white/10">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-2">
                            <Server className="text-emerald-500" size={20} />
                            <h2 className="text-2xl font-bold text-white">Active Controls</h2>
                        </div>
                        <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
                            The systems currently managing the herd.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {systemEndpoints.map((ep, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-black border-l-2 border-neutral-700 hover:border-emerald-500 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <h3 className="font-mono text-sm text-zinc-200">{ep.name}</h3>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{ep.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-[10px] font-mono text-emerald-500">{ep.status}</span>
                                        <Activity size={12} className="text-emerald-500 animate-pulse" />
                                    </div>
                                    <p className="text-[10px] font-mono text-zinc-600 mt-1">{ep.latency}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-dashed border-white/10 text-center">
                        <p className="text-[10px] text-neutral-600 uppercase tracking-[0.2em]">
                            "Born Naked. Die Naked."
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}

// --- SUB-COMPONENT: NARRATIVE BLOCK ---
function NarrativeBlock({ stage, index, onActive }: { stage: any, index: number, onActive: (i: number) => void }) {
    return (
        <motion.div
            onViewportEnter={() => onActive(index)}
            viewport={{ margin: "-50% 0px -50% 0px" }}
            className="min-h-[80vh] flex flex-col justify-center px-8 md:px-16 py-20 border-b border-white/5"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Mobile Image */}
                <div className="md:hidden mb-8 w-full aspect-video relative overflow-hidden rounded-sm border border-white/10">
                    <img
                        src={stage.img}
                        alt="exhibit"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-bold font-mono tracking-widest uppercase text-emerald-500">
                        Exhibit 0{index + 1}
                    </span>
                    <div className="h-px w-12 bg-white/20"></div>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight font-serif">
                    {stage.title}
                </h2>

                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light whitespace-pre-line">
                    {stage.text}
                </p>
            </motion.div>
        </motion.div>
    );
}