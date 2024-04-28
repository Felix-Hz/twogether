import { Card } from "@/components/dashboard";

export default function CardContainer() {
  return (
    <div className="w-11/12 mx-auto pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card
        title="Co-Space"
        description="This is a test element."
        buttonTitle="Open"
      />
      <Card
        title="Co-Space"
        description="This is a test element."
        buttonTitle="Open"
      />
      <Card
        title="Co-Space"
        description="This is a test element."
        buttonTitle="Open"
      />
      <Card
        title="Co-Space"
        description="This is a test element."
        buttonTitle="Open"
      />
    </div>
  );
}
