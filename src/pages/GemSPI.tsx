import { useQuery } from "@tanstack/react-query";
import Header from "@/features/header/ui/Header";
import Aside from "@/features/preview/ui/Aside";
import { Item, Items } from "@/entities/gem/model/item";
import { ItemPreviewResponse } from "@/entities/gem/model/ItemResponse";
import { getAllKindsItemPrice } from "@/entities/gem/api/item";
import IndexTableComponent from "@/features/chart/ui/IndexTableComponent";
import { useSelectedGemStore } from "@/entities/gem/model/useSelectedGemStore";
import { ModeToggle } from "@/shared/shadcn/ui/mode-toggle";

const gemsInfo: Item[] = Items;

const GemSpi = () => {
  const { selectedGem, selectGem } = useSelectedGemStore();
  function handlePreview(itemCode: number) {
    selectGem(gemsInfo.find((gem) => gem.id == itemCode) as Item);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event-all-kind"],
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
    const selectedGemPrice = data.find(
      (gem) => gem.itemCode == selectedGem.id
    ) as ItemPreviewResponse;

    content = (
      <>
        {/* <ModeToggle></ModeToggle> */}
        <div
          className={
            "grid grid-flow-row grid-cols-[1fr_auto] place-content-center h-screen gap-3"
          }
        >
          <div className={"w-[45vw]"}>
            <Header gemInfo={selectedGem} gemPrice={selectedGemPrice} />
            <IndexTableComponent />
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

export default GemSpi;
