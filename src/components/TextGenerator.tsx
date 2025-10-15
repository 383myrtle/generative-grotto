import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const TextGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-text", {
        body: { prompt },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setGeneratedText(data.text);
      toast.success("Text generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Textarea
          placeholder="Enter your prompt... (e.g., Write a short story about space exploration)"
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
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Text
            </>
          )}
        </Button>
      </div>

      {generatedText && (
        <Card className="p-6 bg-card border-border animate-in fade-in-50 duration-500">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Generated Text
          </h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-foreground whitespace-pre-wrap">{generatedText}</p>
          </div>
        </Card>
      )}
    </div>
  );
};
