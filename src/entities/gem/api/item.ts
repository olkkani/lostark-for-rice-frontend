import ky from "ky";
import {
  IndexTrendResponse,
  ItemPreviewResponse,
  itemPreviewResponseCustomSort,
  ItemPricesResponse,
} from "@/entities/gem/model/ItemResponse";

export interface ItemResponse {
  itemCode: number;
  prices: {
    open: number;
    close: number;
    high: number;
    low: number;
  };
}

export async function getAllKindsItemPrice() {
  const response = await ky(`/items/prices/today`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }
  return itemPreviewResponseCustomSort(
    await response.json<ItemPreviewResponse[]>()
  );
}

export async function getPricesByItemCode(itemCode: number) {
  const response = await ky(`/items/${itemCode}/prices`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }
  return await response.json<ItemPricesResponse[]>();
}

export async function getIndexTrendByItemCode(itemCode: number) {
  const response = await ky(`/items/${itemCode}/trend`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }
  return await response.json<IndexTrendResponse[]>();
}
