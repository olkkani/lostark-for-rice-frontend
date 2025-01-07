import ky from "ky";
import {ItemPreviewResponse} from "@/features/dto/ItemResponse.ts";

export interface ItemResponse {
    itemCode: number,
    prices: {
        open: number,
        close: number,
        high: number,
        low: number,
    }
}
export async function getAllKindsItemPrice() {
    const response = await ky('http://localhost:8080/items/prices/today', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Fetch error: ${response.statusText}`);

    }
    return await response.json<ItemPreviewResponse[]>();
    // return await response.json<ItemResponse>();
}

// export async function getPricesByItemCode(itemCode: number) {
// }