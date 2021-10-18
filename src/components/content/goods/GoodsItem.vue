<template>
  <div class="goods-item">
    <img v-lazy="product.cover_url" alt="">
    <div class="goods-info">
      <p>{{product.title}}</p>
      <span class="price"><small>￥</small>{{product.price}}</span>
      <span class="collect">{{product.collects_count}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    product: Object,
    default() {
      return {};
    }
  }
}
</script>

<style scoped lang="less">
  .goods-item {
    width: 50%;
    float: left;
    padding: 20px;
    background: #f7f7f7;
    position: relative;
    img {
      width: 100%;
      border-radius: 5px;
      margin-bottom: 15px;
    }
    .goods-info {
      font-size: 15px;
      position: absolute;
      bottom: 1px;
      left: 0;
      right: 0;
      overflow: hidden;
      p {
        line-height: 14px;
      }
      .price {
        color: red;
        margin-right: 25px;
      }
      .collect {
        position: relative;
      }
      .collect::before {
        content: '';
        position: absolute;
        left: -17px;
        width: 16px;
        height: 16px;
        line-height: 15px;
        background: url("~assets/image/collect.png");
      }
    }
  }
</style>
