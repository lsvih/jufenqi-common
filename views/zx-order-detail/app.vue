<template>
<header>
    <div class="status">
        <div class="order-status"><img src="../../assets/images/status.png">{{Status.zx[order.status].name}}</div>
        <div class="order-time">{{getTime(order.createdAt)}}</div>
    </div>
    <div class="user-customer">
        <div class="user-customer-image"><img :src="order.customerImage"></div>
        <div class="user-customer-name">{{order.customerName}}</div>
        <div class="user-customer-tel" v-tap="goto('tel:'+order.customerMobile)">{{order.customerMobile}}</div>
    </div>
    <div class="house">
        <div class="location">{{order.orderLocation}}</div>
        <div class="address">{{order.orderAddress}}</div>
        <div class="appoint-at"><img src="../../assets/images/time.png">{{getTime(order.orderTime)}}</div>
    </div>
</header>
<div class="content">
    <group class="contact" style="margin-top:-1.17647059em;">
        <j-person type="0" :img="managerImg" :name="order.manager.nickname" :tel="order.manager.mobile"></j-person>
        <j-person type="0" :img="projectManagerImg" :name="order.projectManager.nickname" :tel="order.projectManager.mobile"></j-person>
        <div v-if="order.status == 1">
            <j-person v-for="plan in order.planList" type="0" :img="foremanImg" :name="plan.foreman.nickname" :tel="plan.foreman.mobile"></j-person>
        </div>
    </group>

    <group title="设计方案" v-if="order.status>=3">
        <div class="module-item">
            <scroller lock-y scrollbar-x :height=".8*getScreenWidth()*.63+20+'px'" v-ref:plan>
                <div class="worker-product-list" :style="{width:order.planList[selectPlan].images.length*(.8*getScreenWidth()+10)+  'px',height:.8*getScreenWidth()*.63+'px'}">
                    <div class="worker-product-item" v-for="preview in order.planList[selectPlan].images" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
                        <x-img class="product-img" :scroller="$refs.plan" :src="imgUrl + preview" v-tap="$refs.previewer.show($index)"></x-img>
                    </div>
                </div>
            </scroller>
        </div>
    </group>
    <div class="contact" v-if="order.status>=3">
        <j-person v-for="plan in order.planList" v-if="order.status == 1" type="0" :img="foremanImg" :name="plan.foreman.nickname" :tel="plan.foreman.mobile"></j-person>
    </div>
    <div v-if="order.status>=3&&order.status<=6">
        <group title="方案说明">
            <article>{{order.planList[selectPlan].description}}</article>
        </group>
        <group>
            <div class="zx-line-4">
                <div class="zx-line-4-name">施工报价</div>
                <div class="zx-line-4-right">{{order.planList[selectPlan].price|currency "" 2}}</div>
            </div>
        </group>
    </div>
</div>
</div>
<div class="status-3-btn" v-if="order.status === 3&&Role === 'user'">
    <div class="btn-left" v-tap="cancelOrder(true)"><img src="./change.png">更换工长</div>
    <div class="btn-right" v-tap="selectCurrentlyPlan()">选择当前方案</div>
</div>
<div v-if="Role === 'manager'&&order.status!=2">
    <div class="btn" v-if="order.status == 1" v-tap="visit()">已上门</div>
    <div class="btn" v-if="order.status == 4" v-tap="pay()">已支付</div>
    <div class="btn" v-if="order.status == 5&&order.payed" v-tap="start()">已开工</div>
    <div class="btn" v-if="order.status == 6" v-tap="complete()">已完工</div>
</div>
<!-- <x-button slot="right" style="border-radius:0;background-color:rgb(158, 188, 43);color:#fff;margin:20px 0;width:100%" v-if="order.status==7" onclick="location.href='order-judge.html'">去评价</x-button> -->
<previewer :list="order.planList[0].images" v-ref:previewer :options="options"></previewer>
<previewer v-if="order.planList.length" :list="order.planList[1].images" v-ref:previewer :options="options"></previewer>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XButton from 'vux-components/x-button'
import Scroller from 'vux-components/scroller'
import XImg from 'vux-components/x-img'
import Previewer from 'vux-components/previewer'
import JPerson from '../../components/j-person'
import projectManagerImg from '../../assets/images/role/project-manager.png'
import foremanImg from '../../assets/images/role/foreman.png'
import managerImg from '../../assets/images/role/manager.png'
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
            order: {},
            selectPlan: 0,
            imgUrl: Lib.C.imgUrl,
            Status,
            foremanImg,
            managerImg,
            projectManagerImg,
            options: {
                getThumbBoundsFn(index) {
                    let thumbnail = document.querySelectorAll('.product-img')[index]
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    let rect = thumbnail.getBoundingClientRect()
                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    }
                }
            }
        }
    },
    ready() {
        axios.get(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}`).then((res) => {
            this.order = res.data.data
        }).catch((err) => {
            alert("获取订单失败，请稍候再试QAQ")
            throw err
        })
    },
    components: {
        Group,
        Cell,
        XButton,
        Scroller,
        XImg,
        Previewer,
        JPerson,
        foremanImg,
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
        getScreenWidth() {
            return document.body.clientWidth
        },
        getTime(timeStamp) {
            var d = new Date(timeStamp * 1000);
            var Y = d.getFullYear() + '-';
            var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
            var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
            return Y + M + D
        },
        cancelOrder(isJump) {
            axios.post(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}/confirmCancel`).then((res) => {
                if (isJump) {
                    window.location.href = "./worker-list.html"
                } else {
                    alert("取消订单成功")
                    window.location.href = './order-list.html'
                }
            }).catch((res) => {
                alert("取消订单失败，请稍候再试QAQ")
            })
        },
        selectCurrentlyPlan() {
            let planId = this.order.planList[this.selectPlan].id
            axios.post(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}/confirmSelect?planId=${planId}`).then((res) => {
                alert("订单已更新！")
                location.reload()
            }).catch((res) => {
                alert("更新订单失败，请稍后重试")
            })
        },
        visit() {
            axios.post(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}/confirmVisit`).then((res) => {
                alert("订单已更新！")
                location.reload()
            }).catch((res) => {
                alert("更新订单失败，请稍后重试")
            })
        },
        start() {
            axios.post(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}/confirmStart`).then((res) => {
                alert("订单已更新！")
                location.reload()
            }).catch((res) => {
                alert("更新订单失败，请稍后重试")
            })
        },
        pay() {
            axios.post(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}/confirmPay`).then((res) => {
                alert("订单已更新！")
                location.reload()
            }).catch((res) => {
                alert("更新订单失败，请稍后重试")
            })
        },
        complete() {
            axios.post(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}/confirmComplete`).then((res) => {
                alert("订单已更新！")
                location.reload()
            }).catch((res) => {
                alert("更新订单失败，请稍后重试")
            })
        }
    }
}
</script>

<style>
body {
    background-color: #eee;
}

article {
    padding: 15px;
    font-size: 12px;
    color: #393939;
}
</style>
<style scoped lang="less">
@import 'zx-order-detail.less';

.status-3-btn {
    position: relative;
    width: 100%;
    height: 44px;
    background-color: rgb(158, 188, 43);
    color: #fff;
    .btn-left {
        position: absolute;
        height: 100%;
        width: 35%;
        background-color: #fff;
        line-height: 44px;
        text-align: center;
        color: #393939;
        left: 0;
        img {
            vertical-align: middle;
            margin-right: 6px;
            height: 15px;
            width: 16px;
        }
    }
    .btn-right {
        position: absolute;
        height: 100%;
        width: 65%;
        line-height: 44px;
        text-align: center;
        right: 0;
    }
}
.btn {
    position: relative;
    height: 44px;
    width: calc(~"100% - 30px");
    margin: 50px 15px 0;
    line-height: 44px;
    text-align: center;
    background-color: rgb(158,188,43);
    border-radius: 5px;
    color: #fff;
}
.user-customer-image {
    height: 60px;
    width: 60px;
    position: absolute;
    left: 15px;
    top: 10px;

    img {
        height: 100%;
        width: 100%;
    }
}
</style>
