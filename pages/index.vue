<template>
  <div class="page__wr">
    <!-- <div v-if="$fetchState.pending">Load------------------</div> -->
    <template v-for="(block, index) in content">
      <component
        :is="component(block.component_name, block.type)"
        :key="index"
        :block="block"
        :is-tablet="isTablet"
        :is-mobile="isMobile"
      ></component>
    </template>
  </div>
</template>

<script>
// import axios from 'axios';
import BusParallax from '~/components/sections/bus-parallax';
import VideoSection from '~/components/sections/video-section';
import QuoteSection from '~/components/sections/quote-section';
import BusesSection from '~/components/sections/buses-section';
import GallerySection from '~/components/sections/gallery-section';
import ServiceSection from '~/components/sections/service-section';
import OwnershipSection from '~/components/sections/ownership-section';
import ContactUsBlock from '~/components/contacts/block-contacts';
import MediaSection from '~/components/sections/media-section';
import SafetySection from '~/components/sections/safety-section';
import AwardSection from '~/components/sections/award-section';
import ImgSection from '~/components/bunners/config-img-bunner';
import SliderSection from '~/components/slider/slider';
import MapSection from '~/components/sections/mapimg-section';
import ContactsSection from '~/components/sections/contacts-section';

export default {
  layout: 'dark-head',
  // middleware: ['locale'],
  components: {
    BusParallax,
    VideoSection,
    QuoteSection,
    BusesSection,
    GallerySection,
    ServiceSection,
    OwnershipSection,
    ContactUsBlock,
    MediaSection,
    SafetySection,
    AwardSection,
    ImgSection,
    SliderSection,
    MapSection,
    ContactsSection
  },
  async asyncData({ $axios, $config: { baseAPI } }) {
    const response = await $axios.$get(`${baseAPI}/main_page`);
    return response.components;
  },

  data() {
    return {
      observer: null,
      isTablet: false,
      isMobile: false,
      tabletWidth: 1201,
      mobileWidth: 768
    };
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize(event) {
      if (event) {
        this.isTablet = this.tabletWidth > event.target.innerWidth;
        this.isMobile = this.mobileWidth > event.target.innerWidth;
      } else {
        this.isTablet = this.tabletWidth > window.innerWidth;
        this.isMobile = this.mobileWidth > window.innerWidth;
      }
    },
    component(name, type) {
      if (name === 'main_banner') {
        return 'BusParallax';
      } else if (name === 'video_block') {
        return 'VideoSection';
      } else if (name === 'quote') {
        return 'QuoteSection';
      } else if (name === 'short_about_bus_group') {
        return 'BusesSection';
      } else if (name === 'photo_video_component') {
        return 'GallerySection';
      } else if (name === 'table') {
        return 'ServiceSection';
      } else if (name === 'value_option') {
        return 'OwnershipSection';
      } else if (name === 'banner' && type === 'contacts') {
        return 'ContactUsBlock';
      } else if (name === 'media_coverage') {
        return 'MediaSection';
      } else if (name === 'tab_component') {
        return 'SafetySection';
      } else if (name === 'pictures') {
        return 'AwardSection';
      } else if (name === 'banner' && type === 'configurator') {
        return 'ImgSection';
      } else if (name === 'story_slider') {
        return 'SliderSection';
      } else if (name === 'map_component') {
        return 'MapSection';
      } else if (name === 'form_component') {
        return 'ContactsSection';
      }
    }
  }
};
</script>
