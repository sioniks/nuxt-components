<template>
  <footer class="site-footer">
    <div class="footer__mails">
      <div class="container">
        <div class="footer__mail">
          <div class="footer__mail-title">
            {{ footerLiterals.general_info_label.content }}
          </div>
          <a
            :href="`mailto:${footerLiterals.general_info_value.content}`"
            class="footer__mail-link"
            >{{ footerLiterals.general_info_value.content }}</a
          >
        </div>
        <div class="footer__mail">
          <div class="footer__mail-title">
            {{ footerLiterals.sales_label.content }}
          </div>
          <a
            :href="`mailto:${footerLiterals.sales_value.content}`"
            class="footer__mail-link"
            >{{ footerLiterals.sales_value.content }}</a
          >
        </div>
        <div class="footer__mail">
          <div class="footer__mail-title">
            {{ footerLiterals.public_relations_label.content }}
          </div>
          <a
            :href="`mailto:${footerLiterals.public_relations_value.content}`"
            class="footer__mail-link"
            >{{ footerLiterals.public_relations_value.content }}</a
          >
        </div>
        <div class="footer__mail">
          <div class="footer__mail-title">
            {{ footerLiterals.distribution_enquiry_label.content }}
          </div>
          <a
            :href="`mailto:${footerLiterals.distribution_enquiry_value.content}`"
            class="footer__mail-link"
            >{{ footerLiterals.distribution_enquiry_value.content }}</a
          >
        </div>
      </div>
    </div>
    <div class="footer__social">
      <div class="container">
        <div class="address__block">
          <div class="address___tel">
            <div class="" v-html="footerLiterals.phone_text.content"></div>
          </div>
          <div class="address___part1">
            {{ footerLiterals.country_text.content }}
          </div>
          <div class="address___part2">
            {{ footerLiterals.street_text.content }}
          </div>
        </div>
        <div class="sm-links">
          <a
            :href="footerLiterals.facebook_link.content"
            class="sm-link"
            target="_blank"
            title="Go to   Facebook page"
          >
            <FbIcon />
          </a>
          <a
            :href="footerLiterals.instagram_link.content"
            class="sm-link"
            target="_blank"
            title="Go to   Instargam page"
          >
            <InstaIcon />
          </a>
          <a
            :href="footerLiterals.linkedin_link.content"
            class="sm-link"
            target="_blank"
            title="Go to   LinkedIn page"
          >
            <LiIcon />
          </a>
          <a
            :href="footerLiterals.twitter_link.content"
            class="sm-link"
            target="_blank"
            title="Follow Us on Twitter"
          >
            <TwIcon />
          </a>
          <a
            :href="footerLiterals.youtube_link.content"
            class="sm-link"
            target="_blank"
            title="Go to   chanel on youtube"
          >
            <YtIcon />
          </a>
        </div>
      </div>
    </div>

    <div v-if="!isMobile" class="footer__menu">
      <div class="container">
        <div class="menu__wr">
          <div v-for="item in menuItems" :key="item.id" class="menu__block">
            <app-link class="menu__title" :to="item.url">
              {{ item.title }}
            </app-link>
            <div class="menu__links">
              <app-link
                v-for="link in item.children"
                :key="link.id"
                class="st-link"
                :to="link.url"
                >{{ link.title }}</app-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__docs">
      <div class="container">
        <Logo class="logo animLeft" data-delay="1" @click="goTop" />
        <div class="footer__docs-bottom">
          <div class="info">
            <app-link to="/" class="footer__pp">{{
              footerLiterals.privacy_policy_label.content
            }}</app-link>
            <app-link to="/" class="footer__tou">{{
              footerLiterals.terms_of_use_label.content
            }}</app-link>
          </div>
          <app-link to="/" class="footer__copiright">{{
            footerLiterals.copyright_label.content
          }}</app-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '~/assets/images/icons/ -logo.svg';
import FbIcon from '~/assets/images/icons/fb.svg';
import LiIcon from '~/assets/images/icons/in.svg';
import TwIcon from '~/assets/images/icons/tw.svg';
import YtIcon from '~/assets/images/icons/yt.svg';
import InstaIcon from '~/assets/images/icons/inst.svg';

export default {
  components: {
    Logo,
    FbIcon,
    LiIcon,
    TwIcon,
    YtIcon,
    InstaIcon
  },
  data() {
    return {
      mobileWidth: 768,
      isMobile: false
    };
  },
  computed: {
    ...mapState({
      menuItems: 'footerMenu',
      literals: 'literals'
    }),
    footerLiterals() {
      return this.literals.footer;
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
    this.$nextTick(() => this.startAnimation());
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize(event) {
      if (event) {
        this.isMobile = this.mobileWidth > event.target.innerWidth;
      } else {
        this.isMobile = this.mobileWidth > window.innerWidth;
      }
    },
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    startAnimation() {
      Array.from(
        this.$el.querySelectorAll('.animBottom, .animLeft, .animRight')
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
.site-footer {
  padding-top: vw(96px);
  background-color: #ffffff;
  @include media(767px) {
    padding-top: 24px;
  }
}
.footer__mails {
  position: relative;
  padding-bottom: vw(64px);
  @include media(767px) {
    padding-bottom: 20px;
    border-bottom: 1px solid #f4f5f6;
  }
  &:after {
    content: '';
    position: absolute;
    right: 10%;
    bottom: 0;
    width: 80%;
    height: 1px;
    background: #f4f5f6;
    @include media(767px) {
      display: none;
    }
  }
  .container {
    display: flex;
    justify-content: space-between;
    @include media(767px) {
      flex-direction: column;
      padding: 0 64px;
    }
  }
}

.footer__mail {
  width: fit-content;
  position: relative;
  text-align: left;
  padding-left: vw(97px);
  @include media(767px) {
    padding: 32px 0;
    border-bottom: 1px solid #f4f5f6;
    width: 100%;
    text-align: center;
    &:last-child {
      border: none;
    }
  }
  &:first-child {
    padding-left: 0;
    &:after {
      display: none;
    }
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background: #f4f5f6;
    @include media(767px) {
      display: none;
    }
  }
}
.footer__mail-title {
  font-family: $font-2b;
  font-size: vw(20px);
  line-height: 1.4;
  text-transform: uppercase;
  color: $red;
  margin-bottom: 3vw;
  @include media(767px) {
    font-size: 20px;
    line-height: 1.25;
    margin-bottom: 15px;
    text-align: center;
  }
}
.footer__mail-link {
  font-size: vw(18px);
  line-height: 1.7;
  color: #041c30;
  @include media(767px) {
    font-size: 18px;
  }
}
.footer__social {
  padding: vw(48px) 0;
  @include media(767px) {
    padding: 56px 0;
  }
  .container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include media(767px) {
      flex-direction: column;
    }
  }
}
.address__block {
  display: flex;
  font-size: vw(18px);
  color: #041c30;
  @include media(767px) {
    width: 100%;
    flex-direction: column;
    font-size: 18px;
    text-align: center;
    margin-bottom: 52px;
  }
}
.address___tel {
  display: flex;
  margin-right: 2vw;
  @include media(767px) {
    margin: 0 0 32px;
    text-align: center;
    div {
      text-align: center;
      width: 100%;
    }
  }
}
.tel__prefix {
  margin-right: 5px;
}
.tel__link {
  font-weight: bold;
}
.address___part1 {
  margin-right: 2vw;
  @include media(767px) {
    margin: 0 0 32px;
  }
}
.address___part2 {
  margin-right: 2vw;
  @include media(767px) {
    margin: 0;
  }
}
.sm-links {
  display: flex;
  align-items: center;
}
.sm-link {
  margin-right: 32px;
  font-size: 0;
  &:hover svg {
    fill: $red;
  }

  &:last-of-type {
    margin-right: 0;
  }
}
.footer__menu {
  display: flex;
  background: #fafbfb;
  padding: 5vw 0;
}
.menu__wr {
  display: flex;
  justify-content: space-between;
}
.menu__block {
  line-height: 1.2;
  padding: 0 vw(20px) 0 vw(116px);
  position: relative;
  width: fit-content;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background: #f0f2f3;
  }
  &:first-child {
    padding-left: 0;
    &:after {
      display: none;
    }
  }

  &:last-child {
    padding-right: 0;
  }
}
.menu__title {
  font-family: $font-2b;
  font-size: vw(16px);
  text-transform: uppercase;
  color: #041c30;
  margin-bottom: 2vw;
  position: relative;
  display: block;
}
.menu__links {
  display: flex;
  flex-wrap: wrap;
}
.st-link {
  font-size: vw(14px);
  color: #041c30;
  margin-bottom: 2vw;
  margin-right: 2vw;
  transition: all 0.5s ease;
  &:hover {
    color: red;
  }
}
.footer__docs {
  height: 5vw;
  position: relative;
  &-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 58%;
    @include media(767px) {
      width: calc(100% + 64px);
      flex-direction: column;
      background: rgba(250, 251, 251, 0.9);
      padding: 32px 32px 16px;
    }
  }
  @include media(767px) {
    height: auto;
    width: 100%;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include media(767px) {
      flex-direction: column;
    }
  }
  a {
    transition: all 0.5s ease;
    @include media(767px) {
      font-family: $font-2b;
      color: rgba(4, 28, 48, 0.5);
    }
    &:hover {
      color: $red;
    }
  }
}
.logo {
  fill: $red;
  width: 8vw;
  @include media(767px) {
    width: 140px;
    margin-bottom: 56px;
  }
  &:hover {
    fill: $black;
  }
}
.info {
  font-size: vw(14px);
  color: rgba(4, 28, 48, 0.5);
  @include media(767px) {
    margin-bottom: 20px;
    font-size: 12px;
  }
}
.footer__pp {
  margin-right: 2vw;
  @include media(767px) {
    margin-right: 6px;
  }
}
.footer__tou {
  margin-right: 1px;
}
.footer__copiright {
  font-size: vw(14px);
  color: rgba(4, 28, 48, 0.5);
  @include media(767px) {
    font-size: 12px;
    text-align: center;
  }
}
.animBottom {
  position: relative;
  opacity: 0;
  transform: translate(0, 100px);
}
.animLeft {
  position: relative;
  opacity: 0;
  transform: translate(-100px, 0);
}
.animRight {
  position: relative;
  opacity: 0;
  transform: translate(100px, 0);
}
</style>
