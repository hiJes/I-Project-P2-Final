<script>
import { mapActions, mapState } from 'pinia'
import Card from '../components/Card.vue'
import { useCounterStore } from '../stores/counter'
export default {
  components: { Card },
  data (){
    return {
      query : {
        page: 1,
        category: [],
      },
    }
  },
  computed:{
    ...mapState(useCounterStore, ['products', 'categories'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchProduct']),
    pagination(val){
      this.query.page = this.query.page + val
      if (val < 0) {
        if(this.query.page < 1) {
          // console.log("masuk kurang page", this.query.page);
          this.query.page = 1
        } 
      } else {
        if (this.products.length < 8){
          // console.log("masuk data kurang dari 8");
          this.query.page--
        }
      }
      this.fetchProduct(this.query)
    },
    filterHandler(){
      this.fetchProduct(this.query)
    }
  },
  created (){
    this.fetchProduct(this.query)
  }
}
</script>

<template>
<div class="container-fluid mt-3" style="height: 100vh">
  <div class="row mx-5">
    <div class="col-3 p-1 m-2 rounded">  
      <div class="col card">
        <div class="card-body">
          <form class="m-3" @submit.prevent="filterHandler">
            <h4>Category</h4>
            <div class="form-check">
              <div v-for="category in categories" :key="category.id">
                <input class="form-check-input" type="checkbox" :value="category.id" id="flexCheckDefault" v-model="query.category">
                <label class="form-check-label" for="flexCheckDefault">
                  {{category.name}}
                </label>
              </div>
            </div>
            <div class="d-grid gap-2 mt-4">
              <input type="submit" class="btn btn-sm" value="Filter">
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col rounded">
      <div class="d-flex justify-content-center">
        <div class="container row row-cols-3 d-flex justify-content-center">
          <Card v-for="product in products" :key="product.id" :product="product"/>
        </div>
      </div>

      <nav aria-label="Page navigation example sticky-bottom" class="mt-3">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a @click.prevent="pagination(-1)" class="page-link">Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link">{{query.page}}</a>
          </li>
          <li class="page-item">
            <a @click.prevent="pagination(1)" class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>

    </div>
  </div>
</div>
</template>
