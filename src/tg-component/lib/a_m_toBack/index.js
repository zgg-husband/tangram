import amtoback from './src/main.vue'

function amtobackI(Vue) {
  Vue.component(amtoback.name, amtoback)
}
amtoback.install = amtobackI
export default amtoback
