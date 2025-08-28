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
  Trash2,
} from "lucide-react";
import type { Training, TrainingStatus } from "@/types";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

export default function Training() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<TrainingStatus | "all">("all");
  const [isAddTrainingOpen, setIsAddTrainingOpen] = useState(false);
  const [newTraining, setNewTraining] = useState({
    title: "",
    provider: "",
    category: "",
    duration: 0,
    description: "",
    startDate: "",
  });

  const { training, addTraining, updateTraining, deleteTraining } = useApp();
  const { toast } = useToast();

  const filteredTraining = training.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddTraining = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTraining.title || !newTraining.provider || !newTraining.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addTraining({
      title: newTraining.title,
      provider: newTraining.provider,
      status: "planned",
      startDate: newTraining.startDate || undefined,
      duration: newTraining.duration,
      category: newTraining.category,
      description: newTraining.description || undefined,
    });

    toast({
      title: "Success",
      description: `${newTraining.title} training added successfully!`,
    });

    setNewTraining({
      title: "",
      provider: "",
      category: "",
      duration: 0,
      description: "",
      startDate: "",
    });
    setIsAddTrainingOpen(false);
  };

  const handleDeleteTraining = (trainingId: string, trainingTitle: string) => {
    deleteTraining(trainingId);
    toast({
      title: "Training Removed",
      description: `${trainingTitle} has been removed from your training`,
    });
  };

  const handleStatusChange = (trainingId: string, newStatus: TrainingStatus) => {
    updateTraining(trainingId, { status: newStatus });
    toast({
      title: "Status Updated",
      description: `Training status updated to ${newStatus}`,
    });
  };

  const getStatusBadge = (status: TrainingStatus) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-primary text-primary-foreground">In Progress</Badge>;
      case "planned":
        return <Badge variant="outline">Planned</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: TrainingStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-progress":
        return <Play className="h-4 w-4 text-primary" />;
      case "planned":
        return <Calendar className="h-4 w-4 text-muted-foreground" />;
      default:
        return <BookOpen className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const stats = {
    total: training.length,
    completed: training.filter(t => t.status === "completed").length,
    inProgress: training.filter(t => t.status === "in-progress").length,
    planned: training.filter(t => t.status === "planned").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Training & Development</h1>
          <p className="text-muted-foreground mt-2">
            Track your learning journey and professional development
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
                Add a training course or certification to your development plan
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddTraining} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trainingTitle">Training Title *</Label>
                <Input 
                  id="trainingTitle" 
                  placeholder="e.g., Advanced React Patterns" 
                  value={newTraining.title}
                  onChange={(e) => setNewTraining({ ...newTraining, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="provider">Provider *</Label>
                <Input 
                  id="provider" 
                  placeholder="e.g., Frontend Masters, Coursera" 
                  value={newTraining.provider}
                  onChange={(e) => setNewTraining({ ...newTraining, provider: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input 
                    id="category" 
                    placeholder="e.g., Frontend Development" 
                    value={newTraining.category}
                    onChange={(e) => setNewTraining({ ...newTraining, category: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    placeholder="8" 
                    value={newTraining.duration || ""}
                    onChange={(e) => setNewTraining({ ...newTraining, duration: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  value={newTraining.startDate}
                  onChange={(e) => setNewTraining({ ...newTraining, startDate: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe what you'll learn..."
                  value={newTraining.description}
                  onChange={(e) => setNewTraining({ ...newTraining, description: e.target.value })}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Training</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Play className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planned</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.planned}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search training..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedStatus} onValueChange={(value: TrainingStatus | "all") => setSelectedStatus(value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="planned">Planned</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Training Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTraining.length > 0 ? (
          filteredTraining.map((item) => {
            const StatusIcon = () => getStatusIcon(item.status);
            
            return (
              <Card key={item.id} className="aris-card hover:shadow-elevated transition-aris">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <StatusIcon />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                        <CardDescription className="mt-1">{item.provider}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(item.status)}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTraining(item.id, item.title)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium">{item.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{item.duration} hours</p>
                    </div>
                  </div>
                  
                  {item.startDate && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-medium">
                        {new Date(item.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  {item.description && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Description</p>
                      <p className="text-xs">{item.description}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Select
                      value={item.status}
                      onValueChange={(value: TrainingStatus) => handleStatusChange(item.id, value)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {item.certificateUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer">
                          <Award className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No training found. Add your first training to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}