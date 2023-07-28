// Credit: https://stackoverflow.com/questions/37256745/object-fit-get-resulting-dimensions
// Thank you so much @s-ol :>
type Rect = {
  x: number
  y: number
  width: number
  height: number
}

const dom2rect = (rect: DOMRect): Rect => {
  const { x, y, width, height } = rect
  return { x, y, width, height }
}

const intersectRects = (a: Rect, b: Rect): Rect | null => {
  const x = Math.max(a.x, b.x)
  const y = Math.max(a.y, b.y)
  const width = Math.min(a.x + a.width, b.x + b.width) - x
  const height = Math.min(a.y + a.height, b.y + b.height) - y

  if (width <= 0 || height <= 0) return null

  return { x, y, width, height }
}

type ObjectRects = {
  container: Rect // client-space size of container element
  content: Rect // natural size of content
  positioned: Rect // scaled rect of content relative to container element (may overlap out of container)
  visible: Rect | null // intersection of container & positioned rect
}

const parsePos = (str: string, ref: number): number => {
  switch (str) {
    case 'left':
    case 'top':
      return 0

    case 'center':
      return ref / 2

    case 'right':
    case 'bottom':
      return ref

    default:
      const num = parseFloat(str)
      if (str.endsWith('%')) return (num / 100) * ref
      else if (str.endsWith('px')) return num
      else
        throw new Error(`unexpected unit object-position unit/value: '${str}'`)
  }
}

const getObjectRects = (
  image: HTMLImageElement | HTMLVideoElement
): ObjectRects => {
  const style = window.getComputedStyle(image)
  const objectFit = style.getPropertyValue('object-fit')

  const naturalWidth =
    image instanceof HTMLImageElement ? image.naturalWidth : image.videoWidth
  const naturalHeight =
    image instanceof HTMLImageElement ? image.naturalHeight : image.videoHeight

  const content = { x: 0, y: 0, width: naturalWidth, height: naturalHeight }
  const container = dom2rect(image.getBoundingClientRect())

  let scaleX = 1
  let scaleY = 1

  switch (objectFit) {
    case 'none':
      break

    case 'fill':
      scaleX = container.width / naturalWidth
      scaleY = container.height / naturalHeight
      break

    case 'contain':
    case 'scale-down': {
      let scale = Math.min(
        container.width / naturalWidth,
        container.height / naturalHeight
      )

      if (objectFit === 'scale-down') scale = Math.min(1, scale)

      scaleX = scale
      scaleY = scale
      break
    }

    case 'cover': {
      const scale = Math.max(
        container.width / naturalWidth,
        container.height / naturalHeight
      )
      scaleX = scale
      scaleY = scale
      break
    }

    default:
      throw new Error(`unexpected 'object-fit' value ${objectFit}`)
  }

  const positioned = {
    x: 0,
    y: 0,
    width: naturalWidth * scaleX,
    height: naturalHeight * scaleY,
  }

  const objectPos = style.getPropertyValue('object-position').split(' ')
  positioned.x = parsePos(objectPos[0], container.width - positioned.width)
  positioned.y = parsePos(objectPos[1], container.height - positioned.height)

  const containerInner = {
    x: 0,
    y: 0,
    width: container.width,
    height: container.height,
  }

  return {
    container,
    content,
    positioned,
    visible: intersectRects(containerInner, positioned),
  }
}

export default getObjectRects
