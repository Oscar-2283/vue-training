<template>
  <h1 class="text-center">
    你現在在後頁面
  </h1>
  <div class="d-flex gap-3 justify-content-center">
    <router-link to="/">回前台</router-link> |
    <router-link to="/BackAdmin/ProductsView">產品列表</router-link> |
    <router-link to="/BackAdmin/OrderView">訂單列表</router-link> |
    <a href="#" @click.prevent="logOut">登出</a>

  </div>
  <hr>
  <router-view></router-view>
</template>
<script>
const { VITE_URL } = import.meta.env
export default {
  methods: {
    checkAdmin () {
      this.$http
        .post(`${VITE_URL}/api/user/check`)
        .catch(() => {
          alert('請登入')
          this.$router.push('/LogIn')
        })
    },
    logOut () {
      document.cookie = 'myToken=;expires=;'
      this.$swal('token 已清除')
      this.$router.push('/home')
    }
  },
  mounted () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    this.checkAdmin()
  }
}
</script>
