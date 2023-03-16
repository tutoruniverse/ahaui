import { addons } from "@storybook/addons";
import AhaUI from "./AhaUI";

addons.setConfig({
  theme: AhaUI,
  sidebar: {
    showRoots: false,
  },
});
