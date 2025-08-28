// Mock data for development - will be replaced with real API calls
import { User, Skill, Certification, Training, Role, SkillGap, DashboardStats } from '@/types';

export const currentUser: User = {
  id: '1',
  name: 'Priya Sharma',
  email: 'priya.sharma@company.com',
  role: 'employee',
  department: 'Engineering',
  position: 'Senior Software Engineer',
  avatar: '/placeholder.svg',
  createdAt: '2023-01-15T00:00:00Z'
};

export const userSkills: Skill[] = [
  {
    id: '1',
    name: 'React',
    category: 'Frontend',
    level: 'expert',
    yearsExperience: 4,
    lastAssessed: '2024-11-01',
    verified: true
  },
  {
    id: '2',
    name: 'TypeScript',
    category: 'Programming Languages',
    level: 'expert',
    yearsExperience: 3,
    lastAssessed: '2024-10-15',
    verified: true
  },
  {
    id: '3',
    name: 'Python',
    category: 'Backend',
    level: 'intermediate',
    yearsExperience: 2,
    lastAssessed: '2024-09-20',
    verified: false
  },
  {
    id: '4',
    name: 'AWS',
    category: 'Cloud',
    level: 'beginner',
    yearsExperience: 1,
    lastAssessed: '2024-11-10',
    verified: false
  },
  {
    id: '5',
    name: 'Node.js',
    category: 'Backend',
    level: 'intermediate',
    yearsExperience: 2,
    lastAssessed: '2024-10-01',
    verified: true
  },
  {
    id: '6',
    name: 'Docker',
    category: 'DevOps',
    level: 'beginner',
    yearsExperience: 1,
    lastAssessed: '2024-08-15',
    verified: false
  },
  {
    id: '7',
    name: 'MongoDB',
    category: 'Database',
    level: 'intermediate',
    yearsExperience: 2,
    lastAssessed: '2024-09-01',
    verified: true
  },
  {
    id: '8',
    name: 'GraphQL',
    category: 'API',
    level: 'beginner',
    yearsExperience: 1,
    lastAssessed: '2024-08-20',
    verified: false
  }
];

export const userCertifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services',
    issueDate: '2024-03-15',
    expiryDate: '2027-03-15',
    credentialId: 'AWS-DVA-12345',
    url: 'https://aws.amazon.com/verification',
    verified: true
  },
  {
    id: '2',
    name: 'React Developer Certification',
    issuer: 'Meta',
    issueDate: '2023-11-20',
    expiryDate: '2025-11-20',
    credentialId: 'META-REACT-67890',
    url: 'https://developers.facebook.com/certification',
    verified: true
  },
  {
    id: '3',
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    issueDate: '2023-06-10',
    credentialId: 'PSM-I-54321',
    url: 'https://scrum.org/certificates',
    verified: true
  },
  {
    id: '4',
    name: 'MongoDB Developer Certification',
    issuer: 'MongoDB Inc.',
    issueDate: '2024-01-12',
    expiryDate: '2026-01-12',
    credentialId: 'MONGO-DEV-98765',
    url: 'https://university.mongodb.com/certification',
    verified: true
  }
];

export const userTraining: Training[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    provider: 'Frontend Masters',
    status: 'in-progress',
    startDate: '2024-11-01',
    duration: 16,
    category: 'Frontend',
    description: 'Deep dive into advanced React patterns including render props, compound components, and custom hooks.'
  },
  {
    id: '2',
    title: 'AWS Solutions Architect Professional',
    provider: 'A Cloud Guru',
    status: 'planned',
    startDate: '2025-01-10',
    duration: 40,
    category: 'Cloud',
    description: 'Comprehensive course for AWS Solutions Architect Professional certification.'
  },
  {
    id: '3',
    title: 'Docker Fundamentals',
    provider: 'Docker Inc.',
    status: 'completed',
    startDate: '2024-08-01',
    completionDate: '2024-08-15',
    duration: 12,
    category: 'DevOps',
    description: 'Learn containerization basics with Docker.',
    certificateUrl: '/certificates/docker-fundamentals.pdf'
  },
  {
    id: '4',
    title: 'GraphQL Complete Guide',
    provider: 'Udemy',
    status: 'completed',
    startDate: '2024-07-15',
    completionDate: '2024-08-10',
    duration: 20,
    category: 'API',
    description: 'Master GraphQL from basics to advanced concepts.',
    certificateUrl: '/certificates/graphql-complete.pdf'
  },
  {
    id: '5',
    title: 'Machine Learning Fundamentals',
    provider: 'Coursera',
    status: 'planned',
    startDate: '2025-02-01',
    duration: 32,
    category: 'Data Science',
    description: 'Introduction to machine learning concepts and practical applications.'
  }
];

export const skillGaps: SkillGap[] = [
  {
    skillName: 'Kubernetes',
    requiredLevel: 'intermediate',
    gapSeverity: 'critical',
    recommendation: 'Complete Kubernetes Administrator certification course'
  },
  {
    skillName: 'GraphQL',
    requiredLevel: 'intermediate',
    currentLevel: 'beginner',
    gapSeverity: 'moderate',
    recommendation: 'Practice with Apollo Client and build sample projects'
  },
  {
    skillName: 'Terraform',
    requiredLevel: 'beginner',
    gapSeverity: 'minor',
    recommendation: 'Complete Infrastructure as Code fundamentals course'
  },
  {
    skillName: 'Machine Learning',
    requiredLevel: 'intermediate',
    gapSeverity: 'critical',
    recommendation: 'Enroll in ML fundamentals course and complete practical projects'
  },
  {
    skillName: 'Microservices Architecture',
    requiredLevel: 'intermediate',
    currentLevel: 'beginner',
    gapSeverity: 'moderate',
    recommendation: 'Study microservices patterns and implement sample architecture'
  }
];

export const dashboardStats: DashboardStats = {
  totalEmployees: 156,
  totalSkills: 324,
  activeCertifications: 89,
  completedTraining: 234,
  avgSkillsPerEmployee: 8.3,
  topSkillCategories: ['Frontend', 'Backend', 'Cloud', 'DevOps', 'Data Science']
};

// Indian team members data
export const teamMembers: User[] = [
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    avatar: '/placeholder.svg',
    createdAt: '2022-08-12T00:00:00Z'
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'DevOps Engineer',
    avatar: '/placeholder.svg',
    createdAt: '2023-03-22T00:00:00Z'
  },
  {
    id: '4',
    name: 'Anita Singh',
    email: 'anita.singh@company.com',
    role: 'manager',
    department: 'Engineering',
    position: 'Engineering Manager',
    avatar: '/placeholder.svg',
    createdAt: '2021-11-05T00:00:00Z'
  },
  {
    id: '5',
    name: 'Vivek Gupta',
    email: 'vivek.gupta@company.com',
    role: 'employee',
    department: 'Product',
    position: 'Product Manager',
    avatar: '/placeholder.svg',
    createdAt: '2022-06-15T00:00:00Z'
  },
  {
    id: '6',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@company.com',
    role: 'employee',
    department: 'Design',
    position: 'UX Designer',
    avatar: '/placeholder.svg',
    createdAt: '2023-01-10T00:00:00Z'
  },
  {
    id: '7',
    name: 'Arjun Patel',
    email: 'arjun.patel@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Full Stack Developer',
    avatar: '/placeholder.svg',
    createdAt: '2023-07-18T00:00:00Z'
  },
  {
    id: '8',
    name: 'Kavya Nair',
    email: 'kavya.nair@company.com',
    role: 'employee',
    department: 'Data Science',
    position: 'Data Scientist',
    avatar: '/placeholder.svg',
    createdAt: '2022-12-03T00:00:00Z'
  },
  {
    id: '9',
    name: 'Rohit Mehta',
    email: 'rohit.mehta@company.com',
    role: 'employee',
    department: 'Security',
    position: 'Security Engineer',
    avatar: '/placeholder.svg',
    createdAt: '2023-04-25T00:00:00Z'
  }
];

export const allSkills: Skill[] = [
  // Frontend
  { id: 'skill-1', name: 'React', category: 'Frontend', level: 'expert', verified: true },
  { id: 'skill-2', name: 'Vue.js', category: 'Frontend', level: 'intermediate', verified: true },
  { id: 'skill-3', name: 'Angular', category: 'Frontend', level: 'beginner', verified: false },
  { id: 'skill-4', name: 'HTML/CSS', category: 'Frontend', level: 'expert', verified: true },
  { id: 'skill-5', name: 'Tailwind CSS', category: 'Frontend', level: 'intermediate', verified: true },
  { id: 'skill-6', name: 'Next.js', category: 'Frontend', level: 'intermediate', verified: true },
  
  // Backend
  { id: 'skill-7', name: 'Node.js', category: 'Backend', level: 'intermediate', verified: true },
  { id: 'skill-8', name: 'Python', category: 'Backend', level: 'expert', verified: true },
  { id: 'skill-9', name: 'Java', category: 'Backend', level: 'intermediate', verified: false },
  { id: 'skill-10', name: 'C#', category: 'Backend', level: 'beginner', verified: false },
  { id: 'skill-11', name: 'Express.js', category: 'Backend', level: 'intermediate', verified: true },
  { id: 'skill-12', name: 'Django', category: 'Backend', level: 'intermediate', verified: true },
  
  // Cloud
  { id: 'skill-13', name: 'AWS', category: 'Cloud', level: 'intermediate', verified: true },
  { id: 'skill-14', name: 'Azure', category: 'Cloud', level: 'beginner', verified: false },
  { id: 'skill-15', name: 'Google Cloud', category: 'Cloud', level: 'beginner', verified: false },
  { id: 'skill-16', name: 'Serverless', category: 'Cloud', level: 'intermediate', verified: true },
  
  // DevOps
  { id: 'skill-17', name: 'Docker', category: 'DevOps', level: 'intermediate', verified: true },
  { id: 'skill-18', name: 'Kubernetes', category: 'DevOps', level: 'beginner', verified: false },
  { id: 'skill-19', name: 'CI/CD', category: 'DevOps', level: 'intermediate', verified: true },
  { id: 'skill-20', name: 'Terraform', category: 'DevOps', level: 'beginner', verified: false },
  
  // Databases
  { id: 'skill-21', name: 'PostgreSQL', category: 'Database', level: 'intermediate', verified: true },
  { id: 'skill-22', name: 'MongoDB', category: 'Database', level: 'intermediate', verified: true },
  { id: 'skill-23', name: 'Redis', category: 'Database', level: 'beginner', verified: false },
  { id: 'skill-24', name: 'MySQL', category: 'Database', level: 'intermediate', verified: true },
  
  // Data Science
  { id: 'skill-25', name: 'Machine Learning', category: 'Data Science', level: 'beginner', verified: false },
  { id: 'skill-26', name: 'Data Analysis', category: 'Data Science', level: 'intermediate', verified: true },
  { id: 'skill-27', name: 'TensorFlow', category: 'Data Science', level: 'beginner', verified: false },
  { id: 'skill-28', name: 'Pandas', category: 'Data Science', level: 'intermediate', verified: true },
  
  // Security
  { id: 'skill-29', name: 'Cybersecurity', category: 'Security', level: 'intermediate', verified: true },
  { id: 'skill-30', name: 'Penetration Testing', category: 'Security', level: 'beginner', verified: false },
  { id: 'skill-31', name: 'Security Auditing', category: 'Security', level: 'intermediate', verified: true },
  
  // Mobile
  { id: 'skill-32', name: 'React Native', category: 'Mobile', level: 'intermediate', verified: true },
  { id: 'skill-33', name: 'Flutter', category: 'Mobile', level: 'beginner', verified: false },
  { id: 'skill-34', name: 'Swift', category: 'Mobile', level: 'beginner', verified: false },
];

export const roles: Role[] = [
  {
    id: 'role-1',
    name: 'Senior Software Engineer',
    department: 'Engineering',
    description: 'Lead development of complex software systems and mentor junior developers',
    requiredSkills: [
      { skillName: 'React', level: 'expert', priority: 'required' },
      { skillName: 'TypeScript', level: 'expert', priority: 'required' },
      { skillName: 'Node.js', level: 'intermediate', priority: 'required' },
      { skillName: 'AWS', level: 'intermediate', priority: 'preferred' },
      { skillName: 'Docker', level: 'intermediate', priority: 'preferred' }
    ]
  },
  {
    id: 'role-2',
    name: 'DevOps Engineer',
    department: 'Engineering',
    description: 'Manage infrastructure and deployment pipelines',
    requiredSkills: [
      { skillName: 'Docker', level: 'expert', priority: 'required' },
      { skillName: 'Kubernetes', level: 'expert', priority: 'required' },
      { skillName: 'AWS', level: 'expert', priority: 'required' },
      { skillName: 'Terraform', level: 'intermediate', priority: 'required' },
      { skillName: 'CI/CD', level: 'expert', priority: 'required' }
    ]
  },
  {
    id: 'role-3',
    name: 'Data Scientist',
    department: 'Data Science',
    description: 'Analyze data and build machine learning models',
    requiredSkills: [
      { skillName: 'Python', level: 'expert', priority: 'required' },
      { skillName: 'Machine Learning', level: 'expert', priority: 'required' },
      { skillName: 'Data Analysis', level: 'expert', priority: 'required' },
      { skillName: 'TensorFlow', level: 'intermediate', priority: 'preferred' },
      { skillName: 'Pandas', level: 'expert', priority: 'required' }
    ]
  }
];
