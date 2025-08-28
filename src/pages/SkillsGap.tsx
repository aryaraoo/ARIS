import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, TrendingUp, Target, Users, BookOpen } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SkillsGap = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const skillsGapData = [
    {
      skill: "React.js",
      requiredLevel: "Expert",
      currentLevel: "Intermediate",
      gap: 30,
      priority: "high",
      employeesNeed: 8,
      recommendedTraining: "Advanced React Patterns"
    },
    {
      skill: "Machine Learning",
      requiredLevel: "Intermediate",
      currentLevel: "Beginner",
      gap: 60,
      priority: "critical",
      employeesNeed: 12,
      recommendedTraining: "ML Fundamentals Course"
    },
    {
      skill: "Cloud Architecture",
      requiredLevel: "Expert",
      currentLevel: "Intermediate",
      gap: 40,
      priority: "high",
      employeesNeed: 6,
      recommendedTraining: "AWS Solutions Architect"
    },
    {
      skill: "Data Analysis",
      requiredLevel: "Intermediate",
      currentLevel: "Intermediate",
      gap: 10,
      priority: "low",
      employeesNeed: 3,
      recommendedTraining: "Advanced Analytics"
    },
    {
      skill: "DevOps",
      requiredLevel: "Intermediate",
      currentLevel: "Beginner",
      gap: 45,
      priority: "medium",
      employeesNeed: 10,
      recommendedTraining: "DevOps Certification"
    }
  ];

  const departments = [
    { value: "all", label: "All Departments" },
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "product", label: "Product" },
    { value: "marketing", label: "Marketing" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const handleCreateTrainingPlan = (skill: string) => {
    toast({
      title: "Training Plan Created",
      description: `Creating training plan for ${skill}...`,
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Skills gap analysis report has been generated and sent to your email.",
    });
  };

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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Gaps</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">skills need immediate attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Gap Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37%</div>
            <p className="text-xs text-muted-foreground">across all tracked skills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees Affected</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">39</div>
            <p className="text-xs text-muted-foreground">need skill development</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Programs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">recommended programs</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Gap Details */}
      <Card>
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
            {skillsGapData.map((skill, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{skill.skill}</h3>
                    <p className="text-sm text-muted-foreground">
                      Required: {skill.requiredLevel} • Current: {skill.currentLevel}
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
                      onClick={() => handleCreateTrainingPlan(skill.skill)}
                    >
                      Create Plan
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>Priority actions to address critical skill gaps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div className="flex-1">
                <p className="font-medium">Immediate: Machine Learning Training</p>
                <p className="text-sm text-muted-foreground">12 employees need urgent ML skills development</p>
              </div>
              <Button size="sm">Start Training</Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Target className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="font-medium">High Priority: Cloud Architecture</p>
                <p className="text-sm text-muted-foreground">6 employees need advanced cloud skills</p>
              </div>
              <Button size="sm" variant="outline">Plan Training</Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">Schedule: DevOps Certification</p>
                <p className="text-sm text-muted-foreground">10 employees would benefit from DevOps training</p>
              </div>
              <Button size="sm" variant="outline">Schedule</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsGap;