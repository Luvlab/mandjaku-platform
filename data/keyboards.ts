export interface KeyboardDownload {
  os: string;
  osIcon: string;
  version: string;
  description: string;
  instructions: string[];
  downloadFile: string;
  format: string;
  size: string;
  available: boolean;
  comingSoon?: boolean;
}

export const KEYBOARD_DOWNLOADS: KeyboardDownload[] = [
  {
    os: "Windows",
    osIcon: "🪟",
    version: "Windows 10 / 11",
    description: "Disposition de clavier Mandjaku pour Windows. Créée avec Microsoft Keyboard Layout Creator (MKLC). S'installe comme une langue système.",
    instructions: [
      "Téléchargez le fichier .exe ci-dessous",
      "Exécutez l'installateur en tant qu'administrateur",
      "Allez dans Paramètres → Heure et langue → Langue",
      "Ajoutez 'Mandjaku' comme langue d'entrée",
      "Utilisez Win+Space pour basculer entre les claviers",
    ],
    downloadFile: "/downloads/manjak-keyboard-windows.exe",
    format: "EXE (Installateur)",
    size: "~2 MB",
    available: false,
    comingSoon: true,
  },
  {
    os: "macOS",
    osIcon: "",
    version: "macOS 13+ (Ventura, Sonoma, Sequoia)",
    description: "Disposition de clavier pour macOS créée avec Ukelele. Inclut tous les symboles Mandjaku et les tons.",
    instructions: [
      "Téléchargez le fichier .keylayout",
      "Copiez-le dans ~/Library/Keyboard Layouts/",
      "Ouvrez Préférences Système → Clavier → Sources d'entrée",
      "Cliquez + et cherchez 'Mandjaku'",
      "Activez 'Afficher le menu d'entrée dans la barre de menu'",
    ],
    downloadFile: "/downloads/Mandjaku.keylayout",
    format: "KeyLayout",
    size: "~50 KB",
    available: false,
    comingSoon: true,
  },
  {
    os: "Linux",
    osIcon: "🐧",
    version: "Ubuntu, Debian, Fedora, Arch",
    description: "Fichier XKB pour systèmes Linux. Compatible avec GNOME, KDE et autres environnements de bureau.",
    instructions: [
      "Téléchargez le fichier XKB",
      "Copiez-le dans /usr/share/X11/xkb/symbols/",
      "Éditez /usr/share/X11/xkb/rules/evdev.xml",
      "Ajoutez l'entrée Mandjaku",
      "Redémarrez ou rechargez XKB: setxkbmap -layout mandjaku",
    ],
    downloadFile: "/downloads/mandjaku-xkb.tar.gz",
    format: "XKB (TAR.GZ)",
    size: "~10 KB",
    available: false,
    comingSoon: true,
  },
  {
    os: "Android",
    osIcon: "🤖",
    version: "Android 8.0+",
    description: "Clavier Mandjaku pour Android. Application IME (Input Method Editor) complète avec saisie prédictive.",
    instructions: [
      "Téléchargez le fichier APK",
      "Activez 'Sources inconnues' dans les paramètres",
      "Installez l'APK",
      "Allez dans Paramètres → Gestion générale → Langue et saisie",
      "Activez 'Clavier Mandjaku' comme méthode de saisie",
    ],
    downloadFile: "/downloads/MandjakuKeyboard.apk",
    format: "APK",
    size: "~8 MB",
    available: false,
    comingSoon: true,
  },
  {
    os: "iOS / iPadOS",
    osIcon: "📱",
    version: "iOS 16+",
    description: "Extension de clavier pour iPhone et iPad. Disponible prochainement sur l'App Store.",
    instructions: [
      "Téléchargez depuis l'App Store (bientôt disponible)",
      "Ouvrez l'app et suivez le guide d'installation",
      "Allez dans Réglages → Général → Clavier → Claviers",
      "Ajoutez 'Clavier Mandjaku'",
      "Accordez l'accès complet si demandé",
    ],
    downloadFile: "#",
    format: "App Store",
    size: "~15 MB",
    available: false,
    comingSoon: true,
  },
  {
    os: "HarmonyOS",
    osIcon: "🌸",
    version: "HarmonyOS 3.0+ (Huawei)",
    description: "Clavier Mandjaku pour appareils Huawei sous HarmonyOS. Disponible via AppGallery.",
    instructions: [
      "Ouvrez AppGallery sur votre appareil Huawei",
      "Recherchez 'Clavier Mandjaku'",
      "Installez l'application",
      "Allez dans Paramètres → Système → Langue et saisie",
      "Activez 'Clavier Mandjaku'",
    ],
    downloadFile: "#",
    format: "AppGallery",
    size: "~12 MB",
    available: false,
    comingSoon: true,
  },
  {
    os: "Web (PWA)",
    osIcon: "🌐",
    version: "Tous navigateurs modernes",
    description: "Utilisez le clavier Mandjaku directement dans votre navigateur. Fonctionne hors-ligne après installation.",
    instructions: [
      "Utilisez le clavier virtuel sur cette page",
      "Sur mobile, appuyez sur 'Ajouter à l'écran d'accueil'",
      "Sur desktop, cliquez sur l'icône d'installation dans la barre d'adresse",
      "L'app fonctionne hors-ligne après la première visite",
    ],
    downloadFile: "/learn",
    format: "PWA",
    size: "Inclus dans l'app",
    available: true,
  },
  {
    os: "ChromeOS",
    osIcon: "🔵",
    version: "ChromeOS (Chromebook)",
    description: "Extension Chrome pour Chromebook. Ajoute le clavier Mandjaku au système ChromeOS.",
    instructions: [
      "Ouvrez le Chrome Web Store",
      "Recherchez 'Clavier Mandjaku'",
      "Cliquez sur 'Ajouter à Chrome'",
      "Activez l'extension dans les paramètres de langue",
    ],
    downloadFile: "#",
    format: "Extension Chrome",
    size: "~3 MB",
    available: false,
    comingSoon: true,
  },
];

export const QMK_VIA_INFO = {
  title: "Claviers Mécaniques (QMK/VIA)",
  description: "Pour les amateurs de claviers mécaniques, des fichiers de configuration QMK/VIA sont disponibles pour personnaliser votre clavier Keychron ou tout autre clavier compatible.",
  supportedBoards: ["Keychron K2", "Keychron K3", "Keychron K6", "Keychron K8", "GK61", "GK64", "GMMK Pro"],
  downloadFile: "/downloads/manjak-qmk-config.zip",
  instructions: [
    "Téléchargez le fichier de configuration JSON",
    "Ouvrez VIA (usevia.app) dans votre navigateur",
    "Chargez le fichier de configuration",
    "Flashez votre clavier avec la disposition Mandjaku",
  ],
};

export const VIRTUAL_KEYBOARD_LAYOUT = {
  rows: [
    ["ù", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "ô", "ë"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Ù", "Ô"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ë", "À"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "-"],
  ],
  specialKeys: ["mb", "nd", "ng", "nj", "ch", "dj", "gn", "th"],
};
