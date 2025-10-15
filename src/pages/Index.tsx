import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextGenerator } from "@/components/TextGenerator";
import { ImageGenerator } from "@/components/ImageGenerator";
import { CodeGenerator } from "@/components/CodeGenerator";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30 animate-pulse-slow" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AI Content Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate text, images, or code with the power of AI. Simply enter your prompt and let artificial intelligence create for you.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border">
              <TabsTrigger 
                value="text" 
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
              >
                Text
              </TabsTrigger>
              <TabsTrigger 
                value="image"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
              >
                Image
              </TabsTrigger>
              <TabsTrigger 
                value="code"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
              >
                Code
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-6">
              <TextGenerator />
            </TabsContent>
            
            <TabsContent value="image" className="space-y-6">
              <ImageGenerator />
            </TabsContent>
            
            <TabsContent value="code" className="space-y-6">
              <CodeGenerator />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-muted-foreground">
          <p className="text-sm">Powered by Lovable Cloud & AI</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
