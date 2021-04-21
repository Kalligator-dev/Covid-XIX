<template>
  <app-header></app-header>
  <router-view v-slot="slotProps">
    <transition name="slide" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <app-footer></app-footer>
</template>

<script>
import AppHeader from "./components/Header.vue";
import AppFooter from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  created() {
    try {
      this.$store.dispatch("fetchData");
    } catch (err) {
      console.log(err, 'trying a fix')
      localStorage.removeItem("summary");
      localStorage.removeItem("slugs");
      localStorage.removeItem("updated");
      this.$store.dispatch("fetchData");
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: "Barlow Semi Condensed", sans-serif;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--col-0);
  transition: background-color 5000s ease-in-out 0s;
}

:root {
  --col-00: #001300;
  --col-0: #edf5e1;
  --col-1: #fc4445;
  --col-2: #3feee6;
  --col-3: #55bcc9;
  --col-4: #97caef;
  --col-5: #cafafe;
  --col-6: #05386b;
  --col-7: #5cdb95;
  --col-8: #8ee4af;
  --col-9: #378683;
  --col-10: #c3073f;
  --col-11: #00ff0a;
  --col-11-80: #00ff0a80;
  --col-12: #00ffa005;
  --col-green: rgb(0, 138, 0);
  --col-green-light-75: rgba(155, 255, 155, 0.75);
  --col-green-light-35: rgba(155, 255, 155, 0.35);
  --col-green-light-15: rgba(155, 255, 155, 0.15);
  --col-green-ltdark: rgb(0, 50, 0);
  --col-green-dark: rgb(0, 19, 0);
  --col-green-dark-05: rgba(0, 19, 0, 0.5);
}

html {
  height: 100%
}
body {
  height: 100%;
  overflow: hidden;
  background: var(--col-00);
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: -webkit-fill-available;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

a {
  text-decoration: none;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-from {
  transform: translateX(-25%);
}
.slide-leave-to {
  transform: translateX(25%);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
