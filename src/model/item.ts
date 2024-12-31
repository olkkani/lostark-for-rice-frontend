import lv10DoomFire from "../assets/10레벨겁화.webp"
import lv10Blazing from "../assets/10레벨작열.webp"
import lv8DoomFire from "../assets/8레벨겁화.webp"
import lv8Blazing from "../assets/8레벨작열.webp"
import lv10Annihilation from "../assets/10레벨멸화.webp"
import lv10CrimsonFlame from "../assets/10레벨홍염.webp"

class PriceRecord {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;

    constructor(time: string, open: number, high: number, low: number, close: number) {
        this.time = time;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
    }
}
class RecentPriceTrend {
    time: string;
    price: number;
    priceChangePrev: number;
    priceChangeRatePrev: number;
    priceChangePairItem: number;
    priceChangeRatePairItem: number;

    constructor(time: string, price: number, priceChangePrev: number, priceChangeRatePrev: number, priceChangePairItem: number, priceChangeRatePairItem: number) {
        this.time = time;
        this.price = price;
        this.priceChangePrev = priceChangePrev;
        this.priceChangeRatePrev = priceChangeRatePrev;
        this.priceChangePairItem = priceChangePairItem;
        this.priceChangeRatePairItem = priceChangeRatePairItem;
    }
}
class Item {
    id: number;
    name: string;
    pairItemId: number;
    image: string;
    price: number;
    priceChange: number;
    priceChangeRate: number;
    highPrice: number;
    lowPrice: number;
    priceRecords: PriceRecord[];
    recentPriceTrends: RecentPriceTrend[];

    constructor(id: number, name: string, pairItemId: number, image: string) {
        this.id = id;
        this.name = name;
        this.pairItemId = pairItemId;
        this.image = image;

        // 초기화하지 않은 속성들의 기본값 설정
        this.price = 0;
        this.priceChange = 0;
        this.priceChangeRate = 0;
        this.highPrice = 0;
        this.lowPrice = 0;
        this.priceRecords = [];
        this.recentPriceTrends = [];
    }

    // 나머지 속성들을 설정하기 위한 메서드들
    setPrice(price: number) {
        this.price = price;
    }

    setPriceChange(priceChange: number) {
        this.priceChange = priceChange;
    }

    setPriceChangeRate(priceChangeRate: number) {
        this.priceChangeRate = priceChangeRate;
    }

    setHighPrice(highPrice: number) {
        this.highPrice = highPrice;
    }

    setLowPrice(lowPrice: number) {
        this.lowPrice = lowPrice;
    }

    setPriceRecords(priceRecords: PriceRecord[]) {
        this.priceRecords = priceRecords;
    }

    setRecentPriceTrends(recentPriceTrends: RecentPriceTrend[]) {
        this.recentPriceTrends = recentPriceTrends;
    }
}




const items = [
    new Item(65031100 , '10레벨 겁화의 보석', 65032100, lv10DoomFire),
    new Item(65032100 , '10레벨 작열의 보석', 65031100, lv10Blazing),
    new Item(65031080 , '8레벨 겁화의 보석', 65032080, lv8DoomFire),
    new Item(65032080 , '8레벨 작열의 보석', 65031080, lv8Blazing),
    new Item(65021100 , '10레벨 멸화의 보석', 65022100, lv10Annihilation),
    new Item(65022100 , '10레벨 홍염의 보석', 65021100, lv10CrimsonFlame),
]

export default items;


export const gemData = [
    {
        id: 65031100,
        name: '10레벨 겁화의 보석',
        pairItemId: 65032100,
        image: lv10DoomFire
    },
    {
        id: 65032100,
        name: '10레벨 작열의 보석',
        pairItemId: 65031100,
        image: lv10Blazing
    },
    {
        id: 65031080,
        name: '8레벨 겁화의 보석',
        pairItemId: 65032080,
        image: lv8DoomFire
    },
    {
        id: 65032080,
        name: '8레벨 작열의 보석',
        pairItemId: 65031080,
        image: lv8Blazing
    },
    {
        id: 65021100,
        name: '10레벨 멸화의 보석',
        pairItemId: 65022100,
        image: lv10Annihilation
    },
    {
        id: 65022100,
        name: '10레벨 홍염의 보석',
        pairItemId: 65021100,
        image: lv10CrimsonFlame
    }
]

