import store from '@/store'
// 定义自定义指令
export const imgError = {
  // 当被绑定的元素插入到DOM中时
  // 只会触发一次, 指令绑定的元素插入到dom的时候,图片数据还没请求回来
  inserted: function (el, { value }) {
    // 聚焦元素
    // 监听dom img 图片加载失败的事件
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // update(el, { value }) {
  //   // 监听dom img图片加载失败的事件
  //   if (!el.src) {
  //     el.src = value
  //   } else {
  //     el.onerror = function () {
  //       el.src = value
  //     }
  //   }
  // }

  // 指令所绑定的元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  }
}

// export const aa = {
//   inserted() {}
// }

export const isHas = {
  //bind: 指令和dom绑定
  // inserted: 指令所绑定的元素插入到父节点
  // update: 指令所绑定的Vnode
  inserted(el, binding) {
    const has = store.state.permission.points.includes(binding.value)
    console.log(has);
    if(!has){
      el.remove();
    }
  }
}
