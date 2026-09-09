import { defineConfig } from 'vitepress'

export default defineConfig({
  description: '🚀 现代化的 uni-app 组件库，提供丰富的高质量组件',
  lang: 'zh-CN',
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/IceyWu/uni-ui-plus/edit/master/docs/:path',
      text: '为此页提供修改建议'
    },
    lastUpdated: {
      text: '最后更新'
    },
    nav: [
      {
        activeMatch: '/guide/',
        items: [
          {
            link: '/guide/introduction',
            text: '介绍'
          },
          {
            link: '/guide/quick-use',
            text: '快速上手'
          },
          {
            link: '/guide/dark-mode',
            text: '深色模式'
          },
          {
            link: '/guide/changelog',
            text: '更新日志'
          }
        ],
        text: '指南'
      },
      {
        activeMatch: '/component/',
        items: [
          {
            link: '/component/list',
            text: '基础组件'
          }
        ],
        text: '组件'
      }
    ],
    sidebar: {
      '/component/': [
        {
          collapsed: false,
          items: [
            {
              link: '/component/list',
              text: 'List 列表'
            },

            {
              link: '/component/img',
              text: 'Img 图片'
            },
            {
              link: '/component/skeleton',
              text: 'Skeleton 骨架屏'
            },
            {
              link: '/component/empty',
              text: 'Empty 空状态'
            },
            {
              link: '/component/config-provider',
              text: 'ConfigProvider 全局配置'
            },
            {
              link: '/component/waterfall',
              text: 'Waterfall 瀑布流'
            },
            {
              link: '/component/livephoto',
              text: 'LivePhoto 实况照片'
            },
            {
              link: '/component/swiper',
              text: 'Swiper 轮播图'
            }
          ],
          text: '基础'
        }
      ],
      '/guide/': [
        {
          link: '/guide/introduction',
          text: '介绍'
        },
        {
          link: '/guide/quick-use',
          text: '快速上手'
        },
        {
          link: '/guide/dark-mode',
          text: '深色模式'
        },
        {
          link: '/guide/changelog',
          text: '更新日志'
        }
      ]
    }
  }
})
