"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, VolumeX, Heart, MonitorPlay, Moon, Brain, Flame, Sparkles, Stethoscope, MessageSquare } from "lucide-react"; 
import Particles from "@tsparticles/react"; 
import { loadSlim } from "@tsparticles/slim"; 

// --- CONFIGURATION ---
const slides = [
  {
    text: "This file is guarded by high-level charm and a slight addiction to cinematic perfection.",
    sub: "Reserved exclusively for the person Lowkey saves as ❀𝕯𝖋𝖜_𝖘𝖎𝖆𝖓𝖎𝖊❀.",
    animation: "slide",
  },
  {
    text: "Sianie: The only girl who can truly appreciate a good nap and a great script.",
    sub: "Don't worry, I know you'd rather be sleeping right now. I'll make this quick, my Movie Master.",
    animation: "scale",
  },
  {
    text: "You have the brains to study Medicine and the spirit to save the world.",
    sub: "Seriously, watching you pursue your goals is genuinely inspiring. You are next-level smart.",
    animation: "slide",
  },
  {
    text: "And yes, you are unbelievably beautiful and hot.",
    sub: "But it's the intelligence and the sarcasm that keep the conversation going. That's the real magic.",
    animation: "scale",
  },
];

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

// ENHANCED Particle settings for a "Busy" field of falling stars/sparks
const particleConfig = {
  particles: {
    number: { value: 150, density: { enable: true, value_area: 1200 } }, // More particles
    color: { value: ["#FF69B4", "#E9D8FD", "#FFFFFF"] }, // Pink, Light Purple, White
    shape: { type: "star" }, 
    opacity: { value: 0.9, random: true, anim: { enable: false } },
    size: { value: 3, random: true, anim: { enable: true, speed: 1, size_min: 0.1, sync: false } },
    line_linked: { enable: false },
    move: { 
        enable: true, 
        speed: 1.5, // Slightly faster movement
        direction: "bottom", 
        random: true, 
        straight: false, 
        out_mode: "out", 
        bounce: false 
    },
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "bubble" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: { bubble: { distance: 120, size: 8, duration: 2, opacity: 0.8 } }, // Larger, closer bubble effect
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

  // Music Control (Fixed - will only try to play if a source is manually added later)
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
    // Start music attempt here if you add the source later
  };

  const nextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setStep(2); // Go to Stat Card
    }
  };

  const handleStatCardDone = () => {
    setStep(3); // Go to Flirt/Tease Slide
  };
  
  // NEW STEP 3: The Flirt/Tease
  const handleFlirtDone = () => {
      setStep(4); // Go to Interaction (The Trap)
  }

  // Interaction: Runaway Button (Z-index added for visibility fix)
  const moveNoButton = () => {
    const x = Math.random() * 100 - 50; 
    const y = Math.random() * 100 - 50; 
    setNoBtnPosition({ x, y });
  };

  const handleYes = () => {
    setStep(5);
    confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.5 },
      colors: ["#6B46C1", "#E9D8FD", "#FF69B4", "#FCD34D", "#00BFFF"], 
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
      
      {/* Audio Element (Commented out to prevent errors if no file exists) */}
      {/* <audio ref={audioRef} loop src="/song.mp3" /> */}

      {/* Music Control Top Right (Disabled unless source is present) */}
      <div className="absolute top-6 right-6 z-50">
        <button onClick={toggleMusic} disabled={!audioRef.current || !audioRef.current.src} className={`p-2 rounded-full transition shadow-lg ${!audioRef.current || !audioRef.current.src ? 'bg-white/10 opacity-50 cursor-not-allowed' : 'bg-white/20 hover:bg-white/40'}`}>
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 0: INTRO - PERFECTION */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="text-center z-10 p-12 bg-black/70 backdrop-blur-md rounded-3xl border-4 border-pink-400/50 shadow-[0_0_60px_rgba(236,72,153,0.6)]"
          >
            <h1 className="text-7xl md:text-9xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-xl tracking-tighter">
              Sianie's File.
            </h1>
            <h2 className="text-4xl font-light text-gray-300 mb-8 italic">Created by ༺𝕷𝖔𝖜𝖐𝖊𝖞 𝕴𝖘 𝕳𝖎𝖒༻</h2>
            <button
              onClick={handleStart}
              className="px-14 py-6 bg-purple-500 text-white font-black text-2xl tracking-widest rounded-full shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition transform duration-300 hover:bg-purple-600"
            >
              Access Classified
            </button>
          </motion.div>
        )}

        {/* STEP 1: SLIDESHOW - PERFECTION */}
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
              <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-snug text-pink-300 drop-shadow-lg tracking-tight">
                {slides[slideIndex].text}
              </h2>
              <p className="text-xl text-gray-200 mb-10 italic font-light">
                {slides[slideIndex].sub}
              </p>
            </motion.div>

            <button
              onClick={nextSlide}
              className="mt-8 px-12 py-5 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-500 transition shadow-lg"
            >
              {slideIndex === slides.length - 1 ? "Analyze Performance Data" : "Next Page"}
            </button>
          </motion.div>
        )}

        {/* STEP 2: STAT CARD - PERFECTION */}
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
                    <Sparkles className="w-8 h-8 mr-3 text-red-500" /> Sianie's Performance Metrics
                </h2>
                <StatItem icon={Brain} title="Intelligence" value="Status: Always Ahead (99%)" color="text-yellow-400" />
                <StatItem icon={Flame} title="Radiance Level" value="Warning: Maxed Out" color="text-red-400" />
                <StatItem icon={MonitorPlay} title="Movie Hours" value="Rank: Cinematic Master" color="text-blue-400" />
                <StatItem icon={Stethoscope} title="Future Focus" value="Target: M.D. (Achieved)" color="text-green-400" />
                <StatItem icon={Moon} title="Sleep Optimization" value="Goal: 100% Attained" color="text-gray-300" />

                <button
                    onClick={handleStatCardDone}
                    className="mt-8 px-10 py-4 bg-purple-500 text-white font-bold rounded-full hover:bg-purple-400 transition transform duration-200"
                >
                    Continue to Classified Flirt
                </button>
            </motion.div>
        )}

        {/* STEP 3: FLIRT/TEASE SLIDE - NEW and improved text */}
        {step === 3 && (
            <motion.div
                key="flirt"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 80 }}
                className="max-w-xl text-center z-10 p-10 bg-black/60 backdrop-blur-md rounded-3xl border border-pink-500/50 shadow-[0_0_50px_rgba(236,72,153,0.7)]"
            >
                <MessageSquare className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-bounce" />
                <h2 className="text-5xl font-extrabold mb-4 text-pink-400 tracking-tight">The Lowkey Clause:</h2>
                <p className="text-2xl text-gray-200 mb-8 italic leading-snug font-light">
                    I know you’re my **twin sister (used to be babe)**, and you’re technically taken, but your hubby owes me a high five for making his wife smile this much.
                </p>
                <p className="text-xl text-purple-300 font-semibold">
                    You're the only person I'd build a website for at 2 a.m. (And yes, you deserve every one of these compliments.)
                </p>
                
                <button
                    onClick={handleFlirtDone}
                    className="mt-10 px-10 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-400 transition transform duration-200 text-lg"
                >
                    Final Answer Time
                </button>
            </motion.div>
        )}


        {/* STEP 4: THE TRAP (Interaction) - PERFECTION */}
        {step === 4 && (
          <motion.div
            key="trap"
            initial={{ scale: 0.5, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 60 }}
            className="text-center z-10 p-8 bg-black/70 backdrop-blur-xl rounded-2xl border-4 border-pink-400 shadow-[0_0_60px_rgba(236,72,153,0.8)]"
          >
            <h2 className="text-4xl font-extrabold mb-8 text-pink-400">The Ultimate Question:</h2>
            <p className="text-2xl mb-12 font-medium">Be honest: Am I your favorite person to send and receive messages from?</p>
            
            <div className="flex gap-6 justify-center items-center relative h-36 w-full max-w-md mx-auto">
              <button
                onClick={handleYes}
                className="px-10 py-5 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-white shadow-2xl z-20 text-xl hover:scale-105 transition"
              >
                Yes, always!
              </button>

              <motion.button
                onMouseEnter={moveNoButton}
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-8 py-4 bg-red-500 text-white rounded-xl font-bold absolute shadow-lg z-20"
              >
                Go away, Lowkey
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: FINAL REVEAL - PERFECTION */}
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
                I knew it! You're a pro at choosing.
            </h2>
            <p className="text-2xl text-gray-100 mb-6 font-light">
              Sianie, you are simply the best. Thank you for being my favorite person to chat with. You're a legend, and I hope this made you smile!
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
        transition={{ duration: 0.6, delay: 0.4 + Math.random() * 0.2 }}
        className="flex justify-between items-center py-3 border-b border-purple-700 last:border-b-0"
    >
        <div className="flex items-center">
            <Icon className={`w-6 h-6 mr-3 ${color}`} />
            <span className="text-lg font-medium text-gray-200">{title}</span>
        </div>
        <span className={`text-lg font-bold ${color}`}>{value}</span>
    </motion.div>
);
