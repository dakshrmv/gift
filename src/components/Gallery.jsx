import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import timg from '../assets/tanisha.jpg';

const photos = [
  { id: 1, src: timg, caption: "Billi Mode On 🐱", size: "large" },
  { id: 2, src: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=1000&auto=format&fit=crop", caption: "So fierce! 🦁", size: "small" },
  { id: 3, src: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1000&auto=format&fit=crop", caption: "Sleepy Tutu 😴", size: "medium" },
  { id: 4, src: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1000&auto=format&fit=crop", caption: "Modeling? 📸", size: "small" },
  { id: 5, src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop", caption: "Deep thoughts... 💭", size: "medium" },
  { id: 6, src: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1000&auto=format&fit=crop", caption: "Caught in 4K 📸", size: "large" },
];

const Gallery = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-rose-50 to-white"></div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl font-serif text-center text-rose-900 mb-12 relative z-10"
      >
        The Cutest Cat in the World 🌎
      </motion.h2>

      {/* Featured Main Photo */}
      <div className="max-w-4xl mx-auto mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
          onClick={() => setSelectedId(photos[0].id)}
          layoutId={`card-${photos[0].id}`}
        >
          <div className="glass-card overflow-hidden rounded-3xl shadow-2xl border-4 border-white/50 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.img
                src={photos[0].src}
                alt={photos[0].caption}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="text-white w-12 h-12" />
              </div>
            </div>
            <div className="p-6 bg-white/90 backdrop-blur-md text-center">
              <h3 className="text-3xl font-handwriting text-rose-600 font-bold">{photos[0].caption}</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Masonry Grid for other photos */}
      <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-4">
        {photos.slice(1).map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="break-inside-avoid relative group cursor-pointer"
            onClick={() => setSelectedId(photo.id)}
            layoutId={`card-${photo.id}`}
          >
            <div className="glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <motion.img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="p-4 bg-white/80 backdrop-blur-sm">
                <p className="text-center font-handwriting text-xl text-rose-600 font-medium">{photo.caption}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative max-w-4xl w-full max-h-[90vh] bg-transparent rounded-none overflow-visible"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute -top-12 right-0 text-white hover:text-rose-400 transition-colors"
              >
                <X size={32} />
              </button>

              {photos.map(photo => photo.id === selectedId && (
                <div key={photo.id} className="relative">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-contain rounded-lg shadow-2xl"
                    style={{ maxHeight: '85vh' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
                    <h3 className="text-3xl font-handwriting text-center">{photo.caption}</h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
