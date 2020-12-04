<template>
  <form class="search" @submit="search($event)">
    <div class="search-svg">
      <IconLocation />
    </div>
    <input
      v-model="searchValue"
      class="search-input"
      type="text"
      placeholder="Enter your location"
    />
    <div class="search-text">No results</div>
    <button type="submit" class="btn search-btn">
      <IconSearch />
      search
    </button>
  </form>
</template>

<script>
import IconLocation from '~/assets/images/icons/location.svg';
import IconSearch from '~/assets/images/icons/search-icon.svg';
export default {
  components: {
    IconLocation,
    IconSearch
  },
  data() {
    return {
      searchValue: null
    };
  },
  methods: {
    search(e) {
      e.preventDefault();
      this.$emit('search', this.searchValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  position: absolute;
  top: vw(40px);
  height: vw(60px);
  width: vw(870px);
  background: #ffffff;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  &-svg {
    width: vw(88px);
    border-right: 1px solid #f4f5f6;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    path {
      transition: fill 0.5s ease;
    }
    svg {
      width: vw(24px);
    }
  }
  &-input {
    width: 100%;
    color: #000000;
    border: none;
    font-size: vw(16px);
    font-family: $font-1b;
    padding: 0 vw(24px);
    outline: none;
    &::placeholder {
      color: #000000;
      font-family: $font-1r;
    }
  }
  &-btn {
    width: vw(200px);
    flex-shrink: 0;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-2b;
    font-size: vw(16px);
    background: #d2131c;
    text-transform: uppercase;
    transition: background-color 0.5s ease;
    svg {
      margin-right: vw(16px);
      width: vw(14px);
    }
    &:hover {
      background: $black;
    }
  }
  &-text {
    display: flex;
    align-items: center;
    padding: 0 vw(24px);
    text-transform: uppercase;
    color: #919aa1;
    white-space: nowrap;
    flex-shrink: 0;
    font-family: $font-1b;
  }
}
</style>
