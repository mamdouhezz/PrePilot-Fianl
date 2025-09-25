import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlay } from 'react-icons/fi';

interface VideoModalProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  children?: React.ReactNode;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  thumbnailUrl,
  title = 'PrePilot Demo',
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {children ? (
        <div onClick={openModal} className="cursor-pointer">
          {children}
        </div>
      ) : (
        <button
          onClick={openModal}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-foreground p-1"
        >
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-md">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiPlay className="w-5 h-5 text-white ml-0.5" />
            </div>
            <span className="font-medium text-foreground">شوف كيف تشتغل</span>
          </div>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-4xl mx-4 bg-white rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  title={title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
