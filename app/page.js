"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, VolumeX, Heart, MonitorPlay, Moon, Brain, Flame, Sparkles, Stethoscope } from "lucide-react"; // Added Stethoscope for Medicine
import Particles from "@tsparticles/react"; // Assuming you are using this package
import { loadSlim } from "@tsparticles/slim"; 

// --- CONFIGURATION ---
const slides = [
  {
    text: "A highly classified file, created by ༺𝕷𝖔𝖜𝖐𝖊𝖞 𝕴𝖘 𝕳𝖎𝖒༻",
    sub: "Warning: Contains traces of extreme charm and a slight addiction to movie marathons.",
    animation: "slide",
  },
  {
    text: "This space is reserved for a certified genius and absolute Hottie.",
    sub: "The one whose contact is saved as the legendary ❀𝕯𝖋𝖜_𝖘𝖎𝖆𝖓𝖎𝖊❀",
    animation: "scale",
  },
  {
    text: "For Sianie: The girl who's going to casually study Medicine and save the world.",
    sub: "You have the brains for this. The world needs a doctor who also knows the value of a perfect nap.",
    animation: "slide",
  },
  {
    text: "You are the triple threat: Smart, Funny, and unbelievably beautiful.",
    sub: "You literally make me want to send you things at 2 a.m. (But I won't... usually.)",
    animation: "scale",
  },
  {
    text: "I told you I was building something worthy of a memory.",
    sub: "Because you make every conversation feel cinematic.",
    animation: "slide",
  },
];

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

// Particle settings for a dynamic, falling sparkle effect (Cinematic feel)
const particleConfig = {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 1000 } },
    color: { value: "#E9D8FD", opacity: 0.8 }, 
    shape: { type: "star" }, 
    opacity: { value: 0.8, random: true, anim: { enable: false } },
    size: { value: 3, random: true, anim: { enable: true, speed: 1, size_min: 0.1, sync: false } },
    line_linked: { enable: false },
    move: { 
        enable: true, 
        speed: 1, 
        direction: "bottom", // Fall like soft cinematic snow/stars
        random: true, 
        straight: false, 
        out_mode: "out", 
        bounce: false 
    },
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "bubble" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: { bubble: { distance: 150, size: 6, duration: 2, opacity: 0.5 } }, 
  },
  retina_detect: true,
  fullScreen: { enable: true, zIndex: 0 },
};

// --- MAIN COMPONENT ---
export default function Home() {
  const [step, setStep] = useState(0); 
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

  // 1. MUSIC CONTROL (Still commented out)
  const toggleMusic = () => {
    if (audioRef.current && audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Audio play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStart = () => {
    setStep(1); 
    // If music was included, this is where it would start playing.
  };

  // 2. SLIDESHOW LOGIC
  const nextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setStep(2); // Go to Stat Card
    }
  };

  // 3. STAT CARD LOGIC 
  const handleStatCardDone = () => {
    setStep(3); // Go to Tease slide
  };
  
  // 4. TEASE SLIDE LOGIC (The Hubby/Ex's Sis Joke)
  const handleTeaseDone = () => {
      setStep(4); // Go to interactive question
  }

  // 5. RUNAWAY BUTTON
  const moveNoButton = () => {
    const x = Math.random() * 100 - 50; 
    const y = Math.random() * 100 - 50; 
    setNoBtnPosition({ x, y });
  };

  // 6. FINAL SUCCESS
  const handleYes = () => {
    setStep(5);
    confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.5 },
      colors: ["#6B46C1", "#E9D8FD", "#FF69B4", "#FCD34D", "#00BFFF"], // Purple, Pink, Gold, Blue
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
      
      {/* Background Audio - Music commented out since no file exists */}
      {/* <audio ref={audioRef} loop src="/song.mp3" /> */}

      {/* Music Control Top Right (Disabled since no audio) */}
      <div className="absolute top-6 right-6 z-50">
        <button onClick={toggleMusic} className="p-2 bg-white/10 rounded-full hover:bg-white/30 transition shadow-lg opacity-50 cursor-not-allowed">
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 0: INTRO - Bigger, Bolder Intro */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="text-center z-10 p-10 bg-black/60 backdrop-blur-md rounded-3xl border-4 border-pink-400/50 shadow-2xl"
          >
            <h1 className="text-7xl md:text-9xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-xl tracking-tighter">
              Sianie.
            </h1>
            <p className="text-gray-300 mb-8 text-2xl italic font-light">Prepare for a memory-making sequence. Press play.</p>
            <button
              onClick={handleStart}
              className="px-14 py-6 bg-purple-500 text-white font-black text-2xl tracking-widest rounded-full shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition transform duration-300 hover:bg-purple-600"
            >
              Start Show
            </button>
          </motion.div>
        )}

        {/* STEP 1: SLIDESHOW - More dramatic transitions */}
        {step === 1 && (
          <motion.div
            key="slides"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            transition={{ type: "spring", stiffness: 80, duration: 1 }}
            className="max-w-3xl text-center z-10 p-10 bg-black/60 backdrop-blur-xl rounded-3xl border border-purple-500/50 shadow-2xl"
          >
            <motion.div
              key={slideIndex} 
              initial={{ opacity: 0, [slides[slideIndex].animation === 'scale' ? 'scale' : 'y']: slides[slideIndex].animation === 'scale' ? 0.7 : 50 }}
              animate={{ opacity: 1, [slides[slideIndex].animation === 'scale' ? 'scale' : 'y']: slides[slideIndex].animation === 'scale' ? 1 : 0 }}
              transition={{ duration: 0.8, type: "spring", damping: 12 }}
            >
              <h2 className="text-5xl md:text-7xl font-extrabold mb-4 leading-snug text-pink-300 drop-shadow-lg tracking-tighter">
                {slides[slideIndex].text}
              </h2>
              <p className="text-xl text-gray-200 mb-10 italic">
                {slides[slideIndex].sub}
              </p>
            </motion.div>

            <button
              onClick={nextSlide}
              className="mt-8 px-12 py-5 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-500 transition shadow-lg"
            >
              {slideIndex === slides.length - 1 ? "Analyze Data..." : "Next Page"}
            </button>
          </motion.div>
        )}

        {/* STEP 2: STAT CARD - Improved stats and animation */}
        {step === 2 && (
            <motion.div
                key="stats"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
                className="max-w-md w-full text-center z-10 p-8 bg-black/70 backdrop-blur-lg rounded-2xl border-4 border-yellow-400 shadow-[0_0_40px_rgba(252,211,77,0.7)]"
            >
                <h2 className="text-3xl font-bold mb-6 text-yellow-300 flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 mr-3 text-red-500" /> Sianie's Performance Metrics
                </h2>
                <StatItem icon={Brain} title="Intelligence" value="Status: Always Ahead" color="text-yellow-400" />
                <StatItem icon={Flame} title="Radiance Level" value="Warning: Maxed Out" color="text-red-400" />
                <StatItem icon={MonitorPlay} title="Movie Hours" value="Rank: Cinematic Master" color="text-blue-400" />
                <StatItem icon={Moon} title="Sleep Optimization" value="Goal: 100% Attained" color="text-gray-300" />

                <button
                    onClick={handleStatCardDone}
                    className="mt-8 px-10 py-4 bg-purple-500 text-white font-bold rounded-full hover:bg-purple-400 transition transform duration-200"
                >
                    Continue to Classified Info
                </button>
            </motion.div>
        )}

        {/* STEP 3: THE TEASE SLIDE (Memory-Maker Feature) */}
        {step === 3 && (
            <motion.div
                key="tease"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ type: "spring", stiffness: 80 }}
                className="max-w-xl text-center z-10 p-10 bg-black/60 backdrop-blur-md rounded-3xl border border-pink-500/50 shadow-2xl"
            >
                <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-slow-spin" />
                <h2 className="text-5xl font-extrabold mb-4 text-pink-400 tracking-tight">The Lowkey Clause:</h2>
                <p className="text-2xl text-gray-200 mb-8 italic leading-snug font-light">
                    I know you’re my ex’s twin sister, and you’re technically **taken by your hubby**... but I’m allowed to send *you* nice things, right? 
                </p>
                <p className="text-xl text-purple-300 font-semibold">
                    You're worth the risk of a simple compliment. Always.
                </p>
                
                <button
                    onClick={handleTeaseDone}
                    className="mt-10 px-10 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-400 transition transform duration-200 text-lg"
                >
                    Ready for the True Answer?
                </button>
            </motion.div>
        )}


        {/* STEP 4: THE TRAP (Interaction) - Enhanced visuals */}
        {step === 4 && (
          <motion.div
            key="trap"
            initial={{ scale: 0.5, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 60 }}
            className="text-center z-10 p-8 bg-black/70 backdrop-blur-xl rounded-2xl border-4 border-pink-400 shadow-[0_0_60px_rgba(236,72,153,0.8)]"
          >
            <h2 className="text-4xl font-extrabold mb-8 text-pink-400">The Final Challenge:</h2>
            <p className="text-2xl mb-12 font-medium">Be honest: Am I your favorite human to get messages from?</p>
            
            <div className="flex gap-6 justify-center items-center relative h-36 w-full max-w-md mx-auto">
              <button
                onClick={handleYes}
                className="px-10 py-5 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-white shadow-2xl z-10 text-xl hover:scale-105 transition"
              >
                Yes, always!
              </button>

              <motion.button
                onMouseEnter={moveNoButton}
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-8 py-4 bg-red-500 text-white rounded-xl font-bold absolute shadow-lg"
              >
                Go away, Lowkey
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: FINAL REVEAL - Most dramatic animation */}
        {step === 5 && (
          <motion.div
            key="final"
            initial={{ scale: 0.1, opacity: 0, rotate: 360 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 10 }}
            className="text-center p-12 border-4 border-yellow-300 bg-black/70 backdrop-blur-xl rounded-3xl max-w-xl z-10 shadow-[0_0_100px_rgba(252,211,77,1)]"
          >
            <Heart className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse" fill="currentColor" />
            <h2 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 drop-shadow-xl tracking-tighter">
                You are simply the best.
            </h2>
            <p className="text-2xl text-gray-100 mb-6 font-light">
              This digital moment is reserved for you, Sianie. Thank you for making my day better every time we chat. You're a legend.
            </p>
            <p className="text-sm text-gray-400 italic mt-6">
              (Seriously though, go get some sleep. You earned it. Love, ༺𝕷𝖔𝖜𝖐𝖊𝖞 𝕴𝖘 𝕳𝖎𝖒༻)
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}

// Helper component for the Stat Card
const StatItem = ({ icon: Icon, title, value, color }) => (
    <motion.div 
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 + Math.random() * 0.4 }}
        className="flex justify-between items-center py-3 border-b border-purple-700 last:border-b-0"
    >
        <div className="flex items-center">
            <Icon className={`w-6 h-6 mr-3 ${color}`} />
            <span className="text-lg font-medium text-gray-200">{title}</span>
        </div>
        <span className={`text-lg font-bold ${color}`}>{value}</span>
    </motion.div>
);
