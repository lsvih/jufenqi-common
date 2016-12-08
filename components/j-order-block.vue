<template>
<div class="order">
    <img :src="Image">
    <div class="tel" onclick="location.href='tel:{{Tel}}'">{{Tel}}</div>
    <div class="time">{{Time}}</div>
    <div class="name">{{Name}}</div>
    <div class="more">查看详情</div>
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
        },
        time: {
            type: String,
            default: ''
        }
    },
    computed: {
        Image() {
            return this.img
        },
        Tel() {
            return this.tel
        },
        Name() {
            return this.name
        },
        Status() {
            return this.status
        },
        Time() {
            return this.time
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
    font-size: 12px;
    img {
        position: absolute;
        top: 10px;
        left: 15px;
        width: 60px;
        height: 60px;
    }
    .status {
        position: absolute;
        font-size: 12px;
        color: #393939;
        bottom: 10px;
        left: 85px;
    }
    .name {
        position: absolute;
        font-size: 12px;
        color: #393939;
        top: 10px;
        left: 86px;
    }
    .tel {
        position: absolute;
        left: 86px;
        top: 34px;
        color: #3BA794;
    }
    .time{
        position: absolute;
        left:86px;
        top:58px;
        color:#393939;
    }
    .more{
        position: absolute;
        right:15px;
        top:34px;
        color: #3BA794;
    }
}

</style>
