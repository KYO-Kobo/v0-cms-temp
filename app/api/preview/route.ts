import { redirect } from "next/navigation"
import { draftMode } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // URLからクエリパラメータを取得
  const searchParams = request.nextUrl.searchParams
  const contentId = searchParams.get("contentId")
  const draftKey = searchParams.get("draftKey")
  const slug = searchParams.get("slug") || "blog"

  // パラメータのバリデーション
  if (!contentId || !draftKey) {
    return NextResponse.json({ message: "Missing contentId or draftKey parameter" }, { status: 400 })
  }

  // Draft モードを有効化
  draftMode().enable()

  // 記事詳細ページにリダイレクト
  redirect(`/${slug}/${contentId}?draftKey=${draftKey}`)
}
