import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";

interface CardProps {
  title: string;
  description: string;
  buttonTitle: string;
}

export default function CardComponent({
  title,
  description,
  buttonTitle,
}: CardProps) {
  return (
    <Card className="p-2">
      <CardContent className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <Button size="sm" variant="outline">
          {buttonTitle}
        </Button>
      </CardContent>
    </Card>
  );
}
