"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Heading = {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // 見出し要素を取得
    const elements = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
      .filter((element) => element.id) // idがある要素のみ
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number.parseInt(element.tagName.substring(1)), // h1 -> 1, h2 -> 2, ...
      }))
      // 見出し1のみをフィルタリング
      .filter((heading) => heading.level === 1)

    setHeadings(elements)

    // スクロール時に現在の見出しをハイライト
    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll("h1[id]"))

      // 画面上部から少し下の位置を基準にする
      const scrollPosition = window.scrollY + 150

      // 現在のスクロール位置より上にある最後の見出しを探す
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i]
        if (element.offsetTop <= scrollPosition) {
          setActiveId(element.id)
          return
        }
      }

      // 見つからなければ最初の見出しをアクティブに
      if (headingElements.length > 0) {
        setActiveId(headingElements[0].id)
      }
    }

    handleScroll() // 初期表示時にも実行
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4">目次</h2>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "flex items-center text-gray-600 hover:text-blue-600 transition-colors",
                activeId === heading.id ? "text-blue-600 font-medium" : "text-gray-400",
              )}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: "smooth",
                })
              }}
            >
              <span
                className={cn("w-2 h-2 rounded-full mr-2", activeId === heading.id ? "bg-blue-600" : "bg-gray-300")}
              />
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
