import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      baseUrl :'https://i-project.blackopals.shop',
      // baseUrl : 'http://localhost:3001',
      isLogin: false,
      products: [],
      categories: [],
      product: {},
      category: {},
      carts: [],
      favorites: [],
      cities: [],
      cost: 0
    }
  },
  actions: {
    async registerHandler(input) {
      try {
        const {data} = await axios ({
          url: this.baseUrl + '/register',
          method: 'post',
          data: input
        })
        // console.log(data);
        this.successAlert('Register success!')
        this.router.push('/login')
      } catch (error) {
        // console.log(error.response.data.message);
        this.errorAlert(error.response.data.message)
      }
    },
    async loginHandler(input) {
      try {
        const {data} = await axios ({
          url: this.baseUrl + '/login',
          method: 'post',
          data: input
        })
        localStorage.access_token = data.access_token
        localStorage.username = data.email.split('@')[0]
        this.successAlert(`Welcome ${localStorage.username}!`)
        this.router.push('/')
        this.isLogin = true
      } catch (error) {
        // console.log(error.response.data.message);
        this.errorAlert(error.response.data.message)
      }
    },
    async googleLogin(credential){
      try {
        const {data} = await axios ({
          method: 'post',
          url: this.baseUrl+`/login-google`,
          headers: {
            google_token: credential
          }
        })
        localStorage.access_token = data.access_token
        localStorage.username = data.email.split('@')[0]
        this.successAlert(`Welcome ${localStorage.username}!`)
        this.router.push('/')
        this.isLogin = true
      } catch (err) {
        console.log(err);
        // console.log(err.response.data.message);
        this.errorAlert(err.response.data.message)
      }
    },
    async fetchProduct (query){
      try {
        const {page, category, search} = query
        let option = {
          url: this.baseUrl + '/products',
          method: 'get',
          params: {
            page
          }
        }
        // console.log(query, "<<<<");
        if ( category !== undefined && category.length > 0){
          option.params = {
            CategoryId : category
          }
        }
        if ( search !== undefined ){
          option.params = {search}
        }
        const {data} = await axios (option)
        this.products = data.products
        this.categories = data.categories
        // console.log(data.movies);
      } catch (error) {
        console.log(error);
        // this.errorAlert(error.response.data.message)
      }
    },
    async fetchProductDetail(id){
      try {
        const {data} = await axios ({
          url: this.baseUrl + `/products/${id}`,
          method: 'get',
          data: id,
        })
        this.movie = data.movie
        this.genre = data.movie.Genre
        this.product = data.product
        this.category = data.product.Category
      } catch (error) {
        this.errorAlert(error.response.data.message)
      }
    },
    async addCartHandler(ProductId){
      try {
        const {data} = await axios ({
          url: this.baseUrl + `/carts/${ProductId}`,
          method: 'post',
          data: ProductId,
          headers: {
            access_token: localStorage.access_token
          }
        })
        // console.log(data);
        this.successAlert('Success added product to Cart!')
      } catch (error) {
        this.errorAlert(error.response.data.message)
      }
    },
    async addFavoriteHandler(ProductId){
      try {
        const {data} = await axios ({
          url: this.baseUrl + `/favorites/${ProductId}`,
          method: 'post',
          data: ProductId,
          headers: {
            access_token: localStorage.access_token
          }
        })
        // console.log(data);
        this.successAlert('Success added product to Favorite!')
      } catch (error) {
        this.errorAlert(error.response.data.message)
      }
    },
    async fetchCart (){
      try {
        let option = {
          url: this.baseUrl + '/carts',
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        }
        const {data} = await axios (option)
        this.carts = data
        // console.log(data.movies);
        console.log(data, "<<<");
      } catch (error) {
        console.log(error);
        this.errorAlert(error.response.data.message)
      }
    },
    async fetchFavorite (){
      try {
        let option = {
          url: this.baseUrl + '/favorites',
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        }
        const {data} = await axios (option)
        this.favorites = data
        // console.log(data.movies);
        console.log(data, "<<< ini favorite");
      } catch (error) {
        console.log(error);
        this.errorAlert(error.response.data.message)
      }
    },
    async fetchCity (){
      try {
        let option = {
          url: this.baseUrl + '/apis/city-raja-ongkir',
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        }
        const {data} = await axios (option)
        this.cities = data
        // console.log(data.movies);
        console.log(data, "<<< ini city");
        console.log(this.cities, "<<< ini counter city");
      } catch (error) {
        console.log(error);
        this.errorAlert(error.response.data.message)
      }
    },
    async costRajaOngkir (value){
      try {
        console.log(value);
        let option = {
          url: this.baseUrl + '/apis/cost-raja-ongkir',
          method: 'post',
          data: value,
          headers: {
            access_token: localStorage.access_token
          }
        }
        const {data} = await axios (option)
        // console.log(data.movies);
        
        if (data.costs[0].cost[0].value === undefined){
          this.data = 10000
        } else {
          this.cost = data.costs[0].cost[0].value
        }
        // console.log(data.costs[0].cost[0].value, "<<< ini di raja");
      } catch (error) {
        console.log(error);
        this.errorAlert(error.response.data.message)
      }
    },
    async softDeleteFavoriteHandler(id){
      try {
        const {data} = await axios ({
          url: this.baseUrl + `/favorites/${id}`,
          method: 'patch',
          data: id,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.successAlert(data.message)
      } catch (error) {
        this.errorAlert(error.response.data.message)
      }
    },
    async updateStatusCartHandler(id, status){
      try {
        const {data} = await axios ({
          url: this.baseUrl + `/carts/${id}/status`,
          method: 'patch',
          data: status,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.successAlert(data.message)
      } catch (error) {
        console.log(error);
        // this.errorAlert(error.response.data.message)
      }
    },
    async addTransaction(cost){
      try {
        const {data} = await axios ({
          url: this.baseUrl + `/transactions`,
          method: 'post',
          data: {cost},
          headers: {
            access_token: localStorage.access_token
          }
        })
        const {code, totalPayment, transaction} = data 
        let amount = totalPayment
        let transaction_code = code
        console.log(data, "<<< niiih");
        this.paymentHandler(amount, transaction_code)
      } catch (error) {
        console.log(error, "ini error di client");
      }
    },
    async paymentHandler(amount, transaction_code){
      try {
        const {data} = await axios ({
          url: this.baseUrl + `/apis/token-midtrans`,
          method: 'post',
          data: {amount, transaction_code},
          headers: {
            access_token: localStorage.access_token
          }
        })
        // const cb = this.fetchFavorite
        // const cb //panggil function buat ubah status barang yg active di cart jadi checkout dan ubah status isPayment di transaction jadi trueS
        window.snap.pay(data.token, {
          onSuccess: function(result){
            /* You may add your own implementation here */
            console.log("ini hasilnya guys");
          },
          onClose: function(){
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment');
          }
        })
      } catch (error) {
        console.log(error, "ini error di client");
      }
    },
    formatRupiah (number){
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(number);
    },
    
    errorAlert(message){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
      })
    },
    successAlert(message){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: message
      })
    }
  }
})
