const scrollbarWidth = (): number => {
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.top = div.style.left = '-9999px' //把div放到屏幕外
  div.style.width = div.style.height = '100px'
  div.style.overflow = 'scroll'

  document.body.appendChild<HTMLDivElement>(div)

  const width = div.offsetWidth - div.clientWidth // 包含滚动条的宽度 - 不包含滚动条的宽度
  document.body.removeChild<HTMLDivElement>(div)

  return  width
}
export default scrollbarWidth