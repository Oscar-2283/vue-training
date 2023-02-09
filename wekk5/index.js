const { createApp } = Vue;
import productModal from './product.js';

const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'test8283',
      products: [],
      productId: '',
    };
  },
  methods: {
    getProduct() {
      axios
        .get(`${this.url}/api/${this.path}/products/all`)
        .then((res) => {
          const { products } = res.data;
          this.products = products;
        })
        .catch((err) => console.log(err));
    },
    openModal(id) {
      this.productId = id;
      console.log('外層帶入productId', id);
    },
  },

  mounted() {
    this.getProduct();
  },
  components: {
    productModal,
  },
});

app.mount('#app');
