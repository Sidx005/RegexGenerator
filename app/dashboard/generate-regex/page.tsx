'use client';
import React from 'react';
import AI from '@/components/ui/AI'; // Ensure this import path is correct
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCheck, Copy } from 'lucide-react';
import { useMemo, useState, useCallback } from 'react'; // Added useCallback
import { toast } from 'sonner';

// Added 'ai' to the Mode type
type Mode = 'emails' | 'numbers' | 'words' | 'ai';
const defaultInputs: Record<Mode, string> = {
  emails: 'contact@example.com\ninfo@test.org\nuser123@mail.com',
  numbers: 'Order #12345\nInvoice 67890\nPrice: 45',
  words: 'This is a test input. Test input helps generate regex.',
  ai: 'Match all hashtags like #ReactJS, #WebDev, or #AI!',
};
const GenerateRegex = () => {
  const [mode, setMode] = useState<Mode>('emails');

  const [input, setInput] = useState<string>(defaultInputs[mode ]); // Initialize with default input for the selected mode
  const [flags, setFlags] = useState<string>('g');
  const [copied, setCopied] = useState(false);

  // New state to store the AI-generated pattern
  const [aiResultPattern, setAiResultPattern] = useState<string>('');


  const regexPattern = useMemo(() => {
    // If mode is 'ai' and we have an AI result, display that
    if (mode === 'ai' && aiResultPattern) {
      return `/${aiResultPattern}/${flags}`;
    }
    

    // Otherwise, use the logic for other modes
    if (!input.trim()) return '';

    const emailRegex = '\\b[\\w.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\\b';
    const numberRegex = '\\d+';
    // Logic for 'words' mode - matches all unique words
    const words = [...new Set(input.match(/\b[\w']+\b/g) || [])];
    const wordRegex = words.map((word) =>
      // Escape special regex characters in the word itself
      word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    ).join('|');

    let pattern = '';
    switch (mode) {
      case 'emails':
        pattern = emailRegex;
        
        break;
      case 'numbers':
        pattern = numberRegex;
        break;
      case 'words':
        pattern = wordRegex;
        break;
    }
    return `/${pattern}/${flags}`;
  }, [input, mode, flags, aiResultPattern]); // Depend on aiResultPattern

  const handleAiGeneratedPattern = useCallback((pattern: string) => {
    setAiResultPattern(pattern); 
    setMode('ai');
  }, []);

  const copyRegex = () => {
    // Copy the raw pattern (without slashes and flags)
    const patternToCopy = (mode === 'ai' ? aiResultPattern : regexPattern.slice(1, -1 - flags.length));

    if (patternToCopy) {
      navigator.clipboard.writeText(patternToCopy).then(() => {
        toast.success('Regex copied!');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => toast.error('Failed to copy.'));
    } else {
      toast.info('No regex pattern to copy.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="font-bold text-lg">Regex Generator</h2>
          <p className='text-[10px] text-muted-foreground'>You can also generate Regex using the AI widget after entring sample text by clicking on the AI icon  besides the copy button  </p>

      </CardHeader>
      
      <CardContent className="flex flex-col gap-4">
        
        <div className="space-y-2">
          <Label htmlFor="sample">Sample Text</Label>
          <div className="relative w-full shadow  rounded-md
  before:z-0 after:absolute after:content-[''] after:z-0 
  after:h-full after:w-full after:top-0 after:left-0 after:bg-gradient-to-br after:blur-sm after:from-cyan-300 after:via-yellow-200  after:to-green-500">

  <div className="relative z-10 "> 


       

            <Textarea
              className="h-20 bg-white/90 backdrop-blur-3xl mt-5 z-50 "
              id="sample"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setAiResultPattern(''); // Clear AI result if user edits input
                if (mode === 'ai') setMode('ai'); // Revert to default mode
              }}
              placeholder="Paste or type your sample text here..."
            />
            {/* The Select component for mode selection */}
            <div className="absolute bottom-0 right-0 scale-75">
              <Select
                value={mode}
                onValueChange={(newMode) => {
                  setMode(newMode as Mode);

                  // Clear AI pattern if switching away from AI mode
                  if(newMode=='ai') if(input.trim()) handleAiGeneratedPattern(input)
                  
                    const defaultInput=defaultInputs[newMode as Mode]
                    setInput(defaultInput||'');
                  
                    if (newMode !== 'ai') {
                    setAiResultPattern('');
                  }
                }}
              >
                <SelectTrigger className="w-[200px] bg-white border-2 border-gray-300">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent className='scale-75'>
                  <SelectItem value="emails">Emails</SelectItem>
                  <SelectItem value="numbers">Numbers</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="flags">Flags:</Label>
          <Input
            id="flags"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="gim"
            className="w-24"
          />
        </div>

        {input.trim() && (
          <div className="flex items-center justify-between bg-black text-white p-4 rounded-md font-mono text-sm">
            <code className="break-all">{regexPattern}</code>
            <div className="flex items-center">
              <Button size="sm" className="w-6 h-6" variant={'default'} onClick={copyRegex}>
                {copied ? <CheckCheck /> : <Copy className="w-4 h-4" />}
              </Button>
              <AI
                input={input}
                onAiGenerate={handleAiGeneratedPattern}
               
                disabled={mode === 'ai' && !!aiResultPattern}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GenerateRegex;