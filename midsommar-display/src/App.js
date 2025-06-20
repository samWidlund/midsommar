import './App.css';
import midsummer from './img/midsummer.jpg';
import angryviveca from './img/angryviveca.jpg';
import androidtim from './img/androidtim.jpeg';
import goofyhedlund from './img/goofyhedlund.jpeg';
import goofyviveca from './img/goofyviveca.jpeg';
import skironka from './img/skironka.jpeg';
import snipesamuel from './img/snipesamuel.jpeg';
import flowersbackground from './img/midsummerbackground.jpg';
import { useEffect, useState, useCallback } from 'react';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [joke, setJoke] = useState('');
  const [isLoadingJoke, setIsLoadingJoke] = useState(false);
  const totalSections = 7;

  // Slideshow images
  const slides = [
    angryviveca,
    androidtim,
    goofyhedlund,
    goofyviveca,
    skironka,
    snipesamuel
  ];

  // hugging face ai API
  const fetchJoke = async () => {
    setIsLoadingJoke(true);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/FaisalGh/distilgpt2-joke-generator",
        {
          headers: {
            "Authorization": "Bearer " + process.env.REACT_APP_MIDSUMMER_HF_TOKEN,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: "Tell me a joke:",
            parameters: {
              max_length: 70,
              temperature: 0.7,
            }
          }),
        }
      );
      const result = await response.json();
      if (Array.isArray(result) && result[0]?.generated_text) {
        setJoke(result[0].generated_text);
      } else if (result.error) {
        setJoke('API error: ' + result.error);
      } else {
        setJoke('Failed to load joke. Try again later!');
      }
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Failed to load joke. Try again later!');
    }
    setIsLoadingJoke(false);
  };

  // Add effect for auto-fetching jokes
  useEffect(() => {
    // Fetch initial joke
    fetchJoke();

    // Set up interval for fetching new jokes
    const jokeTimer = setInterval(() => {
      fetchJoke();
    }, 10000); // Fetch new joke every 10 seconds

    return () => clearInterval(jokeTimer);
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    
    if (isScrolling) return;
    setIsAutoScrolling(false);
    
    if (e.deltaY > 0 && currentSection < totalSections - 1) {
      // Scroll down
      setIsScrolling(true);
      setCurrentSection(prev => prev + 1);
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Match this with your transition duration
    } else if (e.deltaY < 0 && currentSection > 0) {
      // Scroll up
      setIsScrolling(true);
      setCurrentSection(prev => prev - 1);
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Match this with your transition duration
    }
  }, [currentSection, totalSections, isScrolling]);

  useEffect(() => {
    const main = document.querySelector('main');
    main.addEventListener('wheel', handleWheel, { passive: false });
    
    // Resume auto-scroll after 5 seconds of no interaction
    let timeout;
    if (!isAutoScrolling) {
      timeout = setTimeout(() => {
        // Smoothly scroll back to the first section
        const scrollToStart = () => {
          setCurrentSection(0);
          setIsAutoScrolling(true);
        };
        scrollToStart();
      }, 5000);
    }

    // Slideshow timer
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      main.removeEventListener('wheel', handleWheel);
      clearTimeout(timeout);
      clearInterval(slideTimer);
    };
  }, [currentSection, isAutoScrolling, handleWheel, slides.length]);

  const handleMouseEnter = useCallback(() => {
    setIsAutoScrolling(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Only resume auto-scroll if we're not in the middle of a manual scroll
    if (!isScrolling) {
      setIsAutoScrolling(true);
    }
  }, [isScrolling]);

  return (
    <main 
      className={`auto-scroll ${!isAutoScrolling ? 'manual-scroll' : ''} cursor-pointer`} 
      style={{ 
        transform: `translateY(-${currentSection * 100}vh)`,
        transition: isAutoScrolling ? 'none' : 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onClick={() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        setCurrentSlide(nextSlide);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hero Section */}
      <section
        className="h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${flowersbackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${midsummer})` }}
        />
        <div className="h-screen w-screen bg-black/80 flex items-center justify-center">
          <div className="w-full flex justify-center">
            <h1 className="text-8xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wider text-center w-full">
              midsommar hos Ines!
            </h1>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section
        className="h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${flowersbackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="w-full p-16">
          <div className="flex justify-center mb-12">
            <h2 className="text-7xl text-center font-extrabold bg-white/95 text-gray-900 px-16 py-8 rounded-2xl shadow-2xl border-2 border-yellow-400 drop-shadow-lg inline-block w-full">
              Agenda
            </h2>
          </div>
          <div className="bg-white/95 p-12 rounded-2xl shadow-2xl border-2 border-gray-400 w-full flex justify-center">
            <ul className="space-y-10 text-4xl text-gray-900 font-bold w-full max-w-3xl mx-auto">
              <li className="flex items-center gap-8">
                <span className="font-bold text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/90 px-6 py-2 rounded-lg text-5xl min-w-[170px] text-center">
                  11:00
                </span>
                <span className="text-4xl">start kransfix</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="font-bold text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/90 px-6 py-2 rounded-lg text-5xl min-w-[170px] text-center">
                  12:30
                </span>
                <span className="text-4xl">två st lekar</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="font-bold text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/90 px-6 py-2 rounded-lg text-5xl min-w-[170px] text-center">
                  13:30
                </span>
                <span className="text-4xl">lunch</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="font-bold text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-black/90 px-6 py-2 rounded-lg text-5xl min-w-[170px] text-center">
                  14:30
                </span>
                <span className="text-4xl">tre st lekar</span>
              </li>
              <li className="flex items-center gap-8 text-3xl">
                <span className="min-w-[170px]"></span>
                <span>middag löser vi enkelt, e.x pizza?</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Jokes Section */}
      <section
        className="h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${flowersbackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="w-full p-16">
          <div className="flex justify-center mb-12">
            <h2 className="text-7xl text-center font-extrabold bg-white/95 text-gray-900 px-16 py-8 rounded-2xl shadow-2xl border-2 border-yellow-400 drop-shadow-lg inline-block w-full">
              AI Skämt
            </h2>
          </div>
          <div className="bg-white/95 p-12 rounded-2xl shadow-2xl border-2 border-gray-400 w-full">
            <div className="min-h-[300px] flex items-center justify-center">
              {isLoadingJoke ? (
                <div className="text-gray-900 text-4xl font-bold">Laddar skämt...</div>
              ) : (
                <p className="text-gray-900 text-4xl text-center font-bold transition-opacity duration-500">
                  {joke}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5 Kamp Section */}
      <section
        className="h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${flowersbackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="w-full p-16">
          <div className="flex justify-center mb-12">
            <h2 className="text-7xl text-center font-extrabold bg-white/95 text-gray-900 px-16 py-8 rounded-2xl shadow-2xl border-2 border-yellow-400 drop-shadow-lg inline-block w-full">
              5 Kamp
            </h2>
          </div>
          <div className="bg-white/95 p-12 rounded-2xl shadow-2xl border-2 border-gray-400 w-full">
            <ul className="space-y-10 text-4xl text-gray-900 font-bold text-center">
              <li>1. kasta stövel</li>
              <li>2. flip cup</li>
              <li>3. trebent löpning</li>
              <li>4. irländsk julafton</li>
              <li>5. dragkamp</li>
              <li className="text-3xl">extra - kubb & fylla glaset</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section
        className="h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${flowersbackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="w-full p-16">
          <div className="flex justify-center mb-12">
            <h2 className="text-7xl text-center font-extrabold bg-white/95 text-gray-900 px-16 py-8 rounded-2xl shadow-2xl border-2 border-yellow-400 drop-shadow-lg inline-block w-full">
              Lag
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-16 w-full">
            <div className="bg-white/95 p-12 rounded-2xl shadow-2xl border-2 border-gray-400 w-full">
              <h3 className="text-5xl mb-8 text-center text-gray-900 font-bold">Lag 1</h3>
              <ul className="space-y-6 text-3xl text-gray-900 font-bold text-center">
                <li>• viveca</li>
                <li>• samuel</li>
                <li>• signe</li>
                <li>• tim</li>
                <li>• sebbe</li>
              </ul>
            </div>
            <div className="bg-white/95 p-12 rounded-2xl shadow-2xl border-2 border-gray-400 w-full">
              <h3 className="text-5xl mb-8 text-center text-gray-900 font-bold">Lag 2 (lite sämre😂)</h3>
              <ul className="space-y-6 text-3xl text-gray-900 font-bold text-center">
                <li>• lea</li>
                <li>• kelam</li>
                <li>• lisa</li>
                <li>• ines</li>
                <li>• robin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slideshow Section */}
      <section
        className="h-screen w-screen flex items-center justify-center cursor-pointer"
        style={{
          backgroundImage: `url(${flowersbackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
        onClick={() => {
          const nextSlide = (currentSlide + 1) % slides.length;
          setCurrentSlide(nextSlide);
        }}
      >
        <div className="w-full p-16">
          <div className="flex justify-center mb-12">
            <h2 className="text-7xl text-center font-extrabold bg-white/95 text-gray-900 px-16 py-8 rounded-2xl shadow-2xl border-2 border-yellow-400 drop-shadow-lg inline-block w-full">
              Goofy bilder
            </h2>
          </div>
          <div className="bg-white/95 p-12 rounded-2xl shadow-2xl border-2 border-gray-400 w-full">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/70 w-full">
              {slides.map((slide, index) => (
                <img 
                  key={index}
                  src={slide} 
                  alt="Minnesbild" 
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-6 h-6 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-yellow-300' : 'bg-gray-400'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section
        className="h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${flowersbackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        <div className="flex justify-center w-full">
          <span className="text-5xl font-light tracking-wide bg-white/95 text-gray-900 px-16 py-8 rounded-2xl shadow-2xl border-2 border-yellow-400 drop-shadow-lg inline-block w-full text-center">
            © 2024 Samuel Widlund
          </span>
        </div>
      </section>
    </main>
  );
}

export default App;
