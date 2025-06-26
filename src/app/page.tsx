import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="p-4">
    <div className="flex flex-col gap-y-4">
      <div>
        <Button variant="elevated">
          iam a button
        </Button>
      </div>
      <div>
        <input placeholder="IAm a Input"/>
      </div>
      <div>
        <Progress value={50}></Progress>
        </div>
        <div>
          <Textarea value="Iam a Text area"></Textarea>
        </div>
        <div>
          <Checkbox></Checkbox>
        </div>
      </div>
    </div>
    
  );
};
