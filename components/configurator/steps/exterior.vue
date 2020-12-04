<template>
  <div class="container">
    <div class="configurator__section-wr">
      <section v-for="(param, index) in data.components" :key="index">
        <div class="configurator__heading">
          <h2>{{ param.title || '' }}</h2>
          <h5>{{ param.description || '' }}</h5>
        </div>
        <div class="card__wr">
          <template v-if="param.type === 'card_with_list'">
            <div class="card-list__wr">
              <CardWithList
                v-for="(item, cardIndex) in param.items"
                :key="cardIndex"
                :options="item"
                :items-arr="param.items"
              />
            </div>
          </template>
          <template v-if="param.type === 'card_simple'">
            <div class="card-list__wr">
              <CardSimple
                v-for="(item, cardIndex) in param.items"
                :key="cardIndex"
                :options="item"
              />
            </div>
          </template>
          <template v-if="param.type === 'card_simple_image'">
            <div class="card-img__wr">
              <CardSimpleWithImage
                v-for="(item, cardIndex) in param.items"
                :key="cardIndex"
                :options="item"
              />
            </div>
          </template>
          <template v-if="param.type === 'engine'">
            <div class="card-engine__wr">
              <CardEngine
                v-for="(item, cardIndex) in param.items"
                :key="cardIndex"
                :options="item"
                :card-index="cardIndex"
                :items-arr="param.items"
              />
            </div>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardWithList from '~/components/configurator/cards/card-with-list';
import CardSimple from '~/components/configurator/cards/card-simple';
import CardSimpleWithImage from '~/components/configurator/cards/card-simple-with-image';
import CardEngine from '~/components/configurator/cards/card-engine';
export default {
  components: {
    CardWithList,
    CardSimple,
    CardSimpleWithImage,
    CardEngine
  },
  props: {
    step: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters('configurator', ['getComponentData']),
    data() {
      return this.getComponentData(this.step);
    }
  }
};
</script>
