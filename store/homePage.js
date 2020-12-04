export const state = () => ({
  videoPopup: false,
  pageContent: {},
  isFetching: false
});

export const mutations = {
  handleVideoView(state) {
    state.videoPopup = !state.videoPopup;
  },
  setContent(state, data) {
    state.pageContent = data;
  },
  setFetchingStatus(state, val) {
    state.isFetching = val;
  }
};
