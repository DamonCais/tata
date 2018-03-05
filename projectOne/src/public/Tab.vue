<template>
  <div class = "tab">
    <!-- <router-link tag="div" class="tab-item" to="/home">
        <span class="tab-link"><i class="icon iconfont icon-shouye"></i>首页</span>
    </router-link> -->
    <router-link tag="div" class="tab-item" to="/listen">
        <span class="tab-link"><i class="icon iconfont icon-kefu"></i>英语听力</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/read">
        <span class="tab-link"><i class="icon iconfont icon-dingdan"></i>英语悦读</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/word">
        <span class="tab-link"><i class="icon iconfont icon-sousuo1"></i>查词翻译</span>
    </router-link>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.tab{
    display: flex;
    height: 60px;
    line-height: 25px;
    text-align: center;
    padding-top:30px;
    box-sizing: border-box;
    .tab-item{
        flex:1;
        .tab-link{
            padding-bottom:3px;
            position: relative;
            i{
                font-size:22px;
                position: absolute;
                top:-28px;
                left:0;
                right:0;
            }
        }
        &.router-link-active{
            .tab-link{
                color:#43aef9;
                border-bottom:2px solid #43aef9;
            }
        }
    }
}

</style>
