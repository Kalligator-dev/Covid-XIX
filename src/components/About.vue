<template>
  <div :style="{height: pageHt}">
    <base-card title="About" class="about">
      <template v-slot:nav>
        <a
          v-for="val in list"
          :key="val"
          :class="{ active: val == cur }"
          @click="scrollToCur(val)"
          >{{ val }}</a
        >
      </template>
      <ul class="about-content">
        <li class="me">
          <h3>Me</h3>
          <p>
            A front-end developer going for the full-stack club. Open to
            exciting ideas. I use HTML5, CSS3, JS, Vue3(vuex, router) and
            Firebase. Attached is my Email if you are interested in getting in
            touch. Also you will find my Github profile if you want to check my
            work
          </p>
          <div id="contact" class="inline-links">
            <a href="https://Kalligator.com" target="_blank"
              >Portfolio</a
            >
            <a href="mailto:kalligator04@gmail.com" target="_blank"
              >Contact Me</a
            >
            <a href="https://github.com/Kalligator-dev" target="_blank"
              >Github</a
            >
          </div>
        </li>
        <li class="map">
          <h3>Map</h3>
          <p>
            The world map is an svg I used from simple Maps. The map had ISO
            codes and names implemented so it made my life so much easier. A
            huge 'Thank you' to these guys.
          </p>
          <div class="inline-links">
            <a href="https://simplemaps.com/resources/svg-world" target="_blank"
              >Map</a
            >
          </div>
        </li>
        <li class="api">
          <h3>Api</h3>
          <p>
            The Api used is Coronavirus COVID19 API. It has amazing resources to
            use freely and covered what I needed for this simple project. A huge
            'Thank you' to these guys as well.
          </p>
          <div class="inline-links">
            <a
              href="https://documenter.getpostman.com/view/10808728/SzS8rjbc#27454960-ea1c-4b91-a0b6-0468bb4e6712"
              target="_blank"
              >Api Documentation</a
            >
          </div>
        </li>
        <li class="loader">
          <h3>Loader</h3>
          <p>
            The loader/spinner that appears while loading the data from the api
            is actually a vue component made by Maximilian Schwarzmüller in his
            vue course. Go check him out in Udemy he is awesome.
          </p>
          <div class="inline-links">
            <a
              href="https://www.udemy.com/user/maximilian-schwarzmuller/"
              target="_blank"
              >Max's Profile</a
            >
          </div>
        </li>
      </ul>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cur: "Me",
      list: ["Me", "Map", "api", "Loader"],
      pageHt: 0
    };
  },
  methods: {
    scrollToCur(val) {
      this.cur = val;
      const el = document.querySelector(`.${val.toLowerCase()}`);
      el.parentNode.parentNode.scrollTop = el.offsetTop;
    },
    sizeChanged(e){
      const headerHt = document.querySelector('#header-bar').clientHeight;
      const footerHt = document.querySelector('#footer-bar').clientHeight;
      const pageHt = e.target.innerHeight - headerHt - footerHt;
      this.pageHt = pageHt + 'px'
    },
  },
  mounted(){
    const e = { target: {}}
    e.target['innerHeight'] = window.innerHeight;
    this.sizeChanged(e);
    window.addEventListener("resize", this.sizeChanged);
  },
  unmounted() {
    this.$store.dispatch("setMapScale", 1);
    window.removeEventListener("resize", this.sizeChanged);
  },
};
</script>

<style scoped>
.about {
  width: 85%;
  max-width: 95vw;
  justify-self: center;
  align-self: center;
}
div {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 100%;
}
h1 {
  color: var(--col-green);
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
  position: relative;
  padding: 0.5rem;
  text-decoration: none;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
p {
  line-height: 1.4;
  font-size: 1.1rem;
  word-wrap: break-word;
}
h3 {
  padding: 0.5rem 1rem;
  display: inline-block;
  border-radius: 25px;
  margin-bottom: 1.25rem;
}
li:nth-child(odd) h3 {
  align-self: flex-start;
}
li:nth-child(even) h3 {
  align-self: flex-end;
}

li {
  width: 85%;
  border-radius: 50px;
  padding: 2rem;
  margin: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
}
li:nth-child(odd),
li:nth-child(even) h3 {
  background: var(--col-green-light-15);
  color: var(--col-green-light-75);
}
li:nth-child(even),
li:nth-child(odd) h3 {
  background: var(--col-green-dark-05);
  color: var(--col-green);
}
li:nth-child(odd) {
  align-self: flex-start;
}
li:nth-child(even) {
  align-self: flex-end;
}
li span {
  margin-left: 0.5rem;
  line-height: 1.15;
}
.inline-links {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0;
  width: 50%;
  border-radius: 50px;
}
li:nth-child(odd) .inline-links {
  align-self: flex-end;
  justify-content: flex-end;
  margin-right: 1.5rem;
}
li:nth-child(even) .inline-links {
  align-self: flex-start;
  justify-content: flex-start;
  margin-left: 1.5rem;
}

@media (max-width: 800px) {
  .about {
    width: 100%;
  }
  div {
    padding: 1rem;
  }
  a {
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
  }

  ul {
    padding: 0.25rem;
    width: 100%;
  }
  h3 {
    padding: 0.35rem 0.75rem;
    margin-bottom: 1rem;
  }

  li {
    width: 100%;
    border-radius: 25px;
    padding: 0.5rem;
    margin: 0.15rem 0 1rem 0;
  }
  li:nth-child(odd) {
    align-self: center;
  }
  li:nth-child(even) {
    align-self: center;
  }
  .inline-links {
    padding: 0;
    width: 100%;
  }
  li:nth-child(odd) .inline-links {
    align-self: center;
    justify-content: center;
    margin: 0;
  }
  li:nth-child(even) .inline-links {
    align-self: center;
    justify-content: center;
    margin: 0;
  }
}
</style>
