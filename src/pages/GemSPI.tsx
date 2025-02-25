import { useQueries, useQuery } from "@tanstack/react-query";
import TodayGemPrice from "@/features/gem-price/ui/TodayGemPrice";
import Aside from "@/features/preview/ui/Aside";
import { Item, Items } from "@/entities/gem/model/item";
import {
  ItemPreviewResponse,
  ItemPricesResponse,
} from "@/entities/gem/model/ItemResponse";
import {
  getAllKindsItemPrice,
  getIndexTrendByItemCode,
  getPricesByItemCode,
} from "@/entities/gem/api/item";
import { useSelectedGemStore } from "@/entities/gem/model/useSelectedGemStore";
import useDeviceSize from "@/shared/hooks/useDeviceSize";
import clsx from "clsx";
import IndexTable from "@/features/index-table/ui/IndexTrendTable";
import CandleChart from "@/features/index-chart/ui/CandleChart";
import { Loader2 } from "lucide-react";

const gemsInfo: Item[] = Items;

const GemSPI = () => {
  const { isDesktop, isLaptop, isMobile, isTablet } = useDeviceSize();
  const { selectedGem, selectGem } = useSelectedGemStore();

  function handlePreview(itemCode: number) {
    selectGem(gemsInfo.find((gem) => gem.id == itemCode) as Item);
  }

  const results = useQueries({
    queries: [
      {
        queryKey: ["event-all-kind-item-price"],
        queryFn: getAllKindsItemPrice,
        staleTime: 5000,
      },
      {
        queryKey: ["event-prices", { itemCode: selectedGem.id }],
        queryFn: () => getPricesByItemCode(selectedGem.id),
        staleTime: 5000,
        enabled: !!selectedGem.id,
      },
      {
        queryKey: ["event-index-trend", { itemCode: selectedGem.id }],
        queryFn: () => getIndexTrendByItemCode(selectedGem.id),
        staleTime: 5000,
      },
    ],
  });

  const [allKindsItemPrice, prices, indexTrend] = results;
  let gemPriceComponent;
  let chartComponent;
  let indexTrendComponent;
  let gemListComponent;
  if (prices.isLoading || indexTrend.isLoading) {
    chartComponent = <Loader2 className="animate-spin" />;
    indexTrendComponent = <Loader2 className="animate-spin" />;
  }
  if (allKindsItemPrice.data) {
    const selectedGemPrice = allKindsItemPrice.data.find(
      (gem) => gem.itemCode == selectedGem.id
    ) as ItemPreviewResponse;

    gemPriceComponent = (
      <TodayGemPrice gemInfo={selectedGem} gemPrice={selectedGemPrice} />
    );
    gemListComponent = (
      <Aside
        className={"rounded-lg bg-muted py-4 w-full h-full"}
        onClick={handlePreview}
        selectedGem={selectedGem}
        gems={allKindsItemPrice.data}
      />
    );
  }
  if (prices.data) {
    const responseData = prices.data as ItemPricesResponse[];
    chartComponent = <CandleChart data={responseData}></CandleChart>;
  }
  if (indexTrend.data) {
    indexTrendComponent = <IndexTable></IndexTable>;
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
          {gemPriceComponent}
          {chartComponent}
          {indexTrendComponent}
        </div>
        {!isMobile && gemListComponent}
      </div>
    </>
  );
};

export default GemSPI;
