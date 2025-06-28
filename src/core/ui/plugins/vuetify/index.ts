import { createVuetify } from "vuetify";
import theme from "./themes";
import defaults from "./defaults";
import { Tooltip } from "vuetify/directives";
import { VFileUpload } from "vuetify/labs/VFileUpload";
const vuetify = createVuetify({
  defaults: defaults,
  theme: theme,
  directives: {
    Tooltip: Tooltip,
  },
  components: {
    VFileUpload,
  },
});

export default vuetify;
