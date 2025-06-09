'use client';

import { Button } from '@/components/ui/button';
import {  Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface AIProps {
  input: string; // The sample text to send to AI
  onAiGenerate: (pattern: string) => void; // Callback to pass the AI-generated pattern back
  disabled?: boolean; // Optional prop to disable the button
}

const AI: React.FC<AIProps> = ({ input, onAiGenerate, disabled = false }) => {
  const [loading, setLoading] = useState(false);

  const handleAIGeneration = async () => {
    if (!input.trim()) {
      toast.info('Please provide some sample text for AI generation.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }), // Send the input text
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch AI regex.');
      }

      const data = await response.json();
      const aiGeneratedPattern = data.pattern; // Expecting { pattern: "..." }

      if (aiGeneratedPattern) {
        onAiGenerate(aiGeneratedPattern); // Pass the pattern to the parent
        toast.success('AI generated regex pattern!');
      } else {
        toast.error('AI did not return a valid pattern.');
      }
    } catch (error: any) {
      console.error('Error in AI regex generation:', error);
      toast.error(error.message || 'Error generating AI regex. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      className="w-6  bg-black h-6 ml-2"
      variant='default'

      onClick={handleAIGeneration}
      disabled={loading || disabled || !input.trim()} // Disable if no input
      title="Generate Regex with AI"
    >
      {loading ? (
        <Sparkles className="w-4 h-4 animate-pulse" />
      ) : (
        <Sparkles className="w-4 text-white h-4" />
      )}
    </Button>
  );
};

export default AI;