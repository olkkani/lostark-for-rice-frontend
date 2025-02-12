import React from "react";
import { Item, Items } from "@/entities/gem/model/item";
import { ItemPreviewResponse } from "@/entities/gem/model/ItemResponse";
import ItemPreview from "@/features/preview/ui/ItemPreview";

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
      {gems.map((gem: ItemPreviewResponse) => (
        <ItemPreview
          key={gem.itemCode}
          onClick={props.onClick}
          isPairItem={gem.itemCode == props.selectedGem.pairItemId}
          gemInfo={gemsInfo.find((info) => info.id == gem.itemCode) as Item}
          price={gem.price}
          priceChangeRate={gem.priceChangeRate}
        />
      ))}
    </div>
  );
};

export default Aside;
