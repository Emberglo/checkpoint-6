<template>
  <div class="PostForm">
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
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import { postService } from '../services/PostService'

export default {
  name: 'PostForm',
  setup() {
    const state = reactive({
      newPost: {}
    })
    onMounted(() => profileService.getProfile())
    return {
      profile: computed(() => AppState.profile),
      createPost() {
        postService.createPost(state.newPost)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
