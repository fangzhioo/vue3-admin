<template>
  <div> count: {{ count }} double: {{double}} plus: {{ plus }} </div>
  <button @click="count+=1">count++</button>
  <button @click="plus=6">plus = 6</button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const count = ref<number>(1)
     // getter函数
    const double = computed<number>(() => count.value + count.value)
    // 具有get和set的函数对象
    const plus = computed<number>({
      get() {
        return count.value + 1;
      },
      set(val: number) {
        // 按照get的逻辑， 当设置 plus为val时， count的值就是 val - 1
        count.value = val - 1;
      }
    })
    return {
      count,
      double,
      plus
    }
  }
})
</script>
