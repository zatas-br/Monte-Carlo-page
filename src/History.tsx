import { tw } from 'typewind';
import { historyContent, profiles, socialLinks, retrospectives } from './data';
import { FaInstagram } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from './ProfileCard';
import { VscClose } from 'react-icons/vsc';

type Formation = '4-3-3' | '4-4-2' | '3-5-2';

export default function History() {
  const [showSoccerField, setShowSoccerField] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [formation, setFormation] = useState<Formation>('4-3-3');
  // State to manage swapping. using an array of profile indices.
  // 0-10 are field positions, 11+ are reserves.
  const [playerOrder, setPlayerOrder] = useState<number[]>(Array.from({ length: profiles.length }, (_, i) => i));

  // 0: GK, 1-4: Defenders, 5-7: Midfielders, 8-10: Forwards, 11+: Reserves
  const fieldPlayers = playerOrder.slice(0, 11).map(i => profiles[i]);
  const benchPlayers = playerOrder.slice(11).map(i => profiles[i]);

  const getPositionStyle = (index: number) => {
    // GK is always index 0
    if (index === 0) return { top: '85%', left: '50%' };

    if (formation === '4-3-3') {
      // Defenders (4)
      if (index === 1) return { top: '70%', left: '20%' };
      if (index === 2) return { top: '70%', left: '40%' };
      if (index === 3) return { top: '70%', left: '60%' };
      if (index === 4) return { top: '70%', left: '80%' };
      // Midfielders (3)
      if (index === 5) return { top: '45%', left: '30%' };
      if (index === 6) return { top: '45%', left: '50%' };
      if (index === 7) return { top: '45%', left: '70%' };
      // Forwards (3)
      if (index === 8) return { top: '20%', left: '25%' };
      if (index === 9) return { top: '15%', left: '50%' };
      if (index === 10) return { top: '20%', left: '75%' };
    } 
    else if (formation === '4-4-2') {
      // Defenders (4)
      if (index === 1) return { top: '70%', left: '20%' };
      if (index === 2) return { top: '70%', left: '40%' };
      if (index === 3) return { top: '70%', left: '60%' };
      if (index === 4) return { top: '70%', left: '80%' };
      // Midfielders (4)
      if (index === 5) return { top: '45%', left: '20%' };
      if (index === 6) return { top: '45%', left: '40%' };
      if (index === 7) return { top: '45%', left: '60%' };
      if (index === 8) return { top: '45%', left: '80%' };
      // Forwards (2)
      if (index === 9) return { top: '20%', left: '35%' };
      if (index === 10) return { top: '20%', left: '65%' };
    }
    else if (formation === '3-5-2') {
      // Defenders (3)
      if (index === 1) return { top: '70%', left: '30%' };
      if (index === 2) return { top: '70%', left: '50%' };
      if (index === 3) return { top: '70%', left: '70%' };
      // Midfielders (5)
      if (index === 4) return { top: '50%', left: '15%' }; // Wing back
      if (index === 5) return { top: '50%', left: '32%' };
      if (index === 6) return { top: '55%', left: '50%' }; // CDM
      if (index === 7) return { top: '50%', left: '68%' };
      if (index === 8) return { top: '50%', left: '85%' }; // Wing back
      // Forwards (2)
      if (index === 9) return { top: '20%', left: '35%' };
      if (index === 10) return { top: '20%', left: '65%' };
    }

    return { top: '0', left: '0' };
  };

  return (
    <div className={tw.w_full.h_full.overflow_y_auto.text_gray_200.p_8.pb_32.relative.z_10}>
      <div className={tw.max_w_3xl.mx_auto.pt_12}>
        <h1 className={tw.text_4xl.font_bold.mb_2.text_white.text_center}>{historyContent.title}</h1>
        <h2 className={tw.text_xl.text_gray_400.mb_8.text_center.font_light}>{historyContent.subtitle}</h2>
        
        <div className={tw.flex.justify_center.mb_8}>
           <button 
             onClick={() => setShowSoccerField(true)}
             className={tw.bg_green_600.hover_bg_green_700.text_white.font_bold.py_3.px_8.rounded_full.shadow_lg.transition_all.duration_300.transform.hover_scale_105.flex.items_center.gap_2}
           >
             <span>⚽</span> Visualizar campo de futebol
           </button>
        </div>

        <div className={tw.space_y_6.text_lg.leading_relaxed.text_gray_300.text_justify}>
          {historyContent.text.map((paragraph, index) => (
             <p key={index}>{paragraph}</p>
          ))}
          
          <div className={`${tw.my_12.relative} group`}>
            <div className={`${tw.absolute.inset_0.bg_purple_600.blur_xl.opacity_20.transition_opacity.duration_500.rounded_xl} group-hover:opacity-40`}></div>
            <img 
              src={historyContent.image} 
              alt="História Monte Carlo" 
              className={tw.w_full.h_64.object_cover.rounded_xl.relative.z_10.shadow_2xl.border.border_gray_800}
            />
          </div>

          <div className={tw.mb_12}>
            <h3 className={tw.text_2xl.font_bold.mb_6.text_center.text_white}>Retrospectiva</h3>
            <div className={tw.flex.flex_wrap.justify_center.gap_4}>
              {retrospectives.map((retro) => (
                <button
                  key={retro.year}
                  onClick={() => setSelectedVideo(retro.videoId)}
                  className={tw.px_6.py_3.bg_gray_800.rounded_full.text_gray_200.font_bold.hover_bg_purple_600.hover_text_white.transition_colors.border.border_gray_700.shadow_lg}
                >
                  {retro.year}
                </button>
              ))}
            </div>
          </div>
          
          <div className={tw.flex.justify_center.mb_16}>
             <a 
               href={socialLinks.instagram} 
               target="_blank" 
               rel="noopener noreferrer"
               className={tw.flex.items_center.space_x_2.bg_gradient_to_r.from_purple_600.to_pink_600.text_white.px_6.py_3.rounded_full.hover_opacity_90.transition_opacity.shadow_lg}
             >
               <FaInstagram size={24} />
               <span className={tw.font_bold}>Siga-nos no Instagram</span>
             </a>
          </div>

          <h3 className={tw.text_2xl.font_bold.mt_16.mb_8.text_center.text_white}>Quem Faz Acontecer</h3>

          <div className={`${tw.grid.gap_8} grid-cols-1 md:grid-cols-2`}>
            {profiles.map((profile, idx) => (
              <div key={idx} className={tw.bg_gray_900.bg_opacity_50.p_4.rounded_xl.border.border_gray_800.flex.flex_col.items_center.text_center.backdrop_blur_sm}>
                <div className={tw.w_32.h_32.mb_4.rounded_full.overflow_hidden.border_2.border_purple_500.shadow_lg}>
                  <img src={profile.image} alt={profile.name} className={tw.w_full.h_full.object_cover} />
                </div>
                <h4 className={tw.text_xl.font_bold.text_purple_400.mb_2}>{profile.name}</h4>
                <p className={tw.text_sm.text_gray_400.mb_4}>{profile.description}</p>
                {profile.link && (
                  <a href={profile.link} target="_blank" rel="noopener noreferrer" className={tw.text_xs.text_purple_300.hover_text_purple_100.underline}>
                    Instagram
                  </a>
                )}
              </div>
            ))}
          </div>

          <p className={tw.italic.text_gray_400.mt_12.text_center.border_t.border_gray_800.pt_8}>
            "Aqui a gente não só joga, a gente faz história."
          </p>
        </div>
      </div>

      {/* Soccer Field Modal */}
      <AnimatePresence>
        {showSoccerField && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md overflow-y-auto"
          >
            <div className="min-h-screen p-4 flex flex-col items-center">
              <button
                onClick={() => setShowSoccerField(false)}
                className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors z-[80] text-white"
              >
                <VscClose size={24} />
              </button>

              <h2 className="text-3xl font-bold text-white mb-6 mt-8">Escalação Monte Carlo</h2>

              {/* Formation Selector */}
              <div className="flex gap-4 mb-8">
                {(['4-3-3', '4-4-2', '3-5-2'] as Formation[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormation(fmt)}
                    className={`px-4 py-2 rounded-full font-bold transition-all ${
                      formation === fmt
                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              <div className="relative w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 pt-4">
                
                {/* Field */}
                <div 
                  className="relative w-full max-w-lg aspect-[2/3] bg-green-700 rounded-xl border-4 border-white/20 shadow-2xl overflow-hidden flex-shrink-0 z-0"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.05) 50px, transparent 51px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.05) 50px, transparent 51px)',
                    backgroundSize: '100% 100%'
                  }}
                >
                  {/* Simple Grass Texture (Gradient) */}
                  <div className="absolute inset-0 bg-gradient-to-b from-green-800/50 to-green-600/50"></div>

                  {/* Field Markings */}
                  <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-lg pointer-events-none"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-16 border-b-2 border-x-2 border-white/30 rounded-b-lg pointer-events-none"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-16 border-t-2 border-x-2 border-white/30 rounded-t-lg pointer-events-none"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/30 rounded-full pointer-events-none"></div>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/30 pointer-events-none"></div>

                  {/* Ghost Slots (Fixed Positions) */}
                  {Array.from({ length: 11 }).map((_, index) => {
                    const pos = getPositionStyle(index);
                    return (
                      <motion.div
                        layout
                        key={`ghost-${index}`}
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-white/20 bg-white/5 z-0 pointer-events-none flex items-center justify-center"
                        initial={false}
                        animate={pos}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                         <div className="w-2 h-2 rounded-full bg-white/10"></div>
                      </motion.div>
                    );
                  })}

                  {fieldPlayers.map((player, index) => {
                    const pos = getPositionStyle(index);
                    return (
                      <motion.div
                        layout
                        key={player.name} // Key by player ID/Name for reordering
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-10 touch-none"
                        initial={false}
                        animate={pos}
                        // Drag Logic
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.1}
                        // Use higher z-index while dragging
                        whileDrag={{ zIndex: 100, scale: 1.1 }}
                        onDragEnd={(_, info) => {
                          const dropX = info.point.x;
                          const dropY = info.point.y;
                          
                          // Use elementsFromPoint to find targets UNDER the dragged element
                          const elementsUnder = document.elementsFromPoint(dropX, dropY);
                          const targetDiv = elementsUnder.find(el => {
                            const targetIndexAttr = el.closest('[data-player-index]')?.getAttribute('data-player-index');
                            return targetIndexAttr !== null && targetIndexAttr !== undefined && parseInt(targetIndexAttr) !== index;
                          })?.closest('[data-player-index]');

                          if (targetDiv) {
                            const targetIndex = parseInt(targetDiv.getAttribute('data-player-index') || '-1');
                            if (targetIndex !== -1 && targetIndex !== index) {
                              // Swap in playerOrder
                              const newOrder = [...playerOrder];
                              [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
                              setPlayerOrder(newOrder);
                            }
                          }
                        }}
                        data-player-index={index} // Store index for lookup
                        
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={() => setSelectedPlayer(player)}
                      >
                        <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden shadow-lg bg-gray-800 relative z-10 pointer-events-none">
                          <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="mt-1 flex flex-col items-center pointer-events-none">
                           <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full whitespace-nowrap backdrop-blur-sm mb-0.5">
                            {player.name.split(' ')[0]}
                           </span>
                           <span className="text-[10px] font-black text-yellow-400 bg-black/80 px-1.5 rounded-md leading-tight border border-yellow-400/30">
                             OVER: {player.overall || 99}
                           </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Reserves (Right side on Desktop, Bottom on Mobile) */}
                <div className="w-full lg:w-64 flex flex-col z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center lg:text-left">Reservas</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {benchPlayers.map((player, index) => {
                      // Adjust index for playerOrder (reserves start at 11)
                      const realIndex = 11 + index;
                      return (
                        <motion.div
                          key={player.name}
                          className="bg-gray-800/50 p-2 rounded-xl border border-gray-700 flex items-center gap-3 cursor-pointer hover:bg-gray-700/50 transition-colors touch-none relative"
                          onClick={() => setSelectedPlayer(player)}
                          whileHover={{ scale: 1.02 }}
                          // Enable dragging for reserves too (to swap with field)
                          drag
                          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                          dragElastic={0.1}
                          whileDrag={{ zIndex: 100, scale: 1.1 }}
                          onDragEnd={(_, info) => {
                            const dropX = info.point.x;
                            const dropY = info.point.y;

                            const elementsUnder = document.elementsFromPoint(dropX, dropY);
                            const targetDiv = elementsUnder.find(el => {
                                const targetIndexAttr = el.closest('[data-player-index]')?.getAttribute('data-player-index');
                                return targetIndexAttr !== null && targetIndexAttr !== undefined && parseInt(targetIndexAttr) !== realIndex;
                            })?.closest('[data-player-index]');

                            if (targetDiv) {
                              const targetIndex = parseInt(targetDiv.getAttribute('data-player-index') || '-1');
                              // Allow swapping with field players (0-10) or other reserves (11+)
                              if (targetIndex !== -1 && targetIndex !== realIndex) {
                                const newOrder = [...playerOrder];
                                [newOrder[realIndex], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[realIndex]];
                                setPlayerOrder(newOrder);
                              }
                            }
                          }}
                          data-player-index={realIndex}
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-600 flex-shrink-0 pointer-events-none">
                            <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col overflow-hidden pointer-events-none">
                            <span className="text-sm font-medium text-gray-200 truncate">{player.name}</span>
                            <span className="text-xs text-yellow-500 font-bold">OVR: {player.overall || 99}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="absolute inset-0 -z-10" onClick={() => setSelectedVideo(null)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-h-[90vh] aspect-[9/16] w-full max-w-md bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors z-10 text-white"
              >
                <VscClose size={24} />
              </button>
              
              <div className="flex-1 w-full h-full relative">
                <iframe
                  src={`https://player.vimeo.com/video/${selectedVideo}?badge=0&autopause=0&player_id=0&app_id=58479`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  className="w-full h-full"
                  title="Retrospectiva"
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Card Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setSelectedPlayer(null)}></div>
            <div className="relative z-10 w-full max-w-sm">
                <button
                    onClick={() => setSelectedPlayer(null)}
                    className="absolute -top-12 right-0 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                >
                    <VscClose size={24} />
                </button>
                <ProfileCard
                  name={selectedPlayer.name}
                  title="Jogador Monte Carlo"
                  handle={selectedPlayer.link ? "@" + selectedPlayer.link.split('/').pop() : "@montecarlo"}
                  avatarUrl={selectedPlayer.image}
                  miniAvatarUrl={selectedPlayer.image}
                  status="Online"
                  contactText="Instagram"
                  onContactClick={() => selectedPlayer.link && window.open(selectedPlayer.link, '_blank')}
                  enableTilt={true}
                  enableMobileTilt={true}
                  showUserInfo={true}
                />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
