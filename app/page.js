"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, VolumeX, Heart, MonitorPlay, Moon, Brain, Flame } from "lucide-react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // To keep the file size down

// --- CONFIGURATION ---
const slides = [
  {
    text: "This site is dedicated to a certified genius and hottie.",
    sub: "You know... the kind that tries to play it cool, but is secretly running the world.",
  },
  {
    text: "For the girl who has her contact saved as ❀𝕯𝖋𝖜_𝖘𝖎𝖆𝖓𝖎𝖊❀",
    sub: "Only the best for my twin sister (used to be babe) Sianie. That name is *fire*.",
  },
  {
    text: "And for the future nurse who's going to save lives...",
    sub: "You have the most beautiful brain and heart for it. Seriously, don't forget that.",
  },
  {
    text: "I hope this makes your day a little brighter...",
    sub: "Just a reminder that you impress me with your hustle, humor, and general existence.",
  },
];

const particlesInit = async (main) => {
  await loadSlim(main);
};

// Particle settings for a busy, twinkling purple background
const particleConfig = {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true, anim: { enable: false } },
    size: { value: 2, random: true, anim: { enable: true, speed: 40, size_min: 0.1, sync: false } },
    line_linked: { enable: false },
    move: { enable: true, speed: 1, direction: "none", random: false, straight: false, out_mode: "out", bounce: false },
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: { repulse: { distance: 100, duration: 0.4 } },
  },
  retina_detect: true,
};

// --- MAIN COMPONENT ---
export default function Home() {
  const [step, setStep] = useState(0); // 0: Start, 1: Slides, 2: Stats, 3: Interaction, 4: Final
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

  // 1. MUSIC CONTROL (FIXED)
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // We ensure play is called only after user interaction starts the whole process
        audioRef.current.play().catch((e) => console.log("Audio play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStart = () => {
    setStep(1); // Move to Slides
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => console.log("Audio play failed", e));
      setIsPlaying(true);
    }
  };

  // 2. SLIDESHOW LOGIC
  const nextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setStep(2); // Go to Stat Card
    }
  };

  // 3. STAT CARD LOGIC (New Step)
  const handleStatCardDone = () => {
    setStep(3); // Go to interactive question
  };

  // 4. RUNAWAY BUTTON
  const moveNoButton = () => {
    // Keep it centered but give a little wiggle room
    const x = Math.random() * 80 - 40; 
    const y = Math.random() * 80 - 40; 
    setNoBtnPosition({ x, y });
  };

  // 5. FINAL SUCCESS
  const handleYes = () => {
    setStep(4);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#6B46C1", "#E9D8FD", "#FF69B4", "#ffffff"], // Purples and Pink/White
    });
  };

  // --- RENDERING ---
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden p-4">
      
      {/* Dynamic Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleConfig}
        className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black"
      />
      
      {/* Background Audio - Put your MP3 in the public folder */}
      <audio ref={audioRef} loop src="/song.mp3" />

      {/* Music Control Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <button onClick={toggleMusic} className="p-2 bg-white/10 rounded-full hover:bg-white/30 transition shadow-lg">
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 0: INTRO */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center z-10 p-6 bg-black/50 backdrop-blur-sm rounded-xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
              Hey Sianie!
            </h1>
            <p className="text-gray-300 mb-8 text-xl italic">Ready for a tiny bit of magic?</p>
            <button
              onClick={handleStart}
              className="px-10 py-5 bg-purple-500 text-white font-black text-lg tracking-wider rounded-full shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition transform duration-200"
            >
              Start the Show
            </button>
          </motion.div>
        )}

        {/* STEP 1: SLIDESHOW */}
        {step === 1 && (
          <motion.div
            key="slides"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
            className="max-w-2xl text-center z-10 p-8 bg-black/50 backdrop-blur-md rounded-2xl border border-purple-500/30"
          >
            <motion.div
              key={slideIndex} // Re-renders animation on index change
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-snug text-pink-300">
                {slides[slideIndex].text}
              </h2>
              <p className="text-xl text-gray-200 mb-10 italic">
                {slides[slideIndex].sub}
              </p>
            </motion.div>

            <button
              onClick={nextSlide}
              className="mt-8 px-8 py-4 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition shadow-lg"
            >
              {slideIndex === slides.length - 1 ? "Next Surprise..." : "Read the next one"}
            </button>
          </motion.div>
        )}

        {/* STEP 2: STAT CARD (New Step) */}
        {step === 2 && (
            <motion.div
                key="stats"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="max-w-md w-full text-center z-10 p-8 bg-black/60 backdrop-blur-lg rounded-2xl border-4 border-purple-500 shadow-2xl"
            >
                <h2 className="text-3xl font-bold mb-6 text-pink-400">Sianie's Official Stats Card</h2>
                <StatItem icon={Brain} title="Intelligence" value="Level: 99 (Max)" color="text-yellow-400" />
                <StatItem icon={Flame} title="Hottie Meter" value="Setting: Overload" color="text-red-400" />
                <StatItem icon={MonitorPlay} title="Movie Consumption" value="Status: Professional" color="text-blue-400" />
                <StatItem icon={Moon} title="Sleep Mastery" value="Rank: Grand Master" color="text-gray-300" />

                <button
                    onClick={handleStatCardDone}
                    className="mt-8 px-10 py-4 bg-purple-500 text-white font-bold rounded-full hover:bg-purple-400 transition transform duration-200"
                >
                    Continue to Final Question
                </button>
            </motion.div>
        )}


        {/* STEP 3: THE TRAP (Interaction) */}
        {step === 3 && (
          <motion.div
            key="trap"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center z-10 p-6 bg-black/50 backdrop-blur-md rounded-xl"
          >
            <h2 className="text-4xl font-extrabold mb-8 text-pink-400">Last challenge...</h2>
            <p className="text-2xl mb-12">Am I still your favorite twin sister (used to be babe) to chat with?</p>
            
            <div className="flex gap-4 justify-center items-center relative h-32 w-full max-w-md mx-auto">
              <button
                onClick={handleYes}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-white shadow-2xl z-10 text-lg"
              >
                Yes, obviously
              </button>

              <motion.button
                onMouseEnter={moveNoButton}
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-8 py-4 bg-red-500 text-white rounded-xl font-bold absolute shadow-lg"
              >
                No way!
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: FINAL REVEAL */}
        {step === 4 && (
          <motion.div
            key="final"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-8 border-4 border-pink-500/80 bg-black/60 backdrop-blur-lg rounded-3xl max-w-lg z-10 shadow-[0_0_50px_rgba(236,72,153,0.8)]"
          >
            <Heart className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" fill="currentColor" />
            <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
                Knew it! You're a pro at choosing.
            </h2>
            <p className="text-xl text-gray-100 mb-6">
              You are truly one of a kind, Sianie. Funny, smart, beautiful, and going to change the world. Thank you for being you.
            </p>
            <p className="text-sm text-gray-400">
              (Also, seriously, go get some sleep. I know you need it.)
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}

// Helper component for the Stat Card
const StatItem = ({ icon: Icon, title, value, color }) => (
    <div className="flex justify-between items-center py-3 border-b border-purple-700 last:border-b-0">
        <div className="flex items-center">
            <Icon className={`w-6 h-6 mr-3 ${color}`} />
            <span className="text-lg font-medium text-gray-200">{title}</span>
        </div>
        <span className={`text-lg font-bold ${color}`}>{value}</span>
    </div>
);
