
import { PUIComponent } from "./Component.js";
import { cssVar } from "./utils.js";

/*
https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/disconnect#usage_notes
If the element being observed is removed from the DOM, and then subsequently released by
the browser's garbage collection mechanism, the `MutationObserver` will stop observing
the removed element. However, the `MutationObserver` itself can continue to exist to
observe other existing elements.
*/
const puiImgMO = new MutationObserver((mr) => {
  mr.forEach(({attributeName, target}) => {
    if (attributeName == "style") return;
    target?.updateAttr();
  });
});

class PUIImg extends PUIComponent {
  static tag = "img";
  static templateText = `
    <style>
      :host { display: inline-block; }
      img { image-rendering: pixelated; width: 100%; height: 100%; object-fit: inherit; object-position: inherit; }
    </style>
    <img/>
  `;
  beforeAppendTemplate(content) {
    this.img = content.querySelector("img");
    this.updateAttr();
    return super.beforeAppendTemplate(content);
  };
  constructor() {
    super();
    puiImgMO.observe(this, { attributes: true, });
  };
  updateAttr() {
    const {img} = this;
    Array.from(this.attributes).forEach(attr => {
      if (attr.name == "style") return;
      img.setAttribute(attr.name, attr.value);
    });
    Array.from(img.attributes).forEach(attr => {
      if (this.getAttribute(attr.name) != attr.value)
        img.removeAttribute(attr.name);
    });
  };
};
PUIImg.define();

class PUIImgx extends HTMLImageElement {
  constructor() {
    super();
    if (!cssVar.has("[is=pui-img-]"))
      cssVar.createOrModify("[is=pui-img-]", {
        "image-rendering": "pixelated",
      });
  };
};
customElements.define("pui-img-", PUIImgx, { extends: "img" });

export {
  PUIImg as default,
  PUIImg,
  PUIImgx,
};
