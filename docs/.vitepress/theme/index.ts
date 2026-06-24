import DefaultTheme from 'vitepress/theme'
import { defineComponent, h, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import './style.css'

const questionKeywords = [
  '什么',
  '如何',
  '怎么',
  '为什么',
  '区别',
  '有哪些',
  '是什么',
  '怎么做',
  '如何做',
  '怎么办',
  '怎么选',
  '怎么排查',
  '怎么优化',
  '怎么设计',
  '怎么处理',
  '怎么防',
  '怎么解决',
  '适合',
  '作用'
]

function isQuestionHeading(heading: Element) {
  const text = heading.textContent?.replace(/\s+/g, ' ').trim() || ''

  if (!text) return false
  if (/[?？]/.test(text)) return true
  if (/^(场景|案例|Q\d+|问\d*)[\s:：.、-]/i.test(text)) return true

  return questionKeywords.some((keyword) => text.includes(keyword))
}

function headingLevel(heading: Element) {
  return Number(heading.tagName.slice(1))
}

function isStopHeading(node: ChildNode, level: number) {
  return (
    node instanceof HTMLHeadingElement &&
    /^H[2-4]$/.test(node.tagName) &&
    headingLevel(node) <= level
  )
}

function isIgnorableNode(node: ChildNode) {
  return node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()
}

function enhanceAnswerBlocks() {
  const doc = document.querySelector('.vp-doc')
  if (!doc) return

  doc.setAttribute('data-answer-enhanced', window.location.pathname)

  const headings = Array.from(doc.querySelectorAll('h2, h3, h4')).filter(
    (heading) => !heading.closest('.qa-answer') && isQuestionHeading(heading)
  )

  headings.forEach((heading) => {
    heading.classList.add('qa-question')

    const nextElement = heading.nextElementSibling
    if (nextElement?.classList.contains('qa-answer')) return

    const level = headingLevel(heading)
    const answerNodes: ChildNode[] = []
    let node = heading.nextSibling

    while (node && !isStopHeading(node, level)) {
      const current = node
      node = node.nextSibling

      if (!isIgnorableNode(current)) {
        answerNodes.push(current)
      }
    }

    if (!answerNodes.length) return

    const answer = document.createElement('div')
    answer.className = 'qa-answer auto-answer'
    heading.after(answer)
    answerNodes.forEach((answerNode) => answer.appendChild(answerNode))
  })
}

const Layout = defineComponent({
  setup() {
    const route = useRoute()

    onMounted(() => {
      nextTick(enhanceAnswerBlocks)
    })

    watch(
      () => route.path,
      () => {
        nextTick(enhanceAnswerBlocks)
      }
    )

    return () => h(DefaultTheme.Layout)
  }
})

export default {
  extends: DefaultTheme,
  Layout
}
