import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, FileText, BarChart3, TrendingUp, Users, Award } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

const Reports = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState("skills-overview");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date()
  });

  const reportTypes = [
    { value: "skills-overview", label: "Skills Overview Report" },
    { value: "certifications", label: "Certifications Report" },
    { value: "training-progress", label: "Training Progress Report" },
    { value: "skills-gap", label: "Skills Gap Analysis Report" },
    { value: "team-performance", label: "Team Performance Report" },
    { value: "compliance", label: "Compliance Report" }
  ];

  const recentReports = [
    {
      id: 1,
      title: "Q4 Skills Assessment",
      type: "Skills Overview",
      generatedDate: "2024-01-15",
      status: "completed",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Certification Compliance",
      type: "Compliance",
      generatedDate: "2024-01-10",
      status: "completed",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Training ROI Analysis",
      type: "Training Progress",
      generatedDate: "2024-01-08",
      status: "processing",
      downloadUrl: "#"
    },
    {
      id: 4,
      title: "Skills Gap Q4",
      type: "Skills Gap",
      generatedDate: "2024-01-05",
      status: "completed",
      downloadUrl: "#"
    }
  ];

  const reportMetrics = {
    totalEmployees: 156,
    skillsTracked: 42,
    certificationsDue: 23,
    trainingHours: 1240,
    completionRate: 87,
    avgSkillLevel: 3.2
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation Started",
      description: `Generating ${reportTypes.find(r => r.value === selectedReport)?.label}...`,
    });
  };

  const handleDownloadReport = (reportTitle: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${reportTitle}...`,
    });
  };

  const handleScheduleReport = () => {
    toast({
      title: "Report Scheduled",
      description: "Weekly automated report has been scheduled.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate comprehensive reports on skills, training, and team performance</p>
        </div>
        <Button onClick={handleScheduleReport} variant="outline">
          Schedule Reports
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportMetrics.totalEmployees}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportMetrics.skillsTracked}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certs Due</CardTitle>
            <Badge variant="destructive">{reportMetrics.certificationsDue}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportMetrics.certificationsDue}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Hrs</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportMetrics.trainingHours}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportMetrics.completionRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Level</CardTitle>
            <Badge variant="secondary">{reportMetrics.avgSkillLevel}/5</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportMetrics.avgSkillLevel}</div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create custom reports with specific date ranges and filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range || {from: undefined, to: undefined})}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button onClick={handleGenerateReport} className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Report Preview */}
          <div className="border rounded-lg p-4 bg-muted/50">
            <h3 className="font-semibold mb-2">Report Preview</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {reportTypes.find(r => r.value === selectedReport)?.label} covering the period from{" "}
              {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "start date"} to{" "}
              {dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : "end date"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-background rounded">
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Total Records</p>
              </div>
              <div className="text-center p-3 bg-background rounded">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Data Points</p>
              </div>
              <div className="text-center p-3 bg-background rounded">
                <p className="text-2xl font-bold">PDF</p>
                <p className="text-xs text-muted-foreground">Export Format</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Access and download previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {report.type} • Generated on {format(new Date(report.generatedDate), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                  {report.status === "completed" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadReport(report.title)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;