<template>
  <button class="scroll-btn">Scroll down</button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.scroll-btn {
  font-family: $font-1r;
  font-size: vw(14px);
  line-height: 1.1;
  color: #ffffff;
  display: block;
  overflow: hidden;
  height: 42px;
  border: none;
  background: none;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 6;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s ease;
  @include media(1200px) {
    font-size: 14px;
  }
  &:hover {
    color: $red;
  }
  &:before {
    display: block;
    content: '';
    height: 42px;
    width: 2px;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(#ffffff, 0.34);
  }
  &:after {
    display: block;
    content: '';
    height: 21px;
    width: 2px;
    position: absolute;
    left: 0;
    top: 0;
    background: #ffffff;
    transition: all 0.3s ease-in-out;
    animation: scroll infinite 1.4s;
  }
}

@keyframes scroll {
  from {
    top: -50%;
  }
  to {
    top: 100%;
  }
}
</style>
