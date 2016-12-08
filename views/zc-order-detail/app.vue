<template>
<header>
    <img src="../../assets/images/status.png">
    <div class="status">{{Status.zc[order.status].name}}</div>
    <div class="btn" v-if="(order.status==1||order.status==2)&&Role === 'user'" v-tap="cancelOrder()">取消{{order.status == 1?'预约':'订单'}}</div>
    <div class="time" v-if="Role == 'manager'">{{getTime(order.createdAt)}}</div>
</header>
<div class="user" v-if="Role !== 'user'" :style="{height:order.orderTime?'110px':'80px'}">
    <div class="user-img"><img :src="order.customerImage||order.appt.customerImage"></div>
    <div class="user-name">{{order.customerName||order.appt.customerName}}</div>
    <div class="user-tel" onclick="location.href='tel:{{order.customerMobile||order.appt.customerMobile}}'">{{order.customerMobile||order.appt.customerMobile}}</div>
    <div class="hr"></div>
    <div class="user-time" v-if='order.orderTime'><img src="../../assets/images/time.png">{{getTime(order.orderTime)}}</div>
</div>
<div class="user" v-else :style="{height:order.orderTime?'110px':'80px'}">
    <div class="user-img"><img :src="order.customerImage||order.appt.customerImage"></div>
    <div class="user-name">{{order.customerName||order.appt.customerName}}</div>
    <div class="user-tel" onclick="location.href='tel:{{order.customerMobile||order.appt.customerMobile}}'">{{order.customerMobile||order.appt.customerMobile}}</div>
    <div class="hr"></div>
    <div class="user-time" v-if='order.orderTime'><img src="../../assets/images/time.png">{{getTime(order.orderTime)}}</div>
</div>
<div>
    <div class="zc-list" v-if="orderNo == 0" style="margin-top:-1.17647059em">
        <group v-for="shop in order.orders">
            <j-person :img="clerkImg" :name="shop.clerkName" v-if="order.status >= 3"></j-person>
            <j-person :img="guideImg" :name="shop.guideName" :tel="shop.guideMobile"></j-person>
            <div class="line-1">
                <div class="line-1-left">{{shop.storeName}}</div>
                <div class="btn" v-if="order.status==5&&Role === 'user'" onclick="location.href='order-judge.html'">去评价</div>
            </div>
            <div class='line-1'>
                <div class="line-1-left" style="font-size:12px;">{{shop.storeAddress}}</div>
                <div class="line-1-tel" v-tap="goto('tel:'+shop.storePhone)"><img src="../../assets/images/tel.png"></div>
            </div>
            <cell class="zc-cell">
                <div class="zc-name">{{shop.brandName}}</div>
            </cell>
            <div class="line-2" v-if="order.status > 1">
                <div class="line-2-title">正价总额</div>
                <div class="line-2-right">{{shop.normalAmount|currency "￥" 2}}</div>
            </div>
            <div class="line-2" v-if="order.status > 1">
                <div class="line-2-title">特价总额</div>
                <div class="line-2-right">{{shop.specialAmount|currency "￥" 2}}</div>
            </div>
            <div class="line-2" style="border-top:5px solid #eee!important;" v-if="order.status > 1 ">
                <div class="line-2-title">总额</div>
                <div class="line-2-right">{{shop.normalAmount+shop.specialAmount|currency "￥" 2}}</div>
            </div>
            <div class="line-3" v-if="order.status ==1||order.status == 2||order.status ==5">
                <div class="appoint-at" v-if="order.status == 1"><img src="../../assets/images/time.png">{{getTime(order.orderTime)}}</div>
            </div>
        </group>

        <group title="订单总计" v-if="order.status > 1">
            <div class="line-2">
                <div class="line-2-title">正价总额</div>
                <div class="line-2-right">{{getCount("normalAmount",order.orders)|currency "￥" 2}}</div>
            </div>
            <div class="line-2">
                <div class="line-2-title">特价总额</div>
                <div class="line-2-right">{{getCount("specialAmount",order.orders)|currency "￥" 2}}</div>
            </div>
            <div class="line-2" style="border-top:5px solid #eee!important;">
                <div class="line-2-title">订单总额</div>
                <div class="line-2-right">{{getAllCount(order.orders)|currency "￥" 2}}</div>
            </div>
        </group>

        <group v-if="order.status == 2&&Role === 'user'">
            <div class="sumbit-order active" v-tap="goto('./pay.html?apptNo='+order.apptNo)">继续支付</div>
        </group>
        <group v-if="order.status == 1&&Role === 'user'">
            <div class="sumbit-order active" v-tap="gotoPay()">发起支付</div>
        </group>
    </div>
    <div class="zc-list" v-else>
        <group>
            <j-person :img="clerkImg" :name="order.clerkName"></j-person>
            <div class="line-1">
                <div class="line-1-left">{{order.storeName}}</div>
                <div class="btn" v-if="order.status==5&&Role === 'user'" onclick="location.href='order-judge.html'">去评价</div>
            </div>
            <div class='line-1'>
                <div class="line-1-left" style="font-size:12px;">{{order.storeAddress}}</div>
                <div class="line-1-tel" v-tap="goto('tel:'+order.storePhone)"><img src="../../assets/images/tel.png"></div>
            </div>
            <cell class="zc-cell">
                <div class="zc-name">{{order.brandName}}</div>
            </cell>
            <div class="line-2" v-if="order.status > 1">
                <div class="line-2-title">正价总额</div>
                <div class="line-2-right">{{order.normalAmount|currency "￥" 2}}</div>
            </div>
            <div class="line-2" v-if="order.status > 1">
                <div class="line-2-title">特价总额</div>
                <div class="line-2-right">{{order.specialAmount|currency "￥" 2}}</div>
            </div>
            <div class="line-2" style="border-top:5px solid #eee!important;" v-if="order.status > 1 ">
                <div class="line-2-title">总额</div>
                <div class="line-2-right">{{order.normalAmount+order.specialAmount|currency "￥" 2}}</div>
            </div>
            <div class="line-3" v-if="(order.status ==1||order.status == 2||order.status ==5)&&order.appt.orderTime">
                <div class="appoint-at" v-if="order.status == 1"><img src="../../assets/images/time.png">{{getTime(order.appt.orderTime)}}</div>
            </div>
        </group>
        <group v-if="order.status > 2" title="支付方式">
            <div class="line-2" v-if="order.appt.payMethod == 2">
                <div class="line-2-title">分期支付</div>
                <!-- <div class="line-2-right" style="color:#393939;">{{order.stageCount}}期</div> -->
            </div>
            <div class="line-2" v-if="order.appt.payMethod == 1">
                <div class="line-2-title">全款支付</div>
            </div>
            <div class="line-2" v-if="order.appt.payMethod == 3">
                <div class="line-2-title">微信支付</div>
            </div>
            <div class="line-2" v-if="order.appt.payMethod == 4">
                <div class="line-2-title">银联支付</div>
            </div>
        </group>
    </div>
</div>
<loading :show.sync="showLoading" text="正在加载,请稍候"></loading>

<div v-if="order.status == 3&&Role === 'guide'">
    <div class="sumbit-order active" v-if="order.status == 3&&Role === 'guide'&&order.appt.payMethod == 1" v-tap="pay()">用户已付款</div>
    <div class="sumbit-order active" v-if="order.status == 3&&Role === 'guide'&&order.appt.payMethod == 2" v-tap="insPay(order.orderNo,order.customerId)">选择分期期数</div>
</div>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import managerImg from '../../assets/images/role/manager.png'
import JPerson from '../../components/j-person'
import clerkImg from '../../assets/images/role/clerk.png'
import guideImg from '../../assets/images/role/guide.png'
import Loading from 'vux-components/loading'
import axios from 'axios'
import Status from '../../status'
try {
    let now = Number(new Date().getTime())
    if (Number(JSON.parse(localStorage.user).expiredAt) < now) {
        localStorage.removeItem('user')
        location.href = './wxAuth.html?url=' + encodeURIComponent(location.href)
    }
    axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).tokenType + ' ' + JSON.parse(localStorage.getItem("user")).token
} catch (e) {
    localStorage.clear()
    window.location.href = `./wxAuth.html?url=index.html`
}
export default {
    data() {
        return {
            clerkImg,
            managerImg,
            guideImg,
            orderNo: Lib.M.GetRequest().orderNo,
            apptNo: Lib.M.GetRequest().apptNo,
            order: {},
            Status,
            payments: [{
                key: '0',
                value: '全款购买'
            }, {
                key: '1',
                value: '分期购买'
            }],
            payWay: "",
            showLoading: false
        }
    },
    ready() {
        if (this.orderNo != 0) {
            axios.get(`${Lib.C.mOrderApi}materialOrders/${this.orderNo}`).then((res) => {
                this.order = res.data.data
            }).catch((res) => {
                alert("获取订单失败，请稍候再试QAQ")
            })
        } else {
            axios.get(`${Lib.C.mOrderApi}materialAppts/${this.apptNo}`).then((res) => {
                this.order = res.data.data
            }).catch((res) => {
                alert("获取订单失败，请稍候再试QAQ")
            })
        }
    },
    components: {
        Group,
        Cell,
        JPerson,
        Loading
    },
    props: {
        role: {
            type: String,
            default: 'user'
        }
    },
    computed: {
        Role() {
            return this.role
        }
    },
    methods: {
        getCount(type, orders) {
            let count = 0
            orders.map((e) => {
                count += e[type]
            })
            return count
        },
        getAllCount(orders) {
            let count = 0
            orders.map((e) => {
                count += (e.specialAmount + e.normalAmount)
            })
            return count
        },
        selectPay(e) {
            this.payWay = Number(e)
        },
        submitOrder() {
            if (this.payWay === "") return false
            if (this.payWay == 1) {
                this.showInsNumberPicker = true
            } else {
                axios.post(`${Lib.C.mOrderApi}materialOrders/${Lib.M.GetRequest().orderNo}/customerConfirmMaterial?payMethod=1&stageCount=1`).then((res) => {
                    alert("订单已更新！")
                    location.reload()
                }).catch((res) => {
                    alert("更新订单失败，请稍后重试")
                })
            }
        },
        cancelOrder() {
            axios.post(`${Lib.C.mOrderApi}materialAppts/${Lib.M.GetRequest().apptNo}/cancel`).then((res) => {
                history.go(-1)
            }).catch((res) => {
                alert("取消订单失败，请稍后重试")
            })
        },
        getTime(timeStamp) {
            var d = new Date(timeStamp * 1000);
            var Y = d.getFullYear() + '-';
            var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
            var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
            return Y + M + D
        },
        look() {
            axios.post(`${Lib.C.mOrderApi}materialOrders/${Lib.M.GetRequest().orderNo}/confirmVisit`).then((res) => {
                alert("订单已更新！")
                location.reload()
            }).catch((res) => {
                alert("更新订单失败，请稍后重试")
            })
        },
        pay() {
            axios.post(`${Lib.C.mOrderApi}materialOrders/${Lib.M.GetRequest().orderNo}/confirmPay`).then((res) => {
                alert("订单已更新！")
                location.reload()
            }).catch((res) => {
                alert("更新订单失败，请稍后重试")
            })
        },
        getgood() {
            axios.post(`${Lib.C.mOrderApi}materialOrders/${Lib.M.GetRequest().orderNo}/confirmReceive`).then((res) => {
                alert("订单已更新！")
                location.reload()
            }).catch((res) => {
                alert("更新订单失败，请稍后重试")
            })
        },
        modify() {
            location.href = `modify.html?orderNo=${Lib.M.GetRequest().orderNo}`
        },
        goto(url) {
            location.href = url
        },
        gotoPay() {
            this.showLoading = true
            let sbList = []
            this.order.orders.forEach((e) => {
                sbList.push([e.storeId,e.brandId])
            })
            let storeList = []
            sbList.forEach((sb) => {
                if (!~storeList.indexOf(sb[0])) {
                    storeList.push(sb[0])
                }
            })
            let brandList = []
            sbList.forEach((sb) => {
                if (!~brandList.indexOf(sb[1])) {
                    brandList.push(sb[1])
                }
            })
            console.log(sbList, storeList, brandList)
            axios.get(`${Lib.C.merApi}stores`, {
                params: {
                    filter: `id:${storeList.join(',')}`
                }
            }).then((res) => {
                let stores = res.data.data
                stores.map((e) => {
                    e.brands = []
                })
                axios.get(`${Lib.C.merApi}brands`, {
                    params: {
                        filter: `id:${brandList.join(',')}`
                    }
                }).then((res) => {
                    let brands = res.data.data
                    sbList.forEach((a) => {
                        stores[findIndex(a[0], stores)].brands.push(brands[findIndex(a[1], brands)])
                    })
                    localStorage.temp = JSON.stringify(stores)
                    location.href = './add-order.html?from=' + this.apptNo
                }).catch((err) => {
                    alert('网络连接失败，请稍后再试')
                    this.showLoading = false
                    throw err
                })
            }).catch((err) => {
                alert('网络连接失败，请稍后再试')
                this.showLoading = false
                throw err
            })

            function findIndex(id, array) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].id == id) return i
                }
                return -1
            }
        },
        insPay(orderNo, customerId) {
            this.showLoading = true
            axios.get(`${Lib.C.loanApi}loan-applications/`, {
                params: {
                    filter: `userId:${customerId}|statusEnum:3`
                }
            }).then((res) => {
                if (res.data.data[0].bankBranchPeriod == null) {

                } else {
                    let bbpId = res.data.data[0].bankBranchPeriod.id
                    axios.post(`${Lib.C.mOrderApi}materialOrders/${orderNo}/confirmPayment`, {
                        params: {
                            bankBranchPeriodId: bbpId
                        }
                    }).then((res) => {
                        alert('确认分期成功！')
                        location.reload()
                    }).catch((err) => {
                        alert('网络连接失败，请重试')
                        this.showLoading = false
                        throw err
                    })
                }
            }).catch((err) => {
                alert('网络连接失败，请重试')
                this.showLoading = false
                throw err
            })
        }
    }
}
</script>

<style>
body {
    background-color: #eee;
}
</style>
<style scoped lang="less">
.cell-item {
    position: relative;
    height: 80px;
    .shop-logo {
        position: absolute;
        top: 10px;
        left: 15px;
        width: 120px;
        height: 80px;
    }
    .shop-name {
        position: absolute;
        top: 10px;
        left: 145px;
        font-size: 12px;
        color: #393939;
    }
    .shop-address {
        position: absolute;
        top: 44px;
        left: 145px;
        font-size: 12px;
        color: #999;
    }
    .shop-rank {
        position: absolute;
        bottom: 10px;
        left: 145px;
        font-size: 12px;
        color: #5965B2;
    }
    .shop-is-favorite {
        position: absolute;
        top: 40px;
        right: 15px;
        width: 20px;
        height: 20px;
    }
}
header {
    position: relative;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    background-color: #fff;
    z-index: 20;
    img {
        width: 13px;
        height: 20px;
        position: absolute;
        top: 5px;
        left: 15px;
    }
    .status {
        position: absolute;
        left: 38px;
        top: 9px;
        width: 60px;
        height: 12px;
        font-size: 12px;
        color: #393939;
    }
    .btn {
        position: absolute;
        right: 15px;
        top: 5px;
        width: 60px;
        height: 20px;
        // border: 1px solid #393939;
        font-size: 12px;
        color: #999;
        line-height: 20px;
        text-align: center;
    }
    .time {
        position: absolute;
        right: 15px;
        top: 5px;
        height: 30px;
        line-height: 30px;
        text-align: right;
        font-size: 12px;
        color: #393939;
    }
}
.butler {
    height: 50px;
    width: 100%;
    z-index: 20;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    position: fixed;
    top: 30px;
    left: 0;
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
.zc-list {
    width: 100%;
    .zc-shop-img {
        height: 120px;
        width: 100%;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .line-1 {
        width: 100%;
        height: 50px;
        position: relative;
        .line-1-left {
            position: absolute;
            left: 15px;
            top: 17px;
            font-size: 16px;
            color: #393939;
        }
        .btn {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 12px;
            color: #fff;
            width: 50px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background-color: #88C929;
            border-radius: 2px;
        }
        .line-1-tel {
            position: absolute;
            top: 0;
            right: 15px;
            height: 50px;
            line-height: 50px;
            img {
                vertical-align: middle;
                height: 20px;
                width: 20px;
            }
        }
    }
    .zc-cell {
        height: 10px;
        position: relative;
        .zc-name {
            position: absolute;
            top: 9px;
            left: 15px;
            font-size: 12px;
            color: #393939;
        }
        .zc-price {
            position: absolute;
            top: 9px;
            right: 15px;
            font-size: 12px;
            color: #EC5835;
            span {
                margin-left: 10px;
                color: #999;
            }
        }
    }
    .line-2 {
        height: 30px;
        width: 100%;
        position: relative;
        border-top: 1px solid #eee;
        .line-2-title {
            position: absolute;
            top: 0;
            height: 30px;
            line-height: 30px;
            left: 15px;
            font-size: 12px;
            color: #999;
        }
        .line-2-right {
            position: absolute;
            top: 0;
            height: 30px;
            line-height: 30px;
            right: 15px;
            font-size: 12px;
            color: #EC5835;
        }
    }
    .line-3 {
        height: 30px;
        width: 100%;
        position: relative;
        border-top: 1px solid #eee;
        .cancel {
            position: absolute;
            right: 15px;
            top: 0;
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            color: #999;
        }
        .appoint-at {
            position: absolute;
            left: 15px;
            top: 0;
            height: 30px;
            line-height: 30px;
            color: #999;
            font-size: 12px;
            img {
                vertical-align: middle;
                height: 12px;
                width: 12px;
                margin-right: 5px;
            }
        }
    }
}
.sumbit-order {
    height: 44px;
    width: 100%;
    line-height: 44px;
    background-color: #e2e2e2;
    text-align: center;
    font-size: 16px;
    color: #fff;
}
.active {
    background-color: #9EBC2B!important;
}
.user {
    position: relative;
    width: 100%;
    height: 110px;
    background-color: #fff;
    margin-bottom: 15px;
    .user-img {
        position: absolute;
        height: 60px;
        width: 60px;
        left: 15px;
        top: 10px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .user-name {
        position: absolute;
        left: 85px;
        top: 32px;
        font-size: 16px;
        color: #393939;
    }
    .user-tel {
        position: absolute;
        right: 15px;
        top: 34px;
        font-size: 12px;
        color: #3BA794;
    }
    .hr {
        height: 1px;
        width: 100%;
        position: absolute;
        top: 80px;
        left: 0;
        background-color: #eee;
    }
    .user-address {
        position: absolute;
        bottom: 8px;
        left: 15px;
        font-size: 12px;
        color: #393939;
    }
    .user-time {
        position: absolute;
        bottom: 8px;
        right: 15px;
        font-size: 12px;
        color: #393939;
        img {
            height: 10px;
            width: 10px;
            vertical-align: middle;
            margin-right: 10px;
        }
    }
}
</style>
