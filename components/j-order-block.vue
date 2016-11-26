<template>
  <div class="order">
      <img :src="Image">
      <div class="tel" onclick="location.href='tel:{{Tel}}'">{{Tel}}</div>
      <div class="name">{{Name}}</div>
      <div class="status">{{Status}}</div>
  </div>
</template>

<script>
export default {
    props: {
      img: {
          type: String,
          default: ''
      },
      tel: {
          type: String,
          default: ''
      },
      name: {
          type: String,
          default: ''
      },
      status: {
          type: String,
          default: ''
      }
    },
    computed: {
        Image(){
          return this.img
        },
        Tel(){
          return this.tel
        },
        Name(){
          return this.name
        },
        Status(){
          return this.status
        }
    }
}
</script>

<style scoped lang="less">
.order {
    width: calc(~"100% - 15px");
    height: 80px;
    background-color: #fff;
    padding-left: 15px;
    position: relative;
    border-bottom: 1px solid #eee;
    img{
      position: absolute;
      top:10px;
      left:15px;
      width: 60px;
      height: 60px;
    }
    .status{
      position: absolute;
      font-size: 12px;
      color:#393939;
      bottom:10px;
      left: 85px;
    }
    .name{
      position: absolute;
      font-size: 12px;
      color:#393939;
      top:10px;
      left:86px;
    }
    .tel{
      position: absolute;
      right: 15px;
      top: 0;
      height: 80px;
      line-height: 80px;
      color:#3BA794;
    }
}
</style>
