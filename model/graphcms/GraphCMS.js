import { GraphQLClient } from "graphql-request";

export const graphCmsClient = new GraphQLClient(
  process.env.GRAPH_CMS_CONTENT_API
);
