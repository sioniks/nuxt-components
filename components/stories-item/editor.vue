<template>
  <section class="section story story_editor" data-delay="0.2">
    <div class="story-content" v-html="content.content"></div>
  </section>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
  },
  methods: {
    gsapTranslate() {
      Array.from(document.querySelectorAll('.story_editor')).forEach((item) => {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.story {
  &_editor {
    padding: vw(24px) 0;
    opacity: 0;
    transform: translateY(100px);
    @include media(767px) {
      padding: 16px 0;
    }
  }
}
</style>
