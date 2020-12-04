<template>
  <div class="preloader">
    <div class="preloader__content">
      <div class="preloader__title">
        <div class="preloader--top">
          <template v-if="isMobile">THE WORLD’S TOUGHEST, HEAVY DUTY</template>
          <template v-else>THE WORLD’S TOUGHEST,</template>
        </div>
        <div class="preloader--bottom">
          <template v-if="isMobile"
            ><span class="--red"
              >OFF-ROAD<br />
              BUSES</span
            ></template
          >
          <template v-else
            >HEAVY DUTY <span class="--red">OFF-ROAD BUSES</span></template
          >
        </div>
      </div>
      <div class="loader">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 380 30"
          class="curve-load"
        >
          <path
            id="path"
            d="M1,9.34s4.29-2.75,7.5-3,6.27.75,11.5,1.5,9.5,1.5,9.5,1.5,9,1.5,15.5,0,10.35-2.82,11.5-3a41.39,41.39,0,0,1,12.5,0c5.5,1,3.13,2.72,6,3s15,2,19.5,1,9.57-4.69,11.5-5,6.26.26,12,1,6.31,1.39,7.5,1.5,5,0,9,0S146,6.54,151,6.34s9-1.26,20.5,0S184,10,188,10.34s17.5-4,22.5-1,7-3,11.5-3,6,4.5,11,0,13.91,2.8,16,3,11.5,3,16,0,9-6,10.5-3,7.68-1.27,17,0,7.3,2.74,11.5,3,8-.5,12.5-1.5,3-9.5,7-6,7.5-1.5,13.5,0,2.23,3.74,7.5,6,10.89,4.2,17,4.5,13.5-3,13.5-3"
          />
          <path
            id="load-svg"
            d="M1,9.34s4.29-2.75,7.5-3,6.27.75,11.5,1.5,9.5,1.5,9.5,1.5,9,1.5,15.5,0,10.35-2.82,11.5-3a41.39,41.39,0,0,1,12.5,0c5.5,1,3.13,2.72,6,3s15,2,19.5,1,9.57-4.69,11.5-5,6.26.26,12,1,6.31,1.39,7.5,1.5,5,0,9,0S146,6.54,151,6.34s9-1.26,20.5,0S184,10,188,10.34s17.5-4,22.5-1,7-3,11.5-3,6,4.5,11,0,13.91,2.8,16,3,11.5,3,16,0,9-6,10.5-3,7.68-1.27,17,0,7.3,2.74,11.5,3,8-.5,12.5-1.5,3-9.5,7-6,7.5-1.5,13.5,0,2.23,3.74,7.5,6,10.89,4.2,17,4.5,13.5-3,13.5-3"
          />
          <circle id="circle1" r="4" fill="#d2131c" />
        </svg>

        <div class="percent">{{ count }}%</div>
      </div>
    </div>
    <Curve1 class="curve1" />
    <Curve2 class="curve2" />
  </div>
</template>

<script>
import { gsap } from 'gsap';
import Curve1 from '~/assets/images/preload-curve1.svg';
import Curve2 from '~/assets/images/preload-curve2.svg';

export default {
  components: { Curve1, Curve2 },
  props: {
    item: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      count: 0,
      loadTime: 3,
      countPosition: 0,
      start: false,
      isMobile: false,
      mobileWidth: 768
    };
  },

  created() {
    setTimeout(() => {
      this.start = true;
    }, 100);
  },

  mounted() {
    window.addEventListener('resize', this.onResize);
    this.changeCount();
    this.startAnimation();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    changeCount() {
      if (process.client) {
        const loadWidth = window.innerWidth * 0.2;
        const intervalCount = setInterval(() => {
          this.countPosition += loadWidth / 100;
          this.count = Math.floor((this.countPosition / loadWidth) * 100);
          if (this.count >= 100) {
            clearInterval(intervalCount);
          }
        }, this.loadTime * 5);
      }
    },
    onResize(event) {
      if (event) {
        this.isMobile = this.mobileWidth > event.target.innerWidth;
      } else {
        this.isMobile = this.mobileWidth > window.innerWidth;
      }
    },
    startAnimation() {
      this.onResize();
      gsap.to('.preloader--top', 2, {
        transform: this.isMobile ? 'translateX(0)' : 'translateX(-6vw)',
        opacity: 1
      });
      gsap.to('.preloader--bottom', 2, {
        transform: this.isMobile ? 'translateX(0)' : 'translateX(-6vw)',
        opacity: 1
      });
      gsap.to('.loader', 2, { transform: 'translateY(0)', opacity: 1 });
      gsap.to('.percent', {
        transform: this.isMobile ? 'translateX(70vw)' : 'translateX(18vw)',
        duration: 2
      });
      gsap.from('#load-svg', { drawSVG: 0, duration: 2 });

      gsap.to('#circle1', {
        duration: 2,
        motionPath: {
          path: '#path'
        }
      });
    }
  }
};
</script>

<style lang="scss">
.preloader {
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  position: fixed;
  background: #ffffff;
  .curve1 {
    position: absolute;
    z-index: -1;
    left: 0;
    bottom: 0;
    width: 35vw;
    @include media(767px) {
      width: 470px;
      height: auto;
      left: -200px;
    }
  }
  .curve2 {
    position: absolute;
    z-index: -1;
    right: 0;
    top: 0;
    width: 40vw;
    @include media(767px) {
      width: 370px;
      height: auto;
      right: -180px;
    }
  }
  .preloader__content {
    @include center();
    width: 100%;
    text-align: center;
    @include media(767px) {
      margin-top: -50px;
    }
  }
  .preloader__title {
    font-family: $font-2b;
    font-size: vw(56px);
    line-height: 1.14;
    text-transform: uppercase;
    color: #0d314f;
    margin-bottom: vw(111px);
    @include media(767px) {
      margin-bottom: 55px;
      font-size: 28px;
      line-height: 1.25;
    }
    .--red {
      color: $red;
    }
  }
  .preloader--top {
    position: relative;
    transform: translateX(-20vw);
    opacity: 0;
    @include media(767px) {
      transform: translateX(-100px);
      padding: 0 32px;
      text-align: left;
    }
    // transform: translateX(-6vw);
  }
  .preloader--bottom {
    position: relative;
    transform: translateX(20vw);
    opacity: 0;
    // transform: translateX(6vw);
    @include media(767px) {
      transform: translateX(100px);
      padding: 0 32px;
      text-align: left;
    }
  }
  .loader {
    position: relative;
    width: 20vw;
    margin: 0 auto;
    transform: translateY(20vh);
    opacity: 0;
    @include media(767px) {
      width: 100%;
      padding: 0 32px;
    }
  }
  .curve-load {
    width: 100%;
    position: relative;
    overflow: visible;
    #load-svg {
      width: 100%;
      fill: none;
      stroke: $red;
      stroke-width: 2px;
    }
    #path {
      width: 100%;
      fill: none;
      stroke: none;
      stroke-width: 1px;
    }
    #circle1 {
      transform: translateX(-5px);
    }
  }
  .percent {
    font-family: $font-2b;
    width: fit-content;
    position: relative;
    left: 0;
    font-size: vw(24px);
    line-height: 1.75;
    text-align: center;
    text-transform: uppercase;
    color: #d2131c;
    @include media(767px) {
      font-size: 20px;
    }
  }
  @keyframes anim {
    from {
      stroke-dashoffset: 400;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
}
</style>
