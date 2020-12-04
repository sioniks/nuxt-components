<template>
  <div
    class="element"
    :class="{
      'with--bg': block.type === 'with_background',
      'swiper-slide': slider
    }"
  >
    <img
      v-if="block.type === 'with_background'"
      :src="block.image_bg.url"
      class="element-img__bg"
      :alt="block.image_bg.custom_properties.seo_alt"
    />
    <div class="element-descr">
      <div class="element_title" v-html="block.title"></div>
      <div class="element_subtitle" v-html="block.description"></div>
    </div>
    <div v-if="block.type === 'simple'" class="element-img">
      <img
        :src="block.image.url"
        :alt="block.image.custom_properties.seo_alt"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: null
    },
    slider: {
      type: Boolean,
      default: false
    }
  }
};
</script>
