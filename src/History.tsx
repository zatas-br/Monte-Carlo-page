import { tw } from 'typewind';
import { historyContent, profiles, socialLinks, retrospectives, rankingCategories } from './data';
import { FaInstagram, FaMapMarkerAlt, FaTrophy, FaQuestion, FaFutbol } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import ProfileCard from './ProfileCard';
import { VscClose } from 'react-icons/vsc';

type Formation = '4-3-3' | '4-4-2' | '3-5-2';
type Mode = 'Campo' | 'Futsal';

interface HistoryProps {
  onMemberClick?: (member: any) => void;
}

export default function History({ onMemberClick }: HistoryProps) {
  const [showSoccerField, setShowSoccerField] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  // selectedPlayer state removed in favor of parent state
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [formation, setFormation] = useState<Formation>('4-3-3');
  const [mode, setMode] = useState<Mode>('Campo');
  
  // State to manage swapping. using an array of profile indices.
  // 0-10 are field positions, 11+ are reserves.
  const [playerOrder, setPlayerOrder] = useState<number[]>(Array.from({ length: profiles.length }, (_, i) => i));

  // Ranking State
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof rankingCategories>('Zoação / Habilidades');
  const [selectedTheme, setSelectedTheme] = useState<string>(rankingCategories['Zoação / Habilidades'][0]);

  // Lock body scroll when modals are open
  useEffect(() => {
    if (showSoccerField || showRanking || showQuiz || selectedVideo) {
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
  }, [showSoccerField, showRanking, showQuiz, selectedVideo]);

  // Logic for Futsal (5 players) vs Field (11 players)
  const startersCount = mode === 'Campo' ? 11 : 5;
  
  const fieldPlayers = playerOrder.slice(0, startersCount).map(i => profiles[i]);
  const benchPlayers = playerOrder.slice(startersCount).map(i => profiles[i]);

  const getPositionStyle = (index: number) => {
    // GK is always index 0
    if (index === 0) return { top: '85%', left: '50%' };

    if (mode === 'Futsal') {
      // Futsal 1-2-1 or 2-2 logic (Index 1-4)
      // Fixed simple formation: 1-2-1
      if (index === 1) return { top: '65%', left: '25%' }; // Ala Esq
      if (index === 2) return { top: '65%', left: '75%' }; // Ala Dir
      if (index === 3) return { top: '40%', left: '50%' }; // Fixo/Meio
      if (index === 4) return { top: '20%', left: '50%' }; // Pivo
      return { top: '0', left: '0' };
    }

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

  const getRankedProfiles = (theme: string) => {
    return [...profiles].sort((a, b) => {
        const seedA = theme + a.name;
        const seedB = theme + b.name;
        const hash = (str: string) => {
            let h = 0;
            for(let i=0; i<str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
            return h;
        }
        return hash(seedA) - hash(seedB);
    });
  };

  return (
    <div className={tw.w_full.h_full.relative.overflow_hidden}>
      {/* Scrollable Content */}
      <div className={`${tw.w_full.h_full.absolute.inset_0.overflow_y_auto.text_gray_200.p_8.pb_32.z_10} no-scrollbar`}>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={tw.max_w_3xl.mx_auto}
        >
          {/* Header (Now scrolls with content) */}
          <div className={tw.w_full.text_center.mb_8.mt_8}>
            <h1 className={tw.text_4xl.font_bold.mb_2.text_white.drop_shadow_lg}>{historyContent.title}</h1>
            <h2 className={tw.text_xl.text_gray_400.font_light.drop_shadow_md}>{historyContent.subtitle}</h2>
          </div>
          
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
            
            <div className={tw.flex.justify_center.gap_4.mb_16.flex_wrap}>
               <a 
                 href={socialLinks.instagram} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className={tw.flex.items_center.space_x_2.bg_gradient_to_r.from_purple_600.to_pink_600.text_white.px_6.py_3.rounded_full.hover_opacity_90.transition_opacity.shadow_lg}
               >
                 <FaInstagram size={24} />
                 <span className={tw.font_bold}>Siga-nos no Instagram</span>
               </a>
               <a 
                 href="https://maps.app.goo.gl/LND8n7iAqUjDYLwaA" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className={tw.flex.items_center.space_x_2.bg_gradient_to_r.from_blue_600.to_cyan_600.text_white.px_6.py_3.rounded_full.hover_opacity_90.transition_opacity.shadow_lg}
               >
                 <FaMapMarkerAlt size={24} />
                 <span className={tw.font_bold}>Localização</span>
               </a>
               <button 
                 onClick={() => setShowRanking(true)}
                 className={tw.flex.items_center.space_x_2.bg_gradient_to_r.from_yellow_500.to_orange_500.text_white.px_6.py_3.rounded_full.hover_opacity_90.transition_opacity.shadow_lg}
               >
                 <FaTrophy size={24} />
                 <span className={tw.font_bold}>Rankings</span>
               </button>
               <button 
                 onClick={() => setShowQuiz(true)}
                 className={tw.flex.items_center.space_x_2.bg_gradient_to_r.from_indigo_500.to_purple_500.text_white.px_6.py_3.rounded_full.hover_opacity_90.transition_opacity.shadow_lg}
               >
                 <FaQuestion size={24} />
                 <span className={tw.font_bold}>Quiz</span>
               </button>
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
        </motion.div>
      </div>

      {/* Quiz Modal */}
      {createPortal(
        <AnimatePresence>
          {showQuiz && (
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="absolute inset-0" onClick={() => setShowQuiz(false)}></div>
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 className="relative z-10 w-full max-w-md bg-gray-900 border border-purple-500/30 rounded-2xl p-8 text-center shadow-2xl"
              >
                 <button
                   onClick={() => setShowQuiz(false)}
                   className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors text-white"
                 >
                   <VscClose size={24} />
                 </button>
                 
                 <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <FaQuestion size={32} className="text-white" />
                 </div>
                 
                 <h2 className="text-2xl font-bold text-white mb-2">Quiz do Monte Carlo</h2>
                 <p className="text-purple-400 font-medium mb-6 uppercase tracking-widest text-sm">Em Breve</p>
                 
                 <p className="text-gray-300 leading-relaxed mb-8">
                   Prepare-se para testar seus conhecimentos sobre as tretas, as vitórias e as lendas do grupo. Quem foi o artilheiro de 2023? Onde foi a treta do CS? Fique ligado!
                 </p>
                 
                 <button
                   onClick={() => setShowQuiz(false)}
                   className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-colors"
                 >
                   Entendi
                 </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Ranking Modal */}
      {createPortal(
        <AnimatePresence>
          {showRanking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-x-0 bottom-0 top-16 md:top-20 z-[70] bg-black/90 backdrop-blur-md overflow-hidden rounded-t-3xl border-t border-white/10 flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowRanking(false)}
                className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors z-[80] text-white"
              >
                <VscClose size={24} />
              </button>

              {/* Sidebar (Categories & Themes) - Improved Mobile Layout */}
              <div className="w-full md:w-1/3 bg-gray-900/50 border-b md:border-b-0 md:border-r border-white/10 flex flex-col md:h-full max-h-[40vh] md:max-h-full">
                <div className="p-4 md:p-6 border-b border-white/10">
                   <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                     <FaTrophy className="text-yellow-500" /> Rankings
                   </h2>
                </div>
                
                <div className="flex-1 overflow-x-auto md:overflow-x-hidden overflow-y-auto p-4 flex md:block gap-4 md:gap-0 md:space-y-6 no-scrollbar">
                  {Object.keys(rankingCategories).map((category) => (
                    <div key={category} className="flex-shrink-0 w-64 md:w-auto">
                      <h3 className="text-purple-400 font-bold mb-2 uppercase text-xs md:text-sm tracking-wider">{category}</h3>
                      <div className="space-y-1 pl-2">
                        {rankingCategories[category as keyof typeof rankingCategories].map((theme) => (
                           <button
                             key={theme}
                             onClick={() => setSelectedTheme(theme)}
                             className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all whitespace-normal ${
                               selectedTheme === theme 
                                 ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30' 
                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
                             }`}
                           >
                             {theme}
                           </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content (List) */}
              <div className="flex-1 overflow-y-auto bg-black/20 relative p-4 md:p-8 h-2/3 md:h-full no-scrollbar">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center md:text-left sticky top-0 bg-black/90 md:bg-transparent z-10 py-2">
                  {selectedTheme}
                </h3>
                
                <div className="space-y-3 max-w-2xl mx-auto md:mx-0 pb-20">
                  {getRankedProfiles(selectedTheme).map((profile, index) => (
                    <motion.div
                      key={profile.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-3 bg-gray-800/40 rounded-xl border border-white/5 hover:bg-gray-800/60 transition-colors"
                    >
                      <div className={`
                        w-10 h-10 flex items-center justify-center rounded-full font-black text-lg shadow-lg
                        ${index === 0 ? 'bg-yellow-500 text-black' : 
                          index === 1 ? 'bg-gray-300 text-black' : 
                          index === 2 ? 'bg-amber-700 text-white' : 'bg-gray-700 text-gray-400'}
                      `}>
                        {index + 1}
                      </div>
                      
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-600 flex-shrink-0">
                         <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-white">{profile.name}</h4>
                        <p className="text-xs text-gray-400">
                          {profile.age} anos • {profile.birthDate}
                        </p>
                      </div>

                      {index === 0 && <FaTrophy className="text-yellow-500 text-xl animate-pulse" />}
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Soccer Field Modal */}
      {createPortal(
        <AnimatePresence>
          {showSoccerField && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <div 
                className="relative w-full max-w-5xl h-fit max-h-[95vh] bg-gray-900/95 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowSoccerField(false)}
                  className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors z-[100] text-white"
                >
                  <VscClose size={24} />
                </button>

                {/* Content Container - Scroll on Mobile, Hidden on Desktop */}
                <div className="w-full h-full overflow-y-auto lg:overflow-hidden p-6 flex flex-col items-center no-scrollbar">
                    <h2 className="text-3xl font-bold text-white mb-6">Escalação Monte Carlo</h2>

                <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
                  
                  {/* Field */}
                  <div 
                    className={`relative w-full max-w-sm lg:max-w-md bg-green-700 rounded-xl border-4 border-white/20 shadow-2xl overflow-hidden flex-shrink-0 z-0 transition-all duration-500
                      ${mode === 'Futsal' ? 'aspect-[3/4] bg-blue-800' : 'aspect-[2/3]'}
                    `}
                    style={{
                      backgroundImage: mode === 'Futsal' 
                        ? 'none' // Blue hard court
                        : 'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.05) 50px, transparent 51px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.05) 50px, transparent 51px)',
                      backgroundSize: '100% 100%'
                    }}
                  >
                    {/* Texture/Markings */}
                    {mode === 'Campo' ? (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-b from-green-800/50 to-green-600/50"></div>
                            <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-lg pointer-events-none"></div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-16 border-b-2 border-x-2 border-white/30 rounded-b-lg pointer-events-none"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-16 border-t-2 border-x-2 border-white/30 rounded-t-lg pointer-events-none"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/30 rounded-full pointer-events-none"></div>
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/30 pointer-events-none"></div>
                        </>
                    ) : (
                        <>
                            {/* Futsal Court Markings */}
                            <div className="absolute inset-0 bg-blue-900/40"></div>
                            <div className="absolute inset-0 border-2 border-yellow-400/50 m-4 pointer-events-none"></div>
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-yellow-400/50 pointer-events-none"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-yellow-400/50 rounded-full pointer-events-none"></div>
                            {/* Goal Areas */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1/2 h-24 border-b-2 border-x-2 border-yellow-400/50 rounded-b-xl pointer-events-none"></div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-24 border-t-2 border-x-2 border-yellow-400/50 rounded-t-xl pointer-events-none"></div>
                        </>
                    )}

                    {/* Ghost Slots (Fixed Positions) */}
                    {Array.from({ length: startersCount }).map((_, index) => {
                      const pos = getPositionStyle(index);
                      return (
                        <motion.div
                          key={`ghost-${index}`}
                          className="absolute w-16 h-16 rounded-full border-2 border-white/20 bg-white/5 z-0 pointer-events-none flex items-center justify-center"
                          initial={{ ...pos, x: '-50%', y: '-50%' }}
                          animate={{ ...pos, x: '-50%', y: '-50%' }}
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
                          key={`${player.name}-${index}`} 
                          className="absolute flex flex-col items-center cursor-pointer z-10 touch-none"
                          initial={{ x: '-50%', y: '-50%' }}
                          animate={{ ...pos, x: '-50%', y: '-50%' }}
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
                              return targetIndexAttr !== null && targetIndexAttr !== undefined && parseInt(targetIndexAttr) !== index;
                            })?.closest('[data-player-index]');

                            if (targetDiv) {
                              const targetIndex = parseInt(targetDiv.getAttribute('data-player-index') || '-1');

                              if (targetIndex !== -1 && targetIndex !== index) {
                                const newOrder = [...playerOrder];
                                [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
                                setPlayerOrder(newOrder);
                              }
                            }
                          }}
                          data-player-index={index} 
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          onClick={() => onMemberClick?.(player)}
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

                  {/* Sidebar (Controls + Reserves) */}
                  <div className="w-full lg:w-72 flex flex-col z-10 h-full">
                    
                    {/* Controls Section */}
                    <div className="mb-6 flex flex-col items-center lg:items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-white/5 w-full">
                        <h3 className="text-sm uppercase tracking-widest text-gray-400 font-bold">Configuração</h3>
                        
                        {/* Mode Selector */}
                        <div className="flex gap-2 bg-black/40 p-1 rounded-lg w-full">
                        <button
                            onClick={() => setMode('Campo')}
                            className={`flex-1 px-3 py-2 rounded-md text-sm font-bold transition-all ${
                            mode === 'Campo' 
                                ? 'bg-green-600 text-white shadow-lg' 
                                : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Campo
                        </button>
                        <button
                            onClick={() => setMode('Futsal')}
                            className={`flex-1 px-3 py-2 rounded-md text-sm font-bold transition-all ${
                            mode === 'Futsal' 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Futsal
                        </button>
                        </div>

                        {/* Formation Selector (Only for Campo) */}
                        <AnimatePresence mode="wait">
                            {mode === 'Campo' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="w-full"
                                >
                                    <h4 className="text-xs text-gray-500 font-bold mb-2 uppercase">Formação</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['4-3-3', '4-4-2', '3-5-2'] as Formation[]).map((fmt) => (
                                        <button
                                            key={fmt}
                                            onClick={() => setFormation(fmt)}
                                            className={`px-2 py-1.5 rounded-md text-xs font-bold transition-all border ${
                                            formation === fmt
                                                ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                                                : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500'
                                            }`}
                                        >
                                            {fmt}
                                        </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 text-center lg:text-left flex items-center gap-2">
                        Reservas <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{benchPlayers.length}</span>
                    </h3>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 gap-3 max-h-[30vh] lg:max-h-[400px] overflow-y-auto pr-1 no-scrollbar lg:scrollbar-thin lg:scrollbar-thumb-gray-700 lg:scrollbar-track-transparent">
                      {benchPlayers.map((player, index) => {
                        // Adjust index for playerOrder (reserves start after starters)
                        const realIndex = startersCount + index;
                        return (
                          <motion.div
                            key={`${player.name}-${realIndex}`}
                            layoutId={player.name}
                            className="bg-gray-800/50 p-2 rounded-xl border border-gray-700 flex items-center gap-3 cursor-pointer hover:bg-gray-700/50 transition-colors touch-none relative"
                            onClick={() => onMemberClick?.(player)}
                            whileHover={{ scale: 1.02 }}
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
                                // Allow swapping with any slot (0 to end)
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Video Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedVideo && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
              <div className="absolute inset-0 -z-10" onClick={() => setSelectedVideo(null)}></div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative h-[95vh] aspect-[9/16] w-auto bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col"
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
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
