import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import pagination from './compotents/pagination.js';
import delete_modal from './compotents/delete-modal.js';
import product_modal from './compotents/product-modal.js';

let myModal = '';
let deleteModal = '';
const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'test8283',
      products: [],
      pagination: {},
      is_new: true,
      temp: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${this.url}/api/user/check`)
        .then(() => {
          this.getProduct();
        })
        .catch((err) => {
          alert(err.data.message);
          location.href = 'login.html';
        });
    },
    openModal(state, item) {
      switch (state) {
        case 'new':
          this.temp = {};
          myModal.show();
          this.is_new = true;
          break;
        case 'edit':
          this.temp = { ...item };
          this.is_new = false;
          myModal.show();
          break;
        case 'delete':
          this.temp = { ...item };
          deleteModal.show();
          break;
      }
    },
    getProduct(page = 1) {
      axios
        .get(`${this.url}/api/${this.path}/admin/products/?page=${page}`)
        .then((res) => {
          const { pagination, products } = res.data;
          this.pagination = pagination;
          this.products = products;
        })
        .catch((err) => alert(err.data.message));
    },
    addProduct() {
      if (this.is_new) {
        axios
          .post(`${this.url}/api/${this.path}/admin/product`, {
            data: this.temp,
          })
          .then((res) => {
            alert(res.data.message);
            myModal.hide();
            this.getProduct();
          })
          .catch((err) => alert(err.data.message));
      } else {
        axios
          .put(`${this.url}/api/${this.path}/admin/product/${this.temp.id}`, {
            data: this.temp,
          })
          .then((res) => {
            alert(res.data.message);
            myModal.hide();
            this.getProduct();
          })
          .catch((err) => console.dir(err));
      }
    },
    deleteProduct(id) {
      axios
        .delete(`${this.url}/api/${this.path}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          deleteModal.hide();
          this.getProduct();
        })
        .catch((err) => alert(err.data.message));
    },
    createImages() {
      this.temp.imagesUrl = [];
      this.temp.imagesUrl.push('');
    },
  },
  components: {
    pagination,
    delete_modal,
    product_modal,
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = token;
    this.checkAdmin();
    myModal = new bootstrap.Modal(document.querySelector('#productModal'));
    deleteModal = new bootstrap.Modal(
      document.querySelector('#delProductModal')
    );
  },
});

app.mount('#app');
