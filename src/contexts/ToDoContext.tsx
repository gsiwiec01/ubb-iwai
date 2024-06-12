import {createContext, Dispatch, ReactNode, useReducer} from "react";
import {SectionData, TaskData} from "@/types.ts";
import {DraggableLocation} from "react-beautiful-dnd";
import {v4} from "uuid";

type AddSectionAction = { action: "addSection", payload: string };
type AddTask = { action: "addTask", payload: { section: string, data: Omit<TaskData, 'id'> } };
type MoveTask = { action: "moveTask", payload: { source: DraggableLocation, destination: DraggableLocation } };
type SwitchTask = { action: "switchTask", payload: string };
type DeleteTask = { action: "deleteTask", payload: string };
type ResetDail = { action: "resetDaily", payload?: undefined };
type Actions = AddSectionAction | AddTask | MoveTask | SwitchTask | DeleteTask | ResetDail;

type ToDoContextData = {
  data: SectionData[];
  dispatch: Dispatch<Actions>;
}

export const ToDoContext = createContext<ToDoContextData>({} as ToDoContextData);


const reducer = (state: SectionData[], {action, payload}: Actions) => {
  switch (action) {
    case "addSection": {
      const section: SectionData = {
        id: v4(),
        name: payload,
        tasks: []
      }

      return [...state, section];
    }

    case "addTask": {
      const newState = [...state];

      const sectionIndex = newState.findIndex(x => x.id == payload.section);
      if (sectionIndex >= 0) {
        const newTask = {
          id: v4(),
          ...payload.data
        }

        newState[sectionIndex].tasks.unshift(newTask);
      }

      return newState;
    }

    case "moveTask": {
      const {source, destination} = payload;
      const newState = [...state];

      const sourceSection = newState.find(x => x.id === source.droppableId);
      const destinationSection = newState.find(x => x.id === destination.droppableId);
      if (!sourceSection || !destinationSection) return state;

      const [removed] = sourceSection.tasks.splice(source.index, 1);
      destinationSection.tasks.splice(destination.index, 0, removed);

      return newState;
    }

    case "switchTask": {
      const newState = [...state];

      let foundTask: TaskData | null = null;
      for (const section of newState ){
        const task = section.tasks.find(t => t.id == payload);
        if (task) foundTask = task;
      }

      if (!foundTask) return state;

      foundTask.isFinished = !foundTask.isFinished;

      return newState;
    }

    case "deleteTask": {
        const newState = [...state];

        let sectionIndex: number | null = null;
        let taskIndex: number | null = null;

        for (let i = 0; i < newState.length; i++) {
          const task = newState[i].tasks.findIndex(t => t.id == payload);
          if (task >= 0) {
            sectionIndex = i;
            taskIndex = task;
            break;
          }
        }

        if (sectionIndex === null || taskIndex === null) return state;
        newState[sectionIndex].tasks.splice(taskIndex, 1);

        return newState;
      }

    case "resetDaily": {
      const newState = [...state];

      newState.forEach(section => {
        section.tasks.forEach(task => {
          if (task.daily) {
            task.isFinished = false;
          }
        })
      });

      return newState;
    }
  }

  return state;
}

type ToDoProviderProps = {
  children: ReactNode;
}

export const ToDoProvider = ({ children }: ToDoProviderProps) => {
  const [data, dispatch] = useReducer(reducer, []);

  return (
    <ToDoContext.Provider value={{ data, dispatch }}>
      {children}
    </ToDoContext.Provider>
  )
}