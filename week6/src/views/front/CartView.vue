<template>    <!-- 購物車列表 -->
  <div class="text-end">
    <VLoading :active="isLoading" :can-cancel="false" :color="'#007bff'" :is-full-page="true"></VLoading>
    <button class="btn btn-outline-danger" type="button" @click="deleteCarts">
      清空購物車
    </button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="cart in cart.carts" :key="cart.id">
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteCart(cart.id)">
              <i class="fas fa-spinner fa-pulse"></i>
              x
            </button>
          </td>
          <td>
            {{ cart.product.title }}
            <div class="text-success">已套用優惠券</div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input min="1" type="number" class="form-control" v-model="cart.qty" @change="updateToCart(cart)"/>
                <span class="input-group-text" id="basic-addon2">{{ cart.product.unit }}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            {{ cart.total }}
            <small class="text-success">折扣價：</small>
            {{ cart.final_total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
  <div class="my-5 row justify-content-center">
    <VForm
      ref="form"
      class="col-md-6"
      v-slot="{ errors }"
      @submit="onSubmit"
    >
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <VField
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          rules="email|required"
          placeholder="請輸入 Email"
          v-model="form.user.email"
        ></VField>
        <ErrorMessage
          name="email"
          class="invalid-feedback"
        ></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <VField
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
        ></VField>
        <ErrorMessage
          name="姓名"
          class="invalid-feedback"
        ></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <VField
          id="tel"
          name="電話"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          :rules="isPhone"
          placeholder="請輸入電話"
          v-model="form.user.tel"
        ></VField>
        <ErrorMessage
          name="電話"
          class="invalid-feedback"
        ></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <VField
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
        ></VField>
        <ErrorMessage
          name="地址"
          class="invalid-feedback"
        ></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </VForm>
  </div>
</template>
<script>
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      isLoading: false,
      cart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      this.isLoading = true
      this.$http
        .get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
          this.isLoading = false
        })
        .catch((err) => console.log(err))
    },
    updateToCart (item) {
      this.isLoading = true
      const data = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http
        .put(`${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`, { data })
        .then(() => {
          this.isLoading = false
          this.getCart()
        })
        .catch((err) => alert(err.data.message))
    },
    deleteCarts () {
      this.$http
        .delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then(() => {
          this.getCart()
        })
        .catch((err) => alert(err.data.message))
    },
    deleteCart (id) {
      this.loading = id
      this.$http
        .delete(`${VITE_URL}/api/${VITE_PATH}/cart/${id}`)
        .then(() => {
          this.getCart()
          this.loading = ''
        })
        .catch((err) => {
          this.loading = ''
          alert(err.data.message)
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    onSubmit () {
      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/order`, { data: this.form })
        .then((res) => {
          this.$swal({
            title: `${res.data.message}`,
            text: `訂單編號 ${res.data.orderId}`
          })
          this.form.message = ''
          this.$refs.form.resetForm()
          this.getCart()
        })
        .catch((err) => alert(err.data.message))
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
