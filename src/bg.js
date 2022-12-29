
import { PUIComponent } from "./Component.js";
import { cssVar, obj2css } from "./utils.js";

const afterCss = {
  "content": "''",
  "display": "block",
  "position": "absolute",
  "top": "0", "left": "0",
  "width": "100%", "height": "100%",
  "z-index": "-999999999999999",
  "image-rendering": "pixelated",
  "filter": "brightness(var(--brightness))",
  "background-attachment": "var(--attach)",
  "background-blend-mode": "var(--blend-mode)",
  "background-clip": "var(--clip)",
  "background-color": "var(--color)",
  "background-image": "var(--img)",
  "background-origin": "var(--origin)",
  "background-position": "var(--pos)",
  "background-size": "var(--size)",
};
const puiBgObservedAttr = "attach,blend-mode,clip,color,img,origin,pos,size,brightness".split(",");
const puiBgAttrChangedCb = function(name, oldVal, newVal) {
  if (name === "img") {
    newVal = `url(${newVal})`;
  }
  else if (name === "size") {
    // 带单位ch/ex TODO: 想个法子让图片每像素对应文字每像素
    // 目前实验来看 图片像素宽度 * 1ch 是每像素对应一个字的大小【如果是等宽字体
  }
  else if (name === "brightness") {
    newVal = newVal || 1;
  }
  this.cssAfterStyle.setProperty("--" + name, newVal);
};

class PUIBg extends PUIComponent {
  static tag = "bg";
  static templateText = `
    <style>
      :host { position: relative; display: block; }
      :host::after { ${obj2css(afterCss)} }
      :host([no-repeat])::after { background-repeat: no-repeat; }
    </style>
    <slot></slot>
  `;
  constructor() {
    super();
    this.cssAfter = this.css.cssRules[this.css.insertRule(":host::after {}")];
    this.cssAfterStyle = this.cssAfter.style;
  };
  static get observedAttributes() { return puiBgObservedAttr; };
  attributeChangedCallback(...args) { puiBgAttrChangedCb.apply(this, args); };
};
PUIBg.define();

class PUIBgx extends HTMLDivElement {
  constructor() {
    super();
    if (!cssVar.has(`[is=${PUIBg.componentName}-]`)) {
      cssVar.createOrModify(`[is=${PUIBg.componentName}-]`, { "position": "relative", });
      cssVar.createOrModify(`[is=${PUIBg.componentName}-]::after`, afterCss);
      cssVar.createOrModify(`[is=${PUIBg.componentName}-][no-repeat]::after`, { "background-repeat": "no-repeat", });
    }
    this.cssAfterStyle = this.style;
  };
  static get observedAttributes() { return puiBgObservedAttr; };
  attributeChangedCallback(...args) { puiBgAttrChangedCb.apply(this, args); };
};
customElements.define(PUIBg.componentName + "-", PUIBgx, { extends: "div" });

export {
  PUIBg as default,
  PUIBg,
  PUIBgx,
};
