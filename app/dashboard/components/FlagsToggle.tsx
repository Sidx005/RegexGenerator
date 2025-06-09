import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Flag } from 'lucide-react';
import React from 'react'

const FLAGs = ['g', 'i', 'm', 's', 'u'];

/*
g: Global === Finds all matches, not just the first one
i: ignore case === Makes the regex case-insensitive
m: Multiline === Changes the behavior of ^ and $ to match the start and end of each line
s: Dotall === Allows . to match newline characters(\n,\r)
u: Unicode === Treats the pattern as a sequence of Unicode code points
*/

type Props = {
  flags: string;
  setFlags: React.Dispatch<React.SetStateAction<string>>;
};

const FlagsToggle: React.FC<Props> = ({ flags, setFlags }) => {
  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, '') : prev + flag
    );
  };

  return (
    <Card>
      <CardHeader className="flex gap-2 items-center text-lg font-bold ">
        Regex Flags <Flag size={20} />
      </CardHeader>
      <CardContent className="flex gap-4">
        {FLAGs.map((flag) => (
          <div key={flag} className="flex items-center gap-2">
            <Checkbox
              checked={flags.includes(flag)}
              onCheckedChange={() => toggleFlag(flag)}
            />
            <label htmlFor="">{flag}</label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FlagsToggle;
