<template>
  <div class="page__wr">
    <Lines />
    <TopSection :title="title" :text="text" :tabs="true" />
    <Map @search="search" />
    <template v-if="searchFlag">
      <Result :items="dealers" :arrows="false" :type="'dealers'" />
    </template>
    <Become />
    <Guide />
    <Provide />
    <Mandatory />
  </div>
</template>

<script>
import TopSection from '~/components/dealers/top-section';
import Result from '~/components/service/result';
import Become from '~/components/dealers/become';
import Guide from '~/components/dealers/guide';
import Provide from '~/components/dealers/provide';
import Mandatory from '~/components/dealers/mandatory';
import Map from '~/components/dealers/map';
import Lines from '~/components/ui/lines/lines';
export default {
  components: {
    TopSection,
    Result,
    Become,
    Guide,
    Provide,
    Mandatory,
    Map,
    Lines
  },
  data() {
    return {
      searchFlag: false,
      title: 'Dealers and distributors',
      text:
        'Thank you for ',
      dealers: [
        {
          name: 'Exclusive distributor',

    };
  },
  methods: {
    search(value) {
      if (value && value.length) {
        this.searchFlag = true;
      } else {
        this.searchFlag = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page__wr {
  padding-top: 90px;
  overflow: hidden;
  position: relative;
}
</style>
