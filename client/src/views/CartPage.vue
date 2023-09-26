<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  data(){
    return{
      input: {
        weight: 1000, 
        courier: '', 
        destination: 0
      }
    }
  },
  computed: {
    ...mapWritableState(useCounterStore, ['carts','cities', 'cost']),
    
  },
  methods: {
    ... mapActions(useCounterStore, ['fetchCart', 'addTransaction', 'updateStatusCartHandler', 'fetchCity', 'costRajaOngkir']),
        // quantity(val){
        //   this.cart.quantity = this.cart.quantity + val
        //   if (val < 0) {
        //     if(this.cart.quantity < 1) {
        //       console.log("masuk kurang page", this.cart.quantity);
        //       this.cart.quantity = 1
        //     } 
        //   } else {
        //     if (this.movies.length < 8){
        //       console.log("masuk data kurang dari 8");
        //       this.cart.quantity--
        //     }
        //   }
        //   this.fetchCart()
        // }
  },
  created(){
    this.fetchCart()
    this.fetchCity()
  }
}
</script>

<template>
<div class="m-5 border">
  <div class="container-fluid m-2">
    <div class="text-center">
      <h1 class="mt-4">My Bag</h1>
    </div>
    <form class="m-5" @submit.prevent="addTransaction(cost)">
      <div class="row">
        <div class="col-9">
            <table class="table">
                <thead>
                  <tr>
                    <th scope="col" style="width=10px">Name</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cart in carts" :key="cart.id">
                    <td>{{cart.Product.name}}</td>
                    <td>{{cart.Product.brand}}</td>
                    <td>{{cart.Product.price}}</td>
                    <td>
                      <div class="row d-flex">
                        {{cart.quantity}}     
                      </div>
                    </td>
                    <td>
                      <!-- <button class="btn btn-warning" @click="quantity(-1)">-</button>
                      <button class="btn btn-primary mx-1" @click="quantity(1)">+</button> -->
                      <button class="btn btn-danger" @click="updateStatusCartHandler(cart.id, 'Inactive')">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <div class="text-center">
                <p>Total: </p>
              </div>
        </div>
        <div class="col-3">
            <form @submit.prevent="costRajaOngkir(this.input)">
              <!-- Email input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example1">Courier</label>
                <select v-model="input.courier" class="form-select" id="">
                  <option selected disabled>-choose-</option>
                  <option value="jne">JNE</option>
                  <option value="tiki">TIKI</option>
                  <option value="pos">Pos Indonesia</option>
                </select>
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example2">City Destination</label>
                <select v-model="input.destination" class="form-select" id="">
                  <option selected disabled>-choose-</option>
                  <option v-for="el in cities" :key="el.id" :value="el.city_id">{{el.city_name}}</option>
                </select>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example2">Weight (grams)</label>
                <input disabled :value="input.weight">
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example2">Cost</label>
                <input disabled :value="cost">
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block mb-4">Cost</button>
            </form>
        </div>
      </div>
      <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-4">Checkout</button>
    </form>
  </div>
</div>
</template>

<style scoped>

</style>