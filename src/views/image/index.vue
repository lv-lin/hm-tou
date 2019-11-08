<template>
  <div class="container">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div class="btn_box">
        <el-radio-group @change="toggleCollect" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" type="success" size="small" style="float:right">添加素材</el-button>
      </div>
      <!-- 列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 hide-on-single-page(页码小于二是隐藏分页)-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
        hide-on-single-page
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->

    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- 上传组件 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name='image'
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        // 默认查询全部 为true的是查询收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      // 请求头
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 预览图地址
      imageUrl: null
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 上传数据
    handleSuccess (res) {
      this.$message.success('上传素材成功')
      // 获取后台给的地址  给imageUrl赋值
      // res.data.url 才是地址  res叫响应主体
      this.imageUrl = res.data.url
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    //  打开对话框
    openDialog () {
      this.dialogVisible = true
      // 其他业务  清空预览图
      this.imageUrl = null
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }, // 切换收藏
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 收藏
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    // 删除
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 发请求
          await this.$http.delete(`user/images/${id}`)
          // 提示+更新列表
          this.$message.success('删除素材成功')
          this.getImages()
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      line-height: 30px;
      height: 30px;
      color: #fff;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
