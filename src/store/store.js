import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state: {
    country: "",
    current: {},
    mapScale: 1,
    mode: "dark",
    loading: false,
    slugs: null,
    summary: null,
    live: null,
    searchTarget: null,
    showSearch: false,
  },
  mutations: {
    fetchData(state, payload) {
      state.slugs = payload;
    },
    fetchSummary(state, payload) {
      state.summary = payload;
    },
    setCountry(state, payload) {
      state.country = payload;
    },
    setCurrent(state, payload) {
      state.current = payload;
    },
    setSearchTarget(state, payload) {
      state.searchTarget = payload;
    },
    setShowSearch(state, payload) {
      state.showSearch = payload;
    },
    setLive(state, payload) {
      state.live = payload;
    },
    setMapScale(state, payload) {
      state.mapScale = payload;
    },
    changeMapScale(state, payload) {
      let res = state.mapScale + payload;
      if (res > 4) res = 4;
      if (res < 1) res = 1;
      state.mapScale = res;
    },
    setLoading(state, payload = false) {
      state.loading = payload;
    },
  },
  actions: {
    async fetchData(context) {
      context.commit("setLoading", true);
      let data = localStorage.getItem("slugs");
      if (data) {
        const slugs = await JSON.parse(data);
        context.commit("fetchData", slugs);
      } else {
        data = await axios.get("https://api.covid19api.com/countries");
        if (data.status != 200) {
          const error = new Error(data.message || "Failed to fetch!");
          throw error;
        }
        //   Set Slugs
        const countryList = {};
        for (const key of data.data) {
          countryList[key["ISO2"]] = key["Slug"];
        }
        localStorage.setItem("slugs", JSON.stringify(countryList));
        context.commit("fetchData", countryList);
      }
      const updated = +localStorage.getItem("updated");
      const now = new Date().getTime();
      if (!updated || now - updated >= 86400000) {
        await this.dispatch("fetchSummary");
        localStorage.setItem("updated", now);
        context.commit("setLoading", false);
      } else {
        const sum = await JSON.parse(localStorage.getItem("summary"));
        context.commit(
          "fetchSummary",
          sum
        );
        context.commit("setLoading", false);
      }
      context.commit("setLoading", false);
    },
    async fetchSummary(context) {
      const data = await axios.get("https://api.covid19api.com/summary");
      if (data.status != 200) {
        const error = new Error(data.message || "Failed to fetch!");
        throw error;
      }
      const countryList = {};
      for (const key of data.data.Countries) {
        countryList[key["CountryCode"]] = { ...key };
      }
      countryList.global = { ...data.data.Global };
      localStorage.setItem("summary", JSON.stringify(countryList));
      context.commit("fetchSummary", countryList);
    },
    setCountry(context, payload) {
      context.commit("setCountry", payload);
    },
    setCurrent(context, payload) {
      payload.slug = context.state.slugs[payload.tagName];
      context.commit("setCurrent", payload);
    },
    setShowSearch(context, payload) {
      context.commit("setShowSearch", payload);
    },
    setSearchTarget(context, payload) {
      if (payload) {
        payload.slug = context.state.slugs[payload.tagName];
      }
      context.commit("setSearchTarget", payload);
    },
    async getCurrentData(context, payload) {
      const current = context.state.current;
      const now = new Date().getTime();
      const live = localStorage.getItem(current.tagName);
      const updatedTxt = current.tagName + "upd";
      if (live) {
        const liveObj = JSON.parse(live);
        let updated = localStorage.getItem(updatedTxt);
        updated = +updated;
        if (now - updated < 86400000) {
          context.commit("setLive", liveObj.data);
          return;
        }
      }
      const data = await axios.get(payload);
      if (data.status != 200) {
        const error = new Error(data.message || "Failed to fetch!");
        throw error;
      }
      const responseData = data.data;
      localStorage.setItem(updatedTxt, now);
      context.commit("setLive", responseData);
      localStorage.setItem(current.tagName, JSON.stringify(responseData));
    },
    setMapScale(context, payload) {
      context.commit("setMapScale", payload);
    },
    changeMapScale(context, payload) {
      context.commit("changeMapScale", payload);
    },
  },
  getters: {
    country(state) {
      return state.country;
    },
    current(state) {
      return state.current;
    },
    mapScale(state) {
      return state.mapScale;
    },
    mode(state) {
      return state.mode;
    },
    loading(state) {
      return state.loading;
    },
    summary(state) {
      const found = state.summary[state.current.tagName];
      if (found) found["found"] = true;
      return found ? found : state.summary["global"];
    },
    countryList(state) {
      let countries = {};
      let summary = state.summary;
      for (const key in summary) {
        if (key === "IL") {
          countries["Occupied Palestine"] = key;
        } else if (key === "PS") {
          countries["Palestine"] = key;
        } else if (key === "global") {
          countries['Global'] = key;
        } else {
          countries[summary[key].Country] = key;
        }
      }
      return countries;
    },
    searchTarget(state) {
      return state.searchTarget;
    },
    showSearch(state) {
      return state.showSearch;
    },
  },
});

export default store;
