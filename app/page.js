"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Volume2, VolumeX, Heart, MonitorPlay, Moon, Brain, Flame, Sparkles, Stethoscope, MessageSquare, ShieldOff, Palette, Gift } from "lucide-react";
import Particles from "@tsparticles/react"; 
import { loadSlim } from "@tsparticles/slim"; 

// --- CONFIGURATION: The Longer, Teasing Texts (UPGRADED) ---
const slides = [
  {
    text: "A highly classified file, reserved ONLY for The Boss.",
    sub: "Warning: Contains traces of extreme charm, light flirting, and cinematic devotion.",
    animation: "slide",
  },
  {
    text: `This entire digital space is dedicated to the legendary ❀𝕯𝖋𝖜_𝖘𝖎𝖆𝖓𝖎𝖊❀.`,
    sub: "The one whose name is a cheat code for 'Gorgeous, Smart, and Stubbornly Perfect'.",
    animation: "scale",
  },
  {
    text: "You, Sianie, are a natural masterpiece dipped in the color purple.",
    sub: "It's your best color because it's the color of royalty, and you literally rule my thought process.",
    animation: "slide",
  },
  {
    text: "Future Doctor Alert: You're going to study Medicine and literally save lives.",
    sub: "Just promise to prioritize your research on the 'Optimal Nap Duration for Geniuses'. I know how much you love sleeping.",
    animation: "scale",
  },
  {
    text: "You make every conversation feel like the best scene in a movie.",
    sub: "And I know how much you love movies. My favorite genre? Watching you smile.",
    animation: "slide",
  },
  {
    text: "I promised to make something worthy of a memory, something *special*.",
    sub: "Because you deserve to be impressed. Every single day. Ready for your stats?",
    animation: "scale",
  },
];

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

// Particle settings for a dynamic, falling sparkle effect (Cinematic/Night Feel)
const particleConfig = {
  particles: {
    number: { value: 150, density: { enable: true, value_area: 1200 } },
    color: { value: "#D8B4FE", opacity: 0.9 }, // Soft Purple/Pink for a night vibe
    shape: { type: "star" }, 
    opacity: { value: 0.9, random: true, anim: { enable: false } },
    size: { value: 2.5, random: true, anim: { enable: true, speed: 2, size_min: 0.5, sync: false } },
    line_linked: { enable: false },
    move: { 
        enable: true, 
        speed: 1.5, 
        direction: "bottom", // Fall like soft cinematic snow/stars
        random: true, 
        straight: false, 
        out_mode: "out", 
        bounce: false,
        trail: { enable: true, length: 5, fill: { color: "#C084FC" } } // Trail for a smoother, cinematic fall
    },
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
    modes: { repulse: { distance: 100, duration: 0.4 } }, 
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
  // The no button only runs on hover/click, so we don't need a separate state for isHovered
  
  // --- RUNAWAY BUTTON LOGIC (FIXED TO FOLLOW MOUSE) ---
  const moveNoButton = useCallback(() => {
    // Generates a larger, more aggressive random shift (0-200 pixels)
    const x = Math.random() * 200 - 100; 
    const y = Math.random() * 200 - 100; 
    setNoBtnPosition({ x, y });
  }, []);

  const handleNoBtnInteraction = (e) => {
    e.preventDefault(); // Prevent accidental form submission or other default action
    if (step === 4) { 
        moveNoButton();
    }
  };

  // --- MUSIC CONTROL ---
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
    // Attempt to play music upon first user interaction
    if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.log("Audio play blocked/failed:", e));
    }
  };

  // --- NAVIGATION ---
  const nextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setStep(2); // Go to Stat Card
    }
  };
  
  const handleStatCardDone = () => setStep(3); // Go to Tease slide
  const handleTeaseDone = () => setStep(4); // Go to interactive question

  // --- FINAL REVEAL ---
  const handleYes = () => {
    setStep(5);
    confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.5 },
      colors: ["#C084FC", "#E9D8FD", "#F472B6", "#FFD700", "#A78BFA"], // Purple/Pink/Gold/Indigo palette
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
        // UPGRADE: More dynamic gradient for night feel
        className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950"
      />
      
      {/* Background Audio - UNCOMMENTED: Assumes /public/song.mp3 exists */}
      <audio ref={audioRef} loop src="/song.mp3" /> 

      {/* Music Control Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={toggleMusic} 
          className={`p-3 rounded-full transition shadow-xl ${isPlaying ? 'bg-purple-500/50 hover:bg-purple-400/70' : 'bg-white/10 opacity-75 hover:opacity-100'}`}
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>
      
      {/* Sender Signature Top Left */}
      <div className="absolute top-6 left-6 z-50 text-white/70 text-lg font-signature italic hidden sm:block">
        From: ༺𝕷𝖔𝖜𝖐𝖊𝖞 𝕴𝖘 𝕳𝖎𝖒༻
      </div>


      <AnimatePresence mode="wait">
        
        {/* STEP 0: INTRO */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="text-center z-10 p-10 bg-black/70 backdrop-blur-md rounded-3xl border-4 border-pink-400/50 shadow-[0_0_80px_rgba(236,72,153,0.3)] max-w-lg w-full"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 drop-shadow-xl tracking-tighter">
              Sianie.
            </h1>
            <p className="text-gray-300 mb-8 text-xl italic font-light">Prepare for a memory-making sequence. Press play.</p>
            <button
              onClick={handleStart}
              className="px-14 py-5 bg-purple-500 text-white font-black text-xl tracking-widest rounded-full shadow-2xl hover:scale-[1.05] active:scale-[0.95] transition transform duration-300 hover:bg-purple-600"
            >
              Start Show
            </button>
          </motion.div>
        )}

        {/* STEP 1: SLIDESHOW */}
        {step === 1 && (
          <motion.div
            key="slides"
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            transition={{ type: "spring", stiffness: 80, duration: 1 }}
            className="max-w-2xl w-full text-center z-10 p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-purple-500/50 shadow-2xl"
          >
            <motion.div
              key={slideIndex} 
              initial={{ opacity: 0, [slides[slideIndex].animation === 'scale' ? 'scale' : 'y']: slides[slideIndex].animation === 'scale' ? 0.7 : 50 }}
              animate={{ opacity: 1, [slides[slideIndex].animation === 'scale' ? 'scale' : 'y']: slides[slideIndex].animation === 'scale' ? 1 : 0 }}
              transition={{ duration: 0.8, type: "spring", damping: 12 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-snug text-pink-300 drop-shadow-lg tracking-tight">
                {slides[slideIndex].text}
              </h2>
              <p className="text-lg text-gray-200 mb-10 italic font-light">
                {slides[slideIndex].sub}
              </p>
            </motion.div>

            <button
              onClick={nextSlide}
              className="mt-8 px-10 py-4 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-500 transition shadow-lg"
            >
              {slideIndex === slides.length - 1 ? "Analyze Classified Data..." : "Continue Sequence"}
            </button>
          </motion.div>
        )}

        {/* STEP 2: STAT CARD (UPGRADED) */}
        {step === 2 && (
            <motion.div
                key="stats"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
                className="max-w-md w-full text-center z-10 p-8 bg-black/80 backdrop-blur-lg rounded-2xl border-4 border-yellow-400 shadow-[0_0_40px_rgba(252,211,77,0.7)]"
            >
                <h2 className="text-3xl font-bold mb-6 text-yellow-300 flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 mr-3 text-red-500 animate-pulse" /> Sianie's Performance Metrics
                </h2>
                <StatItem icon={Brain} title="Intelligence Level" value="Status: Certified Genius" color="text-yellow-400" />
                <StatItem icon={Flame} title="Radiance Level" value="Warning: Maxed Out / Hottie" color="text-red-400" />
                <StatItem icon={Moon} title="Sleep Optimization" value="Priority: Attained (Cute Zzz's)" color="text-indigo-300" />
                <StatItem icon={MonitorPlay} title="Cinematic Taste" value="Rank: Master Movie Lover" color="text-blue-400" />
                <StatItem icon={ShieldOff} title="Stubborn Rating" value="Dangerously High, But Adorable" color="text-pink-400" />
                <StatItem icon={Palette} title="Aesthetic" value="Best Color: Purple Royalty" color="text-purple-400" />

                <button
                    onClick={handleStatCardDone}
                    className="mt-8 px-10 py-4 bg-purple-500 text-white font-bold rounded-full hover:bg-purple-400 transition transform duration-200"
                >
                    Continue to Classified Info
                </button>
            </motion.div>
        )}

        {/* STEP 3: THE TEASE SLIDE (Cheek Burn! - UPGRADED) */}
        {step === 3 && (
            <motion.div
                key="tease"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 80 }}
                className="max-w-xl w-full text-center z-10 p-10 bg-black/70 backdrop-blur-md rounded-3xl border border-pink-500/50 shadow-[0_0_60px_rgba(219,39,119,0.5)]"
            >
                <Gift className="w-12 h-12 text-pink-400 mx-auto mb-4 animate-ping" />
                <h2 className="text-4xl font-extrabold mb-4 text-pink-400 tracking-tight">The Lowkey Clause:</h2>
                <p className="text-xl text-gray-200 mb-8 italic leading-snug font-light">
                    You're so unbelievably pretty and cute, it's actually distracting. You make me want to be **stubborn** about keeping you entertained.
                </p>
                <p className="text-2xl text-purple-300 font-bold">
                    You're the kind of person who makes the risk of a simple compliment worth taking. My favorite reason to send a light flirt.
                </p>
                <p className="text-sm text-yellow-300 mt-2">
                    (I hear your cheeks are burning right now. Confirmed: Mission success.)
                </p>
                
                <button
                    onClick={handleTeaseDone}
                    className="mt-10 px-10 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-400 transition transform duration-200 text-lg"
                >
                    Ready for the True Answer?
                </button>
            </motion.div>
        )}


        {/* STEP 4: THE TRAP (Interaction - RUNAWAY BUTTON FIXED) */}
        {step === 4 && (
          <motion.div
            key="trap"
            initial={{ scale: 0.5, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 60 }}
            className="text-center z-10 p-8 bg-black/70 backdrop-blur-xl rounded-2xl border-4 border-pink-400 shadow-[0_0_60px_rgba(236,72,153,0.8)] max-w-md w-full"
          >
            <h2 className="text-4xl font-extrabold mb-8 text-pink-400">The Final Challenge:</h2>
            <p className="text-2xl mb-12 font-medium">Be honest: Am I your favorite human to get messages from?</p>
            
            <div className="flex gap-6 justify-center items-center relative h-40 w-full max-w-md mx-auto">
              {/* YES BUTTON - Fixed in place */}
              <button
                onClick={handleYes}
                className="px-10 py-5 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-white shadow-2xl z-20 text-xl hover:scale-105 transition"
              >
                Yes, always!
              </button>

              {/* NO BUTTON - Runaway Logic Applied on Hover AND Click */}
              <motion.button
                onMouseEnter={handleNoBtnInteraction} // Runaway on hover
                onClick={handleNoBtnInteraction} // Runaway on click (keeping it running)
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }} // Snappier movement
                className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold absolute shadow-xl z-10 opacity-90 hover:opacity-100 transition duration-100"
                style={{ whiteSpace: 'nowrap' }} // Keep button text on one line
              >
                Go away, Lowkey
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: FINAL REVEAL (UPGRADED) */}
        {step === 5 && (
          <motion.div
            key="final"
            initial={{ scale: 0.1, opacity: 0, rotate: 360 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 10 }}
            className="text-center p-12 border-4 border-yellow-300 bg-black/70 backdrop-blur-xl rounded-3xl max-w-xl w-full z-10 shadow-[0_0_100px_rgba(252,211,77,1)]"
          >
            <Heart className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse" fill="currentColor" />
            <h2 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 drop-shadow-xl tracking-tighter">
                You are simply the best.
            </h2>
            <p className="text-2xl text-gray-100 mb-6 font-light">
              This digital moment is reserved for you, Sianie. Thank you for making my day better every time we chat. You're a legend.
            </p>
            <p className="text-sm text-gray-400 italic mt-6">
              **The End.** Seriously though, go get some sleep. You earned it.
            </p>
            <div className="text-xl text-yellow-300 mt-4 font-signature italic">
                From: ༺𝕷𝖔𝖜𝖐𝖊𝖞 𝕴𝖘 𝕳𝖎𝖒༻
            </div>
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
        className="flex justify-between items-center py-3 border-b border-purple-700/50 last:border-b-0"
    >
        <div className="flex items-center">
            <Icon className={`w-6 h-6 mr-3 ${color}`} />
            <span className="text-lg font-medium text-gray-200">{title}</span>
        </div>
        <span className={`text-lg font-bold ${color}`}>{value}</span>
    </motion.div>
);
