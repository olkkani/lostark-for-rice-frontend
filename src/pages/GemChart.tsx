import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header.tsx";
import Aside from "@/components/Aside.tsx";
import { Item, Items } from "@/model/item.ts";
import { ItemPrice } from "@/features/dto/ItemResponse.ts";
import { getAllKindsItemPrice } from "@/features/api/item.ts";
import ChartTableComponent from "@/components/ChartTableComponent.tsx";
import { useSelectedGemStore } from "@/store/useSelectedGemStore.ts";
import { ModeToggle } from "@/components/mode-toggle";

const gemsInfo: Item[] = Items;

const GemChart = () => {
  const { selectedGem, selectGem } = useSelectedGemStore();
  function handlePreview(itemCode: number) {
    selectGem(gemsInfo.find((gem) => gem.id == itemCode) as Item);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event"],
    queryFn: getAllKindsItemPrice,
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
    const selectedGemPrice = data.find((gem) => gem.itemCode == selectedGem.id)!
      .price as ItemPrice;

    content = (
      <>
        <ModeToggle></ModeToggle>
        <div
          className={
            "grid grid-flow-row grid-cols-[1fr_auto] place-content-center h-screen gap-3"
          }
        >
          <div className={"w-[45vw]"}>
            <Header gemInfo={selectedGem} gemPrice={selectedGemPrice} />
            <ChartTableComponent />
          </div>
          <Aside
            className={"rounded-lg bg-muted p-4 w-full h-full"}
            onClick={handlePreview}
            selectedGem={selectedGem}
            gems={data}
          />
        </div>
      </>
    );
  }

  return <>{content}</>;
};

export default GemChart;
