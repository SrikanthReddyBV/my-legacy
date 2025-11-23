'use client';
import { motion } from 'framer-motion';
import { Fingerprint, ScanLine, AlertTriangle } from 'lucide-react';

export default function TheTagging() {
    return (
        <section className="min-h-screen bg-stone-900 flex flex-col items-center py-32 px-6 relative overflow-hidden">

            {/* Header Narrative */}
            <div className="max-w-4xl text-center mb-24 z-10">
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">The Identification Problem</h2>
                <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed mb-6">
                    "If I lose my cow, I go to the village. The cow cannot speak. It looks like every other cow.
                    To claim it, I need proof. To solve the dispute, the police need a map."
                </p>
                <p className="text-white font-serif italic text-2xl">
                    Identity is the bridge between the Asset and the Owner.
                </p>
            </div>

            {/* The Visual Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-10">

                {/* CARD 1: THE COW */}
                <IdentityCard
                    title="THE CATTLE"
                    problem="Looks identical. Wanders off."
                    solution="EAR TAG / BRANDING"
                    code="ID: #CATTLE-4092"
                    owner="Farmer's Property"
                />

                {/* CARD 2: THE CAR */}
                <IdentityCard
                    title="THE MACHINE"
                    problem="Mass produced. Moving asset."
                    solution="LICENSE PLATE"
                    code="REG: KA-01-EQ-9999"
                    owner="Registered Owner"
                />

                {/* CARD 3: THE HUMAN */}
                <IdentityCard
                    title="THE HUMAN"
                    problem="Born Naked. Hard to track."
                    solution="NAME / CASTE / AADHAR"
                    code="UID: 0000 1111 2222"
                    owner="State / Jurisdiction"
                    isHuman={true}
                />

            </div>

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </section>
    );
}

function IdentityCard({ title, problem, solution, code, owner, isHuman }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`bg-stone-950 border ${isHuman ? 'border-red-900' : 'border-stone-800'} p-8 rounded-lg relative overflow-hidden group`}
        >
            {/* Scanner Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>

            <div className="flex justify-between items-start mb-6">
                <h3 className="font-mono text-stone-500 text-xs uppercase tracking-widest">{title}</h3>
                {isHuman ? <Fingerprint className="text-red-500" /> : <ScanLine className="text-stone-600" />}
            </div>

            <div className="space-y-6">
                <div>
                    <p className="text-stone-600 text-[10px] uppercase tracking-wider mb-1">The Problem</p>
                    <p className="text-stone-300 font-serif italic">"{problem}"</p>
                </div>

                <div>
                    <p className="text-stone-600 text-[10px] uppercase tracking-wider mb-1">The Fix</p>
                    <p className="text-xl md:text-2xl text-white font-bold">{solution}</p>
                </div>

                <div className="p-4 bg-black/50 rounded border border-stone-800 font-mono text-xs">
                    <div className="flex justify-between mb-2">
                        <span className="text-stone-500">TRACKING ID:</span>
                        <span className="text-green-500">{code}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-stone-500">OWNERSHIP:</span>
                        <span className={isHuman ? "text-red-500 animate-pulse" : "text-stone-300"}>{owner}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}