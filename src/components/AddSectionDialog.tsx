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
import {useToDo} from "@/hooks/useToDo.ts";

export const AddSectionDialog = () => {
  const { dispatch } = useToDo();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sectionName, setSectionName] = useState<string>('');

  const handleSubmit = () => {
    dispatch({ action: 'addSection', payload: sectionName });

    setIsOpen(false);
    setSectionName('');
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Dodaj sekcję</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodawanie nowej sekcji</DialogTitle>
          <DialogDescription>
            Wprowadź poniżej nazwę nowej sekcji
          </DialogDescription>
        </DialogHeader>

        <Input placeholder="Nazwa" onChange={e => setSectionName(e.target.value)} />

        <DialogFooter>
          <Button onClick={handleSubmit}>Dodaj</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}