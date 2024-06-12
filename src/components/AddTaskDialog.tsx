import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {PlusIcon} from "lucide-react"
import {Switch} from "@/components/ui/switch.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useToDo} from "@/hooks/useToDo.ts";

export type AddTaskDialogProps = {
  sectionId: string
}

export const AddTaskDialog = ({sectionId}: AddTaskDialogProps) => {
  const {dispatch} = useToDo();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [taskName, setSectionName] = useState<string>('');
  const [isDaily, setIsDaily] = useState<boolean>(false);

  const handleSubmit = () => {
    dispatch({
      action: 'addTask',
      payload: {
        section: sectionId,
        data: {
          name: taskName,
          daily: isDaily,
          isFinished: false,
        }
      }
    });

    setIsOpen(false);
    setSectionName('');
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon-sm"><PlusIcon/></Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie nowego zadania</DialogTitle>
          <DialogDescription>
            Wprowadź poniżej nazwę nowego zadania
          </DialogDescription>
        </DialogHeader>

        <Input placeholder="Nazwa" onChange={e => setSectionName(e.target.value)}/>

        <div className="flex items-center space-x-2">
          <Switch id="s-daily" onCheckedChange={setIsDaily} checked={isDaily} />
          <Label htmlFor="is-daily">Zadanie codzienne</Label>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Dodaj</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}