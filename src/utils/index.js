const getImageFileData = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = function(e) {
      const data = e.target.result
      const image = new Image()
      image.onload = function() {
        resolve(scaleImage(image, 1920))
      }
      image.src = data
    }
    reader.readAsDataURL(file)
  })
}

const scaleImage = (image, targetWidth) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const width = image.width
  const height = image.height
  const scaledWidth = targetWidth
  const scaledHeight = scaledWidth / width * height
  canvas.width = scaledWidth
  canvas.height = scaledHeight
  ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight)
  const b64 = canvas.toDataURL('image/jpeg')
  return {
    image: b64,
    width: scaledWidth,
    height: scaledHeight
  }
}

const throttle = (func, wait, options) => {
  var timeout, context, args;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = null;
  };

  return throttled;
}

const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, 99999, 99999)
}

const delay = (timestamp) => {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, timestamp)
  })
}

const getFormData = (formDOM) => {
  const data = {}
  for (let i = 0; i < formDOM.length; i++) {
    const dom = formDOM[i]
    if (dom.type === 'submit' || dom.type === 'button') {
      continue
    } else if (dom.type === 'radio') {
      if (dom.checked) {
        data[dom.name] = dom.value
      }
    } else {
      data[dom.name] = dom.value
    }
  }

  return data
}

const getRandomId = () => Math.random().toString(36).substring(2)

export default {
  getImageFileData,
  throttle,
  delay,
  clearCanvas,
  getFormData,
  getRandomId,
}