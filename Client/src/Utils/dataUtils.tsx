import { MenuItemType } from "./Types";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  School,
  GraduationCap,
  BookOpen,
  Calendar,
  UserCog,
  FileText,
  MessageSquare,
  CreditCard,
  Settings,
  Backpack,
  UserPlus,
  Notebook,
  BookOpenText,
  NotebookPen,
  UserRound,
  Computer,
  Home,
} from 'lucide-react';

// Liste des menus avec couleurs personnalisées
export const menuItems: (MenuItemType & { color?: string; childColor?: string })[] = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    icon: LayoutDashboard,
    path: '/back-office/dashboard',
    color: 'text-primary-600'
  },
  {
    id: 'registration',
    label: 'Inscriptions',
    icon: UserPlus,
    path: '/back-office/registration',
    color: 'text-green-600'
  },
  {
    id: 'students',
    label: 'Élèves',
    icon: Users,
    path: '/back-office/students',
    color: 'text-purple-600'
  },
  {
    id: 'schedule',
    label: 'Emploi du temps',
    icon: Calendar,
    path: '/back-office/schedule',
    color: 'text-orange-600'
  },
  {
    id: 'attendance',
    label: 'Présences',
    icon: UserCog,
    path: '/back-office/attendance',
    color: 'text-red-600'
  },
  {
    id: 'exams',
    label: 'Examens et Notes',
    icon: FileText,
    path: '/back-office/exams',
    color: 'text-pink-600'
  },
  {
    id: 'course',
    label: 'Leçons et exercices',
    icon: Notebook,
    color: 'text-indigo-600',
    childColor: 'text-indigo-500',
    children: [
      {
        id: 'lessons',
        label: 'Leçons',
        icon: BookOpenText,
        path: '/back-office/lessons',
        color: 'text-indigo-500'
      },
      {
        id: 'exercices',
        label: 'Exercices',
        icon: NotebookPen,
        path: '/back-office/exercices',
        color: 'text-indigo-400'
      },
    ],
  },
  {
    id: 'management',
    label: 'Administration',
    icon: UserCheck,
    color: 'text-teal-600',
    childColor: 'text-teal-500',
    children: [
      {
        id: 'employees',
        label: 'Employés',
        icon: UserRound,
        path: '/back-office/employees',
        color: 'text-teal-500'
      },
      {
        id: 'teachers',
        label: 'Enseignants',
        icon: UserCheck,
        path: '/back-office/teachers',
        color: 'text-teal-600'
      },
      {
        id: 'parents',
        label: 'Parents',
        icon: Users,
        path: '/back-office/parents',
        color: 'text-teal-400'
      },
      {
        id: 'payments',
        label: 'Paiements',
        icon: CreditCard,
        path: '/back-office/payments',
        color: 'text-teal-500'
      },
      {
        id: 'messages',
        label: 'Messagerie',
        icon: MessageSquare,
        path: '/back-office/messages',
        color: 'text-teal-400'
      },
    ],
  },
  {
    id: 'settingsSection',
    label: 'Configuration',
    icon: Settings,
    color: 'text-gray-600',
    childColor: 'text-gray-500',
    children: [
      {
        id: 'school-year',
        label: 'Année scolaire',
        icon: Backpack,
        path: '/back-office/school-year',
        color: 'text-gray-500'
      },
      {
        id: 'levels',
        label: 'Niveaux',
        icon: GraduationCap,
        path: '/back-office/levels?o=list-level',
        color: 'text-gray-600'
      },
      {
        id: 'classes',
        label: 'Classes',
        icon: School,
        path: '/back-office/classes',
        color: 'text-gray-500'
      },
      {
        id: 'subjects',
        label: 'Matières',
        icon: BookOpen,
        path: '/back-office/subjects',
        color: 'text-gray-400'
      },
      {
        id: 'settings',
        label: 'Paramètres',
        icon: Settings,
        path: '/back-office/settings',
        color: 'text-gray-600'
      },
    ],
  },
  {
    id: 'website-settings',
    label: 'Paramètres du site',
    icon: Computer,
    color: 'text-cyan-600',
    childColor: 'text-cyan-500',
    children: [
      {
        id: 'homepage-settings',
        label: "Page d'accueil",
        icon: Home,
        path: '/back-office/homepage-settings',
        color: 'text-cyan-500'
      },
    ],
  },
];