
const templateCache = {};
const genTemplate = (str, ...args) => {
  if (Array.isArray(str)) {
    for (let i = 0; i < str.length - 1; ++i)
      ans += str[i] + args[i];
    str = ans + str[str.length - 1];
  }
  if (templateCache[str]) return templateCache[str];
  let template = document.createElement("template");
  template.innerHTML = str;
  return templateCache[str] = template;
};

class PUIComponent extends HTMLElement {
  static tagPrefix = "pui-";
  static get componentName() { return this.tagPrefix + this.tag; };
  static define() {
    const {componentName} = this;
    if (componentName === this.tagPrefix || !componentName)
      throw "Component registration failed: Missing componentName.";
    customElements.define(componentName, this);
  };
  static get template() { return this.templateText? genTemplate(this.templateText): undefined; };
  get template() { return this.constructor.template; };
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.template) this.appendTemplate();
  };
  appendTemplate(template = this.template) {
    if (!template?.content) return null;
    this.shadowRoot.appendChild(this.beforeAppendTemplate(template.content.cloneNode(true)));
    this.afterAppendTemplate();
    return this;
  };
  beforeAppendTemplate(content) { return content; };
  afterAppendTemplate() {};
  connectedCallback() {};
  disconnectedCallback() {};
  adoptedCallback() {};
  emitEvent(type, {
      global = false,
      data = {}
  } = {}) {
      return type instanceof Event
      ? super.dispatchEvent(type)
      : super.dispatchEvent(new CustomEvent(type, global
        ? { detail: data, bubbles: true, cancelable: true, composed: true, }
        : { detail: data, }
      ));
  };
};

export {
  PUIComponent as default,
  PUIComponent,
  genTemplate,
};
