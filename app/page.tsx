'use client';
import { useState } from 'react';
import Intro from './components/Intro';
import MainStage from './components/MainStage';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="bg-stone-950 min-h-screen text-white selection:bg-white selection:text-black">
      {/* While intro is not complete, show Intro. Once done, show MainStage */}
      {!introComplete ? (
        <Intro onFinish={() => setIntroComplete(true)} />
      ) : (
        <MainStage />
      )}
    </main>
  );
}