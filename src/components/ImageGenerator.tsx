import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt, style },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setImageUrl(data.imageUrl);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Image Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="cartoon">Cartoon</SelectItem>
              <SelectItem value="illustration">Illustration</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
              <SelectItem value="photographic">Photographic</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
              <SelectItem value="3d-render">3D Render</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          placeholder="Enter your prompt... (e.g., A futuristic cityscape at sunset)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-card border-border focus:border-primary transition-colors"
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
              <ImageIcon className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>
      </div>

      {imageUrl && (
        <Card className="p-6 bg-card border-border animate-in fade-in-50 duration-500">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Generated Image
          </h3>
          <img
            src={imageUrl}
            alt="Generated"
            className="w-full rounded-lg shadow-glow-lg"
          />
        </Card>
      )}
    </div>
  );
};
