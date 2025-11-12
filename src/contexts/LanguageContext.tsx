import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'tr' | 'en' | 'de' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    about: 'Hakkımda',
    skills: 'Yetenekler',
    projects: 'Projeler',
    contact: 'İletişim',
    greeting: 'Merhaba, ben',
    title: 'Bilgisayar Mühendisliği Öğrencisi',
    viewProjects: 'Projelerimi Görüntüle',
    getInTouch: 'İletişime Geç',
    education: 'Eğitim',
    university: 'Altınbaş Üniversitesi',
    major: 'Bilgisayar Mühendisliği',
    year: '2. Sınıf',
    location: 'Konum',
    istanbul: 'İstanbul, Türkiye',
    status: 'Durum',
    student: 'Öğrenci',
    openToOpportunities: 'Yeni fırsatlara açık',
    aboutDescription: 'Bilgisayar Mühendisliği öğrencisi olarak, yazılım geliştirme, veri analizi ve makine öğrenmesi alanlarında kendimi geliştiriyorum. Modern teknolojileri öğrenmeye ve yeni projeler geliştirmeye tutkuyla devam ediyorum. Agile ve Scrum metodolojileri ile proje yönetimi konularında deneyim sahibiyim.',
    mySkills: 'Yeteneklerim',
    programmingLanguages: 'Programlama Dilleri',
    dataAnalysis: 'Veri & Analiz',
    toolsTech: 'Araçlar & Teknolojiler',
    methodologies: 'Metodolojiler',
    myProjects: 'Projelerim',
    comingSoon: 'Projeler Yakında Eklenecek',
    comingSoonDesc: 'Üzerinde çalıştığım projeler yakın zamanda burada yer alacak. Sık sık ziyaret ederek yeni projelerimi takip edebilirsiniz.',
    contactMe: 'Benimle İletişime Geçin',
    contactDesc: 'Projeler, iş birlikleri veya sorularınız için benimle iletişime geçebilirsiniz.',
    email: 'E-posta',
    emailDesc: 'İletişim bilgileri için bana ulaşın',
    aiAssistant: 'AI Asistan',
    aiGreeting: 'Merhaba! Size nasıl yardımcı olabilirim?',
    typeMessage: 'Mesajınızı yazın...',
    error: 'Hata',
    errorMessage: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
  },
  en: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    greeting: 'Hello, I am',
    title: 'Computer Engineering Student',
    viewProjects: 'View My Projects',
    getInTouch: 'Get In Touch',
    education: 'Education',
    university: 'Altınbaş University',
    major: 'Computer Engineering',
    year: '2nd Year',
    location: 'Location',
    istanbul: 'Istanbul, Turkey',
    status: 'Status',
    student: 'Student',
    openToOpportunities: 'Open to opportunities',
    aboutDescription: 'As a Computer Engineering student, I am developing myself in software development, data analysis and machine learning. I am passionately continuing to learn modern technologies and develop new projects. I have experience in project management with Agile and Scrum methodologies.',
    mySkills: 'My Skills',
    programmingLanguages: 'Programming Languages',
    dataAnalysis: 'Data & Analysis',
    toolsTech: 'Tools & Technologies',
    methodologies: 'Methodologies',
    myProjects: 'My Projects',
    comingSoon: 'Projects Coming Soon',
    comingSoonDesc: 'The projects I am working on will be featured here soon. You can visit frequently to follow my new projects.',
    contactMe: 'Contact Me',
    contactDesc: 'You can contact me for projects, collaborations or questions.',
    email: 'Email',
    emailDesc: 'Contact me for contact information',
    aiAssistant: 'AI Assistant',
    aiGreeting: 'Hello! How can I help you?',
    typeMessage: 'Type your message...',
    error: 'Error',
    errorMessage: 'Message could not be sent. Please try again.',
  },
  // NOTE: for KISS we copy English strings for additional languages as a starting point.
  de: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    greeting: 'Hello, I am',
    title: 'Computer Engineering Student',
    viewProjects: 'View My Projects',
    getInTouch: 'Get In Touch',
    education: 'Education',
    university: 'Altınbaş University',
    major: 'Computer Engineering',
    year: '2nd Year',
    location: 'Location',
    istanbul: 'Istanbul, Turkey',
    status: 'Status',
    student: 'Student',
    openToOpportunities: 'Open to opportunities',
    aboutDescription: 'As a Computer Engineering student, I am developing myself in software development, data analysis and machine learning.',
    mySkills: 'My Skills',
    programmingLanguages: 'Programming Languages',
    dataAnalysis: 'Data & Analysis',
    toolsTech: 'Tools & Technologies',
    methodologies: 'Methodologies',
    myProjects: 'My Projects',
    comingSoon: 'Projects Coming Soon',
    comingSoonDesc: 'The projects I am working on will be featured here soon.',
    contactMe: 'Contact Me',
    contactDesc: 'You can contact me for projects, collaborations or questions.',
    email: 'Email',
    emailDesc: 'Contact me for contact information',
    aiAssistant: 'AI Assistant',
    aiGreeting: 'Hello! How can I help you?',
    typeMessage: 'Type your message...',
    error: 'Error',
    errorMessage: 'Message could not be sent. Please try again.',
  },
  es: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    greeting: 'Hello, I am',
    title: 'Computer Engineering Student',
    viewProjects: 'View My Projects',
    getInTouch: 'Get In Touch',
    education: 'Education',
    university: 'Altınbaş University',
    major: 'Computer Engineering',
    year: '2nd Year',
    location: 'Location',
    istanbul: 'Istanbul, Turkey',
    status: 'Status',
    student: 'Student',
    openToOpportunities: 'Open to opportunities',
    aboutDescription: 'As a Computer Engineering student, I am developing myself in software development, data analysis and machine learning.',
    mySkills: 'My Skills',
    programmingLanguages: 'Programming Languages',
    dataAnalysis: 'Data & Analysis',
    toolsTech: 'Tools & Technologies',
    methodologies: 'Methodologies',
    myProjects: 'My Projects',
    comingSoon: 'Projects Coming Soon',
    comingSoonDesc: 'The projects I am working on will be featured here soon.',
    contactMe: 'Contact Me',
    contactDesc: 'You can contact me for projects, collaborations or questions.',
    email: 'Email',
    emailDesc: 'Contact me for contact information',
    aiAssistant: 'AI Assistant',
    aiGreeting: 'Hello! How can I help you?',
    typeMessage: 'Type your message...',
    error: 'Error',
    errorMessage: 'Message could not be sent. Please try again.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('tr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.tr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
