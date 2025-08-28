import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, Search, Filter, UserPlus, Download, Calendar, Award, BookOpen } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/contexts/AppContext";

const TeamOverview = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const { skills, certifications, training } = useApp();

  // Team members data with Indian profiles
  const teamMembers = [
    {
      id: "1",
      name: "Priya Sharma",
      role: "Senior Software Engineer",
      department: "Engineering",
      email: "priya.sharma@company.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      status: "active" as const,
      joinDate: "2022-01-15",
      skills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
      certifications: ["AWS Solutions Architect", "React Developer"],
      currentTraining: ["Advanced React Patterns"],
    },
    {
      id: "2", 
      name: "Rajesh Kumar",
      role: "Full Stack Developer",
      department: "Engineering",
      email: "rajesh.kumar@company.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      status: "active" as const,
      joinDate: "2021-03-22",
      skills: ["Java", "Spring Boot", "Angular", "MySQL", "Microservices"],
      certifications: ["Oracle Java Certification", "Spring Professional"],
      currentTraining: ["Microservices Architecture"],
    },
    {
      id: "3",
      name: "Anita Singh", 
      role: "Data Scientist",
      department: "Analytics",
      email: "anita.singh@company.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=32&h=32&fit=crop&crop=face",
      status: "training" as const,
      joinDate: "2020-09-10",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Power BI"],
      certifications: ["Google Data Analytics", "Microsoft Azure AI", "TensorFlow Developer"],
      currentTraining: ["Advanced Machine Learning"],
    },
    {
      id: "4",
      name: "Vivek Gupta",
      role: "DevOps Engineer", 
      department: "Engineering",
      email: "vivek.gupta@company.com",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=32&h=32&fit=crop&crop=face",
      status: "active" as const,
      joinDate: "2023-05-08",
      skills: ["Kubernetes", "Docker", "Jenkins", "Terraform", "AWS"],
      certifications: ["CKA: Certified Kubernetes Administrator", "AWS DevOps"],
      currentTraining: ["Advanced Kubernetes"],
    },
    {
      id: "5",
      name: "Sneha Reddy",
      role: "UI/UX Designer",
      department: "Design", 
      email: "sneha.reddy@company.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      status: "active" as const,
      joinDate: "2022-11-12",
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems"],
      certifications: ["Google UX Design", "Adobe Certified Expert"],
      currentTraining: ["Advanced Prototyping Techniques"],
    },
    {
      id: "6",
      name: "Amit Patel",
      role: "Product Manager",
      department: "Product",
      email: "amit.patel@company.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
      status: "active" as const,
      joinDate: "2021-08-20",
      skills: ["Product Strategy", "Agile", "Scrum", "Analytics", "Market Research"],
      certifications: ["Certified Scrum Product Owner", "Google Analytics"],
      currentTraining: ["Strategic Product Management"],
    },
    {
      id: "7",
      name: "Kavya Nair",
      role: "Quality Assurance Engineer",
      department: "Engineering",
      email: "kavya.nair@company.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
      status: "active" as const,
      joinDate: "2022-02-14",
      skills: ["Selenium", "TestNG", "API Testing", "Performance Testing", "Cypress"],
      certifications: ["ISTQB Foundation", "Selenium WebDriver"],
      currentTraining: ["Advanced Test Automation"],
    },
    {
      id: "8",
      name: "Arjun Mehta",
      role: "Business Analyst",
      department: "Analytics",
      email: "arjun.mehta@company.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      status: "training" as const,
      joinDate: "2023-01-10",
      skills: ["Business Analysis", "SQL", "Tableau", "Process Modeling", "Requirements Gathering"],
      certifications: ["CBAP", "Tableau Desktop Specialist"],
      currentTraining: ["Advanced Business Intelligence"],
    }
  ];

  const handleAddEmployee = () => {
    toast({
      title: "Add Employee",
      description: "Employee management feature would open here in a full implementation",
    });
  };

  const handleExportData = () => {
    // In a real implementation, this would generate and download a CSV/Excel file
    const csvContent = teamMembers.map(member => 
      `${member.name},${member.role},${member.department},${member.skills.length},${member.certifications.length},${member.currentTraining.length}`
    ).join('\n');
    
    const header = "Name,Role,Department,Skills Count,Certifications Count,Active Training Count\n";
    const blob = new Blob([header + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'team-overview.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Team data has been exported to CSV file",
    });
  };

  const handleViewProfile = (memberId: string, memberName: string) => {
    toast({
      title: "View Profile",
      description: `Opening profile for ${memberName}. In a full implementation, this would navigate to a detailed employee profile page.`,
    });
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate team statistics
  const totalEmployees = teamMembers.length;
  const avgSkillsPerEmployee = Math.round(
    teamMembers.reduce((sum, member) => sum + member.skills.length, 0) / totalEmployees
  );
  const employeesInTraining = teamMembers.filter(member => 
    member.status === "training" || member.currentTraining.length > 0
  ).length;
  const avgSkillProficiency = Math.round(
    teamMembers.reduce((sum, member) => {
      // Calculate proficiency based on skills, certifications, and training
      const skillScore = member.skills.length * 5;
      const certScore = member.certifications.length * 15;
      const trainingBonus = member.currentTraining.length * 10;
      return sum + Math.min(100, skillScore + certScore + trainingBonus);
    }, 0) / totalEmployees
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Overview</h1>
          <p className="text-muted-foreground">Manage and monitor your team's skills and progress</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportData} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button onClick={handleAddEmployee}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active team members</p>
          </CardContent>
        </Card>
        
        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Skills per Employee</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSkillsPerEmployee}</div>
            <p className="text-xs text-muted-foreground">Skills per person</p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Training</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employeesInTraining}</div>
            <p className="text-xs text-muted-foreground">employees in training</p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Skill Level</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSkillProficiency}%</div>
            <p className="text-xs text-muted-foreground">average proficiency</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="aris-card">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>View and manage individual employee profiles and their development progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Team Members List */}
          <div className="space-y-4">
            {filteredMembers.map((member) => {
              const skillsProficiency = Math.min(100, 
                member.skills.length * 5 + 
                member.certifications.length * 15 + 
                member.currentTraining.length * 10
              );
              
              return (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm font-medium">{member.skills.length}</p>
                      <p className="text-xs text-muted-foreground">Skills</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{member.certifications.length}</p>
                      <p className="text-xs text-muted-foreground">Certs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{member.currentTraining.length}</p>
                      <p className="text-xs text-muted-foreground">Training</p>
                    </div>
                    <div className="w-24">
                      <Progress value={skillsProficiency} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{skillsProficiency}% proficient</p>
                    </div>
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>
                      {member.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewProfile(member.id, member.name)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamOverview;