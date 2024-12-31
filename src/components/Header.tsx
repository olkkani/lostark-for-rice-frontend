import * as React from "react";

import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar"

const Header: React.FC<{ image: string, name: string }> = (props) => {

    const startPrice = 100
    const price = 0

    return (
        <div className={"flex justify-between"}>
            <div className={"flex justify-between"}>
                <Avatar>
                    <AvatarImage src={props.image}/>
                    <AvatarFallback>Gem</AvatarFallback>
                </Avatar>
                <div className={"ml-2"}>
                    <div>{props.name}</div>
                    <div className={"flex justify-end"}>
                        <p>300G</p>
                        <p className={"ml-1"}>100%({price-startPrice})</p>
                    </div>
                </div>
            </div>
            <div>
                <p>{"최고가"}</p>
                <p>{"최저가"}</p>
            </div>
        </div>
    )
}

export default Header;