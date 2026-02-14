import { useState } from 'react';
import { tw } from 'typewind';
import DomeGallery from './DomeGallery';
import Dock from './Dock';
import History from './History';
import Events from './Events';
import FlowingMenu from './FlowingMenu';
import { GridScan } from './GridScan';
import { VscHome, VscArchive, VscCalendar, VscLibrary, VscClose } from "react-icons/vsc";
import { profiles, retrospectives } from './data';
import { AnimatePresence, motion } from 'framer-motion';

const galleryImages = profiles.map(p => ({
  src: p.image,
  alt: p.name,
  title: p.name,
  description: p.description,
  link: p.link
}));

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'history' | 'events' | 'media'>('home');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const mediaItems = retrospectives.map(retro => ({
    link: '#',
    text: `Retrospectiva ${retro.year}`,
    image: `https://picsum.photos/600/400?random=${retro.year}`,
    onClick: () => setSelectedVideo(retro.videoId)
  }));

  const dockItems = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => setCurrentView('home') },
    { icon: <VscArchive size={18} />, label: 'História', onClick: () => setCurrentView('history') },
    { icon: <VscCalendar size={18} />, label: 'Eventos', onClick: () => setCurrentView('events') },
    { icon: <VscLibrary size={18} />, label: 'Mídias', onClick: () => setCurrentView('media') },
  ];

  return (
    <div className={tw.font_sans.bg_black.text_gray_200.h_screen.w_screen.relative.overflow_hidden}>
      
      {/* Background Effect - always present but behind everything */}
      <div className={tw.absolute.inset_0.z_0.pointer_events_none}>
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#1a1a2e"
          gridScale={0.1}
          scanColor="#6b21a8" // darker purple
          scanOpacity={0.2}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.02}
        />
      </div>

      {/* Main Content */}
      <div className={tw.w_full.h_full.relative.z_10}>
        {currentView === 'home' && (
          <DomeGallery
            images={galleryImages}
            fit={0.8}
            fitBasis="max"
            minRadius={300}
            maxVerticalRotationDeg={10}
            segments={34}
            dragDampening={2}
            grayscale={false}
          />
        )}
        {currentView === 'history' && <History />}
        {currentView === 'events' && <Events />}
        {currentView === 'media' && (
             <div style={{ height: '100%', position: 'relative' }}>
                <FlowingMenu items={mediaItems} />
             </div>
        )}
      </div>

      {/* Dock */}
      <div className={tw.absolute.bottom_5.left_0.w_full.flex.justify_center.z_50.pointer_events_none}>
        <div className={tw.pointer_events_auto}>
          <Dock 
            items={dockItems}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="absolute inset-0 -z-10" onClick={() => setSelectedVideo(null)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors z-10 text-white"
              >
                <VscClose size={24} />
              </button>
              
              <div className="relative pt-[56.25%]">
                <iframe
                  src={`https://player.vimeo.com/video/${selectedVideo}?badge=0&autopause=0&player_id=0&app_id=58479`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  className="absolute top-0 left-0 w-full h-full"
                  title="Retrospectiva"
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
