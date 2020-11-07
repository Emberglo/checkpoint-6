<template>
  <div class="Posts col-9 offset-1 mt-3" v-if="posts">
    <h5>Latest Posts</h5>
    <hr>
    <div class="row">
      <PostCard v-for="post in posts" :post-props="post" :key="post.id" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { postService } from '../services/PostService'
import PostCard from '../components/PostCard'

export default {
  name: 'Posts',
  components: { PostCard },
  setup() {
    onMounted(() => {
      postService.getAllPosts()
    })
    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
