<!--
 * @Author       : lg
 * @Date         : 2022-06-29 11:00:00
 * @LastEditors  : lg
 * @LastEditTime : 2022-07-01 00:00:50
 * @FilePath     : \vue3-demo\src\views\AboutView.vue
 * @description  : 
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h4>position: {{x}},{{y}}</h4>
  </div>
  <button @click="getR">路由</button>
  <button @click="goHome">回到首页</button>
  <h4>count: {{loading ? '加载中...' : count}}</h4>
  <button @click="add">+1</button>
  <button @click="minus">-1</button><br>
  <input type="number" v-model="changeCount" placeholder="请输入count"/><button @click="update">改变</button>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  toRaw,
  computed
} from 'vue';
import {
  useRoute,
  useRouter
}
from 'vue-router';
import useMousePosition from '../hooks/useMousePosition'
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const {x, y} = useMousePosition();
    const route = useRoute();
    const router = useRouter();
    const getR = () => {
      console.log(toRaw(route));
      console.log(router);
    }
    const goHome = () => {
      router.push('/');
    }

    const store = useStore();
    const count = computed(() => store.state.a.count);
    const loading = ref(true);
    store.dispatch('getCount').then(() => {
      loading.value = false;
    });
    const add = () => {
      store.commit('plus');
    }
    const minus = () => {
      store.commit('minus');
    }

    let changeCount = ref();
    const update = () => {
      store.commit('update', changeCount);
    }

    return {
      x,
      y,
      getR,
      goHome,
      count,
      loading,
      changeCount,
      add,
      minus,
      update
    }
  }
})
</script>
