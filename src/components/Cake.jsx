import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const Cake = ({ onWishMade }) => {
    const [candlesLit, setCandlesLit] = useState(true);
    const [wished, setWished] = useState(false);

    const blowCandles = () => {
        if (!candlesLit) return;
        setCandlesLit(false);

        // Trigger music immediately
        if (onWishMade) onWishMade();

        // Trigger confetti after a short delay for the "blowing" animation
        setTimeout(() => {
            setWished(true);
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#E0115F', '#FFD700', '#ffffff'],
                zIndex: 100
            });
        }, 800);
    };

    return (
        <section className="py-24 flex flex-col items-center justify-center bg-rose-50/50 relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-16 text-center z-10">
                {wished ? "Wishes Do Come True! ✨" : "Make a Wish & Tap the Cake! 🎂"}
            </h2>

            <div className="relative cursor-pointer group" onClick={blowCandles}>
                {/* Cake Container */}
                <div className="relative w-72 md:w-96 h-64">

                    {/* Plate */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-white rounded-[50%] shadow-2xl border-b-4 border-gray-100"></div>

                    {/* Cake Base Layer */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300 rounded-b-[3rem] shadow-inner border-b-4 border-rose-500/20">
                        {/* Texture/Sponge details */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
                    </div>

                    {/* Cake Top Layer (Frosting) */}
                    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full h-16 bg-gradient-to-r from-rose-100 via-white to-rose-100 rounded-[50%] shadow-md z-10">
                        {/* Drips */}
                        <div className="absolute -bottom-4 left-4 w-8 h-12 bg-rose-100 rounded-full"></div>
                        <div className="absolute -bottom-6 left-16 w-10 h-16 bg-rose-100 rounded-full"></div>
                        <div className="absolute -bottom-3 left-32 w-8 h-10 bg-rose-100 rounded-full"></div>
                        <div className="absolute -bottom-5 right-20 w-9 h-14 bg-rose-100 rounded-full"></div>
                        <div className="absolute -bottom-4 right-8 w-7 h-10 bg-rose-100 rounded-full"></div>
                    </div>

                    {/* Top Surface */}
                    <div className="absolute bottom-[8.5rem] left-1/2 -translate-x-1/2 w-[98%] h-28 bg-gradient-to-r from-rose-50 via-white to-rose-50 rounded-[50%] shadow-inner z-20 flex items-center justify-center">
                        {/* Decorative Frosting Swirls */}
                        <div className="w-[80%] h-[80%] border-4 border-rose-200/50 rounded-[50%]"></div>
                    </div>

                    {/* Candles */}
                    <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-full h-32 z-30 flex justify-center items-end gap-6 pb-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="relative flex flex-col items-center">
                                {/* Flame */}
                                <AnimatePresence>
                                    {candlesLit && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{
                                                opacity: 1,
                                                scale: [1, 1.1, 0.9, 1],
                                                rotate: [-2, 2, -1, 1, 0]
                                            }}
                                            exit={{ opacity: 0, scale: 0, y: -20 }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                            className="w-4 h-8 bg-gradient-to-t from-orange-500 via-yellow-400 to-white rounded-[50%] blur-[1px] shadow-[0_0_20px_#FFD700] origin-bottom mb-1"
                                        ></motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Candle Stick */}
                                <div className="w-4 h-20 bg-gradient-to-r from-blue-100 to-white rounded-sm shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#3b82f6_5px,#3b82f6_10px)] opacity-30"></div>
                                </div>
                                <div className="w-6 h-2 bg-black/10 rounded-[50%] blur-[1px] mt-[-2px]"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-rose-400/50 text-sm font-serif animate-pulse">
                    (Tap to blow)
                </div>
            </div>

            {wished && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center px-4"
                >
                    <p className="text-2xl md:text-3xl font-handwriting text-rose-600 mb-4">
                        "Happy Birthday, my favorite human! 🐱"
                    </p>
                    <p className="text-rose-400 font-light">
                        May your day be filled with purrs and treats!
                    </p>
                </motion.div>
            )}
        </section>
    );
};

export default Cake;
