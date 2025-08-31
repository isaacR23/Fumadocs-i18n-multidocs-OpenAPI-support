import defaultComponents from 'fumadocs-ui/mdx';
import { APIPage } from 'fumadocs-openapi/ui';
import { openapi, openapiEs } from '@/lib/openapi';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    APIPage: (props) => {
      // Use Spanish OpenAPI for Spanish documents, English for others
      const isSpanishDoc = props.document === './unkeyEs.json';
      const openapiInstance = isSpanishDoc ? openapiEs : openapi;
      return <APIPage {...openapiInstance.getAPIPageProps(props)} />;
    },
    ...components,
  };
}