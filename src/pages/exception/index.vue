<template>
  <div>
    {{currentStatus}}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, unref } from 'vue'
import { useRoute } from 'vue-router'

enum ExceptionEnum {
  PAGE_NOT_ACCESS = 403,
  PAGE_NOT_FOUND = 404,
  NET_WORK_ERROR = 500,
}

interface MapValue {
  title: string;
  subTitle: string;
}

export default defineComponent({
  props:{
    // 状态码
    status: {
      type: Number as PropType<number>,
      default: ExceptionEnum.PAGE_NOT_FOUND,
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
    subTitle: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup (props) {
    const { query } = useRoute();
    const statusMapRef = ref(new Map<string | number, MapValue>());

    statusMapRef.value.set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: '403',
      subTitle: '无权限操作',
    })

    statusMapRef.value.set(ExceptionEnum.PAGE_NOT_FOUND, {
      title: '404',
      subTitle: '找不到该页面',
    })

    statusMapRef.value.set(ExceptionEnum.NET_WORK_ERROR, {
      title: '500',
      subTitle: '服务器异常',
    })

    const currentStatus = computed<MapValue>(() => {
      const { status: routeQueryStatus } = query;
      const { status } = props;
      const code = Number(routeQueryStatus) || status;
      return statusMapRef.value.get(code) as MapValue;
    })

    return {
      currentStatus
    }
  }
})
</script>

<style scoped>

</style>