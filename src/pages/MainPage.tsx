import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {DragDropContext, OnDragEndResponder} from "react-beautiful-dnd";
import {Section} from "@/components/Section.tsx";
import {AddSectionDialog} from "@/components/AddSectionDialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useToDo} from "@/hooks/useToDo.ts";

function MainPage() {
  const {data, dispatch} = useToDo();

  const onDragEnd: OnDragEndResponder = ({source, destination}) => {
    if (!destination) return;

    dispatch({
      action: "moveTask",
      payload: {
        source,
        destination
      }
    });
  }

  return (
    <div className='container space-y-6 mt-6'>
      <div className="flex justify-end items-center space-x-2">
        <Button
          variant="ghost"
          onClick={() => dispatch({action: 'resetDaily'})}
        >Reset daily</Button>

        <AddSectionDialog/>
      </div>

      <ScrollArea className="w-full h-full min-h-96">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="w-full bg-secondary p-2 space-x-6 rounded-lg flex h-full">

            {data.length == 0 && (
              <div className="text-center w-full">Brak sekcji</div>
            )}

            {data.map(x => (
              <Section key={x.id} {...x} />
            ))}
          </div>
        </DragDropContext>

        <ScrollBar orientation="horizontal"/>
      </ScrollArea>
    </div>
  )
}

export default MainPage
