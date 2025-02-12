import React, { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/shadcn/ui/table";
import { useSelectedGemStore } from "@/entities/gem/model/useSelectedGemStore";
import { getIndexTrendByItemCode } from "@/entities/gem/api/item";
import { useQuery } from "@tanstack/react-query";
import { formatPercent, formatPrice } from "@/shared/utils/formatter";

// PriceIndex 타입 정의 (rate 값 포함)
export type PriceIndex = {
  date: string;
  price: string;
  prevGapPrice: number;
  prevGapPriceRate: number;
  pairGapPrice: number;
  pairGapPriceRate: number;
};

// itemCode에 따라 마지막 컬럼의 헤더를 동적으로 설정하는 함수
const getColumns = (itemCode: number): ColumnDef<PriceIndex>[] => {
  let pairGemName: string;
  switch (itemCode) {
    case 65031100:
    case 65031080:
      pairGemName = "작열과";
      break;
    case 65032100:
    case 65032080:
      pairGemName = "겁화와";
      break;
    case 65021100:
      pairGemName = "홍염과";
      break;
    default:
      pairGemName = "멸화와";
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
      cell: ({ getValue }) => {
        const price = Number(getValue());
        return formatPrice(price);
      },
    },
    {
      accessorKey: "prevGapPrice",
      header: "전날 비교",
      cell: ({ row, getValue }) => {
        const value = Number(getValue());
        const gap = formatPrice(value);
        const rate = formatPercent(row.original.prevGapPriceRate);
        const colorClass = value > 0 ? "text-blue-500" : "text-red-500";
        return (
          <span className={colorClass}>
            {gap} ({rate})
          </span>
        );
      },
    },
    {
      accessorKey: "pairGapPrice",
      header: pairGemName + "의 비교",
      cell: ({ row, getValue }) => {
        const value = Number(getValue());
        const gap = formatPrice(value);
        const rate = formatPercent(row.original.pairGapPriceRate);
        const colorClass = value > 0 ? "text-blue-500" : "text-red-500";
        return (
          <span className={colorClass}>
            {gap} ({rate})
          </span>
        );
      },
    },
  ];
};

// React.FC를 사용한 DataTable 컴포넌트
export const IndexTable: React.FC = () => {
  const { selectedGem } = useSelectedGemStore();
  const columns = useMemo(() => getColumns(selectedGem.id), [selectedGem.id]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event-index-trend", { itemCode: selectedGem.id }],
    queryFn: () => getIndexTrendByItemCode(selectedGem.id),
    staleTime: 5000,
  });
  if (isLoading) {
    console.log("loading...");
  }
  if (isError) {
    console.log(error);
  }

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  let content;
  if (data) {
    content = (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  return <>{content}</>;
};

export default IndexTable;
