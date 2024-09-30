import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssMixins from 'postcss-mixins';
import stylelint from 'stylelint';

export default {
  plugins: [
    stylelint(),
    postcssMixins(),
    postcssNested(),
    postcssPresetEnv(),
    autoprefixer(),
  ],
};
