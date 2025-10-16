import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TextGenerator } from "@/components/TextGenerator";
import { ImageGenerator } from "@/components/ImageGenerator";
import { CodeGenerator } from "@/components/CodeGenerator";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [activeView, setActiveView] = useState("text");

  const renderContent = () => {
    switch (activeView) {
      case "text":
        return <TextGenerator />;
      case "image":
        return <ImageGenerator />;
      case "code":
        return <CodeGenerator />;
      default:
        return <TextGenerator />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-radial opacity-30 animate-pulse-slow" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />

        <main className="flex-1 relative z-10">
          {/* Header with trigger */}
          <header className="h-16 flex items-center border-b border-border/50 px-4 backdrop-blur-sm">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Content Generator
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground mb-8 text-center">
                Generate text, images, or code with the power of AI. Simply enter your prompt and let artificial intelligence create for you.
              </p>
              
              <div className="space-y-6">
                {renderContent()}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-16 text-muted-foreground">
              <p className="text-sm">Powered by Lovable Cloud & AI</p>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
