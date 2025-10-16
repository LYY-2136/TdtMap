import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import VueTianditu from "vue-tianditu";
import "vue-tianditu/lib/style.css";

import { tTk } from "./utils/tmap-utils";

const app = createApp(App);

app.use(VueTianditu, {
  v: "4.0", //目前只支持4.0版本
  tk: tTk
});

app.mount("#app");
