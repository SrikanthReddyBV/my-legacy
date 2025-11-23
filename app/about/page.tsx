'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-6">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-stone-500 hover:text-white transition-colors">
                <ArrowLeft size={16} />
                <span className="font-mono text-xs uppercase tracking-widest">Return</span>
            </Link>

            <div className="text-center">
                <h1 className="font-serif text-4xl md:text-6xl mb-6">The Architect</h1>
                <p className="font-mono text-stone-500 text-xs uppercase tracking-widest animate-pulse">
                    Bio Data Loading...
                </p>
            </div>
        </main>
    );
}