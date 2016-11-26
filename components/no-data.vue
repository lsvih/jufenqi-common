<template>
<div class="no-data"><img src="../assets/images/no-data.png"><span>暂无订单</span></div>
</template>

<style scoped lang="less">
.no-data {
    position: relative;
    width: 100%;
    img {
        position: absolute;
        top: 220px;
        left: calc( ~"50% - 35.5px" );
        height: 71px;
        width: 71px;
    }
    span {
        display: block;
        position: absolute;
        width: 100%;
        height: 16px;
        font-size: 16px;
        line-height: 16px;
        left: 0;
        top: 307px;
        color: #DADADA;
        text-align: center;
    }
}
</style>
