<template>
  <div class="arrow-link">
    <app-link :to="to">{{ linkText }}</app-link>
    <ArrIcon />
  </div>
</template>
<script>
import ArrIcon from '~/assets/images/icons/right-arr.svg';

export default {
  components: {
    ArrIcon
  },
  props: {
    to: {
      type: [String, Object],
      default: undefined
    },
    linkText: {
      type: String,
      default: 'read more'
    }
  },
  data() {
    return {};
  },

  computed: {},
  methods: {}
};
</script>
<style scoped lang="scss">
.arrow-link {
  display: inline;
  font-size: vw(16px);
  line-height: 1.2;
  font-family: $font-2b;
  @include media(1200px) {
    font-size: 14px;
  }
  @include media(767px) {
    font-size: 16px;
  }
  &:hover {
    .svg-icon {
      transform: translateX(10px);
    }
  }
  a {
    color: $red;
  }

  .svg-icon {
    transition: all 0.3s ease;
    position: relative;
    fill: $red;
    margin-left: vw(8px);
    width: 2vw;
    height: 0.7em;
    @include media(1200px) {
      width: 16px;
      height: 11px;
      margin-left: 16px;
    }
  }
}
</style>
