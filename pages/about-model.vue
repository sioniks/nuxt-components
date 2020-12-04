<template>
  <div class="page__wr">
    <bus-head-slider :slider-data="slider"></bus-head-slider>
    <template v-for="(block, index) in content">
      <component
        :is="component(block.component_name, block.type)"
        :key="index"
        :block="block"
        :is-tablet="isTablet"
        :is-mobile="isMobile"
        :buses="true"
      ></component>
    </template>
  </div>
</template>

<script>
import SpecBlocks from '~/components/spec-blocks/spec-blocks';
import FotoVideo from '~/components/sections/gallery-section';
import TechSpecBlocks from '~/components/spec-blocks/tech-spec';
import InfoBlocks from '~/components/info-blocks/infoblock';
import CapabilityBlock from '~/components/capability/capability-block';
import RangeOfUses from '~/components/range-uses/range-uses';
import SafetySection from '~/components/safety/safety';
import ComfortSection from '~/components/comfort-sec/comfort-sec';
import OwnershipSection from '~/components/sections/ownership-section-noanim';
import EfficiencySection from '~/components/sections/efficiency-section';
import ImgSection from '~/components/bunners/config-img-bunner';
import SliderSection from '~/components/slider/slider';
import MapSection from '~/components/sections/mapimg-section';
import ContactsSection from '~/components/sections/contacts-section';

export default {
  layout: 'dark-head__about',
  components: {
    SpecBlocks,
    FotoVideo,
    TechSpecBlocks,
    InfoBlocks,
    CapabilityBlock,
    RangeOfUses,
    SafetySection,
    ComfortSection,
    OwnershipSection,
    EfficiencySection,
    ImgSection,
    SliderSection,
    MapSection,
    ContactsSection
  },
  async asyncData({ $axios, $config: { baseAPI }, $cookies }) {
    const [slider, sections] = await Promise.all([
      $axios.$get(`${baseAPI}/bus/ /slider_categories`, {
        headers: {
          'Accept-Language': $cookies.get('locale') || 'en'
        }
      }),
      $axios.$get(`${baseAPI}/bus/ /components`, {
        headers: {
          'Accept-Language': $cookies.get('locale') || 'en'
        }
      })
    ]);
    return { slider, content: sections.content };
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
      if (name === 'short_specification') {
        return 'SpecBlocks';
      } else if (name === 'photo_video_component') {
        return 'FotoVideo';
      } else if (name === 'tech_spec') {
        return 'TechSpecBlocks';
      } else if (name === 'cards') {
        return 'InfoBlocks';
      } else if (name === 'extreme_capability') {
        return 'CapabilityBlock';
      } else if (name === 'wide_range') {
        return 'RangeOfUses';
      } else if (name === 'pictures') {
        return 'SafetySection';
      } else if (name === 'element_tab') {
        return 'ComfortSection';
      } else if (name === 'value_option') {
        return 'OwnershipSection';
      } else if (name === 'calculator') {
        return 'EfficiencySection';
      } else if (name === 'banner') {
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

<style lang="scss" scoped>
.gallery__section .content-wr {
  margin-bottom: vw(56px);
}
</style>
