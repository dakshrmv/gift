import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Letter = () => {
    const text = [
        "Happy Birthday to dearest Tutu! 🐱",
        "I still remember naming you... best decision ever. I hope your day is filled with as much joy as you bring to everyone around you (even when you're being a total drama queen).",
        "You deserve all the treats, naps, and head scratches in the world. Stay weird, stay crazy, and keep being the amazing person you are."
    ];

    return (
        <section className="py-20 px-4 bg-rose-50 flex justify-center relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl w-full bg-[#fffcf5] p-8 md:p-16 rounded-sm shadow-2xl relative"
                style={{
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.05)',
                }}
            >
                {/* Paper Texture Effect */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }}>
                </div>

                {/* Tape effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-10 bg-rose-200/80 rotate-2 backdrop-blur-sm shadow-sm"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-4xl font-serif text-rose-900 mb-8 text-center flex items-center justify-center gap-3">
                        <Heart className="text-rose-500 fill-rose-500" size={24} />
                        Dear Billi,
                        <Heart className="text-rose-500 fill-rose-500" size={24} />
                    </h3>
                </motion.div>

                <div className="font-handwriting text-xl md:text-2xl text-gray-800 space-y-8 leading-relaxed relative z-10">
                    {text.map((paragraph, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.3), duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            {paragraph}
                        </motion.p>
                    ))}

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-right mt-12 font-bold text-rose-600 text-3xl transform -rotate-2"
                    >
                        - Panda 🐼
                    </motion.p>
                </div>
            </motion.div>
        </section>
    );
};

export default Letter;
