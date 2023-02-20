<template>
  <ul class="pagination">
    <li class="page-item" :class="{disabled: propsPagination.current_page === 1}">
      <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProduct(propsPagination.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" :class="{active: page === propsPagination.current_page}" v-for='(page,index) in propsPagination.total_pages' :key="index"><a class="page-link" href="#" @click.prevent="changePage(page)">{{page}}</a></li>
    <li class="page-item" :class="{disabled: !propsPagination.has_next}">
      <a class="page-link" href="#" aria-label="Next" @click.prevent="getProduct(propsPagination.current_page + 1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['propsPagination', 'getProduct'],
  methods: {
    changePage (page) {
      this.$emit('pageEmit', page)
    }
  }
}
</script>
