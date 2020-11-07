<template>
  <div class="ActivePost d-flex flex-column align-items-center bg-light border-rounded shadow" v-if="activePost.name">
    <h3></h3>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { postService } from '../services/PostService'

export default {
  name: 'ActivePost',
  setup() {
    const route = useRoute()
    onMounted(() => {
      postService.getActivePost(route.params.id)
    })
    return {
      activePost: computed(() => AppState.activePost)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
