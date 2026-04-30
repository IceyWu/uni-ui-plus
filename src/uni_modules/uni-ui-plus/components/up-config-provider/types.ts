import type { ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeStringProp } from '../../common/props'

export type ConfigProviderTheme = 'light' | 'dark'

export const configProviderProps = {
  ...baseProps,
  /**
   * 主题风格，设置为 dark 来开启深色模式，全局生效
   */
  theme: makeStringProp<ConfigProviderTheme>('light'),
  /**
   * 自定义主题变量
   */
  themeVars: {
    type: Object as PropType<ConfigProviderThemeVars>,
    default: () => ({})
  }
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type baseThemeVars = {
  colorTheme?: string
  colorWhite?: string
  colorBlack?: string
  colorSuccess?: string
  colorWarning?: string
  colorDanger?: string
  colorInfo?: string
  darkBackground?: string
  darkColor?: string
}

export type emptyThemeVars = {
  emptyPadding?: string
  emptyImageSize?: string
  emptyDescriptionMarginTop?: string
  emptyDescriptionColor?: string
  emptyDescriptionFontSize?: string
  emptyDescriptionLineHeight?: string
  emptyDescriptionPadding?: string
}

export type skeletonThemeVars = {
  skeletonBackgroundColor?: string
  skeletonAnimationGradient?: string
  skeletonBorderRadius?: string
}

export type swiperThemeVars = {
  swiperRadius?: string
  swiperItemPadding?: string
  swiperItemTextColor?: string
  swiperItemTextFs?: string
}

export type swiperNavThemeVars = {
  swiperNavDotColor?: string
  swiperNavDotActiveColor?: string
  swiperNavDotSize?: string
  swiperNavDotsBarActiveWidth?: string
  swiperNavFractionColor?: string
  swiperNavFractionBgColor?: string
  swiperNavFractionHeight?: string
  swiperNavFractionFontSize?: string
  swiperNavBtnColor?: string
  swiperNavBtnBgColor?: string
  swiperNavBtnSize?: string
}

export type ConfigProviderThemeVars = baseThemeVars & emptyThemeVars & skeletonThemeVars & swiperThemeVars & swiperNavThemeVars
