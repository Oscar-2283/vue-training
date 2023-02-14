export default {
  props: ['tempProduct'],
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'test8283',
      modal: {},
      num: 1,
    };
  },
  methods: {
    addCart(id, num) {
      this.$emit('emitAddToCart', id, num);
    },
  },

  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
  template: `
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
  {{num}}
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ tempProduct.title }}</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ tempProduct.category }}</span>
              <p>商品描述：{{ tempProduct.description }}</p>
              <p>商品內容：{{ tempProduct.content }}</p>
              <div class="h5" v-if="tempProduct.origin_price===tempProduct.price">{{ tempProduct.price }} 元</div>
              <div v-else>
              <del class="h6">原價 {{ tempProduct.origin_price }} 元</del>
              <div class="h5">現在只要 {{ tempProduct.price }} 元</div>
              </div>
              <div>
                <div class="input-group">
                  <select name="" id="" class="form-select" v-model="num">
                    <option :value="i" v-for="i in 20" :key="i + '12345'">{{ i }}</option>
                  </select>
                  <button type="button" class="btn btn-primary" @click="addCart(tempProduct.id, num)">加入購物車</button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
</div>
  `,
};
