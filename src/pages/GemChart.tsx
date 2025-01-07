import React, {useState,} from 'react';
import produce from 'immer';
import {useQuery} from "@tanstack/react-query";
import {getAllKindsItemPrice, ItemResponse} from "@/features/api/item.ts";
import ChartComponent from "@/components/ChartComponent.tsx";
import {Item, Items, PriceRecord} from "@/model/item.ts";
import Aside from "@/components/Aside.tsx";
import {ItemPreviewResponse, ItemPrice} from "@/features/dto/ItemResponse.ts";
import {useImmer} from "use-immer";
import Header from "@/components/Header.tsx";

const GemChart = () => {
    const gemsInfo: Item[] = Items;
    const [selectedGem, setSelectedGem] = useImmer<Item>(
        gemsInfo.find(gem => gem.id == 65031080) as Item
    );

    function handlePreview(itemCode: number) {
        setSelectedGem(() => gemsInfo.find(gem => gem.id == itemCode) as Item);
    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["event"],
        queryFn: getAllKindsItemPrice,
        staleTime: 5000
    });
    if (isLoading) {
        console.log("loading...");
    }
    if (isError) {
        console.log(error)
    }

    let content;
    if(data){
        let gemPrice = data.find(gem => gem.itemCode == selectedGem.id)!!.price as ItemPrice;

    content = <>
        <Header gemInfo={selectedGem} gemPrice={gemPrice} />
        <Aside onClick={handlePreview} selectedGem={selectedGem} gems={data}/>
    </>
    }



    // const initData: PriceRecord[] = [
    //     {
    //         "open": 339000,
    //         "high": 400000,
    //         "low": 340900,
    //         "close": 383600,
    //         "time": "2024-12-26"
    //     },
    //     {
    //         "open": 339000,
    //         "high": 345000,
    //         "low": 340900,
    //         "close": 343600,
    //         "time": "2024-12-27"
    //     },
    //     {
    //         "open": 339000,
    //         "high": 345000,
    //         "low": 340900,
    //         "close": 343600,
    //         "time": "2024-12-28"
    //     },
    //     {
    //         "open": 339000,
    //         "high": 345000,
    //         "low": 340900,
    //         "close": 343600,
    //         "time": "2024-12-29"
    //     },
    //     {
    //         "open": 339000,
    //         "high": 345000,
    //         "low": 340900,
    //         "close": 343600,
    //         "time": "2024-12-30"
    //     },
    //     {
    //         "open": 339000,
    //         "high": 345000,
    //         "low": 340900,
    //         "close": 343600,
    //         "time": "2024-12-31"
    //     },
    //     {
    //         "open": 339000,
    //         "high": 345000,
    //         "low": 340900,
    //         "close": 343600,
    //         "time": "2025-01-01"
    //     },
    // ]



    //


    return (
        <>
            {content}
        </>
    )

    // return (
    //     <>
    //         {content}
    //         {/*<ChartComponent data={*/}
    //         {/*    gemPrices.find((item) =>*/}
    //         {/*        item.id == selectedGem.id*/}
    //         {/*    )?.priceRecords*/}
    //         {/*}/>*/}
    //         <a>hello</a>
    //         <a>hello</a>
    //         {/*<Aside handleItemClick={}*/}
    //     </>
    // )
}

export default GemChart;