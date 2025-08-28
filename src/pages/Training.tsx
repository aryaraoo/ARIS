import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  Search,
  Play,
  Pause,
  BookOpen,
  Clock,
  Calendar,
  Award,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import type { Training, TrainingStatus } from "@/types";

export default function Training() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<TrainingStatus | "all">("all");
  const [isAddTrainingOpen, setIsAddTrainingOpen] = useState(false);

  // Mock training data
  const trainings: Training[] = [
    {
      id: "1",
      title: "Advanced React Patterns",
      provider: "Frontend Masters",
      status: "in-progress",
      startDate: "2024-11-01",
      duration: 8,
      category: "Frontend Development",
      description: "Learn advanced React patterns including compound components, render props, and hooks patterns.",
    },
    {
      id: "2",
      title: "AWS Solutions Architecture",
      provider: "AWS Training",
      status: "planned",
      duration: 40,
      category: "Cloud Computing",
      description: "Comprehensive course on designing and deploying scalable systems on AWS.",
    },
    {
      id: "3",
      title: "Docker and Kubernetes Fundamentals",
      provider: "Pluralsight",
      status: "completed",
      startDate: "2024-09-15",
      completionDate: "2024-10-15",
      duration: 12,
      category: "DevOps",
      certificateUrl: "https://example.com/certificate/123",
    },
    {
      id: "4",
      title: "Python Data Analysis with Pandas",
      provider: "Coursera",
      status: "in-progress",
      startDate: "2024-10-20",
      duration: 16,
      category: "Data Science",
      description: "Master data manipulation and analysis using Python and Pandas library.",
    },
    {
      id: "5",
      title: "UI/UX Design Principles",
      provider: "Udemy",
      status: "completed",
      startDate: "2024-08-01",
      completionDate: "2024-09-01",
      duration: 20,
      category: "Design",
    },
  ];

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch = training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         training.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || training.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: TrainingStatus) => {
    switch (status) {
      case "planned":
        return "bg-muted text-muted-foreground";
      case "in-progress":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: TrainingStatus) => {
    switch (status) {
      case "planned":
        return <Calendar className="h-4 w-4" />;
      case "in-progress":
        return <Play className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const stats = {
    total: trainings.length,
    completed: trainings.filter(t => t.status === "completed").length,
    inProgress: trainings.filter(t => t.status === "in-progress").length,
    planned: trainings.filter(t => t.status === "planned").length,
    totalHours: trainings.reduce((acc, t) => acc + t.duration, 0),
    completedHours: trainings.filter(t => t.status === "completed").reduce((acc, t) => acc + t.duration, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Training & Learning</h1>
          <p className="text-muted-foreground mt-2">
            Track your professional development and learning progress
          </p>
        </div>
        
        <Dialog open={isAddTrainingOpen} onOpenChange={setIsAddTrainingOpen}>
          <DialogTrigger asChild>
            <Button className="aris-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add Training
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Training</DialogTitle>
              <DialogDescription>
                Add a training course or learning program to track
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trainingTitle">Training Title</Label>
                <Input id="trainingTitle" placeholder="e.g., Advanced React Patterns" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="provider">Provider</Label>
                <Input id="provider" placeholder="e.g., Frontend Masters, Coursera" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend Development</SelectItem>
                      <SelectItem value="backend">Backend Development</SelectItem>
                      <SelectItem value="cloud">Cloud Computing</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (Hours)</Label>
                  <Input id="duration" type="number" placeholder="8" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="trainingStatus">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Brief description of the training content..."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddTrainingOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="aris-gradient">
                  Add Training
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Training</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">{stats.totalHours} total hours</p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">{stats.completedHours} hours completed</p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Play className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Active learning</p>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Award className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((stats.completed / stats.total) * 100)}%</div>
            <Progress value={(stats.completed / stats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search training..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <TabsList className="grid w-full sm:w-auto grid-cols-4">
            <TabsTrigger value="all" onClick={() => setSelectedStatus("all")}>All</TabsTrigger>
            <TabsTrigger value="planned" onClick={() => setSelectedStatus("planned")}>Planned</TabsTrigger>
            <TabsTrigger value="in-progress" onClick={() => setSelectedStatus("in-progress")}>Active</TabsTrigger>
            <TabsTrigger value="completed" onClick={() => setSelectedStatus("completed")}>Completed</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTrainings.map((training) => (
              <Card key={training.id} className="aris-card hover:shadow-elevated transition-aris">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {getStatusIcon(training.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight">{training.title}</CardTitle>
                        <CardDescription className="mt-1">{training.provider}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(training.status)}>
                      {training.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-1">Category: {training.category}</p>
                    {training.description && (
                      <p className="text-sm leading-relaxed">{training.description}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">{training.duration} hours</span>
                      </div>
                    </div>
                    {training.startDate && (
                      <div>
                        <p className="text-muted-foreground">
                          {training.status === "completed" ? "Started" : "Start Date"}
                        </p>
                        <p className="font-medium">
                          {new Date(training.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {training.completionDate && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Completed</p>
                      <p className="font-medium text-success">
                        {new Date(training.completionDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    {training.status === "in-progress" && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                    )}
                    {training.status === "planned" && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Start Training
                      </Button>
                    )}
                    {training.certificateUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={training.certificateUrl} target="_blank" rel="noopener noreferrer">
                          <Award className="h-4 w-4 mr-2" />
                          Certificate
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}