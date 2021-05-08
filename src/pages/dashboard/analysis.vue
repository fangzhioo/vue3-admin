<template>
  <div>
    <div> username: {{username || '-'}} </div>
    <div> realName: {{realName || '-'}} </div>
    <div> roles: {{roles || '-'}} </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useEnhancer } from '@/enhancer'
import { getNamespace, IModules } from '@/store';
import { USER_ACTIONS } from '@/store/modules/user';

export default defineComponent({
  setup () {
    const { store } = useEnhancer();

    const username = computed(() => store.state.user.userInfo?.username)
    const realName = computed(() => store.state.user.userInfo?.realName)
    const roles = computed(() => store.state.user.roleList)

    if (!username.value) {
      store.dispatch(getNamespace(IModules.User, USER_ACTIONS.fetchCurrentUserInfo))
    }

    return {
      username,
      realName,
      roles
    }
  }
})
</script>