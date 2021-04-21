<template>
  <div id="globe-view" :style="{ height: divHt }">
    <country-label
      :country-label="country"
      :mirror="mirrorCL"
      v-show="country"
    ></country-label>
    <div id="covid-map">
      <svg-map v-if="!loading"></svg-map>
      <app-loading v-else></app-loading>
      <transition name="jump">
        <div id="zoom-bar" v-if="showZoom">
          <div
            class="zoom-div zoom-in"
            @click="changeZoom(0.5)"
            :class="{ deact: zoomedIn }"
          >
            <p>+</p>
          </div>
          <div
            class="zoom-div zoom-out"
            @click="changeZoom(-0.5)"
            :class="{ deact: zoomedOut }"
          >
            <p>-</p>
          </div>
        </div>
      </transition>
    </div>
    <teleport to="#app">
      <country-view v-if="current.tagName" :current="current"></country-view>
    </teleport>
  </div>
</template>

<script>
import CountryLabel from "./CountryLabel";
import SvgMap from "./SvgMap";
import CountryView from "./CountryView";

export default {
  data() {
    return {
      divHt: 0,
      zoomedIn: false,
      zoomedOut: true,
      mirrorCL: false,
      showZoom: false,
    };
  },
  computed: {
    country() {
      return this.$store.getters.country;
    },
    current() {
      return this.$store.getters.current;
    },
    mapScale() {
      return this.$store.getters.mapScale;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  watch: {
    mapScale(val) {
      if (val >= 4) this.zoomedIn = true;
      if (val <= 1) this.zoomedOut = true;
      if (val > 1) this.zoomedOut = false;
      if (val < 4) this.zoomedIn = false;
    },
  },
  methods: {
    setHt() {
      const header = document.querySelector("#header-bar").clientHeight;
      const footer = document.querySelector("#footer-bar").clientHeight;
      this.divHt = window.innerHeight - header - footer + "px";
    },
    setLabel(e) {
      const cL = document.querySelector(".country-label");
      const xCoord = e.clientX;
      const yCoord = e.clientY;
      const windowWidth = window.innerWidth / 2;
      cL.style.top = yCoord + "px";
      if (xCoord > windowWidth) {
        this.mirrorCL = true;
      } else {
        this.mirrorCL = false;
      }
      cL.style.left = xCoord + "px";
      setTimeout(() => {
        cL.style.opacity = 1;
      }, 500);
    },
    changeZoom(zoomBy) {
      this.$store.dispatch("changeMapScale", zoomBy);
    },
  },
  components: {
    CountryLabel,
    SvgMap,
    CountryView,
  },
  mounted() {
    this.setHt();
    // ht changes
    window.addEventListener("resize", this.setHt);
    // label event listeners

    document.addEventListener("mousemove", this.setLabel);
    setTimeout(() => {
      this.showZoom = true;
      this.$store.dispatch("setShowSearch", true);
    }, 800);
  },
  beforeUnmount() {
    this.showZoom = false;
    this.$store.dispatch("setShowSearch", false);
  },
  unmounted() {
    window.removeEventListener("resize", this.setHt);
    document.removeEventListener("mousemove", this.setLabel);
  },
};
</script>

<style scoped>
#globe-view {
  width: 100%;
  position: relative;
}
#covid-map {
  width: 100%;
  height: 100%;
}
#zoom-bar {
  z-index: 10;
  position: absolute;
  bottom: 5%;
  right: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.zoom-div {
  width: 3.5rem;
  height: 3.5rem;
  text-align: center;
  background-color: var(--col-green-light-15);
  border: 2px solid var(--col-green-light-35);
  border-radius: 50%;
  color: var(--col-green-light-75);
  font-size: 2.5rem;
  transition: all ease 0.4s;
  margin: 0.5rem;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.zoom-div:hover {
  color: var(--col-green-dark);
  background-color: var(--col-green);
  border: 2px solid var(--col-green-ltdark);
  cursor: pointer;
}
.zoom-div p:hover {
  cursor: pointer;
}

.zoom-in {
  line-height: 1.3;
}
.deact {
  opacity: 0.2;
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
  .zoom-div {
    width: 2.75rem;
    height: 2.75rem;
    font-size: 2.05rem;
    margin: 0.35rem;
  }
}
</style>
