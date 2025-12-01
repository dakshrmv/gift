import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';

const Surprise = () => {
    const [isOpen, setIsOpen] = useState(false);

    const triggerSurprise = () => {
        setIsOpen(true);
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // since particles fall down, start a bit higher than random
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    return (
        <section className="py-32 text-center bg-rose-950 text-white relative overflow-hidden min-h-[60vh] flex flex-col items-center justify-center z-40">
            <div className="relative z-50 max-w-4xl mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-serif mb-12 text-rose-100"
                >
                    One Last Surprise...
                </motion.h2>

                <AnimatePresence mode='wait'>
                    {!isOpen ? (
                        <motion.div
                            key="closed"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            exit={{ scale: 0, rotate: 180, opacity: 0 }}
                            whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 5, 0] }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="cursor-pointer relative inline-block"
                            onClick={triggerSurprise}
                        >
                            <div className="absolute inset-0 bg-gold/30 blur-2xl rounded-full animate-pulse"></div>
                            <div className="bg-gradient-to-br from-gold-light to-gold-dark p-8 rounded-2xl shadow-2xl relative z-10 border-4 border-white/20">
                                <Gift size={80} className="text-rose-900" />
                            </div>
                            <p className="mt-6 text-gold-light font-bold text-xl animate-bounce">Click to Open!</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", duration: 0.8 }}
                            className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl"
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="text-3xl md:text-5xl font-serif text-gold-light mb-6">
                                    Happy Birthday! 🎉
                                </h3>
                                <p className="text-xl md:text-2xl text-rose-100 font-light mb-8">
                                    May all your wishes come true!
                                </p>
                                <div className="text-6xl animate-bounce">🎂</div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-gold/30"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                        }}
                    >
                        <Sparkles size={Math.random() * 20 + 10} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Surprise;
