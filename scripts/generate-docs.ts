import { generateFiles } from 'fumadocs-openapi';
import { openapi, openapiEs } from '@/lib/openapi';

void generateFiles({
  input: openapi,
  output: './content/api',
  includeDescription: true,
});


void generateFiles({
  input: openapiEs,
  output: './content/api',
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,
  name: (output, document) => {
    if (output.type === 'operation') {
      //@ts-ignore
      const op = document.paths![output.item.path]![output.item.method]!;

      // Use operationId from the operation object, or create a descriptive name
      const defaultName = op.operationId || (() => {
        // Remove leading slash and split path into segments
        const pathSegments = output.item.path.replace(/^\//, '').split('/');
        
        // Process each segment to handle path parameters
        const processedSegments = pathSegments.map(segment => {
          // Convert path parameters like {keyId} to keyId
          if (segment.startsWith('{') && segment.endsWith('}')) {
            return segment.slice(1, -1); // Remove { and }
          }
          return segment;
        });
        
        // Join segments with '/' and add the method
        return `${processedSegments.join('/')}/${output.item.method}`;
      })();

      // defaultName should be: keys/get, keys/post, keys/keyId/get, keys/keyId/patch, keys/keyId/delete, keys/keyId/verify/post, analytics/usage/get, workspaces/get
      return `${defaultName}.es`;
    }

    // Handle webhook type if it exists
    // @ts-ignore
    if (output.type === 'webhook' && document.webhooks) {
      //@ts-ignore
      const hook = document.webhooks[output.item.name]?.[output.item.method];
      return `${hook?.name || 'webhook'}.es`;
    }

    // Fallback for any other types
    return 'unknown.es';
  },
});