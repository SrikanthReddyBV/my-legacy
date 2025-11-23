'use client';
import { ExternalLink, Fingerprint, Car, ScanLine, Landmark, Users } from 'lucide-react';
import { motion } from 'framer-motion';

// --- THE EVIDENCE LINKS ---
const portals = [
    {
        title: "HUMAN TRACKING",
        source: "UIDAI Dashboard",
        url: "https://uidai.gov.in/aadhaar_dashboard/", // Real Aadhaar Data
        icon: <Fingerprint className="w-6 h-6" />,
        desc: "1.3 Billion Identities. Biometrically Locked.",
        color: "group-hover:text-red-500"
    },
    {
        title: "MACHINE TRACKING",
        source: "Vahan Dashboard",
        url: "https://analytics.parivahan.gov.in/analytics/", // Real Vahan Data
        icon: <Car className="w-6 h-6" />,
        desc: "Every engine. Every chassis. Geographically mapped.",
        color: "group-hover:text-cyan-500"
    },
    {
        title: "LIVESTOCK TRACKING",
        source: "20th Livestock Census",
        url: "https://bharatpashudhan.ndlm.co.in/", // Animal Husbandry Data
        icon: <ScanLine className="w-6 h-6" />,
        desc: "Ear tags for Cows/Buffaloes. Inventory management.",
        color: "group-hover:text-yellow-500"
    },
    // {
    //     title: "ECONOMIC TRACKING",
    //     source: "GSTN Dashboard",
    //     url: "https://www.gst.gov.in/", // GST Portal
    //     icon: <Landmark className="w-6 h-6" />,
    //     desc: "Every transaction recorded. The tax ledger.",
    //     color: "group-hover:text-green-500"
    // },
    {
        title: "DEVOTEE TRACKING",
        source: "TTD Darshan Stats",
        url: "https://www.tirumala.org/", // TTD Official Data
        icon: <Users className="w-6 h-6" />,
        desc: "Daily Pilgrim Count. Hundi Collections. The God Business.",
        color: "group-hover:text-orange-500" // Saffron/Orange for Religion
    }
];

export default function DataPortal() {
    return (
        <section className="bg-stone-950 py-32 border-t border-stone-900 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* SECTION HEADER */}
                <div className="text-center mb-20">
                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 text-glow">
                        Verify The System
                    </h2>
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-px w-24 bg-stone-800"></div>
                        <p className="text-stone-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
                            Direct Links to Official Tracking Portals
                        </p>
                    </div>
                </div>

                {/* THE GRID OF PORTALS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portals.map((portal, i) => (
                        <PortalCard key={i} data={portal} />
                    ))}
                </div>

                {/* DISCLAIMER FOOTER */}
                <div className="mt-20 text-center opacity-40">
                    <p className="font-mono text-[9px] text-stone-600 uppercase tracking-widest">
                        * Clicking these links redirects to external government servers.
                    </p>
                </div>

            </div>
        </section>
    );
}

function PortalCard({ data }: { data: any }) {
    return (
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block p-px rounded-xl overflow-hidden"
        >
            {/* 1. Glowing Border Effect on Hover */}
            <div className="absolute inset-0 bg-linear-to-r from-stone-800 to-stone-900 group-hover:from-white group-hover:to-stone-500 opacity-50 transition-all duration-500"></div>

            {/* 2. The Card Content */}
            <div className="relative bg-black h-full p-8 rounded-xl flex items-start gap-6 group-hover:bg-stone-950 transition-colors">

                {/* Icon */}
                <div className={`p-4 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 ${data.color} transition-colors`}>
                    {data.icon}
                </div>

                {/* Text Info */}
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-mono text-xs text-stone-500 uppercase tracking-widest group-hover:text-white transition-colors">
                            {data.title}
                        </h3>
                        <ExternalLink size={14} className="text-stone-700 group-hover:text-white transition-colors" />
                    </div>

                    <p className="font-serif text-2xl text-stone-300 group-hover:text-white mb-2 transition-colors">
                        {data.source}
                    </p>

                    <p className="font-light text-sm text-stone-500 leading-relaxed">
                        {data.desc}
                    </p>
                </div>

            </div>
        </a>
    );
}



