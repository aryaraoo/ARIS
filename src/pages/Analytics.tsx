import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, Award, Target, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Analytics = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");

  const skillsTrendData = [
    { skill: "React.js", growth: 15, employees: 24, trend: "up" },
    { skill: "Python", growth: 22, employees: 31, trend: "up" },
    { skill: "AWS", growth: -5, employees: 18, trend: "down" },
    { skill: "Docker", growth: 8, employees: 14, trend: "up" },
    { skill: "GraphQL", growth: 35, employees: 12, trend: "up" },
  ];

  const departmentStats = [
    { 
      name: "Engineering", 
      employees: 45, 
      avgSkills: 14.2, 
      completionRate: 89,
      skillsGrowth: 12
    },
    { 
      name: "Design", 
      employees: 18, 
      avgSkills: 11.8, 
      completionRate: 76,
      skillsGrowth: 8
    },
    { 
      name: "Product", 
      employees: 22, 
      avgSkills: 9.5, 
      completionRate: 82,
      skillsGrowth: 15
    },
    { 
      name: "Marketing", 
      employees: 16, 
      avgSkills: 8.2, 
      completionRate: 71,
      skillsGrowth: 6
    },
  ];

  const trainingInsights = [
    {
      title: "Most Popular Training",
      value: "Cloud Architecture",
      change: "+23% enrollment"
    },
    {
      title: "Highest ROI Course",
      value: "React Advanced Patterns",
      change: "4.8/5 rating"
    },
    {
      title: "Completion Leader",
      value: "Engineering Team",
      change: "89% avg completion"
    },
    {
      title: "Skills Gap Priority",
      value: "Machine Learning",
      change: "60% gap identified"
    }
  ];

  const handleExportAnalytics = () => {
    toast({
      title: "Analytics Export",
      description: "Detailed analytics report is being prepared for download.",
    });
  };

  const handleSetupAlert = () => {
    toast({
      title: "Alert Configured",
      description: "You'll receive notifications when metrics change significantly.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Advanced insights into skills development and team performance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSetupAlert} variant="outline">
            Setup Alerts
          </Button>
          <Button onClick={handleExportAnalytics}>
            Export Analytics
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+18%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              vs last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Efficiency</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">87%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Engagement</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              active participation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Score</CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">4.2x</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              training investment return
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">Skills Analytics</TabsTrigger>
          <TabsTrigger value="departments">Department Insights</TabsTrigger>
          <TabsTrigger value="training">Training Analytics</TabsTrigger>
          <TabsTrigger value="predictions">Predictive Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Trend Analysis</CardTitle>
              <CardDescription>Track skill acquisition and proficiency growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsTrendData.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{skill.skill}</h3>
                        <p className="text-sm text-muted-foreground">{skill.employees} employees</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-lg font-bold ${skill.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {skill.growth > 0 ? '+' : ''}{skill.growth}%
                        </p>
                        <p className="text-xs text-muted-foreground">30-day growth</p>
                      </div>
                      {skill.trend === 'up' ? (
                        <ArrowUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowDown className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Comparative analysis across different departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{dept.name}</h3>
                        <p className="text-sm text-muted-foreground">{dept.employees} employees</p>
                      </div>
                      <Badge variant="outline">
                        +{dept.skillsGrowth}% skills growth
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">Average Skills</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={(dept.avgSkills / 20) * 100} className="flex-1" />
                          <span className="text-sm font-medium">{dept.avgSkills}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Completion Rate</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={dept.completionRate} className="flex-1" />
                          <span className="text-sm font-medium">{dept.completionRate}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">{dept.employees}</p>
                          <p className="text-xs text-muted-foreground">team members</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Insights</CardTitle>
              <CardDescription>Performance metrics and insights from training programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trainingInsights.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-secondary rounded-lg">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{insight.title}</h3>
                    </div>
                    <p className="text-lg font-bold text-primary mb-1">{insight.value}</p>
                    <p className="text-sm text-muted-foreground">{insight.change}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Training Recommendations</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary">High Priority</Badge>
                    Increase Machine Learning course capacity by 40%
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">Medium Priority</Badge>
                    Introduce advanced React certification track
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">Low Priority</Badge>
                    Consider partnerships for cloud training programs
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Insights</CardTitle>
              <CardDescription>AI-powered predictions and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Skills Demand Forecast</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    Based on industry trends and internal growth patterns
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI/Machine Learning</span>
                      <Badge variant="destructive">Critical Demand</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cloud Security</span>
                      <Badge variant="default">High Demand</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">DevOps Automation</span>
                      <Badge variant="secondary">Moderate Demand</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Retention Risk Analysis</h3>
                  <p className="text-sm text-green-800 dark:text-green-200 mb-3">
                    Employees at risk based on skill stagnation patterns
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">3</p>
                      <p className="text-xs text-muted-foreground">High Risk</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">8</p>
                      <p className="text-xs text-muted-foreground">Medium Risk</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">145</p>
                      <p className="text-xs text-muted-foreground">Low Risk</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Optimal Training Paths</h3>
                  <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                    AI-recommended learning sequences for maximum impact
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Frontend → Full-Stack → Architecture</span>
                      <Badge variant="outline">12 employees</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Analysis → ML → AI Ethics</span>
                      <Badge variant="outline">8 employees</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cloud Basics → DevOps → Security</span>
                      <Badge variant="outline">15 employees</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;