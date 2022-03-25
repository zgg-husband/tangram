import amtitle from './src/main.vue'

function amtitleI(Vue) {
  Vue.component(amtitle.name, amtitle)
}
amtitle.install = amtitleI
export default amtitle
