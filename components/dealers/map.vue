<template>
  <div class="map">
    <Search @search="search" />
    <div class="map-overlay">
      <div class="map-overlay-text">
        No dealers or distributors were found for your request
      </div>
      <div class="map-overlay-btns">
        <Button btn-text="Become dealer" btn-type="red" />
        <Button btn-text="Become distributor" btn-type="tr-w" />
      </div>
    </div>
  </div>
</template>

<script>
import Search from '~/components/search/search';
import Button from '~/components/ui/btn/btn';
export default {
  components: {
    Search,
    Button
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
  min-height: vw(520px);
  margin-bottom: vw(46px);
  position: relative;
  &-overlay {
    background: #041c30;
    mix-blend-mode: normal;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 10%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-text {
      font-family: $font-1b;
      font-size: vw(24px);
      color: #ffffff;
      line-height: 1.17;
    }
    &-btns {
      margin-top: vw(44px);
    }
  }
}
</style>
