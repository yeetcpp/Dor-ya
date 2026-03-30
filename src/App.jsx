import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Collection from './components/Collection';
import Craft from './components/Craft';
import Closing from './components/Closing';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Collection />
        <Craft />
        <Closing />
      </main>
    </>
  );
}

export default App;
