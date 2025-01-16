import {create} from "zustand/react";
import {Item, Items} from "@/model/item.ts";

interface GemStore {
    selectedGem: Item;
    selectGem: (selectedGem: Item) => void;
}
export const useSelectedGemStore = create<GemStore>((set) => ({
    selectedGem: Items.find(gem => gem.id === 65031080) as Item,
    selectGem: (selectGem: Item) => set(() => ({ selectedGem: selectGem }))
}))