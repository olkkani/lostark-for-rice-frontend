import ky from "ky";
import {ItemPreviewResponse, ItemPricesResponse} from "@/features/dto/ItemResponse.ts";

export interface ItemResponse {
    itemCode: number,
    prices: {
        open: number,
        close: number,
        high: number,
        low: number,
    }
}


// const baseUrl = import.meta.env.VITE_APP_API_URL
const baseUrl = "http://43.201.2.177:18082"

export async function getAllKindsItemPrice() {
    const response = await ky(`${baseUrl}/items/prices/today`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Fetch error: ${response.statusText}`);

    }
    return await response.json<ItemPreviewResponse[]>();
}

export async function getPricesByItemCode(itemCode: number) {
    const response = await ky(`${baseUrl}/${itemCode}/prices`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Fetch error: ${response.statusText}`);

    }
    return await response.json<ItemPricesResponse[]>();
}