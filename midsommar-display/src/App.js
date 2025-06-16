import './App.css';
import midsummer from './img/midsummer.jpg';

function App() {
  return (
    <div className="min-h-[200vh] relative">
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${midsummer})` }}
      />
      
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-lg font-['Cormorant_Garamond'] tracking-wider">
          midsommar hos Ines!
        </h1>
      </div>
    </div>
  );
}

export default App;
