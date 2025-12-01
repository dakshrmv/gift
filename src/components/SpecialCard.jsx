import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const SpecialCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <section className="py-20 px-4 flex flex-col items-center justify-center bg-white/50">
            <motion.div
                className="relative w-full max-w-md h-80 cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
                whileHover={{ scale: 1.02 }}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d transition-all duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front of Card */}
                    <div className="absolute inset-0 backface-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-rose-400 to-rose-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-white border-4 border-white/20">
                            <Sparkles size={48} className="mb-6 text-gold animate-pulse" />
                            <h3 className="text-3xl font-serif text-center">Why are you so special?</h3>
                            <p className="mt-4 text-rose-100 text-sm uppercase tracking-widest">Tap to reveal</p>
                        </div>
                    </div>

                    {/* Back of Card */}
                    <div
                        className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center border-4 border-rose-200"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        <Heart size={48} className="text-rose-500 mb-6 fill-current animate-beat" />
                        <p className="text-2xl font-handwriting text-rose-800 leading-relaxed">
                            "There is no reason for you to be special...
                        </p>
                        <p className="text-3xl font-serif text-rose-600 font-bold mt-4">
                            You are ALWAYS special! ❤️
                        </p>
                        <p className="mt-4 text-rose-400 text-sm">I don't need any reason.</p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default SpecialCard;
