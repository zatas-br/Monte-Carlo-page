import React from 'react';
import { tw } from 'typewind';

interface Profile {
  name: string;
  image: string;
  description: string;
  link: string;
}

const profiles: Profile[] = [
  {
    name: "Yago Carlos",
    image: "/Imagens/yago.jpeg",
    description: "O Yago é o cara da Eletrobidu Solar que, apesar de brilhar no trabalho, parece precisar de um mapa para achar o gol no futebol. Fora das quadras, ele é conhecido por suas ideias malucas e risadas contagiosas – é um verdadeiro caos solar!.",
    link: "https://www.instagram.com/yaguin_16/"
  },
  {
    name: "Gabriel Cardoso",
    image: "/Imagens/Gabriel.jpeg",
    description: "Gabriel Cardoso é o azarado de plantão no Valorant, que acabou de começar sua carreira como programador. Além de investir dinheiro como ninguém, ele corre tão rápido que ninguém o alcança. E mesmo com todo o estresse, seu cabelo está sempre impecável, porque estilo é essencial.",
    link: "https://www.instagram.com/gabrielcardos095/"
  },
  {
    name: "Bruno Santiago",
    image: "/Imagens/bruno.jpeg",
    description: "Bruno é aquele amigo que sempre está com o celular na mão, jogando Clash Royale como se sua vida dependesse disso. Ele é um programador que fala mais com o computador do que com pessoas, mas quando resolve sair, pode apostar que vai estragar o role com suas piadas de código. Autoproclamado \"rei do sexo\", ele é mais um monarca do teclado que da realeza da sedução.",
    link: "https://www.instagram.com/bruno_s4nt/"
  },
  {
    name: "Thiago Bryan",
    image: "/Imagens/bryan.jpeg",
    description: "O Bryan é o gigante do ensino médio que faz gols e piadas como ninguém. Com um pé no futebol e o outro na comédia, ele usa seu tamanho para marcar presença no campo e na sala de aula – não se assuste se ele der um “chapéu” na sua altura e no seu humor!",
    link: "https://www.instagram.com/thbryann/"
  },
  {
    name: "Antony Brito",
    image: "/Imagens/antony.jpeg",
    description: "O Antony é o rei do futebol e das piadas ruins – suas piadas são tão “ruins” quanto o seu desempenho no ataque, mas ele ainda arrasa em campo. Enquanto sonha com um Civic 2020 híbrido, ele já está fazendo o time inteiro rir e a torcida aplaudir suas habilidades (ou a falta delas).",
    link: "https://www.instagram.com/antonybriito"
  },
  {
    name: "Natan A. Santiago",
    image: "/Imagens/natan.jpeg",
    description: "Natan é um entusiasta de jogos eletrônicos que já tentou uma carreira no Fortnite e adora explorar novos desafios virtuais. Além disso, é um apreciador de basquete, sempre pronto para um bom jogo ou uma conversa sobre o esporte.",
    link: "https://www.instagram.com/natan.santt"
  },
  {
    name: "Renan Natal",
    image: "/Imagens/Renan.jpeg",
    description: "Renan Natal, conhecido entre os amigos como \"Biru Biru\", é um personagem único. Com um humor que muitas vezes deixa a galera na dúvida se ele tá brincando ou falando sério, Renan é apaixonado pela academia, onde passa boa parte do seu tempo esculpindo os músculos. Além de tudo, ele é religioso, equilibrando o suor da malhação com a fé. E não podemos esquecer do detalhe curioso: ele é gêmeo do Ryan, o que só aumenta o mistério em torno dessa dupla!",
    link: "https://www.instagram.com/016_natal?igsh=MTdocmU2OHhvNmt5Zw=="
  },
  {
    name: "Ryan Natal",
    image: "/Imagens/Ryan.jpeg",
    description: "Ryan Natal, o gêmeo do Renan, tem uma vibe toda diferente. Ele paga de cara fechada, sempre com aquele ar misterioso, mas é só alguém soltar uma piada que logo escapa uma risadinha. No mundo do trap, Ryan faz seu nome, mas o que pouca gente sabe é que antigamente ele era chamado de \"Zé Comeia\". Mesmo com o passado, hoje ele mantém o estilo discreto, mas é só dar uma brecha que ele mostra o lado divertido que tenta esconder.",
    link: "https://www.instagram.com/eey_ryan?igsh=MThpYTB1MXRpemI1MQ=="
  },
  {
    name: "Lucas Sperandio",
    image: "", // Image missing in HTML source
    description: "Lucas Sperandio é aquele cara tranquilo que todo mundo respeita. Com uma vibe serena e religiosa, ele tem uma aparência que lembra um lenhador, com a barba sempre bem cuidada e uma postura robusta. Mas não se deixe enganar pelo exterior calmo: quando Lucas se dedica a algo, ele tryharda como ninguém. Seja no trabalho, na academia, ou em qualquer desafio, ele dá tudo de si e vai até o fim, sempre com aquela determinação que impressiona.",
    link: "https://www.instagram.com/sperandio_lucass?igsh=MWN2MjU1cHU3djc0YQ=="
  },
  {
    name: "Kauan A. Santiago",
    image: "/Imagens/Kauan.jpeg",
    description: "Kauan Santiago de Almeida é uma figura singular, com uma sexualidade que deixa todos na dúvida e um gosto por moda exótico, sendo o \"baiano fashion\" local. Sempre com óculos gigante e escuro, ele mantém um visual peculiar e controverso, com ideias recistas e piadas sobre autistas. Mesmo difícil de entender, Kauan é impossível de esquecer.",
    link: "https://www.instagram.com/natan.santt"
  },
  {
    name: "Vitor Santiago",
    image: "/Imagens/Vitor.jpeg",
    description: "Vitor Hugo Santiago, o famoso \"Pernambucano Canela Dura\", é tão magro que parece que vai sumir se virar de lado. Veio direto de Pernambuco, e apesar de ser liso que só, é cheio de energia. Ama soltar pipa e pedalar por aí, correndo mais que o vento!",
    link: "https://www.instagram.com/vtzin.x7wc?igsh=cDZyeHJhaWJrMjN3"
  },
  {
    name: "Gabriel Santiago",
    image: "/Imagens/GabrielSant.jpeg",
    description: "Gabriel Santiago é o tipo de pessoa que deixa todo mundo sem saber o que esperar. Provavelmente gay, ele é conhecido pelos banhos intermináveis que deixam a galera impaciente. Agressivo e esquisito, ele tem um jeito peculiar de lidar com as coisas, sempre no seu próprio ritmo. O que mais chama atenção, porém, é sua paixão por mulheres gordas, algo que ele não esconde de ninguém. Gabriel é estranho, mas sempre autêntico!",
    link: "https://www.instagram.com/biel.sant1?igsh=MTgzMXBlMXZtajNteQ=="
  }
];

export default function App() {
  return (
    <div className={tw.font_sans.bg_gray_100.text_gray_800.min_h_screen.relative.pb_10.overflow_x_hidden}>
      {/* Background Image */}
      <div
        className={tw.fixed.top_0.left_0.w_full.h_full.bg_cover.bg_center.bg_no_repeat.blur_sm}
        style={{ backgroundImage: "url('/Imagens/imagemDeFundo.jpeg')", zIndex: -1 }}
      />

      {/* Header */}
      <header className={tw.bg_neutral_800.text_white.p_5.flex.items_center.justify_between.mb_5.shadow_md}>
        <div className={tw.flex.items_center.gap_4}>
          <h1 className={tw.text_3xl.m_0.font_bold}>Monte Carlo</h1>
          <img src="/Imagens/montanhas.png" alt="Ícone Monte Carlo" className={tw.h_12.w_12} />
        </div>
        <nav className={tw.grow.flex.justify_center}>
          <ul className={tw.list_none.flex.gap_4.m_0.p_0}>
            <li><a href="./home.html" className={tw.no_underline.text_white.text_xl.px_3.py_1.rounded.transition_colors.duration_300.hover(tw.bg_pink_500.text_gray_800)}>Home</a></li>
            <li><a href="./html/timeLine.html" className={tw.no_underline.text_white.text_xl.px_3.py_1.rounded.transition_colors.duration_300.hover(tw.bg_pink_500.text_gray_800)}>TimeLine</a></li>
            <li><a href="./achievement.html" className={tw.no_underline.text_white.text_xl.px_3.py_1.rounded.transition_colors.duration_300.hover(tw.bg_pink_500.text_gray_800)}>Realizações</a></li>
            <li><a href="#contato" className={tw.no_underline.text_white.text_xl.px_3.py_1.rounded.transition_colors.duration_300.hover(tw.bg_pink_500.text_gray_800)}>Contato</a></li>
          </ul>
        </nav>
      </header>

      {/* Container */}
      <div className={tw.flex.flex_wrap.justify_center.gap_5.px_5.md(tw.px_0).pb_10}>
        {profiles.map((profile, index) => (
          <a key={index} href={profile.link} target="_blank" rel="noopener noreferrer" className={tw.no_underline.block}>
            <div
              className={`${tw.bg_white.rounded_lg.shadow_lg.flex.flex_col.md(tw.flex_row).items_center.md(tw.items_start).p_5.transition_transform.duration_300.overflow_hidden.box_border.shrink_0.relative} hover:-translate-y-1 hover:shadow-2xl`}
              style={{ width: '350px', height: '220px' }}
            >
              {profile.image ? (
                <img src={profile.image} alt={profile.name} className={tw.rounded_full.w_20.h_20.mr_0.md(tw.mr_5).mb_3.md(tw.mb_0).object_cover.shrink_0} />
              ) : (
                <div className={tw.rounded_full.w_20.h_20.bg_gray_300.mr_0.md(tw.mr_5).mb_3.md(tw.mb_0).shrink_0}></div>
              )}
              <div className={tw.flex_1.flex.flex_col.justify_between.max_h_full.overflow_y_auto.text_center.md(tw.text_left)}>
                <h2 className={tw.text_2xl.mb_2.text_blue_600.break_words.font_bold}>{profile.name}</h2>
                <p className={tw.text_base.leading_relaxed.text_gray_600.m_0}>{profile.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
