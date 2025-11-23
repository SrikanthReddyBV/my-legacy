'use client';
import { motion } from 'framer-motion';

export default function MainStage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="min-h-screen w-full bg-stone-950"
        >
            {/* Section 1: The Map / Humanity */}
            <section className="flex flex-col md:flex-row min-h-screen">
                {/* Sticky Left Side (Visuals) */}
                <div className="h-64 md:h-screen w-full md:w-1/2 md:sticky md:top-0 bg-stone-900 flex items-center justify-center border-r border-stone-800">
                    <div className="text-stone-500 font-serif text-xl">[ Interactive Map Goes Here ]</div>
                </div>

                {/* Scrolling Right Side (Story) */}
                <div className="w-full md:w-1/2 p-12 md:p-24 space-y-[50vh]">
                    <StoryBlock text="It started with a simple idea. To document what matters." />
                    <StoryBlock text="Humanity has grown from scattered tribes to a global network." />
                    <StoryBlock text="Here is the data that proves our resilience." />
                </div>
            </section>

            {/* Section 2: About You */}
            <section className="min-h-screen flex items-center justify-center bg-stone-900 p-10">
                <div className="max-w-2xl text-center">
                    <h2 className="font-serif text-4xl mb-6">The Philosophy</h2>
                    <p className="text-lg text-stone-400 leading-relaxed">
                        Create more than you consume. Leave the world slightly better than you found it.
                    </p>
                </div>
            </section>

            {/* Section 3: End Credits (Ref List) */}
            <footer className="py-24 bg-black text-center space-y-12">
                <h3 className="font-serif text-2xl tracking-widest text-white mb-10">REFERENCES</h3>

                <CreditSection title="Books">
                    <p>Sapiens</p>
                    <p>The Alchemist</p>
                    <p>Thinking, Fast and Slow</p>
                </CreditSection>

                <CreditSection title="Inspiration">
                    <p>Christopher Nolan</p>
                    <p>Design Principles of Braun</p>
                </CreditSection>

                <div className="pt-20 text-stone-600 text-sm">
                    © 2025 Legacy Project. Open Source.
                </div>
            </footer>
        </motion.div>
    );
}

function StoryBlock({ text }: { text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-30% 0px -30% 0px" }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl font-serif leading-snug text-stone-100"
        >
            {text}
        </motion.div>
    );
}

function CreditSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h4 className="text-stone-500 uppercase tracking-widest text-sm">{title}</h4>
            <div className="text-stone-300 font-serif text-lg space-y-2">{children}</div>
        </div>
    );
}