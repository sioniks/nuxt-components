<template>
  <div class="map">
    <client-only>
      <MglMap
        :access-token="accessToken"
        :center="coordinates"
        :map-style.sync="mapStyle"
      >
        <MglGeolocateControl ref="geolocateControl" />
        <MglMarker :coordinates="coordinates" color="#D2131C" />
      </MglMap>
    </client-only>
    <div class="map-info">
      powered by
      <LogoManIcon />
    </div>
    <Search @search="search" />
  </div>
</template>

<script>
import LogoManIcon from '~/assets/images/icons/logo-man.svg';
import Search from '~/components/search/search';
export default {
  components: {
    LogoManIcon,
    Search
  },
  data() {
    return {
      accessToken:
        'pk.eyJ1IjoibWlrZWhhbWlsdG9uMDAiLCJhIjoiNDVjS2puUSJ9.aLvWM5BnllUGJ0e6nwMSEg', // your access token. Needed if you using Mapbox maps
      mapStyle: 'mapbox://styles/mapbox/streets-v11', // your map style,
      coordinates: [34550.450967, 34530.522373]
    };
  },
  methods: {
    search(value) {
      this.$emit('search', value);
    }
  }
};
</script>
<style lang="scss" scoped>
.map {
  height: vw(520px);
  margin-bottom: vw(46px);
  position: relative;
  &-info {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-1b;
    background: #041c30;
    padding: vw(10px);
    color: $gray;
    text-transform: uppercase;
    font-size: vw(18px);
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
    svg {
      margin-left: vw(12px);
      width: vw(37px);
    }
  }
}
</style>
