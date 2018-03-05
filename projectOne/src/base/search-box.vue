<template>
  <div class="search-box">
      <input ref="search" v-model="query" type="text" class="box" :placeholder="placeholder" 
      @blur="onBlur" @focus="onFocus" @keyup.enter="onEnter">
      <span @click="clear">X</span>
  </div>
</template>

<script>
import {debounce} from "@/api/util.js"
export default {
    props:{
        placeholder:{
            type:String,
            default:'单词搜索'
        },
    },
    data(){
        return{
            query:'',
        }
    },
    methods:{
        clear(){
            this.query='';
        },
        setQuery(query){
            this.query=query;
        },
        onBlur(){
            this.$emit('searchBlur');
        },
        onEnter(){
            this.$refs.search.blur();
        },
        onFocus(){
            this.$emit('searchFocus');
        }
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
}
</script>

<style scope lang="scss">
.search-box{
    display: flex;
    box-sizing: border-box;
    width:100%;
    height:40px;
    position: relative;
    margin:10px 0;
    .box{
        flex:1;
        margin:0 20px;
        font-size: 16px;
        line-height: 40px;
        padding:0 25px;
        border:none;
        border-radius: 5px;
        background: #fff;
        &::placeholder{
            color:#999;
        }

    }
    span{
        position: absolute;
        right:30px;
        font-size:20px;
        height:40px;
        line-height: 40px;
    }
}

</style>
