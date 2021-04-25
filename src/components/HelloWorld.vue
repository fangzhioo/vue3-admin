<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
    >
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <div>
    {{ state.name }} {{ state.age}}
  </div>
  <div>
    <refCom />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, isProxy, readonly } from 'vue'
import refCom from './ref.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: { refCom },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const obj = ref({ name: 'kirito' })
    const count = ref(0)
    const state = reactive({
      name: 'kirito',
      age: 16
    })
    const read = readonly(state);
    const readbyObj = readonly({ name: 1 })
    console.log(obj)
    console.log(count)
    console.log(state)
    console.log(isProxy(count), isProxy(state), isProxy(read), isProxy(readbyObj))

    return { 
      count,
      state
    }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
