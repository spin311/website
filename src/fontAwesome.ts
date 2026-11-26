import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Font Awesome normally injects its stylesheet when the JS runs. The prerendered HTML is on
// screen before that, so its icons would be unsized and the page would jump. The CSS is
// bundled into index.html instead.
config.autoAddCss = false;
