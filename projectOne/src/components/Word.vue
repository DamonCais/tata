<template>
  <div class="search">
    <search-box @query="onQueryChange" 
    @searchBlur="searchBlur"  @searchFocus="searchFocus" 
    ref="searchBox" :query="query"/>
    <div  class="sug">
      <suggest v-if="suggestOn" @query="onSelectWord" :query="query"/>
    </div>
    <scroll class="wordmean" :data="sentence">
      <wordmean :mini="false"/>
    </scroll>
  </div>
</template>

<script>
import searchBox from "@/base/search-box";
import { getSuggest, getWordeMean } from "@/api/api";
import Suggest from "@/components/Suggest";
import Wordmean from "@/components/Wordmean";
import Scroll from "@/base/scroll";
import {mapMutations,mapGetters} from "vuex"

export default {
  components: {
    searchBox
  },
  data() {
    return {
      items: [],
      query: "",
      symbols: [],
      exchange: {},
      suggestOn: false,
      sentence: []
    };
  },
  methods: {
    onQueryChange(word) {
      this.query = word;
    },
    onSelectWord(word) {
      this.query = word;
      this.$refs.searchBox.setQuery(word);
    },
    searchBlur() {
      this.suggestOn = false;
      setTimeout(() => {
        this.setWord(this.query);
      }, 20);
    },
    searchFocus() {
      this.suggestOn = true;
    },
    ...mapMutations({
        setWord:'SET_WORD'
    })
  },
  components: {
    Suggest,
    searchBox,
    Wordmean,
    Scroll
  }
};

//箭头函数中的this是全局的
//function中要用that
</script>

<style scoped lang="scss">
.search {
  position: fixed;
  width: 100%;
  top: 100px;
  bottom: 0;
  .sug {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
  }
  .wordmean {
    position: fixed;
    top:160px;
    width: 100%;
    bottom:0;
    overflow: hidden;
  }
}
</style>
