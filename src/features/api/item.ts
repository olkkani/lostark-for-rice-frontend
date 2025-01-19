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


const baseUrl = process.env.REACT_APP_API_URL

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