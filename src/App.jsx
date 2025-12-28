import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Gift, Music, Star, Heart, Cake, User, Quote, Sparkles } from 'lucide-react';

// --- Confetti Component (Unchanged) ---
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
                    particles[index].y = -20;
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
        // Slide 1: Credits
        {
            id: 1,
            bg: "bg-slate-900",
            content: (
                <div className="text-center animate-fade-in-up">
                    <div className="mb-6 flex justify-center">
                        <User className="w-24 h-24 text-blue-400 animate-pulse" />
                    </div>
                    <p className="text-xl text-blue-200 uppercase tracking-widest mb-4">Presented By</p>
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-4">
                        Soban Zaib Warraich
                    </h1>
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-4">
                        Khadeeja Masood
                    </h1>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mt-8 rounded-full"></div>
                </div>
            )
        },
        // Slide 2: Main Birthday Title
        {
            id: 2,
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
                        Scroll for messages ➡
                    </p>
                </div>
            )
        },
        // Slide 3: Sania
        {
            id: 3,
            bg: "bg-indigo-800",
            content: (
                <div className="text-center animate-fade-in-up px-4">
                    <Quote className="w-12 h-12 text-indigo-300 mx-auto mb-6 opacity-50" />
                    <p className="text-2xl md:text-4xl font-bold text-white mb-8 leading-tight">
                        "Happy birthday umarrr! It’s been 5 yrs gng STAY HAPPY AND BLESSED. I hope you succeed in life."
                    </p>
                    <div className="inline-block border-t border-indigo-400 pt-4">
                        <p className="text-xl text-indigo-200 font-semibold uppercase tracking-wide">~ Sania</p>
                    </div>
                </div>
            )
        },
        // Slide 4: Amna
        {
            id: 4,
            bg: "bg-rose-900",
            content: (
                <div className="text-center animate-fade-in-up px-4">
                    <Heart className="w-16 h-16 text-rose-400 mx-auto mb-6 animate-pulse" />
                    <p className="text-lg md:text-2xl font-medium text-white mb-8 leading-relaxed max-w-3xl mx-auto italic">
                        "Happy Birthday Umer Mara Yar! You are fascinating and beautiful in your own way. Have a blessed life and a fantastic day. May this year bring you endless moments of joy, growth, and peace. Keep shining with your unique light and never stop being the kind soul you are. You deserve all the happiness the world has to offer. Good luck with your future and your jobs and your coins."
                    </p>
                    <div className="inline-block border-t border-rose-400 pt-4">
                        <p className="text-xl text-rose-200 font-semibold uppercase tracking-wide">~ Amna</p>
                    </div>
                </div>
            )
        },
        // Slide 5: Jafar
        {
            id: 5,
            bg: "bg-purple-900",
            content: (
                <div className="text-center animate-fade-in-up px-4">
                    <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-spin-slow" />
                    <p className="text-lg md:text-2xl font-bold text-white mb-6 uppercase tracking-wide leading-relaxed">
                        "UMAR, HAPPIEST BIRTHDAY YOURE SUCH A GREAT PERSON AND A FRIEND I LOVE YOU SO SO MUCH AND YOU MEAN ALOT TO ME , YOU DESERVE TO BE HAPPY ,YOU DESERVE EVERYTHING, WHEN WE HAD A MEETUP I HAD THIS ANXIETY THAT YOU’D JUDGE ME, BUT YOU DIDN’T AND YOURE SO COOL KHUSH RHO BACCA I LOVE YOU"
                    </p>
                    <div className="inline-block border-t border-purple-400 pt-4">
                        <p className="text-xl text-purple-200 font-semibold uppercase tracking-wide">~ Jafar</p>
                    </div>
                </div>
            )
        },
        // Slide 6: Momina
        {
            id: 6,
            bg: "bg-teal-800",
            content: (
                <div className="text-center animate-fade-in-up px-4">
                    <Sparkles className="w-12 h-12 text-teal-300 mx-auto mb-6" />
                    <p className="text-2xl md:text-4xl font-light text-white mb-8">
                        "Happy birthday Umar may you be blessed with infinite happiness and blessings"
                    </p>
                    <div className="inline-block border-t border-teal-400 pt-4">
                        <p className="text-xl text-teal-200 font-semibold uppercase tracking-wide">~ Momina</p>
                    </div>
                </div>
            )
        },
        // Slide 7: Wasay
        {
            id: 7,
            bg: "bg-cyan-900",
            content: (
                <div className="text-center animate-fade-in-up px-4">
                    <div className="mb-6 bg-cyan-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <User className="text-cyan-200 w-8 h-8" />
                    </div>
                    <p className="text-xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                        "Happy birthday umar, I am not sure if I can put it in words but I really care for you and I adore our friendship. Quite hard to find such a genuine friend nowadays, hope tera koi aik business idea comes into being. Have a great day."
                    </p>
                    <div className="inline-block border-t border-cyan-400 pt-4">
                        <p className="text-xl text-cyan-200 font-semibold uppercase tracking-wide">~ Wasay</p>
                    </div>
                </div>
            )
        },
        // Slide 8: Tanzeel
        {
            id: 8,
            bg: "bg-blue-900",
            content: (
                <div className="text-center animate-fade-in-up px-4">
                    <Quote className="w-12 h-12 text-blue-300 mx-auto mb-6 opacity-50" />
                    <p className="text-xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                        "Hey Umar, Happy Birthday bhai. I know you've been working hard and have goals, clear goals in your mind. I hope you achieve them. I hope you figure things out then things get tough. Keep going."
                    </p>
                    <div className="inline-block border-t border-blue-400 pt-4">
                        <p className="text-xl text-blue-200 font-semibold uppercase tracking-wide">~ Tanzeel</p>
                    </div>
                </div>
            )
        },
        // Slide 9: Annie
        {
            id: 9,
            bg: "bg-emerald-800",
            content: (
                <div className="text-center animate-fade-in-up px-4">
                    <Music className="w-16 h-16 text-emerald-300 mx-auto mb-6" />
                    <p className="text-xl md:text-3xl font-bold text-white mb-8 leading-relaxed font-serif">
                        "کلیزه دی نیکمرغه داسې دي نور ام نصيب شه سره ده خير او امن. دا هرڅه خو به کيږي زما cake ظالمه نه دي چرس راوستل نه pizza شعبه ملا treat"
                    </p>
                    <div className="inline-block border-t border-emerald-400 pt-4">
                        <p className="text-xl text-emerald-200 font-semibold uppercase tracking-wide">~ Annie</p>
                    </div>
                </div>
            )
        },
        // Slide 10: Khadeeja
        {
            id: 10,
            bg: "bg-gray-800",
            content: (
                <div className="text-center animate-fade-in-up px-4">
                    <div className="mb-6 opacity-50">
                        <User className="w-20 h-20 text-gray-400 mx-auto border-4 border-gray-600 rounded-full p-2" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        404 Error: Message Not Found
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 mb-8 italic">
                        "Khadeeja ka message add nhi hua wo offline thi..."
                    </p>
                    <div className="inline-block border-t border-gray-600 pt-4">
                        <p className="text-xl text-gray-500 font-semibold uppercase tracking-wide">~ Khadeeja (Currently Offline)</p>
                    </div>
                    <div className="mt-12">
                        <button
                            onClick={() => setCurrentSlide(1)}
                            className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-200 transition"
                        >
                            Start Over ↺
                        </button>
                    </div>
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
            interval = setInterval(nextSlide, 6000); // 6 seconds per slide for reading
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

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

            {/* Confetti (Active on specific slides) */}
            <Confetti isActive={slides[currentSlide].isCelebration} />

            {/* Slide Container */}
            <div
                className={`w-full h-full flex flex-col items-center justify-center transition-colors duration-700 ease-in-out ${slides[currentSlide].bg}`}
            >
                <div className="w-full max-w-5xl px-6 relative z-10">
                    {slides[currentSlide].content}
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 w-full flex justify-center items-center gap-4 z-30 px-4">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Dots Indicator - Hidden on very small screens if too many dots */}
                <div className="hidden sm:flex gap-2">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                currentSlide === idx ? 'bg-white w-8' : 'bg-white/40 w-2 hover:bg-white/60'
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Auto-play Toggle */}
            <div className="absolute top-6 right-6 z-30">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold backdrop-blur-md transition ${
                        isAutoPlaying
                            ? 'bg-green-500/80 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                >
                    {isAutoPlaying ? '⏸ Auto' : '▶ Play'}
                </button>
            </div>

            <div className="absolute bottom-2 w-full text-center z-20">
                <p className="text-white/30 text-[10px] uppercase tracking-widest">
                    {currentSlide + 1} / {slides.length}
                </p>
            </div>
        </div>
    );
}