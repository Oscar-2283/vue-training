const { createApp } = Vue;
import productModal from './product.js';

const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'test8283',
      products:[],
      modal:{},
      tempProduct:{}
    };
  },
  methods: {
    getProduct() {
      axios.get(`${this.url}/api/${this.path}/products/all`)
        .then(res=>{
          const { products } = res.data
          this.products = products
        })
        .catch(err => console.log(err))
    },
    openModal(){
      this.modal = new bootstrap.Modal(this.$refs.productModal.$refs.modal)
      
    },
    showModal(product){
      this.tempProduct= {...product}
      this.modal.show()
    }
  },
  mounted() {
    this.getProduct()
    this.openModal()
  },
  components: {
    productModal,
  },
});

app.mount('#app');
