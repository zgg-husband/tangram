import amsubmitmodule from './src/main.vue'

// eslint-disable-next-line func-names
function amsubmitmoduleI(Vue) {
  Vue.component(amsubmitmodule.name, amsubmitmodule)
}
amsubmitmodule.install = amsubmitmoduleI
export default amsubmitmodule
