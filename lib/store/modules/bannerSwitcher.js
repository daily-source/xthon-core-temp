const state = {
  bannerImages: [
    {
      imgName: 'banner-img-4-v2.png',
      type: 'local',
    },
    {
      imgName: 'banner-img-2-v2.png',
      type: 'local',
    },
    {
      imgName: 'banner-img-3.jpg',
      type: 'local',
    },
  ],
  current: null,
};

const getters = {

};

const actions = {
  switchBannerImage({ commit }, index) {
    commit({
      type: 'changeCurrentBannerImage',
      index,
    });
  },
  switchBannerImageUrl({ commit }, url) {
    commit({
      type: 'changeCurrentBannerImageUrl',
      url,
    });
  },
};

const mutations = {
  changeCurrentBannerImage(state, data) {
    const bannerImage = state.bannerImages[data.index];
    state.current = bannerImage;
  },
  changeCurrentBannerImageUrl(state, data) {
    state.current = {
      imgUrl: data.url,
      type: 'external',
    };
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
