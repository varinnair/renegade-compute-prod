import { NextResponse } from "next/server";
import { withAuthApi } from "@/lib/auth/route-guards";
import { ensureGoogleAccessToken, getDriveMetadata, exportToPlainText } from "@/lib/google/drive";
import { ChatSDKError } from "@/lib/errors";

export const GET = withAuthApi(async ({ request, session }) => {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = (searchParams.get("fileId") || "").trim();
    if (!fileId) return NextResponse.json({ error: "fileId required" }, { status: 400 });

    const accessToken = await ensureGoogleAccessToken(session.user.id);
    const meta = await getDriveMetadata(fileId, accessToken);
    const content = await exportToPlainText(accessToken, meta as any);
    if (!content) return NextResponse.json({ error: "unsupported_or_empty" }, { status: 400 });

    return NextResponse.json({ fileId, fileName: meta.name, content });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: /not connected|access token/i.test(message) ? 401 : 500 });
  }
}, {
  onUnauthorized: () => new ChatSDKError("unauthorized:api").toResponse(),
});

