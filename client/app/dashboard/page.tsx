import {
  Drawer,
  CardContainer,
  HeadlineContainer,
} from "@/components/dashboard";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardContainer() {
  return (
    <div className="flex flex-col h-screen">
      <header className=" text-white flex items-center justify-between px-4 py-4 md:px-6">
        <Drawer />
        <Avatar className="border-2 border-black">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
      <Separator />
      <HeadlineContainer />
      <Separator />
      <CardContainer />
    </div>
  );
}
