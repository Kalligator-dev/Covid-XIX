import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import store from "./store/store";
import Loading from "./components/Loading.vue";
import baseCard from "./components/BaseCard.vue";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(router);
app.use(store);
app.component("app-loading", Loading);
app.component("base-card", baseCard);

app.mount("#app");
