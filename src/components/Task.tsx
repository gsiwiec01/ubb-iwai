import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {forwardRef, HTMLAttributes} from "react";
import {TaskData} from "@/types.ts";
import {useToDo} from "@/hooks/useToDo.ts";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "lucide-react";

type TaskProps = HTMLAttributes<HTMLDivElement> & {
  data: TaskData
};

export const Task = forwardRef<
  HTMLDivElement,
  TaskProps
>(({data, ...props}, ref) => {
  const {dispatch} = useToDo();

  const switchTask = () => {
    dispatch({action: 'switchTask', payload: data.id});
  }

  return (
    <Card ref={ref} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Checkbox onCheckedChange={switchTask} checked={data.isFinished} className="mr-1"/>

          {data.name}
        </CardTitle>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Badge>{data.daily ? "Daily" : "Zwykły"}</Badge>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => dispatch({action: 'deleteTask', payload: data.id})}
        ><Trash className="h-4, w-4"/></Button>
      </CardFooter>
    </Card>
  )
});