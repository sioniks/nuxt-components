<template>
  <div class="article" :class="{ white: !content.bg_color }">
    <client-only>
      <Popup v-show="showVideo" @close="close">
        <client-only>
          <youtube
            :video-id="getVideoId"
            :player-vars="videoOptions"
            player-width="100%"
            player-height="100%"
            class="video"
            @ready="ready"
          ></youtube>
        </client-only>
      </Popup>
    </client-only>
    <div class="article-block">
      <div
        v-if="content.bg_color"
        :style="{ background: content.bg_color }"
        class="article-block-overlay gsapHeightRefresh"
      ></div>
      <div class="article__top gsapBottomRefresh" data-delay="0.3">
        <img
          :src="content.logo ? content.logo.url : null"
          alt="article-logo"
          class="article__logo"
        />
        <div v-if="!isMobile" class="article__resource">
          <a :href="content.site_link" target="_blank" class="article__link">
            {{ content.site_link_label }}
            <IconChain />
          </a>
          <div class="article__countrie">{{ content.location }}</div>
        </div>
      </div>
      <div class="article__content gsapBottomRefresh" data-delay="0.5">
        <a
          :href="content.site_link"
          target="_blank"
          class="article__description"
        >
          {{ content.title }}
        </a>
        <div class="article__text" v-html="content.text"></div>
        <div v-if="getVideoId" class="video__wr">
          <PlayBtn class="btn__play" @click="handleVideoView" />
          <img
            :src="content.video_preview.url"
            alt="video thumbnail"
            class="video__prev"
          />
        </div>
        <div v-if="isMobile" class="article__resource">
          <a :href="content.site_link" target="_blank" class="article__link">
            {{ content.site_link_label }}
            <IconChain />
          </a>
          <div class="article__countrie">{{ content.location }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconChain from '~/assets/images/icons/chain.svg';
import PlayBtn from '~/assets/images/icons/play-btn.svg';
import Popup from '~/components/ui/popup/popup';

export default {
  components: {
    IconChain,
    PlayBtn,
    Popup
  },
  props: {
    content: {
      type: Object,
      default: null
    },
    flag: {
      type: Boolean,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
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
      const videoUrl = this.content.video_link;
      if (videoUrl) {
        const arr = videoUrl.split('/');
        return arr[arr.length - 1];
      } else {
        return null;
      }
    }
  },
  watch: {
    content() {
      this.$emit('changeContent');
    }
  },
  mounted() {
    if (this.flag) {
      setTimeout(() => {
        this.gsapTranslate();
        this.gsapHeight();
      }, 500);
    } else {
      setTimeout(() => {
        this.gsapTranslate();
        this.gsapHeight();
      }, 300);
    }
  },
  methods: {
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
    },
    gsapTranslate() {
      Array.from(document.querySelectorAll('.gsapBottomRefresh')).forEach(
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
    gsapHeight() {
      Array.from(document.querySelectorAll('.gsapHeightRefresh')).forEach(
        (item) => {
          const delay = +item.dataset.delay || 0;
          const duration = +item.dataset.duration || 0.8;
          const hook = item.dataset.hook || 1;
          const scene2 = this.$scrollmagic
            .scene({
              offset: -100,
              triggerElement: item.parentNode,
              triggerHook: hook,
              duration: 0,
              reverse: false
            })
            .setTween(item, duration, {
              delay,
              height: '100%',
              overwrite: false,
              lazy: true
            });
          this.$scrollmagic.addScene(scene2);
        }
      );
    }
  }
};
</script>

<style scoped lang="scss">
.article {
  width: 50%;
  color: #ffffff;
  display: block;
  padding: 1vw;
  @include media(767px) {
    width: 100%;
    padding: 8px 0;
  }
  &:first-child,
  &:nth-child(2) {
    padding-top: 0;
    @include media(767px) {
      padding-top: 8px;
    }
  }
  &.white {
    border-top: 1px solid #f5f5f5;
    color: #000000;
    .article__link {
      color: $red;
      .svg-icon {
        fill: #919aa1;
      }
    }
    .article__countrie {
      color: #919aa1;
    }
    .article__description,
    .article__text {
      color: #041c30;
    }
  }
  &-block {
    padding: vw(72px) vw(56px) vw(56px);
    position: relative;
    @include media(767px) {
      padding: 24px 24px 32px 24px;
    }
    &-overlay {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: -1;
    }
  }
}
.article__top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: vw(64px);
  position: relative;
  @include media(767px) {
    margin-bottom: 24px;
    justify-content: flex-start;
  }
}
.article__prev {
  width: 100%;
}
.article__logo {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  max-width: 30%;
  max-height: vw(80px);
  @include media(767px) {
    position: static;
    transform: none;
    max-width: 200px;
    max-height: 64px;
  }
}
.article__text {
  font-size: vw(16px);
  line-height: 1.75;
  color: #ffffff;
  @include media(767px) {
    font-size: 14px;
    line-height: 1.5;
  }
}
.article__resource {
  max-width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @include media(767px) {
    max-width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 32px;
  }
}
.article__link {
  font-size: vw(14px);
  line-height: 1.2;
  margin-right: vw(24px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  @include media(767px) {
    font-size: 14px;
    margin: 0 0 20px 0;
  }
  .svg-icon {
    width: vw(12px);
    height: vw(12px);
    margin-left: vw(10px);
    fill: #ffffff;
    @include media(767px) {
      width: 12px;
      height: 12px;
      margin-left: 12px;
    }
  }
}
.article__countrie {
  font-size: vw(14px);
  line-height: 1.2;
  font-family: $font-1b;
  @include media(767px) {
    font-size: 12px;
  }
}
.article__description {
  font-size: vw(28px);
  line-height: 1.75;
  font-family: $font-2b;
  margin-bottom: vw(24px);
  cursor: pointer;
  color: #ffffff;
  display: inline-block;
  @include media(767px) {
    font-size: 22px;
    line-height: 1.5;
    margin-bottom: 20px;
  }
}
.btn__play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: vw(78px);
  height: vw(78px);
  cursor: pointer;
  @include media(767px) {
    width: 65px;
    height: 65px;
  }
  &:hover {
    path {
      fill: $red;
    }
  }
}
.video__prev {
  width: 100%;
  @include media(767px) {
    height: 100%;
    object-fit: cover;
  }
}
.video__wr {
  position: relative;
  margin-top: vw(4px);
  @include media(767px) {
    margin-top: 4px;
    height: 40vw;
  }
}
.video {
  height: 40vw;
  width: 80vw;
  @include center();
}
.gsapBottomRefresh {
  transform: translateY(100px);
  opacity: 0;
}
.gsapHeightRefresh {
  height: 0;
}
</style>
<style lang="scss">
.article {
  .btn__play {
    path {
      transition: fill 0.3s ease;
    }
    &:hover {
      path {
        fill: $red;
      }
    }
  }
}
</style>
