const _window = globalThis as any

export const inBrowser = typeof globalThis !== 'undefined'

function requestAniFrame() {
  return _window === undefined
    ? function (callback: () => void) {
        setTimeout(callback, 1000 / 60)
      }
    : _window.requestAnimationFrame ||
        _window.webkitRequestAnimationFrame ||
        function (callback: () => void) {
          _window.setTimeout(callback, 1000 / 60)
        }
}

export function cancelRaf(id: number) {
  if (inBrowser) cancelAnimationFrame(id)
  else clearTimeout(id)
}

export default requestAniFrame()
