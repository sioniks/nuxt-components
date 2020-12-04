<template>
  <a :href="item.extra.award_link" class="award__link" :title="item.title">
    <div class="award">
      <div class="img-wr">
        <picture>
          <source
            :srcset="item.image.conversions.medium"
            media="(max-width: 1200px)"
          />
          <img
            :srcset="item.image.url"
            :alt="item.image.custom_properties.seo_alt"
            class="award__img"
          />
        </picture>
      </div>
      <div class="award__title">{{ item.title }}</div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  }
};
</script>

<style scoped lang="scss">
.award {
  border: 1px solid #ececec;
  // background: #ffffff;
  padding: 3vw 2vw 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: vw(341px);
  @include media(1200px) {
    min-height: 252px;
    height: auto;
    padding: 32px 40px;
  }
  &:before,
  &:after {
    content: '';
    width: 2px;
    height: 0;
    position: absolute;
    transition: all 0.2s linear;
    background: $red;
  }
}
.award__link {
  position: relative;
  border: none;
  cursor: pointer;
  background: #ffffff;
  &:before,
  &:after {
    content: '';
    width: 0;
    height: 2px;
    position: absolute;
    transition: all 0.2s linear;
    background: $red;
  }
  &:hover {
    &:before,
    &:after {
      width: 100%;
    }
    .award {
      &:before,
      &:after {
        height: 100%;
      }
    }
  }
}


//-----------
.award__link:after {
  left: 0;
  top: 0;
  transition-delay: 0s;
}
.award__link .award:after {
  transition-delay: 0.2s;
  left: 0;
  bottom: 0;
}
.award__link:before {
  right: 0;
  bottom: 0;
  transition-delay: 0.4s;
}
.award__link .award:before {
  transition-delay: 0.6s;
  right: 0;
  top: 0;
}

.award__link:hover:after {
  transition-delay: 0.6s;
}
.award__link:hover .award:after {
  transition-delay: 0.4s;
}
.award__link:hover:before {
  transition-delay: 0.2s;
}
.award__link:hover .award:before {
  transition-delay: 0s;
}

.img-wr {
  position: relative;
  width: 50%;
  height: vw(197px);
  margin-bottom: vw(24px);
  @include media(1200px) {
    margin-bottom: 20px;
    height: 134px;
  }
  @include media(767px) {
    width: 100%;
    max-width: 300px;
  }
}
.award__img {
  width: 100%;
  height: 100%;
  object-position: 50% 50%;
  object-fit: contain;
}
.award__title {
  font-family: $font-2b;
  font-size: vw(24px);
  line-height: 1.4;
  color: #041c30;
  @include media(1200px) {
    font-size: 18px;
  }
  @include media(767px) {
    margin-top: auto;
    text-align: center;
  }
}
</style>
