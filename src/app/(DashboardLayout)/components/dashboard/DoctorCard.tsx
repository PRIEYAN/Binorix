import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DoctorCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <p className="font-bold text-1.5xl">Doctor Name: Saajid Ahamed</p>
        <CardDescription>
          Medical Practicioner No: 17854376XXXXXX
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-1">
              <p className="mb-2">Email: saajidahamed@gmail.com</p>
              <p className="mb-2">Contact No: +91 88071XXXXX</p>
              <p className="mb-2">Specialist: General Surgery, Optometry </p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Available Days - Sun - Thu - Fri - Sat
        </Button>
      </CardFooter>
    </Card>
  )
}
