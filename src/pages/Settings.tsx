import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Database, Palette, Globe, Save, Upload, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { toast } = useToast();
  const { user, logout } = useApp();
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState({
    skillUpdates: true,
    trainingReminders: true,
    certificationAlerts: true,
    weeklyReports: false,
    teamUpdates: true
  });

  const [profile, setProfile] = useState({
    name: user?.name || "Priya Sharma",
    email: user?.email || "priya.sharma@company.com",
    title: "Senior Software Engineer",
    department: "Engineering",
    phone: "+91 98765 43210",
    timezone: "IST"
  });

  const [systemSettings, setSystemSettings] = useState({
    language: "en",
    dateFormat: "dd/mm/yyyy",
    theme: "system",
    dataRetention: "1year",
    analyticsTracking: true,
    autoBackup: true,
    betaFeatures: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    profileVisibility: true,
    skillsVisibility: true,
    trainingProgressVisibility: false,
    twoFactorAuth: false,
    twoFactorEnabled: false,
    sessionTimeout: "8hours",
    loginNotifications: true,
    dataExport: true
  });

  const [integrations, setIntegrations] = useState({
    slack: false,
    teams: true,
    jira: false,
    lms: false
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('aris-notifications');
    const savedProfile = localStorage.getItem('aris-profile');
    const savedSystemSettings = localStorage.getItem('aris-system-settings');
    const savedSecuritySettings = localStorage.getItem('aris-security-settings');
    const savedIntegrations = localStorage.getItem('aris-integrations');

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    if (savedSystemSettings) {
      setSystemSettings(JSON.parse(savedSystemSettings));
    }
    if (savedSecuritySettings) {
      setSecuritySettings(JSON.parse(savedSecuritySettings));
    }
    if (savedIntegrations) {
      setIntegrations(JSON.parse(savedIntegrations));
    }
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('aris-profile', JSON.stringify(profile));
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    localStorage.setItem('aris-notifications', JSON.stringify(notifications));
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSaveSystemSettings = () => {
    localStorage.setItem('aris-system-settings', JSON.stringify(systemSettings));
    toast({
      title: "System Settings Updated",
      description: "Your system preferences have been saved.",
    });
  };

  const handleSaveSecuritySettings = () => {
    localStorage.setItem('aris-security-settings', JSON.stringify(securitySettings));
    toast({
      title: "Security Settings Updated",
      description: "Your security preferences have been saved.",
    });
  };

  const handleResetToDefaults = () => {
    // Reset all settings to defaults
    setNotifications({
      skillUpdates: true,
      trainingReminders: true,
      certificationAlerts: true,
      weeklyReports: false,
      teamUpdates: true
    });
    
    setSystemSettings({
      language: "en",
      dateFormat: "dd/mm/yyyy",
      theme: "system",
      dataRetention: "1year",
      analyticsTracking: true,
      autoBackup: true,
      betaFeatures: false
    });

    setSecuritySettings({
      profileVisibility: true,
      skillsVisibility: true,
      trainingProgressVisibility: false,
      twoFactorAuth: false,
      twoFactorEnabled: false,
      sessionTimeout: "8hours",
      loginNotifications: true,
      dataExport: true
    });

    // Clear localStorage
    localStorage.removeItem('aris-notifications');
    localStorage.removeItem('aris-system-settings');
    localStorage.removeItem('aris-security-settings');

    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  const handleUploadAvatar = () => {
    // In a real implementation, this would open a file picker and upload the image
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Here you would typically upload to a server and get a URL back
        toast({
          title: "Avatar Updated",
          description: `Profile picture "${file.name}" has been uploaded successfully.`,
        });
      }
    };
    input.click();
  };

  const handleChangePassword = () => {
    toast({
      title: "Password Change",
      description: "Password change functionality would redirect to a secure password change form.",
    });
  };

  const handleEnable2FA = () => {
    setSecuritySettings({...securitySettings, twoFactorEnabled: !securitySettings.twoFactorEnabled});
    handleSaveSecuritySettings();
    toast({
      title: securitySettings.twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: securitySettings.twoFactorEnabled 
        ? "Two-factor authentication has been disabled." 
        : "Two-factor authentication has been enabled for your account.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleIntegrationToggle = (integration: keyof typeof integrations) => {
    const newIntegrations = {
      ...integrations,
      [integration]: !integrations[integration]
    };
    setIntegrations(newIntegrations);
    
    // Save to localStorage
    localStorage.setItem('aris-integrations', JSON.stringify(newIntegrations));
    
    toast({
      title: `${integration.toUpperCase()} ${newIntegrations[integration] ? 'Connected' : 'Disconnected'}`,
      description: `${integration.toUpperCase()} integration has been ${newIntegrations[integration] ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and system configuration</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleResetToDefaults} variant="outline">
            Reset to Defaults
          </Button>
          <Button onClick={handleLogout} variant="destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=80&h=80&fit=crop&crop=face" />
                  <AvatarFallback className="text-lg">PS</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.title}</p>
                  <Button onClick={handleUploadAvatar} variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    value={profile.title}
                    onChange={(e) => setProfile({...profile, title: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={profile.department} onValueChange={(value) => setProfile({...profile, department: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Analytics">Data & Analytics</SelectItem>
                      <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                      <SelectItem value="DevOps">DevOps & Infrastructure</SelectItem>
                      <SelectItem value="Human Resources">Human Resources</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={profile.timezone} onValueChange={(value) => setProfile({...profile, timezone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="CST">Central Time (CST)</SelectItem>
                      <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="CET">Central European Time (CET)</SelectItem>
                      <SelectItem value="JST">Japan Standard Time (JST)</SelectItem>
                      <SelectItem value="AEST">Australian Eastern Time (AEST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose which notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="skillUpdates" className="text-base font-medium">Skill Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified when employees update their skills</p>
                  </div>
                  <Switch 
                    id="skillUpdates"
                    checked={notifications.skillUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, skillUpdates: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="trainingReminders" className="text-base font-medium">Training Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders for upcoming training sessions</p>
                  </div>
                  <Switch 
                    id="trainingReminders"
                    checked={notifications.trainingReminders}
                    onCheckedChange={(checked) => setNotifications({...notifications, trainingReminders: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="certificationAlerts" className="text-base font-medium">Certification Alerts</Label>
                    <p className="text-sm text-muted-foreground">Alerts for expiring certifications</p>
                  </div>
                  <Switch 
                    id="certificationAlerts"
                    checked={notifications.certificationAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, certificationAlerts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyReports" className="text-base font-medium">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly skills and training summaries</p>
                  </div>
                  <Switch 
                    id="weeklyReports"
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="teamUpdates" className="text-base font-medium">Team Updates</Label>
                    <p className="text-sm text-muted-foreground">Updates about your team's progress and achievements</p>
                  </div>
                  <Switch 
                    id="teamUpdates"
                    checked={notifications.teamUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, teamUpdates: checked})}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="aris-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">Last changed 3 months ago</p>
                  <Button variant="outline" onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      <Badge variant={securitySettings.twoFactorEnabled ? "default" : "outline"} className="mt-2">
                        {securitySettings.twoFactorEnabled ? "Enabled" : "Not Enabled"}
                      </Badge>
                    </div>
                    <Button variant="outline" onClick={handleEnable2FA}>
                      {securitySettings.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Login Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage your active login sessions</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Current session (Chrome on Windows)</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Mobile app (Android)</span>
                      <Badge variant="secondary">2 hours ago</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">Manage Sessions</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Privacy Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Profile visibility to team members</span>
                      <Switch 
                        checked={securitySettings.profileVisibility}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, profileVisibility: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Skills visibility in reports</span>
                      <Switch 
                        checked={securitySettings.skillsVisibility}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, skillsVisibility: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Training progress visibility</span>
                      <Switch 
                        checked={securitySettings.trainingProgressVisibility}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, trainingProgressVisibility: checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSecuritySettings} className="aris-gradient">
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="aris-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Preferences
              </CardTitle>
              <CardDescription>
                Configure system-wide settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select value={systemSettings.language} onValueChange={(value) => setSystemSettings({...systemSettings, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select value={systemSettings.dateFormat} onValueChange={(value) => setSystemSettings({...systemSettings, dateFormat: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY (Indian)</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY (US)</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (ISO)</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={systemSettings.theme} onValueChange={(value) => setSystemSettings({...systemSettings, theme: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data Retention</Label>
                  <Select value={systemSettings.dataRetention} onValueChange={(value) => setSystemSettings({...systemSettings, dataRetention: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 Months</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="font-semibold">Advanced Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enable analytics tracking</span>
                    <Switch 
                      checked={systemSettings.analyticsTracking}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, analyticsTracking: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-backup settings</span>
                    <Switch 
                      checked={systemSettings.autoBackup}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoBackup: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Beta features access</span>
                    <Switch 
                      checked={systemSettings.betaFeatures}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, betaFeatures: checked})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSystemSettings} className="aris-gradient">
                  <Save className="h-4 w-4 mr-2" />
                  Save System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="aris-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Third-party Integrations
              </CardTitle>
              <CardDescription>
                Connect ARIS with external tools and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Slack</h3>
                      <p className="text-sm text-muted-foreground">Team notifications and updates</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Connected</Badge>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Database className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Google Workspace</h3>
                      <p className="text-sm text-muted-foreground">Calendar and email integration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Not Connected</Badge>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Database className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Microsoft Teams</h3>
                      <p className="text-sm text-muted-foreground">Team collaboration and meetings</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Not Connected</Badge>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <Database className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">JIRA</h3>
                      <p className="text-sm text-muted-foreground">Project management and issue tracking</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Available</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleIntegrationToggle('jira')}
                    >
                      {integrations.jira ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                      <Database className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Learning Management System</h3>
                      <p className="text-sm text-muted-foreground">Course content and progress sync</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Available</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleIntegrationToggle('lms')}
                    >
                      {integrations.lms ? 'Disconnect' : 'Connect'}
                    </Button>
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

export default Settings;