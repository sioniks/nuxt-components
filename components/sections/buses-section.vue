<template>
  <section
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
      threshold: 0.8
    }"
    class="section section__buses"
  >
    <div class="container bus__wr">
      <BusCard
        v-for="(item, index) in block.short_about_buses"
        :key="index"
        :item="item"
        :animate="animate"
        @show3d="show"
      />
    </div>
    <!-- <client-only> -->
    <Popup v-if="popup3d" @close="close">
      <div class="view__content">
        <!-- <iframe
            :src="block.short_about_buses[0].view_360.link"
            frameborder="0"
          ></iframe> -->

        <iframe
          :src="block.short_about_buses[0].view_360[0].link"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="iframe_view"
        ></iframe>

        <!-- <img :src="require(`~/assets/images/3dview.png`)" class="view--3d" /> -->
        <!-- <div class="btns_wr">
          <Button btn-type="tr-w" btn-text="INNER 360° view" />
          <Button btn-type="tr-w" btn-text="OUTDOOR 360° view" />
          <Button btn-type="tr-w" btn-text="FRONT 360° view" />
        </div> -->
      </div>
    </Popup>
    <!-- </client-only> -->
  </section>
</template>

<script>
import BusCard from '~/components/buses/bus-card';
import Popup from '~/components/ui/popup/popup';
// import Button from '~/components/ui/btn/btn';

export default {
  components: { BusCard, Popup },
  props: {
    block: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      animate: false,
      popup3d: false,
      links: []
    };
  },
  methods: {
    close() {
      this.popup3d = false;
    },
    show(payload) {
      this.popup3d = true;
      this.links = payload.link;
    },
    visibilityChanged(isVisible) {
      this.animate = isVisible;
    }
  }
};
</script>

<style scoped lang="scss">
.section__buses {
  margin: 0 auto 5vw;
  @include media(1200px) {
    margin-bottom: 64px;
  }
}
.iframe_view {
  width: 80vw;
  height: 70vh;
}
.bus__wr {
  display: flex;
  justify-content: space-between;
  @include media(767px) {
    flex-direction: column;
  }
}

.view__content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 70%;
  transform: translate(-50%, -50%);
  .img {
    width: 100%;
  }
  .view--3d {
    width: 100%;
  }
}
.btns_wr {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2vw;
  .btn {
    margin: 0 vw(8px);
  }
}
</style>
