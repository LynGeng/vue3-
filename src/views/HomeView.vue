<!--
 * @Author       : lg
 * @Date         : 2022-06-29 11:00:00
 * @LastEditors  : lg
 * @LastEditTime : 2022-06-29 15:57:43
 * @FilePath     : \vue3-demo\src\views\HomeView.vue
 * @description  : 
-->
<template>
  <div class="home">
    <h1>首页</h1>
    <p>a: {{a}}</p>
    <p>b: {{b}}</p>
    <p>c: {{c}}</p>
    <p>d: {{d}}</p>
    <p>e: {{e}}</p>
    <button @click="handle">点击</button>
    <input
      type="text"
      ref="inputRef"
      placeholder="我会自动获取焦点"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  nextTick
} from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  // data() {
  //   return{
  //     a: 1,
  //     b: 2
  //   }
  // },
  // methods: {
  //   handle() {
  //     console.log('handle');
  //   }
  // },
  setup() {// setup不要使用async, 否则要特殊处理，setup优先级会比data，method高
    console.log('setup', this);
    let a = ref(1);// 定义响应式数据
    let b = ref(2);
    let c = ref('str');
    let d = ref(true);
    let e = ref({x: 100});
    let state = reactive({
      a: 1,
      b: 2,
      c: 'str',
      d: true,
      e: {x: 100},
    });
    const handle = () => {
      console.log('handle123');
      // a.value++;
      // b.value++;
      // c.value += '---';
      // d.value = !d.value;
      state.a++;
      state.b++;
      state.c += '---';
      state.d = !state.d;
      state.e.x++;
    }

    // 生命周期函数
    console.log('setup');
    onBeforeMount(() => {
      console.log('onBeforeMount')
    });
    onMounted(() => {
      console.log('onMounted');
    });
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate');
    });
    onUpdated(() => {
      console.log('onUpdated');
    });
    onActivated(() => {
      console.log("onActivated");
    });
    onDeactivated(() => {
      console.log("onDeactivated");
    });
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount');
    });
    onUnmounted(() => {
      console.log('onUnmounted');
    });


    // ref获取元素
    const inputRef = ref<HTMLElement|null>(null);
    
    nextTick(() => {
      // 获取到元素并且自动聚焦
      inputRef.value && inputRef.value.focus();
    })

    return {
      ...toRefs(state),
      handle,
      inputRef,
    }
  },
});
</script>
