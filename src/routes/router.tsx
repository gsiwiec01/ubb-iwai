import {createBrowserRouter} from "react-router-dom";
import {Layout} from "@/Layout.tsx";
import MainPage from "@/pages/MainPage.tsx";
import {ErrorPage} from "@/pages/ErrorPage.tsx";
import {Subsite1} from "@/pages/Subsite1.tsx";
import {Subsite2} from "@/pages/Subsite2.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: 'subsite-1',
        element: <Subsite1 />
      },
      {
        path: 'subsite-2',
        element: <Subsite2 />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
]);