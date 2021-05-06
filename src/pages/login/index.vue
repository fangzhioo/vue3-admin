<template>
  <div>
    <button @click="handleLogin">login</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'

export default defineComponent({
  setup (props, context) {
    const router = useRouter()
    
    const handleLogin = () => {
      localStorage.setItem('APP_TOKEN', 'app-token');
      router.push({
        path: '/dashboard'
      })
    }
  
    return {
      handleLogin
    }
  }
})
</script>

<style scoped>

</style>