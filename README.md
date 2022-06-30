## 1. main.ts全部使用全局api和链式调用创建模板

## 2. setup是一个函数，不要使用async，否则要特殊处理，setup优先级会比data，method高

## 3. ref(): 创建一个响应式数据的引用对象
let a = ref(1); 定义原始数据类型数据<br>
修改时修改的是 a.value++; 直接a++会报错<br>
模板中不需要.value直接使用即可<br>
当然也可以用来定义对象，只不过定义对象有更好的方法reactive<br>

## 4. reactive() 创建引用型响应式数据的引用对象
let state = reactive({x: 100});<br>
修改引用响应式数据直接修改即可 state.x = 123<br>
不需要state.x.value这样修改<br>

## 5. toRefs(): 将响应式对象中所有属性包装为ref对象，并返回包含这些对象的普通对象
如果将对象使用扩展运算符展开返回的话，对象里面的数据也要响应式，则使用toRefs()包裹对象再扩展<br>
...toRefs(state);<br>
对reactive对象进行toRefs包装，包装之后的对象中每个属性都是响应式的<br>

## 6. 比较vue2和vue3的响应式（重要）
vue2中的问题<br>
	①对象直接添加新的属性或删除已有属性，界面不会自动更新，不是响应式<br>
	②直接通过下标修改元素(arr[1] = xxx)或更新数组的length，界面不会自动更新，不是响应式的<br>
vue3不存在上述两个问题<br>
vue3中响应式使用proxy生成代理对象，所以不存在以上两种问题<br>
```
new Proxy(obj, {
	get(){},
	set(newVal){},
	deleteProperty(target, prop){}
})
```

## 7. setup的参数
①props-接收父组件传入的通过props声明过的属性<br>
②context-是一个对象，解构出来包含：<br>
	attrs-接收父组件传入的没有通过props声明过的属性，相当于this.$attrs<br>
	slots-接收父组件传入的插槽内容的对象，相当于this.$slots<br>
	emit-用来分发自定义事件的函数，相当于this.$emit<br>
setup里面使用emit则需要解构出来<br>

## 8. computed需要引入
```
const fullName = computed(()=>{
	return user.firstName + " " + user.lastName;
});
const fullName = computed({
	get(){
		return user.firstName + " " + user.lastName;
	},
	set(value: string) {
		const names = value.split(" ");
		user.firstName = names[0];
		user.lastName = names[1];
	}
});
```

## 9. 监听属性watch
Vue2：
```
watch: {
	obj(newVal, oldVal) {
		console.log(newVal, oldVal);
	},
	// 立即监听、深度监听
	obj: {
		handler(newVal, oldVal){
			console.log(newVal, oldVal);
		},
		immediate: true,// 初始化立即执行一次
		deep: true, // 深度监听
	},
	// 监听对象上的属性
	'obj.a'(newVal, oldVal) {
		console.log(newVal, oldVal);
	}
}
```
Vue3:<br>
	watch-指定监听数据<br>
		监听指定的一个或多个响应式数据，一但数据变化，就自动执行监视回调<br>
		    如果是监听reactive对象中的属性，必须通过函数来指定<br>
		    监听多个数据，使用数组来指定<br>
		默认初始时不执行回调，但可以通过配置immediate为true，设置初始立即执行一次<br>
		通过配置deep为true来指定深度监视<br>
	watchEffect-不指定监听数据<br>
		不用直接指定要监视的数据，回调函数中使用哪些响应式数据就监视哪些响应式数据<br>
		默认初始时就会执行第一次<br>
使用时需要先引入<br>
例子：
```
// 监听ref
const str = ref("abc");
watch(str, (newVal, oldVal) => {
	console.log(newVal, oldVal);
});
// 监听reactive对象中的属性
const user = reactive({
	firstName: 'zhang',
	lastName: 'san',
});
watch(()=>user.firstName, (newVal, oldVal) => {
	console.log(newVal, oldVal);
});
// 监听多个属性
watch([str, ()=>user.firstName], (newVal, oldVal) => {
	console.log(newVal, oldVal);
}, {
	immediate: true,// 立即监听
	deep: true,// 深度监听
});
watchEffect(() => {
	fullName.value = user.firstName +" "+ user.lastName;
});
```
## 10. 生命周期
```
vue2			vue3
beforeCreate	setup
created		setup
beforeMount	onBeforeMount
mounted		onMounted
beforeUpdate	onBeforeUpdate
updated		onUpdated
beforeDestroy	onBeforeUnmount
destroyed		onUnmounted
			onActivated
			onDeactivated
```

## 11. ref获取元素和nextTick
我们知道vue2中是用this.$refs.xxx来获取元素或者组件的，但是vue3中没有this的概念，应该如何获取呢<br>
这个时候我们可以使用之前学过的ref创建响应式数据的api来获取<br>
元素标签上定义属性ref<br>
```
<input
      type="text"
      ref="inputRef"// 不能使用动态绑定
      placeholder="我会自动获取焦点"
/>
setup(){
	// ref获取元素
	const inputRef = ref<HTMLElement|null>(null);
	nextTick(() => {
      		// 获取到元素并且自动聚焦
      		inputRef.value && inputRef.value.focus();
    	});
}
```

## 12. 自定义hook函数（钩子函数）
1. 创建一个函数，函数名称必须用use开头<br>
2. 函数必须return一些数据<br>

## 13. shallowReactive与shallowRef
它们都表示浅响应式，reactive和ref是深响应<br>
shallowReactive：只处理了对象第一层属性的响应式（只响应第一层）<br>
shallowRef：只有重新弄赋值时才是响应式（不响应内部数据，只响应整体）<br>

## 14. readonly与shallowReadonly
它们表示只读代理对象<br>
readonly：深度只读，设置readonly后，修改响应式数据会报错<br>
shallowReadonly：浅只读，设置shallowReadonly后，修改响应式数据的第一层属性会报错<br>
应用场景：在某些特定情况下啊，我们可能不希望对数据进行更新的操作，那就可以包装生成一个只读代理对象来读取数据，而不能修改或删除。<br>

## 15. toRaw和markRaw
toRaw：返回reactive或readonly对象的原始数据。这是一个还原方法，可用于临时读取，得到的数据不具有响应式<br>
markRaw：标记一个对象，使其不具有响应式<br>
应用场景：有些值不应被设置为响应式的，例如复杂的第三方类实例或Vue组件对象；当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。<br>

## 16. toRef
为响应式对象上的某个属性创建一个ref引用，更新时引用对象会同步更新<br>
const foo = toRef(refState, "foo");// foo和refState.foo是引用关系，浅拷贝，foo.value == refState.foo<br>
区别ref：拷贝了一份新的数据表单单独操作，更新时互相不影响 // ref为深拷贝<br>

## 17. customRef
用于自定义一个ref，可以显示的控制依赖追踪和触发响应<br>
接受一个工厂函数，两个参数分别是用于追踪的track与用于触发响应的trigger，并返回一个带有get和set属性的对象。<br>
需求：使用customRef实现防抖函数<br>

## 18. provide 和 inject
provide和inject提供依赖注入，功能类似2.x的provide/inject<br>
实现跨层级组件（祖孙）间通信<br>
父组件：<br>
```
import {provide} from  'vue';
setup(){
	const color = ref('red');
	provide('color', color);
	return{color};
};
子组件：
import {inject} from 'vue';
setup(){
	const color = provide('color');
	return{color};
};
```
## 19. 响应式数据的判断（手写实现）
isRef：检查一个值是否为一个ref对象<br>
isReactive：检查一个对象是否由reactive创建的响应式代理<br>
isReadonly：检查一个对象那个是否由readonly创建的只读代理<br>
isProxy：检查一个对象是否由reactive或者readonly方法创建的代理<br>

## 20. 其他新组件和API
①Fragment(片段)<br>
在vue2中：组件必须有一个根标签<br>
在vue3中：组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中<br>
好处：减少标签层级，减小内存占用<br>
```
<template>
	<h2>aaa</h2>
	<h2>aaa</h2>

</template>
②Teleport(瞬移)
Teleport提供了一种干净的方法，让组件html在父组件界面外的特定标签（很可能是body）下插入显示
<button @click="modalOpen = true">Open full screen modal! (with teleport)</button>
<teleport to="body">
	<div v-if="modalOpen" class="modal">
		I'm a teleported modal! (My parent is "body")
		<button @click="modalOpen = false">Close</button>
	</div>
</teleport>
③Suspense(不确定的)
Suspense组件时配合异步组件使用的，它可以让异步组件放回数据前渲染一些后备内容
创建异步组件：
	在setup函数中返回一个promise，就是一个异步组件
	setup函数写成async函数也是一个异步组件
异步组件AsyncComp.vue
<template>
	<h2>AsyncComp</h2>
	<p>{{ msg }}</p>
</template>
<script lang="ts">
	export default {
		name: 'AsyncComp',
		setup(){
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({ msg: 'abc' });
				}, 2000);
			});
		}
	}
</script>
异步组件AsyncComp2.vue
<template>
	<h2>AsyncComp</h2>
	<p>{{ msg }}</p>
</template>
<script lang="ts">
	export default {
		name: 'AsyncComp',
		async setup(){
			const res = await new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({ msg: 'abc' });
				}, 2000);
			});
			return res;
		}
	}
</script>
使用异步组件：
<template>
	<Suspense>
		<template v-slot:default>
			<AsyncComp/>
		</template>
		<template v-slot:fallback>
			<p>AsyncComp Loading...</p>
		</template>
	</Suspense>
	<hr>
	<Suspense>
		<template v-slot:default>
			<AsyncComp2/>
		</template>
		<template v-slot:fallback>
			<p>AsyncComp2 Loading...</p>
		</template>
	</Suspense>
</template>
<script lang="ts">
	import AsyncComp from './AsyncComp.vue';
	import AsyncComp from './AsyncComp2.vue';
	// 也可以这样引入
	// import { defineAsyncComponent} from 'vue';
	// const AsyncComp = defineAsyncComponent(() => import('./AsyncComp.vue'));
	export default {
		setup(){
			return {};
		},
		components: {
			AsyncComp,
			AsyncComp2
		}
	};
</script>
```
## 21. 其他新的API
①全新的全局API<br>
createApp();<br>
defineProperty();<br>
defineAsyncComponent();<br>
nextTick();<br>
②将原来的全局API转移到应用对象<br>
app.component();<br>
app.config();<br>
app.directive();<br>
app.mount();<br>
app.use();<br>

## 22. v-model的本质变化
	在表单上使用没有变化<br>
	在组件上使用的时候，默认的属性名和事件名发生了变化<br>
		prop，value -> modelValue<br>
		event，input -> update:modelValue<br>
```
<template>
	<Child v-model="msg"/>
</template>
<script lang="ts">
	import {defineComponent, ref} from 'vue';
	import Child from './Child';
	export default defineComponent({
		components:{ Child },
		setup() {
			const msg = ref('abc');
			return { msg };
		}
	});
</script>
Child.vue:
<template>
	<h2>Child</h2>
	<p>{{ modelValue }}</p>
	<button @click="update">更新</button>
</template>
<script lang="ts">
	import {defineComponent, ref} from 'vue';
	export default defineComponent({
		props: ['modelValue'],// 以前是value
		setup(props, {emit}) {
			// 以前是emit('input')
			const update = () => {
				emit('update:modelValue', props.modelValue + '....');
			}
			return { update };
		}
	});
</script>
可以自定义modelValue的名字：
<Child v-model:str="msg"/>
// 触发得改成update:str
emit('update:str');
可以绑定多个v-model
<Child v-model:str="msg" v-model:name="username"/>
.sync修饰符已移除，有v-model代替
// vue2 中 .sync 的用法
<Child :name.sync="username"/>
// vue3 相当于
<Child v-model:name="username"/>
```
## 23. v-if 优先级比 v-for 高

## 24. 路由的操作
```
userRoute - 获取当前路由对象
import {useRoute} from 'vue-router';
setup() {
	const route = useRoute();
	console.log(route);
}
useRouter - 获取路由实例，可以进行路由跳转
import {useRouter} from 'vue-router';
setup() {
	const router = useRouter();
	console.log(router);
	const goHome = () => {
		router.push('/home');
	}
}
```
## 25. 状态管理Vuex
```
useStore - 获取vue实例
import { useStore } from 'vuex';
setup() {
	const store = useStore();
	store.dispatch('xxx');
}
```

