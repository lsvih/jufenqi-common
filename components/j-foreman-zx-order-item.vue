<template>
<div class="zc-order">
    <div class="zc-line-1">
        <div class="zc-user-name">{{order.customerName}}</div>
        <div class="zc-user-address">{{order.orderLocation+order.orderAddress}}</div>
        <div class="zc-user-more" v-tap="viewDetail(order.orderNo)">查看详情</div>
    </div>
    <div class="zc-line-2">
        <div class="zc-order-date"><img src="../assets/images/time.png">{{getTime(order.orderTime)}}</div>
        <div class="zc-order-status">{{Status.zx[order.status].name}}</div>
    </div>
    <div class="zc-line-3" v-if="order.manager.nickname">
        <div class="zc-butler-img"><img :src="order.manager.profileImage"></div>
        <div class="zc-butler-name">{{order.manager.nickname}}</div>
        <div class="zc-butler-tel" onclick="location.href='tel:{{order.manager.mobile}}'"><img src="../assets/images/tel.png"></div>
    </div>
    <div class="zc-line-3" v-if="order.projectManager.nickname">
        <div class="zc-butler-img"><img :src="order.projectManager.profileImage"></div>
        <div class="zc-butler-name">{{order.projectManager.nickname}}</div>
        <div class="zc-butler-tel" onclick="location.href='tel:{{order.projectManager.mobile}}'"><img src="../assets/images/tel.png"></div>
    </div>
    <div class="zc-line-3" v-if="order.planList[0].foreman.nickname">
        <div class="zc-butler-img"><img :src="order.planList[0].foreman.profileImage"></div>
        <div class="zc-butler-name">{{order.planList[0].foreman.nickname}}</div>
        <div class="zc-butler-tel" onclick="location.href='tel:{{order.planList[0].foreman.mobile}}'"><img src="../assets/images/tel.png"></div>
    </div>
    <div class="zc-line-3" v-if="order.planList.length===2">
        <div class="zc-butler-img"><img :src="order.planList[1].foreman.profileImage"></div>
        <div class="zc-butler-name">{{order.planList[1].foreman.nickname}}</div>
        <div class="zc-butler-tel" onclick="location.href='tel:{{order.planList[1].foreman.mobile}}'"><img src="../assets/images/tel.png"></div>
    </div>
</div>
</template>

<script>
import Status from '../status'
export default {
    data() {
        return {
            Status
        }
    },
    components: {},
    methods: {
        getTime(timeStamp) {
            var d = new Date(timeStamp * 1000);
            var Y = d.getFullYear() + '-';
            var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
            var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
            return Y + M + D
        },
        viewDetail(orderNo) {
            window.location.href = `zx-order.html?orderNo=${orderNo}`
        }
    },
    props: {
        data: {
            type: Object,
            default: {}
        },
        role: {
            type: String,
            default: 'user'
        }
    },
    computed: {
        order() {
            return this.data
        }
    }
}
</script>

<style scoped lang="less">
.zc-order {
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-bottom: 10px;
    .zc-line-1 {
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #eee;
        position: relative;
        .zc-user-name {
            position: absolute;
            top: 6px;
            left: 15px;
            font-size: 16px;
            color: #393939;
        }
        .zc-user-address {
            position: absolute;
            bottom: 6px;
            left: 15px;
            font-size: 12px;
            color: #393939;
        }
        .zc-user-more {
            position: absolute;
            top: 19px;
            right: 15px;
            font-size: 12px;
            color: #3ba794;
        }
    }
    .zc-line-2 {
        height: 40px;
        width: 100%;
        border-bottom: 1px solid #eee;
        position: relative;
        .zc-order-date {
            position: absolute;
            top: 14px;
            left: 15px;
            font-size: 12px;
            color: #393939;
            img {
                vertical-align: middle;
                height: 12px;
                width: 12px;
                margin-right: 5px;
            }
        }
        .zc-order-shop {
            position: absolute;
            top: 0;
            left: 15px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            color: #393939;
        }
        .zc-order-status {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 12px;
            color: #393939;
        }
    }
    .zc-line-3 {
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #eee;
        position: relative;
        .zc-butler-img {
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
        .zc-butler-name {
            position: absolute;
            bottom: 15px;
            left: 65px;
            font-size: 16px;
            color: #393939;
        }
        .zc-butler-tel {
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
    .zc-line-4 {
        position: relative;
        height: 20px;
        width: 100%;
        .zc-count {
            position: absolute;
            right: 15px;
            top: 4px;
            font-size: 12px;
            color: #393939;
            span {
                color: #EC5835;
            }
        }
    }
}
</style>
