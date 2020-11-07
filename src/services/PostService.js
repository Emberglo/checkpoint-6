/* eslint-disable no-console */
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'

class PostService {
  async getAllPosts() {
    try {
      const res = await api.get('api/blogs')
      AppState.posts = res.data
    } catch (error) {
      console.error(error)
    }
  }
}

export const postService = new PostService()
