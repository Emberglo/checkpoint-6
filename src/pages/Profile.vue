<template>
  <div class="about col-9 mt-5 mr-5 p-4 d-flex flex-column text-center" v-if="profile.name">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded align-self-center my-2" :src="profile.picture" alt="" />
    <p class="border-bottom pb-3">{{ profile.email }}</p>
    <div class="border-bottom p-3">
      <h3>Create A New Post</h3>
      <!-- <PostForm v-if="user.id === profile.id"/> -->
      <form @submit.prevent="createPost">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="Post Title"
            v-model="state.newPost.title"
          >
        </div>
        <div class="form-group">
          <textarea name="body"
                    id="body"
                    cols="57"
                    rows="10"
                    placeholder="Post Body"
                    v-model="state.newPost.body"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    <div class="border-bottom p-3 row">
      <h3 class="col-12"> Posts </h3>
      <div class="row justify-content-center">
        <PostCard v-for="post in posts" :post-props="post" :key="post.id" />
      </div>
    </div>
    <div class="border-bottom p-3">
      <h3> Comments </h3>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import PostCard from '../components/PostCard'
import { postService } from '../services/PostService'

export default {
  name: 'Profile',
  setup() {
    const state = reactive({
      newPost: {}
    })
    onMounted(() => {
      profileService.getProfile()
      postService.getAllPosts()
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      activePost: computed(() => AppState.activePost),
      posts: computed(() => AppState.posts),
      user: computed(() => AppState.user),
      createPost() {
        postService.createPost(state.newPost)
      }
    }
  },
  components: {
    PostCard
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
