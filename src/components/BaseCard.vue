<template>
  <div class="card">
    <header>
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
      <nav>
        <slot name="nav"></slot>
      </nav>
    </header>
    <section class="card-content">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.card {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  text-align: center;
  border-radius: 20px;
  backdrop-filter: blur(2.5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border-right: 6px solid rgba(255, 255, 255, 0.15);
  border-top: 4px solid rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

h2 {
  margin: 0.5rem;
  font-size: 2.25rem;
  color: var(--col-green);
}

.card-content {
  margin: 0.5rem;
  overflow: auto;
  scroll-behavior: smooth;
}
.card-content::-webkit-scrollbar {
  display: none;
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

@media (max-width: 800px) {
  .card {
    padding: 1rem;
  }

  header {
    flex-direction: column;
    padding: 0.25rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    margin: 0.15rem 0 0.5rem 0;
    font-size: 1.75rem;
  }

  .card-content {
    margin: 0;
  }
}
@media (max-width: 400px) {
  .card {
    padding: 0.5rem;
  }

  header {
    flex-direction: column;
    padding: 0.15rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    margin: 0.15rem 0 0.5rem 0;
    font-size: 2.25rem;
  }

  .card-content {
    margin: 0;
  }
}
</style>
