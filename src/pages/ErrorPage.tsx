import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="container flex justify-center">
      <Card className="w-96 text-center">
        <CardHeader>
          <CardTitle>Ta strona nie istnieje</CardTitle>
        </CardHeader>
        <CardContent>
          Przykro nam, ale nie udało nam się znaleźć strony której szukasz.
          Za pomocą poniższego przycisku możesz wrócić do strony głównej.
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link to="" className="mx-auto">
              Wróć do strony głównej
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}