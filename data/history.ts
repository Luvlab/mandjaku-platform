export interface HistoryEra {
  id: string;
  period: string;
  title: string;
  content: string[];
  imageAlt?: string;
}

export interface CulturalFact {
  category: string;
  icon: string;
  title: string;
  description: string;
}

export const HISTORY_ERAS: HistoryEra[] = [
  {
    id: "origins",
    period: "Origines anciennes",
    title: "Les Manjak — Peuple de la Sénégambie",
    content: [
      "Les Manjak (ou Mandjaku, Manjaco) sont un peuple d'Afrique de l'Ouest appartenant au groupe linguistique atlantique occidental. Leurs origines remontent aux peuples de la Sénégambie, une région côtière entre les fleuves Sénégal et Gambie.",
      "Peuple autochtone de la côte ouest-africaine, les Manjak ont habité les terres fertiles de la Guinée-Bissau actuelle, du Sénégal et de la Gambie depuis des millénaires. Ils sont profondément liés à la terre, à la mer et aux forêts de mangroves.",
      "Leur nom 'Manjak' viendrait du terme 'Mandjaku', signifiant littéralement 'le peuple des eaux' — une référence à leur proximité historique avec les zones côtières, les estuaires et les rizières inondées.",
    ],
  },
  {
    id: "senegambia",
    period: "Période Sénégambienne (XIIe–XVe s.)",
    title: "Empire et commerce en Sénégambie",
    content: [
      "Durant la période médiévale, les Manjak s'inscrivaient dans les réseaux commerciaux de la Sénégambie. Ils échangeaient du riz, du sel, des tissus et du fer avec les peuples Mandé, Wolof, Diola et Fula.",
      "Les Manjak ont résisté à l'expansion des grands empires sahéliens — Ghana, Mali — grâce à leur position côtière difficile d'accès. Leur organisation en clans décentralisés leur conférait une grande résilience face aux conquêtes.",
      "Les royaumes Beafada et Bijagos voisins entretinrent des relations de commerce et parfois de conflit avec les communautés Manjak, forgeant une identité distincte entre peuple de la côte et peuple de la forêt.",
    ],
  },
  {
    id: "portuguese",
    period: "Contact européen (XVe–XVIIe s.)",
    title: "L'arrivée des Portugais et la traite négrière",
    content: [
      "Les premiers contacts avec les Européens ont lieu au XVe siècle lorsque les explorateurs portugais atteignent la côte de Guinée. Les Portugais établissent des comptoirs commerciaux à Cacheu et Bissau, au cœur du territoire Manjak.",
      "Les Manjak figurent parmi les peuples d'Afrique de l'Ouest victimes de la traite négrière transatlantique. Des milliers de Manjak furent arrachés à leurs terres et déportés vers les Amériques, notamment au Brésil et aux Antilles.",
      "Malgré la violence de la colonisation, les Manjak ont maintenu leur identité culturelle. Certains chefs Manjak négocièrent avec les Portugais pour limiter les razzias, d'autres organisèrent une résistance armée. La langue Mandjaku survécut intacte.",
    ],
  },
  {
    id: "colonial",
    period: "Colonisation (XIXe–XXe s.)",
    title: "Résistance et colonisation portugaise",
    content: [
      "Sous la colonisation portugaise de Guinée-Bissau (alors Guinée portugaise), les Manjak résistèrent à l'imposition fiscale et au travail forcé. Plusieurs soulèvements eurent lieu entre 1880 et 1920 dans les régions de Cacheu et Oio.",
      "La colonisation imposa une administration centralisée qui bouleversa les structures sociales traditionnelles. Les chefs de clan Manjak furent soit cooptés comme intermédiaires (régulos), soit persécutés. L'Église catholique établit des missions, apportant une éducation en portugais.",
      "Paradoxalement, l'alphabétisation en portugais permit à une génération de Manjak d'accéder à la littérature mondiale et de défendre leurs droits. Des Manjak participèrent activement au mouvement d'indépendance conduit par Amilcar Cabral (PAIGC).",
    ],
  },
  {
    id: "independence",
    period: "Indépendance (1974–présent)",
    title: "Indépendance et renaissance culturelle",
    content: [
      "La Guinée-Bissau obtient son indépendance du Portugal le 24 septembre 1974, après une guerre de libération de onze ans. Les Manjak, présents sur tout le territoire, participèrent à cette lutte pour la dignité et l'autodétermination.",
      "Depuis l'indépendance, les communautés Manjak ont travaillé à la revitalisation de leur langue et culture. Des linguistes, en collaboration avec les anciens, ont commencé à normaliser l'alphabet Mandjaku — travail qui continue aujourd'hui.",
      "La diaspora Manjak en Europe (Portugal, France, Suède, Espagne) joue un rôle crucial dans cette renaissance : organisation de festivals culturels, transmission de la langue aux enfants nés à l'étranger, et financement de projets éducatifs en Guinée-Bissau et au Sénégal.",
      "Aujourd'hui, les anciens Manjak développent un alphabet propre à leur langue — symboles uniques qui capturent les sons et l'âme d'une langue atlantique vieille de millénaires. Ce projet est le prolongement digital de ce travail essentiel.",
    ],
  },
];

export const CULTURAL_FACTS: CulturalFact[] = [
  {
    category: "Musique",
    icon: "🥁",
    title: "Tambours, Balafons & Kora",
    description: "La musique Manjak est au cœur de toute cérémonie. Les tambours parlent — chaque rythme transmet un message. Le balafon (xylophone à lames) et la kora (harpe-luth à 21 cordes) accompagnent les danses rituelles et les célébrations.",
  },
  {
    category: "Religion",
    icon: "🌿",
    title: "Animisme & Spiritualité",
    description: "La religion traditionnelle Manjak est animiste : les esprits des ancêtres (bëpëk) guident les vivants. Des cérémonies et des sacrifices permettent de communiquer avec ces esprits. Une partie de la population a adopté l'islam ou le christianisme.",
  },
  {
    category: "Rites de passage",
    icon: "🔥",
    title: "Initiation des jeunes",
    description: "Les rites de passage marquent la transition vers l'âge adulte. Pour les garçons, le fanado (initiation) est une période de retraite en forêt où ils apprennent leurs responsabilités sociales. Pour les filles, des cérémonies célèbrent la fertilité et la sagesse féminine.",
  },
  {
    category: "Artisanat",
    icon: "🧵",
    title: "Textiles & Vannerie",
    description: "Les Manjak sont réputés pour leurs textiles aux motifs géométriques colorés, leur vannerie fine et leur poterie. Ces arts transmettent des codes symboliques liés aux clans, aux statuts sociaux et aux saisons agricoles.",
  },
  {
    category: "Agriculture",
    icon: "🌾",
    title: "Riziculture & Pêche",
    description: "Agriculteurs et pêcheurs par excellence, les Manjak ont développé des systèmes de riziculture en terrasses et de pêche estuarienne d'une grande sophistication. La culture du riz est intimement liée à leur identité et leurs rituels.",
  },
  {
    category: "Littérature orale",
    icon: "📖",
    title: "Contes, Légendes & Proverbes",
    description: "La mémoire Manjak est orale. Les griots et conteurs transmettent l'histoire, la philosophie et les valeurs du peuple à travers des récits élaborés, des proverbes imagés et des épopées chantées qui peuvent durer plusieurs nuits.",
  },
  {
    category: "Structure sociale",
    icon: "🏘️",
    title: "Clans & Lignages",
    description: "La société Manjak est organisée en clans (badjak) et en lignages matrilinéaires. Chaque clan a son propre chef, son totem animal et ses tabous alimentaires. Les alliances matrimoniales entre clans garantissent la paix et la cohésion sociale.",
  },
  {
    category: "Diaspora",
    icon: "🌍",
    title: "Manjak en Europe & dans le monde",
    description: "Une importante diaspora Manjak vit en Europe — Portugal, France, Suède, Espagne, Italie. Ces communautés maintiennent vivante la culture Manjak à l'étranger : tontines, associations culturelles, envois de fonds et connexion avec la terre d'origine.",
  },
];

export const GEOGRAPHY = {
  primaryRegions: [
    { country: "Guinée-Bissau", regions: ["Cacheu", "Oio", "Biombo"], population: "~200,000" },
    { country: "Sénégal", regions: ["Casamance", "Dakar (diaspora)"], population: "~80,000" },
    { country: "Gambie", regions: ["Banjul", "Serekunda"], population: "~20,000" },
  ],
  diaspora: [
    { country: "Portugal", city: "Lisbonne", notes: "Plus grande diaspora européenne" },
    { country: "France", city: "Paris, Marseille", notes: "Communauté active" },
    { country: "Suède", city: "Stockholm, Saltsjö-Boo", notes: "Projet Clavier Manjaques" },
    { country: "Espagne", city: "Madrid, Barcelone", notes: "Communauté en croissance" },
    { country: "Italie", city: "Rome, Milan", notes: "Présence significative" },
  ],
};
