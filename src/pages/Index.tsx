import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 rounded-xl aris-gradient flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">A</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">ARIS</h1>
        <p className="text-xl text-muted-foreground">AI Resource Intelligence System</p>
        <p className="text-sm text-muted-foreground mt-2">Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
