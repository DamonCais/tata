<template>
  <div class="suggest">
      <ul class="suggest-list">
          <li v-for="item in items" :data-word="item.key" @click="onSelect">
            {{item.key}}
            <span v-if="item.means[0]">
              &nbsp;&nbsp;{{item.means[0].part}}&nbsp;&nbsp;{{item.means[0].means|ArrayToString}}
            </span>
          </li>
      </ul>
      <div class="others"></div>
  </div>
</template>

<script>
import {getSuggest} from "@/api/api"
import {getData} from "@/api/dom"
export default {
  props: {
    query: {
      type: String,
      default: ""
    }
  },
  data(){
      return{
          items:[],
      }
  },
  watch: {
    query() {
      this.onQueryChange();
    }
  },
  methods: {
    onSelect(e){
      let word = getData(e.currentTarget, "word");
      this.$emit('query', word);
    },
    onQueryChange() {
      this.items.length = 0;
      if(!this.query)return;
      getSuggest(this.query).then(res => {
        if (res.message) {
          this.items = res.message;
        }
      });
    }
  },
  filters:{
    ArrayToString(val){
      if(!val)return '';
      return val.join(' ');
    }
  }
};
</script>

<style scoped lang="scss">
.suggest{
  position: relative;
  width:100%;
  height:100%;
  overflow: hidden;
  z-index: 100;
  .suggest-list{
    background: #fff;
    li{
      height:30px;
      line-height: 30px;
      padding:0 20px 0 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span{
        color:#666;
        font-size:14px;
      }
    }
  }
  .others{
    width: 100%;
    height: 100%;
    background: #ccc;
    opacity: 0.6;
  }
}

</style>
