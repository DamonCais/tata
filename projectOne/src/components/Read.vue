<template>
  <div class="recommend" ref="scroll">
      <Scroll class="scroll" :data="recommendList" 
      :listenScroll="listenScroll" @scroll="scroll"
      @scrollEnd="scrollEnd"
   :probeType="probeType"  @pull="pull" > 
          <div ref="wrapper">
        <div v-if="dailySentence.length" class="slider-wrapper" ref="sliderWrapper">
            <span class="sentence">每日一句</span>
            <slider>
                <div class="daily" v-for="item in dailySentence" :key="item.sid">
                  <img @click="readSentence" :data-sid="item.sid" :src="item.picture">
                  <div class="dailyTitle">
                      {{item.content}}
                  </div>
                  
                </div>
            </slider>
        </div>
            <div class="recommendList">

                    <router-link v-for="rec in recommendList" tag="div" :to="'/article/'+rec.id" class="rec" :key="rec.id">
                        <div class="thumb">
                            <img  v-lazy="rec.thumb" width="100%" height="100%" >
                        </div>
                        <div class="content">
                        <h2 class="title">{{rec.title}}</h2>
                        <p class="description" style="'-webkit-box-orient':'vertical';">{{rec.description}}</p>
                        </div>
                    </router-link>

            </div>
        </div>
    </Scroll>
    <div  class="loading" v-show="!canLoad">
        <loading :title="''" />
    </div>
  </div>
</template>

<script>
import Slider from "@/base/slider";
import { dailySentence, getRecommendList } from "@/api/api";
import { getData } from "@/api/dom";
import Scroll from "@/base/scroll";
import Loading from "@/base/loading";
export default {
  created() {
    this._dailySentence();
    this._getRecommendList();
  },
  data() {
    return {
      dailySentence: [],
      recommendList: [],
      recommendCount: 0,
      listenScroll: true,
      probeType: 3,
      canLoad: true,
      page: 1
    };
  },
  methods: {
    readSentence(e) {
      let sid = getData(e.target, "sid");
      this.$router.push("/dailySentence/" + sid);
    },
    pull() {},
    scroll(pos) {},
    scrollEnd(pos) {
      if (pos.y >= 0) {
        return;
      }
      const wrapperHeight = this.$refs.wrapper.clientHeight;
      const scrollHeight = this.$refs.scroll.clientHeight;
      if (wrapperHeight - scrollHeight + pos.y - 10 < 0 && this.canLoad) {
        this._loadRecommend();
      }
    },
    _loadRecommend() {
      this.page++;
      this.canLoad = false;
      setTimeout(() => {
        this._getRecommendList();
      }, 1000);
    },
    _dailySentence() {
      dailySentence().then(res => {
        this.dailySentence = res.list;
      });
    },
    _getRecommendList() {
      getRecommendList(this.page).then(res => {
        res.message.data.forEach(element => {
          if (!element.id) return;
          if (element.id) {
            this.recommendList.push(element);
          }
        });
        this.recommendCount = res.message.count;
        this.canLoad = true;
      });
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
};
</script>

<style scoped lang="scss">
.recommend {
  position: fixed;
  width: 100%;
  top: 100px;
  bottom: 0;
  .loading {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .scroll {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      overflow: hidden;
      .sentence {
        z-index: 100;
        position: absolute;
        top: 20px;
        left: 0;
        background: rgb(0, 140, 255);
        color: #fff;
        width: 77px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        line-height: 25px;
        font-size: 14px;
        text-align: center;
      }
      .daily {
        position: relative;
        .dailyTitle {
          text-align: left;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 75%;
          position: absolute;
          bottom: 4px;
          color: #eee;
          left: 10px;
        }
      }
    }
    .recommendList {
      width: 100%;
      padding: 30px 15px;
      box-sizing: border-box;
      .rec {
        box-sizing: border-box;
        width: 100%;
        padding: 11.5px 0;
        display: flex;
        border-top: 1px solid #ccc;
        .content {
          flex: 5;
          overflow: hidden;
          line-height: 20px;
          h2 {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
          }
          p {
            color: #666;
            font-size: 14px;
            overflow: hidden;
            display: -webkit-box;
            word-wrap: break-word;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
          }
        }
        .thumb {
          flex: 2;
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
