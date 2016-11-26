<template>
<header>
  <img src="../../assets/images/status.png">
  <div class="status">{{zxStatusList[order.plan.status].name}}</div>
</header>
<div class="butler">
  <div class="zx-butler-img"><img :src="order.manager.profileImage"></div>
  <div class="zx-butler-name">{{order.manager.nickname}}</div>
  <div class="zx-butler-tel" onclick="location.href='tel:{{order.manager.mobile}}'"><img src="../../assets/images/tel.png"></div>
</div>
<div class="butler" style="top:80px;">
  <div class="zx-butler-img"><img :src="order.projectManager.profileImage"></div>
  <div class="zx-butler-name">{{order.projectManager.nickname}}</div>
  <div class="zx-butler-tel" onclick="location.href='tel:{{order.projectManager.mobile}}'"><img src="../../assets/images/tel.png"></div>
</div>
<div class="content">
  <group class="contact" style="margin-top:-1.17647059em;" v-if="order.plan.status==1||order.plan.status==2">
    <div class="zc-line-3">
      <div class="zc-butler-img"><img :src="order.plan.foreman.profileImage"></div>
      <div class="zc-butler-name">{{order.plan.foreman.nickname}}</div>
      <div class="zc-butler-tel" onclick="location.href='tel:{{order.plan.foreman.mobile}}'"><img src="../../assets/images/tel.png"></div>
    </div>
</div>
</group>

<group title="设计方案" v-if="order.plan.status>=2">
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
  <group title="方案说明">
    <article>{{order.plan.description}}</article>
  </group>
  <group>
    <div class="zx-line-4">
      <div class="zx-line-4-name">施工报价</div>
      <div class="zx-line-4-right">{{order.plan.price|currency "" 2}}</div>
    </div>
  </group>

</div>
</div>
<div class="status-3-btn" v-if="order.plan.status === 2&&(!order.plan.updated)" v-tap="modify()">
  <div class="btn-right">编辑</div>
</div>
<!-- <x-button slot="right" style="border-radius:0;background-color:rgb(158, 188, 43);color:#fff;margin:20px 0;width:100%" v-if="order.status==7" onclick="location.href='order-judge.html'">去评价</x-button> -->
<previewer :list="order.plan.images" v-ref:previewer :options="options"></previewer>
</template>

<script>
import Lib from 'assets/Lib.js'
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
import XButton from 'vux-components/x-button'
import Scroller from 'vux-components/scroller'
import XImg from 'vux-components/x-img'
import Previewer from 'vux-components/previewer'
import axios from 'axios'
try{
  axios.defaults.headers.common['x-user-token'] = JSON.parse(localStorage.getItem("user")).token
}catch(e){
  localStorage.clear()
  window.location.href = `./wxAuth.html?url=index.html`
}
export default {
  data() {
    return {
      order: {},
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
    axios.get(`${Lib.C.orderApi}decorationPlans/${Lib.M.GetRequest().planId}`).then((res) => {
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
    Previewer
  },
  methods: {
    getScreenWidth() {
      return document.body.clientWidth
    },
    modify(){
      window.location.href = `./modify.html?planId=${Lib.M.GetRequest().planId}`
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
