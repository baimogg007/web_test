export default {
  dev: {
    '/pipe/pile': {
      target: 'http://8.137.111.235:8088',
      changeOrigin: true,
      // pathRewrite: { '^': '' },
    },
  },
} as const;
