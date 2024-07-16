import daisy from 'daisyui';
import presetComponent from 'unocss-preset-component';
import autoprefixer from 'autoprefixer';

function presetDaisyui(option) {
  option = option ?? {};
  const styles = [];
  daisy.handler({
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
    ...presetComponent({
      style: styles,
      layer: "daisyui",
      postcssPlugins: [
        autoprefixer(),
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
    theme: daisy.config?.theme?.extend
  };
}

export { presetDaisyui as default };
