'use client';
import { useState, useEffect } from 'react';
import Intro from './components/Intro';
import CinematicStory from './components/CinematicStory';
import TheLedger from './components/TheLedger';
import TheTagging from './components/TheTagging';
import MementoMori from './components/MementoMori';
import VisualNarrative from './components/VisualNarrative';
import DataPortal from './components/DataPortal';
import Link from 'next/link';

// New Imports
import TimeLock from './components/TimeLock';
import Disclaimer from './components/Disclaimer';
import { LAUNCH_DATE } from './config';

export default function Home() {
  // STATES
  const [isLocked, setIsLocked] = useState(true);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // Prevents flash of content

  // 1. CHECK TIME ON LOAD
  useEffect(() => {
    const now = new Date().getTime();
    const launch = new Date(LAUNCH_DATE).getTime();

    if (now >= launch) {
      setIsLocked(false);
    }
    setIsChecking(false);
  }, []);

  // RENDER LOGIC
  if (isChecking) return <div className="min-h-screen bg-black" />; // Black screen while checking time

  // PHASE 1: TIME LOCK
  if (isLocked) {
    return <TimeLock onUnlock={() => setIsLocked(false)} />;
  }

  // PHASE 2: DISCLAIMER
  // if (!disclaimerAccepted) {
  //   return <Disclaimer onAccept={() => setDisclaimerAccepted(true)} />;
  // }

  // PHASE 3: INTRO & MAIN SITE
  return (
    <main className="bg-stone-950 min-h-screen text-white">
      {!introComplete ? (
        <Intro onFinish={() => setIntroComplete(true)} />
      ) : (
        <div className="animate-in fade-in duration-1000">
          {/* <CinematicStory /> */}
          {/* <TheLedger /> */}
          {/* <TheTagging /> */}
          {/* <MementoMori /> */}

          {/* THE VERIFICATION GRID */}
          <VisualNarrative />
          <DataPortal />

          {/* --- FOOTER --- */}
          <footer className="py-24 bg-black relative border-t border-stone-900">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="h-px w-24 bg-stone-800 mx-auto mb-16"></div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mb-20">
                <Link href="/about" className="group text-center">
                  <span className="block font-serif text-2xl md:text-3xl text-stone-500 group-hover:text-white transition-colors duration-500 italic">
                    The Architect
                  </span>
                  <span className="block mt-2 font-mono text-[10px] text-stone-700 uppercase tracking-[0.3em] group-hover:text-stone-400 transition-colors">
                    About Me
                  </span>
                </Link>
                <a href="https://github.com/SrikanthReddyBV/my-legacy" target="_blank" rel="noreferrer" className="group text-center">
                  <span className="block font-serif text-2xl md:text-3xl text-stone-500 group-hover:text-white transition-colors duration-500 italic">
                    The Source Code
                  </span>
                  <span className="block mt-2 font-mono text-[10px] text-stone-700 uppercase tracking-[0.3em] group-hover:text-stone-400 transition-colors">
                    Open Repository
                  </span>
                </a>
              </div>
              <p className="text-stone-600 font-mono text-[10px] uppercase tracking-[0.5em]">
                /// End of Archive ///
              </p>
              <p className="text-stone-700 font-mono text-[9px] mt-4">
                EST. 2025
              </p>
            </div>
          </footer>
        </div>
      )}
    </main>
  );
}