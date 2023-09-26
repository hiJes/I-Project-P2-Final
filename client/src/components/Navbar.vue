<script>
import { mapActions, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    ...mapWritableState(useCounterStore, ['isLogin'])
  },
  methods: {
    ...mapActions(useCounterStore, ['successAlert']),
    doLogout(){
      localStorage.clear()
      this.$router.push('/')
      this.isLogin = false
      this.successAlert('Logout success!')
    },
    movePage(path){
      this.$router.push(path)
    }
  }
}
</script>

<template>
<div>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light mt-5 mx-5">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Toggle button -->
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left links -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link text-reset" href="#" @click.prevent="movePage('/login')" v-if="isLogin === false">
              <i class="fas fa-circle-user me-1"></i>
              Sign in
            </a>
          </li>
        </ul>
        <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->


      <!-- Right elements -->
      <div class="d-flex align-items-center">
        <!-- Icon -->
        <a class="text-reset me-3" href="#" @click.prevent="movePage('/cart')">
          <i class="fas fa-bag-shopping me-1"></i>
          My bag
        </a>
        <a class="text-reset me-3" href="#" @click.prevent="movePage('/favorite')">
          <i class="fas fa-heart me-1"></i>
          Favorite
        </a>
        
        <!-- Avatar -->
        <div class="dropdown" v-if="isLogin === true">
          <a
            class="dropdown-toggle d-flex align-items-center hidden-arrow me-2"
            href="#"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              class="rounded-circle"
              height="25"
              alt="Black and White Portrait of a Man"
              loading="lazy"
            />
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <li>
              <a class="dropdown-item" href="#" @click.prevent="movePage('/user')">My profile</a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="doLogout">Logout</a>
            </li>
          </ul>
        </div>

      </div>
      <!-- Right elements -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5 mx-5">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Navbar brand -->
        <a class="navbar-brand mt-2 mt-lg-0 ms-3 fw-bold fs-2 text" href="#" @click.prevent="movePage('/')">
          <img
            src="@/assets/logo.png"
            height="60"
            alt="SS Logo"
            loading="lazy"
          />
            SKIN STORY
        </a>        
      </div>
      <!-- Collapsible wrapper -->

      <!-- Search -->
        <form class="d-flex input-group w-auto">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span class="input-group-text border-0" id="search-addon">
            <i class="fas fa-search"></i>
          </span>
        </form>
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->
</div>
</template>