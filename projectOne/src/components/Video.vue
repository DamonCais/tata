<template>
  <div class="wrapper">
      <h3> <span @click="goBack"> &lt; </span> 听力 </h3>
      <div class="player">
          <i @click="triggerPlay" class="icon iconfont" :class="playing?'icon-zanting':'icon-bofang'"></i>
          <span class="time time-l">{{currentTime|format}}</span>
          <div class="progress-bar">
            <progress-bar @percentChange="ProgressBarChange" :percent="percent"/>
          </div>
          <span class="time time-r">{{duration|format}}</span>
      </div>
      <div v-show="false">
          <audio ref="audio" :src="mediaUrl" @play="ready" @canplay="canPlay"
          @ended="end" @error="error" @timeupdate="updateTime"></audio>
      </div>
      <div class="article">
        <scroll class="scroll" :data="content" ref="scroll" > 
            <div class="content"  @click="transWord">
                    <h1>{{title}}</h1>
                    <h5>{{inputtime|getTrueTime}}</h5>
                    <img @load="loadImage" :src="img" alt="">
                    <p v-for="c in content">
                        <span v-for="w in c.split('#')" :data-word="w">{{w}}</span>
                    </p>
            </div>
        </scroll>
      </div>
  </div>
</template>

<script>
import {getVideoDetail} from "@/api/api"
import {timestampToTime} from "@/api/util"
import {getData} from "@/api/dom"
import Scroll from "@/base/scroll"
import {mapMutations,mapGetters} from "vuex"
import progressBar from "@/base/progress-bar"
export default {
    mounted(){
       let detail= this.$route.params.detail;
       let id=detail.split('-')[0];
       let catid=detail.split('-')[1];
       this._getVideoDetail(id,catid);
       this.setShow(true);
       this.setWord('');
    },
    data(){
        return{
            title:'',
            img:'',
            inputtime:'',
            probeType:3,
            listenScroll:true,
            scrollY:0,
            flag:false,
            mediaUrl:'',
            playing:false,
            currentTime:0,
            duration:0,
            content:[],
        }
    },
    methods:{
        triggerPlay(){
            this.playing=!this.playing;
            const audio = this.$refs.audio;
            this.playing?audio.play():audio.pause();
        },
        scroll(pos){
            this.scrollY = pos.y;
        },
        ProgressBarChange(percent){
            this.$refs.audio.currentTime = this.duration*percent;
        },
        ready(){
            this.songReady=true;
        },
        canPlay(e){
           this.duration= e.target.duration;
        },
        error(){
            this.songReady=true;
        },
        end(){},
        updateTime(e){
            this.currentTime = e.target.currentTime;
        },

        play(e) {
            let music = getData(e.target, "music");
            this.setMusic(music);
        },
        transWord(e){
            let w = getData(e.target, "word");
            if(!w||!w.match(/[a-z]+/ig)||w.length<5)return;
            this.setWord(w);
            this.setShow(true);
        },
        _getVideoDetail(id,catid){
            getVideoDetail(id,catid).then((res)=>{
                if(!res.status)return;
                // this.content  = res.message.content;
                res.message.content.forEach(element => {
                    this.content.push(element.en.replace(/([a-z]+)/ig,"#$1#"));
                });
                this.title = res.message.title;
                this.img = res.message.pic;
                this.inputtime = res.message.onlineTime;
                this.mediaUrl = res.message.mediaUrl;
            })
        },
        loadImage() {
            this.$refs.scroll.refresh()
        },
        goBack(){
            this.setShow(false);
            this.setWord('');
            this.$router.go(-1);
        },
        ...mapMutations({
            setWord:'SET_WORD',
            setMusic:'SET_MUSIC',
            setShow:'SHOW_DICT'
        }),

    },
    watch:{
        scrollY(newY){
            this.$refs.layer.style['transform']=`translate3d(0,${newY}px,0)`
            this.$refs.layer.style['webkitTransform']=`translate3d(0,${newY}px,0)`
        }
    },
    components:{
        Scroll,
        progressBar,
    },
    filters:{
        getTrueTime(timestamp){
            return timestampToTime(timestamp);
        },
        format(time){
            time = time|0;
            let m =time/60 |0;
            let s = time%60;
            m = ('0'+m).slice(-2);
            s=('0'+s).slice(-2);
            return m+':'+s;
        }
    },
    computed:{
        percent(){
            if(!this.duration)return 0;
            else{
                return this.currentTime/this.duration;
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    position: fixed;
    width:100%;
    top:0;
    bottom:60px;
    background: #fff;
    h3{
        line-height: 44px;
        height: 44px;
        background-color: #43aef9;
        font-size: 18px;
        color: #fff;
        text-indent:20px;
    }
    .player{
        display:flex;
        align-items:center;
        width:100%;
        margin:0 auto;
        padding:5px 15px 5px;
        box-sizing: border-box;
        i{
            font-size:34px;
            color:#43aef9;
            margin-right: 5px;
        }
        .time{
            color:#000;
            font-size:10px;
            flex:0 0 36px;
            line-height: 36px;
            width:30px;
            &.time-l{
                text-align: left;
            }
            &.time-r{
                text-align: right;
            }
        }
        .progress-bar{
            margin:0 3px;
            flex:1;
        }
    }
    .article{
        background: #fff;
        position: absolute;
        width: 100%;
        top:100px;
        bottom:0;
        .scroll{
            height: 100%;
            overflow: hidden;
            .content{
                padding:20px 15px;
                box-sizing: border-box;
                h1{
                    font-size: 20px;
                    font-weight: 700;
                    color:#565656;
                    line-height: 1.5;
                }
                h5{
                    font-size: 13px;
                    color: #a8a8a8;
                    font-weight: 100;
                    margin:8px 0;
                }
                img{
                    width:100%;
                    margin:8px 0 0;
                }
                p{
                    font-size: 16px;
                    line-height: 22px;
                    color: #666;
                    margin:20px 0;
                }

            }
        }
    }
}
</style>
