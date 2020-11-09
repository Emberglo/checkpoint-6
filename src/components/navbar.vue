<template>
  <div class="sidebar col-2 pr-5 d-flex flex-column">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="header font-weight-bold">
        Bright<br>
        Skies<br>
        Above
      </div>
    </router-link>
    <hr>
    <div id="navbarText" class="mr-2">
      <ul class="navbar-nav mr-auto">
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-success"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="btn btn-light dropdown-toggle pl-0"
            @click="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Profile' }">
              <div class="list-group-item list-group-item-action hoverable">
                Profile
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
    <hr>
    <div class="links">
      <router-link :to="{ name: 'Home' }" class="nav-link pl-0">
        Home
      </router-link>
      <router-link :to="{ name: 'Profile' }" class="nav-link pl-0">
        Profile
      </router-link>
      <router-link :to="{ name: 'Posts' }" class="nav-link pl-0">
        Posts
      </router-link>
      Authors<br>
      Contact
    </div>
    <hr>
    <div class="place rotate">
      <p>
        Travel Blog By Ryan Carpenter
      </p>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.sidebar {
  /* position: fixed;
  left: 0;
  display: inline-block; */
  height: 100vh;
  width: 100%;
  background-color: #FEFEFE
}
.rotate {
  transform: rotate(-90deg);
  width: 15em;
}
.place {
  height: 100%;
  margin-top: 2em;
  align-self: start;
  text-align: left;
}
</style>
