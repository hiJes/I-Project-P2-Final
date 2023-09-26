<script>
import { mapActions, mapState } from 'pinia'
import Card from '../components/Card.vue'
import { useCounterStore } from '../stores/counter'
export default {
  components: { Card },
  computed:{
    ...mapState(useCounterStore,['favorites'])
  },
  methods: {
    ...mapActions(useCounterStore,['fetchFavorite'])
  },
  created (){
    this.fetchFavorite()
  }
}
</script>

<template>
<div class="m-5 border" >
  <div class="container-fluid m-2"  style="height: 100vh">
    <div class="text-center">
      <h1 class="mt-4">My Favorite</h1>
    </div>
    <div class="d-flex justify-content-center">
      <div class="container row row-cols-4 d-flex justify-content-center">
        <Card v-for="item in favorites" :key="item.id" :product="item"/>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>