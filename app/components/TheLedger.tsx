
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const assets = [
    {
        id: 1,
        subject: "THE CATTLE",
        image: "/images/buffalo.jpg", // Herd of buffaloes
        business: "DAIRY & MEAT BUSINESS",
        input: "Grass + Water",
        output: "Milk + Flesh",
        truth: "The buffalo does not know it is a business. It thinks you are feeding it out of love."
    },
    {
        id: 2,
        subject: "THE STUDENT",
        image: "/images/students.jpg", // Kids in rows
        business: "SCHOOL BUSINESS",
        input: "Uniforms + Books",
        output: "Fees + Grant Aid",
        truth: "1,000 students = 1,000 Revenue Units. The school is the factory; the child is the raw material."
    },
    {
        id: 3,
        subject: "THE TENANT",
        image: "/images/apartment.jpg", // Building windows
        business: "REAL ESTATE BUSINESS",
        input: "Bricks + Mortar",
        output: "Monthly Rent",
        truth: "The house does not care who sleeps in it. It only cares that the rent is paid."
    },
    {
        id: 4,
        subject: "THE DEVOTEE",
        image: "/images/temple-crowd.jpg", // Crowd at a religious place
        business: "GOD BUSINESS",
        input: "Hope + Fear",
        output: "Donations + Offerings",
        truth: "You can have 10 cows, or you can have 10,000 devotees. Both require management. Both yield profit."
    },
    {
        id: 5,
        subject: "THE CITIZEN",
        image: "/images/busy-street.jpg", // City crowd
        business: "NATION BUSINESS",
        input: "Infrastructure",
        output: "Taxes + Labor",
        truth: "It is the people that let the country do its business. Without the sheep, the Shepherd is unemployed."
    }
];

export default function TheLedger() {
    return (
        <div className="bg-stone-950 py-24">
            {assets.map((item, i) => (
                <LedgerCard key={i} item={item} />
            ))}
        </div>
    );
}

function LedgerCard({ item }: { item: any }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1]);

    return (
        <div ref={ref} className="h-screen flex items-center justify-center sticky top-0">
            {/* BACKGROUND IMAGE (Darkened) */}
            <div className="absolute inset-0 z-0">
                <img src={item.image} alt={item.subject} className="w-full h-full object-cover grayscale brightness-[0.25]" />
                <div className="absolute inset-0 bg-stone-950/50 mix-blend-multiply"></div>
            </div>

            {/* THE BALANCE SHEET CARD */}
            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 w-full max-w-2xl bg-black/80 backdrop-blur-md border border-stone-800 p-8 md:p-12 shadow-2xl"
            >
                {/* Header */}
                <div className="flex justify-between items-end mb-8 border-b border-stone-700 pb-4">
                    <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">{item.subject}</h2>
                    <span className="font-mono text-xs text-red-500 animate-pulse uppercase tracking-widest">Asset Class</span>
                </div>

                {/* The Math */}
                <div className="grid grid-cols-2 gap-8 mb-8 font-mono text-xs md:text-sm uppercase tracking-widest">
                    <div>
                        <p className="text-stone-500 mb-1">Business Model</p>
                        <p className="text-white">{item.business}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-stone-500 mb-1">Calculated Net</p>
                        <p className="text-green-500">PROFITABLE</p>
                    </div>
                    <div>
                        <p className="text-stone-500 mb-1">Input (Cost)</p>
                        <p className="text-stone-300">{item.input}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-stone-500 mb-1">Output (Yield)</p>
                        <p className="text-stone-300">{item.output}</p>
                    </div>
                </div>

                {/* The Enlightenment (The Punchline) */}
                <p className="font-serif text-lg md:text-2xl text-stone-200 italic leading-relaxed border-l-2 border-stone-600 pl-6">
                    "{item.truth}"
                </p>

            </motion.div>
        </div>
    );
}