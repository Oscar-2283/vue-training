<template>
  <VLoading :active="isLoading" :can-cancel="false" :color="'#007bff'" :is-full-page="true"></VLoading>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>訂單編號</th>
        <th>付款狀態</th>
        <th style="width: 150px">訊息</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="orderData">
        <tr v-for="order in orderData" :key="order.id">
          <td>
            {{ order.create_at }}
          </td>
          <td>
            {{ order.is_paid ? '已付款' : '未付款' }}
          </td>
          <td>
            {{order.message}}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script>
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      isLoading: false,
      orderData: []
    }
  },
  methods: {
    getOrder () {
      this.isLoading = true
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/orders`)
        .then((res) => {
          this.isLoading = false
          const { orders } = res.data
          this.orderData = orders
        })
        .catch((err) => alert(err.data.message))
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
