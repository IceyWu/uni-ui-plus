declare module 'vue-i18n' {
  export function createI18n(options?: any): any
  export function useI18n(options?: any): any
  export interface Composer {
    t(key: string | number, ...args: any[]): string
  }
}
