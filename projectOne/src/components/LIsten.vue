<template>
  <div class="listen" ref="scroll">
      <Scroll class="scroll" :data="videoList" 
      :listenScroll="listenScroll" @scroll="scroll"
      @scrollEnd="scrollEnd"
   :probeType="probeType"  @pull="pull" > 
        <div ref="wrapper">
          <div class="videoHead">
            <span v-if="showImg" class="sentence">精彩视频</span>
              <img v-if="showImg" @click="showImg=!showImg" :src="headData.pic" alt="" width="100%">
            <transition name="slide-fade">
              <video v-if="!showImg" width="100%" :src="headData.mediaUrl" binderror="" controls></video>
            </transition>
          </div>
            <div class="videoList">
              <transition-group name="list" tag="div">
                <router-link v-for="rec in videoList" tag="div" :to="'/video/'+rec.id+'-'+rec.catid" class="rec" :key="rec.id">
                    <div class="thumb">
                        <img v-lazy="rec.smallpic" width="100%" height="100%" >
                    </div>
                    <div class="content">
                    <h2 class="title" style="'-webkit-box-orient':'vertical';">{{rec.title}}</h2>
                    <p class="description">
                      播放了{{rec.views}}次 <span>{{rec.catname}}</span> 
                    </p>
                    </div>
                </router-link>
              </transition-group>
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
import { getVideo } from "@/api/api";
import Scroll from "@/base/scroll";
import Loading from "@/base/loading";
export default {
  created() {
    this._getVideo();
  },
  data() {
    return {
      listenScroll: true,
      probeType: 3,
      canLoad: true,
      page: 0,
      videoList: [],
      catName: "",
      onlineTime: 0,
      endId: 0,
      headData: {},
      showImg: true
    };
  },
  methods: {
    pull() {},
    scroll(pos) {},
    scrollEnd(pos) {
      if (pos.y >= 0) {
        return;
      }
      const wrapperHeight = this.$refs.wrapper.clientHeight;
      const scrollHeight = this.$refs.scroll.clientHeight;
      if (wrapperHeight - scrollHeight + pos.y - 10 < 0 && this.canLoad) {
        this._loadNewVideo();
      }
    },
    _loadNewVideo() {
      this.page++;
      this.canLoad = false;
      setTimeout(() => {
        this._getVideo();
      }, 500);
    },
    _getVideo() {
      getVideo(this.page, this.catName, this.onlineTime, this.endId).then(
        res => {
          if (res.status !== 1) return;
          if (this.page === 0) {
            this.headData = res.message.headData;
          }
          this.catName = res.message.data.catName || "";
          this.onlineTime = res.message.data.onlineTime || 0;
          this.endId = res.message.data.endId || 0;
          res.message.data.list.forEach(element => {
            if (!element.id) return;
            this.videoList.push(element);
          });
          this.canLoad = true;
        }
      );
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
.listen {
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
    .videoHead {
      position: relative;
      // overflow: hidden;
      min-height: 212px;
      .sentence {
        z-index: 100;
        position: absolute;
        top: 20px;
        left: 0;
        background: #ff8a49;
        color: #fff;
        width: 77px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        line-height: 25px;
        font-size: 14px;
        text-align: center;
      }
    }
    .videoList {
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
            display: -webkit-box;
            word-wrap: break-word;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            font-size: 16px;
            min-height: 40px;
          }
          .description {
            color: #666;
            font-size: 12px;
            overflow: hidden;
            display: -webkit-box;
            word-wrap: break-word;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            position: relative;
            width: 100%;
            span {
              position: absolute;
              display: block;
              right: 0;
              top: 0;
              line-height: 20px;
              padding: 0 5px;
              font-size: 10px;
              background: rgba(132, 179, 91, 0.2);
              color: #6ea33f;
            }
          }
        }
        .thumb {
          flex: 2;
          padding-right: 10px;
        }
      }
    }
  }
}
//视频动画
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-200px);
  opacity: 0;
}
//图片动画
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>

