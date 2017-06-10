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
<style lang="less">
@import 'zx-order-detail.less';

.status-3-btn {
    position: relative;
    width: calc(~"100% - 30px");
    margin-left: 15px;
    border-radius: 2px;
    height: 44px;
    margin-top: 10px;
    background-color: rgb(158, 188, 43);
    color: #fff;
    line-height: 44px;
    text-align: center;
}
</style>

<template>
<header  v-if="render">
    <div class="customer">
        <div class="customer-image"><img :src="order.customerImage"></div>
        <div class="customer-name">{{order.customerName}}</div>
        <div class="customer-tel" v-tap="goto('tel:'+order.customerMobile)">{{order.customerMobile}}</div>
    </div>
    <div class="house">
        <div class="location">{{order.orderLocation}}</div>
        <div class="address">{{order.orderAddress}}</div>
        <div class="appoint-at"><img src="../../assets/images/time.png">{{getTime(order.orderTime)}}</div>
    </div>
</header>
<div class="content" v-if="render">
    <div class="status">
        <div class="order-status"><img src="../../assets/images/status.png">{{Status.zx[order.status].name}}</div>
        <div class="order-time">{{getTime(order.createdAt)}}</div>
    </div>
    <group class="contact" style="margin-top:-1.17647059em;">
        <j-person type="0" :img="managerImg" :name="order.manager.nickname" :tel="order.manager.mobile"></j-person>
        <j-person type="0" :img="projectManagerImg" :name="order.projectManager.nickname" :tel="order.projectManager.mobile"></j-person>
        <j-person v-if="order.status == 1" type="0" :img="foremanImg" :name="order.plan.foreman.nickname" :tel="order.plan.foreman.mobile"></j-person>
    </group>

    <group title="设计方案" v-if="order.plan.status>=2&&order.plan.images.length">
        <div class="module-item">
            <scroller lock-y scrollbar-x :height=".8*getScreenWidth()*.63+20+'px'" v-ref:plan>
                <div class="worker-product-list" :style="{width:order.plan.images.length*(.8*getScreenWidth()+10)+  'px',height:.8*getScreenWidth()*.63+'px'}">
                    <div class="worker-product-item" v-for="preview in order.plan.images" :style="{width: getScreenWidth()*.8 + 'px',height:.8*getScreenWidth()*.63+'px'}">
                        <x-img class="product-img" :scroller="$refs.plan" :src="imgUrl + preview" v-tap="$refs.previewer.show($index)"></x-img>
                    </div>
                </div>
            </scroller>
        </div>
    </group>
    <div v-if="order.plan.status>=2&&order.plan.status<=6">
        <group title="方案说明" v-if='order.plan.description'>
            <article>{{order.plan.description}}</article>
        </group>
        <group>
            <div class="zx-line-4">
                <div class="zx-line-4-name">施工报价</div>
                <div class="zx-line-4-right" v-if='order.plan.price'>{{order.plan.price|currency "" 2}}</div>
                <div class="zx-line-4-right" v-else>等待报价</div>
            </div>
        </group>

    </div>

            <!-- before v-if="!order.plan.updated&&order.plan.status === 2" -->
    <div class="status-3-btn" v-tap="modify()" v-if="order.plan.status===3 || order.plan.status === 2">
        <div class="btn-right">编辑</div>
    </div>
</div>
<!-- <x-button slot="right" style="border-radius:0;background-color:rgb(158, 188, 43);color:#fff;margin:20px 0;width:100%" v-if="order.status==7" onclick="location.href='order-judge.html'">去评价</x-button> -->
<previewer :list="previewImg" v-ref:previewer :options="options"></previewer>
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
        location.href = `./wxAuth.html?url=${encodeURIComponent(location.href)}`
    }
    axios.defaults.headers.common['Authorization'] = `${JSON.parse(localStorage.getItem("user")).tokenType} ${JSON.parse(localStorage.getItem("user")).token}`
} catch (e) {
    localStorage.clear()
    window.location.href = `./wxAuth.html?url=index.html`
}
export default {
    data() {
        return {
            order: {},
            render: true,
            imgUrl: Lib.C.imgUrl,
            Status,
            projectManagerImg,
            managerImg,
            foremanImg,
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
            },
            previewImg:[]
        }
    },
    ready() {
        axios.get(`${Lib.C.orderApi}decorationOrders/${Lib.M.GetRequest().orderNo}/byForeman`).then((res) => {
            this.order = res.data.data
            this.order.plan.images.forEach((img) => {
                this.previewImg.push({
                    src: this.imgUrl + img,
                    w: 500,
                    h: 281
                })
            })
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
    methods: {
        getScreenWidth() {
            return document.body.clientWidth
        },
        modify() {
            // window.location.href = `./modify.html?planId=${Lib.M.GetRequest().planId}`
            window.location.href = `./modify.html?orderNo=${Lib.M.GetRequest().orderNo}`
        },
        goto(url) {
            location.href = url
        },
        getTime(timeStamp) {
            const d = new Date(timeStamp * 1000);
            const Y = `${d.getFullYear()}-`;
            const M = `${d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}-`;
            const D = (d.getDate() < 10 ? `0${d.getDate()}` : d.getDate());
            return Y + M + D
        },
    }
}
</script>
