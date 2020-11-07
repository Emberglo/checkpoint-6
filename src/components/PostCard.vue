<template>
  <div class="PostCard col-3">
    <!-- <h5> {{ postCard.title }} </h5>
    <p> {{ postCard.creator.name }} </p> -->
    <button class="btn btn-info mt-2">
      Read
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
// import { postService } from '../services/PostService'

export default {
  name: 'PostCard',
  props: {
    postProp: Object
  },
  setup(props) {
    return {
      profile: computed(() => AppState.profile),
      post: computed(() => props.postProp)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
