<template>
  <div class="PostCard col-3 m-3 p-3 d-flex flex-column bg-light border-rounded shadow">
    <h5> {{ post.title }} </h5>
    <p> {{ post.creatorEmail }} </p>
    <router-link :to="{name: 'ActivePost', params: {id: postProps.id}}" class="btn btn-secondary mt-2 justify-self-center">
      Read
    </router-link>
  </div>
</template>

<script>
// import { AppState } from '../AppState'
import { computed } from 'vue'
import { postService } from '../services/PostService'

export default {
  name: 'PostCard',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    postProps: Object
  },
  setup(props) {
    return {
      post: computed(() => props.postProps),
      getActivePost(id) {
        postService.getActivePost(id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
