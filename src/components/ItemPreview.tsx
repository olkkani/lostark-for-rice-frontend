import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import * as React from "react";
import {formatPrice} from "@/util/formatter.ts";
import {clsx} from "clsx";


const ItemPreview: React.FC<{
    gemInfo: {id: number, image: string, name: string};
    price: number;
    priceChangeRate: number,
    isPairItem: boolean,
    onClick: (id: number) => void
}> = (props) => {

    const formatedPrice = formatPrice(props.price);
    const formatedPriceChangeRate = formatPrice(props.priceChangeRate);

    return (
        <div onClick={() => props.onClick(props.gemInfo.id)} className={clsx("grid grid-cols-2 grid-rows-2",
            {
                "order-first": props.isPairItem,
            }
            )}>
            <Avatar className={"row-span-2"}>
                <AvatarImage src={props.gemInfo.image}/>
                <AvatarFallback>Gem image</AvatarFallback>
            </Avatar>
            <h6 className={"col-start-2 text-left"}>{props.gemInfo.name}</h6>
            <h6 className={"col-start-2-2 text-right"}>{formatedPrice + '(' + formatedPriceChangeRate + ')'}</h6>
        </div>
    )
}
export default ItemPreview;