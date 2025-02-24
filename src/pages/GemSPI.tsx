import { useQuery } from "@tanstack/react-query";
import TodayGemPrice from "@/features/gem-price/ui/TodayGemPrice";
import Aside from "@/features/preview/ui/Aside";
import { Item, Items } from "@/entities/gem/model/item";
import {
  ItemPreviewResponse,
  ItemPricesResponse,
} from "@/entities/gem/model/ItemResponse";
import {
  getAllKindsItemPrice,
  getPricesByItemCode,
} from "@/entities/gem/api/item";
import { useSelectedGemStore } from "@/entities/gem/model/useSelectedGemStore";
import useDeviceSize from "@/shared/hooks/useDeviceSize";
import clsx from "clsx";
import IndexTable from "@/features/index-table/ui/IndexTrendTable";
import CandleChart from "@/features/index-chart/ui/CandleChart";

const gemsInfo: Item[] = Items;

const GemSPI = () => {
  const { isDesktop, isLaptop, isMobile, isTablet } = useDeviceSize();
  const { selectedGem, selectGem } = useSelectedGemStore();
  function handlePreview(itemCode: number) {
    selectGem(gemsInfo.find((gem) => gem.id == itemCode) as Item);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event-all-kind-item-price"],
    queryFn: getAllKindsItemPrice,
    staleTime: 5000,
  });
  if (isLoading) {
    console.log("loading...");
  }
  if (isError) {
    console.log(error);
  }

  const {
    data: trend,
    isLoading: isTrendLoading,
    isError: isTrendError,
    error: trendError,
  } = useQuery({
    queryKey: ["event-prices", { itemCode: selectedGem.id }],
    queryFn: () => getPricesByItemCode(selectedGem.id),
    staleTime: 5000,
  });
  if (isTrendLoading) {
    console.log("loading...");
  }
  if (isTrendError) {
    console.log(trendError);
  }
  let trendContent;
  let content;
  let gemList;
  if (trend) {
    const responseData = trend as ItemPricesResponse[];
    trendContent = (
      <>
        <CandleChart data={responseData}></CandleChart>
        <IndexTable></IndexTable>
      </>
    );
  }
  if (data) {
    const selectedGemPrice = data.find(
      (gem) => gem.itemCode == selectedGem.id
    ) as ItemPreviewResponse;

    content = (
      <>
        <TodayGemPrice gemInfo={selectedGem} gemPrice={selectedGemPrice} />
      </>
    );
    gemList = (
      <Aside
        className={"rounded-lg bg-muted p-4 w-full h-full"}
        onClick={handlePreview}
        selectedGem={selectedGem}
        gems={data}
      />
    );
  }

  return (
    <>
      <div
        className={clsx(
          "grid grid-flow-row grid-cols-[1fr_auto] place-content-center h-screen ",
          {
            "w-7/12": isDesktop,
            "w-10/12": isLaptop,
            "mx-auto": isDesktop || isLaptop,
            "mx-2": isMobile || isTablet,
            "gap-3": !isMobile,
          }
        )}
      >
        <div className={"w-full relative"}>
          {content}
          {trendContent}
        </div>
        {!isMobile && gemList}
      </div>
    </>
  );
};

export default GemSPI;
