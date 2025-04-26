import * as process from 'node:process';

const processShim = process === void 0 ? {} : process;
const envShim = processShim.env || {};
const platform = envShim.UNI_PLATFORM;
const isH5 = platform === "h5";
function UpResolver() {
  return {
    type: "component",
    resolve: (name) => {
      if (/^(Up[A-Z]|up-[a-z])/.test(name)) {
        const cName = name.slice(2).replace(/([a-z])/, "$1").toLowerCase();
        const component = `uni-ui-plus/components/${cName}/${cName}.vue`;
        const style = `uni-ui-plus/components/${cName}/index.scss`;
        return {
          name,
          from: component,
          sideEffects: isH5 ? style : ""
        };
      }
    }
  };
}

export { UpResolver };
