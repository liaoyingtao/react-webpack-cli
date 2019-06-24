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
    "react-hot-loader/babel",
    [
      "import", {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css" // `style: true` 会加载 less 文件
      }
    ]
  ];

  return {
    presets,
    plugins
  };
}