<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index"
         class="tab-control-item" @click="itemClick(index)"
    :class="{active:index == currentIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  name: "TabControl",
  props: {
    titles: {
      type:Array,
      default() {
        return [];
      }
    }
  },
  setup(props,{emit}) {
    let currentIndex = ref(0);
    const itemClick = (index)=>{
      currentIndex.value = index;
      emit('tabClick',index);
    }
    return {
      currentIndex,
      itemClick
    }
  }
}
</script>

<style scoped lang="less">
  .tab-control {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 40px;
    line-height: 45px;
    font-size: 14px;
    background: #eaeaea;
    width: 100%;
    //悬停位置
    position: sticky;
    top: 45px;
    z-index: 3;
    .tab-control-item {
      span {
        padding: 6px;
      }
    }
    .active {
      color: var(--color-tint);
      span {
        border-bottom: 3px solid var(--color-tint);
      }
    }
  }
</style>
