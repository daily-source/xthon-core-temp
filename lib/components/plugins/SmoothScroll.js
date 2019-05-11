export default {
  install (Vue) {
    /**
     * SmoothScroll function from vue2-smooth-scroll plugin.
     *
     * @see https://github.com/Yuliang-Lee/vue2-smooth-scroll/blob/master/src/index.js
     */
    Vue.prototype.smoothScroll = (to, duration = 500, offset = 0, container = window) => {
      if (!window) {
        return
      }
      const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
        window.setTimeout(fn, 16)
      }

      const getTop = (el, start) => {
        if (el.nodeName === "HTML") return -start
        return el.getBoundingClientRect().top + start
      }

      /**
       * ease in out function
       * @see https://gist.github.com/gre/1650294
       */
      const easeInOutCubic = t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)

      if (typeof container === "string") {
        container = document.querySelector(container)
      }

      const scrollTo = document.getElementById(to)
      if (!scrollTo) return

      const startPoint = container.scrollTop || window.pageYOffset

      let end = getTop(scrollTo, startPoint)

      end += offset

      const clock = Date.now()

      const step = () => {
        const elapsed = Date.now() - clock

        let position = end

        if (elapsed < duration) {
          position = startPoint + (end - startPoint) * easeInOutCubic(elapsed / duration)

          requestAnimationFrame(step)
        }

        container === window ? container.scrollTo(0, position) : (container.scrollTop = position)
      }

      step()
    }
  }
}
