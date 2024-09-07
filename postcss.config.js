import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssMixins from 'postcss-mixins';

export default {
    plugins: [
        postcssMixins(),
        postcssNested(),
        postcssPresetEnv(),
        autoprefixer(),
    ],
};