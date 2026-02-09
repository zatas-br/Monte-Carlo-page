import { useState } from 'react';
import CircularGallery from './CircularGallery';
import EventModal from './EventModal';
import { events, Event } from './data';
import { tw } from 'typewind';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const galleryItems = events.map(event => ({
    image: event.mainImage,
    text: event.title
  }));

  const handleItemClick = (index: number) => {
    // galleryItems might be duplicated inside CircularGallery for seamless loop,
    // so we use modulo to get the correct event from our original array
    const eventIndex = index % events.length;
    setSelectedEvent(events[eventIndex]);
  };

  return (
    <div className={tw.w_full.h_full.relative.overflow_hidden}>
      <div className={tw.absolute.top_8.w_full.text_center.z_20.pointer_events_none}>
        <h1 className={tw.text_4xl.font_bold.text_white.mb_2.drop_shadow_lg}>Eventos Monte Carlo</h1>
        <p className={tw.text_gray_400.text_sm.uppercase.tracking_widest.drop_shadow_md}>Do Passado ao Futuro</p>
      </div>

      <div className={tw.w_full.h_full.absolute.inset_0}>
        <CircularGallery 
          items={galleryItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.05}
          scrollSpeed={2}
          onItemClick={handleItemClick}
        />
      </div>
      
      {/* Hint for interaction */}
      <div className={tw.absolute.bottom_32.w_full.text_center.z_10.pointer_events_none.opacity_50.animate_pulse}>
        <p className={tw.text_xs.text_gray_500.uppercase}>Arraste para navegar • Clique para detalhes</p>
      </div>

      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
}
