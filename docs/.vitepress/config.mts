import { fileURLToPath, URL } from 'node:url'
import viteCompression from 'vite-plugin-compression'
import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'
import { getDocsComponentNavItems, getDocsComponentSidebar } from '../../src/config/component-catalog'
import zhCN from './locales/zh-CN'
import { MarkdownTransform } from './plugins/markdown-transform'
export default defineConfig({
  description: '一个基于uni-ui打造的uni-app组件库',
  head: [
    ['link', { href: '/favicon.ico', rel: 'icon' }],
    [
      'script',
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?c77588a5308ea5813c1d46bdd849338b";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `
    ]
  ],
  ignoreDeadLinks: true,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      ...zhCN
    }
  },
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/IceyWu/uni-ui-plus/edit/master/docs/:path',
      text: '为此页提供修改建议'
    },

    footer: {
      copyright: 'Copyright © 2023-present weisheng',
      message: `Released under the MIT License.`
    },
    lastUpdated: {
      text: '最后更新'
    },
    logo: '/logo.png',
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
            link: '/guide/changelog',
            text: '更新日志'
          }
        ],
        text: '指南'
      },
      {
        activeMatch: '/component/',
        items: getDocsComponentNavItems('zh-CN'),
        text: '组件'
      }
    ],
    search: {
      options: {
        apiKey: 'e49f270181e93a6b0206dfd7967b1038',
        appId: '4C6QHNDI1I',
        indexName: 'uni-ui-plus-docs'
      },
      provider: 'algolia'
    },
    sidebar: {
      '/component/': getDocsComponentSidebar('zh-CN'),
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
          link: '/guide/changelog',
          text: '更新日志'
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/IceyWu/uni-ui-plus' }]
  },
  title: `uni-ui-plus`,
  vite: {
    plugins: [
      llmstxt({
        domain: 'haaaaaaaaaaaaa-uni.cn',
        ignoreFiles: [
          'reward/*',
          'index.md',
          'README.md',
          'en-US/*.md',
          'en-US/**/*.md',
          'ads/*',
          'guide/cases.md',
          'guide/changelog.md',
          'guide/join-group.md',
          'guide/typography.md'
        ]
      }),
      MarkdownTransform(),
      viteCompression({
        algorithm: 'gzip',
        disable: false,
        ext: '.gz',
        threshold: 10_240,
        verbose: true
      })
    ],
    resolve: {
      alias: [
        {
          find: /^.*\/VPSidebar\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPSidebar.vue', import.meta.url))
        },
        {
          find: /^.*\/VPContent\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPContent.vue', import.meta.url))
        },
        {
          find: /^.*\/VPDoc\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPDoc.vue', import.meta.url))
        },
        {
          find: /^.*\/VPLocalNav\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPLocalNav.vue', import.meta.url))
        },
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPNavBar.vue', import.meta.url))
        }
      ]
    },
    ssr: { noExternal: ['element-plus'] }
  }
})
