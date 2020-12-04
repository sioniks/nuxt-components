<template>
  <div class="lines">
    <SvgLines />
  </div>
</template>

<script>
import SvgLines from '~/assets/images/bg-line2.svg';
export default {
  components: { SvgLines },
  mounted() {
    setTimeout(() => {
      this.gsapOpacity();
    }, 500);
  },
  methods: {
    gsapOpacity() {
      Array.from(document.querySelectorAll('.lines')).forEach((item) => {
        const delay = item.dataset.delay || 0;
        const duration = item.dataset.duration || 2;
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
.lines {
  width: vw(810px);
  height: vw(420px);
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  overflow: hidden;
  opacity: 0;
  svg {
    position: absolute;
    top: vw(-40px);
    right: vw(-50px);
    width: 100%;
    height: 100%;
  }
}
</style>
