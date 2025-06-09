import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Book, BookIcon, BookImageIcon, EditIcon } from "lucide-react";

const ExplainationTooltip=({pattern}:any)=>{
const explain = (pattern: string) => {
  if (!pattern) return "No pattern yet";

  return pattern
    .replace(/\./g, "any character")
    .replace(/\*/g, "zero or more times")
    .replace(/\+/g, "one or more times")
    .replace(/\?/g, "zero or one time (optional)")
    .replace(/\\d/g, "a digit")
    .replace(/\\w/g, "a word character")
    .replace(/\\s/g, "a whitespace character")
    .replace(/\^/g, "start of string")
    .replace(/\$/g, "end of string")
    .replace(/\\u/g, "a unicode character")
    .replace(/\[a-z\]/g, "any character from a to z")
    .replace(/\[A-Z\]/g, "any character from uppercase A to Z")
    .replace(/\[0-9\]/g, "any digit from 0 to 9")
    .replace(/\|/g, "or")
    .replace(/\[A-Za-z0-9\]/g, "any uppercase or lowercase letter or digit (alphanumeric)")

    .replace(/\(\?:([^)]+)\)/g, "a non-capturing group for '$1'")
    .replace(/\(\?=([^)]+)\)/g, "a positive lookahead for '$1'")
    .replace(/\(\?!([^)]+)\)/g, "a negative lookahead for '$1'");
};

        return(
            <Card>
          <CardHeader className="text-lg font-bold flex gap-3 items-center">Explaination <EditIcon/></CardHeader>
           <CardContent className="text-muted-foreground">
        {explain(pattern)}
      </CardContent>
            </Card>
        )
    }
export default ExplainationTooltip;
    