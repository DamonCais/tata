<template>
      <div>
        <section v-if="symbols.length" class="baseInfo">
            <!-- 音标 -->            
            <p v-if="symbols[0].ph_am && !mini">
                <span :class="{row:symbols[0].ph_am.length>12}">
                    美音 [{{symbols[0].ph_am}}]
                    <i class="icon iconfont icon-tushu" @click="play" :data-music="symbols[0].ph_am_mp3"></i>;
                </span>
                <span :class="{row:symbols[0].ph_en.length>12}">
                    英音 [{{symbols[0].ph_en}}] 
                    <i class="icon iconfont icon-tushu" @click="play" :data-music="symbols[0].ph_en_mp3"></i>
                </span>
            </p>
            <p v-if="symbols[0].word_symbol">拼音 [{{symbols[0].word_symbol}}]</p>
            <!-- 词义 -->
            <p v-for="sy in symbols[0].parts">
              
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
        <section class="sentence" v-if="!mini">
            <div v-for="se in sentence">
                <p>{{se.Network_en}}</p>
                <p>{{se.Network_cn}}</p>
                <span>
                    <i :data-music="se.tts_mp3" class="icon iconfont icon-tushu"/>
                </span>
            </div>
        </section>
  </div>

</template>

<script>
import { getWordType } from "@/api/util";
import { getData } from "@/api/dom";
export default {
  props: {
    symbols: {
      type: Array,
      default: []
    },
    exchange: {
      type: Object,
      default: {}
    },
    sentence: {
      type: Array,
      default: []
    },
    mini:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    play(e) {
      let music = getData(e.target, "music");
    }
  },
  filters: {
    wtype(val) {
      if (!val) return "";
      return getWordType(val);
    }
  }
};
//auth_sentence 权威例句;collins 柯林斯英汉双解; ee_mean 英英双解
//exchanges 变形 jushi 句式用法 sentence 双语例句
//sameAnalysis 同义词
//baseInfo.exchange word_adj word_adv
//adj形容词 adv副词 conn done过去分词 er比较级 est最高级
// ing现在分词 noun名词 past过去式 pl复数 prep短语 third第三人称单数 verb动词
// console.log(symbols[sy].parts[0].means.join(' '));//means
// console.log(symbols[sy].parts[0].part);//词性
// console.log(symbols[sy].ph_am); //美音
// console.log(symbols[sy].ph_am_mp3); //美音mp3
// console.log(symbols[sy].ph_en); //英音
// console.log(symbols[sy].ph_en_mp3); //英音mp3
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
</style>
