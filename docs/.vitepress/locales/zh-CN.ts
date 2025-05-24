import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  description: '基于uni-ui的二次封装的uniapp组件库',
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
            link: '/guide/introduction',
          },
          {
            text: '快速上手',
            link: '/guide/quick-use',
          },
          {
            text: '更新日志',
            link: '/guide/changelog',
          },
         
        ]
      },
      {
        text: '组件',
        activeMatch: '/component/',
        items: [
          {
            text: '基础组件',
            link: '/component/button',
          },
        
        ]
      },
     
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          link: '/guide/introduction',
        },
        {
          text: '快速上手',
          link: '/guide/quick-use',
        },
        {
          text: '更新日志',
          link: '/guide/changelog',
        },
      
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
              link: '/component/button',
              text: 'Button 按钮'
            },
           {
              link: '/component/img',
              text: 'Img 图片'
            },
          
          
          ]
        },
       
      ]
    }
  }
})