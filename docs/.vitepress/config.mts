import { defineConfig } from 'vitepress';
import viteCompression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'
import { MarkdownTransform } from './plugins/markdown-transform'
import llmstxt from 'vitepress-plugin-llms'
import zhCN from './locales/zh-CN'
export default defineConfig({
  vite: {
    plugins: [
      llmstxt({
        ignoreFiles: ['reward/*', 'index.md', 'README.md', 'en-US/*.md', 'en-US/**/*.md', 'ads/*', 'guide/cases.md', 'guide/changelog.md', 'guide/join-group.md', 'guide/typography.md'],
        domain: 'haaaaaaaaaaaaa-uni.cn',
      }),
      MarkdownTransform(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
    ssr: { noExternal: ['element-plus'] },
    resolve: {
      alias: [
        {
          find: /^.*\/VPSidebar\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPSidebar.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPContent\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPContent.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPDoc\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPDoc.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPLocalNav\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPLocalNav.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPNavBar.vue', import.meta.url)
          )
        }
      ]
    }
  },
  title: `uni-ui-plus`,
  description: '一个基于uni-ui打造的uni-app组件库',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      ...zhCN
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?c77588a5308ea5813c1d46bdd849338b";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ],
  themeConfig: {
    logo: '/logo.png',
    lastUpdated: {
      text: '最后更新'
    },
    editLink: {
      pattern: 'https://github.com/IceyWu/uni-ui-plus/edit/master/docs/:path',
      text: '为此页提供修改建议',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/IceyWu/uni-ui-plus' },
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: '',
        apiKey: '',
        indexName: '',
      },
    },

    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2023-present weisheng',
    },
    nav: [
      {
        text: '指南', activeMatch: '/guide/', items: [
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
          }
        ]
      },
      {
        text: '组件', activeMatch: '/component/', items: [
          {
            text: '基础组件',
            link: "/component/button",
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
              link: "/component/button",
              text: "Button 按钮"
            },
            {
              link: "/component/list",
              text: "List 列表"
            },
          ]
        },
       
      ]
    }

  },
  ignoreDeadLinks: true,

})
