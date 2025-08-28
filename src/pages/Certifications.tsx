import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Search,
  ExternalLink,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
} from "lucide-react";
import type { Certification } from "@/types";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

export default function Certifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [newCert, setNewCert] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    url: "",
  });

  const { certifications, addCertification, deleteCertification } = useApp();
  const { toast } = useToast();

  const filteredCertifications = certifications.filter((cert) =>
    cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getExpiryStatus = (expiryDate?: string) => {
    if (!expiryDate) return "no-expiry";
    
    const expiry = new Date(expiryDate);
    const now = new Date();
    const monthsUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (monthsUntilExpiry < 0) return "expired";
    if (monthsUntilExpiry < 3) return "expiring-soon";
    if (monthsUntilExpiry < 6) return "expiring-warning";
    return "active";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "expiring-soon":
        return <Badge variant="destructive">Expires Soon</Badge>;
      case "expiring-warning":
        return <Badge className="bg-warning text-warning-foreground">Expires in 6 months</Badge>;
      case "active":
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case "no-expiry":
        return <Badge variant="secondary">No Expiry</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "expiring-soon":
        return <Clock className="h-4 w-4 text-destructive" />;
      case "expiring-warning":
        return <Clock className="h-4 w-4 text-warning" />;
      case "active":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Award className="h-4 w-4 text-primary" />;
    }
  };

  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCert.name || !newCert.issuer || !newCert.issueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addCertification({
      name: newCert.name,
      issuer: newCert.issuer,
      issueDate: newCert.issueDate,
      expiryDate: newCert.expiryDate || undefined,
      credentialId: newCert.credentialId || undefined,
      url: newCert.url || undefined,
      verified: false,
    });

    toast({
      title: "Success",
      description: `${newCert.name} certification added successfully!`,
    });

    setNewCert({
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    });
    setIsAddCertOpen(false);
  };

  const handleDeleteCertification = (certId: string, certName: string) => {
    deleteCertification(certId);
    toast({
      title: "Certification Removed",
      description: `${certName} has been removed from your certifications`,
    });
  };

  const stats = {
    total: certifications.length,
    active: certifications.filter(cert => getExpiryStatus(cert.expiryDate) === "active").length,
    expiringSoon: certifications.filter(cert => 
      getExpiryStatus(cert.expiryDate) === "expiring-soon" || 
      getExpiryStatus(cert.expiryDate) === "expiring-warning"
    ).length,
    expired: certifications.filter(cert => getExpiryStatus(cert.expiryDate) === "expired").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Certifications</h1>
          <p className="text-muted-foreground mt-2">
            Manage your professional certifications and credentials
          </p>
        </div>
        
        <Dialog open={isAddCertOpen} onOpenChange={setIsAddCertOpen}>
          <DialogTrigger asChild>
            <Button className="aris-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Certification</DialogTitle>
              <DialogDescription>
                Add a professional certification to your profile
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCertification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="certName">Certification Name *</Label>
                <Input 
                  id="certName" 
                  placeholder="e.g., AWS Certified Solutions Architect" 
                  value={newCert.name}
                  onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issuer">Issuing Organization *</Label>
                <Input 
                  id="issuer" 
                  placeholder="e.g., Amazon Web Services" 
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date *</Label>
                  <Input 
                    id="issueDate" 
                    type="date" 
                    value={newCert.issueDate}
                    onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                  <Input 
                    id="expiryDate" 
                    type="date" 
                    value={newCert.expiryDate}
                    onChange={(e) => setNewCert({ ...newCert, expiryDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="credentialId">Credential ID (Optional)</Label>
                <Input 
                  id="credentialId" 
                  placeholder="e.g., AWS-SAA-2023-06789" 
                  value={newCert.credentialId}
                  onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="certUrl">Verification URL (Optional)</Label>
                <Input 
                  id="certUrl" 
                  type="url" 
                  placeholder="https://..." 
                  value={newCert.url}
                  onChange={(e) => setNewCert({ ...newCert, url: e.target.value })}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddCertOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="aris-gradient">
                  Add Certification
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
            <CardTitle className="text-sm font-medium">Total Certifications</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.active}</div>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.expiringSoon}</div>
          </CardContent>
        </Card>

        <Card className="aris-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.expired}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search certifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCertifications.length > 0 ? (
          filteredCertifications.map((cert) => {
            const expiryStatus = getExpiryStatus(cert.expiryDate);
            const StatusIcon = () => getStatusIcon(expiryStatus);
            
            return (
              <Card key={cert.id} className="aris-card hover:shadow-elevated transition-aris">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <StatusIcon />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight">{cert.name}</CardTitle>
                        <CardDescription className="mt-1">{cert.issuer}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(expiryStatus)}
                      {cert.verified && (
                        <Badge variant="outline" className="text-success border-success">
                          Verified
                        </Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCertification(cert.id, cert.name)}
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
                      <p className="text-muted-foreground">Issued</p>
                      <p className="font-medium">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                    {cert.expiryDate && (
                      <div>
                        <p className="text-muted-foreground">Expires</p>
                        <p className="font-medium">
                          {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {cert.credentialId && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Credential ID</p>
                      <p className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {cert.credentialId}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Renew
                    </Button>
                    {cert.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={cert.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
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
            <p className="text-muted-foreground">No certifications found. Add your first certification to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}