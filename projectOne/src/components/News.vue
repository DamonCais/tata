<template>
  <div class="news">
    <listview :data="items"/>
  </div>
</template>

<script>
import { getVoas } from "@/api/api.js";
import Listview from "@/base/listview"
import Loading from "@/base/loading"
export default {
  created() {
      setTimeout(() => {
        this._getVoas();
      }, 20);
  },
  mounted() {

  },
  data() {
    return {
      items: [],
      count: 0,
    };
  },
  methods: {
    _getVoas() {
        let list={};
      getVoas().then(res => {
        res.rows.forEach(element => {
            let date = element.date.substr(0,6);
            list[date]=list[date]?list[date]:[];
            list[date].push(element);
        });
        for(let k in list){
            let v = list[k]
            this.items.push({
                k,v
            })
        }
        this.items.sort((a,b)=>{
            return b.k-a.k;
        })
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
      Listview,
      Loading,
  }
};
</script>

<style scoped lang="scss">
.news{

    .loading{
        position: absolute;
        width:100%;
        top:50%;
        transform:translateY(-50%);
    }
    
}

</style>
