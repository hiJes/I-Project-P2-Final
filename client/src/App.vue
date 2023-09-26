<script>
import { mapWritableState } from 'pinia'
import Navbar from './components/Navbar.vue'
import { useCounterStore } from './stores/counter'
export default{
  components: { Navbar },
  computed:{
    ...mapWritableState(useCounterStore, ['isLogin'])
  },
  created(){
    if (localStorage.access_token){
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>

<template>
  <div>
    <Navbar/>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
