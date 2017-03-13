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
        height: 37px;
        position: relative;
        .line-1-left {
            position: absolute;
            left: 15px;
            top: 10px;
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
            background-color: #ff9736;
            border-radius: 2px;
        }
        .line-1-tel {
            position: absolute;
            top: 0;
            right: 15px;
            height: 37px;
            line-height: 37px;
            img {
                vertical-align: middle;
                height: 20px;
                width: 20px;
            }
        }
        .line-1-merchant {
            position: absolute;
            color: #ff9736;
            right: 15px;
            top: -23px;
            font-size: 12px;
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
    margin-top: 5px;
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
        color: #ff9736;
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
.setTopLine(@c: #C7C7C7) {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid @c;
    color: @c;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}
.weui_dialog_ft {
    position: relative;
    line-height: 42px;
    margin-top: 20px;
    font-size: 17px;
    display: flex;
    span {
        display: block;
        flex: 1;
        color: #888;
        text-decoration: none;
        &:active {
            background-color: #EEEEEE;
        }
    }
    &:after {
        content: " ";
        .setTopLine(#D5D5D6);
    }
    .primary {
        color: #ff9736;
    }
}
</style>

<template>
<header>
    <img src="../../assets/images/status.png">
    <!-- <div class="status" v-if='order.status == 2&&order.waitPaymentConfirm'>等待支付结果</div> -->
    <div class="status" v-else>{{Status.tk[order.status].name}}</div>
    <!-- <div class="btn" v-if="(order.status==1||order.status==2)&&Role === 'user'&&!order.waitPaymentConfirm" v-tap="cancelOrder()">取消{{order.status == 1?'预约':'订单'}}</div> -->
    <div class="time">{{getTime(order.createdAt)}}</div>
</header>
<div class="user" v-if="Role !== 'user'" :style="{height:order.order.orderTime?'110px':'80px'}">
    <div class="user-img"><img :src="order.order.customerImage||order.order.appt.customerImage"></div>
    <div class="user-name">{{order.order.appt.customerName}}</div>
    <div class="user-tel" onclick="location.href='tel:{{order.order.appt.customerMobile}}'">{{order.order.appt.customerMobile}}</div>
    <div class="hr"></div>
    <div class="user-time" v-if='order.orderTime'><img src="../../assets/images/time.png">{{getTime(order.order.orderTime)}}</div>
</div>
<div class="user" v-else :style="{height:order.order.orderTime?'110px':'80px'}">
    <div class="user-img"><img :src="order.order.appt.customerImage"></div>
    <div class="user-name">{{order.order.appt.customerName}}</div>
    <div class="user-tel" onclick="location.href='tel:{{order.order.appt.customerMobile}}'">{{order.order.appt.customerMobile}}</div>
    <div class="hr"></div>
    <div class="user-time" v-if='order.orderTime'><img src="../../assets/images/time.png">{{getTime(order.order.orderTime)}}</div>
</div>
<div>
    <div class="zc-list">
        <group title="交易信息">
            <j-person :img="clerkImg" :name="order.order.clerkName"></j-person>
            <div class="line-1">
                <div class="line-1-left">{{order.order.storeName}}</div>
                <!-- <div class="btn" v-if="order.status==6&&Role === 'user'" onclick="location.href='order-judge.html'">去评价</div> -->
            </div>
            <div class='line-1'>
                <div class="line-1-left" style="font-size:12px;">{{order.order.storeAddress}}</div>
                <div class="line-1-tel" v-tap="goto('tel:'+order.order.storePhone)"><img src="../../assets/images/tel.png"></div>
                <div class="line-1-merchant" v-tap="goto(merchantUrl)">查看品牌详情</div>
            </div>
            <cell class="zc-cell">
                <div class="zc-name">{{order.order.brandName}}</div>
            </cell>
            <div class="line-2" >
                <div class="line-2-title">正价交易金额</div>
                <div class="line-2-right">{{order.order.normalAmount|currency "￥" 2}}</div>
            </div>
            <div class="line-2" >
                <div class="line-2-title">特价交易金额</div>
                <div class="line-2-right">{{order.order.specialAmount|currency "￥" 2}}</div>
            </div>
            <div class="line-2" >
                <div class="line-2-title">交易总额</div>
                <div class="line-2-right">{{order.order.totalAmount|currency "￥" 2}}</div>
            </div>
        </group>
        <group title="退款金额">
            <div class="line-2" >
                <div class="line-2-title">正价退款金额</div>
                <div class="line-2-right">{{order.normalAmount|currency "￥" 2}}</div>
            </div>
            <div class="line-2" >
                <div class="line-2-title">特价退款金额</div>
                <div class="line-2-right">{{order.specialAmount|currency "￥" 2}}</div>
            </div>
            <div class="line-2" >
                <div class="line-2-title">退款总额</div>
                <div class="line-2-right">{{order.totalAmount|currency "￥" 2}}</div>
            </div>
        </group>
        <group title="退款说明">
            <div class="line-2" style="text-indent: 15px; height: 75px; font-size: 15px; padding-top: 5px;">退款原因：{{order.reason}}
            </div>

            <div class="line-2">
                <div class="line-2-title">欠款去向：将返回到你的支付账户中（
                    <span v-if="order.order.appt.payMethod === 1">全额支付</span>
                    <span v-if="order.order.appt.payMethod === 2">分期支付</span>
                    <span v-if="order.order.appt.payMethod === 3">微信支付</span>
                ）</div>
            </div>
            <div class="line-2">
                <div class="line-2-title">如有疑问，请拨打客服电话：<span v-tap="goto('tel:40000390808')" style="color: #3ba794;">400-0039-0808</span></div>
            </div>
        </group>
    </div>
    <div style="padding: 15px;" v-if="isClerk()">
        <x-button text="确认退款" v-tap="refundSuccessConfirm = true" type="primary"></x-button>
        <x-button text="拒绝退款" v-tap="refundFailConfirm = true" type="primary"></x-button>
    </div>
    <Dialog :show.sync="refusalRefundApply" >
        <p style="font-size: 18px;">拒绝退款</p>
        <group>
            <x-textarea :max="50" :value.sync="refusalRefund" placeholder="请输入您的退款理由" :rows="4" :height="110"></x-textarea>

            <div class="weui_dialog_ft">
                <span @click="refusalRefundApply = false" style="border-right: 1px solid #D5D5D6;">取消</span>
                <span :class="{'primary': isFilled()}" @click="isFilled()?refundFail():return">确认拒绝</span>
            </div>
        </group>
    </Dialog>
    <confirm :show.sync="refundSuccessConfirm" cancel-text="取消" confirm-text="确定退款" @on-cancel="refundSuccessConfirm = false" @on-confirm="refundSuccess()" title="退款确认">
        <p style="text-align: center">确定为此用户退款？</p>
    </confirm>
    <confirm :show.sync="refundFailConfirm" cancel-text="取消" confirm-text="确定拒绝" @on-cancel="refundFailConfirm = false" @on-confirm="refusalRefundApply = true" title="拒绝退款确认">
        <p style="text-align: center">确定拒绝此用户退款？</p>
    </confirm>
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
import PopupPicker from 'vux-components/popup-picker'
import Dialog from 'vux-components/dialog'
import XInput from 'vux-components/x-input'
import XTextarea from 'vux-components/x-textarea'
import XButton from 'vux-components/x-button'
import axios from 'axios'
import Status from '../../status'
import Confirm from 'vux-components/confirm'
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
            id: Lib.M.GetRequest().id,
            order: {},
            Status,
            refundSuccessConfirm: false,
            refundFailConfirm: false,
            refusalRefundApply: false,
            refusalRefund: '',
            finalConfirm: false
        }
    },
    ready() {
        axios.get(`${Lib.C.mOrderApi}materialRefundOrders/${this.id}`).then((res) => {
            this.order = res.data.data
        }).catch((res) => {
            alert("获取订单失败，请稍候再试QAQ")
        })
    },
    components: {
        Group,
        Cell,
        JPerson,
        Loading,
        PopupPicker,
        XButton,
        XInput,
        XTextarea,
        Dialog,
        Confirm
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
        },
        merchantUrl() {
          return `./brand-detail.html?id=${this.order.order.brandId}`
        }
    },
    methods: {
        isFilled() {
            return this.refusalRefund !== ''
        },
        goto(url) {
            location.href = url
        },
        refundFinalConfirm() {
            this.refundFailConfirm = true
            this.refusalRefundApply = false
        },
        refundSuccess() {
            axios.post(`${Lib.C.mOrderApi}materialRefundOrders/${this.id}/acceptRefund`).then((res) => {
                alert('退款已发起！')
                location.href = './refund.html'
            }).catch((res) => {
                alert('服务器连接失败，请稍后再试！')
            })
        },
        refundFail() {
            axios.post(`${Lib.C.mOrderApi}materialRefundOrders/${this.id}/refuseRefund`,{
                refusalReason: this.refusalRefund
            }).then((res) => {
                alert('已经拒绝该用户的退款申请')
                location.href = './refund.html'
            }).catch((res) => {
                alert('服务器连接失败，请稍后再试！')
            })
        },
        isClerk() {
            if (this.role === 'store-keeper' || this.role === 'clerk') {
                if (this.order.status === 1) {
                    return true
                }
                return false
            }
            return false
        }
    }
}
</script>