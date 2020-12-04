<template>
  <section class="guide section">
    <div class="container">
      <h3 class="guide-title">
        Guidelines for dealers<br />
        and distributors
      </h3>
      <p class="guide-description">
        You can download materials and guidelines if you have already become a
        dealer or distributor of .
        <br />
        These materials will help you in your work.
      </p>
      <Button btn-type="red" btn-text="Download guidelines" />
    </div>
  </section>
</template>

<script>
import Button from '~/components/ui/btn/btn';
export default {
  components: { Button }
};
</script>
<style lang="scss" scoped>
.guide {
  padding: vw(84px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-title {
    font-size: vw(40px);
    line-height: 1.3;
    font-family: $font-2b;
    margin-bottom: vw(24px);
    text-transform: uppercase;
    color: $darkBlue;
  }
  &-description {
    color: $gray;
    font-size: vw(16px);
    line-height: 1.69;
    margin-bottom: vw(56px);
  }
}
</style>
