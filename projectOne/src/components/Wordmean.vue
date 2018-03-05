<template>
      <div ref="wrapper">
        <section v-if="!translateResult&&symbols.length" class="baseInfo">
            <!-- 音标 -->            
            <p v-if="symbols[0].ph_am && !mini">
                <span :class="{row:symbols[0].ph_am.length>12}">
                    美音 [{{symbols[0].ph_am}}]
                    <i v-show="symbols[0].ph_am_mp3" class="icon iconfont icon-yinliang" @click="play" :data-music="symbols[0].ph_am_mp3"></i>;
                </span>
                <span :class="{row:symbols[0].ph_en.length>12}">
                    英音 [{{symbols[0].ph_en}}] 
                    <i v-show="symbols[0].ph_en_mp3" class="icon iconfont icon-yinliang" @click="play" :data-music="symbols[0].ph_en_mp3"></i>
                    <i v-show="symbols[0].ph_tts_mp3&&!symbols[0].ph_en_mp3" class="icon iconfont icon-yinliang" @click="play" :data-music="symbols[0].ph_tts_mp3"></i>;
                </span>
            </p>
            <p v-if="symbols[0].word_symbol">拼音 [{{symbols[0].word_symbol}}]</p>
            <!-- 词义 -->
            
            <p v-for="sy,index in symbols[0].parts">
                <span v-if="mini&&index===0 ">{{word}}</span>
                <span style="color:#999;">{{sy.part}}</span>
                {{sy.means.join('; ')}}
            </p>
            <!-- 变形 -->
            <div class="exchange" v-if="!mini">
                <span v-for="ex,wt in exchange" v-if="ex.length" 
                :class="{row:ex.join(' ').length>10||wt==='word_third'}">
                    <em>{{wt|wtype}}</em>: <em>{{ex.join(' ')}}</em> 
                </span>
            </div>
        </section>
        <!-- 例句 -->      
        <section class="sentence" v-if="!mini && !translateResult">
            <div v-for="se in sentence">
                <p>{{se.Network_en}}</p>
                <p>{{se.Network_cn}}</p>
                <span>
                    <i @click="play" v-show="se.tts_mp3" :data-music="se.tts_mp3" class="icon iconfont icon-yinliang"/>
                </span>
            </div>
        </section>
        <section class="guess" v-if="translateResult">
          猜测您查的词是:&nbsp; {{translateResult}}
        </section>
        <section style="text-align:center;padding:10px;" v-if="error">
          对不起没有查到~
        </section>
        <div class="miniDesc" v-if="!word&&mini">
          点击单词进行查询
          <p>(只能对单词长度超过4的单词进行查询)</p>
        </div>
        <div v-show="false">
          <audio controls ref="audio" :src="music"></audio>
        </div>
  </div>
</template>

<script>
import { getWordType } from "@/api/util";
import { getWordMean } from "@/api/api";
import { getData } from "@/api/dom";
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    mini: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      symbols: [],
      exchange: {},
      sentence: [],
      translateResult:'',
      error:0,
      music:'',
    };
  },
  methods: {
    getHeight(){
      let height = this.$refs.wrapper.clientHeight;
      return height;
    },
    ready(){
    },
    play(e) {
      let m =getData(e.target, "music");
      this.music=m;
      this._play();
    },
    _play(){
      const audio = this.$refs.audio;
      setTimeout(() => {
        if(audio.readyState){
          audio.play();
          return;
        }else{
          this._play();
        }
      }, 20);
    },
    _getWordMean(){
      setTimeout(() => {
        getWordMean(this.word).then(res => {
          // console.log(res);
          this.error=res.errno;
          if (res.errno){
              return;
          }
          if(res.baesInfo.translate_result){
            this.translateResult =res.baesInfo.translate_result;
          }else{
          this.translateResult ='';
          this.symbols = res.baesInfo.symbols;
          this.exchange = res.baesInfo.exchange ? res.baesInfo.exchange : {};
          this.sentence = res.sentence;
          }
        });
      }, 20);
    },
    refresh(){
      this._getWordMean();
    }
  },
  filters: {
    wtype(val) {
      if (!val) return "";
      return getWordType(val);
    }
  },
  watch: {
    word() {
      if (!this.word){
        return;
      }
      this.refresh();
    }
  },
  computed: {
    ...mapGetters(["word"])
  }
};
</script>

<style scoped lang="scss">
.baseInfo {
  width: 100%;
  padding: 10px 20px 0 30px;
  box-sizing: border-box;
  p {
    line-height: 25px;
    font-size: 16px;
    span {
      margin-right: 8px;
    }
    .row {
      display: block;
    }
  }
  .exchange {
    display: flex;
    flex-flow: row wrap;
    text-align: left;
    margin-top: 5px;
    border-top: 1px solid #aaa;
    padding-bottom: 5px;
    border-bottom: 1px solid #aaa;
    line-height: 20px;
    span {
      width: 50%;
      display: inline-block;
      color: #999;
      margin-top: 5px;
    }
    .row {
      width: 100%;
    }
  }
}
.sentence {
  width: 100%;
  padding: 10px 20px 0 30px;
  box-sizing: border-box;
  div {
    position: relative;
    padding-right: 30px;
    margin: 10px 0;
    p {
      line-height: 20px;
    }
    span {
      position: absolute;
      right: 2px;
      top: 3px;
    }
  }
}
.guess{
  padding: 10px 20px 0 30px;
}
.miniDesc{
  text-align: center;
  font-size:16px;
  padding:20px;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>