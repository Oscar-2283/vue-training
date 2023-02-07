const { createApp } = Vue;
import productModal from './product.js';

const app = createApp({
  data() {
    return {
      test: 777,
    };
  },
  methods: {
    getProduct() {},
  },
  mounted() {},
  components: {
    productModal,
  },
});

app.mount('#app');
