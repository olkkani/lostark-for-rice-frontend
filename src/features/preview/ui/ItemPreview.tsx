import { Avatar, AvatarFallback, AvatarImage } from "@/shared/shadcn/ui/avatar";
import * as React from "react";
import { formatPercent, formatPrice } from "@/shared/utils/formatter";
import { clsx } from "clsx";

const ItemPreview: React.FC<{
  gemInfo: { id: number; image: string; name: string };
  price: number;
  priceChangeRate: number;
  isSelectedItem: boolean;
  onClick: (id: number) => void;
}> = (props) => {
  const formatedPrice = formatPrice(props.price);
  const formatedPriceChangeRate = formatPercent(props.priceChangeRate);

  return (
    <div
      onClick={() => props.onClick(props.gemInfo.id)}
      className={clsx(
        "grid grid-cols-[auto_1fr] grid-rows-2 gap-x-4 p-3 rounded-sm",
        {
          "bg-neutral-200": props.isSelectedItem,
        }
      )}
    >
      <Avatar className={"row-span-2 self-center"}>
        <AvatarImage src={props.gemInfo.image} />
        <AvatarFallback>Gem image</AvatarFallback>
      </Avatar>
      <h6 className={"col-start-2 text-right self-end"}>
        {props.gemInfo.name}
      </h6>
      <h6 className={"col-start-2-2 text-right"}>
        {formatedPrice + "(" + formatedPriceChangeRate + ")"}
      </h6>
    </div>
  );
};
export default ItemPreview;
