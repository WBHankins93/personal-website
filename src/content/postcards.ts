// Off the Clock postcards (handoff 7.5).
// TODO(ben): approve or rewrite the captions (handoff 12.7).

export type PostcardScene = "hiking" | "marsh" | "festivals" | "golf";

export interface Postcard {
  title: string;
  caption: string;
  scene: PostcardScene;
}

export const postcards: Postcard[] = [
  { title: "Hiking", caption: "Ridge days", scene: "hiking" },
  { title: "Marsh", caption: "Bayou mornings", scene: "marsh" },
  { title: "Festivals", caption: "Front of house", scene: "festivals" },
  { title: "Golf", caption: "Early tee times", scene: "golf" },
];
