<template>
  <div class="news">
      <scroll :data="items" class="news-content">
      <ul class ="newslist" ref = "newslist">
          <li v-for="item,index in items">
              <h2>{{item.title}}</h2>
              <span>{{ item.date | formatdate }}</span>
          </li>
      </ul>
      <div class="loading" v-show="!items.length">
          <loading/>
      </div>
      </scroll>
  </div>
</template>

<script>
import { getVoas } from "@/api/api.js";
import Scroll from '@/base/scroll';
import Loading from "@/base/loading"
export default {
  created() {
      setTimeout(() => {
              this._getVoas();
      }, 1000);

  },
  mounted() {

  },
  data() {
    return {
      items: [],
      count: 0
    };
  },
  methods: {
    _getVoas() {
      getVoas().then(res => {
        this.items = res.rows;
        this.count = res.count;
      });
    }
  },
  filters:{
      formatdate(val){
          if(!val)return;
          return val.substr(0,4)+'-'+val.substr(4,2)+'-'+val.substr(6,2);
      }
  },
  components:{
      Scroll,
      Loading,
  }
};
</script>

<style scoped lang="scss">
.news{
    position: fixed;
    width:100%;
    top:100px;
    bottom:0;
    .news-content{
        height:100%;
        overflow: hidden;
        .newslist{
            li{
                width:100%;
                position: relative;
                height: 30px;
                line-height: 30px;

                h2{
                    font-size: 16px;
                    padding:0 20px;
                    width:80%;
                    box-sizing: border-box;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                    overflow: hidden;
                }
                span{
                    text-align: right;
                    position: absolute;
                    top:0;
                    right:0;
                    bottom:0;
                    display: block;
                    float: right;
                    width:20%;
                    font-size: 12px;
                    color:#aaa;
                    padding-right: 10px;
                }
            }
        }
        .loading{
            position: absolute;
            width:100%;
            top:50%;
            transform:translateY(-50%);
        }
    }
}

</style>
