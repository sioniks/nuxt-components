<template>
  <section class="spec-blocks">
    <Lines v-if="!isMobile" />
    <div class="container">
      <div class="spec-wr">
        <div class="spec-title">{{ block.title }}</div>

        <div class="spec-items">
          <div
            v-for="(spec, index) in block.items"
            :key="index"
            class="spec-item"
            :class="[spec.type === 'image' ? 'spec-item_image' : '']"
          >
            <template v-if="spec.type === 'image'">
              <picture class="img--bg">
                <source
                  :srcset="spec.bg_image.conversions.medium"
                  type="image/webp"
                />
                <img
                  :src="spec.bg_image.url"
                  :alt="spec.bg_image.custom_properties.seo_alt"
                />
              </picture>
              <div class="title">
                <LogoIcon class="logo-sm" />
              </div>
              <span class="subtitle"
                >{{ spec.content }}

                <picture class="img--logo">
                  <source
                    :srcset="spec.icon.conversions.medium"
                    type="image/webp"
                  />
                  <img
                    :src="spec.icon.url"
                    :alt="spec.icon.custom_properties.seo_alt"
                  />
                </picture>
              </span>
            </template>
            <template v-else>
              <div class="spec-item__title">{{ spec.title }}</div>
              <div class="spec-item__descr">{{ spec.content }}</div>
            </template>
          </div>
        </div>

        <LoadLink
          :link-text="block.btn_file_title"
          :file-url="block.specification_file.url"
          class="spec-link"
        />
      </div>
    </div>
  </section>
</template>
<script>
import LogoIcon from '~/assets/images/icons/ -logo.svg';
// import LogoTrIcon from '~/assets/images/icons/logo-tr.svg';
// import LogoManIcon from '~/assets/images/icons/logo-man.svg';
import Lines from '~/components/ui/lines/lines';
import LoadLink from '~/components/ui/load-link/load-link';
export default {
  components: {
    LoadLink,
    LogoIcon,
    Lines
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
    return {};
  }
};
</script>

<style lang="scss">
.spec-blocks {
  padding-top: 180px;
  padding-bottom: vw(88px);
  font-family: $font-1b;
  position: relative;
  overflow: hidden;
  .lines {
    transform: translateX(43%);
  }
  @include media(767px) {
    padding: 48px 0 56px;
  }
}
.spec-wr {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 1em;
  @include media(767px) {
    display: flex;
    flex-direction: column;
  }
}
.spec-title {
  font-family: $font-2b;
  grid-row: 1/2;
  font-size: vw(48px);
  line-height: 1.2;
  text-transform: uppercase;
  color: #003152;
  @include media(767px) {
    font-size: 32px;
    margin-bottom: 32px;
  }
}
.spec-link {
  font-family: $font-2b;
  grid-row: 2/4;
  &.load-link {
    cursor: auto;
    a {
      @include media(767px) {
        display: flex;
        justify-content: center;
        padding: 16px;
        margin-top: 16px;
        border: 1px solid #e9ebed;
      }
    }
  }
}
.spec-items {
  grid-row: 1/4;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(160px, auto);
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  overflow: hidden;
  @include media(767px) {
    display: block;
    width: 100%;
  }
}
.spec-item {
  background: #f9fafa;
  font-size: vw(16px);
  line-height: 1.2;
  color: #041c30;
  padding: vw(24px) vw(24px) 0;
  display: grid;
  grid-template-rows: 1fr 1fr;
  position: relative;
  overflow: hidden;
  @include media(767px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px 24px;
    min-height: 80px;
    font-size: 16px;
    line-height: 1.185;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &_image {
    @include media(767px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  // &.title-item {
  //   background: #041c30;
  // }
  .title {
    width: max-content;
    z-index: 1;
    color: #ffffff;
  }
  .logo-sm {
    position: absolute;
    fill: #ffffff;
    stroke: #ffffff;
    width: vw(101px);
    left: 7%;
    top: vw(30px);
    @include media(767px) {
      position: relative;
      top: 0;
      left: 0;
      width: 100px;
      svg {
        width: 100%;
      }
    }
  }

  .subtitle {
    z-index: 1;
    text-transform: uppercase;
    font-size: vw(14px);
    color: $gray;
    justify-self: end;
    @include media(767px) {
      font-size: 14px;
      text-align: right;
      margin-left: auto;
      position: absolute;
      right: 24px;
      bottom: 10px;
    }
    .svg-icon {
      margin-left: vw(10px);
    }
  }
  .img--logo {
    @include media(767px) {
      margin-left: 16px;
    }
  }
  .img--bg {
    z-index: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: left top;
    }
  }
}
.spec-item__descr {
  font-family: $font-2b;
  align-self: end;
  justify-self: end;
  font-size: vw(48px);
  line-height: 1.33;
  text-transform: uppercase;
  color: #041c30;
  @include media(767px) {
    white-space: nowrap;
    font-size: 26px;
    margin-left: 18px;
  }
}
</style>
