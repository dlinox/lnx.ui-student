
import { createVuetify } from "vuetify";
import theme from "./themes";
import defaults from "./defaults";
import { Tooltip } from "vuetify/directives";

const vuetify = createVuetify({
  defaults: defaults,
  theme: theme,
  directives: {
    Tooltip: Tooltip, // Agrega la directiva de tooltip
  },
});

export default vuetify;
