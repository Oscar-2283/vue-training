<template>
    <VLoading :active="isLoading" :can-cancel="false" :color="'#007bff'" :is-full-page="true"></VLoading>
  <div class="mt-4">
    <!-- 產品Modal -->
    <ProductModal ref="productModalRef" :temp-product="tempProduct" @emit-add-to-cart="addToCart"></ProductModal>
    <!-- 產品Modal -->

    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 200px">
            <div
              style="
                height:100px;
                background-size:cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${product.imageUrl})` }"></div>
          </td>
          <td>{{ product.title }}</td>
          <td>
            <div class="h5" v-if="product.price===product.origin_price">
              {{ product.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-secondary" @click="getProduct(product.id)">
                <i class="fas fa-spinner fa-pulse"></i>
                查看更多
              </button>
              <button type="button" class="btn btn-outline-danger" @click="addToCart(product.id)">
                <i class="fas fa-spinner fa-pulse"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import ProductModal from '@/components/ProductModal.vue'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      product: {},
      tempProduct: {},
      isLoading: false
    }
  },
  methods: {
    getProducts () {
      this.isLoading = true
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/products/all`)
        .then((res) => {
          const { products } = res.data
          this.products = products
          this.isLoading = false
        })
        .catch((err) => alert(err.data.message))
    },
    getProduct (id) {
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          const { product } = res.data
          this.tempProduct = product
          this.$refs.productModalRef.modal.show()
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    addToCart (id, qty = 1) {
      this.isLoading = true
      const data = {
        product_id: id,
        qty
      }
      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data })
        .then((res) => {
          this.isLoading = false
          this.$refs.productModalRef.modal.hide()
          this.$swal(res.data.message)
        })
        .catch((err) => {
          this.$swal(err.data.message)
        })
    }

  },
  components: {
    ProductModal
  },
  mounted () {
    this.getProducts()
  }
}
</script>
