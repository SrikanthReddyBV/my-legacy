'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Activity, Database, Globe, Wifi, Lock, Calculator } from 'lucide-react';

// --- 1. THE NARRATIVE SCRIPT ---
const storyStages = [
    // --- STEP 1: THE UNIT ---
    {
        id: 'unit',
        icon: "https://cdn-icons-png.flaticon.com/512/1998/1998610.png", // Single Sheep
        title: "The Unit",
        color: "text-emerald-400",
        text: "This is one sheep. Harmless. To the Shepherd, this is not an animal. It is a biological bank note. \n\nValue: ₹10,000."
    },

    // --- STEP 2: THE MATH ---
    {
        id: 'math',
        icon: "https://cdn-icons-png.flaticon.com/512/3284/3284648.png", // Herd / Calculator
        title: "The Calculation",
        color: "text-emerald-400",
        text: "Now, look at ten sheep. Do the math. \n10 x ₹10,000 = ₹1 Lakh. \n\nIt is no longer nature; it is a portfolio. The Shepherd feeds them not because he loves them, but to prevent his asset from depreciating."
    },

    // --- STEP 3: THE ENFORCER ---
    {
        id: 'dog',
        icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png", // Dog / Police
        title: "The Enforcer",
        color: "text-blue-400",
        text: "We keep a dog. The dog is strong. It could eat the sheep, but it won't. Why? Because I feed it bones. \n\nIts job is to police the herd. To stop thieves. The dog is the Police. The sheep are the Citizens."
    },

    // --- STEP 4: REAL ESTATE ---
    {
        id: 'house',
        icon: "https://cdn-icons-png.flaticon.com/512/609/609803.png", // House / Cage
        title: "The Coop",
        color: "text-violet-400",
        text: "Now apply the math to humans. We build concrete coops called 'Apartments.' \n\nYou pay EMI for 20 years to own a box in the sky. The builder counts square feet exactly like the Shepherd counts wool."
    },

    // --- STEP 5: TRANSPORT ---
    {
        id: 'car',
        icon: "https://cdn-icons-png.flaticon.com/512/3202/3202926.png", // Car
        title: "The Metal Box",
        color: "text-yellow-400",
        text: "You buy a car. A metal box to move you from your concrete box (Home) to your production box (Office). \n\nIt burns fuel. You pay tax on the car, tax on the fuel, and tax on the road. The system charges you for the privilege of going to work."
    },

    // --- STEP 6: THE ILLUSION ---
    {
        id: 'money',
        icon: "https://cdn-icons-png.flaticon.com/512/2454/2454269.png", // Paper Money
        title: "The Paper",
        color: "text-amber-400",
        text: "We chase money. But money is just colored paper. Gold cannot build bridges. Paper cannot heal bones. \n\nIt is just a receipt. We trade our limited freedom for this paper."
    },

    // --- STEP 7: THE END ---
    {
        id: 'freedom',
        icon: "https://cdn-icons-png.flaticon.com/512/3094/3094851.png", // Open Door
        title: "The Exit",
        color: "text-rose-400",
        text: "The ultimate truth: You were born naked. You will die naked. \n\nThe house stays here. The car stays here. The dog stays here. \n\nThere is nothing higher than Freedom. Walk alone."
    }
];

// --- 2. SYSTEM ENDPOINTS ---
const systemEndpoints = [
    { name: "UIDAI (Aadhaar)", type: "Identity Tracking", status: "Active", latency: "12ms" },
    { name: "RERA Registry", type: "Coop Ownership", status: "Indexed", latency: "Monthly" },
    { name: "Vahan Database", type: "Vehicle Tracking", status: "Scanning", latency: "Real-time" },
    { name: "CIBIL Score", type: "Financial Obedience", status: "Scoring", latency: "Daily" },
    { name: "FASTag Network", type: "Movement Log", status: "Live", latency: "0.4s" },
    { name: "Banking API", type: "Asset Freeze Capability", status: "Linked", latency: "Instant" },
];

export default function TheCalculatedTruth() {
    const [activeStage, setActiveStage] = useState(0);

    return (
        <section className="relative w-full min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">

            {/* --- LEFT PANEL: VISUAL ANCHOR --- */}
            <div className="hidden md:flex fixed top-0 left-0 w-1/2 h-screen items-center justify-center p-12 lg:p-24">
                <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">

                    {/* Atmospheric Glow */}
                    <div className="absolute inset-0 bg-white/5 blur-[80px] rounded-full opacity-20 animate-pulse"></div>

                    {/* Rotating Ring */}
                    <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStage}
                            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                            transition={{ duration: 0.6, ease: "anticipate" }}
                            className="relative z-10"
                        >
                            <img
                                src={storyStages[activeStage].icon}
                                alt="icon"
                                className="w-64 h-64 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* --- RIGHT PANEL: NARRATIVE SCROLL --- */}
            <div className="w-full md:w-1/2 ml-auto relative z-10 bg-neutral-950/90 backdrop-blur-sm border-l border-white/5">

                {/* Header */}
                <div className="h-[30vh] flex flex-col justify-end px-8 md:px-16 pb-8 border-b border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-emerald-500">
                        <Calculator size={16} />
                        <span className="font-mono text-xs uppercase tracking-[0.4em] animate-pulse">
                            Valuation Logic
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                        The Inventory
                    </h1>
                </div>

                {/* Narrative Blocks */}
                {storyStages.map((stage, index) => (
                    <NarrativeBlock
                        key={stage.id}
                        stage={stage}
                        index={index}
                        onActive={setActiveStage}
                    />
                ))}

                {/* --- FOOTER: API DASHBOARD --- */}
                <div className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-20 bg-neutral-900 border-t border-white/10">
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-2">
                            <Server className="text-neutral-500" size={20} />
                            <h2 className="text-2xl font-bold text-white">System Integrations</h2>
                        </div>
                        <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
                            Your existence is currently synced with the following management grids.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {systemEndpoints.map((ep, i) => (
                            <div key={i} className="group flex items-center justify-between p-4 bg-black border border-white/5 rounded hover:border-emerald-500/30 transition-all duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded bg-neutral-900 text-neutral-400 group-hover:text-emerald-400 transition-colors">
                                        {i % 2 === 0 ? <Database size={16} /> : <Globe size={16} />}
                                    </div>
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
                        <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-4">
                            End of File
                        </p>
                        <p className="text-[10px] text-neutral-600">
                            "Walk Alone."
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
                transition={{ duration: 0.6 }}
            >
                {/* Mobile Icon */}
                <img src={stage.icon} alt="icon" className="w-16 h-16 mb-8 md:hidden opacity-90 drop-shadow-lg" />

                <div className={`flex items-center gap-3 mb-6 ${stage.color}`}>
                    <span className="text-xs font-bold font-mono tracking-widest uppercase">
                        Item 0{index + 1}
                    </span>
                    <div className="h-px w-12 bg-current opacity-40"></div>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {stage.title}
                </h2>

                <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light whitespace-pre-line">
                    {stage.text}
                </p>
            </motion.div>
        </motion.div>
    );
}