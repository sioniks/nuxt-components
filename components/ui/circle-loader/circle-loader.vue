<template>
  <LoaderIcon />
</template>

<script>
import LoaderIcon from '~/assets/images/icons/loader.svg';
export default {
  name: 'CircleLoader',
  components: { LoaderIcon }
};
</script>

<style lang="scss" scoped>
svg {
  width: vw(30px);
  height: auto;
  @include media(767px) {
    width: 30px;
  }
}
</style>
