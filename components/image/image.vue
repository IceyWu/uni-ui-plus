<script lang="ts" setup>
import type {
  ScrollViewOnRefresherpulling,
  ScrollViewOnRefresherrefresh,
  ScrollViewOnScrolltolower,
  ScrollViewProps,
} from "@uni-helper/uni-app-types";
import type { CSSProperties } from "vue";
import type { ListInst } from "./type";
import { get, isEmpty, isNumber, isString } from "@iceywu/utils";
import { fileParse } from "@life-palette/utils";
import { decode } from "blurhash";
// 导入语句
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
} from "vue";

import UpSkeleton from "../skeleton/skeleton.vue";
import { type ImageEmits, imageProps, type ImageProps } from "./image";
function getDataUrlFromArr(arr, w, h, options = {}) {
  const { instance, imgId } = options;
  if (typeof w === "undefined" || typeof h === "undefined") {
    w = h = Math.sqrt(arr.length / 4);
  }
  return new Promise((resolve, reject) => {
    const query = uni.createSelectorQuery().in(instance);

    query
      .select(`#${imgId}`)
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0]?.node;
        if (!canvas) {
          reject(new Error("未找到 canvas 节点"));
          return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("无法获取 canvas 上下文"));
          return;
        }

        // 重置 canvas 状态
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        // #ifdef H5
        const dpr = uni.getSystemInfoSync().pixelRatio;
        canvas.style.width = `${w / 4}px`;
        canvas.style.height = `${h / 4}px`;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
        // #endif
        // #ifdef MP-WEIXIN
        canvas.width = w;
        canvas.height = h;
        // #endif

        const imgData = ctx.createImageData(w, h);
        if (arr.length !== imgData.data.length) {
          reject(new Error("传入的像素数据长度与创建的 ImageData 长度不匹配"));
          return;
        }
        imgData.data.set(arr);
        ctx.putImageData(imgData, 0, 0);

        uni.canvasToTempFilePath(
          {
            // #ifdef MP-WEIXIN
            canvas,
            // #endif
            // #ifdef H5
            canvasId: `${imgId}`,
            // #endif
            success: (res) => {
              const tempFilePath = res.tempFilePath;
              resolve(tempFilePath);
            },
            fail: (err) => {
              reject(err);
            },
          },
          true,
        );
      });
  });
}
function wxuuid() {
  const hexDigits = "0123456789abcdef";
  const s = Array.from(
    { length: 36 },
    () => hexDigits[Math.floor(Math.random() * 16)],
  );
  s[14] = "4";
  s[19] = hexDigits[(Number.parseInt(s[19], 16) & 0x3) | 0x8];
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
}
// eslint-disable-next-line import/newline-after-import

console.log("🐠-----imageProps-----", imageProps);
const props = defineProps(imageProps);
console.log("🐳-----props-----", props);
const emit = defineEmits<ImageEmits>();

const listRef = ref<ListInst | null>(null);

onMounted(() => {});

// 响应式数据
const isLoading = ref(true);
const isShowplaceholderImg = ref(true);
const blurNumber = ref(30);
const IntervalObj = ref<any>(null);
const hashImg = ref("");
const lpImgData = ref<any>({});
const errorFlag = ref(false);
const imgId = `img_${wxuuid()}`;

// lp 图片处理
function getLpImgData() {
  const fileParseResult = fileParse(props.data, {
    resize: props.resize,
  });
  lpImgData.value = fileParseResult;
}

// 获取图片
function getImgUrl(target: string) {
  switch (target) {
    case "blurhash":
      return props.isLpPreset
        ? lpImgData.value.blurhash
        : props?.blurhash || "";
    case "blurhashVal":
      return hashImg.value;
    case "placeholder":
      return props.isLpPreset
        ? lpImgData.value.thumbnailUrl
        : props?.placeholder || "";
    default:
      return "";
  }
}

const placeholderImgSrc = computed(() => {
  switch (props?.loadingMode) {
    case "blurhash":
      return getImgUrl("blurhashVal");
    case "placeholder":
      return getImgUrl("placeholder");
    default:
      return lpImgData.value.thumbnailUrl;
  }
});

const showImgSrc = computed(() => {
  if (props?.isShowBase) {
    return props.src;
  }
  if (props.isLpPreset) {
    return lpImgData.value.thumbnailUrl;
  } else {
    return props.src;
  }
});

const showLoading = computed(() => {
  return isLoading.value;
});

const showError = computed(() => {
  return !isLoading.value && errorFlag.value;
});

// 值处理
function getRadiusVal() {
  if (isNumber(props.borderRadius)) {
    return `${props.borderRadius}rpx`;
  } else if (isString(props.borderRadius)) {
    return props.borderRadius;
  } else {
    return "0rpx";
  }
}

function getStyleVal(
  target: number | string | undefined,
  defaultVal?: string | number,
) {
  const targetVal = target || defaultVal;
  if (isString(targetVal)) {
    return targetVal;
  }
  return `${targetVal}rpx`;
}

// 图片加载相关方法
function onLoad() {
  const delayVal = props.delay || 0;
  setTimeout(() => {
    isLoading.value = false;
    isShowplaceholderImg.value = false;
  }, delayVal);
}

function decreaseBlurNumber() {
  if (blurNumber.value > 0) blurNumber.value -= 2;
  else clearInterval(IntervalObj.value);
}

function startDecreaseBlurNumber() {
  if (IntervalObj.value) clearInterval(IntervalObj.value);

  IntervalObj.value = setInterval(() => {
    decreaseBlurNumber();
  }, 100);
}

function onLoadPreImg() {}

function imgLoadError() {
  errorFlag.value = true;
  isLoading.value = false;
}

// 初始化方法
const instance = getCurrentInstance(); // 获取组件实例

// 获取base64-blurhash
function initBlurhash() {
  const blurhashVal = getImgUrl("blurhash");

  if (blurhashVal) {
    const pixels = decode(blurhashVal, 32, 32);

    getDataUrlFromArr(pixels, 32, 32, {
      instance,
      imgId,
    })
      .then((res) => {
        hashImg.value = res as string; // 类型断言

        isLoading.value = false;
      })
      .catch((e) => {});
  }
}
function judgmentLoadingMode(target: string) {
  return props?.loadingMode === target;
}

function imgInit() {
  isLoading.value = true;
  if (props.isLpPreset) {
    getLpImgData();
  }
  if (props.isShowBase) {
    isShowplaceholderImg.value = false;
    return;
  }

  if (judgmentLoadingMode("blurhash")) {
    isShowplaceholderImg.value = true;
    initBlurhash();
  }
}
const showCanvas = computed(() => {
  return isEmpty(hashImg.value) && judgmentLoadingMode("blurhash");
  // return isEmpty(hashImg.value) && judgmentLoadingMode('blurhash') && getImgUrl('blurhash')
});

onMounted(() => {
  imgInit();
});
</script>

<script lang="ts">
import { PREFIX } from "../_constants";

const componentName = `${PREFIX}-image`;
export default {
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: "shared",
    // #endif
  },
};
</script>

<template>
  <view
    class="relative cursor-pointer overflow-hidden text-center"
    :style="{
      height: getStyleVal(height, '100%'),
      width: getStyleVal(width, '100%'),
      minHeight: getStyleVal(minHeight),
    }"
  >
    <canvas
      v-if="showCanvas"
      :id="imgId"
      :canvas-id="imgId"
      type="2d"
      :style="{
        height: getStyleVal(height, '100%'),
        width: getStyleVal(width, '100%'),
      }"
    />
    <!-- loading -->
    <template v-if="showLoading">
      <view
        :style="{
          height: getStyleVal(height, '100%'),
          width: getStyleVal(width, '100%'),
        }"
        class="leff-0 absolute top-0 h-full w-full flex items-center justify-center bg-[#f5f7fa] text-[#a8abb2] dark:bg-[#262727]"
      >
        loading
      </view>
    </template>
    <!-- error -->
    <template v-if="showError">
      <template v-if="props.errConfig?.open">
        <image
          :style="{
            opacity: 1,
            borderRadius: getRadiusVal(),
          }"
          class="up-img"
          :src="props.errConfig?.errSrc"
          :mode="imagePropsProps?.mode"
        />
      </template>
      <view
        v-else
        :style="{
          height: getStyleVal(height, '100%'),
          width: getStyleVal(width, '100%'),
        }"
        class="leff-0 absolute top-0 h-full w-full flex items-center justify-center bg-[#f5f7fa] text-[#a8abb2] dark:bg-[#262727]"
      >
        加载异常
      </view>
    </template>

    <!-- 图片板块 -->
    <!-- 预览图 -->

    <image
      v-if="isShowplaceholderImg"
      class="up-img placeholder"
      :src="placeholderImgSrc"
      :mode="imagePropsProps?.mode"
      :lazy-load="imagePropsProps?.lazyLoad"
      @load="onLoadPreImg"
      @error="imgLoadError"
    />
    <image
      :style="{
        opacity: isShowplaceholderImg ? 0 : 1,
      }"
      class="up-img loaded"
      :src="showImgSrc"
      :mode="imagePropsProps?.mode"
      :lazy-load="imagePropsProps?.lazyLoad"
      @load="onLoad"
      @error="imgLoadError"
    />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
