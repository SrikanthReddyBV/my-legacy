'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Clapperboard, Activity, Waves, AlertOctagon } from 'lucide-react';

export default function MementoMori() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

    return (
        <div ref={containerRef} className="relative bg-black text-white">

            {/* SCENE 1: THE MOVIE BUSINESS (Metaphor for Life) */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/cinema.jpg" // Image of an empty theater or projector light
                        alt="Cinema"
                        className="w-full h-full object-cover grayscale brightness-[0.3]"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="relative z-10 max-w-4xl px-6 text-center">
                    <Clapperboard className="w-12 h-12 text-stone-500 mx-auto mb-6" />
                    <h2 className="font-serif text-4xl md:text-6xl mb-6 text-glow">The Movie Business</h2>
                    <p className="text-xl md:text-2xl text-stone-300 font-light leading-relaxed">
                        "Life is just a screening. You are the actor, the audience are the customers.
                        We buy tickets, we own the seat for 2 hours, and we think it is ours.
                        But when the credits roll, we must leave the hall."
                    </p>
                </div>
            </section>

            {/* SCENE 2: THE FRAGILITY (The Glitch) */}
            <section className="min-h-screen flex flex-col items-center justify-center bg-red-950/10 relative">
                <div className="max-w-3xl text-center z-10">
                    <h3 className="font-mono text-xs text-red-500 uppercase tracking-[0.5em] mb-12 animate-pulse">
                        System Failure Imminent
                    </h3>

                    <div className="space-y-8">
                        <DeathTrigger
                            icon={<Activity />}
                            cause="CARDIAC ARREST"
                            desc="The pump stops. The ownership ends instantly."
                        />
                        <DeathTrigger
                            icon={<AlertOctagon />}
                            cause="ROAD ACCIDENT"
                            desc="A mechanical error. Your plans for tomorrow are deleted."
                        />
                        <DeathTrigger
                            icon={<Waves />}
                            cause="NATURAL CALAMITY"
                            desc="Flood. Fire. The Earth reclaims its rent."
                        />
                    </div>
                </div>
            </section>

            {/* SCENE 3: THE ULTIMATE TRUTH (The Fade Out) */}
            <section className="h-screen flex items-center justify-center bg-black sticky top-0">
                <motion.div
                    style={{ opacity }}
                    className="text-center"
                >
                    <h2 className="font-serif text-5xl md:text-8xl text-white mb-8 tracking-tighter">
                        BORN NAKED.
                        <br />
                        <span className="text-stone-600">DIED NAKED.</span>
                    </h2>
                    <div className="h-px w-32 bg-stone-800 mx-auto mb-8"></div>
                    <p className="text-stone-500 font-mono text-sm uppercase tracking-widest">
                        Inventory Status: Returned to Source.
                    </p>
                </motion.div>
            </section>

        </div>
    );
}

function DeathTrigger({ icon, cause, desc }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-10%" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6 p-6 border border-stone-800 bg-black/50 hover:border-red-900 transition-colors group"
        >
            <div className="text-stone-600 group-hover:text-red-500 transition-colors">
                {icon}
            </div>
            <div className="text-left">
                <h4 className="text-xl font-serif text-white mb-1 group-hover:text-red-500 transition-colors">
                    {cause}
                </h4>
                <p className="text-stone-500 font-mono text-xs uppercase tracking-wide">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}