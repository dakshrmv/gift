import React from 'react';
import { motion } from 'framer-motion';
import { Heart, PawPrint } from 'lucide-react';

const FloatingBackground = () => {
    // Generate random floating elements
    const elements = [...Array(15)].map((_, i) => ({
        id: i,
        type: Math.random() > 0.6 ? 'heart' : 'paw', // More paws for Tutu!
        x: Math.random() * 100, // %
        delay: Math.random() * 10,
        duration: Math.random() * 20 + 20,
        size: Math.random() * 30 + 10,
        color: Math.random() > 0.5 ? 'text-rose-200' : 'text-gold/20'
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    className={`absolute ${el.color} opacity-30 pointer-events-none`}
                    initial={{
                        x: `${el.x}vw`,
                        y: '110vh',
                        rotate: 0
                    }}
                    animate={{
                        y: '-10vh',
                        rotate: 360,
                        x: [`${el.x}vw`, `${el.x + (Math.random() * 10 - 5)}vw`]
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "linear"
                    }}
                >
                    {el.type === 'heart' ? (
                        <Heart size={el.size} fill="currentColor" />
                    ) : (
                        <PawPrint size={el.size} fill="currentColor" />
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingBackground;
