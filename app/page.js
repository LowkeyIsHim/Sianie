"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import {
  Volume2,
  VolumeX,
  Heart,
  MonitorPlay,
  Moon,
  Brain,
  Flame,
  Sparkles,
} from "lucide-react";

const slides = [
  {
    text: "Warning: Genius Alert!",
    sub: "Hey Sianie, this page was handcrafted just for a hot, brilliant professional napper.",
    variant: "SlideIn",
  },
  {
    text: "Daydreaming or movie time?",
    sub: "Stop being so smart, you're stealing my attention even while snoozing.",
    variant: "FadeScale",
  },
  {
    text: "Your contact is ❀𝕯𝖋𝖜_𝖘𝖎𝖆𝖓𝖎𝖊❀",
    sub: "Legendary name for a legendary soul. Shine bright, superstar.",
    variant: "SlideIn",
  },
  {
    text: "Future Nurse Extraordinaire",
    sub: "Imagine you in scrubs saving lives… teasing never felt so inspiring!",
    variant: "FadeScale",
  },
  {
    text: "Smart. Hot. Impossible to ignore.",
    sub: "Your twin sister's hubby better watch out!",
    variant: "SlideIn",
  },
  {
    text: "Extra Slide: Movie Night",
    sub: "Watching movies and sleeping? Professional multitasker vibes.",
    variant: "FadeScale",
  },
  {
    text: "Extra Slide: Tease Incoming",
    sub: "You're dangerously charming and dangerously smart. Don't make me blush!",
    variant: "SlideIn",
  },
];

const senderName = "༺𝕷𝖔𝖜𝖐𝖊𝖞 𝕴𝖘 𝕳𝖎𝖒༻";

const SlideIn = {
  initial: { x: "100%", opacity: 0, rotate: 5 },
  animate: { x: 0, opacity: 1, rotate: 0 },
  exit: { x: "-100%", opacity: 0, rotate: -5 },
  transition: { type: "spring", stiffness: 50, damping: 20 },
};

const FadeScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
  transition: { duration: 0.7 },
};

// --- Particles ---
const particlesInit = async (main) => await loadFull(main);
const particleConfig = {
  fullScreen: { enable: true },
  particles: {
    number: { value: 120 },
    color: { value: ["#FF69B4", "#E9D8FD", "#6B46C1", "#FFD700"] },
    shape: { type: ["circle", "heart", "star"] },
    opacity: { value: 0.8, random: true },
    size: { value: 3, random: true, anim: { enable: true, speed: 10, size_min: 0.3 } },
    move: { enable: true, speed: 1.5, random: true, direction: "top", outModes: "out" },
  },
  retina_detect: true,
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  const handleStart = () => {
    setStep(1);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const nextSlide = () => {
    if (slideIndex < slides.length - 1) setSlideIndex(slideIndex + 1);
    else setStep(2);
  };

  const handleStatCardDone = () => setStep(3);

  const moveNoButton = () => {
    const x = Math.random() * 140 - 70;
    const y = Math.random() * 140 - 70;
    setNoBtnPosition({ x, y });
  };

  const handleYes = () => {
    setStep(4);
    confetti({
      particleCount: 300,
      spread: 160,
      origin: { y: 0.6 },
      colors: ["#6B46C1", "#E9D8FD", "#FF69B4", "#FFD700"],
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white relative overflow-hidden p-4">
      <Particles id="tsparticles" init={particlesInit} options={particleConfig} className="absolute inset-0 z-0" />
      <audio ref={audioRef} loop src="/song.mp3" />

      <div className="absolute top-6 right-6 z-50">
        <button onClick={toggleMusic} className="p-2 bg-white/10 rounded-full hover:bg-white/30 transition shadow-lg">
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center z-10 p-6 bg-black/60 backdrop-blur-sm rounded-xl border border-purple-500/50 shadow-2xl"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 leading-tight">
              Hey Sianie! <Sparkles className="inline-block w-12 h-12 text-yellow-300 animate-pulse" />
            </h1>
            <p className="text-gray-300 mb-8 text-xl italic font-light">A highly-classified message from {senderName} has arrived.</p>
            <button
              onClick={handleStart}
              className="px-12 py-6 bg-purple-500 text-white font-black text-xl tracking-widest rounded-full shadow-[0_0_20px_rgba(168,85,247,0.7)] hover:scale-[1.03] active:scale-[0.98] transition transform duration-200"
            >
              Decode Message
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="slides"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-3xl w-full text-center z-10 p-10 bg-black/60 backdrop-blur-lg rounded-3xl border-4 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.4)]"
          >
            <AnimatePresence mode="wait">
              <motion.div key={slideIndex} variants={slides[slideIndex].variant === "SlideIn" ? SlideIn : FadeScale} initial="initial" animate="animate" exit="exit">
                <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-snug text-pink-300 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400 animate-pulse">
                  {slides[slideIndex].text}
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 mb-10 italic font-light">{slides[slideIndex].sub}</p>
              </motion.div>
            </AnimatePresence>
            <button onClick={nextSlide} className="mt-8 px-10 py-5 bg-purple-600 text-white font-bold text-lg rounded-full hover:bg-purple-500 transition shadow-xl">
              {slideIndex === slides.length - 1 ? "Check the Stats..." : "Next Page (Click for the Tease)"}
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="max-w-md w-full text-center z-10 p-8 bg-black/70 backdrop-blur-xl rounded-2xl border-4 border-pink-500 shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-yellow-300">Sianie's Official Stats Card</h2>
            <StatItem icon={Brain} title="Intelligence" value="Level: 99 (Max)" color="text-yellow-400" />
            <StatItem icon={Flame} title="Hottie Meter" value="Setting: Overload" color="text-red-400" />
            <StatItem icon={MonitorPlay} title="Movie Consumption" value="Status: Professional" color="text-blue-400" />
            <StatItem icon={Moon} title="Sleep Mastery" value="Rank: Grand Master" color="text-gray-300" />
            <button onClick={handleStatCardDone} className="mt-8 px-10 py-4 bg-purple-500 text-white font-black text-lg rounded-full hover:bg-purple-400 transition transform duration-200 shadow-lg">
              Final Interaction
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="trap" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="text-center z-10 p-8 bg-black/70 backdrop-blur-xl rounded-2xl border-2 border-pink-500">
            <h2 className="text-4xl font-extrabold mb-8 text-pink-400">The Ultimate Question...</h2>
            <p className="text-2xl mb-12 font-light italic">Have you genuinely smiled yet?</p>
            <div className="flex gap-4 justify-center items-center relative h-32 w-full max-w-md mx-auto">
              <button onClick={handleYes} className="px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-white shadow-2xl z-10 text-xl">
                Yes, absolutely!
              </button>
              <motion.button
                onMouseEnter={moveNoButton}
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-8 py-4 bg-red-500 text-white rounded-xl font-bold absolute shadow-lg"
              >
                No way! (Lies!)
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="final" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-10 border-4 border-pink-500/80 bg-black/70 backdrop-blur-xl rounded-3xl max-w-lg z-10 shadow-[0_0_80px_rgba(236,72,153,0.8)]">
            <Heart className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse" fill="currentColor" />
            <h2 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
              You win!
            </h2>
            <p className="text-xl text-gray-100 mb-6 font-medium">
              You're not just smart and gorgeous, Sianie. You're my favorite kind of funny. Thank you for making my days better.
            </p>
            <p className="text-base text-gray-400 mt-6 italic">— Sent with maximum respect and effort by {senderName}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const StatItem = ({ icon: Icon, title, value, color }) => (
  <div className="flex justify-between items-center py-3 border-b border-purple-700 last:border-b-0">
    <div className="flex items-center">
      <Icon className={`w-6 h-6 mr-3 ${color}`} />
      <span className="text-lg font-medium text-gray-200">{title}</span>
    </div>
    <span className={`text-lg font-bold ${color}`}>{value}</span>
  </div>
);
