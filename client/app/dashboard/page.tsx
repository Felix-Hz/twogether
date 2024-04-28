import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { CardContent, Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
} from "@/components/ui/drawer";

export default function Component() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-4">
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
          <Link href="#" passHref>
            <span className="text-lg font-semibold cursor-pointer">
              Twogether
            </span>
          </Link>
        </div>
      </header>

      {/* SECOND ROW  */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="bg-green-400 hover:bg-green-400 hover:cursor-pointer p-3 rounded-xl space-x-2">
            <IoMdAddCircle className="text-3xl inline text-white" />
            <p className="inline font-semibold">Add Co-Space</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Co-Space A</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  123 Main St, Anytown USA
                </p>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
