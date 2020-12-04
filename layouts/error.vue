<template>
  <div class="error">
    <Lines v-show="!isMobile" />
    <section class="error-section">
      <div class="container">
        <div class="section__header error-title">Error</div>
        <div class="error-status">{{ statusCode }}</div>
        <div v-if="statusCode === 404" class="error-content">
          <h4 class="error-content-title">This links does not exist</h4>
          <p class="error-content-text">
            You have made wrong turn and this page doesn't exist
          </p>
        </div>
        <div v-else class="error-content">
          <h4 class="error-content-title">{{ message }}</h4>
        </div>
        <div class="error-back">
          <h6 class="error-back-title">Go to the home page</h6>
          <app-link class="error-link" :to="'/'">
            <Button btn-type="red" :btn-text="'Home page'" />
          </app-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Lines from '~/components/ui/lines/lines';
import Button from '~/components/ui/btn/btn';
export default {
  name: 'NuxtError',
  components: { Lines, Button },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isMobile: false,
      mobileWidth: 768
    };
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return this.error.message || '<%= messages.client_error %>';
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize(event) {
      if (event) {
        this.isMobile = this.mobileWidth > event.target.innerWidth;
      } else {
        this.isMobile = this.mobileWidth > window.innerWidth;
      }
    }
  },
  head() {
    return {
      title:
        this.statusCode === 404 ? 'This links does not exist' : this.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=375,initial-scale=1.0,minimum-scale=1.0'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.error {
  padding-top: 80px;
  &-section {
    padding: vw(56px) 0 vw(96px);
    position: relative;
    text-align: center;
    @include media(767px) {
      padding: 60px 0 24px;
    }
  }
  &-title {
    text-align: left;
    text-transform: uppercase;
    @include media(767px) {
      text-align: center;
    }
  }
  &-status {
    font-size: vw(280px);
    line-height: 1;
    font-family: $font-2b;
    color: $darkBlue;
    @include media(767px) {
      font-size: 140px;
      line-height: 1.26;
      margin-top: 20px;
    }
  }
  &-content {
    margin: vw(34px) 0;
    @include media(767px) {
      margin: 32px 0 20px;
    }
    &-title {
      font-size: vw(24px);
      line-height: 1.17;
      font-family: $font-1b;
      text-transform: uppercase;
      @include media(767px) {
        font-size: 16px;
      }
    }
    &-text {
      font-size: vw(24px);
      line-height: 1.17;
      font-family: $font-1r;
      text-transform: uppercase;
      @include media(767px) {
        font-size: 16px;
      }
    }
  }
  &-back {
    &-title {
      font-size: vw(24px);
      line-height: 1.17;
      font-family: $font-1r;
      text-transform: uppercase;
      margin-bottom: vw(34px);
      @include media(767px) {
        font-size: 16px;
        margin-bottom: 35px;
      }
    }
  }
}
</style>
<style lang="scss">
.error {
  &-link {
    .btn {
      min-width: unquote('min(20vw, 285px)');
      @include media(767px) {
        width: 100%;
      }
    }
  }
}
</style>
