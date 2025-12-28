import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Gift, Music, Star, Heart, Cake } from 'lucide-react';
import './index.css';
// --- Confetti Component ---
const Confetti = ({ isActive }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!isActive) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const colors = ['#FFC700', '#FF0000', '#2E3192', '#41BBC7', '#73FF75', '#FF69B4'];

        const createParticle = () => {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 3 + 2,
                speedX: Math.random() * 2 - 1,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 5 - 2.5
            };
        };

        // Initialize particles
        for (let i = 0; i < 150; i++) {
            particles.push(createParticle());
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, index) => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();

                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;

                if (p.y > canvas.height) {
                    particles[index] = createParticle();
                    particles[index].y = -20; // Reset to top
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
        />
    );
};

// --- Main App Component ---
export default function App() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    const slides = [
        {
            id: 1,
            bg: "bg-indigo-900",
            content: (
                <div className="text-center animate-fade-in-up">
                    <div className="mb-6 flex justify-center">
                        <Star className="w-24 h-24 text-yellow-400 animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Hey, Guess What?
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-200">
                        Something special is happening today...
                    </p>
                </div>
            )
        },
        {
            id: 2,
            bg: "bg-purple-900",
            content: (
                <div className="text-center animate-fade-in-up">
                    <div className="mb-6 flex justify-center">
                        <Gift className="w-24 h-24 text-pink-400 animate-bounce" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        It's not just any ordinary day.
                    </h2>
                    <p className="text-lg md:text-xl text-purple-200 max-w-lg mx-auto">
                        The world got a little bit brighter on this date. A legend was born.
                    </p>
                </div>
            )
        },
        {
            id: 3,
            bg: "bg-gradient-to-br from-pink-600 to-orange-500",
            isCelebration: true,
            content: (
                <div className="text-center animate-zoom-in relative z-30">
                    <div className="mb-4 flex justify-center">
                        <Cake className="w-32 h-32 text-white drop-shadow-lg animate-wiggle" />
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-2 drop-shadow-md tracking-tight">
                        HAPPY BIRTHDAY
                    </h1>
                    <h1 className="text-5xl md:text-8xl font-black text-yellow-300 mb-8 drop-shadow-md tracking-tight uppercase">
                        UMER!
                    </h1>
                    <p className="text-white text-xl font-medium bg-white/20 inline-block px-6 py-2 rounded-full backdrop-blur-sm">
                        🎉 Let the party begin! 🎉
                    </p>
                </div>
            )
        },
        {
            id: 4,
            bg: "bg-blue-800",
            content: (
                <div className="text-center animate-fade-in-up">
                    <div className="mb-6 flex justify-center">
                        <Heart className="w-24 h-24 text-red-500 animate-pulse" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        My Wish For You
                    </h2>
                    <p className="text-lg md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed italic px-4">
                        "May your year be filled with new adventures, incredible success,
                        and happiness that never ends. Keep shining, Umer!"
                    </p>
                </div>
            )
        },
        {
            id: 5,
            bg: "bg-emerald-900",
            content: (
                <div className="text-center animate-fade-in-up">
                    <div className="mb-6 flex justify-center space-x-4">
                        <Music className="w-16 h-16 text-emerald-400 animate-spin-slow" />
                        <Star className="w-16 h-16 text-yellow-400 animate-spin-slow" style={{ animationDelay: '0.5s'}} />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                        Have a Blast!
                    </h2>
                    <button
                        onClick={() => setCurrentSlide(0)}
                        className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-full text-xl hover:bg-emerald-100 transition transform hover:scale-105 shadow-xl"
                    >
                        Replay the Magic ↺
                    </button>
                </div>
            )
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden font-sans">
            {/* Custom Styles for Animations */}
            <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoom-in {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
        .animate-zoom-in { animation: zoom-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>

            {/* Confetti Layer (Only active on specific slides) */}
            <Confetti isActive={slides[currentSlide].isCelebration} />

            {/* Slide Container */}
            <div
                className={`w-full h-full flex flex-col items-center justify-center transition-colors duration-700 ease-in-out ${slides[currentSlide].bg}`}
            >
                <div className="w-full max-w-4xl px-6 relative z-10">
                    {slides[currentSlide].content}
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 w-full flex justify-center items-center gap-6 z-30">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="flex gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentSlide === idx ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition"
                    aria-label="Next Slide"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Auto-play Toggle */}
            <div className="absolute top-6 right-6 z-30">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md transition ${
                        isAutoPlaying
                            ? 'bg-green-500/80 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                >
                    {isAutoPlaying ? 'Auto-playing ⏸' : 'Play Slides ▶'}
                </button>
            </div>

            {/* Footer Credit */}
            <div className="absolute bottom-2 w-full text-center z-20">
                <p className="text-white/30 text-xs">Made for Umer</p>
            </div>
        </div>
    );
}