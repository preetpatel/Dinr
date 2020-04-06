module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".tsx"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@themes": "./src/themes",
            "@navigation": "./src/navigation",
            "@config": "./src/config",
            "@utils": "./src/utils"
          }
        }
      ]
    ]
  };
};
