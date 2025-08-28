import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  Target, 
  TrendingUp, 
  Calendar,
  Plus,
  ExternalLink
} from "lucide-react";

export default function Dashboard() {
  // Mock data - will be replaced with real API calls
  const stats = {
    totalSkills: 24,
    certifications: 6,
    activeTraining: 3,
    completionRate: 85,
  };

  const recentSkills = [
    { name: "React", level: "expert", category: "Frontend" },
    { name: "Python", level: "intermediate", category: "Backend" },
    { name: "AWS", level: "beginner", category: "Cloud" },
  ];

  const upcomingTraining = [
    { title: "Advanced React Patterns", date: "Dec 15, 2024", status: "enrolled" },
    { title: "AWS Solutions Architect", date: "Jan 10, 2025", status: "planned" },
  ];

  const skillGaps = [
    { skill: "Docker", priority: "high", recommendation: "Complete containerization course" },
    { skill: "GraphQL", priority: "medium", recommendation: "Practice with Apollo Client" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground mt-2">
            Track your skills, certifications, and professional development
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Training
          </Button>
          <Button size="sm" className="aris-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSkills}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <GraduationCap className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certifications}</div>
            <p className="text-xs text-muted-foreground">3 expiring soon</p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Training</CardTitle>
            <BookOpen className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTraining}</div>
            <p className="text-xs text-muted-foreground">1 due this week</p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <Progress value={stats.completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Skills */}
        <Card className="aris-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Skills
            </CardTitle>
            <CardDescription>Your latest skill additions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSkills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                </div>
                <Badge className={`skill-badge skill-${skill.level}`}>
                  {skill.level}
                </Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Skills
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Training */}
        <Card className="aris-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Upcoming Training
            </CardTitle>
            <CardDescription>Your scheduled learning activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTraining.map((training, index) => (
              <div key={index} className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">{training.title}</p>
                  <p className="text-sm text-muted-foreground">{training.date}</p>
                </div>
                <Badge variant="outline" className="ml-2">
                  {training.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4">
              <ExternalLink className="h-4 w-4 mr-2" />
              Browse Training
            </Button>
          </CardContent>
        </Card>

        {/* Skill Gaps */}
        <Card className="aris-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recommended Skills
            </CardTitle>
            <CardDescription>Skills to develop for your role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillGaps.map((gap, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{gap.skill}</p>
                  <Badge variant={gap.priority === 'high' ? 'destructive' : 'secondary'}>
                    {gap.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{gap.recommendation}</p>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4">
              View Skills Gap Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}