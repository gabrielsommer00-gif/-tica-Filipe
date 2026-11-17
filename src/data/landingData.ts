export interface CategorySlide {
  src: string;
  alt: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  slides: CategorySlide[];
}

export interface LensItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface DifferentiatorItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export type FieldStatus = 'confirmado' | 'provisorio' | 'pendente';

export interface StorePhoto {
  id: string;
  url: string;
  caption: string;
}

export interface StoreUnit {
  id: string;
  unitCode: string;
  name: string;
  shortName: string;
  neighborhood: string;
  city: string;
  state: string;
  addressDisplay: string;
  addressStatus: FieldStatus;
  mapsQuery?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  phone?: string;
  phoneStatus: FieldStatus;
  whatsapp?: string;
  whatsappDisplay?: string;
  whatsappStatus: FieldStatus;
  hoursWeekdays: string;
  hoursSaturday: string;
  hoursStatus: FieldStatus;
  hasLaboratoryOnSite: boolean;
  hasParking: boolean;
  photoUrl?: string;
  galleryPhotos: StorePhoto[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BRAND_ASSETS = {
  logoOfficial: '/assets/aistudio/file_00000000401c820ea2b217c61b0a8c17_a3def2eb.png',
  iconSvg: '/icon.svg',
  heroEyewear: '/assets/banner_hero_eyewear_1794451042570-CHy6jPWm.jpg',
  categoryCollections: '/assets/category_collections_1794451042592-SeMhvlsf.jpg',
  storeExperience: '/assets/store_experience_1794451043229-sKZL-9T3.jpg',
  instagramHandle: '@oticasfilipe',
  instagramUrl: 'https://instagram.com/oticasfilipe',
};

export const INSTITUTIONAL_PILLARS = [
  {
    id: 'unidades',
    highlight: '15',
    title: 'Unidades oficiais',
    subtitle: 'Presentes em São Paulo e São Caetano do Sul para estar sempre perto de você.',
  },
  {
    id: 'avaliacao',
    highlight: '100%',
    title: 'Avaliação visual gratuita',
    subtitle: 'Triagem e orientação personalizada sem custo em qualquer unidade da rede.',
  },
  {
    id: 'laboratorio',
    highlight: 'Próprio',
    title: 'Laboratório de montagem',
    subtitle: 'Controle rigoroso de qualidade na montagem das suas lentes e armações.',
  },
  {
    id: 'garantia',
    highlight: 'Certificada',
    title: 'Garantia e procedência',
    subtitle: 'Armações e lentes com procedência certificada e suporte para ajustes na rede.',
  },
];

export const PRODUCT_CATEGORIES: CategoryItem[] = [
  {
    id: 'oculos-grau',
    title: 'Óculos de grau',
    subtitle: 'Acetato, metal e titânio',
    description:
      'Armações selecionadas para conforto diário, leveza e ajuste preciso ao seu formato de rosto.',
    slides: [
      {
        src: '/assets/stores/filipe-11-vila-alpina/04-expositor-grau-unnamed-10.jpg',
        alt: 'Expositor de óculos de grau Óticas Filipe — Vila Alpina',
      },
      {
        src: '/assets/stores/filipe-12-sapopemba/09-armacoes-acetato-unnamed-19.jpg',
        alt: 'Armações de grau em acetato Óticas Filipe — Sapopemba',
      },
      {
        src: '/assets/stores/filipe-12-sapopemba/12-armacoes-metal-unnamed-24.jpg',
        alt: 'Armações metálicas de grau Óticas Filipe — Sapopemba',
      },
      {
        src: '/assets/category_collections_1794451042592-SeMhvlsf.jpg',
        alt: 'Coleção de armações de grau Óticas Filipe',
      },
    ],
  },
  {
    id: 'oculos-sol',
    title: 'Óculos de sol',
    subtitle: 'Proteção UV e design autoral',
    description:
      'Modelos solares com proteção contra raios UV e possibilidade de personalização com grau.',
    slides: [
      {
        src: '/assets/stores/filipe-13-vila-industrial/04-expositor-solar-unnamed-67.jpg',
        alt: 'Expositor de óculos de sol Óticas Filipe — Vila Industrial',
      },
      {
        src: '/assets/stores/filipe-14-pq-santa-madalena/06-solar-estojo-unnamed-40.jpg',
        alt: 'Óculos solar com estojo oficial Óticas Filipe — Parque Santa Madalena',
      },
      {
        src: '/assets/stores/filipe-04-sao-caetano/08-expositor-solar-unnamed-3.jpg',
        alt: 'Expositor de óculos solares Óticas Filipe — São Caetano',
      },
    ],
  },
  {
    id: 'clip-on',
    title: 'Clip-On 2 em 1',
    subtitle: 'Grau e solar no mesmo modelo',
    description:
      'Praticidade para o dia inteiro com encaixe magnético de lentes solares sobre a armação de grau.',
    slides: [
      {
        src: '/assets/stores/filipe-11-vila-alpina/05-expositor-clipon-unnamed-11.jpg',
        alt: 'Armações Clip-On 2 em 1 Óticas Filipe — Vila Alpina',
      },
      {
        src: '/assets/stores/filipe-12-sapopemba/11-armacoes-selecao-unnamed-23.jpg',
        alt: 'Seleção de armações na vitrine Óticas Filipe — Sapopemba',
      },
    ],
  },
  {
    id: 'linha-infantil',
    title: 'Linha infantil',
    subtitle: 'Leves e resistentes',
    description:
      'Modelos pensados para crianças e jovens, com encaixe seguro e conforto para a rotina escolar.',
    slides: [
      {
        src: '/assets/stores/filipe-15-pq-sao-lucas/06-bandeja-armacoes-unnamed-32.jpg',
        alt: 'Seleção de armações em loja Óticas Filipe — Parque São Lucas',
      },
      {
        src: '/assets/stores/filipe-04-sao-caetano/09-bandeja-armacoes-unnamed-2.jpg',
        alt: 'Bandeja de armações disponíveis Óticas Filipe — São Caetano',
      },
    ],
  },
  {
    id: 'acessorios',
    title: 'Acessórios',
    subtitle: 'Estojos oficiais e cuidados',
    description:
      'Estojos rígidos oficiais Óticas Filipe, flanelas e itens essenciais para conservação dos seus óculos.',
    slides: [
      {
        src: '/assets/stores/filipe-13-vila-industrial/01-estojo-oficial-unnamed-65.jpg',
        alt: 'Estojo oficial e armação Óticas Filipe — Vila Industrial',
      },
      {
        src: '/assets/stores/filipe-11-vila-alpina/06-produto-estojo-unnamed-12.jpg',
        alt: 'Estojo oficial Óticas Filipe — Vila Alpina',
      },
      {
        src: '/assets/stores/filipe-13-vila-industrial/02-armacao-estojo-unnamed-66.jpg',
        alt: 'Armação com estojo oficial Óticas Filipe — Vila Industrial',
      },
    ],
  },
];

export const LENS_TYPES: LensItem[] = [
  {
    id: 'monofocais',
    title: 'Monofocais',
    subtitle: 'Visão simples para longe ou perto',
    description:
      'Indicadas para correção de miopia, hipermetropia ou astigmatismo, oferecendo nitidez em uma distância focal específica.',
  },
  {
    id: 'multifocais',
    title: 'Multifocais',
    subtitle: 'Transição contínua para todas as distâncias',
    description:
      'Permitem enxergar com clareza de perto, meia distância e longe no mesmo par de óculos, sem precisar alternar armações.',
  },
  {
    id: 'ocupacionais',
    title: 'Ocupacionais',
    subtitle: 'Conforto para leitura, escritório e telas',
    description:
      'Desenvolvidas para distâncias próximas e intermediárias, ideais para quem passa horas em computadores e documentos.',
  },
  {
    id: 'bifocais',
    title: 'Bifocais',
    subtitle: 'Dois campos definidos na mesma lente',
    description:
      'Combinam correção para longe e para perto com campos bem delimitados, atendendo quem prefere transição direta.',
  },
];

export const DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    id: 'avaliacao-visual',
    number: '01',
    title: 'Avaliação visual 100% gratuita',
    description:
      'Realize sua triagem visual sem custo em nossas unidades físicas e receba orientação clara antes de escolher seus óculos.',
  },
  {
    id: 'consultoria-optica',
    number: '02',
    title: 'Consultoria óptica especializada',
    description:
      'Equipe treinada para indicar o melhor formato de armação, medida aro-ponte-haste e tipo de lente conforme sua receita e rotina.',
  },
  {
    id: 'laboratorio-proprio',
    number: '03',
    title: 'Laboratório de montagem próprio',
    description:
      'Produção e conferência interna das lentes na armação escolhida, assegurando precisão óptica e acabamento superior.',
  },
  {
    id: 'garantia-procedencia',
    number: '04',
    title: 'Garantia e procedência certificada',
    description:
      'Todas as armações e lentes comercializadas pela Óticas Filipe contam com procedência certificada e garantia oficial.',
  },
  {
    id: 'suporte-ajustes',
    number: '05',
    title: 'Suporte técnico para ajustes em toda a rede',
    description:
      'Conte com suporte contínuo para alinhamento, troca de plaquetas, limpeza e manutenção básica em qualquer uma das 15 unidades.',
  },
];

export const STORES_GALLERY_HIGHLIGHTS = [
  {
    src: '/assets/stores/filipe-10-metro-belem/01-fachada-esquina-unnamed-41.jpg',
    alt: 'Fachada da unidade Óticas Filipe — Metrô Belém',
    label: 'Óticas Filipe — Metrô Belém',
  },
  {
    src: '/assets/stores/filipe-12-sapopemba/03-interior-atendimento-unnamed-17.jpg',
    alt: 'Área interna de atendimento Óticas Filipe — Sapopemba',
    label: 'Óticas Filipe — Sapopemba (Interior)',
  },
  {
    src: '/assets/stores/filipe-04-sao-caetano/01-fachada-principal-unnamed-1.jpg',
    alt: 'Fachada da unidade Óticas Filipe — São Caetano',
    label: 'Óticas Filipe — São Caetano do Sul',
  },
  {
    src: '/assets/stores/filipe-11-vila-alpina/01-fachada-principal-unnamed-9.jpg',
    alt: 'Fachada da unidade Óticas Filipe — Vila Alpina',
    label: 'Óticas Filipe — Vila Alpina',
  },
  {
    src: '/assets/stores/filipe-03-sitio-piqueri/06-interior-atendimento-unnamed-60.jpg',
    alt: 'Espaço de atendimento Óticas Filipe — Sítio do Piqueri',
    label: 'Óticas Filipe — Sítio do Piqueri',
  },
  {
    src: '/assets/stores/filipe-15-pq-sao-lucas/01-fachada-entrada-unnamed-29.jpg',
    alt: 'Fachada e entrada Óticas Filipe — Parque São Lucas',
    label: 'Óticas Filipe — Parque São Lucas',
  },
];

export const OFFICIAL_STORES: StoreUnit[] = [
  {
    id: 'filipe-01-heliopolis',
    unitCode: 'FILIPE-01',
    name: 'Óticas Filipe — Heliópolis',
    shortName: 'Heliópolis',
    neighborhood: 'Heliópolis',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Rua Cônego Xavier, 308 — Heliópolis, São Paulo/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Rua Conego Xavier 308 Heliopolis Sao Paulo SP',
    coordinates: { latitude: -23.6084418, longitude: -46.5959991 },
    phone: '(11) 2219-1336',
    phoneStatus: 'provisorio',
    whatsapp: '551122191336',
    whatsappDisplay: '(11) 2219-1336',
    whatsappStatus: 'provisorio',
    hoursWeekdays: '09:00 às 18:30 (A confirmar)',
    hoursSaturday: '09:00 às 13:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-01-heliopolis/01-fachada-principal.jpg',
    galleryPhotos: [
      {
        id: 'filipe-01-01',
        url: '/assets/stores/filipe-01-heliopolis/01-fachada-principal.jpg',
        caption: 'Fachada principal — Heliópolis',
      },
    ],
  },
  {
    id: 'filipe-02-jardim-fontalis',
    unitCode: 'FILIPE-02',
    name: 'Óticas Filipe — Jardim Fontalis',
    shortName: 'Jardim Fontalis',
    neighborhood: 'Jardim Fontalis',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Rua Ushikichi Kamiya, 1034 — Jardim Fontalis, São Paulo/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Rua Ushikichi Kamiya 1034 Jardim Fontalis Sao Paulo SP',
    coordinates: { latitude: -23.438689, longitude: -46.5730554 },
    phone: '(11) 95190-2675',
    phoneStatus: 'confirmado',
    whatsapp: '5511951902675',
    whatsappDisplay: '(11) 95190-2675',
    whatsappStatus: 'confirmado',
    hoursWeekdays: '09:00 às 18:00 (A confirmar)',
    hoursSaturday: '09:00 às 13:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-02-jardim-fontalis/01-fachada-principal-unnamed-50.jpg',
    galleryPhotos: [
      {
        id: 'filipe-02-01',
        url: '/assets/stores/filipe-02-jardim-fontalis/01-fachada-principal-unnamed-50.jpg',
        caption: 'Fachada principal — Jardim Fontalis',
      },
      {
        id: 'filipe-02-02',
        url: '/assets/stores/filipe-02-jardim-fontalis/02-fachada-externa-unnamed-52.jpg',
        caption: 'Vista externa — Jardim Fontalis',
      },
      {
        id: 'filipe-02-03',
        url: '/assets/stores/filipe-02-jardim-fontalis/03-interior-atendimento-unnamed-54.jpg',
        caption: 'Área de atendimento — Jardim Fontalis',
      },
      {
        id: 'filipe-02-04',
        url: '/assets/stores/filipe-02-jardim-fontalis/04-interior-vitrines-unnamed-51.jpg',
        caption: 'Vitrines internas — Jardim Fontalis',
      },
      {
        id: 'filipe-02-05',
        url: '/assets/stores/filipe-02-jardim-fontalis/05-interior-expositor-unnamed-53.jpg',
        caption: 'Expositor interno — Jardim Fontalis',
      },
    ],
  },
  {
    id: 'filipe-03-sitio-piqueri',
    unitCode: 'FILIPE-03',
    name: 'Óticas Filipe — Sítio do Piqueri',
    shortName: 'Sítio do Piqueri',
    neighborhood: 'Sítio do Piqueri',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Sítio do Piqueri, São Paulo/SP (Endereço completo em validação cadastral)',
    addressStatus: 'pendente',
    phoneStatus: 'pendente',
    whatsappStatus: 'pendente',
    hoursWeekdays: '09:00 às 18:00 (A confirmar)',
    hoursSaturday: '09:00 às 13:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-03-sitio-piqueri/01-fachada-principal-unnamed-62.jpg',
    galleryPhotos: [
      {
        id: 'filipe-03-01',
        url: '/assets/stores/filipe-03-sitio-piqueri/01-fachada-principal-unnamed-62.jpg',
        caption: 'Fachada principal — Sítio do Piqueri',
      },
      {
        id: 'filipe-03-02',
        url: '/assets/stores/filipe-03-sitio-piqueri/02-fachada-externa-unnamed-56.jpg',
        caption: 'Fachada externa — Sítio do Piqueri',
      },
      {
        id: 'filipe-03-03',
        url: '/assets/stores/filipe-03-sitio-piqueri/03-entrada-vitrines-unnamed-55.jpg',
        caption: 'Entrada e vitrines — Sítio do Piqueri',
      },
      {
        id: 'filipe-03-06',
        url: '/assets/stores/filipe-03-sitio-piqueri/06-interior-atendimento-unnamed-60.jpg',
        caption: 'Atendimento interno — Sítio do Piqueri',
      },
    ],
  },
  {
    id: 'filipe-04-sao-caetano',
    unitCode: 'FILIPE-04',
    name: 'Óticas Filipe — São Caetano',
    shortName: 'São Caetano',
    neighborhood: 'Centro',
    city: 'São Caetano do Sul',
    state: 'SP',
    addressDisplay: 'Rua Visconde de Inhaúma, 410 — Centro, São Caetano do Sul/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Rua Visconde de Inhauma 410 Sao Caetano do Sul SP',
    coordinates: { latitude: -23.6327477, longitude: -46.5649406 },
    phone: '(11) 98348-8643',
    phoneStatus: 'confirmado',
    whatsapp: '5511983488643',
    whatsappDisplay: '(11) 98348-8643',
    whatsappStatus: 'confirmado',
    hoursWeekdays: '09:00 às 18:30 (A confirmar)',
    hoursSaturday: '09:00 às 14:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-04-sao-caetano/01-fachada-principal-unnamed-1.jpg',
    galleryPhotos: [
      {
        id: 'filipe-04-01',
        url: '/assets/stores/filipe-04-sao-caetano/01-fachada-principal-unnamed-1.jpg',
        caption: 'Fachada principal — São Caetano',
      },
      {
        id: 'filipe-04-02',
        url: '/assets/stores/filipe-04-sao-caetano/02-fachada-vitrine-unnamed-5.jpg',
        caption: 'Vitrine externa — São Caetano',
      },
      {
        id: 'filipe-04-03',
        url: '/assets/stores/filipe-04-sao-caetano/03-interior-salao-unnamed-7.jpg',
        caption: 'Salão interno — São Caetano',
      },
      {
        id: 'filipe-04-05',
        url: '/assets/stores/filipe-04-sao-caetano/05-interior-atendimento-unnamed-6.jpg',
        caption: 'Balcão de atendimento — São Caetano',
      },
    ],
  },
  {
    id: 'filipe-05-tiradentes',
    unitCode: 'FILIPE-05',
    name: 'Óticas Filipe — Tiradentes',
    shortName: 'Tiradentes',
    neighborhood: 'Barro Branco, Cidade Tiradentes',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Rua Antônio Carlos Mingues Lopes, 1509 — Cidade Tiradentes, São Paulo/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Rua Antonio Carlos Mingues Lopes 1509 Barro Branco Cidade Tiradentes Sao Paulo SP',
    coordinates: { latitude: -23.581865, longitude: -46.3956018 },
    phone: '(11) 98543-9842',
    phoneStatus: 'confirmado',
    whatsapp: '5511985439842',
    whatsappDisplay: '(11) 98543-9842',
    whatsappStatus: 'confirmado',
    hoursWeekdays: '09:00 às 18:30 (A confirmar)',
    hoursSaturday: '09:00 às 13:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-05-tiradentes/01-fachada-principal.jpg',
    galleryPhotos: [
      {
        id: 'filipe-05-01',
        url: '/assets/stores/filipe-05-tiradentes/01-fachada-principal.jpg',
        caption: 'Fachada principal — Tiradentes',
      },
    ],
  },
  {
    id: 'filipe-06-guaianases',
    unitCode: 'FILIPE-06',
    name: 'Óticas Filipe — Guaianases',
    shortName: 'Guaianases',
    neighborhood: 'Guaianases',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Estrada do Lajeado Velho, 908 — Guaianases, São Paulo/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Estrada do Lajeado Velho 908 Guaianases Sao Paulo SP',
    coordinates: { latitude: -23.5366902, longitude: -46.4042007 },
    phone: '(11) 91659-3530',
    phoneStatus: 'confirmado',
    whatsapp: '5511916593530',
    whatsappDisplay: '(11) 91659-3530',
    whatsappStatus: 'confirmado',
    hoursWeekdays: '09:00 às 18:30 (A confirmar)',
    hoursSaturday: '09:00 às 13:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-06-guaianases/01-fachada-principal.jpg',
    galleryPhotos: [
      {
        id: 'filipe-06-01',
        url: '/assets/stores/filipe-06-guaianases/01-fachada-principal.jpg',
        caption: 'Fachada principal — Guaianases',
      },
    ],
  },
  {
    id: 'filipe-07-sao-mateus',
    unitCode: 'FILIPE-07',
    name: 'Óticas Filipe — São Mateus',
    shortName: 'São Mateus',
    neighborhood: 'São Mateus',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'São Mateus, São Paulo/SP (Endereço completo em validação cadastral)',
    addressStatus: 'pendente',
    phoneStatus: 'pendente',
    whatsappStatus: 'pendente',
    hoursWeekdays: '09:00 às 18:30 (A confirmar)',
    hoursSaturday: '09:00 às 14:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    galleryPhotos: [],
  },
  {
    id: 'filipe-08-jardim-santo-andre',
    unitCode: 'FILIPE-08',
    name: 'Óticas Filipe — Jardim Santo André',
    shortName: 'Jardim Santo André',
    neighborhood: 'Jardim Santo André',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Rua Miguel Ferreira, 662 — Jardim Santo André, São Paulo/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Rua Miguel Ferreira 662 Jardim Santo Andre Sao Paulo SP',
    coordinates: { latitude: -23.6320157, longitude: -46.4428303 },
    phone: '(11) 94858-2709',
    phoneStatus: 'confirmado',
    whatsapp: '5511948582709',
    whatsappDisplay: '(11) 94858-2709',
    whatsappStatus: 'confirmado',
    hoursWeekdays: '09:00 às 18:00 (A confirmar)',
    hoursSaturday: '09:00 às 13:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-08-jardim-santo-andre/01-fachada-principal.jpg',
    galleryPhotos: [
      {
        id: 'filipe-08-01',
        url: '/assets/stores/filipe-08-jardim-santo-andre/01-fachada-principal.jpg',
        caption: 'Fachada principal — Jardim Santo André',
      },
    ],
  },
  {
    id: 'filipe-09-rodolfo-pirani',
    unitCode: 'FILIPE-09',
    name: 'Óticas Filipe — Rodolfo Pirani',
    shortName: 'Rodolfo Pirani',
    neighborhood: 'Parque Rodolfo Pirani',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Av. Rodolfo Pirani, 201 — Parque Rodolfo Pirani, São Paulo/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Av. Rodolfo Pirani 201 Parque Rodolfo Pirani Sao Paulo SP',
    coordinates: { latitude: -23.6301707, longitude: -46.4616108 },
    phone: '(11) 98604-9130',
    phoneStatus: 'confirmado',
    whatsapp: '5511986049130',
    whatsappDisplay: '(11) 98604-9130',
    whatsappStatus: 'confirmado',
    hoursWeekdays: '09:00 às 18:00 (A confirmar)',
    hoursSaturday: '09:00 às 13:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    galleryPhotos: [],
  },
  {
    id: 'filipe-10-metro-belem',
    unitCode: 'FILIPE-10',
    name: 'Óticas Filipe — Metrô Belém',
    shortName: 'Metrô Belém',
    neighborhood: 'Belém',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Rua Toledo Barbosa, 155 — Belém, São Paulo/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Rua Toledo Barbosa 155 Belem Sao Paulo SP',
    coordinates: { latitude: -23.5414622, longitude: -46.5870409 },
    phone: '(11) 91527-2450',
    phoneStatus: 'confirmado',
    whatsapp: '5511915272450',
    whatsappDisplay: '(11) 91527-2450',
    whatsappStatus: 'confirmado',
    hoursWeekdays: '09:00 às 19:00 (A confirmar)',
    hoursSaturday: '09:00 às 14:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-10-metro-belem/01-fachada-esquina-unnamed-41.jpg',
    galleryPhotos: [
      {
        id: 'filipe-10-01',
        url: '/assets/stores/filipe-10-metro-belem/01-fachada-esquina-unnamed-41.jpg',
        caption: 'Fachada de esquina — Metrô Belém',
      },
      {
        id: 'filipe-10-02',
        url: '/assets/stores/filipe-10-metro-belem/02-fachada-frontal-unnamed-47.jpg',
        caption: 'Fachada frontal — Metrô Belém',
      },
      {
        id: 'filipe-10-06',
        url: '/assets/stores/filipe-10-metro-belem/06-interior-atendimento-unnamed-42.jpg',
        caption: 'Atendimento interno — Metrô Belém',
      },
      {
        id: 'filipe-10-09',
        url: '/assets/stores/filipe-10-metro-belem/09-interior-entrada-unnamed-45.jpg',
        caption: 'Entrada e expositores — Metrô Belém',
      },
    ],
  },
  {
    id: 'filipe-11-vila-alpina',
    unitCode: 'FILIPE-11',
    name: 'Óticas Filipe — Vila Alpina',
    shortName: 'Vila Alpina',
    neighborhood: 'Vila Alpina',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Rua Costa Barros, 949 — Vila Alpina, São Paulo/SP (CEP 03210-000)',
    addressStatus: 'provisorio',
    mapsQuery: 'Rua Costa Barros 949 Vila Alpina Sao Paulo SP',
    coordinates: { latitude: -23.5959404, longitude: -46.5570487 },
    phone: '(11) 94536-0698',
    phoneStatus: 'provisorio',
    whatsapp: '5511945360698',
    whatsappDisplay: '(11) 94536-0698',
    whatsappStatus: 'provisorio',
    hoursWeekdays: '09:00 às 18:30',
    hoursSaturday: '09:00 às 13:00',
    hoursStatus: 'provisorio',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-11-vila-alpina/01-fachada-principal-unnamed-9.jpg',
    galleryPhotos: [
      {
        id: 'filipe-11-01',
        url: '/assets/stores/filipe-11-vila-alpina/01-fachada-principal-unnamed-9.jpg',
        caption: 'Fachada principal — Vila Alpina',
      },
      {
        id: 'filipe-11-02',
        url: '/assets/stores/filipe-11-vila-alpina/02-interior-atendimento-unnamed-14.jpg',
        caption: 'Área de atendimento — Vila Alpina',
      },
      {
        id: 'filipe-11-03',
        url: '/assets/stores/filipe-11-vila-alpina/03-interior-vitrines-unnamed-15.jpg',
        caption: 'Vitrines internas — Vila Alpina',
      },
      {
        id: 'filipe-11-04',
        url: '/assets/stores/filipe-11-vila-alpina/04-expositor-grau-unnamed-10.jpg',
        caption: 'Expositor de grau — Vila Alpina',
      },
    ],
  },
  {
    id: 'filipe-12-sapopemba',
    unitCode: 'FILIPE-12',
    name: 'Óticas Filipe — Sapopemba',
    shortName: 'Sapopemba',
    neighborhood: 'Jardim Grimaldi, Sapopemba',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Av. Sapopemba, 8197 — Jardim Grimaldi, Sapopemba, São Paulo/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Av. Sapopemba 8197 Jardim Grimaldi Sapopemba Sao Paulo SP',
    coordinates: { latitude: -23.5983339, longitude: -46.5213497 },
    phone: '(11) 95209-5485',
    phoneStatus: 'confirmado',
    whatsapp: '5511952095485',
    whatsappDisplay: '(11) 95209-5485',
    whatsappStatus: 'confirmado',
    hoursWeekdays: '09:00 às 18:30 (A confirmar)',
    hoursSaturday: '09:00 às 13:30 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-12-sapopemba/01-fachada-principal-unnamed-16.jpg',
    galleryPhotos: [
      {
        id: 'filipe-12-01',
        url: '/assets/stores/filipe-12-sapopemba/01-fachada-principal-unnamed-16.jpg',
        caption: 'Fachada principal — Sapopemba',
      },
      {
        id: 'filipe-12-02',
        url: '/assets/stores/filipe-12-sapopemba/02-fachada-vitrine-noturna-unnamed-25.jpg',
        caption: 'Vitrine externa iluminada — Sapopemba',
      },
      {
        id: 'filipe-12-03',
        url: '/assets/stores/filipe-12-sapopemba/03-interior-atendimento-unnamed-17.jpg',
        caption: 'Área interna de atendimento — Sapopemba',
      },
      {
        id: 'filipe-12-04',
        url: '/assets/stores/filipe-12-sapopemba/04-interior-salao-unnamed-27.jpg',
        caption: 'Salão e balcão — Sapopemba',
      },
    ],
  },
  {
    id: 'filipe-13-vila-industrial',
    unitCode: 'FILIPE-13',
    name: 'Óticas Filipe — Vila Industrial',
    shortName: 'Vila Industrial',
    neighborhood: 'Vila Industrial',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Av. do Oratório, 4739 — Vila Industrial, São Paulo/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Av. do Oratorio 4739 Vila Industrial Sao Paulo SP',
    coordinates: { latitude: -23.6031072, longitude: -46.5290005 },
    phone: '(11) 98946-5440',
    phoneStatus: 'confirmado',
    whatsapp: '5511989465440',
    whatsappDisplay: '(11) 98946-5440',
    whatsappStatus: 'confirmado',
    hoursWeekdays: '09:00 às 18:30 (A confirmar)',
    hoursSaturday: '09:00 às 13:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: true,
    photoUrl: '/assets/stores/filipe-13-vila-industrial/00-fachada-principal.jpg',
    galleryPhotos: [
      {
        id: 'filipe-13-00',
        url: '/assets/stores/filipe-13-vila-industrial/00-fachada-principal.jpg',
        caption: 'Fachada principal — Vila Industrial',
      },
      {
        id: 'filipe-13-03',
        url: '/assets/stores/filipe-13-vila-industrial/03-expositor-armacoes-unnamed-64.jpg',
        caption: 'Expositor de armações — Vila Industrial',
      },
      {
        id: 'filipe-13-04',
        url: '/assets/stores/filipe-13-vila-industrial/04-expositor-solar-unnamed-67.jpg',
        caption: 'Expositor solar — Vila Industrial',
      },
    ],
  },
  {
    id: 'filipe-14-pq-santa-madalena',
    unitCode: 'FILIPE-14',
    name: 'Óticas Filipe — Parque Santa Madalena',
    shortName: 'Parque Santa Madalena',
    neighborhood: 'Parque Santa Madalena',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Av. Manuel Pimentel, 91 — Parque Santa Madalena, São Paulo/SP',
    addressStatus: 'pendente',
    mapsQuery: 'Av. Manuel Pimentel 91 Parque Santa Madalena Sao Paulo SP',
    coordinates: { latitude: -23.611363, longitude: -46.5072443 },
    phone: '(11) 99999-7301',
    phoneStatus: 'confirmado',
    whatsapp: '5511999997301',
    whatsappDisplay: '(11) 99999-7301',
    whatsappStatus: 'confirmado',
    hoursWeekdays: '09:00 às 18:00 (A confirmar)',
    hoursSaturday: '09:00 às 13:00 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: false,
    hasParking: false,
    photoUrl: '/assets/stores/filipe-14-pq-santa-madalena/01-fachada-principal-unnamed-35.jpg',
    galleryPhotos: [
      {
        id: 'filipe-14-01',
        url: '/assets/stores/filipe-14-pq-santa-madalena/01-fachada-principal-unnamed-35.jpg',
        caption: 'Fachada principal — Parque Santa Madalena',
      },
      {
        id: 'filipe-14-02',
        url: '/assets/stores/filipe-14-pq-santa-madalena/02-interior-atendimento-unnamed-37.jpg',
        caption: 'Atendimento interno — Parque Santa Madalena',
      },
      {
        id: 'filipe-14-03',
        url: '/assets/stores/filipe-14-pq-santa-madalena/03-balcao-vitrine-unnamed-38.jpg',
        caption: 'Balcão vitrine — Parque Santa Madalena',
      },
    ],
  },
  {
    id: 'filipe-15-pq-sao-lucas',
    unitCode: 'FILIPE-15',
    name: 'Óticas Filipe — Parque São Lucas',
    shortName: 'Parque São Lucas',
    neighborhood: 'Parque São Lucas',
    city: 'São Paulo',
    state: 'SP',
    addressDisplay: 'Parque São Lucas, São Paulo/SP (Endereço completo em validação cadastral)',
    addressStatus: 'pendente',
    phoneStatus: 'pendente',
    whatsappStatus: 'pendente',
    hoursWeekdays: '09:00 às 18:30 (A confirmar)',
    hoursSaturday: '09:00 às 13:30 (A confirmar)',
    hoursStatus: 'pendente',
    hasLaboratoryOnSite: true,
    hasParking: true,
    photoUrl: '/assets/stores/filipe-15-pq-sao-lucas/01-fachada-entrada-unnamed-29.jpg',
    galleryPhotos: [
      {
        id: 'filipe-15-01',
        url: '/assets/stores/filipe-15-pq-sao-lucas/01-fachada-entrada-unnamed-29.jpg',
        caption: 'Fachada e entrada — Parque São Lucas',
      },
      {
        id: 'filipe-15-02',
        url: '/assets/stores/filipe-15-pq-sao-lucas/02-interior-entrada-unnamed-30.jpg',
        caption: 'Salão interno — Parque São Lucas',
      },
      {
        id: 'filipe-15-04',
        url: '/assets/stores/filipe-15-pq-sao-lucas/04-interior-balcao-unnamed-33.jpg',
        caption: 'Balcão e expositores — Parque São Lucas',
      },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '1. Como funciona a avaliação visual gratuita na Óticas Filipe?',
    answer:
      'Você pode agendar sua avaliação visual 100% gratuita pelo formulário desta página ou diretamente pelo WhatsApp de uma de nossas unidades. Nossa equipe realiza a triagem e orienta você na escolha ideal de lentes e armação.',
  },
  {
    id: 'faq-2',
    question: '2. Quais categorias de óculos encontro nas lojas da Óticas Filipe?',
    answer:
      'Trabalhamos com óculos de grau (acetato, metal e titânio), óculos de sol com proteção UV, modelos Clip-On 2 em 1 (grau e solar na mesma peça), linha infantil leve e resistente, além de acessórios e estojos oficiais.',
  },
  {
    id: 'faq-3',
    question: '3. Quais tipos de lentes vocês oferecem?',
    answer:
      'Montamos lentes monofocais (longe ou perto), multifocais (todas as distâncias), ocupacionais (leitura e computador) e bifocais, com opções de tratamentos como antirreflexo e proteção contra luz azul.',
  },
  {
    id: 'faq-4',
    question: '4. Como escolher a armação mais adequada para o meu rosto?',
    answer:
      'Em todas as nossas 15 unidades você conta com consultoria óptica presencial para testar armações, conferir medidas de aro, ponte e haste e garantir conforto sem pressão.',
  },
  {
    id: 'faq-5',
    question: '5. Vocês possuem laboratório próprio de montagem?',
    answer:
      'Sim. A Óticas Filipe conta com laboratório de montagem próprio, o que garante controle direto de qualidade, precisão na centralização das lentes e garantia de procedência certificada.',
  },
  {
    id: 'faq-6',
    question: '6. Vocês aceitam receitas emitidas por qualquer oftalmologista?',
    answer:
      'Sim! Aceitamos receitas oftalmológicas válidas de qualquer médico ou clínica. Basta trazê-la à unidade escolhida para receber nossa orientação completa.',
  },
  {
    id: 'faq-7',
    question: '7. É possível fazer óculos de sol com grau?',
    answer:
      'Sim. Você pode escolher um modelo da nossa linha solar ou optar pelos modelos Clip-On 2 em 1, que unem lentes de grau e encaixe solar magnético em uma única armação.',
  },
  {
    id: 'faq-8',
    question: '8. As lojas oferecem suporte e ajustes após a compra?',
    answer:
      'Sim. Oferecemos suporte técnico para ajustes de hastes, alinhamento e manutenção básica em qualquer uma das unidades da rede Óticas Filipe.',
  },
];
