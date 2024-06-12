import {useContext} from "react";
import {ToDoContext} from "@/contexts/ToDoContext.tsx";

export const useToDo = () => {
  return useContext(ToDoContext);
}