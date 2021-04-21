<template>
  <div class="country-label" :class="{ 'country-label-left': mirror }">
    <p>{{ countryLabel }}</p>
  </div>
</template>

<script>
export default {
  props: {
    countryLabel: String,
    mirror: Boolean,
  },
};
</script>

<style scoped>
.country-label {
  position: fixed;
  z-index: 50;
  transform: translate(15%, -75%);
  transition: all ease-in-out 0.25s;
  pointer-events: none;
  opacity: 0;
  background: var(--col-green-dark-05);
  border-radius: 25px;
  padding: 0.5rem;
}
.country-label-left {
  transform: translate(-115%, -75%) !important;
}
p {
  text-align: center;
  color: var(--col-green-light-75);
  transition: all ease-in-out 0.3s;
}

@media (max-width: 800px) {
  .country-label {
    z-index: 50;
  }
}
</style>
