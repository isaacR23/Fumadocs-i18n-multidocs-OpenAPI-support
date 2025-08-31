import { i18n } from '@/lib/i18n';
import { docs, apiDocs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { transformerOpenAPI } from 'fumadocs-openapi/server';

  
export const source = loader({
i18n,
baseUrl: '/docs',
source: docs.toFumadocsSource(),
});
  
export const apiSource = loader({
// it assigns a URL to your pages
i18n,
baseUrl: '/api',
pageTree: {transformers: [transformerOpenAPI()]},
source: apiDocs.toFumadocsSource(),
});