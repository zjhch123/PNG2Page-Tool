
const b64ToImgs = (b64, height = 600) => {
  return new Promise(res => {
    const image = new Image()
    const canvas = document.createElement('canvas')
    canvas.width = 1920
    const ctx = canvas.getContext('2d')
    const ret = []

    image.onload = () => {
      const w = 1920
      const h = image.height
      const splitLength = Math.floor(h / height)
      const lastHeight = h - splitLength * height
      canvas.height = height

      for (let i = 0; i < splitLength; i++) {
        ctx.clearRect(0, 0, 1920, height)
        ctx.drawImage(image, 0, height * i, w, height, 0, 0, 1920, height)
        ret.push(canvas.toDataURL('image/jpeg'))
      }

      if (lastHeight !== 0) { // 最后一张
        canvas.height = lastHeight
        ctx.clearRect(0, 0, 1920, lastHeight)
        ctx.drawImage(image, 0, height * splitLength, w, lastHeight, 0, 0, 1920, lastHeight)
        ret.push(canvas.toDataURL('image/jpeg'))
      }

      res(ret)
    }
    image.src = b64
  })
}

export default {
  async toHTML(b64, data) {
    const images = await b64ToImgs(b64)

    document.body.innerHTML = ''

    setTimeout(() => {
      images.map(d => {
        const i = document.createElement('img')
        i.src = d
        return i
      }).forEach(img => {
        document.body.append(img)
      })
    }, 2000)
  }
}