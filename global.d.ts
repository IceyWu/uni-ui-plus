// @ts-nocheck

declare module "vue" {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    UpButton: (typeof import("./components/button/button.vue"))["default"];
    UpList: (typeof import("./components/list/list.vue"))["default"];
  }
}

export {};
