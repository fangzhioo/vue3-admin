/**
 * hooks 聚合器
 */
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'

export const useEnhancer = () => {
  // 注意这里的useStore并不是从 vuex中导入！！！
  const store = useStore()

  const route = useRoute()
  const router = useRouter()

  return {
    store,
    route,
    router,
  }
}
