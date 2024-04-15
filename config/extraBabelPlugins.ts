const extraBabelPlugins: any[] = [
  [
    'babel-plugin-import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
    'antd',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'lodash',
  ],
  [
    'babel-plugin-import',
    {
      libraryName: 'ahooks',
      libraryDirectory: 'es',
      camel2DashComponentName: false,
    },
    'ahooks',
  ],
];

export default extraBabelPlugins;
