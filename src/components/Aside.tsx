import React from "react";
import { Item, Items } from "@/model/item.ts";
import { ItemPreviewResponse } from "@/features/dto/ItemResponse.ts";
import ItemPreview from "@/components/ItemPreview.tsx";

const Aside: React.FC<{
  onClick: (id: number) => void;
  selectedGem: Item;
  gems: ItemPreviewResponse[];
  className: string;
}> = ({ className, ...props }) => {
  const gemsInfo: Item[] = Items;
  const gems = props.gems;

  const divClassName = `grid grid-flow-row content-start gap-4 ${
    className || ""
  }`;
  return (
    <div className={divClassName}>
      {gems
        .filter((gem) => gem.itemCode != props.selectedGem.id)
        .map((gem: ItemPreviewResponse) => (
          <ItemPreview
            key={gem.itemCode}
            onClick={props.onClick}
            isPairItem={gem.itemCode == props.selectedGem.pairItemId}
            gemInfo={gemsInfo.find((info) => info.id == gem.itemCode) as Item}
            price={gem.price.price}
            priceChangeRate={gem.price.priceChangeRate}
          />
        ))}
    </div>
  );
};

export default Aside;
