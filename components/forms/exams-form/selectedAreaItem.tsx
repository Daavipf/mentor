import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item";
import { Plus, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  area: string;
  amount: number;
  handleRemoveRequest: (areaToRemove: string) => void;
}

export default function SelectedAreaItem({ area, amount, handleRemoveRequest }: Props) {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <CheckCircle />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{area}</ItemTitle>
        <ItemDescription>Questões: {amount}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button type="button" onClick={() => handleRemoveRequest(area)}>
          <Trash2 />
        </Button>
      </ItemActions>
    </Item>
  );
}
