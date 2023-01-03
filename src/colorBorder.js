
import { PUIComponent } from "./Component.js";
import { cssVar, obj2css } from "./utils.js";

const cbStyle = {
  cb: {
    "--bw": "var(--bwidth, 4px)",
    "--bc": "var(--bcolor, #000)",
    "box-shadow": `
      calc(-1 * var(--bw)) 0 var(--bc),
      var(--bw) 0 var(--bc),
      0 calc(-1 * var(--bw)) var(--bc),
      0 var(--bw) var(--bc)`,
  },
  cbSize2: {
    "position": "relative",
    "box-shadow": `
      calc(-2 * var(--bw)) 0 0 calc(-1 * var(--bw)) var(--bc),
      calc(2 * var(--bw)) 0 0 calc(-1 * var(--bw)) var(--bc),
      0 calc(-2 * var(--bw)) 0 calc(-1 * var(--bw)) var(--bc),
      0 calc(2 * var(--bw)) 0 calc(-1 * var(--bw)) var(--bc)`,
  },
  cbSize2BA: {
    "content": `""`,
    "position": "absolute",
    "top": "var(--bw)",
    "width": "var(--bw)",
    "height": "calc(100% - 2 * var(--bw))",
    "box-shadow": `
      0 calc(-1 * var(--bw)) var(--bc),
      0 calc(1 * var(--bw)) var(--bc)`,
  },
};

class PUIColorBorder extends PUIComponent {
  static tag = "cb";
  static templateText = `
    <style>
      :host { display: block; ${obj2css(cbStyle.cb)} }
      :host([size="2"]) { ${obj2css(cbStyle.cbSize2)} }
      :host([size="2"])::before, :host([size="2"])::after { ${obj2css(cbStyle.cbSize2BA)} }
      :host([size="2"])::before { left: 0; }
      :host([size="2"])::after { right: 0; }
    </style>
    <slot></slot>
  `;
};
PUIColorBorder.define();

class PUIColorBorderx extends HTMLDivElement {
  constructor() {
    super();
    const hostSelector = `[is=${PUIColorBorder.componentName}-]`;
    if (!cssVar.has(hostSelector)) {
      cssVar.createOrModify(hostSelector, cbStyle.cb);
      const hostSelector2 = `${hostSelector}[size="2"]`;
      cssVar.createOrModify(hostSelector2, cbStyle.cbSize2);
      cssVar.createOrModify(`${hostSelector2}::before, ${hostSelector2}::after`, cbStyle.cbSize2BA);
      cssVar.createOrModify(`${hostSelector2}::before`, { "left": "0", });
      cssVar.createOrModify(`${hostSelector2}::after`, { "right": "0", });
    }
  };
};
customElements.define(PUIColorBorder.componentName + "-", PUIColorBorderx, { extends: "div" });

export {
  PUIColorBorder as default,
  PUIColorBorder,
  PUIColorBorderx,
};
