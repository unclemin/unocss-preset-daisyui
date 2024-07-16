'use strict';

const daisy = require('daisyui');
const presetComponent = require('unocss-preset-component');
const autoprefixer = require('autoprefixer');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const daisy__default = /*#__PURE__*/_interopDefaultCompat(daisy);
const presetComponent__default = /*#__PURE__*/_interopDefaultCompat(presetComponent);
const autoprefixer__default = /*#__PURE__*/_interopDefaultCompat(autoprefixer);

function presetDaisyui(option) {
  option = option ?? {};
  const styles = [];
  daisy__default.handler({
    addBase: (style) => {
      styles.push(style);
    },
    addComponents: (style) => {
      styles.push(style);
    },
    config: (path, defaultValue) => {
      return path.slice("daisyui.".length).split(".").reduce((_, curr) => {
        return option?.[curr] ?? defaultValue;
      }, defaultValue);
    }
  });
  return {
    ...presetComponent__default({
      style: styles,
      layer: "daisyui",
      postcssPlugins: [
        autoprefixer__default(),
        {
          postcssPlugin: "repalce-varibale-prefix",
          Declaration: (decl) => {
            decl.prop = decl.prop.replaceAll(/(var\s*\(\s*)?--(?:tw-)+([-\w]+)?/g, "$1--un-$2");
            decl.value = decl.value.replaceAll(/(var\s*\(\s*)?--(?:tw-)+([-\w]+)?/g, "$1--un-$2");
          }
        }
      ]
    }),
    name: "unocss-preset-daisyui",
    theme: daisy__default.config?.theme?.extend
  };
}

module.exports = presetDaisyui;
