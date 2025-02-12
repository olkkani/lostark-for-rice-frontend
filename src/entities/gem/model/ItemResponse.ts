import { Items } from "./item";

export interface ItemPreviewResponse {
  itemCode: number;
  price: number;
  highPrice: number;
  lowPrice: number;
  priceChange: number;
  priceChangeRate: number;
}
export interface ItemPricesResponse {
  open: number;
  high: number;
  low: number;
  close: number;
  time: string;
}

export interface ItemPrice {
  itemCode: number;
  price: number;
  highPrice: number;
  lowPrice: number;
  priceChange: number;
  priceChangeRate: number;
}

export type IndexTrendResponse = {
  date: string;
  price: number;
  prevGapPrice: number;
  prevGapPriceRate: number;
  pairGapPrice: number;
  pairGapPriceRate: number;
};

export const itemPreviewResponseCustomSort = (
  response: ItemPreviewResponse[]
) => {
  const order = Items.map((item) => item.id);
  response.sort((a, b) => {
    const indexA = order.indexOf(a.itemCode);
    const indexB = order.indexOf(b.itemCode);
    // 정렬 기준에 없는 경우는 큰 숫자(예: Number.MAX_SAFE_INTEGER)로 간주하여 뒤쪽에 위치하도록 함
    const posA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const posB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;
    return posA - posB;
  });
  return response;
};
