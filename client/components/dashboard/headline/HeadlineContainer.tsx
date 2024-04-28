import { ButtonCospace } from "@/components/dashboard";

export default function HeadlineContainer() {
  return (
    <div className="flex items-center justify-between mx-4 my-5">
      <h1 className="text-2xl font-bold">Pod</h1>
      <ButtonCospace />
    </div>
  );
}
