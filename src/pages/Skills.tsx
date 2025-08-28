import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Filter,
  Code,
  Database,
  Cloud,
  Palette,
  Shield,
  Briefcase,
  Edit,
  Trash2,
} from "lucide-react";
import type { Skill, SkillLevel } from "@/types";

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  // Mock skills data
  const skills: Skill[] = [
    {
      id: "1",
      name: "React",
      category: "Frontend",
      level: "expert",
      yearsExperience: 4,
      lastAssessed: "2024-11-15",
      verified: true,
    },
    {
      id: "2",
      name: "Python",
      category: "Backend",
      level: "intermediate",
      yearsExperience: 3,
      lastAssessed: "2024-10-20",
      verified: true,
    },
    {
      id: "3",
      name: "AWS",
      category: "Cloud",
      level: "beginner",
      yearsExperience: 1,
      lastAssessed: "2024-11-01",
      verified: false,
    },
    {
      id: "4",
      name: "PostgreSQL",
      category: "Database",
      level: "intermediate",
      yearsExperience: 2,
      lastAssessed: "2024-09-15",
      verified: true,
    },
    {
      id: "5",
      name: "Figma",
      category: "Design",
      level: "intermediate",
      yearsExperience: 2,
      lastAssessed: "2024-08-30",
      verified: false,
    },
  ];

  const categories = [
    { value: "all", label: "All Categories", icon: Briefcase },
    { value: "Frontend", label: "Frontend", icon: Code },
    { value: "Backend", label: "Backend", icon: Database },
    { value: "Cloud", label: "Cloud", icon: Cloud },
    { value: "Design", label: "Design", icon: Palette },
    { value: "Security", label: "Security", icon: Shield },
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSkillProgress = (level: SkillLevel): number => {
    switch (level) {
      case "beginner": return 33;
      case "intermediate": return 66;
      case "expert": return 100;
      default: return 0;
    }
  };

  const getIconForCategory = (category: string) => {
    const categoryObj = categories.find(cat => cat.value === category);
    return categoryObj?.icon || Code;
  };

  const skillsByCategory = categories.slice(1).map(category => ({
    ...category,
    count: skills.filter(skill => skill.category === category.value).length,
    averageLevel: skills
      .filter(skill => skill.category === category.value)
      .reduce((acc, skill) => acc + getSkillProgress(skill.level), 0) / 
      Math.max(skills.filter(skill => skill.category === category.value).length, 1),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">My Skills</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track your professional skills and expertise
          </p>
        </div>
        
        <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
          <DialogTrigger asChild>
            <Button className="aris-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>
                Add a new skill to your professional profile
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skillName">Skill Name</Label>
                <Input id="skillName" placeholder="e.g., React, Python, AWS" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skillCategory">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skillLevel">Proficiency Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" type="number" placeholder="2" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your experience with this skill..."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddSkillOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="aris-gradient">
                  Add Skill
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList>
          <TabsTrigger value="skills">Skills List</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => {
              const IconComponent = getIconForCategory(skill.category);
              return (
                <Card key={skill.id} className="aris-card hover:shadow-elevated transition-aris">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                        <CardDescription>{skill.category}</CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`skill-badge skill-${skill.level}`}>
                        {skill.level}
                      </Badge>
                      {skill.verified && (
                        <Badge variant="outline" className="text-success border-success">
                          Verified
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Proficiency</span>
                        <span>{getSkillProgress(skill.level)}%</span>
                      </div>
                      <Progress value={getSkillProgress(skill.level)} />
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>{skill.yearsExperience} years experience</p>
                      <p>Last assessed: {new Date(skill.lastAssessed).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsByCategory.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.value} className="aris-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{category.label}</CardTitle>
                        <CardDescription>{category.count} skills</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Level</span>
                        <span>{Math.round(category.averageLevel)}%</span>
                      </div>
                      <Progress value={category.averageLevel} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="aris-card">
              <CardHeader>
                <CardTitle>Skills Distribution</CardTitle>
                <CardDescription>Breakdown by proficiency level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      Expert
                    </span>
                    <span className="font-medium">1 skill</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      Intermediate
                    </span>
                    <span className="font-medium">3 skills</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      Beginner
                    </span>
                    <span className="font-medium">1 skill</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="aris-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Skills added and updated recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">React skill updated</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">AWS skill added</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}