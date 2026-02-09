import { tw } from 'typewind';
import { motion, AnimatePresence } from 'framer-motion';
import { VscClose } from 'react-icons/vsc';
import { useEffect, useState } from 'react';
import BounceCards from './BounceCards';
import { Event } from './data';

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (event && event.status === 'upcoming') {
      const targetDate = new Date(event.date).getTime();

      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
          setTimeLeft(null);
        } else {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          });
        }
      };

      calculateTimeLeft();
      const interval = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(interval);
    }
  }, [event]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors z-10 text-white"
        >
          <VscClose size={24} />
        </button>

        <div className="flex-1 p-8 flex items-center justify-center min-h-[300px] bg-neutral-950/50">
           <BounceCards
              className="custom-bounceCards"
              images={event.images}
              containerWidth={350}
              containerHeight={300}
              animationDelay={0.5}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.5)"
              transformStyles={[
                "rotate(10deg) translate(-100px)",
                "rotate(5deg) translate(-50px)",
                "rotate(0deg)",
                "rotate(-5deg) translate(50px)",
                "rotate(-10deg) translate(100px)"
              ]}
              enableHover={true}
            />
        </div>

        <div className="flex-1 p-8 space-y-6 flex flex-col justify-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{event.title}</h2>
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-purple-900 text-purple-200' : 'bg-neutral-700 text-neutral-300'}`}>
                {event.status === 'upcoming' ? 'Em Breve' : 'Realizado'}
              </span>
              <span className="text-gray-400 text-sm">
                {event.status === 'upcoming' 
                  ? new Date(event.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
                  : "Evento Passado"
                }
              </span>
            </div>
          </div>

          {event.status === 'upcoming' && timeLeft && (
            <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4 text-center font-bold">Contagem Regressiva</p>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-neutral-900 p-2 rounded-lg">
                  <span className="text-2xl font-bold text-white block">{timeLeft.days}</span>
                  <span className="text-[10px] text-gray-500 uppercase">Dias</span>
                </div>
                <div className="bg-neutral-900 p-2 rounded-lg">
                  <span className="text-2xl font-bold text-white block">{timeLeft.hours}</span>
                  <span className="text-[10px] text-gray-500 uppercase">Horas</span>
                </div>
                <div className="bg-neutral-900 p-2 rounded-lg">
                  <span className="text-2xl font-bold text-white block">{timeLeft.minutes}</span>
                  <span className="text-[10px] text-gray-500 uppercase">Min</span>
                </div>
                <div className="bg-neutral-900 p-2 rounded-lg">
                  <span className="text-2xl font-bold text-white block">{timeLeft.seconds}</span>
                  <span className="text-[10px] text-gray-500 uppercase">Seg</span>
                </div>
              </div>
            </div>
          )}

          <div className="prose prose-invert">
            <p className="text-gray-300 leading-relaxed text-lg">
              {event.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
