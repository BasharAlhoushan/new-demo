import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles,
  Camera 
} from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  return (
    <>
      <div className="space-y-3">
        {/* Main Stage Grid (Editorial 5-image magazine collage) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[420px] sm:h-[520px] lg:h-[600px] rounded-sm overflow-hidden">
          {/* Main Hero Shot (Spans 2 cols on md+) */}
          <div
            onClick={() => {
              setActiveIdx(0);
              setIsLightboxOpen(true);
            }}
            className="md:col-span-2 relative h-full bg-[#18201D] overflow-hidden group cursor-pointer"
          >
            <img
              src={images[0]}
              alt={`${title} - Primary View`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

            <button
              type="button"
              className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs rounded-sm transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#B49A70]" />
              <span>{t('modals.gallery.fullscreen')}</span>
            </button>
          </div>

          {/* Secondary 2nd Shot */}
          <div
            onClick={() => {
              setActiveIdx(1 % images.length);
              setIsLightboxOpen(true);
            }}
            className="hidden md:block relative h-full bg-[#18201D] overflow-hidden group cursor-pointer"
          >
            <img
              src={images[1] || images[0]}
              alt={`${title} - Interior Architecture`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </div>

          {/* 3rd & 4th Stacked Shots */}
          <div className="hidden md:flex flex-col gap-3 h-full">
            <div
              onClick={() => {
                setActiveIdx(2 % images.length);
                setIsLightboxOpen(true);
              }}
              className="relative flex-1 bg-[#18201D] overflow-hidden group cursor-pointer"
            >
              <img
                src={images[2] || images[0]}
                alt={`${title} - Suite`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>

            <div
              onClick={() => {
                setActiveIdx(3 % images.length);
                setIsLightboxOpen(true);
              }}
              className="relative flex-1 bg-[#18201D] overflow-hidden group cursor-pointer"
            >
              <img
                src={images[3] || images[0]}
                alt={`${title} - Master View`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="flex items-center gap-1.5 text-white text-xs font-semibold uppercase tracking-widest bg-black/60 px-3.5 py-2 rounded-sm backdrop-blur-md">
                  <Camera className="w-4 h-4 text-[#B49A70]" />
                  <span>{lang === 'ar' ? `+${images.length} صور فاخرة` : `+${images.length} Photos`}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIdx(idx);
                setIsLightboxOpen(true);
              }}
              className={`relative shrink-0 w-24 h-16 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'border-[#B49A70] scale-102 shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-lg text-white font-medium truncate max-w-md">
                  {title}
                </h3>
                <span className="text-xs text-[#B49A70] tracking-widest uppercase">
                  Photo {activeIdx + 1} of {images.length}
                </span>
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Lightbox Stage */}
            <div className="relative flex-1 flex items-center justify-center my-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={images[activeIdx]}
                  alt={title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[75vh] max-w-full object-contain shadow-2xl rounded-sm"
                />
              </AnimatePresence>

              {/* Prev / Next Floating Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-[#B49A70] text-white hover:text-[#111715] transition-colors backdrop-blur-md"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-[#B49A70] text-white hover:text-[#111715] transition-colors backdrop-blur-md"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6 rtl:rotate-180" />
              </button>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-16 h-12 rounded-sm overflow-hidden border-2 transition-all shrink-0 ${
                    activeIdx === idx
                      ? 'border-[#B49A70] scale-105'
                      : 'border-white/20 opacity-50 hover:opacity-90'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
