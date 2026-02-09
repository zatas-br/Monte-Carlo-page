import { tw } from 'typewind';
import { historyContent, profiles } from './data';

export default function History() {
  return (
    <div className={tw.w_full.h_full.overflow_y_auto.text_gray_200.p_8.pb_32.relative.z_10}>
      <div className={tw.max_w_3xl.mx_auto.pt_12}>
        <h1 className={tw.text_4xl.font_bold.mb_2.text_white.text_center}>{historyContent.title}</h1>
        <h2 className={tw.text_xl.text_gray_400.mb_8.text_center.font_light}>{historyContent.subtitle}</h2>
        
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
    </div>
  );
}
