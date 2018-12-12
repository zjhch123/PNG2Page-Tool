const getImageData = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = function(e) {
      const data = e.target.result
      const image = new Image()
      image.onload = function() {
        resolve({
          width: image.width,
          height: image.height,
          image
        })
      }
      image.src = data
    }
    reader.readAsDataURL(file)
  })
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

const TOOLS = {
  RECT: '010101'
}

export default {
  getImageData,
  throttle, 
  TOOLS
}