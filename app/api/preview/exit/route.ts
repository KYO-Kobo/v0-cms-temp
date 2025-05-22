import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET() {
  // Draft モードを無効化
  draftMode().disable()

  // トップページにリダイレクト
  redirect("/")
}
