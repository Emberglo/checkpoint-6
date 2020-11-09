<template>
  <div class="ActivePost col-8 mt-3 mr-3 d-flex flex-column bg-light border-rounded shadow" v-if="activePost.title">
    <div class="border-bottom">
      <h2> {{ activePost.title }} </h2>
      <p class="font-weight-bold"> {{ activePost.creator.name }} </p>
    </div>
    <hr>
    <p> {{ activePost.body }} </p>
    <hr>
    <div class="align-self-end mt-3">
      <button type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#editModal"
              v-if="activePost.creator.id == profile.id"
      >
        Edit
      </button>
      <button class="btn btn-danger ml-2"
              v-if="activePost.creatorEmail == profile.email"
              @click="deletePost(activePost.id)"
      >
        Delete
      </button>
    </div>
    <div>
      <h3>Comments</h3>
      <form class="d-flex justify-content-between" @submit.prevent="createComment">
        <div class="form-group w-75">
          <input
            type="text"
            class="form-control"
            id="body"
            placeholder="Comment"
            v-model="state.newComment.body"
          >
        </div>
        <button type="submit" class="btn btn-primary h-75">
          Comment
        </button>
      </form>
      <div class="row" v-if="comments">
        <Comments v-for="comment in comments" :comment-props="comment" :key="comment.id" />
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Post</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editPost(activePost.id)">
              <div class="form-group">
                <input type="text" class="form-control" id="title" placeholder="Post Title" v-model="state.editPost.title">
              </div>
              <div class="form-group">
                <!-- <input type="text" class="form-control" id="body" default="activePost.body"> -->
                <textarea name="body"
                          id="body"
                          cols="57"
                          rows="10"
                          placeholder="Post Body"
                          v-model="state.editPost.body"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { postService } from '../services/PostService'
import Comments from '../components/Comments'

export default {
  name: 'ActivePost',
  setup() {
    const state = reactive({
      newPost: {},
      newComment: {
        blog: AppState.activePost.id
      },
      editPost: {}
    })
    const route = useRoute()
    onMounted(() => {
      postService.getActivePost(route.params.id)
      postService.getComments(route.params.id)
    })
    return {
      state,
      comments: computed(() => AppState.comments),
      profile: computed(() => AppState.profile),
      activePost: computed(() => AppState.activePost),
      editPost(id) {
        postService.editPost(id, state.editPost)
      },
      createPost() {
        postService.createPost(state.newPost)
      },
      deletePost(id) {
        postService.deletePost(id)
      },
      createComment() {
        postService.createComment(state.newComment)
      }
    }
  },
  components: { Comments }
}
</script>

<style scoped>
  .ActivePost {
    width: 100%;
  }
</style>
