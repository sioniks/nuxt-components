<template>
  <div class="page__wr page__wr_hidden">
    <Lines v-show="!isMobile" />
    <section class="section born">
      <div class="container">
        <h1 class="born-title section__header">{{ title }}</h1>
      </div>
    </section>
    <component
      :is="block.component_name | componentValidName"
      v-for="(block, index) in componentsList"
      :key="`footer_${index}`"
      :content="block"
      :scroll-number="scrollNumber"
      :is-mobile="isMobile"
      :type="block.type"
    ></component>
  </div>
</template>

<script>
import Lines from '~/components/ui/lines/lines';
import Slider from '~/components/born/slider.vue';
import TextBlock from '~/components/born/block.vue';
export default {
  components: {
    Lines,
    Slider,
    TextBlock
  },
  async asyncData({ $axios, $config: { baseAPI } }) {
    const [contentRes, componentsRes] = await Promise.all([
      $axios.get(`${baseAPI}/ _born`),
      $axios.get(`${baseAPI}/ _born/components`)
    ]);
    return {
      title: contentRes.data.title,
      componentsList: componentsRes.data._born
    };
  },
  data() {
    return {
      lastScrollFirst: 0,
      lastScrollSecond: 0,
      scrollNumber: 800,
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
    window.addEventListener('scroll', this.handleScroll);
    const firstBlockList = document.querySelectorAll('.block-list')[0];
    const secondBlockList = document.querySelectorAll('.block-list')[1];
    firstBlockList.style.paddingBottom = firstBlockList.offsetTop + 'px';
    secondBlockList.style.paddingBottom = secondBlockList.offsetTop + 'px';
    firstBlockList.querySelector('.block-before').style.height =
      firstBlockList.offsetTop + 'px';
    firstBlockList.querySelector('.block-after').style.height =
      firstBlockList.offsetTop + 'px';
    secondBlockList.querySelector('.block-before').style.height =
      secondBlockList.offsetTop + 'px';
    secondBlockList.querySelector('.block-after').style.height =
      secondBlockList.offsetTop + 'px';
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    gsapTranslate() {
      Array.from(document.querySelectorAll('.born-title')).forEach((item) => {
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
    },
    handleScroll() {
      this.firstBlock();
      this.secondBlock();
    },
    firstBlock() {
      const firstBlock = document.querySelectorAll('.block')[0];
      const scrollFirstBlock = firstBlock.getBoundingClientRect().top.toFixed();
      if (scrollFirstBlock < 0) {
        if (this.lastScrollFirst > Math.abs(Number(scrollFirstBlock))) {
          Array.from(firstBlock.querySelectorAll('.block-list-item')).forEach(
            (item, index) => {
              if (
                Math.abs(Number(scrollFirstBlock)) <
                index * this.scrollNumber
              ) {
                if (index === 0) {
                  return;
                }
                firstBlock
                  .querySelectorAll('.block-list-item')
                  [index - 1].classList.add('active');
                firstBlock
                  .querySelectorAll('.block-list-item')
                  [index - 1].classList.remove('up');
                firstBlock
                  .querySelectorAll('.block-list-item')
                  [index].classList.add('down');
              }
            }
          );
        } else {
          Array.from(firstBlock.querySelectorAll('.block-list-item')).forEach(
            (item, index) => {
              if (
                Math.abs(Number(scrollFirstBlock)) >
                (index + 1) * this.scrollNumber
              ) {
                if (
                  index + 1 ===
                  firstBlock.querySelectorAll('.block-list-item').length
                ) {
                  return;
                }
                firstBlock
                  .querySelectorAll('.block-list-item')
                  [index + 1].classList.add('active');
                firstBlock
                  .querySelectorAll('.block-list-item')
                  [index + 1].classList.remove('down');
                firstBlock
                  .querySelectorAll('.block-list-item')
                  [index].classList.remove('active');
                firstBlock
                  .querySelectorAll('.block-list-item')
                  [index].classList.add('up');
              }
            }
          );
        }
        this.lastScrollFirst = Math.abs(Number(scrollFirstBlock));
      }
    },
    secondBlock() {
      const secondBlock = document.querySelectorAll('.block')[1];
      const scrollSecondBlock = secondBlock
        .getBoundingClientRect()
        .top.toFixed();
      if (scrollSecondBlock < 0) {
        if (this.lastScrollSecond > Math.abs(Number(scrollSecondBlock))) {
          Array.from(secondBlock.querySelectorAll('.block-list-item')).forEach(
            (item, index) => {
              if (
                Math.abs(Number(scrollSecondBlock)) <
                index * this.scrollNumber
              ) {
                if (index === 0) {
                  return;
                }
                secondBlock
                  .querySelectorAll('.block-list-item')
                  [index - 1].classList.add('active');
                secondBlock
                  .querySelectorAll('.block-list-item')
                  [index - 1].classList.remove('up');
                secondBlock
                  .querySelectorAll('.block-list-item')
                  [index].classList.add('down');
              }
            }
          );
        } else {
          Array.from(secondBlock.querySelectorAll('.block-list-item')).forEach(
            (item, index) => {
              if (
                Math.abs(Number(scrollSecondBlock)) >
                (index + 1) * this.scrollNumber
              ) {
                if (
                  index + 1 ===
                  secondBlock.querySelectorAll('.block-list-item').length
                ) {
                  return;
                }
                secondBlock
                  .querySelectorAll('.block-list-item')
                  [index + 1].classList.add('active');
                secondBlock
                  .querySelectorAll('.block-list-item')
                  [index + 1].classList.remove('down');
                secondBlock
                  .querySelectorAll('.block-list-item')
                  [index].classList.remove('active');
                secondBlock
                  .querySelectorAll('.block-list-item')
                  [index].classList.add('up');
              }
            }
          );
        }
        this.lastScrollSecond = Math.abs(Number(scrollSecondBlock));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page__wr {
  padding-top: 90px;
  position: relative;
  @include media(767px) {
    padding-top: 80px;
  }
}
.born {
  padding: vw(65px) 0;
  @include media(767px) {
    padding: 48px 0 24px;
  }
  &-title {
    text-transform: uppercase;
    text-align: left;
    opacity: 0;
    transform: translateX(-100px);
  }
}
</style>
