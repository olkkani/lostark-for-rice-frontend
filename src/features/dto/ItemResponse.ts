export interface ItemPreviewResponse {
    itemCode: number,
    price: {
        price: number,
        highPrice: number,
        lowPrice: number,
        priceChange: number,
        priceChangeRate: number
    }
}
export interface ItemPricesResponse {
    open: number,
    high: number,
    low: number,
    close: number,
    time: string
}

export interface ItemPrice {
    price: number,
    highPrice: number,
    lowPrice: number,
    priceChange: number,
    priceChangeRate: number
}