<template>
  <section class="section story story_quote">
    <div class="story-content story-content_fluid">
      <div class="quote-left">
        <div class="gsapTopQuote" data-delay="0.2">
          <QuoteIcon />
        </div>
        <blockquote
          class="gsapBottomQuote"
          data-delay="0.2"
          v-html="content.quote"
        ></blockquote>
      </div>
      <div class="quote-right">
        <h4 class="quote-right-title gsapBottomQuote" data-delay="0.2">
          {{ content.title }}
        </h4>
        <div
          class="quote-right-text gsapBottomQuote"
          data-delay="0.2"
          v-html="content.extra.text_editor"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import QuoteIcon from '~/assets/images/icons/quote.svg';
export default {
  components: { QuoteIcon },
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
      Array.from(
        document.querySelectorAll('.gsapTopQuote, .gsapBottomQuote')
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
    }
  }
};
</script>
<style lang="scss" scoped>
.gsapBottomQuote {
  opacity: 0;
  transform: translateY(100px);
}
.gsapTopQuote {
  opacity: 0;
  transform: translateY(-100px);
}
.story {
  &_quote {
    padding: vw(24px) 0;
    @include media(767px) {
      padding: 16px 0;
    }
  }
  &-content {
    display: flex;
    @include media(767px) {
      flex-direction: column;
    }
  }
}
.quote {
  &-left {
    width: vw(224px);
    padding-right: vw(38px);
    flex-shrink: 0;
    text-align: left;
    display: flex;
    flex-direction: column;
    font-family: $font-1b;
    @include media(767px) {
      width: 100%;
      padding: 0;
      margin-bottom: 48px;
    }
    svg {
      width: vw(30px);
      height: vw(22px);
      margin-bottom: vw(24px);
      @include media(767px) {
        width: 30px;
        height: 21px;
        margin-bottom: 12px;
      }
    }
  }
  &-right {
    width: 100%;
    &-title {
      text-align: left;
      font-family: $font-2b;
      font-size: vw(32px);
      line-height: 1.25;
      margin-bottom: vw(24px);
      text-transform: uppercase;
      @include media(767px) {
        font-size: 24px;
        margin-bottom: 20px;
      }
    }
  }
  blockquote {
    font-family: $font-1b;
    font-size: vw(24px);
    line-height: 1.3;
    p {
      font-family: $font-1b;
      font-size: vw(24px);
      line-height: 1.3;
    }
  }
}
</style>
<style lang="scss">
.story_quote {
  .quote {
    &-left {
      p {
        font-size: vw(24px);
        line-height: 1.3;
        font-style: italic;
        @include media(767px) {
          font-size: 20px;
          line-height: 1.4;
        }
      }
    }
  }
}
</style>
