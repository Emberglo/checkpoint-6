/* eslint-disable no-console */
import { api } from './AxiosService'
import { AppState } from '../AppState'

class PostService {
  async getAllPosts() {
    try {
      const res = await api.get('api/blogs')
      AppState.posts = res.data
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  async getActivePost(id) {
    try {
      const res = await api.get('api/blogs/' + id)
      console.log(res)
      AppState.activePost = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const postService = new PostService()