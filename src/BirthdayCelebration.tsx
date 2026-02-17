import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { profiles } from './data';
import { createPortal } from 'react-dom';
import { tw } from 'typewind';
import { VscClose } from 'react-icons/vsc';

export default function BirthdayCelebration() {
  const [birthdayProfiles, setBirthdayProfiles] = useState<typeof profiles>([]);
  const [upcomingProfiles, setUpcomingProfiles] = useState<typeof profiles>([]);
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const todayProfiles: typeof profiles = [];
    const upcomingList: typeof profiles = [];

    profiles.forEach(profile => {
      const [dayStr, monthStr] = profile.birthDate.split('/');
      const day = parseInt(dayStr);
      const month = parseInt(monthStr) - 1; // JS months are 0-indexed

      // Check for Today
      if (today.getDate() === day && today.getMonth() === month) {
        todayProfiles.push(profile);
      }

      // Check for Upcoming (within 12 hours)
      // Create date object for this year's birthday
      let birthdayDate = new Date(currentYear, month, day);
      
      // If birthday passed this year, look at next year (though for 12h check, it implies it's close, so likely this year or very early next year if today is Dec 31)
      if (birthdayDate.getTime() < today.getTime() - 24 * 60 * 60 * 1000) { // If passed by more than a day
         birthdayDate = new Date(currentYear + 1, month, day);
      }

      const diffMs = birthdayDate.getTime() - today.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      // If within 12 hours (and positive, meaning in the future)
      if (diffHours > 0 && diffHours <= 12) {
        upcomingList.push(profile);
      }
    });

    if (todayProfiles.length > 0) {
      setBirthdayProfiles(todayProfiles);
      setShowModal(true);
    }

    if (upcomingList.length > 0) {
      setUpcomingProfiles(upcomingList);
      setShowBanner(true);
    }
  }, []);

  if (birthdayProfiles.length === 0 && upcomingProfiles.length === 0) return null;

  return (
    <>
      {/* Today's Birthday Celebration */}
      {showModal && birthdayProfiles.length > 0 && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={500}
            recycle={false}
            colors={['#a855f7', '#ec4899', '#eab308', '#22c55e']}
          />
          {createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
               <div className="absolute inset-0" onClick={() => setShowModal(false)}></div>
               <div className="relative bg-gradient-to-br from-purple-900 to-black border border-purple-500/50 p-8 rounded-3xl text-center shadow-2xl max-w-lg w-full overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>
                  
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                  >
                    <VscClose size={24} />
                  </button>

                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-6 animate-pulse">
                    FELIZ ANIVERSÁRIO!
                  </h2>

                  <div className="flex justify-center -space-x-4 mb-6">
                    {birthdayProfiles.map((p, i) => (
                      <div key={i} className="relative w-24 h-24 rounded-full border-4 border-purple-500 overflow-hidden shadow-lg z-10 hover:z-20 hover:scale-110 transition-transform">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  <p className="text-2xl text-white font-bold mb-4">
                    {birthdayProfiles.map(p => p.name).join(' & ')}
                  </p>

                  <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
                    <p className="text-xl text-yellow-300 font-bold uppercase tracking-wide">
                      Hoje é dia de pagar o churrasco! 🍖🍻
                    </p>
                  </div>

                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                  >
                    Comemorar!
                  </button>
               </div>
            </div>,
            document.body
          )}
        </>
      )}

      {/* Upcoming Birthday Banner */}
      {showBanner && upcomingProfiles.length > 0 && !showModal && (
         <div className="fixed top-0 left-0 w-full z-[90] bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-md border-b border-purple-500/30 py-3 px-4 flex items-center justify-between shadow-lg animate-slide-down">
            <div className="flex items-center gap-3">
               <span className="text-2xl">🎂</span>
               <div>
                  <p className="text-white font-bold text-sm sm:text-base">
                     Fique ligado! Aniversário de <span className="text-yellow-400">{upcomingProfiles.map(p => p.name).join(', ')}</span> está chegando!
                  </p>
               </div>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <VscClose size={20} />
            </button>
         </div>
      )}
    </>
  );
}
