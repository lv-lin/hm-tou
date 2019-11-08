<template>
  <el-container class="my-container">
    <el-aside :width="isCollapse?'64px':'200px'">
      <!-- logo -->
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <!-- 属性的时候  如果是布尔类型的属性  有属性代码true  没有属性代表false -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
       <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
       <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggleAside()" class="icon el-icon-s-fold"></span>
        <span class="text">&nbsp;江苏传智播客科技有限公司</span>
        <el-dropdown class="my-dropdown"  @command="clickItem">
          <span class="el-dropdown-link">
            <img :src="photo" alt class="avatar" />
            &nbsp;&nbsp;&nbsp;
            <span class="name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    clickItem (command) {
      this[command]()
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.delUser()
      this.$router.push('/login')
    },
    toggleAside () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .miniLogo{
        background-image: url(../../assets/images/logo_admin_01.png);
        background-size: 36px auto;
    }
    .el-menu{
      border-right: none;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .avatar {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        display: inline-block;
      }
      .name {
        vertical-align: middle;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}
</style>
