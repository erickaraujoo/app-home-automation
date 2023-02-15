// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (api) => {
  api.cache(true);
  return {
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            components: './src/components',
            config: './src/config',
            hooks: './src/hooks',
            models: './src/models',
            pages: './src/pages',
            services: './src/services',
            utils: './src/utils'
          },
          extensions: ['.ts', '.tsx']
        }
      ]
    ],
    presets: ['babel-preset-expo']
  };
};
