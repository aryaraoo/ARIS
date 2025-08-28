import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Skill, Certification, Training, SkillGap } from '@/types';
import { 
  currentUser as mockUser, 
  userSkills as mockSkills, 
  userCertifications as mockCertifications,
  userTraining as mockTraining,
  skillGaps as mockSkillGaps
} from '@/lib/data';

interface AppContextType {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  
  // Skills state
  skills: Skill[];
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  
  // Certifications state
  certifications: Certification[];
  addCertification: (certification: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, updates: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  
  // Training state
  training: Training[];
  addTraining: (training: Omit<Training, 'id'>) => void;
  updateTraining: (id: string, updates: Partial<Training>) => void;
  deleteTraining: (id: string) => void;
  
  // Skill gaps
  skillGaps: SkillGap[];
  refreshSkillGaps: () => void;
  
  // Loading states
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [training, setTraining] = useState<Training[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('aris-auth');
    const savedUser = localStorage.getItem('aris-user');
    
    if (savedAuth === 'true') {
      try {
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } else {
          setUser(mockUser);
        }
        setIsAuthenticated(true);
        setSkills(mockSkills);
        setCertifications(mockCertifications);
        setTraining(mockTraining);
        setSkillGaps(mockSkillGaps);
      } catch (error) {
        console.error('Error loading saved auth:', error);
        localStorage.removeItem('aris-auth');
        localStorage.removeItem('aris-user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Predefined users for authentication
    const validUsers = [
      { email: "admin@company.com", password: "admin123" },
      { email: "hr@company.com", password: "hr123" },
      { email: "manager@company.com", password: "manager123" },
      { email: "priya.sharma@company.com", password: "priya123" },
      { email: "rajesh.kumar@company.com", password: "rajesh123" },
      { email: "anita.singh@company.com", password: "anita123" },
      { email: "vivek.gupta@company.com", password: "vivek123" },
      { email: "sneha.reddy@company.com", password: "sneha123" }
    ];
    
    const validUser = validUsers.find(user => user.email === email && user.password === password);
    
    if (!validUser) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }
    
    // Create user object based on email
    const userProfile: User = {
      ...mockUser,
      email: email,
      name: email.includes('priya') ? 'Priya Sharma' :
            email.includes('rajesh') ? 'Rajesh Kumar' :
            email.includes('anita') ? 'Anita Singh' :
            email.includes('vivek') ? 'Vivek Gupta' :
            email.includes('sneha') ? 'Sneha Reddy' :
            email.includes('admin') ? 'Admin User' :
            email.includes('hr') ? 'HR Manager' :
            email.includes('manager') ? 'Team Manager' : 'User'
    };
    
    setUser(userProfile);
    setIsAuthenticated(true);
    setSkills(mockSkills);
    setCertifications(mockCertifications);
    setTraining(mockTraining);
    setSkillGaps(mockSkillGaps);
    
    localStorage.setItem('aris-auth', 'true');
    localStorage.setItem('aris-user', JSON.stringify(userProfile));
    setIsLoading(false);
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      setIsLoading(false);
      throw new Error('All fields are required');
    }
    
    if (password.length < 6) {
      setIsLoading(false);
      throw new Error('Password must be at least 6 characters long');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      throw new Error('Please enter a valid email address');
    }
    
    // Check if user already exists (in a real app, this would be done on the server)
    const existingUsers = [
      "admin@company.com", "hr@company.com", "manager@company.com",
      "priya.sharma@company.com", "rajesh.kumar@company.com", 
      "anita.singh@company.com", "vivek.gupta@company.com", "sneha.reddy@company.com"
    ];
    
    if (existingUsers.includes(email)) {
      setIsLoading(false);
      throw new Error('An account with this email already exists');
    }
    
    // Create new user (in a real app, this would create the user on the server)
    const newUser: User = {
      id: Date.now().toString(),
      name: `${firstName} ${lastName}`,
      email: email,
      role: 'employee',
      department: 'General',
      position: 'Employee',
      createdAt: new Date().toISOString()
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    setSkills([]);
    setCertifications([]);
    setTraining([]);
    setSkillGaps([]);
    
    localStorage.setItem('aris-auth', 'true');
    localStorage.setItem('aris-user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setSkills([]);
    setCertifications([]);
    setTraining([]);
    setSkillGaps([]);
    localStorage.removeItem('aris-auth');
    localStorage.removeItem('aris-user');
  };

  const addSkill = (skillData: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: Date.now().toString(),
    };
    setSkills(prev => [...prev, newSkill]);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkills(prev => prev.map(skill => 
      skill.id === id ? { ...skill, ...updates } : skill
    ));
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const addCertification = (certData: Omit<Certification, 'id'>) => {
    const newCert: Certification = {
      ...certData,
      id: Date.now().toString(),
    };
    setCertifications(prev => [...prev, newCert]);
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    setCertifications(prev => prev.map(cert => 
      cert.id === id ? { ...cert, ...updates } : cert
    ));
  };

  const deleteCertification = (id: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
  };

  const addTraining = (trainingData: Omit<Training, 'id'>) => {
    const newTraining: Training = {
      ...trainingData,
      id: Date.now().toString(),
    };
    setTraining(prev => [...prev, newTraining]);
  };

  const updateTraining = (id: string, updates: Partial<Training>) => {
    setTraining(prev => prev.map(training => 
      training.id === id ? { ...training, ...updates } : training
    ));
  };

  const deleteTraining = (id: string) => {
    setTraining(prev => prev.filter(training => training.id !== id));
  };

  const refreshSkillGaps = () => {
    // In a real app, this would recalculate skill gaps based on role requirements
    setSkillGaps(mockSkillGaps);
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      skills,
      addSkill,
      updateSkill,
      deleteSkill,
      certifications,
      addCertification,
      updateCertification,
      deleteCertification,
      training,
      addTraining,
      updateTraining,
      deleteTraining,
      skillGaps,
      refreshSkillGaps,
      isLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
