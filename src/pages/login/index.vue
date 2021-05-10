<template>
  <div>
    <a-input v-model:value="username" type="text" placeholder="用户名" />
    <a-input v-model:value="password" type="password" placeholder="密码" />
    <a-button @click="handleLogin">login</a-button>
  </div>
</template>

<script>
  import { defineComponent, reactive, toRaw, toRefs } from 'vue';
  import { useEnhancer } from '@/enhancer';
  import { getNamespace, IModules } from '@/store';
  import { USER_ACTIONS } from '@/store/modules/user';

  export default defineComponent({
    setup(_props, _context) {
      const { router, store } = useEnhancer();

      const state = reactive({
        username: 'tongren',
        password: '123456',
      });

      const handleLogin = () => {
        // localStorage.setItem('APP_TOKEN', 'app-token');
        const payload = toRaw(state);
        console.log(payload);
        store
          .dispatch(getNamespace(IModules.User, USER_ACTIONS.fetchUserLogin), payload)
          .then(() => {
            router.push({
              path: '/dashboard',
            });
          })
          .catch(({ message }) => {
            alert(message);
          });
      };

      return {
        ...toRefs(state),

        handleLogin,
      };
    },
  });
</script>

<style scoped></style>
