import Vue from "vue"
import wysiwyg from "vue-wysiwyg-2"

Vue.use(wysiwyg, {
  hideModules: {
    "justifyLeft": true,
    "justifyCenter": true,
    "justifyRight": true,
    "code": true,
    "table": true
  },
  forcePlainTextOnPaste: true
})
