
export const cssVar = (() => {
  const varStyle = new CSSStyleSheet();
  document.adoptedStyleSheets.push(varStyle);
  varStyle.replaceSync(":root {}");
  let gv = varStyle.cssRules[0];
  let rulesMap = {}, gvs = new Set();
  return {
    createOrModify(selector, rules = {}) {
      if (rulesMap[selector])
        Object.entries(rules).forEach(([k, v]) => rulesMap[selector].style.setProperty(k, v));
      else
        rulesMap[selector] = varStyle.cssRules[
          varStyle.insertRule(`${selector} { ${Object.entries(rules).map(([k, v]) => `${k}: ${v};`).join(" ")} }`, 0)
        ];
    },
    del(selector) {
      if (!rulesMap[selector]) return;
      let i = [...varStyle.cssRules].findIndex(r => r.selectorText === selector);
      if (i === -1) return;
      varStyle.deleteRule(i);
      delete rulesMap[selector];
    },
    get: selector => rulesMap[selector],
    has: selector => selector in rulesMap,
    rename(oldName, newName) {
      if (!rulesMap[oldName] || rulesMap[newName]) return false;
      rulesMap[oldName].selectorText = newName;
      rulesMap[newName] = rulesMap[oldName];
      delete rulesMap[oldName];
      return true;
    },
    // merge c2 into c1 (c2 = {...c1, ...c2})
    merge(c1, c2) {
      if (!rulesMap[c1] || !rulesMap[c2]) return;
      c1 = rulesMap[c1]; c2 = rulesMap[c2];
      for (let i = 0; i < c2.length; ++i) {
        const pname = c2[i];
        c1.style.setProperty(pname, c2.style.getPropertyValue(pname));
      }
    },
    clear() {
      while (varStyle.cssRules.length !== 1) {
        if (varStyle.cssRules[0] !== gv) varStyle.deleteRule(0);
        else varStyle.deleteRule(1);
      }
    },
    clearAll() {
      varStyle.replaceSync(":root {}");
      gv = varStyle.cssRules[0];
      rulesMap = {};
    },
    global: {
      createOrModify(varName, value) {
        if (typeof varName !== "string")
          return Object.entries(varName).forEach(([k, v]) => cssVar.global.createOrModify(k, v));
        if (!varName.startsWith("--")) varName = "--" + varName;
        gv.style.setProperty(varName, value);
        gvs.add(varName);
      },
      del(varName) {
        if (!varName.startsWith("--")) varName = "--" + varName;
        gv.style.removeProperty(varName);
        gvs.delete(varName);
      },
      delStartsWith(varPrefix) {
        if (!varPrefix.startsWith("--")) varPrefix = "--" + varPrefix;
        // Array.from(gv.style).filter(k => k.startsWith(varPrefix)).forEach(k => gv.style.removeProperty(k));
        for (let name of gvs.keys()) if (name.startsWith(varPrefix)) gv.style.removeProperty(name);
      },
      get(varName) {
        if (!varName.startsWith("--")) varName = "--" + varName;
        return gv.style.getPropertyValue(varName);
      },
      clear() {
        varStyle.deleteRule([...varStyle.cssRules].findIndex(r => r === gv));
        gv = varStyle.cssRules[varStyle.insertRule(":root {}", 0)];
        gvs.clear();
      },
    },
  };
})();

export const sleep = (ms = 0) => new Promise(s => setTimeout(s, ms));

export const obj2css = obj => Object.entries(obj).map(([k, v]) => `${k}: ${v};`).join("");
