import { useState, useEffect } from "react";
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
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import type { Certification } from "@/types";

export default function Certifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);

  // Store certifications in state
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-15",
      credentialId: "AWS-SAA-2023-06789",
      url: "https://aws.amazon.com/certification/",
      verified: true,
    },
    {
      id: "2",
      name: "React Developer Certification",
      issuer: "Meta",
      issueDate: "2023-08-22",
      expiryDate: "2025-08-22",
      credentialId: "META-REACT-2023-12345",
      verified: true,
    },
    {
      id: "3",
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      issueDate: "2024-01-10",
      expiryDate: "2027-01-10",
      credentialId: "CKA-2024-98765",
      verified: false,
    },
    {
      id: "4",
      name: "Scrum Master Certification",
      issuer: "Scrum Alliance",
      issueDate: "2022-11-05",
      expiryDate: "2024-11-05",
      credentialId: "CSM-2022-54321",
      verified: true,
    },
  ]);

  // Suggested free certifications
  const [suggestedCertifications, setSuggestedCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    // Mock API / Replace with real fetch (Microsoft Learn, Google Cloud, etc.)
    const fetchSuggestedCerts = async () => {
      try {
        const res = await fetch("/mock/free-certs.json"); // <- replace with real API
        const data = await res.json();

        // Filter only recent ones (last 3 months)
        const recent = data.filter((cert: any) => {
          if (!cert.addedDate) return true;
          const addedDate = new Date(cert.addedDate);
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
          return addedDate >= threeMonthsAgo;
        });

        setSuggestedCertifications(recent);
      } catch (error) {
        console.error("Error fetching suggested certifications", error);
      }
    };

    fetchSuggestedCerts();
  }, []);

  // Form state for new certification
  const [form, setForm] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    url: "",
  });

  const filteredCertifications = certifications.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getExpiryStatus = (expiryDate?: string) => {
    if (!expiryDate) return "no-expiry";
    const expiry = new Date(expiryDate);
    const now = new Date();
    const monthsUntilExpiry =
      (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
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
        return (
          <Badge className="bg-warning text-warning-foreground">
            Expires in 6 months
          </Badge>
        );
      case "active":
        return (
          <Badge className="bg-success text-success-foreground">Active</Badge>
        );
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

  const stats = {
    total: certifications.length,
    active: certifications.filter(
      (cert) => getExpiryStatus(cert.expiryDate) === "active"
    ).length,
    expiringSoon: certifications.filter(
      (cert) =>
        getExpiryStatus(cert.expiryDate) === "expiring-soon" ||
        getExpiryStatus(cert.expiryDate) === "expiring-warning"
    ).length,
    expired: certifications.filter(
      (cert) => getExpiryStatus(cert.expiryDate) === "expired"
    ).length,
  };

  // Handle form input change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Add new certification
  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.issuer || !form.issueDate) return;
    setCertifications([
      ...certifications,
      {
        id: (certifications.length + 1).toString(),
        name: form.name,
        issuer: form.issuer,
        issueDate: form.issueDate,
        expiryDate: form.expiryDate || undefined,
        credentialId: form.credentialId || undefined,
        url: form.url || undefined,
        verified: false,
      },
    ]);
    setForm({
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    });
    setIsAddCertOpen(false);
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
            <form className="space-y-4" onSubmit={handleAddCertification}>
              <div className="space-y-2">
                <Label htmlFor="name">Certification Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuer">Issuing Organization</Label>
                <Input
                  id="issuer"
                  value={form.issuer}
                  onChange={handleFormChange}
                  placeholder="e.g., Amazon Web Services"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={form.issueDate}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={form.expiryDate}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credentialId">Credential ID (Optional)</Label>
                <Input
                  id="credentialId"
                  value={form.credentialId}
                  onChange={handleFormChange}
                  placeholder="e.g., AWS-SAA-2023-06789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Verification URL (Optional)</Label>
                <Input
                  id="url"
                  type="url"
                  value={form.url}
                  onChange={handleFormChange}
                  placeholder="https://..."
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
        {filteredCertifications.map((cert) => {
          const expiryStatus = getExpiryStatus(cert.expiryDate);
          const StatusIcon = () => getStatusIcon(expiryStatus);

          return (
            <Card
              key={cert.id}
              className="aris-card hover:shadow-elevated transition-aris"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <StatusIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg leading-tight">
                        {cert.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {cert.issuer}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {getStatusBadge(expiryStatus)}
                    {cert.verified && (
                      <Badge
                        variant="outline"
                        className="text-success border-success"
                      >
                        Verified
                      </Badge>
                    )}
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
                  {cert.url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Suggested Free Certifications */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Suggested Free Certifications</h2>
        {suggestedCertifications.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent free certifications available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedCertifications.map((cert) => (
              <Card key={cert.id} className="aris-card">
                <CardHeader>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <CardDescription>{cert.issuer}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  {cert.url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
