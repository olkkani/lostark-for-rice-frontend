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

export interface ItemPrice {
    price: number,
    highPrice: number,
    lowPrice: number,
    priceChange: number,
    priceChangeRate: number
}