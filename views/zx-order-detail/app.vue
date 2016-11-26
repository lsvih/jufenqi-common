<template>
<header>
    <img src="../../assets/images/status.png">
    <div class="status">{{zxStatusList[order.status].name}}</div>
    <div class="btn" v-if="order.status==1" v-tap="cancelOrder()">取消预约</div>

</header>
<j-person :img="order.manager.profileImage" :name="order.manager.nickname" :tel="order.manager.mobile"></j-person>
<j-person style="top:80px;" :img="order.projectManager.profileImage" :name="order.projectManager.nickname" :tel="order.projectManager.mobile"></j-person>
<div class="content">
    <group class="contact" style="margin-top:-1.17647059em;" v-if="order.status==1||order.status==2">
        <j-person type="zc" v-for="person in order.planList" :img="person.foreman.profileImage" :name="person.foreman.nickname" :tel="person.foreman.mobile">
    </group>
    <div class="select-plan" v-if="order.status==3">
        <div class="select-item-1" :class="{'active':selectPlan==0}" v-tap="selectPlan = 0">方案一</div>
        <div class="select-item-2" v-if="order.planList[1]" :class="{'active':selectPlan==1}" v-tap="selectPlan = 1">方案二</div>
    </div>

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
        <j-person :img="order.planList[selectPlan].foreman.profileImage" :name="order.planList[selectPlan].foreman.nickname" :tel="order.planList[selectPlan].foreman.mobile">
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
<div class="status-3-btn" v-if="order.status === 3">
    <div class="btn-left" v-tap="cancelOrder(true)"><img src="./change.png">更换工长</div>
    <div class="btn-right" v-tap="selectCurrentlyPlan()">选择当前方案</div>
</div>
<!-- <x-button slot="right" style="border-radius:0;background-color:rgb(158, 188, 43);color:#fff;margin:20px 0;width:100%" v-if="order.status==7" onclick="location.href='order-judge.html'">去评价</x-button> -->
<previewer :list="order.planList[0].images" v-ref:previewer :options="options"></previewer>
<previewer v-if="order.planList[1]" :list="order.planList[1].images" v-ref:previewer :options="options"></previewer>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XButton from 'vux-components/x-button'
import Scroller from 'vux-components/scroller'
import XImg from 'vux-components/x-img'
import Previewer from 'vux-components/previewer'
import JPersonInfoBlock from '../../components/j-person'
import axios from 'axios'
try {
    axios.defaults.headers.common['x-user-token'] = JSON.parse(localStorage.getItem("user")).token
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
            zxStatusList: [{
                status: 0,
                name: "订单已删除"
            }, {
                status: 1,
                name: "已预约"
            }, {
                status: 2,
                name: "已上门"
            }, {
                status: 3,
                name: "待选方案"
            }, {
                status: 4,
                name: "待支付"
            }, {
                status: 5,
                name: "待施工"
            }, {
                status: 6,
                name: "施工中"
            }, {
                status: 7,
                name: "已完工"
            }, {
                status: 8,
                name: "订单已取消"
            }],
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
        }).catch((res) => {
            alert("获取订单失败，请稍候再试QAQ")
        })
    },
    components: {
        Group,
        Cell,
        XButton,
        Scroller,
        XImg,
        Previewer,
        JPerson
    },
    props: {
        role: {
            type: String,
            default: 'user'
        }
    },
    methods: {
        getScreenWidth() {
            return document.body.clientWidth
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
<style scoped lang="less">@import '~zx-order-detail.less';

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
</style>
