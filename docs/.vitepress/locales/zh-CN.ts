import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  description: '🚀 现代化的 uni-app 组件库，提供丰富的高质量组件',
  themeConfig: {
    lastUpdated: {
      text: '最后更新'
    },
    editLink: {
      pattern: 'https://github.com/IceyWu/uni-ui-plus/edit/master/docs/:path',
      text: '为此页提供修改建议'
    },
    nav: [
      {
        text: '指南',
        activeMatch: '/guide/',
        items: [
          {
            text: '介绍',
            link: '/guide/introduction'
          },
          {
            text: '快速上手',
            link: '/guide/quick-use'
          },
          {
            text: '更新日志',
            link: '/guide/changelog'
          }
        ]
      },
      {
        text: '组件',
        activeMatch: '/component/',
        items: [
          {
            text: '基础组件',
            link: '/component/list'
          }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          link: '/guide/introduction'
        },
        {
          text: '快速上手',
          link: '/guide/quick-use'
        },
        {
          text: '更新日志',
          link: '/guide/changelog'
        }
      ],

      '/component/': [
        {
          text: '基础',
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
              link: '/component/waterfall',
              text: 'Waterfall 瀑布流'
            },
             {
              link:'/component/livephoto',
              text: 'LivePhoto 实况照片'
            }
          ]
        }
      ]
    }
  }
})
