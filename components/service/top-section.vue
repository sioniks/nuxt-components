<template>
  <section class="service section">
    <Lines />
    <div class="container">
      <h2 class="service-title section__header">service</h2>
      <h6 class="service-description">
        We have the best and fastest service.<br />
        Anywhere
      </h6>
      <Tabs />
    </div>
  </section>
</template>

<script>
import Lines from '~/components/ui/lines/lines';
import Tabs from '~/components/service/tabs';
export default {
  components: {
    Lines,
    Tabs
  }
};
</script>
<style lang="scss" scoped>
.service {
  padding: vw(65px) 0 vw(40px);
  position: relative;
  overflow: hidden;
  &-title {
    text-align: left;
    text-transform: uppercase;
    margin-bottom: vw(30px);
    max-width: vw(870px);
  }
  &-description {
    font-family: $font-2b;
    font-weight: bold;
    font-size: vw(34px);
    line-height: 1.3;
    text-transform: uppercase;
    max-width: vw(870px);
    color: $darkBlue;
  }
}
</style>
