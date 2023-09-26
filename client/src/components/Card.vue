<script>
import { mapActions, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  data(){
    return {
      rupiah : 0,
      item: {}
    }
  },
  props:['product'],
  computed: {
    ...mapWritableState(useCounterStore, ['isLogin'])
  },
  methods: {
      ...mapActions(useCounterStore, ['formatRupiah', 'addCartHandler', 'addFavoriteHandler', 'softDeleteFavoriteHandler']),
      detailHandler(id){
      this.$router.push(`/products/${id}`)
      this.fetchProductDetail(id)
    }
    
  },
  created(){
    if(this.$route.name === 'favorite'){
      this.item = this.product.Product
    } else if (this.$route.name === 'home'){
      this.item = this.product
    };
    this.rupiah = this.formatRupiah(this.item.price)
  }
}
</script>

<template>
<!-- <div class="col sm-6">
  <div class="card">
    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
      <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" class="img-fluid"/>
      <a href="#!">
        <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
      </a>
    </div>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#!" class="btn btn-primary">Button</a>
    </div>
  </div>
</div> -->



  <div class="col g-4">
    <div class="col card card-size rounded">
      <div class="img-container align-middle">
        <img :src="item.photo" class="card-img-top object-fit-contain mt-2" alt="image">
        <p class="fw-bold text-white">
        test  
        </p>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          <a href="#" v-if="isLogin === true && this.$route.name === 'home'" @click.prevent="addFavoriteHandler(item.id)">
            <i class="fas fa-heart me-1"></i>
          </a>
          {{item.brand}}
        </h5>
        <p>{{item.name}}</p>
        <p>{{rupiah}}</p>
        <div class="d-flex justify-content-center">
          <a href="#" class="btn btn-sm mt-2" @click.prevent="detailHandler(item.id)">
            Detail
          </a>
          <a href="#" class="btn btn-sm btn-danger mt-2" v-if="isLogin === true && this.$route.name === 'favorite'" @click.prevent="softDeleteFavoriteHandler(item.id)">
            Delete
          </a>
          <a href="#" class="btn btn-sm mt-2" v-if="isLogin === true && (this.$route.name === 'home' || this.$route.name === 'favorite')" @click.prevent="addCartHandler(item.id)">
            <i class="fas fa-bag-shopping me-1"></i>
          </a>
        </div>
        
      </div>
    </div>
  </div>
</template>