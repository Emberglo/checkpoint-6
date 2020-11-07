<template>
  <div class="PostCard col-3">
    <h5> {{ post.title }} </h5>
    <p> {{ post.creator.name }} </p>
    <button class="btn btn-info mt-2">
      Read
    </button>
  </div>
</template>

<script>
// import { AppState } from '../AppState'
import { computed } from 'vue'
// import { postService } from '../services/PostService'

export default {
  name: 'PostCard',
  props: {
    postProps: Object
  },
  setup(props) {
    return {
      post: computed(() => props.postProps)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
