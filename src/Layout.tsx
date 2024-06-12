import {Outlet} from "react-router-dom";
import { Link } from "react-router-dom"

import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export const Layout = () => {
  return (
    <>
      <div className="border-b mb-4">
        <div className="flex h-16 items-center px-10 gap-10">
          ToDo-App

          <NavigationMenu className="space-x-4">
            <NavigationMenuLink>
              <Link to="">Strona główna</Link>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <Link to="subsite-1">Podstrona 1</Link>
            </NavigationMenuLink>
            <NavigationMenuLink>
              <Link to="subsite-2">Podstrona 2</Link>
          </NavigationMenuLink>
            <NavigationMenuLink>
              <Link to="error-test">Error test</Link>
          </NavigationMenuLink>
          </NavigationMenu>
        </div>
      </div>

      <Outlet/>
    </>
  )
}