<template>
  <section class="section section-durability">
    <div class="container">
      <div class="section-header durability-header">Durability</div>
      <div class="elements-wr">
        <div v-for="(elem, index) in elements" :key="index" class="element">
          <div class="element-descr">
            <div class="element_title">{{ elem.title }}</div>
            <div class="element_subtitle">{{ elem.subtitle }}</div>
          </div>
          <div class="element_img">
            <img :src="require(`~/assets/images/${elem.img}`)" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      elements: [
        {
          title: 'sdfsdf',
          subtitle: 'lorem',
          img: 'tires.png'
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.durability-header {
  margin-top: 10vw;
  margin-bottom: 10vw;
}
.elements-wr {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10vw;
}
.element {
  position: relative;
  display: flex;
  justify-content: space-between;
  min-height: unquote('min(30vw, 400px)');
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5vw;
    width: calc(100% + 5vw);
    height: 2px;
    background: #f4f5f6;
  }
  &:nth-child(odd) {
    &:before {
      content: '';
      position: absolute;
      right: -5vw;
      top: -5vw;
      width: 2px;
      height: calc(100% + 10vw);
      background: #f4f5f6;
    }
  }
  &:nth-child(even) {
    &:after {
      left: -5vw;
    }
  }
  &:nth-child(1) {
    &:before {
      top: 0;
      height: calc(100% + 5vw);
    }
  }
  &:last-child {
    &:after {
      display: none;
    }
  }
  &:nth-last-child(2) {
    &:after {
      display: none;
    }
    &:before {
      top: -5vw;
      height: calc(100% + 5vw);
    }
  }
  .element-descr {
    width: 35%;
  }
  .element-img {
    width: 45%;
  }
  .element_title {
    font-family: $font-1b;
    font-size: vw(36px);
    line-height: 1.2;
    text-transform: uppercase;
    color: #041c30;
    margin-bottom: 3vw;
    margin-top: 3vw;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: -1.5vw;
      width: 2vw;
      left: 0;
      height: 2px;
      background: $red;
    }
  }
  .element_subtitle {
    font-family: $font-1r;
    font-size: vw(16px);
    line-height: 1.5;
    color: #000000;
  }
}
</style>
