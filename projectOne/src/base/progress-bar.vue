<template>
  <div class="progress-bar"  ref="progressBar">
      <div class="bar-linner"  >
          <div class="progress"  ref="progress"></div>
          <div class="progress-btn-wrapper" ref="progressBtn"
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend="progressTouchEnd"
          >
              <div class="progress-btn"></div>
          </div>
      </div>
  </div>
</template>

<script>
import {prefixStyle} from '@/api/dom';
const progressBtn = 16;

const transform = prefixStyle('transform');
export default {
    data(){
        return{
            touch:{},
        }
    },
    props:{
        percent:{
            type:Number,
            default:0,
        }
    },
    methods:{
        progressTouchStart(e){
            this.touch.initiated=true;
            this.touch.startX=e.touches[0].pageX;
            this.touch.left=this.$refs.progress.clientWidth;
        },
        progressTouchMove(e){
            if(!this.touch.initiated){
                return;
            }
            const deltaX= e.touches[0].pageX -this.touch.startX;
            const offsetWidth =Math.min(this.$refs.progressBar.clientWidth,Math.max(0,this.touch.left+deltaX));//-progressBtn/2
            this._offset(offsetWidth);
        },
        _offset(offsetWidth){
                this.$refs.progress.style.width=`${offsetWidth}px`;
                this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`;
        },
        progressTouchEnd(e){
            this.touch.initiated=false;
            this._triggerPercent();
        },
        _triggerPercent(){
                const barWidth =this.$refs.progressBar.clientWidth;//-progressBtn
                const percent = this.$refs.progress.clientWidth/barWidth;
                this.$emit('percentChange',percent);
        },
    },
    watch:{
        percent(newPercent){
            if(newPercent>=0 &&!this.touch.initiated ){
                const barWidth =this.$refs.progressBar.clientWidth;//-progressBtn/2
                const offsetWidth = newPercent * barWidth;
                this._offset(offsetWidth);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.progress-bar{
    height:36px;
    box-sizing: border-box;
    background: #fff;
    .bar-linner{
        position: relative;
        top:16px;
        height:4px;
        background:#eae7e7;
        .progress{
            position: absolute;
            height: 100%;
            background:#43aef9;
        }
        .progress-btn-wrapper{
            position: absolute;
            left:-18px;
            top:-16px;
            width:36px;
            height:36px;
            .progress-btn{
                position: relative;
                top:9px;
                left:9px;
                box-sizing: border-box;
                width:18px;
                height: 18px;
                border:3px solid #ccc;
                border-radius:50%;
                background: #ccc;
            }

        }
    }
}

</style>
