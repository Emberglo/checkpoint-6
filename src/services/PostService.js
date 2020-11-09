/* eslint-disable no-console */
import { api } from './AxiosService'
import { AppState } from '../AppState'
import router from '../router'

class PostService {
  async getAllPosts() {
    try {
      const res = await api.get('api/blogs')
      AppState.posts = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getActivePost(id) {
    try {
      const res = await api.get('api/blogs/' + id)
      // console.log('profile', AppState.profile)
      // console.log('user', AppState.user)
      // console.log('active post', res.data)
      AppState.activePost = res.data
      router.push({ name: 'ActivePost', params: { id: id } })
    } catch (error) {
      console.error(error)
    }
  }

  async getProfilePosts(id) {
    try {
      const res = await api.get('api/profile/blogs')
      AppState.userPosts = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createPost(newPost) {
    try {
      await api.post('api/blogs', newPost)
      // router.push({ name: 'ActivePost', params: { id: newPost.id } })
    } catch (error) {
      console.error(error)
    }
  }

  async editPost(id, editPost) {
    try {
      await api.put('api/blogs/' + id, editPost)
      // router.push({ name: 'ActivePost', params: { id: editPost.id } })
    } catch (error) {
      console.error(error)
    }
  }

  async deletePost(id) {
    try {
      if (window.confirm('Are you sure?')) {
        await api.delete('api/blogs/' + id)
        router.push({ name: 'Profile' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getComments(id) {
    try {
      const res = await api.get('api/blogs/' + id + '/comments')
      AppState.comments = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createComment(newComment) {
    try {
      await api.post('api/comments', newComment)
    } catch (error) {
      console.error(error)
    }
  }

  async editComments(id, editComment) {
    try {
      const res = await api.put('api/comments/' + id, editComment)
      console.log(id)
      AppState.comments = res.data
      // router.push({ name: 'ActivePost', params: { id: editComment.id } })
    } catch (error) {
      console.error(error)
    }
  }

  async deleteComment(id) {
    try {
      if (window.confirm('Are you sure?')) {
        await api.delete('api/comments/' + id)
        router.push({ name: 'Post', params: { id: id } })
        this.getComments()
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getProfileComments(id) {
    try {
      const res = await api.get('api/profile/comments')
      AppState.userComments = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const postService = new PostService()
