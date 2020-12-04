<template>
  <section class="become section">
    <div class="container">
      <h2 class="become-title section__header">
        How to become dealer<br />
        or distributor
      </h2>
    </div>
    <BecomeList />
  </section>
</template>

<script>
import BecomeList from '~/components/dealers/become-list';
export default {
  components: {
    BecomeList
  }
};
</script>
<style lang="scss" scoped>
.become {
  padding: vw(128px) 0 vw(12px);
  &-title {
    text-align: left;
    text-transform: uppercase;
    margin-bottom: vw(88px);
  }
}
</style>
