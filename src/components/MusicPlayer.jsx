import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Music, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bgm from '../assets/bgm.mp3';

const MusicPlayer = forwardRef((props, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [isLooping, setIsLooping] = useState(true);

    const audioSrc = bgm;

    useImperativeHandle(ref, () => ({
        playOnce: () => {
            if (audioRef.current) {
                setIsLooping(false);
                audioRef.current.loop = false;
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                setIsPlaying(true);
            }
        },
        playLoop: () => {
            if (audioRef.current) {
                setIsLooping(true);
                audioRef.current.loop = true;
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                setIsPlaying(true);
            }
        }
    }));

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                setIsLooping(true);
                audioRef.current.loop = true;
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleEnded = () => {
        if (!isLooping) {
            setIsPlaying(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <audio
                ref={audioRef}
                src={audioSrc}
                loop={isLooping}
                onEnded={handleEnded}
            />

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className={`p-4 rounded-full shadow-xl backdrop-blur-md border border-white/20 transition-all duration-300 ${isPlaying ? 'bg-rose-500 text-white' : 'bg-white/80 text-rose-500'
                    }`}
            >
                <AnimatePresence mode='wait'>
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <Volume2 size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="muted"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <Music size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Floating Music Notes Animation when playing */}
            {isPlaying && (
                <div className="absolute bottom-full right-0 mb-2 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 0, x: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: -100,
                            x: Math.random() * 40 - 20
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="text-rose-500 absolute bottom-0 right-4"
                    >
                        🎵
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 0, x: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: -80,
                            x: Math.random() * 40 - 20
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
                        className="text-gold absolute bottom-0 right-0"
                    >
                        🎶
                    </motion.div>
                </div>
            )}
        </div>
    );
});

export default MusicPlayer;
