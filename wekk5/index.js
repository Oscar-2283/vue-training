const { createApp } = Vue;
import productModal from './product.js';

const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'test8283',
      products: [],
      productId: '',
      carts:'',
      qty:1
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
    getCart(){
      axios
      .get(`${this.url}/api/${this.path}/cart`)
      .then((res) => {
        const { carts } =res.data.data;
        this.carts = carts
      })
      .catch((err) => console.log(err));
    },
    addToCart(id,qty=1){
      const data ={
        "product_id": id,
        qty
      }
      axios
      .post(`${this.url}/api/${this.path}/cart`,{ data } )
      .then((res) => {
        console.log( '加入購物車' ,res.data)
        this.getCart()
      })
      .catch((err) => console.log(err));
    },
    updateToCart(item){
      console.log(item)
      let data = {
        product_id:item.product_id,
        qty:item.product.num
      }
      axios
      .put(`${this.url}/api/${this.path}/cart/${item.id}` , { data })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err));
    }
  },

  mounted() {
    this.getProduct();
    this.getCart()
  },
  components: {
    productModal,
  },
});

app.mount('#app');
