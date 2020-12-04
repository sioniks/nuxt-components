<template>
  <section class="section result" :class="`result_${type}`">
    <div class="container">
      <div class="result-content">
        <div
          v-for="(city, index) in getItems"
          :key="index"
          :class="{ close: !city.open && arrows }"
          class="result-list"
        >
          <h2 class="result-list-title" @click="changeVisible(index)">
            {{ city.name }}
            <div v-if="type === 'service'" class="count">
              {{ city.services.length }}
            </div>
            <div v-if="arrows" class="arrow">
              <ArrowIcon />
            </div>
          </h2>
          <template v-if="!arrows || (arrows && city.open)">
            <div
              v-for="service in city.services"
              :key="service.name"
              class="result-item"
            >
              <h6 class="result-item-title">{{ service.name }}</h6>
              <p class="result-item-type">{{ service.type }}</p>
              <div class="result-item-info info">
                <div class="info-item info-item_address">
                  <div class="info-item-text">{{ service.address.street }}</div>
                  <div class="info-item-text">{{ service.address.city }}</div>
                  <div class="info-item-text">
                    {{ service.address.country }}
                  </div>
                </div>
                <div class="info-item info-item_phones">
                  <a
                    v-for="(phone, phoneIndex) in service.phones"
                    :key="phoneIndex"
                    :href="`tel:${phone}`"
                    class="info-item-text"
                  >
                    {{ phone }}
                  </a>
                </div>
                <div class="info-item info-item_contacts">
                  <a :href="`mailto:${service.email}`" class="info-item-text">
                    {{ service.email }}
                  </a>
                  <a :href="service.website" class="info-item-text website">
                    {{ service.website }}
                  </a>
                </div>
                <div class="info-item info-item_times">
                  <p class="info-item-text">{{ service.status }}</p>
                  <p class="info-item-text">{{ service.times }}</p>
                </div>
                <div class="info-item info-item_btn">
                  <Button />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Button from '~/components/ui/btn/btn-route';
import ArrowIcon from '~/assets/images/icons/arrow-top.svg';
export default {
  components: {
    Button,
    ArrowIcon
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    arrows: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null
    }
  },
  computed: {
    getItems() {
      return this.items;
    }
  },
  methods: {
    changeVisible(index) {
      this.items[index].open = !this.items[index].open;
    }
  }
};
</script>
<style lang="scss" scoped>
.result {
  &-content {
    margin-top: vw(50px);
  }
  &-list {
    margin-top: vw(64px);
    &.close {
      padding-bottom: vw(40px);
      border-bottom: 1px solid #ebebeb;
      .arrow {
        transform: rotate(180deg);
      }
    }
    &:first-child {
      margin-top: 0;
    }
    &-title {
      font-size: vw(32px);
      line-height: 1;
      font-family: $font-1b;
      text-transform: uppercase;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      transition: color 0.5s ease;
      &:hover {
        color: $red;
      }
      .arrow {
        width: vw(22px);
        height: vw(22px);
        cursor: pointer;
        box-sizing: content-box;
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          width: vw(12px);
          height: vw(5px);
        }
      }
      .count {
        color: $gray;
        margin-left: vw(5px);
      }
    }
  }
  &-item {
    padding: vw(40px) 0;
    border-bottom: 1px solid #ebebeb;
    &-title {
      font-family: $font-1b;
      text-transform: uppercase;
      color: $gray;
      font-size: vw(18px);
      line-height: 1.25;
    }
    &-type {
      color: $gray;
      font-size: vw(16px);
      line-height: 1.19;
    }
    &-info {
      display: flex;
      justify-content: space-between;
    }
  }
}
.info {
  margin-top: vw(20px);
  &-item {
    margin-right: vw(10px);
    display: flex;
    flex-direction: column;
    &:last-child {
      margin-right: 0;
    }
    &-text {
      font-size: vw(16px);
      line-height: 1.68;
      &.website {
        color: #d2131c;
      }
    }
    &_address {
      width: 20%;
    }
    &_phones {
      width: 18%;
    }
    &_contacts {
      width: 25%;
    }
    &_times {
      width: 18%;
    }
    &_btn {
      width: 19%;
    }
  }
}
</style>
