module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": "2"
      }
    ],
    "@babel/preset-react"
  ];
  
  const plugins = [
    "@babel/plugin-transform-runtime",
    "react-hot-loader/babel"
  ];

  return {
    presets,
    plugins
  };
}