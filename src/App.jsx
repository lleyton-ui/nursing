import React, { useState, useEffect } from 'react';
import { Heart, Stars, Music, Volume2, VolumeX, Camera, Send } from 'lucide-react';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Floating hearts background logic
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          left: Math.random() * 100,
          size: Math.random() * (30 - 10) + 10,
          duration: Math.random() * (10 - 5) + 5,
        },
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const moveNoButton = () => {
    // Iiwas ang button sa mouse/tap para hindi mapindot ang "NO"
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setNoButtonPos({ x, y });
  };

  /**
   * PHOTO SETTINGS:
   * Palitan ang mga file names sa ibaba base sa pangalan ng files sa folder mo.
   * Siguraduhin na ang mga pictures ay nasa parehong folder o sa loob ng 'public/images' folder.
   */
  const pictures = [
    "/public/1.jpg", // Palitan mo ito ng file name mo (e.g., photo1.png)
    "/public/2.jpg",
    "/public/3.jpg",
    "/public/4.jpg",
    "/public/5.jpg",
    "/public/6.jpg"
  ];

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 overflow-hidden font-sans selection:bg-pink-300">
      
      {/* Background Hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-[-50px] text-pink-400 opacity-60 animate-bounce"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              transition: `transform ${heart.duration}s linear`,
              transform: `translateY(-${window.innerHeight + 100}px)`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-pink-200 p-8 text-center relative">
        
        {!isOpen ? (
          <div className="space-y-6 animate-in fade-in zoom-in duration-700">
            <div className="relative inline-block">
              <Heart className="w-24 h-24 text-pink-500 fill-pink-500 animate-pulse" />
              <Stars className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin-slow" />
            </div>
            <h1 className="text-4xl font-bold text-pink-600 italic">Happy Valentines Day Baby!!🧡🧡</h1>
            <p className="text-gray-600">May munting surprise ako para sa pinakamagandang babae sa buhay ko.</p>
            
            <button 
              onClick={() => setIsOpen(true)}
              className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-bold text-xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto"
            >
              Buksan ang Love Letter <Send size={20} />
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-1000">
            {/* Header message */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-pink-600 italic">Happy Valentine's Day, Baby!!! 🌹</h2>
              <p className="text-pink-400 font-medium">Lagi't laging ikaw lang ang pipiliin ko.</p>
            </div>

            {/* Photo Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {pictures.map((path, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl aspect-square border-2 border-pink-100 bg-gray-200 shadow-inner">
                  <img 
                    src={path} 
                    alt={`Memory ${index + 1}`} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    // Fallback kung hindi makita ang file sa folder
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Check+File+Path'; }}
                  />
                  <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Heart className="text-white fill-white w-8 h-8" />
                  </div>
                </div>
              ))}
            </div>

            {/* Heartfelt Message Box */}
            <div className="bg-pink-50 p-6 rounded-2xl border-l-4 border-pink-400 text-left italic text-gray-700">
              "Baby, gusto ko lang sabihin na napaka-swerte ko sa'yo. Salamat sa lahat ng pag-aalaga, pag-intindi, at pagmamahal. Ikaw ang pahinga ko sa magulong mundo. I love you more than words can say!"
            </div>

            {/* Interactive Question */}
            <div className="space-y-4 py-6 border-t border-pink-100 relative">
              <h3 className="text-xl font-semibold text-pink-600">Will you be my Valentine forever? 💍</h3>
              
              <div className="flex flex-wrap justify-center gap-4 min-h-[60px]">
                <button 
                  onClick={() => setShowMessage(true)}
                  className="px-10 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold shadow-md transition-all hover:scale-110 z-20"
                >
                  YES! ❤️
                </button>
                
                <button 
                  style={noButtonPos.x !== 0 ? { 
                    position: 'fixed', 
                    left: `${noButtonPos.x}px`, 
                    top: `${noButtonPos.y}px`,
                    zIndex: 50 
                  } : {}}
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className="px-10 py-3 bg-gray-400 text-white rounded-full font-bold shadow-md transition-all whitespace-nowrap"
                >
                  NO 😢
                </button>
              </div>
            </div>

            {/* Success Pop-up */}
            {showMessage && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl transform scale-100">
                  <div className="text-6xl animate-bounce">🎉</div>
                  <h2 className="text-2xl font-bold text-pink-600">hehe see you tomorrow baby!!</h2>
                  <p className="text-gray-600">Wala ka talagang takas baby! HAHAHAHAHAHHAHA. See you tomorrow!!! I love you so much! ❤️</p>
                  
                  {/* Local GIF Path - palitan mo rin ito kung may local gif ka */}
                  <img 
                    src="./images/celebration.gif" 
                    alt="Cute GIF" 
                    className="rounded-lg mx-auto w-40"
                    onError={(e) => { e.target.src = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXpxbW5uc3pwYnpwbzR6MXZsMm14emZhZm9iM3JoYm10NHZsMjFlbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mBjozLJY4LfEOzlIpN/giphy.gif'; }}
                  />
                  
                  <button 
                    onClick={() => setShowMessage(false)}
                    className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold transition-colors"
                  >
                    I Love You Too! 💋
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
         <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-4 bg-white shadow-xl rounded-full text-pink-500 hover:bg-pink-50 transition-all active:scale-90"
          title="Toggle Music"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
};

export default App;