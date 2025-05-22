import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/"

  try {
    // 指定されたパスのキャッシュを無効化（セキュリティチェックなし）
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, now: Date.now(), path })
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
