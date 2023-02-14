const { createApp } = Vue;
import productModal from './product.js';

const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'test8283',
      products: [],
      tempProduct: {},
      cart: {},
      qty: 1,
      loading: {
        loadingItem: '',
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
          console.log(products);
        })
        .catch((err) => console.log(err));
    },
    getProduct(id) {
      this.loading.loadingItem = id;
      axios
        .get(`${this.url}/api/${this.path}/product/${id}`)
        .then((res) => {
          const { product } = res.data;
          this.tempProduct = product;
          setTimeout(() => {
            this.$refs.productModal.modal.show();
            this.loading.loadingItem = '';
          }, 300);
        })
        .catch((err) => console.log(err));
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
      this.loading.loadingItem = product_id;
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
            this.loading.loadingItem = '';
          }, 300);
        })
        .catch((err) => console.log(err));
    },
    updateToCart(item) {
      let data = {
        product_id: item.product_id,
        qty: item.qty,
      };
      axios
        .put(`${this.url}/api/${this.path}/cart/${item.id}`, { data })
        .then((res) => {
          this.getCart();
        })
        .catch((err) => console.log(err));
    },
    deleteCarts() {
      axios
        .delete(`${this.url}/api/${this.path}/carts`)
        .then((res) => {
          this.getCart();
        })
        .catch((err) => alert(err.data.message));
    },
    deleteCart(id) {
      this.loading.loadingItem = id;
      axios
        .delete(`${this.url}/api/${this.path}/cart/${id}`)
        .then((res) => {
          this.getCart();
          this.loading.loadingItem = '';
        })
        .catch((err) => alert(err.data.message));
    },
    isLoadingItem(product_id) {
      return (
        this.loading.loadingItem ===
        this.cart.carts.find((item) => {
          item.product.id === product_id ? true : false;
        })
      );
    },
  },

  mounted() {
    this.getProducts();
    this.getCart();
  },
  components: {
    productModal,
  },
});

app.mount('#app');
