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
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "",
    level: "" as SkillLevel,
    yearsExperience: 0,
  });

  const { skills, addSkill, deleteSkill } = useApp();
  const { toast } = useToast();

  const categories = [
    { value: "all", label: "All Categories", icon: Briefcase },
    { value: "Frontend", label: "Frontend", icon: Code },
    { value: "Backend", label: "Backend", icon: Database },
    { value: "Cloud", label: "Cloud", icon: Cloud },
    { value: "Design", label: "Design", icon: Palette },
    { value: "Security", label: "Security", icon: Shield },
    { value: "Programming Languages", label: "Programming Languages", icon: Code },
    { value: "DevOps", label: "DevOps", icon: Database },
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

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSkill.name || !newSkill.category || !newSkill.level) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addSkill({
      name: newSkill.name,
      category: newSkill.category,
      level: newSkill.level,
      yearsExperience: newSkill.yearsExperience,
      lastAssessed: new Date().toISOString().split('T')[0],
      verified: false,
    });

    toast({
      title: "Success",
      description: `${newSkill.name} skill added successfully!`,
    });

    setNewSkill({ name: "", category: "", level: "" as SkillLevel, yearsExperience: 0 });
    setIsAddSkillOpen(false);
  };

  const handleDeleteSkill = (skillId: string, skillName: string) => {
    deleteSkill(skillId);
    toast({
      title: "Skill Removed",
      description: `${skillName} has been removed from your skills`,
    });
  };

  const getSkillStats = () => {
    const expertCount = skills.filter(s => s.level === 'expert').length;
    const intermediateCount = skills.filter(s => s.level === 'intermediate').length;
    const beginnerCount = skills.filter(s => s.level === 'beginner').length;
    
    return { expertCount, intermediateCount, beginnerCount };
  };

  const { expertCount, intermediateCount, beginnerCount } = getSkillStats();

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
            <form onSubmit={handleAddSkill} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skillName">Skill Name *</Label>
                <Input 
                  id="skillName" 
                  placeholder="e.g., React, Python, AWS" 
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skillCategory">Category *</Label>
                <Select value={newSkill.category} onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}>
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
                <Label htmlFor="skillLevel">Proficiency Level *</Label>
                <Select value={newSkill.level} onValueChange={(value: SkillLevel) => setNewSkill({ ...newSkill, level: value })}>
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
                <Input 
                  id="experience" 
                  type="number" 
                  placeholder="2" 
                  value={newSkill.yearsExperience || ""}
                  onChange={(e) => setNewSkill({ ...newSkill, yearsExperience: parseInt(e.target.value) || 0 })}
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
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => {
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteSkill(skill.id, skill.name)}
                        >
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
                        <p>Last assessed: {skill.lastAssessed ? new Date(skill.lastAssessed).toLocaleDateString() : 'Never'}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No skills found. Add your first skill to get started!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsByCategory.filter(category => category.count > 0).map((category) => {
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
                    <span className="font-medium">{expertCount} skills</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      Intermediate
                    </span>
                    <span className="font-medium">{intermediateCount} skills</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      Beginner
                    </span>
                    <span className="font-medium">{beginnerCount} skills</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="aris-card">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
                <CardDescription>Your skills overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Skills</span>
                    <span className="font-medium">{skills.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Skills</span>
                    <span className="font-medium">{skills.filter(s => s.verified).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Categories</span>
                    <span className="font-medium">{new Set(skills.map(s => s.category)).size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Experience</span>
                    <span className="font-medium">
                      {skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + (s.yearsExperience || 0), 0) / skills.length) : 0} years
                    </span>
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