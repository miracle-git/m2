const imageIsExist = function(url) {
  return new Promise((resolve) => {
    let img = new Image()
    img.onload = function () {
      if (this.complete === true) {
        resolve(true)
        img = null
      }
    }
    img.onerror = function () {
      resolve(false)
      img = null
    }
    img.src = url
  })
}

const setImg = function (el, binding) {
  const imgURL = binding
  if (imgURL) {
    imageIsExist(imgURL).then(res => {
      if (res && el) {
        el.setAttribute('src', imgURL)
      }
    })
  }
}

export default {
  inserted(el, binding) {
    setImg(el, binding.value)
  }
}
