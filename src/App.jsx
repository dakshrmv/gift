import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Letter from './components/Letter';
import Surprise from './components/Surprise';
import MusicPlayer from './components/MusicPlayer';
import FloatingBackground from './components/FloatingBackground';

import Cake from './components/Cake';
import SpecialCard from './components/SpecialCard';

function App() {
    const [loading, setLoading] = useState(true);
    const musicPlayerRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleCakeWish = () => {
        if (musicPlayerRef.current) {
            musicPlayerRef.current.playOnce();
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-rose-50 flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="text-6xl animate-bounce mb-4">🎂</div>
                    <p className="text-rose-400 font-serif text-xl animate-pulse">Loading Cuteness...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-rose-50 text-rose-950 font-sans overflow-x-hidden selection:bg-rose-200 selection:text-rose-900 relative">
            <FloatingBackground />
            <Hero />
            <Gallery />
            <SpecialCard />
            <Cake onWishMade={handleCakeWish} />
            <Letter />
            <Surprise />
            <MusicPlayer ref={musicPlayerRef} />

            {/* Footer */}
            <footer className="py-8 text-center text-rose-400 text-sm bg-rose-950/5 relative z-10">
                <p>Made with ❤️ for the cutest cat in the world.</p>
            </footer>
        </div>
    );
}

export default App;
