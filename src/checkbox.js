
import { PUIComponent } from "./Component.js";
import { cssVar, obj2css } from "./utils.js";

/* 
   0 1 2 3 4 5 6 7 8 9
0 [1 1 1 1 1 1 1   2 2],
1 [1             2 2 2],
2 [1           2 2    ],
3 [2 2       2 2      ],
4 [2 2 2   2 2   1    ],
5 [1   2 2 2     1    ],
6 [1     2       1    ],
7 [1 1 1 1 1 1 1 1    ],
*/

const css = {
  input: {
    "visibility": "hidden",
    "font-size": "inherit",
    "font-family": "inherit",
    "color": "inherit",
    "position": "relative",
    "margin": "0 .5ch",
    "width": "2ch",
    "height": "1em",
  },
  before: {
    "content": "''",
    "visibility": "visible",
    "position": "absolute",
    "width": "100%",
    "height": "100%",
    "cursor": "pointer",
  },
  after: {
    "--r": "calc(1px * var(--mark-zoom, 2))",
    "--r0": "var(--r)",
    "--r1": "calc(2 * var(--r))",
    "--r2": "calc(3 * var(--r))",
    "--r3": "calc(4 * var(--r))",
    "--r4": "calc(5 * var(--r))",
    "--r5": "calc(6 * var(--r))",
    "--r6": "calc(7 * var(--r))",
    "--r7": "calc(8 * var(--r))",
    "--r8": "calc(9 * var(--r))",
    "--r9": "calc(10 * var(--r))",
    "--box-incomplete": "var(--r0)var(--r0),var(--r1)var(--r0),var(--r2)var(--r0),var(--r3)var(--r0),var(--r4)var(--r0),var(--r5)var(--r0),var(--r6)var(--r0),var(--r0)var(--r1),var(--r0)var(--r2),var(--r7)var(--r4),var(--r0)var(--r5),var(--r7)var(--r5),var(--r0)var(--r6),var(--r7)var(--r6),var(--r0)var(--r7),var(--r1)var(--r7),var(--r2)var(--r7),var(--r3)var(--r7),var(--r4)var(--r7),var(--r5)var(--r7),var(--r6)var(--r7),var(--r7)var(--r7)",
    "--box-right-corner": "var(--r7)var(--r0),var(--r7)var(--r1),var(--r7)var(--r2),var(--r7)var(--r3)",
    "--box-left-puzzle": "var(--r0)var(--r3),var(--r0)var(--r4)",
    "content": "''",
    "visibility": "visible",
    "position": "absolute",
    "color": "var(--mark-color, inherit)",
    "width": "var(--r)",
    "height": "var(--r)",
    "bottom": "var(--r7)",
    "right": "var(--r9)",
    "box-shadow": "var(--box-incomplete),var(--box-right-corner),var(--box-left-puzzle)",
  },
  checkedAfter: {
    "--c": "var(--mark-check-color,var(--mark-color,))",
    "--col0": "var(--r0)var(--r3)var(--c),var(--r0)var(--r4)var(--c)",
    "--col1": "var(--r1)var(--r3)var(--c),var(--r1)var(--r4)var(--c)",
    "--col2": "var(--r2)var(--r4)var(--c),var(--r2)var(--r5)var(--c)",
    "--col3": "var(--r3)var(--r5)var(--c),var(--r3)var(--r6)var(--c)",
    "--col4": "var(--r4)var(--r4)var(--c),var(--r4)var(--r5)var(--c)",
    "--col5": "var(--r5)var(--r3)var(--c),var(--r5)var(--r4)var(--c)",
    "--col6": "var(--r6)var(--r2)var(--c),var(--r6)var(--r3)var(--c)",
    "--col7": "var(--r7)var(--r1)var(--c),var(--r7)var(--r2)var(--c)",
    "--col8": "var(--r8)var(--r0)var(--c),var(--r8)var(--r1)var(--c)",
    "--col9": "var(--r9)var(--r0)var(--c),var(--r9)var(--r1)var(--c)",
    "box-shadow": "var(--col0),var(--col1),var(--col2),var(--col3),var(--col4),var(--col5),var(--col6),var(--col7),var(--col8),var(--col9),var(--box-incomplete)",
  },
  animation: `
    00.000% { --col9: 0 0; }
    11.111% { --col8: 0 0; }
    22.222% { --col7: var(--box-right-corner); }
    33.333% { --col6: 0 0; }
    44.444% { --col5: 0 0; }
    55.555% { --col4: 0 0; }
    66.666% { --col3: 0 0; }
    77.777% { --col2: 0 0; }
    88.888% { --col1: 0 0; }
    100.00% { --col0: var(--box-left-puzzle); opacity: 0; }
  `,
};

class PUICheckbox extends PUIComponent {
  static tag = "checkbox";
  static templateText = `
    <style>
      :host { display: inline-block; }
      label { cursor: pointer; }
      input { ${obj2css(css.input)} }
      input::after { ${obj2css(css.after)} }
      :host([after]) input::after { right: auto; left: calc(-1 * var(--r)); }
      input:checked:after { ${obj2css(css.checkedAfter)} }
      :host([animation]) input:checked:after { animation: pui-checkbox-draw .2s steps(1) reverse; }
      @keyframes pui-checkbox-draw { ${css.animation} }
    </style>
    <label><span id="beforeText"></span><input type="checkbox" /><span id="textAfter"></span><slot></slot></label>
  `;
  get type() { return "checkbox"; };
  #beforeText = this.shadowRoot.getElementById("beforeText");
  #textAfter = this.shadowRoot.getElementById("textAfter");
  #slot = this.shadowRoot.querySelector("slot");
  #isAfter = () => this.hasAttribute("after");
  #checkbox = this.shadowRoot.querySelector("input");
  get checked() { return this.#checkbox.checked; };
  set checked(c) {
    this.#checkbox.checked = c;
    this.toggleAttribute("checked", c);
  };
  get value() { return this.getAttribute("value"); };
  set value(v) { this.setAttribute("value", v); };
  constructor() {
    super();
    this.#checkbox.addEventListener("change", e => {
      this.checked = this.#checkbox.checked;
      this.emitEvent("change", { global: true, });
    });
  };
  static get observedAttributes() { return ["text", "after", "checked"]; };
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name == "checked") this.checked = newVal != null;
    else if (name == "text" || name == "after") {
      this.#textAfter.innerHTML = this.#beforeText.innerHTML = "";
      if (this.#isAfter()) this.#beforeText.innerHTML = this.getAttribute("text");
      else this.#textAfter.innerHTML = this.getAttribute("text");
      this.#slot.remove();
      if (this.#isAfter())
        this.#beforeText.parentNode.insertBefore(this.#slot, this.#beforeText);
      else 
        this.#textAfter.parentNode.insertBefore(this.#slot, this.#textAfter.nextSibling);
    }
  };
};
PUICheckbox.define();

class PUICheckboxx extends HTMLInputElement {
  constructor() {
    super();
    this.setAttribute("type", "checkbox");
    const hostSelector = `[is=${PUICheckbox.componentName}-]`;
    if (!cssVar.has(hostSelector)) {
      cssVar.createOrModify(hostSelector, css.input);
      cssVar.createOrModify(`${hostSelector}::before`, css.before);
      cssVar.createOrModify(`${hostSelector}::after`, css.after);
      cssVar.createOrModify(`${hostSelector}[after]::after`, { "right": "auto", "left": "calc(-1 * var(--r))", });
      cssVar.createOrModify(`${hostSelector}:checked:after`, css.checkedAfter);
      cssVar.createOrModify(`${hostSelector}[animation]:checked:after`, { "animation": "pui-checkbox-draw .2s steps(1) reverse", });
      cssVar.insertKeyframe(`${PUICheckbox.componentName}-draw`, `{ ${css.animation} }`);
    }
  };
};
customElements.define(PUICheckbox.componentName + "-", PUICheckboxx, { extends: "input" });

export {
  PUICheckbox as default,
  PUICheckbox,
  PUICheckboxx,
};
