<template>
  <div class="page__wr">
    <Lines v-if="!isMobile" />
    <section class="section story story_top">
      <div class="story-content">
        <h1 class="story-title section__header">{{ title }}</h1>
        <div class="story-description" data-delay="0.1">
          <div v-html="description"></div>
        </div>
      </div>
    </section>
    <component
      :is="item.component_name | componentValidName"
      v-for="(item, index) in componentsContentList"
      :key="`content_${index}`"
      :content="item"
    ></component>
    <Back v-if="!isMobile" />
    <component
      :is="block.component_name | componentValidName"
      v-for="(block, index) in componentsFooterList"
      :key="`footer_${index}`"
      :block="block"
      :delay="500"
      :is-mobile="isMobile"
      :type="block.component_name"
    ></component>
  </div>
</template>

<script>
import Lines from '~/components/ui/lines/lines';
import Editor from '~/components/stories-item/editor.vue';
import ImageBlock from '~/components/stories-item/image.vue';
import Pictures from '~/components/stories-item/pictures.vue';
import Quote from '~/components/stories-item/quote.vue';
import VideoBlock from '~/components/stories-item/video.vue';
import Banner from '~/components/bunners/bg-img-banner.vue';
import Back from '~/components/stories-item/back.vue';
import StorySlider from '~/components/slider/slider.vue';
export default {
  components: {
    Lines,
    Editor,
    ImageBlock,
    Pictures,
    Quote,
    VideoBlock,
    Banner,
    Back,
    StorySlider
  },
  async asyncData({ $axios, $config: { baseAPI }, params }) {
    const response = await $axios.$get(`${baseAPI}/story/items/${params.id}`);
    return {
      title: response.title,
      description: response.description,
      componentsContentList: response.components.content,
      componentsFooterList: response.components.footer
    };
  },
  data() {
    return {
      isMobile: false,
      mobileWidth: 768
    };
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    gsapTranslate() {
      Array.from(
        this.$el.querySelectorAll('.story-title, .story-description')
      ).forEach((item) => {
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
      });
    },
    onResize(event) {
      if (event) {
        this.isMobile = this.mobileWidth > event.target.innerWidth;
      } else {
        this.isMobile = this.mobileWidth > window.innerWidth;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page__wr {
  padding-top: 90px;
  overflow: hidden;
  position: relative;
  @include media(767px) {
    padding-top: 80px;
  }
}
.story {
  &-title {
    text-transform: uppercase;
    max-width: vw(506px);
    text-align: left;
    opacity: 0;
    transform: translateX(-100px);
    @include media(767px) {
      max-width: 100%;
    }
  }
  &_top {
    padding: vw(65px) 0 vw(24px);
    @include media(767px) {
      padding: 48px 0 16px;
    }
  }
  .story-description {
    font-size: vw(24px);
    line-height: 1.4;
    color: $gray;
    margin-top: vw(22px);
    font-family: $font-1r;
    text-transform: inherit;
    opacity: 0;
    transform: translateY(100px);
    @include media(767px) {
      margin-top: 12px;
      font-size: 16px;
      line-height: 1.19;
    }
  }
}
</style>
<style lang="scss">
.story {
  margin: 0 auto;
  .story-content {
    max-width: vw(648px);
    margin: 0 auto;
    text-align: justify;
    @include media(767px) {
      max-width: 100%;
      padding: 0 32px;
    }
    &_fluid {
      max-width: vw(1096px);
      padding-right: vw(224px);
      @include media(767px) {
        max-width: 100%;
        padding: 0 32px;
      }
      &.left-padding {
        padding: 0 0 0 vw(224px);
        @include media(767px) {
          padding: 0 32px;
        }
      }
    }
    &_full {
      max-width: 100%;
      padding: 0;
    }
  }
  p {
    font-size: vw(18px);
    line-height: 1.78;
    @include media(767px) {
      font-size: 16px;
      line-height: 1.6;
    }
  }
  strong {
    font-family: $font-1b;
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: vw(32px);
    font-family: $font-2b;
    text-transform: uppercase;
    line-height: 1.25;
    text-align: left;
    @include media(767px) {
      font-size: 24px;
    }
  }
  &-description {
    p {
      font-size: vw(24px);
      line-height: 1.4;
      color: $gray;
      margin-top: vw(22px);
      font-family: $font-1r;
      text-transform: inherit;
      @include media(767px) {
        font-size: 16px;
        line-height: 1.19;
      }
    }
  }
}
</style>
