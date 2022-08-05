<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
const list = [
  { name: '章三', id: 1, pid: 0 },
  { name: '章三三', id: 2, pid: 1 },
  { name: '里斯', id: 3, pid: 0 },
  { name: '里斯斯', id: 4, pid: 3 }
]

function transListToTree(data, pid) {
  const arr = []
  data.forEach((item) => {
    if (item.pid === pid) {
      // 当前: item 就是1级数据 item.id
      const children = transListToTree(data, item.id)
      if (children.length) {
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}
const tree = transListToTree(list, 0)
console.log(tree)

import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
