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
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, skills, certifications, training, skillGaps } = useApp();
  const navigate = useNavigate();

  const stats = {
    totalSkills: skills.length,
    certifications: certifications.length,
    activeTraining: training.filter(t => t.status === 'in-progress').length,
    completionRate: Math.round((training.filter(t => t.status === 'completed').length / training.length) * 100) || 0,
  };

  const recentSkills = skills.slice(-3);
  const upcomingTraining = training.filter(t => t.status === 'planned' || t.status === 'in-progress').slice(0, 2);
  const topSkillGaps = skillGaps.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h1>
          <p className="text-muted-foreground mt-2">
            Track your skills, certifications, and professional development
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/training')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Training
          </Button>
          <Button 
            size="sm" 
            className="aris-gradient"
            onClick={() => navigate('/skills')}
          >
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
            <p className="text-xs text-muted-foreground">
              {skills.filter(s => s.verified).length} verified
            </p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications</CardTitle>
            <GraduationCap className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certifications}</div>
            <p className="text-xs text-muted-foreground">
              {certifications.filter(c => c.expiryDate && new Date(c.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)).length} expiring soon
            </p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Training</CardTitle>
            <BookOpen className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTraining}</div>
            <p className="text-xs text-muted-foreground">
              {training.filter(t => t.status === 'planned').length} planned
            </p>
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
            {recentSkills.length > 0 ? (
              recentSkills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-muted-foreground">{skill.category}</p>
                  </div>
                  <Badge className={`skill-badge skill-${skill.level}`}>
                    {skill.level}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No skills added yet</p>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => navigate('/skills')}
            >
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
            {upcomingTraining.length > 0 ? (
              upcomingTraining.map((training) => (
                <div key={training.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{training.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {training.startDate ? new Date(training.startDate).toLocaleDateString() : 'TBD'}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {training.status}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming training scheduled</p>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => navigate('/training')}
            >
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
            {topSkillGaps.length > 0 ? (
              topSkillGaps.map((gap, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{gap.skillName}</p>
                    <Badge variant={gap.gapSeverity === 'critical' ? 'destructive' : 'secondary'}>
                      {gap.gapSeverity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{gap.recommendation}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No skill gaps identified</p>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => navigate('/skills-gap')}
            >
              View Skills Gap Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}