import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useSelectedGemStore} from "@/store/useSelectedGemStore.ts";


const PriceRecordsTable: React.FC = () => {

    const { selectedGem } = useSelectedGemStore()
    const pairGemType = getPairGemTypeByItemCode(selectedGem.id)

        function getPairGemTypeByItemCode(id: number) {
            const tenThousandsDigit = Math.floor((id % 100000) / 10000);
            const thousandsDigit = Math.floor((id % 10000) / 1000);

            if (tenThousandsDigit === 3 && thousandsDigit === 1) {
                return "작열";
            } else if (tenThousandsDigit === 3 && thousandsDigit === 2) {
                return "겁화";
            } else if (tenThousandsDigit === 2 && thousandsDigit === 1) {
                return "홍염";
            } else if (tenThousandsDigit === 2 && thousandsDigit === 2) {
                return "멸화";
            } else {
                return "해당 없음";
            }
        }



    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">날짜</TableHead>
                    <TableHead>가격</TableHead>
                    <TableHead>전날 대비</TableHead>
                    <TableHead className="text-right">{pairGemType} 대비</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default PriceRecordsTable;