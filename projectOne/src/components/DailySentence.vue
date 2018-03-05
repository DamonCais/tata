<template>
  <div class="wrapper">
      <h3> <span @click="goBack"> &lt; </span> 每日一句 </h3>
      <div class="article">
        <scroll class="scroll" :data="tags" ref="scroll" 
        > 
            <div class="content"  @click="transWord">
                    <img @load="loadImage" :src="img" alt="">
                    <h5>
                        <span v-for="w in content.split('#')" :data-word="w">{{w}}</span>
                    </h5>
                    <p>
                        {{note}}
                    </p>
                    <div class="line"></div>
            </div>
        </scroll>
      </div>
  </div>
</template>

<script>
import {getDailySentence} from "@/api/api"
import {timestampToTime} from "@/api/util"
import {getData} from "@/api/dom"
import Scroll from "@/base/scroll"
import {mapMutations,mapGetters} from "vuex"
export default {
    mounted(){
        let sid= this.$route.params.sid;
       this._getDailySentence(sid);
       this.setShow(true);
       this.setWord('');
    },
    data(){
        return{
            title:'',
            img:'',
            content:'',
            translation:'',
            music:'',
            tags:[],
            note:'',
            word:'',
            probeType:3,
            listenScroll:true,
            scrollY:0,
            flag:false
        }
    },
    methods:{
        scroll(pos){
            this.scrollY = pos.y;
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
        _getDailySentence(sid){
            getDailySentence(sid).then((res)=>{
                if(res.errno)return;
                // this.content  = res.message.content;
                this.content  = res.content.replace(/([a-z]+)/ig,"#$1#");
                this.img = res.picture;
                this.music =res.tts;
                this.translation=res.translation;
                this.note = res.note;
                this.tags=res.tags;
                this.title = res.title;
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
        })
    },
    watch:{
        scrollY(newY){
            this.$refs.layer.style['transform']=`translate3d(0,${newY}px,0)`
            this.$refs.layer.style['webkitTransform']=`translate3d(0,${newY}px,0)`
        }
    },
    components:{
        Scroll,
    },
    filters:{
        getTrueTime(timestamp){
            return timestampToTime(timestamp);
        }
    },
    computed:{
        ...mapGetters([
            'showDict',
        ])
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
    .article{
        background: #fff;
        position: absolute;
        width: 100%;
        top:44px;
        bottom:0;
        .scroll{
            height: 100%;
            overflow: hidden;
            .content{
                min-height:120%;
                box-sizing: border-box;
                h1{
                    font-size: 20px;
                    font-weight: 700;
                    color:#565656;
                    line-height: 1.5;
                }
                h5{
                    font-size: 18px;
                    line-height: 22px;
                    padding:0 20px;
                    color:#333;
                }
                img{
                    width:100%;
                    margin:0 0 8px 0;
                }
                p{
                    font-size: 16px;
                    line-height: 22px;
                    color: #888;
                    padding:5px 20px;
                }
                .line{
                    margin:0 20px;
                    border-bottom: 1px solid #aaa;
                }

            }
        }
    }
}
</style>
