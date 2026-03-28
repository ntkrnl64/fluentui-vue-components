import { createApp } from "vue";
import { GriffelPlugin } from "@ntkrnl64/griffel-vue";
import { router } from "./gallery/router";
import App from "./App.vue";

const app = createApp(App);
app.use(GriffelPlugin);
app.use(router);
app.mount("#app");
