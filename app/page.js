"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, VolumeX, Heart } from "lucide-react";

// --- CONTENT CONFIGURATION ---
const slides = [
  {
    text: "To the girl who prizes sleep above all else...",
    sub: "(I know you'd probably rather be napping right now)",
  },
  {
    text: "To the movie buff who is way too smart for her own good...",
    sub: "Seriously, your brain is as dangerous as your looks.",
  },
  {
    text: "To the future nurse...",
    sub: "You're going to save lives and look absolutely fire in scrubs.",
  },
  {
    text: "I just wanted to make something special for you...",
    sub: "Because you impress me every single day.",
  },
];

export default function Home() {
  const [step, setStep] = useState(0); // 0: Start, 1: Slides, 2: Interaction, 3: Final
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

  // Handle Music Toggle
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Audio play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Start the experience
  const handleStart = () => {
    setStep(1);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch((e) => console.log("Audio play failed", e));
      setIsPlaying(true);
    }
  };

  // Move to next slide
  const nextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setStep(2); // Go to interactive question
    }
  };

  // Runaway Button Logic
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100; // Random move X
    const y = Math.random() * 200 - 100; // Random move Y
    setNoBtnPosition({ x, y });
  };

  // Final Success State
  const handleYes = () => {
    setStep(3);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#ffa500", "#ffffff"],
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden p-4 relative">
      
      {/* Background Audio - Replace src with a link to her favorite song if you have one hosted, or put a file in public/ */}
      <audio ref={audioRef} loop src="https://assets.mixkit.co/music/preview/mixkit-romantic-moment-140.mp3" />

      {/* Music Control Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <button onClick={toggleMusic} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 0: INTRO */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
              Hey You.
            </h1>
            <p className="text-gray-300 mb-8 text-lg">I made something small for you. Ready?</p>
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-white text-purple-900 font-bold rounded-full shadow-lg hover:scale-105 transition transform"
            >
              Let's Go
            </button>
          </motion.div>
        )}

        {/* STEP 1: SLIDESHOW */}
        {step === 1 && (
          <motion.div
            key="slides"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-xl text-center"
          >
            <motion.div
              key={slideIndex} // Re-renders animation on index change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {slides[slideIndex].text}
              </h2>
              <p className="text-xl text-pink-300 mb-10 italic">
                {slides[slideIndex].sub}
              </p>
            </motion.div>

            <button
              onClick={nextSlide}
              className="mt-8 px-6 py-3 border border-white/30 rounded-full hover:bg-white/10 transition"
            >
              {slideIndex === slides.length - 1 ? "Keep Going..." : "Next"}
            </button>
          </motion.div>
        )}

        {/* STEP 2: THE TRAP */}
        {step === 2 && (
          <motion.div
            key="trap"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8">One important question...</h2>
            <p className="text-xl mb-8">Do you think I'm kinda cool?</p>
            
            <div className="flex gap-4 justify-center items-center relative h-32 w-full max-w-md mx-auto">
              <button
                onClick={handleYes}
                className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-bold text-white shadow-lg z-10"
              >
                Yes, obviously
              </button>

              <motion.button
                onMouseEnter={moveNoButton}
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold absolute"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: FINAL REVEAL */}
        {step === 3 && (
          <motion.div
            key="final"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-6 border border-pink-500/30 bg-black/40 backdrop-blur-md rounded-2xl max-w-lg"
          >
            <Heart className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" fill="currentColor" />
            <h2 className="text-3xl font-bold mb-4">I knew you were smart.</h2>
            <p className="text-lg text-gray-200 mb-6">
              You are funny, beautiful, and honestly, you make my day better just by being in it.
            </p>
            <p className="text-sm text-gray-400">
              (Also, good luck with the Nursing studies. You're gonna crush it.)
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
