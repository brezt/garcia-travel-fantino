import { agentTools, MCP_PROTOCOL_VERSION, MCP_SERVER_INFO } from "@/lib/agent-tools";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

/** MCP Server Card (SEP-1649): describe el servidor MCP de /mcp para que los agentes lo encuentren. */
export function GET() {
  const endpoint = getSiteUrl("/mcp");

  return Response.json(
    {
      $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
      name: MCP_SERVER_INFO.name,
      title: MCP_SERVER_INFO.title,
      version: MCP_SERVER_INFO.version,
      description: `Consulta destinos, promociones vigentes y datos de contacto de ${siteConfig.name}, y prepara cotizaciones por WhatsApp. Solo lectura, sin autenticación.`,
      websiteUrl: getSiteUrl(),
      endpoint,
      protocolVersion: MCP_PROTOCOL_VERSION,
      serverInfo: MCP_SERVER_INFO,
      transport: { type: "streamable-http", endpoint },
      remotes: [{ type: "streamable-http", url: endpoint }],
      authentication: { required: false },
      capabilities: { tools: { listChanged: false } },
      tools: agentTools.map(({ name, title, description, inputSchema, annotations }) => ({
        name,
        title,
        description,
        inputSchema,
        annotations,
      })),
    },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}
