
import { PUIComponent } from "./Component.js";
import { cssVar, obj2css } from "./utils.js";

const containerStyle = {
  fieldset: {
    "--bw": "var(--bwidth, 4px)",
    "--bc": "var(--bcolor, #000)",
    "border": "var(--bw) solid var(--bc)",
    "padding": "1ex 2ch",
  },
  legend: {
    "padding": "0 1ch",
    "margin-left": "-1ch",
  },
  size1fieldset: {
    "border-left": "none",
    "border-right": "none",
    "box-shadow": `
      calc(-2 * var(--bw)) 0 0 calc(-1 * var(--bw)) var(--bc),
      calc(2 * var(--bw)) 0 0 calc(-1 * var(--bw)) var(--bc)`,
    "margin-inline": "calc(var(--bw) + 2px)",
  },
};

class PUIContainer extends PUIComponent {
  static tag = "container";
  static templateText = `
    <style>
      fieldset { ${obj2css(containerStyle.fieldset)} }
      slot[name=legend] legend,
      ::slotted([slot=legend]) { ${obj2css(containerStyle.legend)} }
      :host([centered]) slot[name=legend] { text-align: center; }
      :host([size="1"]) fieldset { ${obj2css(containerStyle.size1fieldset)} }
    </style>
    <fieldset>
      <slot name="legend"></slot>
      <slot></slot>
    </fieldset>
  `;
  #legend = this.shadowRoot.querySelector("slot[name=legend]");
  static get observedAttributes() { return ["text"]; };
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "text")
      this.#legend.innerHTML = `<legend>${newVal}</legend>`;
  };
};
PUIContainer.define();

class PUIContainerx extends HTMLFieldSetElement {
  constructor() {
    super();
    const hostSelector = `[is=${PUIContainer.componentName}-]`;
    if (!cssVar.has(hostSelector)) {
      cssVar.createOrModify(hostSelector, containerStyle.fieldset);
      cssVar.createOrModify(`${hostSelector} > legend`, containerStyle.legend);
      cssVar.createOrModify(`${hostSelector}[centered] > legend`, { "text-align": "center", });
      cssVar.createOrModify(`${hostSelector}[size="1"]`, containerStyle.size1fieldset);
    }
  };
  static get observedAttributes() { return ["text"]; };
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "text") {
      let legend = this.querySelector("legend");
      if (!legend) {
        legend = document.createElement("legend");
        this.prepend(legend);
      }
      legend.innerHTML = `<legend>${newVal}</legend>`;
    }
  };
};
customElements.define(PUIContainer.componentName + "-", PUIContainerx, { extends: "fieldset" });

export {
  PUIContainer as default,
  PUIContainer,
  PUIContainerx,
};
