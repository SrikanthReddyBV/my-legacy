'use client';
import TheSystem from '../components/TheSystem';
import MainStage from '../components/MainStage';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function StatsPage() {
    return (
        <main className="bg-stone-950 min-h-screen">

            {/* Navigation Header */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    <span className="font-mono text-xs uppercase tracking-widest">Back to Story</span>
                </Link>
                <div className="font-mono text-xs text-stone-500 uppercase tracking-widest">
                    System Verification /// Data Log
                </div>
            </nav>

            <div className="pt-24">
                {/* 1. The Pipeline Explanation */}
                <TheSystem />

                {/* 2. The Maps & Charts */}
                <MainStage />
            </div>

            {/* Footer */}
            <footer className="py-20 text-center text-stone-600 font-mono text-xs">
                Data Sources: Census of India, World Bank, Global Freedom Index.
            </footer>
        </main>
    );
}