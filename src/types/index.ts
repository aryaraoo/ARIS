// ARIS Type Definitions

export type SkillLevel = 'beginner' | 'intermediate' | 'expert';
export type TrainingStatus = 'planned' | 'in-progress' | 'completed';
export type UserRole = 'employee' | 'hr' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  position?: string;
  avatar?: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
  yearsExperience?: number;
  lastAssessed?: string;
  verified: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  verified: boolean;
}

export interface Training {
  id: string;
  title: string;
  provider: string;
  status: TrainingStatus;
  startDate?: string;
  completionDate?: string;
  duration: number; // in hours
  category: string;
  description?: string;
  certificateUrl?: string;
}

export interface Role {
  id: string;
  name: string;
  department: string;
  requiredSkills: RequiredSkill[];
  description?: string;
}

export interface RequiredSkill {
  skillName: string;
  level: SkillLevel;
  priority: 'required' | 'preferred' | 'nice-to-have';
}

export interface SkillGap {
  skillName: string;
  requiredLevel: SkillLevel;
  currentLevel?: SkillLevel;
  gapSeverity: 'critical' | 'moderate' | 'minor';
  recommendation: string;
}

export interface DashboardStats {
  totalEmployees: number;
  totalSkills: number;
  activeCertifications: number;
  completedTraining: number;
  avgSkillsPerEmployee: number;
  topSkillCategories: string[];
}