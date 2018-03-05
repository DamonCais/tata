<template>
  <div class="dict" v-if="show">
      <!-- <div class="fullDict" v-if="!mini">
        <span @click.stop="triggerMini(true)">下</span>
        <scroll class="wordmean" ref="fullScroll" :data="sentence">
            <wordmean />
        </scroll>
      </div> -->
      <div ref="miniDict" :class="mini?'miniDict':'fullDict'">
          <span  @click="triggerMini()">
            <i class="icon iconfont" :class="mini?'icon-jiantoushang':'icon-jiantouxia'"></i>
          </span>
        <div class="bgLayer"></div>
        <!-- <scroll :probeType="probeType" :listenScroll="listenScroll"
         @scroll="miniScroll" ref="miniScroll" class="wordmean" :data="sentence"> -->
            <wordmean ref="dict" :mini="mini"/>
        <!-- </scroll> -->
      </div>
  </div>
</template>

<script>
import {mapMutations,mapGetters} from "vuex"
import {getWordeMean} from "@/api/api"
import {addClass} from "@/api/dom"
import Wordmean from "@/components/Wordmean";
import Scroll from "@/base/scroll";
export default {
    computed:{
        ...mapGetters([
            'word',
            'music',
            'showDict'
        ]),
    },
    data(){
        return{
            symbols: [],
            exchange: {},
            suggestOn: false,
            sentence:[],
            mini:true,
            show:false,
            probeType:3,
            listenScroll:true,
        }
    },
    methods:{
        miniScroll(pos){
            if(-pos.y>20&&this.mini){
                this.triggerMini(false);
            }
        },
        triggerMini(){
            this.mini=!this.mini
        },
        scrollRefresh(){
            this.$refs.miniScroll.refresh();
        },
        ...mapMutations({
            setShow:'SHOW_DICT'
        })
    },
    watch:{
        showDict(){
            this.show=this.showDict;
        },
        word(){
            // this.scrollRefresh();
        }
    },
    components:{
        Wordmean,
        Scroll
    }
}
</script>

<style scoped lang="scss">
.dict {
  .fullDict {
    position: fixed;
    top:160px;
    width: 100%;
    bottom:0;
    animation:miniToFull 1.5s;
        // overflow: hidden;
    background: #eee;
    span{
            position: absolute;
            right: 0;
            top:0;
            font-size:20px;
      }
    .wordmean{
        padding:0 20px 0 0;
        height:100%;
        overflow: hidden;
      }
  }
  .miniDict{
      position:fixed;
      bottom:0;
      height:60px;
    //   overflow:hidden;
      animation:UpToBottom 1.2s;
      width:100%;
      background: #eee;
      span{
            position: absolute;
            right: 0;
            top:0;
            font-size:20px;
      }
      .wordmean{
        height:100%;
        padding:0 20px 0 0 ;
        // overflow: hidden;
      }
  }
}
.toDown{
    background:red;
}
.toUp{
    background: green;
}
@keyframes UpToBottom
{
	from {      
        height:400px;
      }
	to {
        height:60px;}
}
@keyframes miniToFull
{
	from {      
        top:600px;
      }
	to {top:160px;}
}
</style>
