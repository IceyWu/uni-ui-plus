declare module 'vue' {
  export interface GlobalComponents {
    UpButton: typeof import('./components/up-button/up-button.vue')['default']
    UpList: typeof import('./components/up-list/up-list.vue')['default']
    UpImage: typeof import('./components/up-image/up-image.vue')['default']
    UpLivePhoto: typeof import('./components/up-livephoto/up-livephoto.vue')['default']
    UpSwiper: typeof import('./components/up-swiper/up-swiper.vue')['default']
    UpSwiperNav: typeof import('./components/up-swiper-nav/up-swiper-nav.vue')['default']
    UpEmpty: typeof import('./components/up-empty/up-empty.vue')['default']
    UpSkeleton: typeof import('./components/up-skeleton/up-skeleton.vue')['default']
    UpWaterfall: typeof import('./components/up-waterfall/up-waterfall.vue')['default']
    UpConfigProvider: typeof import('./components/up-config-provider/up-config-provider.vue')['default']
  }
}

export {}
