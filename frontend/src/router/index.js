import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '../views/ChatView'

const routes = [
  {
    path: '/',
    name: 'jarvis',
    component: ChatView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
