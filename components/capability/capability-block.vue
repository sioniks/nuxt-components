<template>
  <section class="section section-capability">
    <div class="container">
      <div class="section__header capa-title">{{ block.title }}</div>
      <div class="capa-text" v-html="block.description"></div>
    </div>

    <div class="video-wr">
      <img src="~/assets/images/capa.png" alt="" class="capa-img" />

      <div class="video-controls">
        <div
          class="play-btn"
          :class="{ active: playedVideo === 'first' }"
          @click="setActive('first')"
        >
          <PlayIcon v-if="playedVideo != 'first'" />
          <PauseIcon v-else />
          {{ block.extra.first_time_code_title }}
        </div>
        <div
          class="play-btn"
          :class="{ active: playedVideo === 'second' }"
          @click="setActive('second')"
        >
          <PlayIcon v-if="playedVideo != 'second'" />
          <PauseIcon v-else />
          {{ block.extra.second_time_code_title }}
        </div>
        <div
          class="play-btn"
          :class="{ active: playedVideo === 'third' }"
          @click="setActive('third')"
        >
          <PlayIcon v-if="playedVideo != 'third'" />
          <PauseIcon v-else />
          {{ block.extra.third_time_code_title }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PlayIcon from '~/assets/images/icons/ex-play.svg';
import PauseIcon from '~/assets/images/icons/ex-pause.svg';
export default {
  components: { PlayIcon, PauseIcon },
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      playedVideo: ''
    };
  },
  computed: {},
  methods: {
    setActive(val) {
      this.playedVideo = val;

      setTimeout(() => {
        this.playedVideo = '';
      }, 5000);
    }
  }
};
</script>

<style scoped lang="scss">
.section-capability {
  padding-top: vw(116px);
  @include media(767px) {
    padding-top: 56px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    @include media(767px) {
      flex-direction: column;
    }
  }
}
.capa-title {
  text-transform: uppercase;
  color: #0d314f;
  @include media(767px) {
    text-align: left;
  }
}
.capa-text {
  font-family: $font-1r;
  font-size: vw(16px);
  line-height: 1.6;
  color: #041c30;
  width: vw(536px);
  @include media(767px) {
    margin-top: 20px;
    font-size: 16px;
    width: 100%;
  }
}
.video-wr {
  margin-top: vw(28px);
  min-height: vw(480px);
  width: 100%;
  @include media(767px) {
    margin-top: 80px;
    min-height: auto;
  }
}
.capa-img {
  width: 100%;
}
.video-controls {
  width: vw(872px);
  margin: 0 auto;
  padding: vw(40px) 0 0;
  display: flex;
  justify-content: space-between;
  position: relative;
  @include media(767px) {
    width: calc(100% - 64px);
    padding: 30px 0 0;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #f4f5f6;
  }
  .play-btn {
    width: 33%;
    font-family: $font-1b;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: vw(14px);
    line-height: 1.16;
    text-transform: uppercase;
    color: #041c30;
    transition: color 0.3s ease;
    cursor: pointer;
    padding: 0 vw(37px) vw(37px);
    position: relative;
    @include media(767px) {
      width: 33.33%;
      padding: 0 12px 8px 0;
      flex-direction: column;
      align-items: flex-start;
      font-size: 12px;
    }
    &:after {
      content: '';
      z-index: 2;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: $red;
      opacity: 0;
      transition: opacity 0.3s ease;
      @include media(767px) {
        width: 100%;
      }
    }
    &.active,
    &:hover {
      color: $red;
      &:after {
        opacity: 1;
      }
      .svg-icon {
        fill: $red;
      }
    }
  }
  .svg-icon {
    transition: all 0.3s ease;
    margin-right: 20px;
    fill: #041c30;
    @include media(767px) {
      margin: 0 0 20px 0;
    }
  }
}
</style>
