<template>
  Order
</template>
<script>
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
    }
  },
  methods: {
    getOrder () {
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/orders`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => alert(err.data.message))
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
