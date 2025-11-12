export interface NewsArticle {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  date: string;
  image: string;
  published: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  positionEn: string;
  bio: string;
  bioEn: string;
  image: string;
  subject?: string;
  subjectEn?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  titleEn: string;
  url: string;
  category: string;
  published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export interface HeroSlide {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  image: string;
  cta: string;
  ctaEn: string;
}

export interface SiteContent {
  schoolName: string;
  schoolNameEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  address: string;
  phone: string;
  email: string;
  foundedYear: number;
}

export const siteContent: SiteContent = {
  schoolName: 'Lycéee mirva de Alarobia Amboniloha',
  schoolNameEn: 'Lumière School of Alarobia Amboniloha',
  tagline: 'Éclairons ensemble l\'avenir de vos enfants',
  taglineEn: 'Illuminating your children\'s future together',
  description: 'Depuis plus de 20 ans, nous formons les leaders de demain dans un environnement bienveillant et stimulant au cœur de Alarobia Amboniloha.',
  descriptionEn: 'For over 20 years, we have been training tomorrow\'s leaders in a caring and stimulating environment in the heart of Alarobia Amboniloha.',
  address: 'Route d\'Andraisoro, Alarobia Amboniloha, 101 Antananarivo, Madagascar',
  phone: '+261 34 12 345 67',
  email: 'contact@ecolelumiere.mg',
  foundedYear: 2003
};

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Lycéee mirva de Alarobia Amboniloha',
    titleEn: 'Lumière School of Alarobia Amboniloha',
    subtitle: 'Éclairons ensemble l\'avenir de vos enfants',
    subtitleEn: 'Illuminating your children\'s future together',
    image: 'https://images.pexels.com/photos/8500644/pexels-photo-8500644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cta: 'Découvrir notre école',
    ctaEn: 'Discover our school'
  },
  {
    id: '2',
    title: 'Excellence Académique',
    titleEn: 'Academic Excellence',
    subtitle: 'Un enseignement de qualité pour tous nos élèves',
    subtitleEn: 'Quality education for all our students',
    image: 'https://images.pexels.com/photos/8500552/pexels-photo-8500552.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cta: 'Nos programmes',
    ctaEn: 'Our programs'
  },
  {
    id: '3',
    title: 'Innovation Pédagogique',
    titleEn: 'Educational Innovation',
    subtitle: 'Des méthodes modernes pour un apprentissage efficace',
    subtitleEn: 'Modern methods for effective learning',
    image: 'https://images.pexels.com/photos/8500663/pexels-photo-8500663.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cta: 'Notre équipe',
    ctaEn: 'Our team'
  }
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Rentrée scolaire 2024-2025',
    titleEn: 'School year 2024-2025 opening',
    content: 'Nous sommes heureux d\'accueillir nos élèves pour cette nouvelle année scolaire. Cette année, nous avons rénové nos laboratoires de sciences et ajouté de nouveaux équipements informatiques. Les inscriptions sont ouvertes pour tous les niveaux, de la maternelle au lycée. Notre équipe pédagogique s\'est enrichie de nouveaux professeurs qualifiés pour offrir un enseignement encore plus personnalisé.',
    contentEn: 'We are pleased to welcome our students for this new school year. This year, we have renovated our science laboratories and added new computer equipment. Registrations are open for all levels, from kindergarten to high school. Our teaching team has been enriched with new qualified teachers to offer even more personalized education.',
    date: '2024-09-01',
    image: 'https://images.pexels.com/photos/8500644/pexels-photo-8500644.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  },
  {
    id: '2',
    title: 'Concours de mathématiques',
    titleEn: 'Mathematics competition',
    content: 'Félicitations à nos élèves qui ont remporté plusieurs prix lors du concours national de mathématiques. Une fierté pour notre établissement ! Nos élèves de terminale ont particulièrement brillé en remportant la première place dans la catégorie lycée. Cette victoire témoigne de la qualité de notre enseignement et de l\'engagement de nos professeurs de mathématiques.',
    contentEn: 'Congratulations to our students who won several prizes in the national mathematics competition. A pride for our school! Our final year students particularly excelled by winning first place in the high school category. This victory testifies to the quality of our teaching and the commitment of our mathematics teachers.',
    date: '2024-10-15',
    image: 'https://images.pexels.com/photos/8500552/pexels-photo-8500552.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  },
  {
    id: '3',
    title: 'Journée portes ouvertes',
    titleEn: 'Open house day',
    content: 'Rejoignez-nous le 15 décembre pour notre journée portes ouvertes. Venez découvrir nos installations et rencontrer notre équipe pédagogique. Au programme : visite guidée des locaux, présentation des programmes scolaires, rencontre avec les enseignants et démonstrations d\'activités parascolaires. Une occasion unique de découvrir l\'environnement d\'apprentissage de vos enfants.',
    contentEn: 'Join us on December 15th for our open house day. Come discover our facilities and meet our teaching team. Program includes: guided tour of the premises, presentation of school programs, meeting with teachers and demonstrations of extracurricular activities. A unique opportunity to discover your children\'s learning environment.',
    date: '2024-11-20',
    image: 'https://images.pexels.com/photos/8500663/pexels-photo-8500663.jpeg?auto=compress&cs=tinysrgb&w=800',
    published: true
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Mme Raharisoa Nadia',
    position: 'Directrice',
    positionEn: 'Principal',
    bio: 'Diplômée en Sciences de l\'Éducation, Mme Raharisoa dirige l\'école depuis 15 ans avec passion et dévouement.',
    bioEn: 'Graduated in Educational Sciences, Mrs. Raharisoa has been leading the school for 15 years with passion and dedication.',
    image: 'https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'M. Rakoto Jean',
    position: 'Professeur de Mathématiques',
    positionEn: 'Mathematics Teacher',
    subject: 'Mathématiques',
    subjectEn: 'Mathematics',
    bio: 'Ingénieur de formation, M. Rakoto enseigne les mathématiques avec une approche pratique et innovante.',
    bioEn: 'Engineer by training, Mr. Rakoto teaches mathematics with a practical and innovative approach.',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Mme Andriamana Sophie',
    position: 'Professeure de Français',
    positionEn: 'French Teacher',
    subject: 'Français',
    subjectEn: 'French',
    bio: 'Licenciée en Lettres Modernes, Mme Andriamana cultive l\'amour de la langue française chez ses élèves.',
    bioEn: 'Graduate in Modern Literature, Mrs. Andriamana cultivates the love of the French language in her students.',
    image: 'https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'M. Razafy Paul',
    position: 'Professeur d\'Anglais',
    positionEn: 'English Teacher',
    subject: 'Anglais',
    subjectEn: 'English',
    bio: 'Diplômé en Langues Étrangères Appliquées, M. Razafy prépare nos élèves aux certifications internationales.',
    bioEn: 'Graduate in Applied Foreign Languages, Mr. Razafy prepares our students for international certifications.',
    image: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Cérémonie de remise des diplômes',
    titleEn: 'Graduation ceremony',
    url: 'https://images.pexels.com/photos/8500645/pexels-photo-8500645.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'événements',
    published: true
  },
  {
    id: '2',
    title: 'Laboratoire de sciences',
    titleEn: 'Science laboratory',
    url: 'https://images.pexels.com/photos/8500551/pexels-photo-8500551.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'installations',
    published: true
  },
  {
    id: '3',
    title: 'Salle de classe moderne',
    titleEn: 'Modern classroom',
    url: 'https://images.pexels.com/photos/8500644/pexels-photo-8500644.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'installations',
    published: true
  },
  {
    id: '4',
    title: 'Festival culturel',
    titleEn: 'Cultural festival',
    url: 'https://images.pexels.com/photos/8500663/pexels-photo-8500663.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'événements',
    published: true
  },
  {
    id: '5',
    title: 'Équipe de basketball',
    titleEn: 'Basketball team',
    url: 'https://images.pexels.com/photos/8500552/pexels-photo-8500552.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'sports',
    published: true
  },
  {
    id: '6',
    title: 'Bibliothèque',
    titleEn: 'Library',
    url: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'installations',
    published: true
  }
];

export const contactMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'Rakoto Marie',
    email: 'marie.rakoto@email.com',
    message: 'Bonjour, je souhaiterais avoir des informations sur les inscriptions pour ma fille qui entre en 6ème.',
    date: '2024-11-15',
    read: false
  },
  {
    id: '2',
    name: 'Andry Michel',
    email: 'michel.andry@email.com',
    message: 'Pouvez-vous me communiquer les tarifs pour le cycle primaire ?',
    date: '2024-11-10',
    read: true
  }
];