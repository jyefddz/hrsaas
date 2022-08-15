<template>
  <div>
    <el-upload
      v-load="loading"
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDtc6KIzQaT5RWJp8AvPcYDckcDXZKo1xb',
  SecretKey: 'PXNxGI3YlhMkqfDUUDfpiLhmb8PP8ale'
})
console.log(cos)
// 企业开发id和key怎么获取,肯定不是明文
// var cos = new COS({
//   getAuthorization: async function (option, callback) {
//     // 发送请求获取id和key
//     const res = await axios.get('url')
//     callback({
//       TmpSecretId: credentials.tmpSecretId,
//       TmpSecretKey: credentials.tmpSecretKey,
//       SecurityToken: credentials.sessionToken,
//       // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
//       StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
//       ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000000
//     })
//   }
// })
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      previewImgDialog: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hmhr-juan-1313341630' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          // 成功或失败都进入该函数
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('亲,上传失败,请重试')
          }
          this.$emit('onSuccess', { url: 'https://' + data.Location })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      // 可以上传的图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }
      //   限制上传的图片大小
      const maxSize = 180 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超过2mb')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
