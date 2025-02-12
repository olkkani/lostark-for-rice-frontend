import { ColumnDef } from "@tanstack/react-table";

export type PriceIndex = {
  date: string;
  price: string;
  prevGapPrice: string;
  pairGapPrice: string;
};

const getColumns: (itemCode: number) => ColumnDef<PriceIndex>[] = (
  itemCode: number
) => {
  let pairGemName;
  switch (itemCode) {
    case 65031100:
    case 65031080:
      pairGemName = "작열";
      break;
    case 65032100:
    case 65032080:
      pairGemName = "겁화";
      break;
    case 65021100:
      pairGemName = "홍염";
      break;
    default:
      pairGemName = "멸화";
      break;
  }
  return [
    {
      accessorKey: "date",
      header: "날짜",
    },
    {
      accessorKey: "price",
      header: "가격",
    },
    {
      accessorKey: "prevGapPrice",
      header: "전날 비교",
    },
    {
      accessorKey: "pairGapPrice",
      header: pairGemName,
    },
  ];
};

export default columns;
