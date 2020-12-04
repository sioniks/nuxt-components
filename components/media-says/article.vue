<template>
  <app-link to="/" class="article" :style="{ background: content.bg_color }">
    <div class="article__top">
      <img :src="content.logo.url" alt="article-logo" class="article__logo" />
      <div v-if="!isMobile" class="article__resource">
        <div class="article__link">{{ content.site_link }}<IconChain /></div>
        <div class="article__countrie">{{ content.location }}</div>
      </div>
    </div>
    <div class="article__description" v-html="content.title"></div>
    <div v-if="isMobile" class="article__resource">
      <div class="article__link">{{ content.site_link }}<IconChain /></div>
      <div class="article__countrie">{{ content.location }}</div>
    </div>
  </app-link>
</template>

<script>
import IconChain from '~/assets/images/icons/chain.svg';

export default {
  components: { IconChain },
  props: {
    content: {
      type: Object,
      default: null
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.article {
  width: calc(50% - 9px);
  height: vw(290px);
  padding: vw(40px);
  color: #ffffff;
  display: block;
  margin-bottom: 18px;
  @include media(1200px) {
    padding: 20px;
  }
  @include media(767px) {
    width: 100%;
    height: auto;
    padding: 24px 24px 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &:hover {
    transform: translateY(-10px);
  }
  &:nth-child(odd) {
    margin-right: 18px;
    @include media(767px) {
      margin-right: 0;
    }
  }
}
.article__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
  min-height: 4vw;
  @include media(1200px) {
    margin-bottom: 15px;
  }
  @include media(767px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 24px;
  }
}
.article__logo {
  // max-width: 30%;
  height: 100%;
  max-height: vw(62px);
  @include media(1200px) {
    max-height: 36px;
  }
  @include media(767px) {
    max-height: 54px;
  }
}
.article__resource {
  max-width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @include media(767px) {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }
}
.article__link {
  font-size: vw(14px);
  line-height: 1.2;
  margin-right: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  @include media(1200px) {
    font-size: 10px;
  }
  @include media(767px) {
    font-size: 14px;
    margin: 0 0 20px;
  }
  .svg-icon {
    width: 1em;
    height: 1em;
    margin-left: 0.5em;
    fill: #ffffff;
    @include media(767px) {
      width: 12px;
      height: 12px;
      margin-left: 8px;
    }
  }
}
.article__countrie {
  font-size: vw(14px);
  line-height: 1.2;
  font-family: $font-2b;
  @include media(1200px) {
    font-size: 10px;
  }
  @include media(767px) {
    font-size: 12px;
  }
}
.article__description {
  font-size: vw(25px);
  line-height: 1.5;
  font-family: $font-2b;
  @include media(1200px) {
    font-size: 16px;
  }
  @include media(767px) {
    font-size: 22px;
    line-height: 1.5;
    margin-bottom: 24px;
  }
}
</style>
