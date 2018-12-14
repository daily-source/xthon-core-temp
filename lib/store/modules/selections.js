const state = {
  data: [
    {
      name: 'soda',
      label: 'Soda',
    },
    {
      name: 'clothing',
      label: 'New clothes',
    },
    {
      name: 'new-gear-of-toys',
      label: 'New gear or toys',
    },
    {
      name: 'paid-sporting-events',
      label: 'Paid sporting events',
    },
    {
      name: 'alcohol',
      label: 'Alcohol',
    },
    {
      name: 'nice-restaurants',
      label: 'Nice restaurants',
    },
    {
      name: 'tv-internet-spending',
      label: 'TV / internet spending ',
    },
    {
      name: 'electronics',
      label: 'New electronics',
    },
    {
      name: 'movies',
      label: 'Movies',
    },
    {
      name: 'lawn-service',
      label: 'Lawn service',
    },
    {
      name: 'coffee',
      label: 'Coffee',
    },
    {
      name: 'candy',
      label: 'Candy',
    },
    {
      name: 'beauty-products',
      label: 'Beauty products',
    },
    {
      name: 'tobacco-smoking',
      label: 'Tobacco / smoking',
    },
    {
      name: 'desserts',
      label: 'Desserts',
    },
    {
      name: 'chocolate',
      label: 'Chocolate',
    },
    {
      name: 'new-furniture',
      label: 'New furniture',
    },
    {
      name: 'music-purchases',
      label: 'Music purchases',
    },
    {
      name: 'home-improvements',
      label: 'Home improvements',
    },
    {
      name: 'car-washes',
      label: 'Car washes',
    },
    {
      name: 'travel',
      label: 'Travel',
    },
    {
      name: 'gas',
      label: 'Gas',
    },
    {
      name: 'next-car',
      label: 'Cost of next car',
    },
    {
      name: 'meals-higher',
      label: 'Meals higher than',
      hasCustomField: true,
    },
    {
      name: 'concerts-higher',
      label: 'Concerts higher than',
      hasCustomField: true,
    },
  ],
  selected: [],
  expanded: false,
};

const mutations = {
  setExpanded(state, { expanded }) {
    state.expanded = expanded;
  },

  setSelected(state, { selected }) {
    state.selected = selected;
  },
};

const actions = {
  toggleExpanded({ state, commit }) {
    commit('setExpanded', { expanded: !state.expanded });
  },

  pushSelected({ state, commit }, { choice, customLabel }) {
    const isAlreadyAdded = state.selected.find(data => data.name === choice.name);
    if (!isAlreadyAdded) {
      state.selected.push({
        perMonthValue: 0,
        label: customLabel || choice.label,
        name: choice.name,
      });
      commit('setSelected', { selected: state.selected });
    }
  },

  removeSelected({ state, commit }, { choice }) {
    const selected = state.selected.filter(data => data.name !== choice.name);
    commit('setSelected', { selected });
  },

  setSelectedPercentValue({ state, commit }, { choice, perMonthValue }) {
    state.selected.find((data) => {
      if (data.name === choice.name) data.perMonthValue = perMonthValue;
    });
    commit('setSelected', { selected: state.selected });
  },

  changeSelectedLabel({ state, commit }, { choice, label }) {
    state.selected.forEach((data) => {
      if (data.name === choice.name) data.label = label;
    });

    commit('setSelected', { selected: state.selected });
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
