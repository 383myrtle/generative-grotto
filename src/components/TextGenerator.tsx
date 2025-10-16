import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const TextGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("neutral");
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
        body: { prompt, style },
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
        <div className="space-y-2">
          <Label>Writing Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          placeholder="Enter your prompt... (e.g., Write a short story about space exploration)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] bg-card border-border focus:border-primary transition-colors"
        />
        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              GENERATING...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              GENERATE_TEXT
            </>
          )}
        </Button>
      </div>

      {generatedText && (
        <Card className="p-6 border-border">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            Generated_Text
          </h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-sm whitespace-pre-wrap">{generatedText}</p>
          </div>
        </Card>
      )}
    </div>
  );
};
