<template>
  <div
    class="element"
    :class="{
      'swiper-slide': slider
    }"
  >
    <div class="element-descr">
      <div class="element_title" v-html="block.title"></div>
      <div
        class="element_subtitle"
        v-html="block.tabs[activeTab].description"
      ></div>
    </div>
    <div class="element-img">
      <img
        :src="block.tabs[activeTab].image.url"
        :alt="block.tabs[activeTab].image.custom_properties.seo_alt"
      />
    </div>
    <div class="element_tabs">
      <div
        v-for="(item, ind) in block.tabs"
        :key="ind"
        class="element_tab"
        :class="{ active: ind === activeTab }"
        @click="setActiveTab(ind)"
      >
        {{ item.tab_name }}
      </div>
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
  },
  data() {
    return {
      activeTab: 0
    };
  },
  methods: {
    setActiveTab(el) {
      this.activeTab = el;
    }
  }
};
</script>
