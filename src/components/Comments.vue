<template>
  <div class="Comments col-10 offset-1 mr-5 my-3 p-3 d-flex justify-content-between bg-light border-rounded shadow">
    <div>
      <p> {{comment.body}} </p>
      <div class="border-top mt-4">
        <!-- <img src="comment.creator.picture" alt=""> -->
        <p class="font-weight-bold"> - {{comment.creatorEmail}} </p>
      </div>
    </div>
    <div class="align-self-end mt-3">
      <button type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#editCommentModal"
              v-if="comment.creator.id == profile.id"
      >
        Edit
      </button>
      <button class="btn btn-danger ml-2"
              v-if="comment.creatorEmail == profile.email"
              @click="deleteComment(comment.id)"
      >
        Delete
      </button>
    </div>
    <div class="modal fade" id="editCommentModal" tabindex="-1" aria-labelledby="editModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Comment</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editComment(comment.id)">
              <div class="form-group">
                <input type="text" class="form-control" id="title" placeholder="Comment" v-model="state.editComment.body">
              </div>
              <button type="submit" class="btn btn-primary">Edit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { postService } from '../services/PostService'
import { AppState } from '../AppState'

export default {
  name: 'Comments',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    commentProps: Object
  },
  setup(props) {
    const state = reactive({
      editComment: {}
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      comment: computed(() => props.commentProps),
      getComments() {
        postService.getComments()
      },
      editComment(id) {
        postService.editComment(id, state.editComment)
      },
      deleteComment(id) {
        postService.deleteComment(id)
      }
    }
  },
  components: {}
}
</script>

<style scoped>
</style>
