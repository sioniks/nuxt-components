<template>
  <section class="section section-map">
    <client-only>
      <l-map
        ref="map"
        :options="leafletMapOptions"
        :center="[Number(lat), Number(lng)]"
        @click="unlockZoom"
      >
        <l-tile-layer ref="tileLayer" :url="url"></l-tile-layer>
        <l-marker :lat-lng="[+lat, +lng]" :icon="icon"></l-marker>
      </l-map>
    </client-only>
  </section>
</template>

<script>
let L = { icon() {} };
if (process.browser) L = require('leaflet');
export default {
  props: {
    lng: {
      type: String,
      default: null
    },
    lat: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      url:
        'https://tile.jawg.io/jawg-light/{z}/{x}/{y}.png?access-token=zUZZ1gkluuPPVi23PzdF3R1VJlX48uxOtWbK4cXHfuvfqy90STkZM72SxT75PzbE',
      icon: L.icon({
        iconUrl: require('~/assets/images/icons/mappng.png')
      }),
      leafletMapOptions: {
        zoom: 16,
        maxZoom: 18,
        maxNativeZoom: 18,
        minZoom: 5,
        minNativeZoom: 5,
        scrollWheelZoom: false
      }
    };
  },
  methods: {
    unlockZoom(e) {
      console.log(e.target);
    }
  }
};
</script>

<style lang="scss">
.section-map {
  margin: 145px 0 105px;
  height: 500px;
  .leaflet-marker-pane img {
    margin-left: -12px;
    margin-top: -41px;
    width: 25px;
    height: 40px;
  }
  @include media(767px) {
    height: 460px;
    margin: 64px 0 0;
  }
}
</style>
