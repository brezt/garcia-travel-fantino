import { agentTools, MCP_PROTOCOL_VERSION, MCP_SERVER_INFO } from "@/lib/agent-tools";
import { siteConfig } from "@/lib/site";

/**
 * Servidor MCP mínimo (transporte "Streamable HTTP", sin estado y sin streaming).
 * Expone las herramientas de solo lectura de src/lib/agent-tools.ts para que
 * asistentes como Claude o ChatGPT puedan consultar destinos, promociones y contacto.
 */

export const dynamic = "force-dynamic";

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id",
};

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { ...CORS_HEADERS, "Cache-Control": "no-store" } });

const result = (id: JsonRpcRequest["id"], value: unknown) => ({ jsonrpc: "2.0", id, result: value });
const error = (id: JsonRpcRequest["id"], code: number, message: string) => ({
  jsonrpc: "2.0",
  id: id ?? null,
  error: { code, message },
});

const handle = async (request: JsonRpcRequest) => {
  const { id, method, params = {} } = request;

  switch (method) {
    case "initialize":
      return result(id, {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: MCP_SERVER_INFO,
        instructions: `Información pública de ${siteConfig.name}, agencia de viajes en ${siteConfig.address.locality}, República Dominicana. Las reservas y cotizaciones se cierran con un asesor por WhatsApp (${siteConfig.phone}).`,
      });
    case "ping":
      return result(id, {});
    case "tools/list":
      return result(id, {
        tools: agentTools.map(({ name, title, description, inputSchema, annotations }) => ({
          name,
          title,
          description,
          inputSchema,
          annotations,
        })),
      });
    case "tools/call": {
      const tool = agentTools.find((candidate) => candidate.name === params.name);
      if (!tool) return error(id, -32602, `Herramienta desconocida: ${String(params.name)}`);
      try {
        const text = await tool.run((params.arguments as Record<string, unknown>) ?? {});
        return result(id, { content: [{ type: "text", text }], isError: false });
      } catch {
        return result(id, { content: [{ type: "text", text: "No se pudo completar la consulta." }], isError: true });
      }
    }
    default:
      return error(id, -32601, `Método no soportado: ${method}`);
  }
};

export async function POST(request: Request) {
  let body: JsonRpcRequest | JsonRpcRequest[];
  try {
    body = await request.json();
  } catch {
    return json(error(null, -32700, "JSON inválido"), 400);
  }

  const messages = Array.isArray(body) ? body : [body];
  const responses = [];
  for (const message of messages) {
    if (!message || typeof message.method !== "string") {
      responses.push(error(message?.id, -32600, "Solicitud inválida"));
      continue;
    }
    // Las notificaciones (sin id) no llevan respuesta.
    if (message.id === undefined || message.id === null) continue;
    responses.push(await handle(message));
  }

  if (responses.length === 0) return new Response(null, { status: 202, headers: CORS_HEADERS });
  return json(Array.isArray(body) ? responses : responses[0]);
}

// Sin sesiones ni notificaciones del servidor: no hay flujo SSE que abrir.
export function GET() {
  return new Response("Este servidor MCP solo acepta POST (JSON-RPC).", {
    status: 405,
    headers: { ...CORS_HEADERS, Allow: "POST, OPTIONS" },
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
