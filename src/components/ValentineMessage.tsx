"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Stars, Sparkles, Music, Gift, PartyPopper, Star, Crown, Moon, Sun } from 'lucide-react';
import ReactConfetti from 'react-confetti';

const AngryBird = () => (
  <div className="absolute -top-6 right-4 animate-fly-bird z-20">
    <svg width="40" height="40" viewBox="0 0 100 100" className="transform scale-x-[-1]">
      <path d="M50,30 Q65,10 80,30 L90,20 L85,35 Q90,40 85,50 Q80,60 65,60 Q60,60 50,55 Q40,60 35,60 Q20,60 15,50 Q10,40 15,35 L10,20 L20,30 Q35,10 50,30" 
        fill="#e53e3e" 
        className="animate-pulse"
      />
      <circle cx="40" cy="35" r="3" fill="black" />
      <path d="M37,45 Q40,48 43,45" stroke="black" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

const ValentineMessage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showGift, setShowGift] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [showMagicEffects, setShowMagicEffects] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number; rotation: number }[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const messages = [
    "Uhmmm! 💝",
    "You&apos;ve been on my mind today...",
    "You know what makes the world brighter? 🌟",
    "It&apos;s your beautiful smile and the kindness in your heart. ✨",
    "I &apos;ve got something magical to share with you... 🎁",
    "Like day turns into night…",
    "My admiration for you only grows stronger every moment! 💫",
    "No letters today? Honestly, that&apos;s *their* loss—because if anyone deserves to be celebrated, it&apos;s you. 🌟",
    "Let&apos;s set the record straight: You&apos;re unforgettable—bright, charming, and effortlessly special. 💛",
    "Your laugh? The sweetest melody. Your energy? Absolutely magnetic. 😄✨",
    "FOMO? Nah. They&apos;re missing out—*on you.* Because one day, someone will be speechless telling you how lucky they are to know you. 😉",
    "So, keep shining. Today isn&apos;t about cards or clichés—it&apos;s about you knowing how rare and radiant you truly are. 💛",
    "Blushing yet? You should be. 😄",
    "Yours, A Secret Admirer Who Knows You Deserve the World 💫"
  ];

  useEffect(() => {
    if (isOpen && !isMuted) {
      const audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-soft-piano-love-story-499.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => console.log('Audio playback failed'));
      return () => audio.pause();
    }
  }, [isOpen, isMuted]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addHeartAtPosition = (x: number, y: number) => {
    const newHeart = {
      id: Date.now(),
      x,
      y,
      size: 16 + Math.random() * 16,
      rotation: Math.random() * 360,
    };
    setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showMagicEffects) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (Math.random() > 0.7) {
        addHeartAtPosition(x, y);
      }
    }
  };

  const handleMessageClick = () => {
    setClickCount((prev) => {
      const newCount = prev < messages.length - 1 ? prev + 1 : prev;
      if (newCount === messages.length - 1) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 8000); // Confetti duration
      }
      if (prev === 3) {
        setShowGift(true);
        setShowMagicEffects(true);
      }
      if (prev === 4) {
        setTimeOfDay(current => current === 'day' ? 'night' : 'day');
      }
      return newCount;
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${
      timeOfDay === 'day' 
        ? 'bg-gradient-to-br from-pink-100 via-red-50 to-purple-100' 
        : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'
    } flex items-center justify-center p-4`}>
      {showCelebration && (
        <>
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={200}
            recycle={false}
            colors={['#ff69b4', '#ffd700', '#ff1493', '#00ffff', '#ff4500']}
          />
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute animate-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                <Sparkles
                  className="text-yellow-400"
                  size={10 + Math.random() * 20}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const Icon = [Stars, Star, Crown][i % 3];
          return (
            <div
              key={`bg-element-${i}`}
              className={`absolute animate-float ${
                timeOfDay === 'day' ? 'text-yellow-400' : 'text-yellow-200'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <Icon size={12 + Math.random() * 8} />
            </div>
          );
        })}
      </div>

      {/* Time indicator */}
      <div className="fixed top-4 right-4 transition-transform duration-500">
        {timeOfDay === 'day' ? (
          <Sun className="text-yellow-500 animate-spin-slow" size={32} />
        ) : (
          <Moon className="text-yellow-200 animate-pulse" size={32} />
        )}
      </div>

      {/* Interactive hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {hearts.map(heart => (
          <Heart
            key={heart.id}
            className="absolute animate-float-away text-pink-500"
            size={heart.size}
            style={{
              left: heart.x,
              top: heart.y,
              transform: `rotate(${heart.rotation}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/80 hover:bg-white transition-all"
        >
          <Music 
            className={`${isMuted ? 'text-gray-400' : 'text-pink-500'} transform hover:scale-110 transition-all`} 
            size={20} 
          />
        </button>

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-3">
              <Heart className="text-pink-500 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
              <span className="text-gray-800 font-medium">Hey,there&apos;s a message for you ! 💌</span>
              <PartyPopper className="text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </button>
        )}

        {isOpen && (
          <div 
            onClick={handleMessageClick}
            onMouseMove={handleMouseMove}
            className={`animate-appear bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center relative overflow-hidden cursor-pointer transition-all duration-500 ${
              showMagicEffects ? 'hover:shadow-pink-300/50 hover:scale-105' : ''
            }`}
          >
            <AngryBird />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-red-300 to-purple-300 animate-shimmer" />
            
            <div className="relative space-y-6 z-10">
              <div className={`text-2xl font-bold ${
                timeOfDay === 'day' ? 'text-gray-800' : 'text-gray-100'
              } animate-slideDown leading-relaxed`}>
                {messages[clickCount]}
                
                {clickCount < messages.length - 1 && (
                  <div className="text-sm text-gray-500 mt-4 animate-bounce">
                    Keep clicking! ✨
                  </div>
                )}
              </div>

              {showGift && (
                <div className="mt-6 animate-bounce cursor-pointer group">
                  <Gift 
                    className="mx-auto text-pink-500 group-hover:scale-110 transition-transform"
                    size={48}
                  />
                  <div className="mt-2 flex items-center justify-center space-x-2">
                    <Sparkles className="text-yellow-400" size={16} />
                    <span className="text-sm text-gray-500">Magic happens with every move!</span>
                    <Sparkles className="text-yellow-400" size={16} />
                  </div>
                </div>
              )}

              {clickCount === messages.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto group"
                >
                  <Heart className="group-hover:animate-ping" size={16} />
                  <span>Seal with Joy </span>
                  <Heart className="group-hover:animate-ping" size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(15deg); }
        }
        @keyframes float-away {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-50px) scale(0); opacity: 0; }
        }
        @keyframes appear {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-shimmer {
          animation: shimmer 8s linear infinite;
          background-size: 1000px 100%;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-float-away {
          animation: float-away 2s forwards;
        }
        @keyframes fly-bird {
          0% { transform: translateX(100%) translateY(0) rotate(5deg); }
          25% { transform: translateX(50%) translateY(-20px) rotate(-5deg); }
          50% { transform: translateX(0) translateY(0) rotate(5deg); }
          75% { transform: translateX(-50%) translateY(-20px) rotate(-5deg); }
          100% { transform: translateX(-100%) translateY(0) rotate(5deg); }
        }
        .animate-fly-bird {
          animation: fly-bird 4s linear infinite;
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ValentineMessage;