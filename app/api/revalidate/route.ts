import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")
  const path = request.nextUrl.searchParams.get("path") || "/"

  // 環境変数にREVALIDATE_SECRETを設定していない場合は、すべてのリクエストを許可
  // 本番環境では必ず設定してください
  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  try {
    // 指定されたパスのキャッシュを無効化
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, now: Date.now(), path })
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
