export const loadingMode = ["blurhash", "placeholder", "lp", "none"] as const;
export type LoadingMode = (typeof loadingMode)[number];

export interface ListInst extends HTMLElement {
  stopRefresh: () => void;
}
