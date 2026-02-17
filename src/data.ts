interface Profile {
  name: string;
  image: string;
  description: string;
  link: string;
  overall: number;
  age: number;
  birthDate: string;
  position?: string;
  attributes?: {
    pac: number;
    sho: number;
    pas: number;
    dri: number;
    def: number;
    phy: number;
  };
}

interface Retrospective {
  year: number;
  videoUrl: string;
  videoId: string;
}

export const profiles: Profile[] = [
  {
    name: "Yago Carlos",
    image: "/Imagens/yago.jpeg",
    description: "O Yago é o cara da Eletrobidu Solar que, apesar de brilhar no trabalho, parece precisar de um mapa para achar o gol no futebol. Fora das quadras, ele é conhecido por suas ideias malucas e risadas contagiosas – é um verdadeiro caos solar!.",
    link: "https://www.instagram.com/yaguin_16/",
    overall: 85,
    age: 18,
    birthDate: "16/04",
    position: "LD",
    attributes: { pac: 78, sho: 60, pas: 75, dri: 72, def: 80, phy: 70 }
  },
  {
    name: "Gabriel Cardoso",
    image: "/Imagens/Gabriel.jpeg",
    description: "Gabriel Cardoso é o azarado de plantão no Valorant, que acabou de começar sua carreira como programador. Além de investir dinheiro como ninguém, ele corre tão rápido que ninguém o alcança. E mesmo com todo o estresse, seu cabelo está sempre impecável, porque estilo é essencial.",
    link: "https://www.instagram.com/gabrielcardos095/",
    overall: 88,
    age: 19,
    birthDate: "27/11",
    position: "ATA",
    attributes: { pac: 92, sho: 84, pas: 78, dri: 86, def: 45, phy: 72 }
  },
  {
    name: "Bruno Santiago",
    image: "/Imagens/bruno.jpeg",
    description: "Bruno é aquele amigo que sempre está com o celular na mão, jogando Clash Royale como se sua vida dependesse disso. Ele é um programador que fala mais com o computador do que com pessoas, mas quando resolve sair, pode apostar que vai estragar o role com suas piadas de código. Autoproclamado \"rei do sexo\", ele é mais um monarca do teclado que da realeza da sedução.",
    link: "https://www.instagram.com/bruno_s4nt/",
    overall: 82,
    age: 19,
    birthDate: "13/05",
    position: "VOL",
    attributes: { pac: 70, sho: 65, pas: 82, dri: 75, def: 78, phy: 74 }
  },
  {
    name: "Thiago Bryan",
    image: "/Imagens/bryan.jpeg",
    description: "O Bryan é o gigante do ensino médio que faz gols e piadas como ninguém. Com um pé no futebol e o outro na comédia, ele usa seu tamanho para marcar presença no campo e na sala de aula – não se assuste se ele der um “chapéu” na sua altura e no seu humor!",
    link: "https://www.instagram.com/thbryann/",
    overall: 90,
    age: 19,
    birthDate: "05/11",
    position: "ZAG",
    attributes: { pac: 68, sho: 75, pas: 72, dri: 65, def: 91, phy: 93 }
  },
  {
    name: "Antony Brito",
    image: "/Imagens/antony.jpeg",
    description: "O Antony é o rei do futebol e das piadas ruins – suas piadas são tão “ruins” quanto o seu desempenho no ataque, mas ele ainda arrasa em campo. Enquanto sonha com um Civic 2020 híbrido, ele já está fazendo o time inteiro rir e a torcida aplaudir suas habilidades (ou a falta delas).",
    link: "https://www.instagram.com/antonybriito",
    overall: 87,
    age: 18,
    birthDate: "03/10",
    position: "MEI",
    attributes: { pac: 84, sho: 82, pas: 86, dri: 88, def: 50, phy: 65 }
  },
  {
    name: "Natan A. Santiago",
    image: "/Imagens/natan.jpeg",
    description: "Natan é um entusiasta de jogos eletrônicos que já tentou uma carreira no Fortnite e adora explorar novos desafios virtuais. Além disso, é um apreciador de basquete, sempre pronto para um bom jogo ou uma conversa sobre o esporte.",
    link: "https://www.instagram.com/natan.santt",
    overall: 84,
    age: 20,
    birthDate: "15/05",
    position: "GOL",
    attributes: { pac: 60, sho: 50, pas: 70, dri: 60, def: 85, phy: 80 }
  },
  {
    name: "Renan Natal",
    image: "/Imagens/Renan.jpeg",
    description: "Renan Natal, conhecido entre os amigos como \"Biru Biru\", é um personagem único. Com um humor que muitas vezes deixa a galera na dúvida se ele tá brincando ou falando sério, Renan é apaixonado pela academia, onde passa boa parte do seu tempo esculpindo os músculos. Além de tudo, ele é religioso, equilibrando o suor da malhação com a fé. E não podemos esquecer do detalhe curioso: ele é gêmeo do Ryan, o que só aumenta o mistério em torno dessa dupla!",
    link: "https://www.instagram.com/016_natal?igsh=MTdocmU2OHhvNmt5Zw==",
    overall: 92,
    age: 18,
    birthDate: "23/07",
    position: "LE",
    attributes: { pac: 89, sho: 75, pas: 78, dri: 82, def: 86, phy: 94 }
  },
  {
    name: "Ryan Natal",
    image: "/Imagens/Ryan.jpeg",
    description: "Ryan Natal, o gêmeo do Renan, tem uma vibe toda diferente. Ele paga de cara fechada, sempre com aquele ar misterioso, mas é só alguém soltar uma piada que logo escapa uma risadinha. No mundo do trap, Ryan faz seu nome, mas o que pouca gente sabe é que antigamente ele era chamado de \"Zé Comeia\". Mesmo com o passado, hoje ele mantém o estilo discreto, mas é só dar uma brecha que ele mostra o lado divertido que tenta esconder.",
    link: "https://www.instagram.com/eey_ryan?igsh=MThpYTB1MXRpemI1MQ==",
    overall: 91,
    age: 18,
    birthDate: "23/07",
    position: "PD",
    attributes: { pac: 88, sho: 85, pas: 80, dri: 89, def: 55, phy: 76 }
  },
  {
    name: "Lucas Sperandio",
    image: "/Imagens/lucas.jpeg",
    description: "Lucas Sperandio é aquele cara tranquilo que todo mundo respeita. Com uma vibe serena e religiosa, ele tem uma aparência que lembra um lenhador, com a barba sempre bem cuidada e uma postura robusta. Mas não se deixe enganar pelo exterior calmo: quando Lucas se dedica a algo, ele tryharda como ninguém. Seja no trabalho, na academia, ou em qualquer desafio, ele dá tudo de si e vai até o fim, sempre com aquela determinação que impressiona.",
    link: "https://www.instagram.com/sperandio_lucass?igsh=MWN2MjU1cHU3djc0YQ==",
    overall: 89,
    age: 18,
    birthDate: "20/07",
    position: "ZAG",
    attributes: { pac: 72, sho: 60, pas: 75, dri: 68, def: 90, phy: 88 }
  },
  {
    name: "Kauan A. Santiago",
    image: "/Imagens/Kauan.jpeg",
    description: "Kauan Santiago de Almeida é uma figura singular, com uma sexualidade que deixa todos na dúvida e um gosto por moda exótico, sendo o \"baiano fashion\" local. Sempre com óculos gigante e escuro, ele mantém um visual peculiar e controverso, com ideias recistas e piadas sobre autistas. Mesmo difícil de entender, Kauan é impossível de esquecer.",
    link: "https://www.instagram.com/natan.santt",
    overall: 80,
    age: 17,
    birthDate: "05/06",
    position: "LD",
    attributes: { pac: 75, sho: 65, pas: 72, dri: 78, def: 70, phy: 68 }
  },
  {
    name: "Vitor Santiago",
    image: "/Imagens/Vitor.jpeg",
    description: "Vitor Hugo Santiago, o famoso \"Pernambucano Canela Dura\", é tão magro que parece que vai sumir se virar de lado. Veio direto de Pernambuco, e apesar de ser liso que só, é cheio de energia. Ama soltar pipa e pedalar por aí, correndo mais que o vento!",
    link: "https://www.instagram.com/vtzin.x7wc?igsh=cDZyeHJhaWJrMjN3",
    overall: 86,
    age: 18,
    birthDate: "12/03",
    position: "PE",
    attributes: { pac: 94, sho: 70, pas: 74, dri: 85, def: 40, phy: 50 }
  },
  {
    name: "Gabriel Santiago",
    image: "/Imagens/GabrielSant.jpeg",
    description: "Gabriel Santiago é o tipo de pessoa que deixa todo mundo sem saber o que esperar. Provavelmente gay, ele é conhecido pelos banhos intermináveis que deixam a galera impaciente. Agressivo e esquisito, ele tem um jeito peculiar de lidar com as coisas, sempre no seu próprio ritmo. O que mais chama atenção, porém, é sua paixão por mulheres gordas, algo que ele não esconde de ninguém. Gabriel é estranho, mas sempre autêntico!",
    link: "https://www.instagram.com/biel.sant1?igsh=MTgzMXBlMXZtajNteQ==",
    overall: 83,
    age: 18,
    birthDate: "24/11",
    position: "GOL",
    attributes: { pac: 55, sho: 40, pas: 65, dri: 50, def: 82, phy: 85 }
  },
  {
    name: "Chrystian Tomaz",
    image: "/Imagens/chrystian.jpeg",
    description: "Chrystian Tomaz - Descrição provisória.",
    link: "",
    overall: 78,
    age: 19,
    birthDate: "21/04",
    position: "MC",
    attributes: { pac: 72, sho: 68, pas: 75, dri: 73, def: 70, phy: 74 }
  },
  {
    name: "Natan (Gordo)",
    image: "/Imagens/natan(gordo).png",
    description: "Natan (Gordo) - Descrição provisória.",
    link: "",
    overall: 75,
    age: 19,
    birthDate: "15/05",
    position: "ZAG",
    attributes: { pac: 50, sho: 60, pas: 70, dri: 65, def: 78, phy: 85 }
  },
  {
    name: "Felipe Brito",
    image: "/Imagens/felipe.png",
    description: "Felipe Brito - Descrição provisória.",
    link: "",
    overall: 79,
    age: 18,
    birthDate: "09/01",
    position: "ATA",
    attributes: { pac: 76, sho: 78, pas: 72, dri: 75, def: 40, phy: 70 }
  }
];

export const rankingCategories = {
  "Zoação / Habilidades": [
    "Mais forte fisicamente",
    "Mais fraco (não aguenta 10 flexões)",
    "Mais rápido (corrida / reflexo)",
    "Mais lento",
    "Mais bonito(a)",
    "Mais feio(a) com orgulho",
    "Mais estiloso",
    "Pior senso de moda",
    "Mais carismático",
    "Mais antissocial",
    "Mais inteligente",
    "Mais lerdo pra entender as coisas",
    "Mais competitivo",
    "Mais tiltado (se estressa fácil)"
  ],
  "Futebol": [
    "Melhor no futebol",
    "Pior no futebol",
    "Craque de futsal",
    "Só faz falta",
    "Goleiro improvisado (ninguém quer, mas vai)"
  ],
  "Games": [
    "Melhor no Valorant",
    "Pior mira",
    "Mais carregado (vive sendo carregado)",
    "Mais tryhard",
    "Mais casual / joga só pela resenha",
    "Mais xingador no chat"
  ],
  "Extras": [
    "Mais bêbado do rolê",
    "Mais sumido",
    "Mais provável de chegar atrasado",
    "Mais dorminhoco",
    "Mais fofo",
    "Mais problemático 😈",
    "Mais gay",
    "Mais pegador"
  ]
};

export const historyContent = {
  title: "A História do Monte Carlo",
  subtitle: "Onde tudo começou: Futebol na Rua",
  text: [
    "A história do grupo Monte Carlo não começou em grandes escritórios ou com setups sofisticados. Ela nasceu no asfalto quente, entre dois chinelos marcando o gol e a poeira subindo a cada drible. Tudo começou com o futebol na rua.",
    "Naqueles tempos, a única preocupação era se a bola ia cair no quintal do vizinho rabugento ou se o sol ia se pôr antes da partida acabar. As rivalidades eram decididas no 'ou um ou dois', e a lealdade era forjada a cada passe e a cada defesa impossível.",
    "Foi ali, entre risadas, discussões acaloradas sobre faltas não marcadas e a celebração de gols improváveis, que os laços se estreitaram. Aquele grupo de moleques que corria atrás de uma bola aprendeu o valor da parceria, da resiliência e da amizade verdadeira.",
    "Com o tempo, as traves improvisadas deram lugar a monitores e teclados, o asfalto virou código e as estratégias de jogo se transformaram em táticas no Valorant e projetos de desenvolvimento. Mas a essência permaneceu a mesma.",
    "O Monte Carlo é, e sempre será, aquele time de amigos que começou na rua. A tecnologia mudou, os desafios cresceram, mas o espírito de união que nasceu no futebol de rua continua sendo a nossa maior força. Hoje, não jogamos apenas pela vitória no servidor, mas pelo sucesso uns dos outros na vida."
  ],
  image: "Imagens/monte-carlos-historia.jpeg"
};

export interface Event {
  id: string;
  title: string;
  date: string;
  status: 'past' | 'upcoming';
  description: string;
  images: string[];
  mainImage: string;
}

export const events: Event[] = [
  {
    id: "lan-1.0",
    title: "Lan House 1.0",
    date: "Passado",
    status: 'past',
    description: "A primeira edição lendária da nossa Lan House. Onde as primeiras rivalidades digitais foram formadas e as pizzas devoradas.",
    mainImage: "https://placehold.co/600x400/333/FFF?text=Lan+House+1.0",
    images: [
      "https://placehold.co/400x400/333/FFF?text=LH1+Img1",
      "https://placehold.co/400x400/444/FFF?text=LH1+Img2",
      "https://placehold.co/400x400/555/FFF?text=LH1+Img3",
      "https://placehold.co/400x400/666/FFF?text=LH1+Img4",
      "https://placehold.co/400x400/777/FFF?text=LH1+Img5"
    ]
  },
  {
    id: "lan-2.0",
    title: "Lan House 2.0",
    date: "Passado",
    status: 'past',
    description: "A evolução. Mais máquinas, mais jogos e muito mais caos. A noite virou dia e a diversão não teve fim.",
    mainImage: "https://placehold.co/600x400/333/FFF?text=Lan+House+2.0",
    images: [
      "https://placehold.co/400x400/333/FFF?text=LH2+Img1",
      "https://placehold.co/400x400/444/FFF?text=LH2+Img2",
      "https://placehold.co/400x400/555/FFF?text=LH2+Img3",
      "https://placehold.co/400x400/666/FFF?text=LH2+Img4",
      "https://placehold.co/400x400/777/FFF?text=LH2+Img5"
    ]
  },
  {
    id: "lan-3.0",
    title: "Lan House 3.0",
    date: "Passado",
    status: 'past',
    description: "A consolidação da tradição. Torneios internos, gritaria e momentos épicos que ficaram marcados na memória.",
    mainImage: "https://placehold.co/600x400/333/FFF?text=Lan+House+3.0",
    images: [
      "https://placehold.co/400x400/333/FFF?text=LH3+Img1",
      "https://placehold.co/400x400/444/FFF?text=LH3+Img2",
      "https://placehold.co/400x400/555/FFF?text=LH3+Img3",
      "https://placehold.co/400x400/666/FFF?text=LH3+Img4",
      "https://placehold.co/400x400/777/FFF?text=LH3+Img5"
    ]
  },
  {
    id: "lan-4.0",
    title: "Lan House 4.0",
    date: "Passado",
    status: 'past',
    description: "A edição mais recente antes do grande retorno. A tecnologia avançou, mas a zoeira continuou a mesma.",
    mainImage: "https://placehold.co/600x400/333/FFF?text=Lan+House+4.0",
    images: [
      "https://placehold.co/400x400/333/FFF?text=LH4+Img1",
      "https://placehold.co/400x400/444/FFF?text=LH4+Img2",
      "https://placehold.co/400x400/555/FFF?text=LH4+Img3",
      "https://placehold.co/400x400/666/FFF?text=LH4+Img4",
      "https://placehold.co/400x400/777/FFF?text=LH4+Img5"
    ]
  },
  {
    id: "lan-5.0",
    title: "Lan House 5.0",
    date: "2026-04-03", // ISO format for easy parsing
    status: 'upcoming',
    description: "O RETORNO. Preparem-se para a maior edição de todas. Novas lendas serão escritas.",
    mainImage: "https://placehold.co/600x400/E1306C/FFF?text=Lan+House+5.0+Coming+Soon",
    images: [
      "https://placehold.co/400x400/E1306C/FFF?text=LH5+SneakPeek1",
      "https://placehold.co/400x400/C13584/FFF?text=LH5+SneakPeek2",
      "https://placehold.co/400x400/833AB4/FFF?text=LH5+SneakPeek3",
      "https://placehold.co/400x400/5851DB/FFF?text=LH5+SneakPeek4",
      "https://placehold.co/400x400/405DE6/FFF?text=LH5+SneakPeek5"
    ]
  }
];

export const retrospectives: Retrospective[] = [
  { year: 2021, videoUrl: "https://vimeo.com/1164837943?share=copy&fl=sv&fe=ci", videoId: "1164837943" },
  { year: 2022, videoUrl: "https://vimeo.com/1164838402?share=copy&fl=sv&fe=ci", videoId: "1164838402" },
  { year: 2023, videoUrl: "https://vimeo.com/1164839195?share=copy&fl=sv&fe=ci", videoId: "1164839195" },
  { year: 2024, videoUrl: "https://vimeo.com/1164839636?share=copy&fl=sv&fe=ci", videoId: "1164839636" },
  { year: 2025, videoUrl: "https://vimeo.com/1164840824?share=copy&fl=sv&fe=ci", videoId: "1164840824" }
];

export const socialLinks = {
  instagram: "https://www.instagram.com/monte_carlo047/"
};
