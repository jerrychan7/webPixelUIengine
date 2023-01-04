
import { PUIComponent } from "./Component.js";
import { cssVar, obj2css, sleep } from "./utils.js";

document.addEventListener("change", ({target}) => {
  if (target.type !== "radio") return;
  document.getElementsByName(target.name).forEach(ele => ele == target || (ele.checked = false));
});

const css = {
  host: {
    "visibility": "hidden",
    "position": "relative",
    "font-size": "inherit",
    "font-family": "inherit",
    "color": "inherit",
    "margin": "0 0.5ch",
    "width": "2ch",
    "cursor": "pointer",
    "outline": "0",
    "vertical-align": "bottom",
  },
  after: {
    "color": "var(--mark-color, inherit)",
    "content": "var(--mark, '_')",
    "visibility": "visible",
    "--r": "var(--mark-zoom, 1.2)",
    "font-size": "calc(1em * var(--r))",
    "bottom": "0",
    "right": "0",
    "position": "absolute",
    "transform": "translateY(calc(100% * (var(--r) - 1) / (2 * var(--r))))",
  },
};

class PUIRadio extends PUIComponent {
  static tag = "radio";
  static templateText = `
    <style>
      :host { cursor: pointer; display: inline-block; }
      :host input[type=radio] { ${obj2css(css.host)} }
      :host input[type=radio]::after { ${obj2css(css.after)} }
      :host([after]) input[type=radio]::after { right: auto; }
      :host input[type=radio]:checked::after {
        content: var(--mark-checked, ">");
        color: var(--mark-checked-color, var(--mark-color, inherit));
      }
      :host([after]) input[type=radio]:checked::after { content: var(--mark-after-checked, var(--mark-checked, "<")); }
      :host input[type=radio]:hover::after,
      :host input[type=radio]:focus::after { animation: pui-radio-blink .5s infinite steps(1); }
      @keyframes pui-radio-blink { 0% { opacity: 0; } 50% { opacity: 1; } }
    </style>
    <label><span id="beforeText"></span><input type="radio" /><span id="textAfter"></span></label>
  `;
  get type() { return "radio"; };
  #beforeText = this.shadowRoot.getElementById("beforeText");
  #textAfter = this.shadowRoot.getElementById("textAfter");
  #isAfter = () => this.hasAttribute("after");
  #radio = this.shadowRoot.querySelector("input");
  get checked() { return this.#radio.checked; };
  set checked(c) {
    this.#radio.checked = c;
    this.toggleAttribute("checked", c);
  };
  get value() { return this.getAttribute("value"); };
  set value(v) { this.setAttribute("value", v); };
  get name() { return this.getAttribute("name"); };
  set name(n) { this.setAttribute("name", n); };
  constructor() {
    super();
    this.#radio.addEventListener("change", e => {
      this.checked = this.#radio.checked;
      this.emitEvent("change", { global: true, });
    });
  };
  static get observedAttributes() { return ["name", "text", "after", "checked"]; };
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name == "name") {
      if (this.checked)
        document.getElementsByName(newVal).forEach(ele => ele === this || (ele.checked = false));
      this.name = newVal;
    }
    else if (name == "checked") this.checked = newVal != null;
    else if (name == "text" || name == "after") {
      this.#textAfter.innerHTML = this.#beforeText.innerHTML = "";
      if (this.#isAfter()) this.#beforeText.innerHTML = this.getAttribute("text");
      else this.#textAfter.innerHTML = this.getAttribute("text");
    }
  };
};
PUIRadio.define();

class PUIRadiox extends HTMLInputElement {
  constructor() {
    super();
    this.setAttribute("type", "radio");
    const hostSelector = `[is=${PUIRadio.componentName}-]`;
    if (!cssVar.has(hostSelector)) {
      cssVar.createOrModify(hostSelector, css.host);
      cssVar.createOrModify(`${hostSelector}::after`, css.after);
      cssVar.createOrModify(`${hostSelector}[after]::after`, { "right": "auto", });
      cssVar.createOrModify(`${hostSelector}:checked::after`, {
        "content": "var(--mark-checked, '>')",
        "color": "var(--mark-checked-color, var(--mark-color, inherit))",
      });
      cssVar.createOrModify(`${hostSelector}[after]:checked::after`, { "content": "var(--mark-after-checked, var(--mark-checked, '<'))", });
      cssVar.createOrModify(`${hostSelector}:hover::after, ${hostSelector}:focus::after`, { "animation": "pui-radio-blink .5s infinite steps(1)", });
      cssVar.insertKeyframe("pui-radio-blink", "{ 0% { opacity: 0; } 50% { opacity: 1; } }");
    }
  };
};
customElements.define(PUIRadio.componentName + "-", PUIRadiox, { extends: "input" });

export {
  PUIRadio as default,
  PUIRadio,
  PUIRadiox,
};
