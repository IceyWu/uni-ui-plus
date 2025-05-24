<template>
  <page-wraper :use-wx-ad="false" :use-reward-fab="true">
    <view class="page">
      <view class="page__hd">
        <view class="page__title">
          <view class="logo"></view>
          <view class="inline">
            uni-ui-plus
            <text class="version">@{{ packageConfig.version }}</text>
          </view>
        </view>
        <view class="page__desc">
          {{
            $t(
              'wot-design-uni-shi-yi-ge-ji-yu-vue3ts-kai-fa-de-uniapp-zu-jian-ku-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti'
            )
          }}
        </view>
      </view>
      <view class="page__bd">
        <block v-for="(item, index) in list" :key="index">
          <view class="kind-list__item">
            <view :id="item.id" class="up-flex kind-list__item-hd" @click="kindToggle(item.id)">
              <view class="up-flex__item title">{{ item.name }}</view>
              <image class="kind-list__img" :src="item.icon"></image>
            </view>
            <view :class="['kind-list__item-bd', openState[item.id] ? 'kind-list__item-bd_show' : '']">
              <view :class="['up-cells', openState[item.id] ? 'up-cells_show' : '']">
                <view
                  class="up-cell"
                  v-for="(page, j) in item.pages"
                  :key="j"
                  is-link
                  :label="page.name"
                  @click="handleClick(`/subPages/${page.id}/Index`)"
                >
                  {{ page.name }}
                </view>
              </view>
            </view>
          </view>
        </block>
      </view>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import packageConfig from '../../../package.json'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const imgModules: any = import.meta.glob('../images/*.png', { eager: true })

// 使用computed使list响应语言变化
const list = computed(() => [
  {
    id: 'widget',
    name: t('ji-chu'),
    open: false,
    icon: imgModules['../images/icon_nav_widget.png'].default,
    pages: [
      {
        id: 'button',
        name: t('button-an-niu')
      },
      {
        id: 'list',
        name: t('lie-biao')
      }
    ]
  },
  {
    id: 'show',
    name: t('shu-ju-zhan-shi'),
    open: false,
    icon: imgModules['../images/icon_nav_show.png'].default,
    pages: [
      {
        id: 'img',
        name: t('img-tu-pian')
      }
    ]
  }
])

function handleClick(url: string) {
  uni.navigateTo({
    url
  })
}

// 创建一个状态来跟踪每个分类的打开状态
const openState = ref<Record<string, boolean>>({})

function kindToggle(id: string) {
  openState.value[id] = !openState.value[id]
}

onShareAppMessage(() => {
  return {
    title: t('yi-ge-ji-yu-vue3ts-de-uniapp-zu-jian-ku-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti'),
    path: '/pages/index/Index',
    imageUrl: imgModules['../images/share.png'].default
  }
})

onShareTimeline(() => {
  return {
    title: t('yi-ge-ji-yu-vue3ts-de-uniapp-zu-jian-ku-ti-gong-70-gao-zhi-liang-zu-jian-zhi-chi-an-hei-mo-shi-guo-ji-hua-he-zi-ding-yi-zhu-ti-0'),
    path: '/pages/index/Index',
    imageUrl: imgModules['../images/share.png'].default
  }
})
</script>

<style lang="scss" scoped>
.wot-theme-dark {
  .page__hd,
  .kind-list__item {
    background: $-dark-background2;
  }

  .title {
    color: $-dark-color;
  }

  :deep(.up-cell__label) {
    color: $-dark-color3 !important;
  }

  .kind-list__img {
    filter: invert(100%);
  }
}

.page__hd {
  padding: 40px 40px 30px;
  margin-bottom: 30px;
  background: #fff;
}

.page__title {
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  color: #0083ff;
}

.page__desc {
  margin-top: 20px;
  color: #999;
  text-align: left;
  font-size: 12px;
}

.page__bd {
  padding: 0 15px 30px 20px;
  user-select: none;
}

.logo {
  display: inline-block;
  margin-right: 14px;
  width: 40px;
  height: 40px;
  background: url('data:image/x-icon;base64,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+f/IpPn/w575/6yL9/+2t/P/Z7j2/0/D+P/j6vr92cL5/9Gr+v/Io/n/wp75/7KR+P+bkfH/tcDx/73J9v/K0vb/zsz3/7up+P/Govr/x6P6/8Wf+f++mfr/rI7z/8HH8P9IrOz/P7z3/03H+/9Cwfr/L7Py/yat7/8hqu3/Jqvt/zKr7P9Ts+3/j8v0esDq/wKx5vsgiuX78X/l/P+A5fz/fOP8/6fH+v/Np/r/y6f6/8ql+v+7mPr/QI/1/1TK+v/S7fv/4M/6/9Ww+v/NqPn/yqX6/8Ge+f+mivj/s7fy/1y29f9Cv/f/cd38/3be+//l7Pv/2cD6/9Cs+f/Mp/n/x6P5/8Kc+f+qi/f/u8Dz/1W09v9dy/n/3Or6/dvG+v/Qrfr/yaX5/8Wg+f+8mvn/pIf3/5yM9f+gk/T/o5H2/6uR+f+/nfn/x6H7/8ih+v/En/n/vZf5/66e7v/F0PP/M6/x/03G+/89vPn/HKjw/xyo7P8fqe3/Hqnt/yWr7f8wq+z/T7Hs/4vJ85XB6/4Cr+b7Korl+/WB5vz/gOb8/37k/P+4xvr/1bL6/9Ku+v/NqPr/xJ/6/1qL9f9TyPr/vuv8/+bc+//Xtfr/0av6/8ym+v/FoPn/ro34/7u79P9quvX/Ucn5/3Ld/P943vv/6e37/9e/+f/Rrvn/y6f5/8ij+f+/mvn/qI71/8bM8/9Fs/b/a9f7/9Pp+v3ezPr/0rH5/8un+f/Hovn/xJ/5/72b+f+2lvn/tJX5/7qZ+f/Anvn/xaD6/8ai+f/GoPr/w535/7aV9v/My/P/jsHw/0vE+v9awPr/d4/3/2GK9P82l/D/HKTr/x6p7P8nq+3/Mazt/02w7P+HxvKlwev/Aq7n+yyL5/v3g+b8/4Pn/P+C5fz/lN77/83L+v/VwPr/0az6/8mi+v9li/X/aNT7/6Pn/P/s6vv/3MD6/9e3+v/Oqfr/yaL6/7KS9//S0vf/Z772/2rX+/9z3Pz/dt77/+Lu+//cxvr/1rf5/82p+f/Io/n/v5r5/7Cg9f/G0/X/ScD4/3Tc+//C6Pr/4tb5/9m5+f/Oqvn/yaT5/8ei+f/GoPn/xKD5/8Sg+f/Fofn/xaH5/8ai+f/Gofn/xZ/5/8Kb+f/FuPX/0dj2/13F+P9Uyfv/jrD6/7uU+v+wi/n/ooX3/2qN8v8epev/KKvt/zSr7P9Jruv/hcXxq8Dq/gKw5/sqjef79YPm/P+E5/z/heX8/4Tj/P+D4vz/ptP6/9i2+v/KpPr/c7D4/3vg/P+B4fz/5vH8/+PW+//bvPr/0676/8ul+v/Lufn/3OD5/2zO+f9y2/v/c9v7/3Td+//J6/v/5Nr6/9y/+v/TsPr/zKb5/76b+P/Qyvf/o9D3/2vW+/913fv/pOT7/+rm+v3cwvr/17j5/82o+f/Kpfn/yaT5/8mk+f/IpPn/yaT5/8ij+f/JpPn/yaP5/8ag+f/QvPn/39/3/4XN+f9YzPv/Vsr7/7Oo+f++l/r/t5D5/7aP+v+qiPj/Qp7u/zWy8f82rO3/SK/s/4bF8avB6/8Csuf7Jo/o+/OG5/z/hef8/4jm/P+G5fz/huT8/4jj/P+0zPr/psP5/3re/P994Pz/feH8/6Hn/P/u8Pz/5+D7/+HR+//i2Pv/6Of6/6Xc+v9x2vv/ctv7/3Pc/P903fv/juL7/+zv+//i2Pr/2sH6/9a8+v/b0Pn/3uH4/37X+/903Pv/d977/3zf+//f7Pr/5Nz6/9m++v/Vsfr/0qz6/9Cr+v/Oqvr/zqj6/86o+v/OqPr/zan5/9K2+v/e1Pn/4uP4/5PT+f9bzfv/W837/17J+v/Gpfn/wJf6/7qS+v+8k/r/s435/1Ss8v86tfL/Oq7t/06v6v+IxvGjwev/ArTo/B6R6fvtien8/4jo/P+I5/z/ief8/4rm/P+I5fz/hOP8/4Li/P+C4vz/gOL8/37i/P923fz/jeD7/83s+//g7vv/0Or6/57g+v9x2/v/dNz7/3Pb+/902/v/c9z8/3fd+/+Y4/v/4e77/+/u+//t7Pr/3en6/5Pd+v9z3Pv/d937/3nd+/963vv/jOH7/97t+//r6fr/49v6/93O+f/axvn/2sP6/9nD+v/byPr/3s/5/+Td+v/p5/r9zeT6/3/V+/9g0fv/XtD7/1vO+/9fyvv/y6r6/8CZ+v+0j/j/lKL0/32u9/9Du/P/O7by/zuv7f9Sr+n/isfykcHr/wK46fwWler75Yrq+/+J6fz/i+n8/4zo/P+O5/z/jub8/4rl/P+I5Pz/heT8/4Li/P9/3fv/asf4/zu79/9z2/v/d9/7/3bd+/923Pv/dd37/3Td/P9z3fz/c9z8/3Tb+/913Pv/dd37/3fd+/+L4fv/iuH7/3nd+/943fv/ed37/3re+/983vv/e977/3ve+/9+3vv/puX7/8vq+v/g7fr/6+36/+vs+v/q7fr/5uz6/9bp+v+34vr/i9r6/2fV+/9k1fv/YNP7/0fE+P8+u/b/Vcn6/7S8+v/Fnvr/ppj2/0a89v9Jwfj/Rb71/z648v8/ruz/V7Dq/5DL83YAAAACvOr9DJnq+9WM6vv/iun8/4zq/P+R6fz/kej8/5Po/P+P5vz/jOb8/4nl/P+P5fz/3+v7/+Pn+/9ww/f/bNj7/3re+/943vv/d977/3fe+/903vz/dN38/3Ld/P9z2/z/c9z8/3Lc+/903Pv/dN37/3Xe+/953fv/ed77/3vf+/994Pz/geH8/4Hf+/9+3/v/e9/7/3ne+/943vv/d977/3fc+/963fv/etz7/3DZ+/9r1/v/atf7/2fX+/9m1/v/Z9b7/4TU+v+Cw/X/M63w/zy59f9mzPv/i7z6/2HB+v9Pxvr/TMP5/0e/9f9BuPH/Qq/s/1+z6v2Z0vVQAAAAAL/r/gaf6/u3jer7/43r+/+M6vv/ken8/5no/P+b6Pz/mOj8/5Hn/P+L5vz/pOn8/+7w+//p6/v/lc/3/3ne/P983/z/et/7/3bf+/933vv/dN77/3Td/P9z3fz/ctz8/3Lc/P9z3Pz/c938/3bd+/913vv/ed77/3rf/P994Pz/geH8/4bj/P+F4vv/hOL7/3/h/P993/z/et/8/3fe/P903Pv/cdz8/3Dc/P9u2/z/a9r8/2vZ/P9q2Pz/adj8/2/a+//g6Pr/3eL5/5nF8v86tvL/Xs/7/1vM+/9Yyvv/VMj6/03E+f9IwPb/Q7jx/0Sv6/9quOz1qd/5JAAAAALA6/4Cp+z7hZDr+/+N6/v/juv8/5Lq/P+g6vz/per8/57p/P+Y6Pz/kef8/5Hm/P/k8fz/5e37/4/e+/9+4fz/fOD8/3nf/P933vz/dt77/3Te+/903fz/c938/3Lc/P9w3Pz/cd38/3Hd/P903fz/dd77/3je/P974Pz/gOH8/4Xk/P+L5vz/jeb8/4rl/P+H4/z/guH8/37g/P973/v/d977/3Pd/P9x3Pz/b9v8/23b/P9t2vz/a9n8/2rZ/P9y2/v/5uz7/+Hl+f++0vT/T8b3/1/R+/9bz/v/Wsv7/1XJ+v9NxPn/SMD2/0S58f9Jruv/esPx17rp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AAIAAAACAAAAAgAAAAIAAAAAAAAAAgAAAAIAAAAAAAAAAgAAAAIAAAAAAAAAAgAAAAAAAAACAAAAAgAAAAAAAAACAAAAAgAAAAIAAAACAAAAAAAAAAIAAAACAAAAAAAAAAIAAAACAAAAAAAAAAIAAAAAAAAAAgAAAAIAAAAAAAAAAgAAAAIAAAACAAAAAgAAAAAAAAACAAAAAgAAAAAAAAACAAAAAgAAAAAAAAACAAAAAAAAAAIAAAACAAAAAAAAAAIAAAACAAAAAgAAAAIAAAAAAAAAAgAAAAIAAAAAAAAAAgAAAAIAAAAAAAAAAgAAAAAAAAAC///////////////4P////////8AH////////AAH///////4AAH//////+AAAP//////wAAAf/////+AAAA//////wAAAA/////+AAAAB/////wAAAAD////+AAAAAH////wAAAAAP///+AAAAAA////wAAAAAB///+AAAAAAD///4AAAAAAH///AAAAAAAP//4AAAAAAA///AAAAAAAB//8AAAAAAAD//gAAAAAAAP/+AAAAAAAAf/wAAAAAAAB/+AAAAAAAAD/4AAAAAAAAP/AAAAAAAAAf8AAAAAAAAB/wAAAAAAAAD+AAAAAAAAAP4AAAAAAAAAfgAAAAAAAAB8AAAAAAAAAHwAAAAAAAAAPAAAAAAAAAA4AAAAAAAAADgAAAAAAAAAOAAAAAAAAAA4AAAAAAAAADgAAAAAAAAAGAAAAAAAAAAYAAAAAAAAABgAAAAAAAAAGAAAAAAAAAAYAAAAAAAAABgAAAAAAAAAOAAAAAAAAAA4AAAAAAAAADgAAAAAAAAAPAAAAAAAAAA8AAAAAAAAAHwAAAAAAAAAfgAAAAAAAAD/AAAAAAAAAP8AAAAAAAAB/4AAADgAAAH/wAAAfgAAA//gAAD/AAAH//AAA/+AAA//+AAH/+AAP//+AB//+AB////A////A///////////////////////8=')
    no-repeat;
  background-size: cover;
  vertical-align: middle;
}

.inline {
  display: inline-block;
  vertical-align: middle;
}

.version {
  font-size: 14px;
}

.up-cell_access {
  padding: 15px 20px;
}

.up-cell__ft {
  padding-right: 16px;
  position: relative;
}

.up-cells {
  position: relative;
  margin-top: 0;
  opacity: 0;
  transform: translateY(-50%);
  transition: 0.3s;

  color: rgba(0, 0, 0, 0.65);

  .up-cell {
    background: #fff;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 10px 30px;
    font-size: 14px;
    border-bottom: 1px solid #f0f0f0;
    &:not(:last-child) {
      margin-bottom: 0;
      // border-bottom: 0;
    }
  }

  :deep(.up-cell__label) {
    color: rgba(0, 0, 0, 0.65);
  }
}

.up-cells_show {
  opacity: 1;
  transform: translateY(0);
}

.kind-list__item {
  border-radius: 30px;
  background: #fff;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.kind-list__img {
  width: 20px;
  height: 20px;
}

.kind-list__item-hd {
  padding: 15px 30px;
  transition: opacity 0.3s;
}

.kind-list__item-bd {
  height: 0;
  overflow: hidden;
}

.kind-list__item-bd_show {
  height: auto;
}

.up-flex {
  display: flex;
}

.up-flex__item {
  flex: 1;
}

.title {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}

.page-name {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
}

.up-tool-right-line-angle::after {
  content: ' ';
  display: inline-block;
  height: 8px;
  width: 8px;
  border-width: 2px 2px 0 0;
  border-color: #b2b2b2;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -5px;
  right: 0;
}
</style>
