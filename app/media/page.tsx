'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, X, Maximize2 } from 'lucide-react';

// --- DATA ---
const galleryItems = [
    { id: 1, src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80", title: "The Alpine" },
    { id: 2, src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80", title: "Classroom" },
    { id: 3, src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80", title: "Urban Grid" },
    { id: 4, src: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=800&q=80", title: "The Construct" },
    { id: 5, src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80", title: "Cosmos" },
    { id: 6, src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80", title: "Texture" },
    { id: 7, src: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80", title: "Storm" },
    { id: 8, src: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800&q=80", title: "Legacy" },
    { id: 9, src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80", title: "Deep Forest" },
    { id: 10, src: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=800&q=80", title: "Texture II" },
];

export default function MediaPage() {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    return (
        <main className="min-h-screen bg-stone-950 text-white selection:bg-white selection:text-black">

            {/* Background Noise */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0"></div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-xs uppercase tracking-widest">Return</span>
                </Link>
                <div className="font-mono text-xs text-stone-500 uppercase tracking-widest hidden md:block">
                    Visual Logs // Auto-Gallery
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-10">

                {/* Header */}
                <div className="mb-16 border-b border-stone-800 pb-8">
                    <h1 className="font-serif text-5xl md:text-7xl text-white mb-4 tracking-tight">The Visual Log</h1>
                    <p className="font-mono text-xs text-stone-500 uppercase tracking-[0.3em]">
                        Automated Collage System
                    </p>
                </div>

                {/* --- MASONRY GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                    {galleryItems.map((item, index) => (
                        <SmartImage
                            key={item.id}
                            item={item}
                            index={index}
                            onClick={() => setSelectedItem(item)}
                        />
                    ))}
                </div>

            </div>

            {/* --- LIGHTBOX (UPDATED) --- */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50">
                            <X size={32} />
                        </button>

                        <motion.div
                            // Removed layoutId to stop the morphing/shrinking animation
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }} // Clean Fade Out
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative w-full max-w-5xl h-[80vh] rounded-lg overflow-hidden border border-stone-800 shadow-2xl bg-stone-900"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedItem.src}
                                alt={selectedItem.title}
                                fill
                                className="object-contain"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-8 pt-24">
                                <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">{selectedItem.title}</h2>
                                <p className="font-mono text-xs text-stone-400 uppercase tracking-widest">
                                    SOURCE: ARCHIVE // IMG_{selectedItem.id}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}

// --- SMART COMPONENT ---
function SmartImage({ item, index, onClick }: { item: any, index: number, onClick: () => void }) {
    const [span, setSpan] = useState("row-span-1");
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            // Removed layoutId here as well
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={onClick}
            className={`group relative overflow-hidden rounded-sm cursor-pointer border border-stone-800 bg-stone-900 ${span}`}
        >
            <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700 ease-out"
                onLoadingComplete={(target) => {
                    const ratio = target.naturalHeight / target.naturalWidth;
                    if (ratio > 1.2) {
                        setSpan("row-span-2");
                    }
                    setIsLoaded(true);
                }}
            />

            <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-mono text-[10px] text-stone-300 uppercase tracking-widest mb-1">IMG_0{item.id}</p>
                    <h3 className="font-serif text-xl text-white">{item.title}</h3>
                </div>
            </div>

            <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <Maximize2 size={16} />
            </div>
        </motion.div>
    );
}