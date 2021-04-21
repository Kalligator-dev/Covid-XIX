<template>
  <footer id="footer-bar">
    <p>©2020 Kalligator</p>
    <div class="footer-icons">
      <router-link to="/">Map</router-link>
      <router-link to="/credits">About</router-link>
    </div>
  </footer>
</template>

<style scoped>
#footer-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
}
p {
  text-align: center;
  color: var(--col-green);
  opacity: 0.7;
}

.footer-icons {
  display: flex;
  margin-left: 0.5rem;
  display: none;
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

@media (max-width: 800px) {
  #footer-bar {
    justify-content: space-between;
    padding: 0.15rem 0.15rem;
  }
  p {
    margin-right: 0.5rem;
    order: 1;
  }

  .footer-icons {
    display: flex;
  }
  a {
    padding: 0.3rem 0.5rem;
    margin-right: 0.25rem;
  }
}
</style>
