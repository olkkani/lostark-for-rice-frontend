import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../entities/shadcn/ui/avatar";
import { formatPrice, formatPercent } from "@/entities/gem/model/formatter";
import { ItemPrice } from "@/features/headerView/model/ItemResponse";
import { Item } from "@/entities/gem/model/item";

const Header: React.FC<{
  gemInfo: Item;
  gemPrice: ItemPrice;
}> = (props) => {
  const info = props.gemInfo;
  const price = props.gemPrice;

  const currentPrice = formatPrice(price.price);
  const lowPrice = formatPrice(price.lowPrice);
  const highPrice = formatPrice(price.highPrice);
  const priceChange = formatPrice(price.priceChange);
  const priceChangeRate = formatPercent(price.priceChangeRate);

  return (
    <div className={"rounded-lg bg-muted p-4 flex justify-between w-full "}>
      <div className={"flex justify-between"}>
        <Avatar>
          <AvatarImage src={info.image} />
          <AvatarFallback>Gem</AvatarFallback>
        </Avatar>
        <div className={"ml-2"}>
          <div>{info.name}</div>
          <div className={"flex justify-end"}>
            <p>{currentPrice}</p>
            <p className={"ml-1"}>
              {priceChange}({priceChangeRate})
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h6>최고가</h6>
          <h6>{highPrice}</h6>
        </div>
        <div>
          <h6>최저가</h6>
          <h6>{lowPrice}</h6>
        </div>
      </div>
    </div>
  );
};

export default Header;
