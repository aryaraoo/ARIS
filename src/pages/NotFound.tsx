import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReportIssue = () => {
    // In a real app, this could open a support ticket or feedback form
    console.log("User reported a broken link:", location.pathname);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md mx-auto aris-card">
        <CardHeader className="text-center">
          <div className="w-20 h-20 rounded-xl aris-gradient flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">!</span>
          </div>
          <CardTitle className="text-6xl font-bold text-muted-foreground mb-2">404</CardTitle>
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Requested URL: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button onClick={handleGoHome} className="w-full aris-gradient">
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
            
            <Button onClick={handleGoBack} variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            
            <Button onClick={handleReportIssue} variant="ghost" className="w-full text-muted-foreground">
              <Search className="h-4 w-4 mr-2" />
              Report Broken Link
            </Button>
          </div>
          
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Need help? Contact support or check our documentation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
