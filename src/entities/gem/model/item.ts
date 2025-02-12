import lv10DoomFire from "@assets/lv10DoomFire.webp";
import lv10Blazing from "@assets/lv10Blazing.webp";
import lv8DoomFire from "@assets/lv8DoomFire.webp";
import lv8Blazing from "@assets/lv8Blazing.webp";
import lv10Annihilation from "@assets/lv10Annihilation.webp";
import lv10CrimsonFlame from "@assets/lv10CrimsonFlame.webp";

export type Item = {
  id: number;
  name: string;
  pairItemId: number;
  image: string;
};

export const Items = [
  {
    id: 65031100,
    name: "10레벨 겁화의 보석",
    pairItemId: 65032100,
    image: lv10DoomFire,
  },
  {
    id: 65032100,
    name: "10레벨 작열의 보석",
    pairItemId: 65031100,
    image: lv10Blazing,
  },
  {
    id: 65031080,
    name: "8레벨 겁화의 보석",
    pairItemId: 65032080,
    image: lv8DoomFire,
  },
  {
    id: 65032080,
    name: "8레벨 작열의 보석",
    pairItemId: 65031080,
    image: lv8Blazing,
  },
  {
    id: 65021100,
    name: "10레벨 멸화의 보석",
    pairItemId: 65022100,
    image: lv10Annihilation,
  },
  {
    id: 65022100,
    name: "10레벨 홍염의 보석",
    pairItemId: 65021100,
    image: lv10CrimsonFlame,
  },
];
