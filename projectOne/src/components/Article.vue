<template>
  <div class="wrapper">
      <h3> <span @click="goBack"> &lt; </span> 双语资讯 </h3>
      <div class="article">
        <scroll class="scroll" :data="content" ref="scroll" 
        > 
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
import {getArticleContent,getWordeMean} from "@/api/api"
import {timestampToTime} from "@/api/util"
import {getData} from "@/api/dom"
import Scroll from "@/base/scroll"
import {mapMutations,mapGetters} from "vuex"
export default {
    mounted(){
       let id= this.$route.params.id;
       this._getArticleContent(id);
       this.setShow(true);
       this.setWord('');
    },
    data(){
        return{
            title:'',
            img:'',
            inputtime:'',
            content:[],
            symbols:[],
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
        _getArticleContent(id){
            getArticleContent(id).then((res)=>{
                if(!res.status)return;
                // this.content  = res.message.content;
                res.message.content.forEach(element => {
                    this.content.push(element.replace(/([a-z]+)/ig,"#$1#"));
                });
                this.title = res.message.title;
                this.img = res.message.img;
                this.inputtime = res.message.inputtime;
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
