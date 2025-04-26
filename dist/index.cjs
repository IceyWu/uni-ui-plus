'use strict';

const process = require('node:process');

function _interopNamespaceCompat(e) {
  if (e && typeof e === 'object' && 'default' in e) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const process__namespace = /*#__PURE__*/_interopNamespaceCompat(process);

const processShim = process__namespace === void 0 ? {} : process__namespace;
const envShim = processShim.env || {};
const platform = envShim.UNI_PLATFORM;
const isH5 = platform === "h5";
function UpResolver() {
  return {
    type: "component",
    resolve: (name) => {
      if (/^(Up[A-Z]|up-[a-z])/.test(name)) {
        const cName = name.slice(3).replace(/([a-z])/, "$1").toLowerCase();
        const component = `up-uniapp/components/${cName}/${cName}.vue`;
        const style = `up-uniapp/components/${cName}/index.scss`;
        return {
          name,
          from: component,
          sideEffects: isH5 ? style : ""
        };
      }
    }
  };
}

exports.UpResolver = UpResolver;
