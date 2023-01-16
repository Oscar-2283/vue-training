export default {
  props: ['propsPagination', 'getProduct'],
  template: '#pagination',
  methods: {
    changePage(page) {
      this.$emit('page-emit', page);
    },
  },
};
