'use client';
import { useState } from 'react';
import Intro from './components/Intro';
import CinematicStory from './components/CinematicStory';
import TheLedger from './components/TheLedger';
import TheTagging from './components/TheTagging';
import MementoMori from './components/MementoMori';
import DataPortal from './components/DataPortal'; // <--- The new External Links Grid

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

          <footer className="py-12 bg-black text-center border-t border-stone-900">
            <p className="text-stone-800 font-mono text-[10px] uppercase tracking-widest">
              End of Archive
            </p>
          </footer>
        </div>
      )}
    </main>
  );
}