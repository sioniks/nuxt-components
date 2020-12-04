<template>
  <div class="load-link">
    <a :href="fileUrl" target="_blank"><LoadIcon /> {{ linkText }}</a>
  </div>
</template>
<script>
import LoadIcon from '~/assets/images/icons/load-icon.svg';

export default {
  components: {
    LoadIcon
  },
  props: {
    linkText: {
      type: String,
      default: 'Download'
    },
    fileUrl: {
      type: String,
      default: null
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
.load-link {
  font-family: $font-2b;
  grid-row: 2/4;
  font-size: 16px;
  line-height: 1.2;
  color: #041c30;
  text-transform: capitalize;
  cursor: pointer;

  .svg-icon {
    margin-right: 8px;
  }
}
</style>
