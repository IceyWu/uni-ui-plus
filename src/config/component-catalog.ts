export type CatalogLocale = 'zh-CN' | 'en-US'

interface DocsComponentNavItem {
  link: string
  text: string
}

interface LocaleText {
  'en-US': string
  'zh-CN': string
}

type CatalogCategoryId = 'basic' | 'display' | 'data'

interface CatalogItem {
  docs: LocaleText & { slug: string }
  id: string
}

interface CatalogCategory {
  docsNavText: LocaleText
  docsSidebarText: LocaleText
  icon?: string
  id: CatalogCategoryId
  items: CatalogItem[]
}

interface HomeCatalogParams {
  locale: string
}

const categories: CatalogCategory[] = [
  {
    docsNavText: { 'en-US': 'Basic Components', 'zh-CN': '基础' },
    docsSidebarText: { 'en-US': 'Basic', 'zh-CN': '基础' },
    icon: 'icon_nav_widget.png',
    id: 'basic',
    items: [
      {
        docs: { 'en-US': 'Empty', slug: 'empty', 'zh-CN': 'Empty 缺省提示' },
        id: 'empty'
      },
      {
        docs: { 'en-US': 'Skeleton', slug: 'skeleton', 'zh-CN': 'Skeleton 骨架屏' },
        id: 'skeleton'
      }
    ]
  },
  {
    docsNavText: { 'en-US': 'Data Display', 'zh-CN': '展示' },
    docsSidebarText: { 'en-US': 'Data Display', 'zh-CN': '展示' },
    icon: 'icon_nav_show.png',
    id: 'display',
    items: [
      {
        docs: { 'en-US': 'Image', slug: 'img', 'zh-CN': 'Image 图片' },
        id: 'img'
      },
      {
        docs: { 'en-US': 'LivePhoto', slug: 'livephoto', 'zh-CN': 'LivePhoto 实况照片' },
        id: 'livephoto'
      },
      {
        docs: { 'en-US': 'Swiper', slug: 'swiper', 'zh-CN': 'Swiper 轮播图' },
        id: 'swiper'
      },
      {
        docs: { 'en-US': 'SwiperNav', slug: 'swiper-nav', 'zh-CN': 'SwiperNav 轮播图导航' },
        id: 'swiper-nav'
      },
      {
        docs: { 'en-US': 'Waterfall', slug: 'waterfall', 'zh-CN': 'Waterfall 瀑布流' },
        id: 'waterfall'
      }
    ]
  },
  {
    docsNavText: { 'en-US': 'Data', 'zh-CN': '数据' },
    docsSidebarText: { 'en-US': 'Data', 'zh-CN': '数据' },
    icon: 'icon_nav_form.png',
    id: 'data',
    items: [
      {
        docs: { 'en-US': 'List', slug: 'list', 'zh-CN': 'List 列表' },
        id: 'list'
      }
    ]
  }
]

function normalizeLocale(locale: string): CatalogLocale {
  return locale === 'en-US' ? 'en-US' : 'zh-CN'
}

function getDocsPathPrefix(locale: CatalogLocale) {
  return locale === 'en-US' ? '/en-US/component/' : '/component/'
}

function getDocsLink(locale: CatalogLocale, item: CatalogItem) {
  return `${getDocsPathPrefix(locale)}${item.docs.slug}`
}

export function getHomeCatalog({ locale }: HomeCatalogParams) {
  const normalizedLocale = normalizeLocale(locale)

  return categories.map((category) => ({
    icon: category.icon ?? '',
    id: category.id,
    name: category.docsSidebarText[normalizedLocale],
    pages: category.items.map((item) => ({
      id: item.id,
      name: item.docs[normalizedLocale]
    }))
  }))
}

export function getDocsComponentNavItems(locale: CatalogLocale): DocsComponentNavItem[] {
  return categories.map((category) => ({
    link: getDocsLink(locale, category.items[0]),
    text: category.docsNavText[locale]
  }))
}

export function getDocsComponentSidebar(locale: CatalogLocale) {
  return categories.map((category) => ({
    collapsed: false,
    items: category.items.map((item) => ({
      link: getDocsLink(locale, item),
      text: item.docs[locale]
    })),
    text: category.docsSidebarText[locale]
  }))
}
