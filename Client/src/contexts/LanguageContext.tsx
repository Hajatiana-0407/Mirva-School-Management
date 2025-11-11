import React, { createContext, useContext, useState } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.programs': 'Formations',
    'nav.team': 'Équipe',
    'nav.news': 'Actualités',
    'nav.gallery': 'Galerie',
    'nav.contact': 'Contact',
    'nav.admin': 'Administration',
    
    // Home Page
    'home.hero.title': 'Mirva school',
    'home.hero.subtitle': 'Éclairons ensemble l\'avenir de vos enfants',
    'home.hero.cta': 'Découvrir notre école',
    'home.welcome.title': 'Bienvenue à Mirva school',
    'home.welcome.description': 'Depuis plus de 20 ans, nous formons les leaders de demain dans un environnement bienveillant et stimulant au cœur de Tanjombato.',
    'home.values.title': 'Nos Valeurs',
    'home.values.excellence': 'Excellence Académique',
    'home.values.excellence.desc': 'Un enseignement de qualité adapté aux standards internationaux',
    'home.values.respect': 'Respect et Tolérance',
    'home.values.respect.desc': 'Un environnement inclusif où chaque élève peut s\'épanouir',
    'home.values.innovation': 'Innovation Pédagogique',
    'home.values.innovation.desc': 'Des méthodes d\'enseignement modernes et interactives',
    
    // About Page
    'about.title': 'À propos de notre école',
    'about.history.title': 'Notre Histoire',
    'about.history.content': 'Fondée en 2003, l\'Mirva school s\'est imposée comme un établissement de référence à Madagascar. Notre mission est de former des citoyens responsables, créatifs et ouverts sur le monde.',
    'about.mission.title': 'Notre Mission',
    'about.mission.content': 'Offrir une éducation de qualité qui développe le potentiel de chaque élève, cultive l\'excellence académique et forme des citoyens éthiques et responsables.',
    'about.vision.title': 'Notre Vision',
    'about.vision.content': 'Être l\'école de référence à Madagascar, reconnue pour l\'excellence de son enseignement et l\'épanouissement de ses élèves.',
    
    // Programs Page
    'programs.title': 'Nos Formations',
    'programs.primary.title': 'École Primaire',
    'programs.primary.desc': 'De la maternelle au CM2, nous accompagnons vos enfants dans leurs premiers apprentissages.',
    'programs.middle.title': 'Collège',
    'programs.middle.desc': 'De la 6ème à la 3ème, nous préparons nos élèves au Brevet et à l\'entrée au lycée.',
    'programs.high.title': 'Lycée',
    'programs.high.desc': 'De la 2nde à la Terminale, nous préparons nos élèves au Baccalauréat.',
    'programs.activities.title': 'Activités Parascolaires',
    'programs.activities.sports': 'Sports',
    'programs.activities.arts': 'Arts et Culture',
    'programs.activities.science': 'Clubs Scientifiques',
    'programs.activities.languages': 'Langues Étrangères',
    
    // Team Page
    'team.title': 'Notre Équipe Pédagogique',
    'team.subtitle': 'Des enseignants passionnés et qualifiés',
    
    // News Page
    'news.title': 'Actualités',
    'news.subtitle': 'Suivez la vie de notre école',
    'news.read_more': 'Lire la suite',
    
    // Gallery Page
    'gallery.title': 'Galerie Photos',
    'gallery.subtitle': 'Découvrez la vie de notre école en images',
    
    // Contact Page
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Nous sommes là pour répondre à vos questions',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Adresse email',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer le message',
    'contact.info.title': 'Informations de contact',
    'contact.info.address': 'Adresse',
    'contact.info.phone': 'Téléphone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Horaires d\'ouverture',
    'contact.info.hours.weekdays': 'Lundi - Vendredi : 7h00 - 17h00',
    'contact.info.hours.saturday': 'Samedi : 8h00 - 12h00',
    
    // Admin
    'admin.login.title': 'Connexion Administration',
    'admin.login.username': 'Nom d\'utilisateur',
    'admin.login.password': 'Mot de passe',
    'admin.login.submit': 'Se connecter',
    'admin.dashboard.title': 'Tableau de bord',
    'admin.dashboard.welcome': 'Bienvenue dans l\'espace d\'administration',
    'admin.menu.content': 'Gestion du contenu',
    'admin.menu.news': 'Actualités',
    'admin.menu.team': 'Équipe pédagogique',
    'admin.menu.gallery': 'Galerie',
    'admin.menu.messages': 'Messages de contact',
    'admin.logout': 'Déconnexion',
    
    // Common
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.add': 'Ajouter',
    'common.close': 'Fermer',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.programs': 'Programs',
    'nav.team': 'Team',
    'nav.news': 'News',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.admin': 'Administration',
    
    // Home Page
    'home.hero.title': 'Lumière School of Tanjombato',
    'home.hero.subtitle': 'Illuminating your children\'s future together',
    'home.hero.cta': 'Discover our school',
    'home.welcome.title': 'Welcome to Mirva school',
    'home.welcome.description': 'For over 20 years, we have been training tomorrow\'s leaders in a caring and stimulating environment in the heart of Tanjombato.',
    'home.values.title': 'Our Values',
    'home.values.excellence': 'Academic Excellence',
    'home.values.excellence.desc': 'Quality education adapted to international standards',
    'home.values.respect': 'Respect and Tolerance',
    'home.values.respect.desc': 'An inclusive environment where every student can flourish',
    'home.values.innovation': 'Educational Innovation',
    'home.values.innovation.desc': 'Modern and interactive teaching methods',
    
    // About Page
    'about.title': 'About our school',
    'about.history.title': 'Our History',
    'about.history.content': 'Founded in 2003, Mirva school has established itself as a reference institution in Madagascar. Our mission is to train responsible, creative and globally-minded citizens.',
    'about.mission.title': 'Our Mission',
    'about.mission.content': 'To provide quality education that develops each student\'s potential, cultivates academic excellence and trains ethical and responsible citizens.',
    'about.vision.title': 'Our Vision',
    'about.vision.content': 'To be the reference school in Madagascar, recognized for the excellence of its teaching and the fulfillment of its students.',
    
    // Programs Page
    'programs.title': 'Our Programs',
    'programs.primary.title': 'Primary School',
    'programs.primary.desc': 'From kindergarten to Grade 5, we support your children in their first learning experiences.',
    'programs.middle.title': 'Middle School',
    'programs.middle.desc': 'From Grade 6 to 9, we prepare our students for the certificate and high school entrance.',
    'programs.high.title': 'High School',
    'programs.high.desc': 'From Grade 10 to 12, we prepare our students for the Baccalaureate.',
    'programs.activities.title': 'Extracurricular Activities',
    'programs.activities.sports': 'Sports',
    'programs.activities.arts': 'Arts and Culture',
    'programs.activities.science': 'Science Clubs',
    'programs.activities.languages': 'Foreign Languages',
    
    // Team Page
    'team.title': 'Our Teaching Team',
    'team.subtitle': 'Passionate and qualified teachers',
    
    // News Page
    'news.title': 'News',
    'news.subtitle': 'Follow our school life',
    'news.read_more': 'Read more',
    
    // Gallery Page
    'gallery.title': 'Photo Gallery',
    'gallery.subtitle': 'Discover our school life in pictures',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to answer your questions',
    'contact.form.name': 'Full name',
    'contact.form.email': 'Email address',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send message',
    'contact.info.title': 'Contact information',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Opening hours',
    'contact.info.hours.weekdays': 'Monday - Friday: 7:00 AM - 5:00 PM',
    'contact.info.hours.saturday': 'Saturday: 8:00 AM - 12:00 PM',
    
    // Admin
    'admin.login.title': 'Administration Login',
    'admin.login.username': 'Username',
    'admin.login.password': 'Password',
    'admin.login.submit': 'Login',
    'admin.dashboard.title': 'Dashboard',
    'admin.dashboard.welcome': 'Welcome to the administration area',
    'admin.menu.content': 'Content Management',
    'admin.menu.news': 'News',
    'admin.menu.team': 'Teaching Team',
    'admin.menu.gallery': 'Gallery',
    'admin.menu.messages': 'Contact Messages',
    'admin.logout': 'Logout',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.close': 'Close',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
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