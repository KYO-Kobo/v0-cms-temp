import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // microCMSのWebhookからのリクエストを検証
    // 本番環境では、X-MICROCMS-SIGNATURE ヘッダーを使用した検証を追加することをお勧めします

    // コンテンツタイプに応じてパスを選択
    let path = "/"
    if (body.contents && body.contents.endpoint === "blogs") {
      // ブログ記事の場合
      path = "/blog"

      // 特定の記事が更新された場合は、その記事のパスも更新
      if (body.contents.id) {
        revalidatePath(`/blog/${body.contents.id}`)
      }
    }

    // 指定されたパスのキャッシュを更新
    revalidatePath(path)

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error("Webhook error:", err)
    return NextResponse.json({ message: "Error processing webhook" }, { status: 500 })
  }
}
