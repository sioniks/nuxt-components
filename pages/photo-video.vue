<template>
  <div class="page__wr">
    <section
      class="section gallery"
      :class="[selected && selected.length > 0 ? 'selected' : '']"
    >
      <client-only>
        <transition name="fade">
          <Popup v-show="shareCode" class="code-popup" @close="closePopupCode">
            <div class="share-popup">
              <div class="share-popup-text">Link to share</div>
              <div class="share-popup-link">{{ getIrl }}</div>
              <div class="share-popup-btn" @click="copyLink">
                <Button btn-type="red" btn-text="Copy link" />
              </div>
              <input class="copy-input" type="text" :value="getIrl" />
            </div>
          </Popup>
        </transition>
      </client-only>
      <client-only>
        <transition name="fade">
          <Popup
            v-show="sliderPopup"
            class="slider-popup"
            @close="closePopupSlider"
          >
            <div class="slider-popup-content">
              <div
                v-swiper:mySwiper="optionsMain"
                @slideChange="slideChangeMain"
              >
                <div class="swiper-wrapper swiper-wrapper_gallery">
                  <div
                    v-for="(slide, index) in getAllItems"
                    :key="index"
                    class="swiper-slide"
                  >
                    <div class="img-wrapper">
                      <picture v-if="slide.type === 'image'">
                        <source
                          :srcset="
                            slide.type === 'image'
                              ? slide.image.conversions.medium
                              : slide.video_preview.conversions.medium
                          "
                          media="(max-width: 1200px)"
                        />
                        <img
                          :srcset="
                            slide.type === 'image'
                              ? slide.image.url
                              : slide.video_preview.url
                          "
                          :alt="
                            slide.type === 'image'
                              ? slide.image.custom_properties.seo_alt
                              : slide.video_preview.custom_properties.seo_alt
                          "
                          class="swiper-slide-img"
                        />
                      </picture>
                      <template v-else>
                        <youtube
                          :video-id="getVideoId(slide.video_link)"
                          :player-vars="videoOptions"
                          player-width="100%"
                          player-height="100%"
                          class="video"
                          @ready="ready"
                        ></youtube>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="buttons">
              <div slot="button-prev" class="swiper-button swiper-button-prev">
                <IconBtn />
              </div>
              <div slot="button-next" class="swiper-button swiper-button-next">
                <IconBtn />
              </div>
            </div>
            <div class="slider-popup-buttons">
              <div class="slider-popup-btn" @click="saveMedia(getCurrentElem)">
                <LoadIcon />
                Save
              </div>
              <div class="slider-popup-btn" @click="shareMedia(getCurrentElem)">
                <LoadIcon />
                Share
              </div>
            </div>
          </Popup>
        </transition>
      </client-only>
      <div class="container">
        <h2 class="gallery-title section__header gsapLeftTitle">
          Photo & Video
        </h2>
      </div>
      <div
        class="gallery-content"
        :class="{ 'flex-height': allItems[0] && allItems[0].length === 0 }"
      >
        <Filters
          :checkbox="{ ...checkBoxItem }"
          :query-params="queryParams"
          :search="searchString"
          :filters="filters"
          :scroll-flag="scrollFlag"
          :mobile-filters-flag="mobileFiltersFlag"
          :is-mobile="isMobile"
          @showCategory="showCategory"
          @showAll="showAll"
          @clearAll="clearAll"
          @endScroll="endScroll"
          @topScroll="topScroll"
          @closeFilters="closeFilters"
          @showResult="showResult"
        />
        <div class="gallery-pin" :class="{ 'pointer-none': saveProgress }">
          <div v-if="isMobile" class="gallery-pin-btn" @click="openFilters">
            <template v-if="queryParams"
              >Go to filter to see other media</template
            >
            <template v-else>Filter</template>
            <FiltersIconMobile />
          </div>
          <div
            v-if="allItems[0] && allItems[0].length === 0"
            class="gallery-pin-info"
          >
            <div class="gallery-pin-info-content">
              <div class="gallery-pin-info-text">
                No media found in your search parameters
              </div>
              <div @click="clearAll">
                <Button btn-type="red" btn-text="Reset search" />
              </div>
            </div>
            <GalleryLayoutMobile v-if="isMobile" />
            <GalleryLayout v-else />
          </div>
          <Gallery
            v-for="(item, index) in allItems"
            :key="index"
            :items="item"
            :selected="selected"
            :query-params="queryParams"
            @selectItem="selectItem"
            @openSliderPopup="openSliderPopup"
          />
          <client-only>
            <transition name="fade">
              <div v-show="loader" class="gallery-loader">
                <Loader />
              </div>
            </transition>
          </client-only>
        </div>
        <transition name="top">
          <div
            v-if="
              saveProgress
                ? !saveProgress
                : queryParams
                ? total
                : selected && selected.length > 0
            "
            class="gallery-fixed"
          >
            <div class="gallery-fixed-left">
              <div
                v-if="queryParams"
                class="gallery-fixed-back"
                @click="goToFilters"
              >
                <FiltersIcon />
                Go to filter to see other media files
              </div>
            </div>
            <div class="gallery-fixed-right">
              <div class="gallery-fixed-select">
                <template v-if="!queryParams">
                  <CloseIcon @click="clearSelected" />
                </template>
                {{
                  queryParams
                    ? `${total} shared media`
                    : `${selected.length} media selected`
                }}
              </div>
              <div
                class="gallery-fixed-item save-item"
                @click="saveMedia(false)"
              >
                <LoadIcon />
                {{
                  isMobile
                    ? 'Save'
                    : queryParams
                    ? 'Save shared media'
                    : 'Save selected media'
                }}
              </div>
              <div
                class="gallery-fixed-item share-item"
                @click="shareMedia(false)"
              >
                <LoadIcon />
                {{
                  isMobile
                    ? 'Share'
                    : queryParams
                    ? 'Share media'
                    : 'Share selected media'
                }}
              </div>
            </div>
          </div>
        </transition>
        <transition name="top">
          <div v-if="saveProgress" class="gallery-progress">
            <div class="gallery-progress-left">
              {{ saveProgressDone ? 'Loading is complete' : 'Start loading' }}
              <CloseIcon @click="closeProgress" />
            </div>
            <div
              class="gallery-progress-right"
              :class="{ active: saveProgressDone }"
            >
              <span
                >{{ queryParams ? total : selected.length }} files started
                archiving</span
              >
              <svg
                v-if="!saveProgressDone"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                class="svg-loader"
              >
                <circle
                  class="svg-loader-bg"
                  fill="none"
                  stroke-linecap="round"
                  cx="20"
                  cy="20"
                  r="15.915494309"
                />
                <circle
                  class="svg-loader-circle"
                  fill="none"
                  stroke-linecap="round"
                  cx="20"
                  cy="20"
                  r="15.915494309"
                />
              </svg>
              <CheckIcon v-else />
            </div>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>
<script>
import Filters from '~/components/photo-video/filters.vue';
import Gallery from '~/components/photo-video/gallery.vue';
import LoadIcon from '~/assets/images/icons/load-icon.svg';
import CloseIcon from '~/assets/images/icons/close-big.svg';
import CheckIcon from '~/assets/images/icons/check-icon.svg';
import FiltersIcon from '~/assets/images/icons/filters.svg';
import FiltersIconMobile from '~/assets/images/icons/filters-mobile.svg';
import Popup from '~/components/ui/popup/popup.vue';
import Button from '~/components/ui/btn/btn';
import Loader from '~/components/ui/circle-loader/circle-loader';
import IconBtn from '~/assets/images/icons/arrow-top.svg';
import GalleryLayout from '~/assets/images/gallery-layout.svg';
import GalleryLayoutMobile from '~/assets/images/gallery-layout-mobile.svg';
export default {
  layout: 'photo-video',
  components: {
    Filters,
    Gallery,
    LoadIcon,
    CloseIcon,
    FiltersIcon,
    FiltersIconMobile,
    Popup,
    Button,
    Loader,
    IconBtn,
    CheckIcon,
    GalleryLayout,
    GalleryLayoutMobile
  },
  async asyncData({ $axios, $config: { baseAPI }, route }) {
    const [contentRes, componentsRes] = await Promise.all([
      'id' in route.query
        ? $axios.get(
            `${baseAPI}/gallery/by_code?code=${route.query.id}&page=1&per_page=20`
          )
        : $axios.get(`${baseAPI}/gallery?page=1&per_page=20`),
      $axios.get(`${baseAPI}/gallery/attributes`)
    ]);
    const filtersItems = componentsRes.data.map((item) => {
      return {
        ...item,
        open: true
      };
    });
    return {
      items: contentRes.data.data,
      currentPage: contentRes.data.meta.current_page,
      lastPage: contentRes.data.meta.last_page,
      total: contentRes.data.meta.total,
      filters: filtersItems
    };
  },
  data() {
    return {
      allItems: [],
      moreFlag: true,
      radioBoxItem: {},
      checkBoxItem: {},
      radioBoxString: '',
      checkBoxString: '',
      searchString: '',
      selected: [],
      shareCode: null,
      sliderPopup: false,
      queryParams: false,
      currentSlide: null,
      optionsMain: {
        slidesPerView: 1,
        loop: false,
        lazyLoading: true,
        speed: 500,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      players: [],
      videoOptions: {
        autoplay: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      },
      scrollFlag: true,
      saveProgress: false,
      saveProgressDone: false,
      timer: null,
      loader: false,
      isMobile: false,
      mobileWidth: 768,
      mobileFiltersFlag: false
    };
  },
  computed: {
    getIrl() {
      if (process.client) {
        if (this.queryParams) {
          return window.location.href;
        } else {
          return `${window.location.href}?id=${this.shareCode}`;
        }
      } else {
        return '';
      }
    },
    getSaveMedia() {
      return this.selected.map((item) => item.id);
    },
    getShareMedia() {
      return this.selected.map((item) => item.id);
    },
    getAllItems() {
      const arr = [].concat(...this.allItems);
      return arr;
    },
    getCurrentElem() {
      let arr = [];
      this.allItems.forEach((item) => {
        arr = [...item];
      });
      return arr.find((item, index) => index === this.currentSlide);
    }
  },
  created() {
    this.$nuxt.$on('changeCheckbox', (option, name, value) => {
      if (value) {
        if (typeof this.checkBoxItem[name] !== 'undefined') {
          this.checkBoxItem[name] = [
            ...this.checkBoxItem[name],
            {
              name: option.slug,
              type: option.attribute_option_category
                ? option.attribute_option_category.name
                : null
            }
          ];
        } else {
          this.checkBoxItem[name] = [
            {
              name: option.slug,
              type: option.attribute_option_category
                ? option.attribute_option_category.name
                : null
            }
          ];
        }
      } else {
        const filterSlug = this.checkBoxItem[name].filter((item) => {
          return item.name !== option.slug;
        });
        this.checkBoxItem[name] = [...filterSlug];
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.updateCheckBox();
      }, 500);
    });
    this.$nuxt.$on('changeRadiobox', (option, name) => {
      if (option.is_all_option) {
        const filterItems = this.filters
          .filter((item) => {
            return item.slug === name;
          })[0]
          .options.filter((option) => {
            return option.is_all_option === false;
          })
          .map((name) => name.slug);
        this.radioBoxItem[name] = {
          slug: filterItems
        };
      } else {
        this.radioBoxItem[name] = {
          slug: option.slug
        };
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.updateRadioBox();
      }, 500);
    });
  },
  mounted() {
    if ('id' in this.$route.query) {
      this.queryParams = true;
    }
    this.getItems();
    setTimeout(() => {
      this.gsapTranslate();
      // this.gsapOpacity();
    }, 500);
    this.onResize();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    openFilters() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      if (this.queryParams) {
        this.goToFilters();
      } else {
        this.mobileFiltersFlag = true;
        this.enableScroll();
      }
    },
    closeFilters() {
      this.mobileFiltersFlag = false;
      this.disableScroll();
    },
    enableScroll() {
      const $body = document.querySelector('body');
      this.scrollPosition = window.pageYOffset;
      $body.style.overflow = 'hidden';
      $body.style.position = 'fixed';
      $body.style.top = `-${this.scrollPosition}px`;
      $body.style.width = '100%';
    },
    disableScroll() {
      const $body = document.querySelector('body');
      $body.style.removeProperty('overflow');
      $body.style.removeProperty('position');
      $body.style.removeProperty('top');
      $body.style.removeProperty('width');
      window.scrollTo(0, this.scrollPosition);
    },
    onResize(event) {
      if (event) {
        this.isMobile = this.mobileWidth > event.target.innerWidth;
      } else {
        this.isMobile = this.mobileWidth > window.innerWidth;
      }
    },
    endScroll() {
      this.scrollFlag = false;
    },
    topScroll() {
      this.scrollFlag = true;
    },
    gsapTranslate() {
      Array.from(document.querySelectorAll('.gsapLeftTitle')).forEach(
        (item) => {
          const delay = item.dataset.delay || 0;
          const duration = item.dataset.duration || 0.8;
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
        }
      );
    },
    gsapOpacity() {
      Array.from(document.querySelectorAll('.gallery-item')).forEach((item) => {
        const delay = item.dataset.delay || 0;
        const duration = item.dataset.duration || 0.8;
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
            opacity: 1,
            overwrite: false,
            lazy: true
          });
        this.$scrollmagic.addScene(scene);
      });
    },
    updateHeight() {
      setTimeout(() => {
        const pin = document.querySelector('.gallery-pin').clientHeight;
        const filters = document.querySelector('.filters');
        const filtersScroll = document.querySelector('.filters-scroll');
        if (this.queryParams) {
          filters.style.height = pin + 'px';
          filtersScroll.style.height = pin + 'px';
          this.scrollFlag = true;
        } else if (window.innerHeight > pin) {
          filters.style.height = 'auto';
          filtersScroll.style.height = 'auto';
          this.scrollFlag = false;
        } else {
          filters.style.height = window.innerHeight + 'px';
          filtersScroll.style.height = window.innerHeight + 'px';
          this.scrollFlag = true;
        }
      }, 0);
    },
    getItems(flag) {
      if (flag) {
        const arrItem = [...this.items];
        this.allItems.push(arrItem);
        this.loader = false;
        this.players = [];
      } else {
        const arrItem = [...this.items];
        this.allItems = [];
        this.allItems.push(arrItem);
        this.moreFlag = true;
        this.players = [];
      }
      if (window.innerWidth >= this.mobileWidth) {
        this.updateHeight();
      }
      setTimeout(() => {
        this.gsapOpacity();
      }, 500);
    },
    more() {
      if (this.lastPage > this.currentPage) {
        this.currentPage++;
        this.loader = true;
        this.fetchPageItems(this.radioBoxString).then((resp) => {
          this.items = resp.data;
          this.moreFlag = true;
          this.getItems(true);
        });
      }
    },
    async fetchPageItems(string) {
      const res = await this.$axios.$get(
        `${this.$config.baseAPI}/gallery?page=${this.currentPage}&per_page=20${
          string || ''
        }`
      );
      return res;
    },
    async fetchSaveItems(ids) {
      const res = await this.$axios.get(
        this.queryParams
          ? `${this.$config.baseAPI}/gallery/save_by_share_code?code=${ids}`
          : `${this.$config.baseAPI}/gallery/save?ids=${ids}`,
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/zip'
          }
        }
      );
      return res;
    },
    async fetchShareItems(ids) {
      const res = await this.$axios.$get(
        `${this.$config.baseAPI}/gallery/share?ids=${ids}`
      );
      return res;
    },
    handleScroll() {
      const pin = document.querySelector('.gallery-pin');
      if (
        document.documentElement.scrollTop + window.innerHeight + 100 >
          pin.offsetTop + pin.offsetHeight &&
        this.moreFlag
      ) {
        this.moreFlag = false;
        this.more();
      }
    },
    updateCheckBox() {
      this.checkBoxString = '';
      Object.keys(this.checkBoxItem).forEach((key) => {
        const arrString = this.checkBoxItem[key]
          .map((item) => item.name)
          .join();
        this.checkBoxString += arrString ? `&filters[${key}]=${arrString}` : '';
      });
      this.searchString = this.radioBoxString + this.checkBoxString;
      if (!this.isMobile) {
        this.currentPage = 1;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.fetchPageItems(this.searchString).then((resp) => {
          this.items = resp.data;
          this.currentPage = resp.meta.current_page;
          this.lastPage = resp.meta.last_page;
          this.getItems();
        });
      }
    },
    updateRadioBox() {
      this.radioBoxString = '';
      Object.keys(this.radioBoxItem).forEach((key) => {
        this.radioBoxString += `&filters[${key}]=${this.radioBoxItem[key].slug}`;
      });
      this.searchString = this.radioBoxString + this.checkBoxString;
      if (!this.isMobile) {
        this.currentPage = 1;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.fetchPageItems(this.searchString).then((resp) => {
          this.items = resp.data;
          this.currentPage = resp.meta.current_page;
          this.lastPage = resp.meta.last_page;
          this.getItems();
        });
      }
    },
    showResult() {
      this.currentPage = 1;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.fetchPageItems(this.searchString).then((resp) => {
        this.items = resp.data;
        this.currentPage = resp.meta.current_page;
        this.lastPage = resp.meta.last_page;
        this.mobileFiltersFlag = false;
        this.disableScroll();
        this.getItems();
      });
    },
    showCategory(item, category) {
      const arr = this.filters
        .filter((elem) => {
          return elem.id === item.id;
        })[0]
        .options.filter((option) => {
          return option.attribute_option_category.slug === category;
        });
      arr.forEach((el) => {
        if (
          this.checkBoxItem[item.slug] &&
          !this.checkBoxItem[item.slug].find((item) => item.name === el.slug)
        ) {
          this.checkBoxItem[item.slug] = [
            ...this.checkBoxItem[item.slug],
            {
              name: el.slug,
              type: el.attribute_option_category
                ? el.attribute_option_category.name
                : null
            }
          ];
        } else {
          this.checkBoxItem[item.slug] = [
            {
              name: el.slug,
              type: el.attribute_option_category
                ? el.attribute_option_category.name
                : null
            }
          ];
        }
      });
      this.updateCheckBox();
    },
    showAll() {
      const checkBox = this.filters.filter((item) => item.type === 'checkbox');
      const radioBox = this.filters.filter((item) => item.type === 'radio');
      checkBox.forEach((item) => {
        if (item.categories && item.categories.length > 0) {
          item.categories.forEach((category) => {
            const inputs = document.querySelectorAll(`[name=${category.slug}]`);
            Array.from(inputs).forEach((item) => {
              item.checked = true;
            });
          });
        } else {
          const inputs = document.querySelectorAll(`[name=${item.slug}]`);
          Array.from(inputs).forEach((item) => {
            item.checked = true;
          });
        }
        item.options.forEach((el) => {
          if (
            this.checkBoxItem[item.slug] &&
            !this.checkBoxItem[item.slug].find((item) => item.name === el.slug)
          ) {
            this.checkBoxItem[item.slug] = [
              ...this.checkBoxItem[item.slug],
              {
                name: el.slug,
                type: el.attribute_option_category
                  ? el.attribute_option_category.name
                  : null
              }
            ];
          } else {
            this.checkBoxItem[item.slug] = [
              {
                name: el.slug,
                type: el.attribute_option_category
                  ? el.attribute_option_category.name
                  : null
              }
            ];
          }
        });
      });
      radioBox.forEach((item) => {
        const inputs = document.querySelectorAll(`[data-all=true]`);
        Array.from(inputs).forEach((item) => {
          item.checked = true;
        });
        const filterItems = item.options
          .filter((option) => !option.is_all_option)
          .map((el) => el.slug);
        this.radioBoxItem[item.slug] = {
          slug: filterItems
        };
      });
      this.checkBoxString = '';
      Object.keys(this.checkBoxItem).forEach((key) => {
        const arrString = this.checkBoxItem[key]
          .map((item) => item.name)
          .join();
        this.checkBoxString += arrString ? `&filters[${key}]=${arrString}` : '';
      });
      this.radioBoxString = '';
      Object.keys(this.radioBoxItem).forEach((key) => {
        this.radioBoxString += `&filters[${key}]=${this.radioBoxItem[key].slug}`;
      });
      this.searchString = this.radioBoxString + this.checkBoxString;
      this.currentPage = 1;
      this.fetchPageItems(this.searchString).then((resp) => {
        this.items = resp.data;
        this.currentPage = resp.meta.current_page;
        this.lastPage = resp.meta.last_page;
        this.getItems();
      });
    },
    clearAll() {
      const inputs = document.querySelectorAll('input');
      Array.from(inputs).forEach((item) => {
        item.checked = false;
      });
      this.checkBoxItem = {};
      this.radioBoxItem = {};
      this.checkBoxString = '';
      this.radioBoxString = '';
      this.searchString = '';
      this.allItems = [];
      this.currentPage = 1;
      this.moreFlag = true;
      this.fetchPageItems(this.searchString).then((resp) => {
        this.items = resp.data;
        this.currentPage = resp.meta.current_page;
        this.lastPage = resp.meta.last_page;
        this.getItems();
      });
    },
    selectItem(elem) {
      if (this.selected.find((item) => item.id === elem.id)) {
        this.selected = this.selected.filter((item) => item.id !== elem.id);
      } else {
        this.selected.push(elem);
      }
    },
    clearSelected() {
      this.selected = [];
    },
    saveMedia(elem) {
      if (!elem) {
        this.saveProgress = true;
      }
      if (elem && elem.image.id) {
        this.fetchSaveItems(elem.image.id).then((resp) => {
          this.downloadFile(
            resp.data,
            this.getFileNameFromContentDisposition(
              resp.headers['content-disposition']
            )
          );
        });
      } else if (this.queryParams) {
        this.fetchSaveItems(this.$route.query.id).then((resp) => {
          this.downloadFile(
            resp.data,
            this.getFileNameFromContentDisposition(
              resp.headers['content-disposition']
            )
          );
        });
      } else {
        this.fetchSaveItems(this.getSaveMedia.join()).then((resp) => {
          this.downloadFile(
            resp.data,
            this.getFileNameFromContentDisposition(
              resp.headers['content-disposition']
            )
          );
        });
      }
    },
    shareMedia(elem) {
      if (elem && elem.id) {
        this.fetchShareItems(elem.id).then((resp) => {
          this.shareCode = resp.code;
        });
      } else if (this.queryParams) {
        this.shareCode = this.$route.query.id;
      } else {
        this.fetchShareItems(this.getShareMedia.join()).then((resp) => {
          this.shareCode = resp.code;
        });
      }
    },
    closePopupCode() {
      this.shareCode = null;
      this.clearSelected();
    },
    closePopupSlider() {
      this.sliderPopup = false;
      this.stop();
    },
    copyLink() {
      const currentInput = document.getElementsByClassName('copy-input');
      document.execCommand('copy', false, currentInput[0].select());
      this.closePopupCode();
    },
    goToFilters() {
      this.clearSelected();
      this.queryParams = false;
      this.$router.push({ query: { id: undefined } });
      this.allItems = [];
      this.fetchPageItems(this.radioBoxString).then((resp) => {
        this.items = resp.data;
        this.getItems();
      });
    },
    openSliderPopup(elem, flag) {
      const index = this.getAllItems.findIndex((item) => item.id === elem.id);
      if (flag) {
        this.sliderPopup = true;
        this.mySwiper.slideTo(index);
        this.currentSlide = index;
      } else if (this.selected && this.selected.length > 0) {
        this.selectItem(elem);
      } else {
        this.sliderPopup = true;
        this.mySwiper.slideTo(index);
        this.currentSlide = index;
      }
      if (this.mySwiper.slides.length > 0) {
        if (this.mySwiper.activeIndex > this.mySwiper.slides.length - 3) {
          this.more();
        }
      }
    },
    slideChangeMain() {
      this.players.forEach((item) => {
        item.stopVideo();
      });
      this.currentSlide = this.mySwiper.activeIndex;
      if (this.mySwiper.slides.length > 0) {
        if (this.mySwiper.activeIndex > this.mySwiper.slides.length - 3) {
          this.more();
        }
      }
    },
    getFileNameFromContentDisposition(contentDisposition, type = 'attachment') {
      let filename = '';
      if (contentDisposition && contentDisposition.includes(type)) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }
      return filename;
    },
    downloadFile(data, filename, mime) {
      filename = 'file.zip';
      const blob = new Blob([data], {
        type: mime || 'application/octet-stream'
      });
      const blobURL =
        window.URL && window.URL.createObjectURL
          ? window.URL.createObjectURL(blob)
          : window.webkitURL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      tempLink.setAttribute('download', filename);
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
      }
      document.body.appendChild(tempLink);
      this.saveProgressDone = true;
      tempLink.click();
      setTimeout(
        () => {
          this.clearSelected();
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(blobURL);
          if (this.saveProgress) {
            this.saveProgress = false;
            this.saveProgressDone = false;
          }
        },
        this.saveProgress ? 2000 : 200
      );
    },
    getVideoId(link) {
      const videoUrl = link;
      if (videoUrl) {
        const arr = videoUrl.split('/');
        return arr[arr.length - 1];
      } else {
        return null;
      }
    },
    ready(event) {
      this.players.push(event.target);
    },
    stop() {
      this.players.forEach((item) => {
        item.stopVideo();
      });
    },
    closeProgress() {
      this.clearSelected();
      this.saveProgress = false;
      this.saveProgressDone = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.page__wr {
  padding-top: 90px;
  overflow: visible;
  position: relative;
  @include media(767px) {
    padding-top: 80px;
  }
}
.gallery {
  padding: vw(65px) 0 0;
  @include media(767px) {
    padding-top: 48px;
    min-height: calc(100vh - 64px);
    flex-direction: column;
  }
  &-loader {
    display: flex;
    justify-content: center;
    padding: vw(10px);
    @include media(767px) {
      padding: 10px;
    }
  }
  &.selected {
    margin-bottom: 72px;
    @include media(767px) {
      margin-bottom: 65px;
    }
  }
  &-title {
    text-align: left;
    text-transform: uppercase;
  }
  &-content {
    margin-top: vw(40px);
    display: flex;
    align-items: flex-start;
    @include media(767px) {
      margin-top: 24px;
    }
    &.flex-height {
      align-items: stretch;
      .gallery-pin {
        display: flex;
        flex-direction: column;
      }
    }
  }
  &-pin {
    width: 100%;
    @include media(767px) {
      padding: 0 32px;
    }
    &-btn {
      height: 64px;
      line-height: 64px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      color: #000000;
      font-family: $font-1b;
      border: 1.2px solid #e9ebed;
      margin-bottom: 24px;
      position: sticky;
      top: 0;
      background: #ffffff;
      z-index: 5;
      white-space: nowrap;
      &.fixed {
        width: calc(100% + 64px);
        margin-left: -32px;
        border-color: #ffffff;
        border-bottom-color: #e9ebed;
        padding: 0 56px;
      }
    }
    &-info {
      font-size: 0;
      &-content {
        padding: vw(96px) vw(114px) vw(114px);
        background: #f9f9f9;
        margin-bottom: vw(4px);
        @include media(767px) {
          padding: 24px;
          margin-bottom: 1px;
        }
      }
      &-text {
        max-width: vw(590px);
        margin-bottom: vw(48px);
        font-size: vw(32px);
        line-height: 1.25;
        font-family: $font-2b;
        @include media(767px) {
          font-size: 24px;
          max-width: 100%;
          margin-bottom: 24px;
        }
      }
    }
  }
  &-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    width: 100%;
    z-index: 4;
    height: 72px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @include media(767px) {
      height: 65px;
    }
    &-back {
      display: flex;
      align-items: center;
      font-size: vw(13px);
      padding-left: 4vw;
      text-transform: uppercase;
      font-family: $font-1b;
      cursor: pointer;
      border: 1px solid #e3e3e3;
      background: rgba(244, 245, 246, 0.5);
      height: 100%;
    }
    &-left {
      width: calc(27.43vw + 2px);
      height: 100%;
      flex-shrink: 0;
      @include media(767px) {
        display: none;
      }
      svg {
        width: vw(12px);
        height: vw(12px);
        margin-right: vw(15px);
      }
    }
    &-right {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 4vw 0 vw(24px);
      @include media(767px) {
        width: 100%;
        padding: 0 32px;
      }
    }
    &-select {
      margin-right: auto;
      display: flex;
      align-items: center;
      font-size: vw(18px);
      @include media(767px) {
        font-size: 12px;
      }
      svg {
        width: vw(12px);
        height: vw(12px);
        margin-right: vw(20px);
        cursor: pointer;
        @include media(767px) {
          width: 12px;
          height: 12px;
          margin-right: 8px;
        }
      }
    }
    &-item {
      margin-left: vw(35px);
      font-size: vw(16px);
      font-family: $font-2b;
      cursor: pointer;
      @include media(767px) {
        font-size: 16px;
        margin-left: 24px;
      }
      svg {
        margin-right: vw(8px);
        width: vw(14px);
        height: vw(12px);
        @include media(767px) {
          width: 14px;
          height: 12px;
          margin-right: 8px;
        }
      }
      &.share-item {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }
  &-progress {
    position: fixed;
    z-index: 5;
    right: 0;
    bottom: 0;
    min-height: 40px;
    width: calc(100% - 27.43vw - 2px);
    display: flex;
    background: #ffffff;
    @include media(767px) {
      width: 100%;
    }
    &-left {
      width: 72%;
      background: $red;
      height: auto;
      padding: 5px vw(16px) 5px vw(25px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: vw(14px);
      color: #ffffff;
      @include media(767px) {
        width: 49%;
        font-size: 12px;
        padding: 26px 16px 26px 32px;
      }
      .svg-icon {
        width: vw(10px);
        height: vw(10px);
        @include media(767px) {
          width: 10px;
          height: 10px;
        }
      }
    }
    &-right {
      width: 28%;
      height: auto;
      display: flex;
      align-items: center;
      padding: 5px vw(23px);
      color: #cccccc;
      font-size: vw(14px);
      @include media(767px) {
        width: 51%;
        font-size: 12px;
        padding: 26px 16px 26px 25px;
      }
      &.active {
        color: #000000;
      }
      span {
        width: 70%;
        margin-right: 10px;
        @include media(767px) {
          width: 100%;
        }
      }
      .svg-icon {
        width: vw(12px);
        height: vw(12px);
        @include media(767px) {
          width: 12px;
          height: 12px;
        }
      }
      .svg-loader {
        width: vw(14px);
        height: vw(14px);
        @include media(767px) {
          width: 14px;
          height: 14px;
        }
      }
      .svg-loader-circle {
        stroke: #479a5f;
        stroke-width: 1px;
        stroke-dasharray: 50;
        stroke-dashoffset: 50;
        transform-origin: center;
        animation: fake-load 0.5s infinite;
        animation-delay: 0s;
      }
      .svg-loader-bg {
        stroke-width: 1px;
        stroke: #cccccc;
      }
    }
  }
  .popup__wr {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    .svg-icon {
      fill: transparent;
    }
  }
}
.share {
  &-popup {
    min-width: vw(648px);
    padding: vw(44px) vw(72px) vw(62px);
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    @include media(767px) {
      width: calc(100% - 64px);
      padding: 44px 38px 62px;
    }
    &-text {
      margin-bottom: vw(37px);
      font-size: vw(24px);
      font-family: $font-2b;
      line-height: 1.25;
      text-align: center;
      @include media(767px) {
        font-size: 24px;
        margin-bottom: 38px;
      }
    }
    &-link {
      border: 1px dashed #c2cfda;
      padding: vw(17px) vw(47px);
      font-size: vw(18px);
      line-height: 1.17;
      margin-bottom: vw(24px);
      @include media(767px) {
        font-size: 12px;
        margin-bottom: 24px;
        padding: 13px 34px;
        text-align: center;
      }
    }
    &-btn {
      @include media(767px) {
        width: 100%;
      }
    }
    .copy-input {
      position: absolute;
      pointer-events: none;
      opacity: 0;
    }
  }
}
.gsapLeftTitle {
  opacity: 0;
  transform: translateX(-100px);
}
@keyframes fake-load {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.top-enter-active,
.top-leave-active {
  transition: transform 0.5s;
}
.top-enter, .top-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  transform: translateY(100%);
}
</style>
<style lang="scss">
.gallery-fixed-item {
  .svg-icon {
    path {
      fill: $red;
    }
  }
}
.share {
  &-popup {
    .btn {
      width: vw(236px);
      height: vw(60px);
      line-height: vw(60px);
      @include media(767px) {
        width: 100%;
        height: 60px;
        line-height: 60px;
      }
    }
  }
}
.gallery {
  &-pin {
    &.pointer-none {
      cursor: not-allowed;
      .gallery-box {
        pointer-events: none;
      }
    }
    &-info {
      height: 100%;
      .btn {
        font-size: 16px;
        min-width: vw(260px);
        @include media(767px) {
          min-width: 260px;
        }
      }
      .svg-icon {
        width: 100%;
        height: auto;
      }
    }
  }
  .code-popup {
    &.popup__wr {
      z-index: 901;
    }
  }
  .slider-popup {
    width: 100%;
    height: 100vh;
    &-buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: vw(15px);
      z-index: 3;
      @include media(767px) {
        bottom: 20px;
        padding: 0 27px;
        width: 100%;
      }
      .slider-popup-btn {
        margin: 0 vw(12px);
        width: vw(147px);
        height: vw(48px);
        line-height: vw(48px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        cursor: pointer;
        color: #ffffff;
        font-size: vw(16px);
        font-family: $font-2b;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: transparent;
        transition: background-color 0.4s ease;
        @include media(767px) {
          width: 100%;
          height: 48px;
          line-height: 48px;
          margin: 0 5px;
          font-size: 16px;
        }
        &:hover {
          background-color: $red;
          .svg-icon {
            path {
              fill: #ffffff;
            }
          }
        }
        .svg-icon {
          position: static;
          margin-right: vw(8px);
          width: vw(14px);
          height: vw(12px);
          @include media(767px) {
            width: 14px;
            height: 12px;
            margin-right: 8px;
          }
          path {
            fill: $red;
            transition: fill 0.3s ease;
          }
        }
      }
    }
    &-content {
      width: 100%;
    }
    .img-wrapper {
      width: vw(1125px);
      padding: vw(80px) 0;
      height: 100vh;
      margin: 0 auto;
      text-align: center;
      overflow: hidden;
      @include media(767px) {
        width: calc(100% - 64px);
        padding: 110px 0 90px;
        display: flex;
        align-items: center;
      }
      img,
      picture {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        @include media(767px) {
          object-fit: contain;
        }
      }
      .video {
        width: 100%;
        height: 100%;
        @include media(767px) {
          height: auto;
        }
      }
    }
    &.popup__wr {
      .svg-icon {
        top: vw(30px);
        right: vw(60px);
        z-index: 3;
        @include media(767px) {
          top: 32px;
          right: 32px;
        }
      }
    }
    .buttons {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      padding: 0 vw(88px);
      height: vw(84px);
      z-index: 2;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
      @include media(767px) {
        height: 44px;
        padding: 0 24px;
        transform: translateY(calc(-50% + 30px));
      }
      .svg-icon {
        fill: #ffffff;
        height: vw(5px);
        width: vw(12px);
        position: static;
        @include media(767px) {
          width: 12px;
          height: 5px;
        }
        path {
          fill: #ffffff;
          transition: fill 0.3s ease;
        }
      }
      .swiper-button {
        width: vw(100px);
        height: vw(84px);
        position: static;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        background: $red;
        transition: background-color 0.3s ease;
        outline: none;
        pointer-events: auto;
        @include media(767px) {
          height: 44px;
          width: 53px;
        }
        &:hover {
          background-color: #ffffff;
          .svg-icon {
            path {
              fill: $red;
            }
          }
        }
        &-prev {
          left: vw(88px);
          @include media(767px) {
            left: 24px;
          }
          .svg-icon {
            transform: rotate(-90deg);
          }
        }
        &-next {
          right: vw(88px);
          @include media(767px) {
            right: 24px;
          }
          .svg-icon {
            transform: rotate(90deg);
          }
        }
      }
    }
  }
  &-progress {
    &-left {
      .svg-icon {
        cursor: pointer;
        path {
          fill: #ffffff;
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
