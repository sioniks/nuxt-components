<template>
  <section class="section section-video">
    <div
      v-if="!isMobile"
      class="plusses-bg"
      :style="{ backgroundImage: `url(${plus})` }"
    ></div>

    <img
      :src="block.extra.logo.url"
      :alt="block.extra.logo.custom_properties.seo_alt"
      class="gsapBottom logo"
    />
    <div class="gsapBottom">
      <div class="section__header" v-html="block.extra.video_title"></div>
    </div>
    <div class="container">
      <div class="video__wr">
        <PlayBtn class="btn__play" @click="handleVideoView" />

        <picture>
          <source
            :srcset="block.preview.conversions.original_webp"
            type="image/webp"
          />
          <source
            :srcset="block.preview.conversions.medium"
            media="(max-width: 1200px)"
          />
          <img
            :srcset="block.preview.url"
            :alt="block.preview.custom_properties.seo_alt"
            class="video__prev"
          />
        </picture>

        <Popup v-show="showVideo" @close="close">
          <!-- <client-only> -->
          <youtube
            :video-id="videoId"
            :player-vars="videoOptions"
            player-width="100%"
            player-height="100%"
            class="video"
            @ready="ready"
          ></youtube>
          <!-- </client-only> -->
        </Popup>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
// import Logo from '~/assets/images/icons/ -logo.svg';
import PlayBtn from '~/assets/images/icons/play-btn.svg';
import plus from '~/assets/images/pluses.png';
import Popup from '~/components/ui/popup/popup';

export default {
  components: {
    PlayBtn,
    Popup
  },
  props: {
    block: {
      type: Object,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      plus,
      videoId: ' ',
      videoOptions: {
        autoplay: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        host: 'https://www.youtube-nocookie.com/embed/'
      }
    };
  },
  computed: {
    showVideo() {
      return this.$store.state.homePage.videoPopup;
    }
  },
  mounted() {
    this.$nextTick(() => this.gsapTranslateVideo());
    this.getVideoId();
  },

  methods: {
    ...mapMutations({
      handleVideoView: 'homePage/handleVideoView'
    }),
    ready(event) {
      this.player = event.target;
    },
    close() {
      this.stop();
      this.handleVideoView();
    },
    stop() {
      this.player.stopVideo();
    },

    getVideoId() {
      if (this.block.source === 'youtube') {
        this.videoId = this.$youtube.getIdFromURL(this.block.link);
      }
    },
    gsapTranslateVideo() {
      Array.from(
        this.$el.querySelectorAll(
          '.gsapOpacity, .gsapTop, .gsapBottom, .gsapLeft, .gsapRight'
        )
      ).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.8;
        const hook = +item.dataset.hook || 1;
        const transform = item.dataset.transform || 'translate(0, 0)';
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
            transform,
            opacity: 1,
            overwrite: false,
            lazy: true
          });
        this.$scrollmagic.addScene(scene);
      });
    }
  }
};
</script>

<style lang="scss">
.section-video {
  margin: 0;
  padding-top: vw(100px);
  @include media(1200px) {
    padding-top: 56px;
  }
  .btn__play {
    @include center();
    width: 8vw;
    height: 8vw;
    z-index: 3;
    transition: all 0.3s ease;
    cursor: pointer;
    @include media(1200px) {
      width: 65px;
      height: 65px;
    }
    .play-btn_svg__test {
      fill: #ffffff;
    }
    &:hover {
      path {
        fill: $red;
      }
    }
  }
  .plusses-bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100vw;
    height: 20vw;
    overflow: hidden;
    background-position: 0 0;
    background-size: 100px 100px;
    opacity: 0.5;
  }
  .section__header {
    margin: vw(49px) 0;
    width: 100%;
    text-align: center;
    position: relative;
    // width: fit-content;
    // transform: translate(0, 200px);
    display: block;
    @include media(1200px) {
      margin: 48px 0 64px;
      font-size: 30px;
      line-height: 1.25;
    }
    @include media(767px) {
      margin: 24px 0 40px;
      font-size: 32px;
    }
  }
  .logo {
    position: relative;
    display: block;
    fill: $red;
    width: vw(295px);
    height: auto;
    margin: 0 auto;
    @include media(1200px) {
      width: 200px;
      height: 24px;
    }
  }
  .video__wr {
    width: 100%;
    height: 35vw;
    overflow: hidden;
    position: relative;
    @include media(1200px) {
      height: 40vw;
    }
  }
  .video__prev {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .video {
    height: 40vw;
    width: 80vw;
    @include center();
  }
  // .gsapBottom--video {
  //   opacity: 0;
  //   transform: translateY(100px);
  //   transition: all 0.7s ease;
  // }
}
</style>
