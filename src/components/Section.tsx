import {CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {Task} from "@/components/Task.tsx";
import {SectionData} from "@/types.ts";
import {AddTaskDialog} from "@/components/AddTaskDialog.tsx";

type SectionProps = SectionData;

export const Section = ({ id, name, tasks }: SectionProps) => {
  return (
    <div className="w-96">
      <CardHeader className="flex flex-row py-2 justify-between items-center px-0">
        <CardTitle>{name}</CardTitle>
        <AddTaskDialog sectionId={id} />
      </CardHeader>

      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 h-full">
            {tasks.map((x, index) => (
              <Draggable key={x.id} draggableId={x.id} index={index}>
                {(provided2) => (
                  <div>
                    <div
                      ref={provided2.innerRef}
                      {...provided2.dragHandleProps}
                      {...provided2.draggableProps}>
                      <Task data={x} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}