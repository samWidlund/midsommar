import './App.css';
import midsummer from './img/midsummer.jpg';
import { useEffect, useState, useCallback } from 'react';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const totalSections = 4;

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    
    if (e.deltaY > 0 && currentSection < totalSections - 1) {
      // Scroll down
      setCurrentSection(prev => prev + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
      // Scroll up
      setCurrentSection(prev => prev - 1);
    }
    
    // Pause auto-scroll when manually scrolling
    setIsAutoScrolling(false);
  }, [currentSection, totalSections]);

  useEffect(() => {
    const main = document.querySelector('main');
    main.addEventListener('wheel', handleWheel, { passive: false });
    
    // Resume auto-scroll after 5 seconds of no manual scrolling
    let timeout;
    if (!isAutoScrolling) {
      timeout = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 5000);
    }

    return () => {
      main.removeEventListener('wheel', handleWheel);
      clearTimeout(timeout);
    };
  }, [currentSection, isAutoScrolling, handleWheel]);

  return (
    <main className={`auto-scroll ${!isAutoScrolling ? 'manual-scroll' : ''}`} style={{ transform: `translateY(-${currentSection * 100}vh)` }}>
      {/* Hero Section */}
      <section className="h-screen w-screen relative">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${midsummer})` }}
        />
        <div className="h-screen w-screen bg-black/80 flex items-center justify-center">
          <h1 className="text-6xl font-semibold text-white drop-shadow-lg tracking-wider">
            midsommar hos Ines!
          </h1>
        </div>
      </section>

      {/* Agenda Section */}
      <section className="h-screen w-screen flex items-center justify-center">
        <div className="max-w-2xl w-full p-8">
          <h2 className="text-4xl font-semibold text-white mb-8 text-center drop-shadow-lg">Agenda</h2>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <ul className="space-y-4 text-xl text-white">
              <li>1. ses kl 11:00 - kransar</li>
              <li>2. två st lekar 12:30</li>
              <li>3. mat ca 13:30</li>
              <li>4. tre st lekar 14:30</li>
              <li>5. middag lös något enkelt - ekebygrillen pizza?</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5 Kamp Section */}
      <section className="h-screen w-screen flex items-center justify-center">
        <div className="max-w-2xl w-full p-8">
          <h2 className="text-4xl font-semibold text-white mb-8 text-center drop-shadow-lg">5 Kamp</h2>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <ul className="space-y-4 text-xl text-white">
              <li>1. kasta stövel</li>
              <li>2. flip cup</li>
              <li>3. kubb</li>
              <li>4. irländsk julafton</li>
              <li>5. dragkamp</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="h-screen w-screen flex items-center justify-center">
        <div className="max-w-4xl w-full p-8">
          <h2 className="text-4xl font-semibold text-white mb-8 text-center drop-shadow-lg">Lag</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl mb-4 text-center text-white">Lag 1</h3>
              <ul className="space-y-2 text-xl text-white">
                <li>viveca</li>
                <li>samuel</li>
                <li>signe</li>
                <li>tim</li>
                <li>sebbe</li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl mb-4 text-center text-white">Lag 2</h3>
              <ul className="space-y-2 text-xl text-white">
                <li>lea</li>
                <li>kelam</li>
                <li>lisa</li>
                <li>ines</li>
                <li>robin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
