<script>
import { mapActions} from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  data(){
    return {
      input : {
        email: '',
        password: ''
      },
      credential: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['loginHandler', 'googleLogin']),
    doLogin(){
      this.loginHandler(this.input)
    },
    movePage(path){
      this.$router.push(path)
    },
    callback(response) {
      this.credential = response.credential;
      this.googleLogin(this.credential)
    }
  }
}
</script>

<template>
<div class="container-fluid col-5 justify-content-center p-4 mt-5 border rounded bg-white">
  <div class="row">
    <form @submit.prevent="doLogin">
      <div class="text-center mb-4">
        <h2 class="fw-bold">Sign In</h2> 
        Welcome back!
      </div>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <input type="email" id="form2Example1" class="form-control" v-model="input.email"/>
        <label class="form-label" for="form2Example1">Email address</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input type="password" id="form2Example2" class="form-control" v-model="input.password"/>
        <label class="form-label" for="form2Example2">Password</label>
      </div>


      <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>New member? <a href="#!" @click.prevent="movePage('/register')">Register here</a></p>
        <p>or sign in with:</p>
        <GoogleLogin :callback="callback"/>
      </div>
    </form>
  </div>
</div>
</template>

<style scoped>

</style>