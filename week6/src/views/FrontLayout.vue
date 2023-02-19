<template>
  <h1 class="text-center">
    你現在在前台頁面
  </h1>
  <div class="d-flex gap-3 justify-content-center">
    <router-link to="/home">Home</router-link> |
    <router-link to="/ProductView">前台產品列表</router-link> |
    <router-link to="/CartView">前台購物車</router-link> |
    <router-link to="/BackAdmin/ProductsView">後台</router-link> |
  </div>
  <hr>
  <router-view></router-view>
</template>
<script>
// import { RouterView } from 'vue-router'
// export default {
//   components: {
//     RouterView
//   }
// }
</script>
