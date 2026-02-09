import { useState } from 'react';
import { tw } from 'typewind';
import DomeGallery from './DomeGallery';
import Dock from './Dock';
import History from './History';
import Events from './Events';
import FlowingMenu from './FlowingMenu';
import { GridScan } from './GridScan';
import { VscHome, VscArchive, VscCalendar, VscLibrary } from "react-icons/vsc";
import { profiles } from './data';

const galleryImages = profiles.map(p => ({
  src: p.image,
  alt: p.name,
  title: p.name,
  description: p.description,
  link: p.link
}));

const mediaItems = [
  { link: '#', text: 'Retrospectiva 2021', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Retrospectiva 2022', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'Retrospectiva 2023', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'Retrospectiva 2024', image: 'https://picsum.photos/600/400?random=4' },
  { link: '#', text: 'Retrospectiva 2025', image: 'https://picsum.photos/600/400?random=5' }
];

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'history' | 'events' | 'media'>('home');

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
    </div>
  );
}
