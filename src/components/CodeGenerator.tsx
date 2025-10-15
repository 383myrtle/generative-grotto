import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Code } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-code", {
        body: { prompt },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setGeneratedCode(data.code);
      toast.success("Code generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Textarea
          placeholder="Enter your prompt... (e.g., Create a React component for a todo list)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] bg-card border-border focus:border-primary transition-colors"
        />
        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Code className="mr-2 h-4 w-4" />
              Generate Code
            </>
          )}
        </Button>
      </div>

      {generatedCode && (
        <Card className="p-6 bg-card border-border animate-in fade-in-50 duration-500">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Generated Code
          </h3>
          <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">{generatedCode}</code>
          </pre>
        </Card>
      )}
    </div>
  );
};
