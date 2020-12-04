<template>
  <div class="page__wr">
    <Lines />
    <TopSection />
    <Map @search="search" />
    <template v-if="searchFlag">
      <Tabs :items="tabsItem" />
      <Result :items="cities" :arrows="true" :type="'service'" />
      <Configurate />
    </template>
    <template v-else>
      <InfoBlock />
      <ServiceFeature />
    </template>
  </div>
</template>

<script>
import TopSection from '~/components/service/top-section';
import ServiceFeature from '~/components/service/service-feature';
import InfoBlock from '~/components/info-blocks/infoblock';
import Result from '~/components/service/result';
import Map from '~/components/service/map';
import Configurate from '~/components/service/configurate';
import Tabs from '~/components/service/city-tabs';
import Lines from '~/components/ui/lines/lines';
export default {
  components: {
    TopSection,
    ServiceFeature,
    InfoBlock,
    Result,
    Map,
    Configurate,
    Tabs,
    Lines
  },
  data() {
    return {
      searchFlag: false,

      ],
      tabsItem: [
        'Kyiv',
        'Lviv',
        'Kharkiv',
        'Dnipro',
        'Odesa',
        'Kydsvsdbsdbsdbsdsdiv',
        'Lviv',
        'Kharkiv',
        'Dnipro',
        'Odesa',
        'Kyiv',
        'Lviv',
        'Kharkiv',
        'Dnipro',
        'Odesa',
        'Kyiv',
        'Lviv',
        'Kharkiv',
        'Dnipro',
        'Odesa'
      ]
    };
  },
  methods: {
    search(value) {
      if (value && value.length) {
        this.searchFlag = true;
      } else {
        this.searchFlag = false;
      }
    }
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/vue-mapbox@latest/dist/vue-mapbox.css'
      }
    ]
  }
};
</script>
<style lang="scss" scoped>
.page__wr {
  padding-top: 90px;
  overflow: hidden;
  position: relative;
}
</style>
