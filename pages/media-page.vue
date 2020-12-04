<template>
  <div class="page__wr">
    <Lines />
    <section class="section">
      <div class="container">
        <div class="content__wr">
          <div class="section__header gsapLeftTitle">{{ title }}</div>
          <div
            class="description gsapBottomDescription"
            v-html="description"
          ></div>
        </div>
        <client-only>
          <div
            v-if="articles && articles.length > 0"
            v-masonry
            class="articles__wr masonry-container"
            item-selector=".article"
            transition-duration="0s"
          >
            <Article
              v-for="item in articles"
              :key="item.id"
              v-masonry-tile
              :content="item"
              :flag="animateFlag"
              :is-mobile="isMobile"
              @changeContent="changeContent"
            />
          </div>
        </client-only>
        <template v-if="total > 1">
          <Pagination
            :current="currentPage"
            :count="total"
            :is-mobile="isMobile"
            @change="changePage"
            @showMore="showMore"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import Lines from '~/components/ui/lines/lines';
import Article from '~/components/media-says/article-big';
import Pagination from '~/components/pagination/pagination';

export default {
  components: {
    Lines,
    Article,
    Pagination
  },
  async asyncData({ $axios, $config: { baseAPI } }) {
    const [contentRes, itemsRes] = await Promise.all([
      $axios.get(`${baseAPI}/media_coverage`),
      $axios.get(`${baseAPI}/media_coverage/items?page=1&per_page=10`)
    ]);
    return {
      title: contentRes.data.title,
      description: contentRes.data.extra.description,
      articles: itemsRes.data.data,
      total: itemsRes.data.meta.last_page
    };
  },
  data() {
    return {
      currentPage: 1,
      animateFlag: true,
      isMobile: false,
      mobileWidth: 768
    };
  },
  mounted() {
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
        `${this.$config.baseAPI}/media_coverage/items?page=${this.currentPage}&per_page=10`
      );
      return res;
    },
    showMore(page) {
      this.currentPage = page + 1;
      Promise.all([this.fetchPageItems()]).then((resp) => {
        this.articles = [...this.articles, ...resp[0].data];
        this.changeContent();
      });
    },
    onResize(event) {
      if (event) {
        this.isMobile = this.mobileWidth > event.target.innerWidth;
      } else {
        this.isMobile = this.mobileWidth > window.innerWidth;
      }
    },
    resetGrid() {
      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry();
      }
    },
    changeContent() {
      this.animateFlag = false;
      setTimeout(() => {
        this.resetGrid();
      }, 100);
    },
    changePage(page) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      Promise.all([this.fetchPageItems()]).then((resp) => {
        this.articles = resp[0].data;
        this.total = resp[0].meta.last_page;
        this.animateFlag = false;
      });
    },
    gsapTranslate() {
      Array.from(
        document.querySelectorAll('.gsapLeftTitle, .gsapBottomDescription')
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
.page__wr {
  padding-top: 90px;
  overflow: hidden;
  position: relative;
  @include media(767px) {
    padding-top: 80px;
  }
}
.section__header {
  text-align: left;
  margin-bottom: 0.8em;
  text-transform: uppercase;
  @include media(767px) {
    margin-bottom: 8px;
  }
}
.content__wr {
  padding: vw(65px) 0 vw(88px);
  @include media(767px) {
    padding: 48px 0 24px;
  }
}
.description {
  font-size: vw(24px);
  line-height: 1.3;
  color: #041c30;
  max-width: vw(620px);
  @include media(767px) {
    max-width: 100%;
    font-size: 18px;
    line-height: 1.44;
  }
}
.articles__wr {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  width: calc(100% + 2vw);
  margin-left: -1vw;
  position: relative;
  @include media(767px) {
    width: 100%;
    margin-left: 0;
  }
  &:after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    background: #f5f5f5;
    left: 50%;
    transform: translateX(-50%);
    @include media(767px) {
      display: none;
    }
  }
}
.nav__wr {
  display: flex;
  align-items: center;
  justify-content: center;
  .btn.tr-w {
    color: #041c30;
    margin-right: 2vw;
  }
  .one-b {
    font-family: $font-1b;
    font-size: vw(13px);
    line-height: vw(55px);
    text-transform: uppercase;
    height: vw(55px);
    background: none;
    transition: all 0.5s ease;
    padding: 0 vw(26px);
    border: 1px solid #ebebeb;
    outline: none;
    margin: 0 vw(8px);
    // cursor: url('/cursor1.svg'), pointer;
    cursor: pointer;
    &:first-child {
      padding: 0 vw(36px);
    }
    &:last-child {
      padding: 0 vw(36px);
    }
    &.dots {
      padding: 0 vw(5px);
      border: none;
    }
    &.active {
      background: $red;
      color: #ffffff;
    }
  }
}
.container {
  overflow: hidden;
}
.gsapLeftTitle {
  opacity: 0;
  transform: translateX(-100px);
}
.gsapBottomDescription {
  opacity: 0;
  transform: translateY(100px);
}
</style>
