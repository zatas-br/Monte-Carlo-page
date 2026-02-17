import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { VscClose } from 'react-icons/vsc';
import { FaInstagram } from 'react-icons/fa';
import { tw } from 'typewind';

interface MemberModalProps {
  member: any | null; // Using any to match existing data structure loosely, or import Profile interface
  onClose: () => void;
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Calculate Countdown
  useEffect(() => {
    if (!member?.birthDate) {
        setTimeLeft('');
        return;
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const [day, month] = member.birthDate.split('/').map(Number);
      let nextBday = new Date(now.getFullYear(), month - 1, day);
      
      // If birthday has passed this year, set to next year
      if (now > nextBday && now.getDate() !== nextBday.getDate()) {
        nextBday.setFullYear(now.getFullYear() + 1);
      } else if (now.getDate() === nextBday.getDate() && now.getMonth() === nextBday.getMonth()) {
         setTimeLeft('É hoje! 🎉');
         return;
      }

      const diff = nextBday.getTime() - now.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      // const seconds = Math.floor((diff % (1000 * 60)) / 1000); // Optional seconds

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [member]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (member) {
      document.body.classList.add('no-scrollbar');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('no-scrollbar');
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.classList.remove('no-scrollbar');
      document.body.style.overflow = 'unset';
    };
  }, [member]);

  if (!member) return null;

  return createPortal(
    <AnimatePresence>
      {member && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="absolute inset-0" onClick={onClose}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-4xl bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
              <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors text-white z-20"
              >
                  <VscClose size={24} />
              </button>
              
              {/* Left Column: Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black">
                 <img 
                   src={member.image || member.src} 
                   alt={member.name || member.title} 
                   className="w-full h-full object-cover object-top"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-gray-900/50"></div>
              </div>

              {/* Right Column: Info */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center overflow-y-auto bg-gray-900">
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{member.name || member.title}</h2>
                 <p className="text-purple-400 font-bold text-lg mb-6 uppercase tracking-wider">Jogador Monte Carlo</p>
                 
                 <div className="space-y-6 text-gray-300">
                    <p className="leading-relaxed">
                      {member.description || "Membro oficial do Monte Carlo. Faz parte da nossa história e contribui para o sucesso do time dentro e fora de campo."}
                    </p>

                    {/* Additional Info Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                       {member.age && (
                         <div><span className="block text-gray-500 text-xs uppercase">Idade</span><span className="text-white font-bold">{member.age} anos</span></div>
                       )}
                       {member.birthDate && (
                         <div><span className="block text-gray-500 text-xs uppercase">Aniversário</span><span className="text-white font-bold">{member.birthDate}</span></div>
                       )}
                       {member.relationshipStatus && (
                         <div><span className="block text-gray-500 text-xs uppercase">Status</span><span className="text-white font-bold">{member.relationshipStatus}</span></div>
                       )}
                       {timeLeft && (
                         <div><span className="block text-gray-500 text-xs uppercase">Próximo Niver</span><span className="text-purple-400 font-bold font-mono">{timeLeft}</span></div>
                       )}
                    </div>

                    {/* FIFA Stats Preview if available */}
                    {member.attributes && (
                       <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4">
                          <div className="flex justify-between items-center mb-4">
                             <span className="text-yellow-500 font-black text-2xl">OVR {member.overall || 99}</span>
                             <span className="text-white font-bold">{member.position || 'MC'}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-mono">
                             <div className="flex justify-between"><span>PAC</span> <span className="text-white font-bold">{member.attributes.pac}</span></div>
                             <div className="flex justify-between"><span>DRI</span> <span className="text-white font-bold">{member.attributes.dri}</span></div>
                             <div className="flex justify-between"><span>SHO</span> <span className="text-white font-bold">{member.attributes.sho}</span></div>
                             <div className="flex justify-between"><span>DEF</span> <span className="text-white font-bold">{member.attributes.def}</span></div>
                             <div className="flex justify-between"><span>PAS</span> <span className="text-white font-bold">{member.attributes.pas}</span></div>
                             <div className="flex justify-between"><span>PHY</span> <span className="text-white font-bold">{member.attributes.phy}</span></div>
                          </div>
                       </div>
                    )}
                    
                    <div className="pt-4">
                      {member.link && (
                        <a 
                          href={member.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg"
                        >
                          <FaInstagram size={20} />
                          Seguir no Instagram
                        </a>
                      )}
                    </div>
                 </div>
              </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
