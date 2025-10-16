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
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />

        <main className="flex-1">
          {/* Header */}
          <header className="h-16 flex items-center border-b border-border px-4">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <h1 className="text-xl font-semibold tracking-tight">
                AI_CONTENT_GENERATOR
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm text-muted-foreground mb-8 text-center font-mono">
                &gt; Generate text, images, or code with AI
              </p>
              
              <div className="space-y-6">
                {renderContent()}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-16 text-muted-foreground">
              <p className="text-xs font-mono">// POWERED_BY_LOVABLE_CLOUD</p>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
