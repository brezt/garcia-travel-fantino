export const dynamic = "force-dynamic";

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp?: string;
};

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return Response.json({
      configured: false,
      posts: [],
    });
  }

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "permalink",
    "thumbnail_url",
    "timestamp",
  ].join(",");
  const url = new URL(`https://graph.facebook.com/v20.0/${userId}/media`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", "10");
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url, {
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      return Response.json(
        {
          configured: true,
          posts: [],
          error: "No se pudieron cargar las publicaciones de Instagram.",
        },
        { status: 502 },
      );
    }

    const payload = await response.json() as { data?: InstagramMedia[] };
    const posts = (payload.data ?? []).map((post) => ({
      id: post.id,
      caption: post.caption ?? "",
      mediaType: post.media_type,
      mediaUrl: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
    })).filter((post) => post.mediaUrl);

    return Response.json({
      configured: true,
      posts,
    });
  } catch {
    return Response.json(
      {
        configured: true,
        posts: [],
        error: "No se pudieron cargar las publicaciones de Instagram.",
      },
      { status: 502 },
    );
  }
}
