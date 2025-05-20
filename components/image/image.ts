import type { ImageProps as ImagePropsType } from "@uni-helper/uni-app-types";
import type { ExtractPropTypes, PropType } from "vue";
import type { LoadingMode } from "./type";
import { makeStringProp } from "../_utils";

interface ImgProps {
  file: string;
  fileType: string;
  thumbnail: string;
  videoSrc: string;
  blurhash?: string | undefined;
  cover?: string;
  preSrc?: string;
  alt?: string;
  src?: string;
  baseSrc?: string;
}

interface ErrorConfig {
  open: boolean;
  errSrc: string;
}

// 定义 props
export const imageProps = {
  /**
   * @description 表单类型，可选值为 `LoadingMode` 类型中定义的值，默认值为 'default'
   */
  loadingMode: makeStringProp<LoadingMode>("blurhash"),
  /**
   * @description 是否禁用刷新功能
   * @default false
   */
  isDisabledRefresh: {
    type: Boolean,
    default: false,
  },

  /**
   * @description
   */
  imageProps: {
    type: Object as PropType<
      Partial<Omit<ImagePropsType, "loading" | "finished" | "onLoad">>
    >,
    default: () => ({
      lazyLoad: true,
      mode: "widthFix",
    }),
  },
  data: {
    type: Object as PropType<ImgProps>,
    default: () => ({}),
  },
  width: {
    // type: [String, Number],
    type: String,
    default: "100%",
  },
  height: {
    // type: [String, Number],
    type: String,
    default: "100%",
  },
  isShowBase: {
    type: Boolean,
    default: false,
  },
  resize: {
    type: Number,
    default: 0,
  },
  delay: {
    type: Number,
    default: 500,
  },
  borderRadius: {
    // type: [String, Number],
    type: Number,
    default: 0,
  },
  minHeight: {
    // type: [String, Number],
    type: String,
    default: "200rpx",
  },
  errConfig: {
    type: Object as PropType<ErrorConfig>,
    default: () => ({
      open: false,
      errSrc: "",
    }),
  },
  placeholder: {
    type: String,
    default: "",
  },
  src: {
    type: String,
    default: "",
  },
  isLpPreset: {
    type: Boolean,
    default: false,
  },
} as const;

export type ImageProps = ExtractPropTypes<typeof imageProps>;

// 定义 emits
export interface ImageEmits {
  (e: "onRefresh"): any;
}
