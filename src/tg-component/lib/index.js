import amtoback from './a_m_toBack'
import amtitle from './a_m_title'
import amsubmitmodule from './a_m_submitModule'

const components = {
  amtoback,
  amtitle,
  amsubmitmodule
}
// eslint-disable-next-line func-names
const install = function (Vue) {
  if (install.installed) return // 避免重复安装
  Object.keys(components).forEach(key => {
    Vue.component(components[key].name, components[key])
  })
}

const API = {
  install
}

export default API
