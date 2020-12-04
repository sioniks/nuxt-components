<template>
  <section class="section story story_back">
    <div class="story-content">
      <app-link to="/stories">
        <Button
          :btn-text="'Back to stories page'"
          :arrow="true"
          btn-type="red btn_arrow"
        />
      </app-link>
    </div>
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn';
export default {
  components: { Button },
  mounted() {
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
  },
  methods: {
    gsapTranslate() {
      Array.from(document.querySelectorAll('.story_back')).forEach((item) => {
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
  &_back {
    padding: vw(40px) 0 vw(102px);
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>
<style lang="scss">
.story {
  &_back {
    .btn {
      padding: 0 vw(5px);
      min-width: vw(295px);
      height: vw(60px);
    }
  }
}
</style>
