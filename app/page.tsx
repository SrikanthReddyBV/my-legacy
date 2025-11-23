'use client';
import { useState } from 'react';
import Link from 'next/link'; // <--- Import this
import Intro from './components/Intro';
import CinematicStory from './components/CinematicStory';
import TheLedger from './components/TheLedger';
import TheTagging from './components/TheTagging';
import MementoMori from './components/MementoMori';
import DataPortal from './components/DataPortal';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="bg-stone-950 min-h-screen text-white">
      {!introComplete ? (
        <Intro onFinish={() => setIntroComplete(true)} />
      ) : (
        <div className="animate-in fade-in duration-1000">

          {/* <CinematicStory /> */}
          <TheLedger />
          <TheTagging />
          {/* <MementoMori /> */}

          {/* THE VERIFICATION GRID */}
          <DataPortal />

          {/* --- CINEMATIC FOOTER --- */}
          <footer className="py-24 bg-black relative border-t border-stone-900">

            {/* Background Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 text-center">

              {/* Divider Line */}
              <div className="h-px w-24 bg-stone-800 mx-auto mb-16"></div>

              {/* Navigation Links */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mb-20">

                {/* LINK 1: ABOUT ME */}
                <Link href="/about" className="group text-center">
                  <span className="block font-serif text-2xl md:text-3xl text-stone-500 group-hover:text-white transition-colors duration-500 italic">
                    The Architect
                  </span>
                  <span className="block mt-2 font-mono text-[10px] text-stone-700 uppercase tracking-[0.3em] group-hover:text-stone-400 transition-colors">
                    About Me
                  </span>
                </Link>

                {/* LINK 2: GITHUB / SOURCE */}
                {/* Replace # with your actual GitHub Profile URL later */}
                <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="group text-center">
                  <span className="block font-serif text-2xl md:text-3xl text-stone-500 group-hover:text-white transition-colors duration-500 italic">
                    The Source Code
                  </span>
                  <span className="block mt-2 font-mono text-[10px] text-stone-700 uppercase tracking-[0.3em] group-hover:text-stone-400 transition-colors">
                    Open Repository
                  </span>
                </a>

              </div>

              {/* Final Stamp */}
              <p className="text-stone-800 font-mono text-[10px] uppercase tracking-[0.5em]">
                /// End of Archive ///
              </p>
              <p className="text-stone-900 font-mono text-[9px] mt-4">
                EST. 2025
              </p>
            </div>
          </footer>

        </div>
      )}
    </main>
  );
}