<template>
  <section class="section story story_image">
    <div
      v-if="content.type !== 'story_full_width'"
      class="story_image-plus"
      :style="{ backgroundImage: `url(${plus})` }"
    ></div>
    <div
      class="story-content story-content_anim"
      data-delay="0.2"
      :class="[
        content.type === 'story_full_width'
          ? 'story-content_full'
          : 'story-content_fluid'
      ]"
    >
      <picture>
        <source
          :srcset="content.image.conversions.medium"
          media="(max-width: 1200px)"
        />
        <img
          :srcset="content.image.url"
          :alt="content.image.custom_properties.seo_alt"
          class="image"
        />
      </picture>
    </div>
  </section>
</template>

<script>
import plus from '~/assets/images/pluses.png';
export default {
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      plus
    };
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
  },
  methods: {
    gsapTranslate() {
      Array.from(document.querySelectorAll('.story-content_anim')).forEach(
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
    }
  }
};
</script>
<style lang="scss" scoped>
.story {
  &_image {
    padding: vw(24px) 0;
    @include media(767px) {
      padding: 16px 0;
      .story-content_fluid {
        padding-left: 0;
      }
    }
    &-plus {
      position: absolute;
      right: 0;
      bottom: 0;
      background-size: 100px;
      height: 80%;
      width: 55%;
      @include media(767px) {
        width: 70%;
        height: calc(100% + 100px);
        top: 40px;
      }
    }
  }
  &-content {
    &_anim {
      opacity: 0;
      transform: translateY(100px);
    }
  }
}
.image {
  width: 100%;
}
</style>
