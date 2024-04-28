import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";

export default function DrawerComponent() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <RxHamburgerMenu className="text-2xl text-black hover:cursor-pointer" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen top-0 left-0 right-auto mt-0 w-[500px] rounded-none">
        <div className="mx-auto w-full p-5">
          <DrawerHeader>
            <DrawerTitle>Theme Color Options</DrawerTitle>
            <DrawerDescription>
              * Selected option will be applied...
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 space-y-4">
            <div className="bg-muted flex items-center justify-center rounded-lg h-32">
              <p>Image 1</p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
