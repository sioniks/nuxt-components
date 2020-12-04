<template>
  <div class="page__wr">
    <section class="section stories">
      <div class="container">
        <div class="stories-top">
          <h2 class="stories-title section__header gsapLeftStories">
            {{ title }}
          </h2>
          <div class="stories-right">
            <div class="stories-right-item gsapBottomStories" data-delay="0.2">
              <Select
                :items="busModels"
                :title="'All cases'"
                :load-id="getRouteBusId"
                @changeSelect="changeModels"
              />
            </div>
            <div class="stories-right-item gsapBottomStories" data-delay="0.4">
              <Select
                :items="regions"
                :title="'All regions'"
                :load-id="getRouteRegionId"
                @changeSelect="changeRegions"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <StoriesSection
      v-for="(item, index) in items"
      :key="item.id"
      :flag="animateFlag"
      :index="index"
      :item="item"
    />
    <section v-if="total > 1">
      <div class="container">
        <Pagination
          :current="currentPage"
          :count="total"
          :type="'stories'"
          :is-mobile="isMobile"
          @change="changePage"
          @showMore="showMore"
        />
      </div>
    </section>
  </div>
</template>

<script>
import StoriesSection from '~/components/stories/stories-section';
import Pagination from '~/components/pagination/pagination';
import Select from '~/components/ui/select/select';
export default {
  components: {
    StoriesSection,
    Pagination,
    Select
  },
  async asyncData({ $axios, $config: { baseAPI }, route }) {
    const [contentRes, itemsRes, busRes, zonesRes] = await Promise.all([
      $axios.get(`${baseAPI}/story`),
      $axios.get(
        `${baseAPI}/story/items?page=${
          'page' in route.query ? route.query.page : 1
        }${'busId' in route.query ? `&bus_model_id=${route.query.busId}` : ''}${
          'regionId' in route.query ? `&zone_id=${route.query.regionId}` : ''
        }&per_page=5`
      ),
      $axios.get(`${baseAPI}/story/bus_models`),
      $axios.get(`${baseAPI}/story/zones`)
    ]);
    return {
      title: contentRes.data.title,
      items: itemsRes.data.data,
      total: itemsRes.data.meta.last_page,
      currentPage: itemsRes.data.meta.current_page,
      busModels: busRes.data,
      regions: zonesRes.data
    };
  },
  data() {
    return {
      busId: null,
      regionId: null,
      animateFlag: true,
      isMobile: false,
      mobileWidth: 768
    };
  },
  computed: {
    getRouteBusId() {
      return 'busId' in this.$route.query ? this.$route.query.busId : null;
    },
    getRouteRegionId() {
      return 'regionId' in this.$route.query
        ? this.$route.query.regionId
        : null;
    }
  },
  mounted() {
    if (this.$route.query.busId) {
      this.busId = this.$route.query.busId;
    }
    if (this.$route.query.regionId) {
      this.regionId = this.$route.query.regionId;
    }
    setTimeout(() => {
      this.gsapTranslate();
    }, 500);
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    async fetchPageItems() {
      const res = await this.$axios.$get(
        `${this.$config.baseAPI}/story/items?page=${this.currentPage}${
          this.busId ? `&bus_model_id=${this.busId}` : ''
        }${this.regionId ? `&zone_id=${this.regionId}` : ''}&per_page=5`
      );
      return res;
    },
    onResize(event) {
      if (event) {
        this.isMobile = this.mobileWidth > event.target.innerWidth;
      } else {
        this.isMobile = this.mobileWidth > window.innerWidth;
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.$router.push({
        query: { ...this.$route.query, page: this.currentPage }
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      Promise.all([this.fetchPageItems()]).then((resp) => {
        this.items = resp[0].data;
        this.total = resp[0].meta.last_page;
        this.animateFlag = false;
      });
    },
    changeModels(model) {
      this.busId = model;
      this.$router.push({
        query: { ...this.$route.query, busId: this.busId || undefined }
      });
      Promise.all([this.fetchPageItems()]).then((resp) => {
        this.items = resp[0].data;
        this.total = resp[0].meta.last_page;
        this.animateFlag = false;
      });
    },
    changeRegions(region) {
      this.regionId = region;
      this.$router.push({
        query: { ...this.$route.query, regionId: this.regionId || undefined }
      });
      Promise.all([this.fetchPageItems()]).then((resp) => {
        this.items = resp[0].data;
        this.total = resp[0].meta.last_page;
        this.animateFlag = false;
      });
    },
    showMore(page) {
      this.currentPage = page + 1;
      this.$router.replace({
        query: { ...this.$route.query, page: this.currentPage }
      });
      Promise.all([this.fetchPageItems()]).then((resp) => {
        this.items = [...this.items, ...resp[0].data];
      });
    },
    gsapTranslate() {
      Array.from(
        document.querySelectorAll('.gsapBottomStories, .gsapLeftStories')
      ).forEach((item) => {
        const delay = +item.dataset.delay || 0;
        const duration = +item.dataset.duration || 0.8;
        const hook = item.dataset.hook || 1;
        const scene = this.$scrollmagic
          .scene({
            offset: -100,
            triggerElement: item,
            triggerHook: hook,
            duration: 0,
            reverse: false
          })
          .setTween(item, duration, {
            delay,
            transform: 'translate(0, 0)',
            opacity: 1,
            overwrite: false,
            lazy: true
          });
        this.$scrollmagic.addScene(scene);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.stories {
  padding: vw(65px) 0 0;
  position: relative;
  z-index: 2;
  @include media(767px) {
    padding: 48px 0 20px;
  }
  &-top {
    display: flex;
    justify-content: space-between;
    @include media(767px) {
      flex-direction: column;
    }
  }
  &-title {
    text-transform: uppercase;
    text-align: left;
  }
  .pagination {
    margin-top: vw(10px);
  }
  &-right {
    display: flex;
    align-items: center;
    margin-top: vw(-20px);
    @include media(767px) {
      width: calc(100% + 32px);
      margin-left: -16px;
      margin-top: 15px;
    }
    &-item {
      width: vw(396px);
      margin-left: vw(42px);
      margin-right: -23px;
      @include media(767px) {
        width: 50%;
        margin: 0;
      }
      &:first-child {
        margin-right: 0;
      }
    }
  }
}
.page__wr {
  padding-top: 90px;
  @include media(767px) {
    padding-top: 80px;
  }
}
.gsapBottomStories {
  opacity: 0;
  transform: translateY(100px);
}
.gsapLeftStories {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
