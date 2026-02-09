import React, { useState } from 'react';
import { tw } from 'typewind';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={tw.font_sans.bg_neutral_900.text_gray_300.leading_relaxed.min_h_screen.m_0.p_0} style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <header className={tw.bg_neutral_900.text_white.px_10.py_5.fixed.w_full.top_0.left_0.z_50.shadow_lg}>
        <nav className={tw.flex.justify_between.items_center}>
          <div className={tw.text_3xl.font_bold.text_orange_400}>Monte Carlo</div>
          <ul className={`${tw.list_none.gap_8.hidden.md(tw.flex)
            .bg_neutral_900.md(tw.bg_transparent)
            .absolute.md(tw.static)
            .top_16.right_10.w_52.md(tw.w_auto)
            .flex_col.md(tw.flex_row)
            .text_right.md(tw.text_left)
            .p_4.md(tw.p_0)
            .rounded_lg.md(tw.rounded_none)
            .shadow_lg.md(tw.shadow_none)} ${isMenuOpen ? tw.flex : tw.hidden}`
          }>
            <li><a href="#" className={tw.text_white.hover(tw.text_orange_400).no_underline}>Home</a></li>
            <li><a href="#" className={tw.text_white.hover(tw.text_orange_400).no_underline}>About</a></li>
            <li><a href="#" className={tw.text_white.hover(tw.text_orange_400).no_underline}>Services</a></li>
            <li><a href="#" className={tw.text_white.hover(tw.text_orange_400).no_underline}>Gallery</a></li>
            <li><a href="#" className={tw.text_white.hover(tw.text_orange_400).no_underline}>Contact</a></li>
          </ul>
          <div className={tw.block.md(tw.hidden).text_2xl.cursor_pointer.text_orange_400} onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </div>
        </nav>
      </header>

      <section className={tw.bg_cover.bg_center.text_white.text_center.py_36.px_5.mt_20.bg_black.bg_opacity_60} style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?luxury,resort')" }}>
        <div className={tw.max_w_3xl.mx_auto.bg_black.bg_opacity_60.p_5.rounded_lg}>
          <h1 className={tw.text_6xl.mb_5.shadow_md} style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)" }}>Bem-vindo(a) à Monte Carlo Web Page</h1>
          <p className={tw.text_2xl.mb_8}>mais que um bairro, mais que amigos, aqui somos uma família.</p>
          <a href="#" className={tw.bg_orange_400.text_white.py_4.px_8.rounded.text_xl.transition_colors.duration_300.hover(tw.bg_orange_600).inline_block}>Book Your Stay</a>
        </div>
      </section>

      <section className={tw.py_20.px_10.bg_neutral_800.flex.items_center.justify_center}>
        <div className={tw.flex.flex_col.md(tw.flex_row).max_w_6xl.gap_10.items_center}>
          <div className={tw.flex_1.bg_cover.bg_center.rounded_2xl.h_96.w_full.shadow_lg} style={{ backgroundImage: "url('https://source.unsplash.com/600x400/?luxury,hotel')" }}></div>
          <div className={tw.flex_1.text_gray_300}>
            <h2 className={tw.text_4xl.mb_5.text_orange_400}>Sobre Monte Carlo</h2>
            <p className={tw.text_xl.leading_relaxed.mb_5.text_gray_400}>Monte Carlo é um bairro charmoso localizado na cidade de São Carlos-SP. Apesar de ser frequentemente confundido com o bairro vizinho, Cruzeiro do Sul, Monte Carlo tem sua própria identidade marcante. O bairro ganhou destaque mundial graças a um grupo de 'mulekes' que fizeram das ruas seu campo de futebol, deixando uma marca indelével na memória de todos que passaram por ali.</p>
            <a href="#" className={tw.bg_orange_400.text_white.py_4.px_8.rounded.text_xl.transition_colors.duration_300.hover(tw.bg_orange_600).inline_block}>Ler Mais</a>
          </div>
        </div>
      </section>

      <section className={tw.py_20.px_10.bg_neutral_900.text_center}>
        <h2 className={tw.text_4xl.mb_10.text_orange_400}>Our Premium Services</h2>
        <div className={tw.flex.justify_center.gap_8.flex_wrap}>
          <div className={tw.bg_neutral_800.p_8.rounded_2xl.shadow_lg.flex_1.max_w_xs.text_center.transform.transition_all.duration_300.hover(tw.translate_y_2.shadow_xl)}>
            <i className="fas fa-bed" style={{ fontSize: "3em", marginBottom: "20px", color: "#f39c12" }}></i>
            <h3 className={tw.text_2xl.mb_3.text_orange_400}>Loc</h3>
            <p className={tw.text_base.text_gray_400}>Mais do que apenas um bairro, Monte Carlo é um lugar onde a amizade e a comunidade se entrelaçam, criando laços que vão além das simples delimitações geográficas.</p>
          </div>
          <div className={tw.bg_neutral_800.p_8.rounded_2xl.shadow_lg.flex_1.max_w_xs.text_center.transform.transition_all.duration_300.hover(tw.translate_y_2.shadow_xl)}>
            <i className="fas fa-utensils" style={{ fontSize: "3em", marginBottom: "20px", color: "#f39c12" }}></i>
            <h3 className={tw.text_2xl.mb_3.text_orange_400}>Gourmet Dining</h3>
            <p className={tw.text_base.text_gray_400}>Experience culinary excellence at our Michelin-starred restaurants, where each dish is a masterpiece.</p>
          </div>
          <div className={tw.bg_neutral_800.p_8.rounded_2xl.shadow_lg.flex_1.max_w_xs.text_center.transform.transition_all.duration_300.hover(tw.translate_y_2.shadow_xl)}>
            <i className="fas fa-glass-cheers" style={{ fontSize: "3em", marginBottom: "20px", color: "#f39c12" }}></i>
            <h3 className={tw.text_2xl.mb_3.text_orange_400}>Exclusive Events</h3>
            <p className={tw.text_base.text_gray_400}>Attend world-class events, from private galas to exclusive parties, curated just for our guests.</p>
          </div>
          <div className={tw.bg_neutral_800.p_8.rounded_2xl.shadow_lg.flex_1.max_w_xs.text_center.transform.transition_all.duration_300.hover(tw.translate_y_2.shadow_xl)}>
            <i className="fas fa-spa" style={{ fontSize: "3em", marginBottom: "20px", color: "#f39c12" }}></i>
            <h3 className={tw.text_2xl.mb_3.text_orange_400}>Luxury Spa</h3>
            <p className={tw.text_base.text_gray_400}>Rejuvenate your mind, body, and soul with our premium spa treatments, designed to pamper you.</p>
          </div>
        </div>
      </section>

      <section className={tw.py_20.px_10.bg_neutral_900.text_center}>
        <h2 className={tw.text_4xl.mb_10.text_orange_400}>Discover Monte Carlo</h2>
        <div className={tw.grid.grid_cols_1.sm(tw.grid_cols_2).lg(tw.grid_cols_3).gap_5}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className={tw.bg_cover.bg_center.rounded_2xl.h_52.transition_transform.duration_300.shadow_lg.hover(tw.scale_105)} style={{ backgroundImage: "url('https://source.unsplash.com/600x400/?monaco,luxury')" }}></div>
          ))}
        </div>
      </section>

      <footer className={tw.bg_neutral_900.text_white.py_10.px_5.text_center.shadow_lg}>
        <div className={tw.max_w_6xl.mx_auto}>
          <div className={tw.flex.justify_center.gap_8.mb_5}>
            <a href="#" className={tw.text_white.text_base.hover(tw.text_orange_400).no_underline}>Privacy Policy</a>
            <a href="#" className={tw.text_white.text_base.hover(tw.text_orange_400).no_underline}>Terms of Service</a>
            <a href="#" className={tw.text_white.text_base.hover(tw.text_orange_400).no_underline}>Contact Us</a>
          </div>
          <p className={tw.text_gray_400}>&copy; 2024 Monte Carlo. All rights reserved.</p>
          <div className={tw.flex.justify_center.gap_5.mt_5}>
            <a href="#" className={tw.text_white.text_2xl.transition_colors.duration_300.hover(tw.text_orange_400)}><i className="fab fa-facebook-f"></i></a>
            <a href="#" className={tw.text_white.text_2xl.transition_colors.duration_300.hover(tw.text_orange_400)}><i className="fab fa-instagram"></i></a>
            <a href="#" className={tw.text_white.text_2xl.transition_colors.duration_300.hover(tw.text_orange_400)}><i className="fab fa-twitter"></i></a>
            <a href="#" className={tw.text_white.text_2xl.transition_colors.duration_300.hover(tw.text_orange_400)}><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
