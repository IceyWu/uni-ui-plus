export const liveIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="live-icon">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
    <path d="M15.9 20.11l0 .01" />
    <path d="M19.04 17.61l0 .01" />
    <path d="M20.77 14l0 .01" />
    <path d="M20.77 10l0 .01" />
    <path d="M19.04 6.39l0 .01" />
    <path d="M15.9 3.89l0 .01" />
    <path d="M12 3l0 .01" />
    <path d="M8.1 3.89l0 .01" />
    <path d="M4.96 6.39l0 .01" />
    <path d="M3.23 10l0 .01" />
    <path d="M3.23 14l0 .01" />
    <path d="M4.96 17.61l0 .01" />
    <path d="M8.1 20.11l0 .01" />
    <path d="M12 21l0 .01" />
  </svg>
`

export const errorIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linejoin="round" d="m3.5 3.5l9 9m2-4.5a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0Z"/></svg>
 `

export const createProgressLiveIcon = (progress: number, showSlash: boolean = false) => {
  // 图标尺寸常量
  const ICON_SIZE = 12 // SVG 整体尺寸
  const CENTER_DOT_RADIUS = 1 // 中心圆点半径
  const INNER_CIRCLE_RADIUS = 3 // 内圈半径
  const INNER_CIRCLE_STROKE = 1 // 内圈线宽
  const OUTER_CIRCLE_RADIUS = 5 // 外圈圆点分布半径
  const OUTER_DOT_RADIUS = 0.3 // 外圈圆点大小
  const TOTAL_DOTS = 12 // 外圈圆点数量
  // 计算外圈圆点的数量和位置
  const center = ICON_SIZE / 2 // 中心点坐标
  const dots = Array.from({ length: TOTAL_DOTS }, (_, i) => {
    const angle = (i * 2 * Math.PI) / TOTAL_DOTS
    const x = center + OUTER_CIRCLE_RADIUS * Math.sin(angle)
    const y = center - OUTER_CIRCLE_RADIUS * Math.cos(angle)
    const opacity = i / TOTAL_DOTS <= progress / 100 ? '1' : '0.2'
    return `<circle cx="${x}" cy="${y}" r="${OUTER_DOT_RADIUS}" fill="currentColor" opacity="${opacity}" />`
  }).join('')

  // 添加斜杠的SVG路径
  const slash = showSlash ? '<path d="M1 11L11 1" stroke="currentColor" stroke-width="1.5"/>' : ''

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 ${ICON_SIZE} ${ICON_SIZE}">
    <g fill="none" stroke="currentColor" stroke-width="${INNER_CIRCLE_STROKE}">
      <circle cx="${center}" cy="${center}" r="${CENTER_DOT_RADIUS}" fill="currentColor"/>
      <circle cx="${center}" cy="${center}" r="${INNER_CIRCLE_RADIUS}" />
      ${dots}
      ${slash}
    </g>
  </svg>
`
}
