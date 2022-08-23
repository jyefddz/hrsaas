import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
import Calender from '@/components/Calender'
import FullScreen from '@/components/FullScreen'
import ToggleLang from '@/components/ToggleLang'
const components = [
  PageTools,
  UploadExcel,
  UploadImg,
  Calender,
  FullScreen,
  ToggleLang
]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
