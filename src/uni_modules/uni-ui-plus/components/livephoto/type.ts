export interface LivePhotoInstance {
  /**
   * 停止视频播放
   */
  stopVideo: () => void

  /**
   * 是否正在播放
   */
  isPlaying: () => boolean

  /**
   * 重置组件状态
   */
  reset: () => void
}
