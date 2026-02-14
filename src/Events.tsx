import { useState, useEffect } from 'react';
import CircularGallery from './CircularGallery';
import EventModal from './EventModal';
import { events, Event } from './data';
import { tw } from 'typewind';
import { motion } from 'framer-motion';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

      <div className={tw.w_full.h_full.absolute.inset_0.pt_32.pb_24.overflow_y_auto}>
        {isMobile ? (
          <div className={tw.px_6.space_y_6.pb_32}>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedEvent(event)}
                className={tw.relative.bg_gray_900.rounded_xl.overflow_hidden.shadow_lg.border.border_gray_800.cursor_pointer}
              >
                <div className={tw.relative.h_48}>
                  <img src={event.mainImage} alt={event.title} className={tw.w_full.h_full.object_cover} />
                  <div className={tw.absolute.inset_0.bg_gradient_to_t.from_black.to_transparent.opacity_80} />
                  <div className={tw.absolute.bottom_4.left_4}>
                    <h3 className={tw.text_xl.font_bold.text_white}>{event.title}</h3>
                    <p className={tw.text_xs.text_gray_300.uppercase.mt_1}>{event.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <CircularGallery 
            items={galleryItems}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.05}
            scrollSpeed={2}
            onItemClick={handleItemClick}
          />
        )}
      </div>
      
      {/* Hint for interaction - only for desktop */}
      {!isMobile && (
        <div className={tw.absolute.bottom_32.w_full.text_center.z_10.pointer_events_none.opacity_50.animate_pulse}>
          <p className={tw.text_xs.text_gray_500.uppercase}>Arraste para navegar • Clique para detalhes</p>
        </div>
      )}

      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
}
