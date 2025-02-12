import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPricesByItemCode } from "@/entities/gem/api/item";
import { useSelectedGemStore } from "@/entities/gem/model/useSelectedGemStore";
import { ItemPricesResponse } from "@/entities/gem/model/ItemResponse";
import ChartComponent from "./ChartComponent";
import IndexTable from "@/features/index-table/ui/IndexTrendTable";

const IndexTableComponent: React.FC<{}> = () => {
  const { selectedGem } = useSelectedGemStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event-prices", { itemCode: selectedGem.id }],
    queryFn: () => getPricesByItemCode(selectedGem.id),
    staleTime: 5000,
  });
  if (isLoading) {
    console.log("loading...");
  }
  if (isError) {
    console.log(error);
  }

  let content;
  if (data) {
    const responseData = data as ItemPricesResponse[];
    // let recentFiveDayPriceTrend: PriceChangeTable[] = []

    // const reverseOrderData = responseData.reverse().filter((_, index) => (index <= 5))
    // reverseOrderData.forEach((item, index) => {
    //         if (index < 5) {
    //             const priceChangeTable = {
    //                 date: item.time,
    //                 price: item.close,
    //                 dailyChangePrice: formatPrice(item.close),
    //                 dailyChangeRate: formatPercent(item.close)
    //             }
    //             recentFiveDayPriceTrend.push(priceChangeTable)
    //         }
    //     })

    content = (
      <>
        <ChartComponent data={responseData}></ChartComponent>
        <IndexTable></IndexTable>
      </>
    );
  }

  return <>{content}</>;
};
export default IndexTableComponent;
