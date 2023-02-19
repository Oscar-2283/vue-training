<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td>
            <span class="text-success" v-if="product.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal('edit', product)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openModal('delete', product)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Modal -->
  <div
  id="productModal"
  ref="editProductModal"
  class="modal fade"
  tabindex="-1"
  aria-labelledby="productModalLabel"
  aria-hidden="true"
>
  <EditModal
    :product="temp"
    @emit-add="addProduct"
    @emit-create-image="createImages"
  ></EditModal>
</div>
<div
  id="delProductModal"
  ref="delProductModal"
  class="modal fade"
  tabindex="-1"
  aria-labelledby="delProductModalLabel"
  aria-hidden="true"
>
  <DeleteModal
    :delete-temp="temp"
    :delete-product="deleteProduct"
  ></DeleteModal>
</div>
<!-- Modal -->
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
import EditModal from '../../components/EditModal.vue'
import DeleteModal from '../../components/DeleteModal.vue'
const { VITE_URL, VITE_PATH } = import.meta.env
let myModal = ''
let deleteModal = ''
export default {
  data () {
    return {
      isLoading: false,
      products: [],
      is_new: true,
      temp: {
        imagesUrl: []
      }
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
    openModal (state, item) {
      switch (state) {
        case 'new':
          this.temp = {}
          myModal.show()
          this.is_new = true
          break
        case 'edit':
          this.temp = { ...item }
          this.is_new = false
          myModal.show()
          break
        case 'delete':
          this.temp = { ...item }
          deleteModal.show()
          break
      }
    },
    getProduct (page = 1) {
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/admin/products/?page=${page}`)
        .then((res) => {
          const { pagination, products } = res.data
          this.pagination = pagination
          this.products = products
        })
        .catch((err) => alert(err.data.message))
    },
    addProduct () {
      if (this.is_new) {
        this.$http
          .post(`${VITE_URL}/api/${VITE_PATH}/admin/product`, {
            data: this.temp
          })
          .then((res) => {
            alert(res.data.message)
            myModal.hide()
            this.getProduct()
          })
          .catch((err) => alert(err.data.message))
      } else {
        this.$http
          .put(`${VITE_URL}/api/${VITE_PATH}/admin/product/${this.temp.id}`, {
            data: this.temp
          })
          .then((res) => {
            alert(res.data.message)
            myModal.hide()
            this.getProduct()
          })
          .catch((err) => console.dir(err))
      }
    },
    deleteProduct (id) {
      this.$http
        .delete(`${VITE_URL}/api/${VITE_PATH}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message)
          deleteModal.hide()
          this.getProduct()
        })
        .catch((err) => alert(err.data.message))
    },
    createImages () {
      this.temp.imagesUrl = []
      this.temp.imagesUrl.push('')
    }
  },
  components: {
    EditModal,
    DeleteModal
  },
  mounted () {
    this.getProducts()
    myModal = new Modal(document.querySelector('#productModal'))
    deleteModal = new Modal(
      document.querySelector('#delProductModal')
    )
  }
}
</script>
