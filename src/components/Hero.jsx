import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Sparkles, MousePointer2 } from 'lucide-react';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-300/30 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-rose-400/20 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Interactive Background Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <Particle key={i} mousePosition={mousePosition} index={i} />
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                style={{ y: y1 }}
                className="z-10 text-center px-4 relative"
            >
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="mb-8 inline-block relative"
                >
                    <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full animate-pulse"></div>
                    <span className="text-8xl relative z-10 drop-shadow-2xl filter">👑</span>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-4 -right-4 text-gold"
                    >
                        <Sparkles size={40} />
                    </motion.div>
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-serif font-bold text-rose-900 mb-6 drop-shadow-sm tracking-tight leading-tight">
                    Happy Birthday, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-gold animate-shine bg-[length:200%_auto]">
                        Tanisha!
                    </span>
                </h1>

                <div className="h-16 text-2xl md:text-4xl text-rose-800/80 font-light font-handwriting">
                    <Typewriter text={["Tutu ❤️", "The Queen of Sass 💅", "Professional Napper 😴", "World's Cutest Cat 🐱"]} />
                </div>
            </motion.div>

            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center gap-2 text-rose-400/60 text-sm tracking-widest uppercase">
                    <span>Scroll to explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-rose-400/0 via-rose-400 to-rose-400/0"></div>
                </div>
            </motion.div>
        </section>
    );
};

const Particle = ({ mousePosition, index }) => {
    const initialX = Math.random() * window.innerWidth;
    const initialY = Math.random() * window.innerHeight;
    const size = Math.random() * 20 + 10;

    // Simple magnetic effect logic would go here, but for performance we'll stick to ambient motion
    // combined with a slight parallax based on mouse position

    return (
        <motion.div
            className="absolute text-rose-200/40"
            initial={{ x: initialX, y: initialY }}
            animate={{
                y: [initialY, initialY - 100],
                x: [initialX, initialX + (Math.random() - 0.5) * 50],
            }}
            transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            }}
        >
            <Heart size={size} fill="currentColor" />
        </motion.div>
    );
};

// Improved Typewriter Component
const Typewriter = ({ text }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const blinkInterval = setInterval(() => setBlink(prev => !prev), 500);
        return () => clearInterval(blinkInterval);
    }, []);

    useEffect(() => {
        if (subIndex === text[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1000);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % text.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, text]);

    return (
        <span>
            {text[index].substring(0, subIndex)}
            <span className={`${blink ? 'opacity-100' : 'opacity-0'} text-rose-400 ml-1`}>|</span>
        </span>
    );
};

export default Hero;
