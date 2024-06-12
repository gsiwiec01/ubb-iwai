import ReactDOM from 'react-dom/client'
import './index.css';
import {ToDoProvider} from "@/contexts/ToDoContext.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes/router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ToDoProvider>
    <RouterProvider router={router} />
  </ToDoProvider>
)
