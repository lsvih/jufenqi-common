<template>
<header>
  <img src="../../assets/images/status.png">
  <div class="status">{{Status.zx[order.plan.status].name}}</div>
</header>
<j-person :img="order.manager.profileImage" :name="order.manager.nickname" :tel="order.manager.mobile"></j-person>
<j-person  style="top:80px;" :img="order.projectManager.profileImage" :name="order.projectManager.nickname" :tel="order.projectManager.mobile"></j-person>
<div class="content">
  <group class="contact" style="margin-top:-1.17647059em;" v-if="order.plan.status==1||order.plan.status==2">
    <j-person type="1" :img="order.plan.foreman.profileImage" :name="order.plan.foreman.nickname" :tel="order.plan.foreman.mobile">
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
import JPerson from '../../components/j-person'
import axios from 'axios'
import Status from '../../status'
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
      Status,
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
    Previewer,
    JPerson
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
