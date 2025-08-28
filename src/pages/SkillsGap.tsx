import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, TrendingUp, Target, Users, BookOpen, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/contexts/AppContext";

const SkillsGap = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const { skills, training, addTraining } = useApp();

  // Simulate organizational skill requirements and current team capabilities
  const organizationalNeeds = [
    {
      skill: "React.js",
      requiredLevel: "Expert",
      currentLevel: "Intermediate", 
      department: "Engineering",
      priority: "high" as const,
      employeesNeed: 8,
      recommendedTraining: "Advanced React Patterns"
    },
    {
      skill: "Machine Learning",
      requiredLevel: "Intermediate",
      currentLevel: "Beginner",
      department: "Engineering",
      priority: "critical" as const,
      employeesNeed: 12,
      recommendedTraining: "ML Fundamentals Course"
    },
    {
      skill: "Cloud Architecture",
      requiredLevel: "Expert", 
      currentLevel: "Intermediate",
      department: "Engineering",
      priority: "high" as const,
      employeesNeed: 6,
      recommendedTraining: "AWS Solutions Architect"
    },
    {
      skill: "Data Analysis",
      requiredLevel: "Expert",
      currentLevel: "Advanced",
      department: "Analytics",
      priority: "low" as const,
      employeesNeed: 3,
      recommendedTraining: "Advanced Analytics with Python"
    },
    {
      skill: "DevOps",
      requiredLevel: "Intermediate",
      currentLevel: "Beginner", 
      department: "Engineering",
      priority: "medium" as const,
      employeesNeed: 10,
      recommendedTraining: "Docker and Kubernetes Fundamentals"
    },
    {
      skill: "UI/UX Design",
      requiredLevel: "Advanced",
      currentLevel: "Intermediate",
      department: "Design",
      priority: "medium" as const,
      employeesNeed: 4,
      recommendedTraining: "UI/UX Design Principles"
    },
    {
      skill: "Product Strategy",
      requiredLevel: "Expert",
      currentLevel: "Intermediate",
      department: "Product",
      priority: "high" as const,
      employeesNeed: 5,
      recommendedTraining: "Strategic Product Management"
    }
  ];

  const departments = [
    { value: "all", label: "All Departments" },
    { value: "Engineering", label: "Engineering" },
    { value: "Design", label: "Design" },
    { value: "Product", label: "Product" },
    { value: "Analytics", label: "Analytics" }
  ];

  // Calculate skill gaps based on organizational needs vs current skills
  const skillsGapData = organizationalNeeds.map(need => {
    const currentSkill = skills.find(s => s.name.toLowerCase().includes(need.skill.toLowerCase()));
    
    // Calculate gap percentage based on proficiency levels
    const levelToScore = (level: string) => {
      switch(level.toLowerCase()) {
        case 'beginner': return 25;
        case 'intermediate': return 50;
        case 'advanced': return 75;
        case 'expert': return 100;
        default: return 0;
      }
    };
    
    const requiredScore = levelToScore(need.requiredLevel);
    const currentScore = currentSkill ? levelToScore(currentSkill.level) : levelToScore(need.currentLevel);
    const gap = Math.max(0, requiredScore - currentScore);
    const gapPercentage = Math.round((gap / requiredScore) * 100);
    
    return {
      ...need,
      gap: gapPercentage,
      currentScore,
      requiredScore,
      hasSkillInTeam: !!currentSkill
    };
  }).filter(item => selectedDepartment === "all" || item.department === selectedDepartment);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const handleCreateTrainingPlan = (skillName: string, recommendedTraining: string) => {
    // Add the recommended training to the training list
    addTraining({
      title: recommendedTraining,
      provider: "Internal Training Program",
      status: "planned",
      category: "Skill Development",
      duration: 20,
      description: `Training program to address ${skillName} skill gap identified in gap analysis`
    });

    toast({
      title: "Training Plan Created",
      description: `${recommendedTraining} has been added to your training programs`,
    });
  };

  const handleGenerateReport = () => {
    // In a real app, this would generate and download a report
    const reportData = skillsGapData.map(skill => 
      `${skill.skill},${skill.priority},${skill.gap}%,${skill.employeesNeed},${skill.recommendedTraining}`
    ).join('\n');
    
    const header = "Skill,Priority,Gap Percentage,Employees Affected,Recommended Training\n";
    const blob = new Blob([header + reportData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'skills-gap-analysis.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Report Generated",
      description: "Skills gap analysis report has been downloaded",
    });
  };

  // Calculate summary statistics
  const criticalGaps = skillsGapData.filter(s => s.priority === "critical").length;
  const avgGap = Math.round(skillsGapData.reduce((sum, s) => sum + s.gap, 0) / skillsGapData.length);
  const totalEmployeesAffected = skillsGapData.reduce((sum, s) => sum + s.employeesNeed, 0);
  const recommendedPrograms = skillsGapData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills Gap Analysis</h1>
          <p className="text-muted-foreground">Identify skill gaps and plan targeted training programs</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.value} value={dept.value}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateReport}>Generate Report</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Gaps</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalGaps}</div>
            <p className="text-xs text-muted-foreground">skills need immediate attention</p>
          </CardContent>
        </Card>
        
        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Gap Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgGap}%</div>
            <p className="text-xs text-muted-foreground">across all tracked skills</p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees Affected</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployeesAffected}</div>
            <p className="text-xs text-muted-foreground">need skill development</p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Programs</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recommendedPrograms}</div>
            <p className="text-xs text-muted-foreground">recommended programs</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Gap Details */}
      <Card className="aris-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Detailed Skills Gap Analysis
          </CardTitle>
          <CardDescription>
            Skills analysis showing current vs required proficiency levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {skillsGapData.length > 0 ? (
              skillsGapData.map((skill, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{skill.skill}</h3>
                      <p className="text-sm text-muted-foreground">
                        Required: {skill.requiredLevel} • Current: {skill.currentLevel}
                        {skill.hasSkillInTeam && <span className="text-success"> • In Team</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getPriorityColor(skill.priority)}>
                        {skill.priority.toUpperCase()}
                      </Badge>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-destructive">{skill.gap}%</p>
                        <p className="text-xs text-muted-foreground">skill gap</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress to Target</span>
                        <span>{100 - skill.gap}%</span>
                      </div>
                      <Progress value={100 - skill.gap} className="h-2" />
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-lg font-semibold">{skill.employeesNeed}</p>
                        <p className="text-xs text-muted-foreground">employees need training</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <div className="text-right mr-4">
                        <p className="text-sm font-medium">{skill.recommendedTraining}</p>
                        <p className="text-xs text-muted-foreground">recommended training</p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleCreateTrainingPlan(skill.skill, skill.recommendedTraining)}
                        className="aris-gradient"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Create Plan
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No skill gaps identified for the selected department.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Recommendations */}
      <Card className="aris-card">
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>Priority actions to address critical skill gaps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {skillsGapData
              .filter(skill => skill.priority === "critical" || skill.priority === "high")
              .slice(0, 3)
              .map((skill, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    skill.priority === "critical" 
                      ? "bg-destructive/10" 
                      : "bg-orange-100 dark:bg-orange-900/20"
                  }`}
                >
                  <AlertTriangle 
                    className={`h-5 w-5 ${
                      skill.priority === "critical" ? "text-destructive" : "text-orange-600"
                    }`} 
                  />
                  <div className="flex-1">
                    <p className="font-medium">
                      {skill.priority === "critical" ? "Immediate" : "High Priority"}: {skill.skill} Training
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {skill.employeesNeed} employees need {skill.skill.toLowerCase()} skills development
                    </p>
                  </div>
                  <Button 
                    size="sm"
                    variant={skill.priority === "critical" ? "default" : "outline"}
                    onClick={() => handleCreateTrainingPlan(skill.skill, skill.recommendedTraining)}
                  >
                    {skill.priority === "critical" ? "Start Training" : "Plan Training"}
                  </Button>
                </div>
              ))}
            
            {skillsGapData.filter(skill => skill.priority === "medium").length > 0 && (
              <div className="flex items-center gap-3 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">Schedule: Medium Priority Skills</p>
                  <p className="text-sm text-muted-foreground">
                    {skillsGapData.filter(skill => skill.priority === "medium").length} additional skills to develop
                  </p>
                </div>
                <Button size="sm" variant="outline">Schedule</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsGap;