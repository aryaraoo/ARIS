import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Users, Search, Filter, UserPlus, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TeamOverview = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Developer",
      department: "Engineering",
      skillsCount: 15,
      certifications: 3,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      skillsProgress: 85,
      status: "active"
    },
    {
      id: 2,
      name: "Emily Davis",
      role: "UX Designer",
      department: "Design",
      skillsCount: 12,
      certifications: 2,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=32&h=32&fit=crop&crop=face",
      skillsProgress: 78,
      status: "active"
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "Data Analyst",
      department: "Analytics",
      skillsCount: 18,
      certifications: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      skillsProgress: 92,
      status: "training"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      role: "Product Manager",
      department: "Product",
      skillsCount: 10,
      certifications: 1,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      skillsProgress: 65,
      status: "active"
    }
  ];

  const handleAddEmployee = () => {
    toast({
      title: "Add Employee",
      description: "Opening employee registration form...",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Team data is being exported to CSV...",
    });
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Skills per Employee</CardTitle>
            <Badge variant="secondary">13.8</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">+1.2 from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Training</CardTitle>
            <Badge variant="default">6</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">employees in training</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Skill Level</CardTitle>
            <Badge variant="outline">78%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">average proficiency</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>View and manage individual employee profiles</CardDescription>
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
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">{member.skillsCount}</p>
                    <p className="text-xs text-muted-foreground">Skills</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{member.certifications}</p>
                    <p className="text-xs text-muted-foreground">Certs</p>
                  </div>
                  <div className="w-24">
                    <Progress value={member.skillsProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">{member.skillsProgress}% proficient</p>
                  </div>
                  <Badge variant={member.status === "active" ? "default" : "secondary"}>
                    {member.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamOverview;