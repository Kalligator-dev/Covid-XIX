<template>
  <header id="header-bar">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 202.91 202.91"
      id="logo"
      @click="setCurrent('global', 'Global')"
    >
      <path
        class="cls-1"
        d="M50.73,101.45h0a50.72,50.72,0,0,0,50.72,50.72h25.37V202.9H101.45A101.45,101.45,0,0,1,0,101.45H0A101.45,101.45,0,0,1,101.45,0H202.91V50.73H101.46A50.72,50.72,0,0,0,50.73,101.45Z"
      />
      <polygon
        class="cls-2"
        points="202.87 126.82 183.85 126.82 179.16 119.31 188.67 104.08 202.87 126.82"
      />
      <polygon
        class="cls-3"
        points="202.87 76.09 187.04 101.46 177.53 116.69 168.02 101.46 152.18 76.09 171.2 76.09 177.53 86.22 183.85 76.09 202.87 76.09"
      />
      <polygon
        class="cls-2"
        points="175.9 119.3 171.2 126.82 152.18 126.82 166.39 104.08 175.9 119.3"
      />
      <polygon
        class="cls-3"
        points="183.85 137.72 183.85 141.28 202.87 141.28 202.87 146.63 152.18 146.63 152.18 141.28 171.2 141.28 171.2 137.72 152.18 137.72 152.18 132.37 202.87 132.37 202.87 137.72 183.85 137.72"
      />
      <polygon
        class="cls-2"
        points="152.18 152.18 171.2 152.18 175.89 159.69 166.38 174.92 152.18 152.18"
      />
      <polygon
        class="cls-3"
        points="152.18 202.91 168.01 177.54 177.52 162.31 187.03 177.54 202.87 202.91 183.85 202.91 177.52 192.78 171.2 202.91 152.18 202.91"
      />
      <polygon
        class="cls-2"
        points="179.15 159.7 183.85 152.18 202.87 152.18 188.66 174.92 179.15 159.7"
      />
    </svg>
    <div id="header-icons-bar">
      <transition name="jump" mode="out-in">
        <div
          id="search-bar"
          :class="{ 'active-search-bar': inputOn }"
          v-if="showSearch"
        >
          <div id="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.9 201.9">
              <polygon
                class="cls-1"
                points="112.25 148.09 125.7 134.64 123.7 126.02 106.21 121.97 112.25 148.09"
              />
              <path
                class="cls-1"
                d="M85.22,114.26l20.29,4.7L123,123l-4-17.49-4.69-20.29a49.66,49.66,0,0,1-29,29Z"
              />
              <polygon
                class="cls-1"
                points="126 123.7 134.64 125.7 148.09 112.25 121.97 106.22 126 123.7"
              />
              <polygon
                class="cls-1"
                points="133.41 142.35 135.92 144.87 122.47 158.32 126.26 162.1 162.1 126.26 158.32 122.47 144.87 135.92 142.35 133.41 155.8 119.96 152.02 116.17 116.17 152.02 119.96 155.8 133.41 142.35"
              />
              <polygon
                class="cls-1"
                points="166.02 130.18 152.57 143.63 154.57 152.26 172.06 156.3 166.02 130.18"
              />
              <polygon
                class="cls-1"
                points="201.9 166.05 172.76 159.31 155.27 155.26 159.31 172.76 166.05 201.9 179.5 188.45 176.81 176.81 188.45 179.5 201.9 166.05"
              />
              <polygon
                class="cls-1"
                points="152.27 154.57 143.63 152.57 130.18 166.02 156.31 172.06 152.27 154.57"
              />
              <circle
                class="cls-2"
                cx="57.6"
                cy="57.6"
                r="51.6"
                transform="translate(-23.86 57.6) rotate(-45)"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="search"
            id="search-input"
            @focus="onInput"
            @blur="offInput"
            @input="search"
            v-model="inputValue"
            autocomplete="off"
          />
          <transition name="listanim" mode="out-in">
            <div class="auto-complete" v-if="inputOn && showList">
              <ul v-if="found">
                <li
                  v-for="(k, val) in found"
                  :key="`${k}-li-ac`"
                  :iso-2="k"
                  @click="setCurrent(k, val)"
                >
                  {{ val }}
                </li>
              </ul>
              <p v-else>no results found</p>
            </div>
          </transition>
        </div>
        <h1 v-else @click="$router.replace('/')">Covid XIX</h1>
      </transition>
      <router-link to="/">Map</router-link>
      <router-link to="/credits">About</router-link>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      inputOn: false,
      inputTime: null,
      inputValue: "",
      showList: false,
      found: null,
    };
  },
  computed: {
    countryList() {
      return this.$store.getters.countryList;
    },
    showSearch() {
      return this.$store.getters.showSearch;
    },
  },
  methods: {
    onInput() {
      this.inputOn = true;
      setTimeout(() => {
        this.showList = true;
      }, 145);
    },
    offInput() {
      setTimeout(() => {
        this.showList = false;
        setTimeout(() => {
          this.inputOn = false;
        }, 500);
      }, 50);
    },
    search() {
      clearTimeout(this.inputTime);
      this.inputTime = setTimeout(() => {
        const found = {};
        const list = this.countryList;
        for (const key in list) {
          if (
            key
              .trim()
              .toLowerCase()
              .includes(this.inputValue.trim().toLowerCase())
          )
            found[key] = list[key];
        }
        this.found = found;
      }, 500);
    },
    setCurrent(key, val) {
      this.inputValue = val;
      this.search();
      const found = {};
      found["tagName"] = key;
      found["name"] = val;
      this.$store.dispatch("setSearchTarget", found);
    },
  },
};
</script>

<style scoped>
#header-bar {
  z-index: 98;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}
#header-icons-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
}
#header-icons-bar h1 {
  font-size: 2.5rem;
  color: var(--col-green);
  margin-right: 0.5rem;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#logo {
  width: 4rem;
  margin: 0.5rem 1.5rem;
}
#logo .cls-1 {
  fill: rgb(3, 121, 3);
}
#logo .cls-2 {
  fill: rgb(5, 70, 5);
}
#logo .cls-3 {
  fill: rgb(0, 138, 0);
}

a {
  background-color: var(--col-green-light-15);
  color: var(--col-green-light-75);
  border-radius: 15px;
  padding: 0.5rem 0.75rem;
  margin: 0.5rem;
  transition: all ease 0.3s;
}
a:hover {
  color: rgb(0, 19, 0);
  background: var(--col-green);
}
a:active,
a.router-link-active {
  color: rgb(0, 19, 0);
  background: var(--col-green);
}

#search-bar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--col-green-light-15);
  border-radius: 25px;
  transition: all ease-in 0.15s;
}
.active-search-bar {
  border-radius: 25px 25px 0 0 !important;
}
#search-bar input {
  background: none;
  border: none;
  border-radius: 25px;
  width: 9rem;
  padding: 0.5rem;
  color: var(--col-green-light-75);
  font-size: 1rem;
  text-align: center;
  order: -1;
}
input::-webkit-input-placeholder {
  color: var(--col-green-light-35);
}

input:-ms-input-placeholder {
  color: var(--col-green-light-35);
}

input::placeholder {
  color: var(--col-green-light-35);
}
.auto-complete {
  position: absolute;
  top: 100%;
  background: var(--col-green-light-35);
  max-height: 40vh;
  width: 100%;
  overflow: auto;
  text-align: center;
  transform-origin: top;
  -moz-transform-origin: top;
  -ms-transform-origin: top;
  -o-transform-origin: top;
  -webkit-transform-origin: top;
}
.auto-complete::-webkit-scrollbar {
  width: 2px;
}
.auto-complete::-webkit-scrollbar-thumb {
  background: var(--col-green);
}
li {
  padding: 0.5rem 0.1rem;
  border-bottom: 0.5px solid var(--col-green-dark-05);
  color: var(--col-green-light-75);
}
p {
  padding: 0.5rem 0.1rem;
  background: var(--col-green-dark-05);
  color: var(--col-green-light-35);
  width: 100%;
}
li:hover {
  background: var(--col-green-dark-05);
  color: var(--col-green);
  cursor: pointer;
}
#search-icon {
  width: 2.75rem;
  padding: 0.1rem;
  margin: 0.2rem 0.2rem;
  border-radius: 50%;
  background-color: var(--col-green-dark-05);
  cursor: pointer;
}
svg {
  margin: 0.4rem;
}
svg polygon,
svg path {
  fill: var(--col-green);
  transition: all ease-in-out 0.3s;
}
svg circle {
  stroke: var(--col-green-light-35);
  stroke-width: 20px;
  fill: none;
  transition: all ease-in-out 0.3s;
}
.active-search-bar svg circle {
  stroke: var(--col-green-light-75);
  stroke-width: 20px;
}
.active-search-bar svg polygon {
  stroke: var(--col-green-light-15);
  stroke-width: 10px;
}

.listanim-enter-from,
.listanim-leave-to {
  opacity: 0.5;
  transform: scaleY(0);
}
.listanim-enter-active,
.listanim-leave-active {
  transition: all 0.5s ease;
}
.listanim-enter-to,
.listanim-leave-from {
  opacity: 1;
  transform: scaleY(1);
}

.jump-enter-from {
  opacity: 0;
  transform: translateY(25%);
}
.jump-leave-to {
  opacity: 0;
  transform: translateY(-25%);
}
.jump-enter-active,
.jump-leave-active {
  transition: all 0.75s ease-in;
}
.jump-enter-to,
.jump-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 800px) {
  #header-bar {
    padding: 0.25rem;
  }
  #header-icons-bar {
    margin-right: 0.15rem;
  }
  #header-icons-bar h1 {
    font-size: 2rem;
  }
  #logo {
    width: 3.5rem;
    margin: 0.15rem 0.5rem;
  }
  #search-bar input {
    width: 8rem;
  }
  a {
    display: none;
  }
  #search-icon {
    width: 2rem;
    padding: 0.1rem;
    margin: 0.2rem 0.2rem;
    border-radius: 50%;
    background-color: var(--col-green-dark-05);
    cursor: pointer;
  }
}
</style>
