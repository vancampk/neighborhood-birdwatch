import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://app.birdweather.com/graphql',
  generates: {
    'src/app/models/graphql.models.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
