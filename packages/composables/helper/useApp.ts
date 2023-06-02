import { ref } from '#imports'
import settings from '~~/packages/settings'

const useApp = () => {
  return {
    settings: ref(settings),
  }
}

export default useApp
