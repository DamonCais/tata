<template>
<div class="news">
    <p>{{currentYear}}</p>
    <div class="year" @touchstart.stop.prevent="onShortcutTouchStart"
     @touchmove.stop.prevent="onShortcutTouchMove"
     >
        <ul>
            <li v-for="y,index in shortcutList" :data-index="index" 
            :class="{'current':currentYear==index}"
            >{{y}}</li>
        </ul>
    </div>
  <scroll class="listview" :data="data" ref="listview"
   :listenScroll="listenScroll" @scroll="scroll"
   :probeType="probeType">
      <ul>
          <li v-for="items in data" class="list-group" ref="listGroup">
              <h2 class="list-group-title">{{items.k}}</h2>
                <ul>
                    <li v-for="item in items.v" class="list-group-item">
                        <span>{{item.title}}</span>
                    </li>
                </ul>
          </li>
      </ul>
    <div class="list-fixed" :style="{'top':-fixed+'px'}" v-show="fixedTitle">
        <h2 class="fixed-title">{{fixedTitle}}</h2>
    </div>
  </scroll>
</div>
</template>

<script>
import Scroll from "@/base/scroll";
import { getData, addClass } from "@/api/dom";
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.touch = {};
    let that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  },
  computed: {
    shortcutList() {
      let ks = [];
      for (let d in this.data) {
        ks.push(this.data[d].k);
      }
      return ks;
    },
    fixedTitle() {
        if(this.scrollY>0){
            return '';
        }
      return this.data[this.currentYear] ? this.data[this.currentYear].k : "";
    }
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      listenScroll: true,
      currentYear: 0,
      scrollY: -1,
      listHeight: [],
      probeType: 3,
      diff:0,
      fixed:0
    };
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y;
    },
    onShortcutTouchStart(e) {
      let yearIndex = getData(e.target, "index");
      let firstTouch = e.touches[0];
      this.touch.x1 = firstTouch.pageX;
      this.touch.yearIndex = yearIndex;
      this._scrollTo(yearIndex);
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.x2 = firstTouch.pageX;
      let xmove = this.touch.x2;
      xmove = xmove > this.screenWidth ? this.screenWidth : xmove;
      xmove = xmove < 0 ? 0 : xmove;
      let delta = (xmove / (this.screenWidth / 6)) | 0;
      let yearIndex = delta;
      this._scrollTo(yearIndex);
    },
    _scrollTo(index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index]);
      this.currentYear = index;
    },
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  watch: {
    screenWidth(val) {
      this.screenWidth = val;
    },
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      if (!this.listHeight.length) return;
      const listHeight = this.listHeight;
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (!height2 || (-newY > height1 && -newY < height2)) {
          this.currentYear = (i + 1) % 6;
          if(!height2){
            this.diff=listHeight[0]+newY;
          }else{
          this.diff = height2+newY;
          }
          return;
        }
      }
      this.currentYear = 0;
    },
    diff(){
        if(this.diff<30&&this.diff>0){
            this.fixed=30-this.diff;
        }else{
            this.fixed=0;
        }
    }
  },
  components: {
    Scroll
  }
};
</script>

<style scoped lang="scss">
.news {
  position: fixed;
  width: 100%;
  top: 100px;
  bottom: 0;
  .year {
    margin: 2px 0;
    ul {
      display: flex;
      flex-flow: row wrap;
      text-align: center;
      li {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        width: 16.66%;
      }
      .current {
        color: green;
        border-bottom: 1px solid green;
      }
    }
  }
  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #eee;
    ul {
      .list-group {
        h2 {
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
          background: #ddd;
        }
        ul {
          margin: 0 0 0 20px;
          .list-group-item {
            height: 20px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 80%;
          }
        }
      }
    }
    .list-fixed {
      position: absolute;
      left: 0;
      width: 100%;
      top: 0;
      h2 {
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        background: #ddd;
      }
    }
  }
}
</style>
