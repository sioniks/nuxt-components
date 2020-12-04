<template>
  <section class="section story story_video">
    <div class="video-img gsapBottomVideo" data-delay="0.2">
      <img :src="content.preview.url" alt="" />
    </div>
    <div class="gsapBottomVideo" data-delay="0.2">
      <h4 class="video-title" v-html="content.title"></h4>
    </div>
    <div class="video-btn gsapBottomVideo" data-delay="0.2">
      <div class="video-btn-svg" @click="handleVideoView($event)">
        <PlayIcon />
      </div>
      Play
    </div>
    <client-only>
      <Popup v-show="showVideo" @close="close">
        <youtube
          :video-id="getVideoId"
          :player-vars="videoOptions"
          player-width="100%"
          player-height="100%"
          class="video"
          @ready="ready"
        ></youtube>
      </Popup>
    </client-only>
  </section>
</template>

<script>
import Popup from '~/components/ui/popup/popup';
import PlayIcon from '~/assets/images/icons/play-g.svg';
export default {
  components: {
    Popup,
    PlayIcon
  },
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      videoOptions: {
        autoplay: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      },
      showVideo: false
    };
  },
  computed: {
    getVideoId() {
      const videoUrl = this.content.link;
      if (videoUrl) {
        const arr = videoUrl.split('/');
        return arr[arr.length - 1];
      } else {
        return null;
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
  },
  methods: {
    gsapTranslate() {
      Array.from(document.querySelectorAll('.gsapBottomVideo')).forEach(
        (item) => {
          const delay = +item.dataset.delay || 0;
          const duration = +item.dataset.duration || 0.8;
          const hook = item.dataset.hook || 1;
          const scene = this.$scrollmagic
            .scene({
              offset: -100,
              triggerElement: item,
              triggerHook: hook,
              duration: 0,
              reverse: false
            })
            .setTween(item, duration, {
              delay,
              transform: 'translate(0, 0)',
              opacity: 1,
              overwrite: false,
              lazy: true
            });
          this.$scrollmagic.addScene(scene);
        }
      );
    },
    handleVideoView(e) {
      e.preventDefault();
      e.stopPropagation();
      this.showVideo = true;
    },
    ready(event) {
      this.player = event.target;
    },
    close() {
      this.stop();
      this.showVideo = false;
    },
    stop() {
      this.player.stopVideo();
    }
  }
};
</script>
<style lang="scss" scoped>
.gsapBottomVideo {
  opacity: 0;
  transform: translateY(100px);
}
.story {
  &_video {
    height: vw(600px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 20% 3%;
    margin: vw(40px) 0;
    @include media(767px) {
      margin: 16px 0;
      height: 72.5vw;
      padding: 60px;
    }
  }
}
.video {
  height: 40vw;
  width: 80vw;
  @include center();
  &-img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: rgb(0, 0, 0);
      z-index: -1;
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  &-title {
    color: #ffffff;
    font-family: $font-2b;
    font-size: vw(50px);
    line-height: 1.25;
    text-transform: uppercase;
    text-align: center;
    @include media(767px) {
      font-size: 24px;
      br {
        display: none;
      }
    }
  }
  &-btn {
    display: flex;
    align-items: center;
    position: absolute;
    left: vw(60px);
    bottom: vw(53px);
    color: #ffffff;
    font-size: vw(15px);
    text-transform: uppercase;
    @include media(767px) {
      left: 32px;
      bottom: 16px;
      font-size: 16px;
    }
    &-svg {
      cursor: pointer;
      margin-right: vw(15px);
      width: vw(31px);
      height: vw(48px);
      @include media(767px) {
        width: 31px;
        height: 48px;
        margin-right: 15px;
      }
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
<style lang="scss">
.video-btn-svg {
  &:hover {
    path {
      fill: $red;
    }
  }
  path {
    fill: #ffffff;
    transition: fill 0.3s ease;
  }
}
</style>
