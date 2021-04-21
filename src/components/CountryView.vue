<template>
  <div id="country-card">
    <transition name="animbg" mode="out-in">
      <div id="country-bg" @click="close" v-if="showBg"></div>
    </transition>
    <transition name="rotateanim" mode="out-in">
      <div id="country-view" v-show="showCountry">
        <div id="mini-header">
          <h2>{{ current.name }}</h2>
          <div id="link-bar">
            <a @click.prevent class="active">Summary</a>
          </div>
        </div>
        <p v-if="!found">
          Sorry. Couldn't find any data related to this country. Please try
          again later. Showing Global data instead
        </p>

        <ul>
          <li>
            <h4>New Confirmed :</h4>
            <span>{{ summary.NewConfirmed.toLocaleString() }}</span>
          </li>
          <li>
            <h4>New Deaths :</h4>
            <span>{{ summary.NewDeaths.toLocaleString() }}</span>
          </li>
          <li>
            <h4>New Recovered :</h4>
            <span>{{ summary.NewRecovered.toLocaleString() }}</span>
          </li>
          <li>
            <h4>Total Confirmed :</h4>
            <span>{{ summary.TotalConfirmed.toLocaleString() }}</span>
          </li>
          <li>
            <h4>Total Deaths :</h4>
            <span>{{ summary.TotalDeaths.toLocaleString() }}</span>
          </li>
          <li>
            <h4>Total Recovered :</h4>
            <span>{{ summary.TotalRecovered.toLocaleString() }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCountry: false,
      showBg: false,
      live: {},
    };
  },
  computed: {
    summary() {
      return this.$store.getters.summary;
    },
    found() {
      return this.summary.found;
    },
  },
  props: ["current"],
  methods: {
    close() {
      this.showCountry = false;
      setTimeout(() => {
        this.showBg = false;
      }, 250);
      setTimeout(() => {
        this.$store.dispatch("setCurrent", {});
        this.$store.dispatch("setSearchTarget", null);
      }, 850);
    },
  },
  mounted() {
    this.showBg = true;
    setTimeout(() => {
      this.showCountry = true;
    }, 300);
  },
};
</script>

<style scoped>
#country-card {
  z-index: 20;
  width: 100%;
  height: 95%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#country-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150vw;
  height: 150vw;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
}

#country-view {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  text-align: center;
  color: seashell;
  width: 60%;
  height: 80%;
  border-radius: 20px;
  backdrop-filter: blur(3.5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border-right: 6px solid rgba(255, 255, 255, 0.15);
  border-top: 4px solid rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  display: flex;
  flex-direction: column;
}

#country-view h2 {
  margin: 0.5rem;
  font-size: 2.25rem;
  color: var(--col-green);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 2rem;
  max-height: 4rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
#country-view p {
  margin: 0.5rem;
}

#mini-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

a {
  background-color: var(--col-green-light-15);
  color: var(--col-green-light-75);
  border-radius: 15px;
  padding: 0.5rem 0.75rem;
  margin: 0.5rem;
  transition: all ease 0.3s;
  font-size: 0.9rem;
}
a:hover {
  color: rgb(0, 19, 0);
  background: var(--col-green);
  cursor: pointer;
}
a:active,
a.active,
a.router-link-active {
  color: rgb(0, 19, 0);
  background: var(--col-green);
}

ul {
  height: 100%;
  text-decoration: none;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

li {
  display: flex;
  border-radius: 25px;
  padding: 1rem 2rem;
  margin: 0.5rem 0 0 3rem;
}
h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 1.1rem;
  max-height: 1.1rem;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
li:nth-child(odd) {
  background: var(--col-green-dark-05);
  color: var(--col-green);
}
li:nth-child(even) {
  background: var(--col-green-light-15);
  color: var(--col-green-light-75);
}
li span {
  margin-left: 0.5rem;
  line-height: 1.15;
}

.animbg-enter-active {
  animation: animbg 0.75s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
}
.animbg-leave-active {
  animation: animbg 0.75s ease-in reverse;
}
@keyframes animbg {
  0% {
    width: 0.1rem;
    height: 0.1rem;
  }
  100% {
    width: 150vw;
    height: 150vw;
  }
}

.rotateanim-enter-from,
.rotateanim-leave-to {
  opacity: 0.8;
  transform: rotateY(90deg);
}
.rotateanim-enter-active,
.rotateanim-leave-active {
  transition: all 0.5s ease;
}
.rotateanim-enter-to,
.rotateanim-leave-from {
  opacity: 1;
  transform: rotateY(0deg);
}

@media (max-width: 800px) {
  #country-card {
    z-index: 90;
  }
  #country-bg {
    width: 150vh;
    height: 150vh;
  }

  #country-view {
    padding: 0.5rem;
    width: 95%;
  }

  #country-view h2 {
    font-size: 1.75rem;
  }

  #mini-header {
    padding: 0.25rem;
  }

  a {
    margin: 0.25rem;
  }

  li {
    padding: 0.75rem;
    align-items: center;
    justify-content: center;
    margin: 0.25rem;
  }
  li span {
    margin-left: 0.4rem;
  }
}

@media (max-width: 300px) {
  h4 {
    font-size: 0.625rem;
  }
}
</style>
