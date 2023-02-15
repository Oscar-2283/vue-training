import productModal from './product.js';
const { createApp } = Vue;
const { defineRule, Form, Field, ErrorMessage } = VeeValidate;
const { required, email } = VeeValidateRules;
defineRule('required', required);
defineRule('email', email);
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL(
  'https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json'
);

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});
const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'test8283',
      products: [],
      tempProduct: {},
      cart: {},
      qty: 1,
      loading: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getProducts() {
      axios
        .get(`${this.url}/api/${this.path}/products/all`)
        .then((res) => {
          const { products } = res.data;
          this.products = products;
        })
        .catch((err) => alert(err.data.message));
    },
    getProduct(id) {
      this.loading = id;
      axios
        .get(`${this.url}/api/${this.path}/product/${id}`)
        .then((res) => {
          const { product } = res.data;
          this.tempProduct = product;
          setTimeout(() => {
            this.$refs.productModal.modal.show();
            this.loading = '';
          }, 300);
        })
        .catch((err) => {
          this.loading = '';
          alert(err.data.message);
        });
    },
    getCart() {
      axios
        .get(`${this.url}/api/${this.path}/cart`)
        .then((res) => {
          this.cart = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    addToCart(product_id, qty = 1) {
      this.loading = product_id;
      const data = {
        product_id,
        qty,
      };
      axios
        .post(`${this.url}/api/${this.path}/cart`, { data })
        .then((res) => {
          this.$refs.productModal.modal.hide();
          this.getCart();
          setTimeout(() => {
            this.loading = '';
          }, 300);
        })
        .catch((err) => {
          this.loading = '';
          alert(err.data.message);
        });
    },
    updateToCart(item) {
      let data = {
        product_id: item.product_id,
        qty: item.qty,
      };
      axios
        .put(`${this.url}/api/${this.path}/cart/${item.id}`, { data })
        .then(() => {
          this.getCart();
        })
        .catch((err) => alert(err.data.message));
    },
    deleteCarts() {
      axios
        .delete(`${this.url}/api/${this.path}/carts`)
        .then(() => {
          this.getCart();
        })
        .catch((err) => alert(err.data.message));
    },
    deleteCart(id) {
      this.loading = id;
      axios
        .delete(`${this.url}/api/${this.path}/cart/${id}`)
        .then(() => {
          this.getCart();
          this.loading = '';
        })
        .catch((err) => {
          this.loading = '';
          alert(err.data.message);
        });
    },
    isLoadingItem(product_id) {
      return (
        this.loading ===
        this.cart.carts.find((item) => {
          item.product.id === product_id ? true : false;
        })
      );
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    onSubmit() {
      axios
        .post(`${this.url}/api/${this.path}/order`, { data: this.form })
        .then((res) => {
          alert(`${res.data.message} | 訂單編號 ${res.data.orderId}`);
          this.form.message = '';
          this.$refs.form.resetForm();
          this.getCart();
        })
        .catch((err) => alert(err.data.message));
    },
  },

  mounted() {
    this.getProducts();
    this.getCart();
  },
  components: {
    productModal,
    VForm: Form,
    VField: Field,
    ErrorMessage,
  },
});

app.mount('#app');
