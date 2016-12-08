<template>
  <div>
<div class="person" v-if="Type === '0'">
    <div class="zx-img"><img :src="Image"></div>
    <div class="zx-name">{{Name}}</div>
    <div v-if="Tel" class="zx-tel" onclick="location.href='tel:{{Tel}}'"><img src="../assets/images/tel.png"></div>
</div>
<div class="zc-person" v-else>
    <div class="zc-img"><img :src="Image"></div>
    <div class="zc-name">{{Name}}</div>
    <div v-if="Tel" class="zc-tel" onclick="location.href='tel:{{Tel}}'"><img src="../assets/images/tel-s.png"></div>
</div>
</div>
</template>

<script>
export default {
    props: {
        img: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        tel: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: '0'
        }
    },
    computed: {
        Image() {
            return this.img
        },
        Name() {
            return this.name
        },
        Tel() {
            return this.tel
        },
        Type(){
          return this.type
        }
    }
}
</script>

<style scoped lang="less">
.person {
    height: 30px;
    width: 100%;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    position: relative;
    z-index: 20;
    .zx-img {
        position: absolute;
        top: 5px;
        left: 15px;
        height: 20px;
        width: 20px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .zx-name {
        position: absolute;
        top:0;
        height: 30px;
        line-height: 30px;
        left: 55px;
        font-size: 12px;
        color: #393939;
    }
    .zx-tel {
        position: absolute;
        top: 5px;
        right: 15px;
        height: 20px;
        width: 20px;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
.zc-person {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #eee;
    position: relative;
    .zc-img {
        position: absolute;
        top: 5px;
        left: 15px;
        height: 40px;
        width: 40px;
        border-radius: 20px;
        img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
        }
    }
    .zc-name {
        position: absolute;
        bottom: 15px;
        left: 65px;
        font-size: 16px;
        color: #393939;
    }
    .zc-tel {
        position: absolute;
        top: 15px;
        right: 15px;
        height: 20px;
        width: 20px;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
