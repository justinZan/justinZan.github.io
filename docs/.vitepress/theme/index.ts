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

function normalizeQuestionText(heading: Element) {
  return (heading.textContent || '')
    .replace(/\s+/g, ' ')
    .replace('已掌握', '')
    .trim()
}

function progressStorageKey(heading: Element, index: number) {
  const id = heading.id || `${normalizeQuestionText(heading)}-${index}`
  return `justinzan:qa-progress:${window.location.pathname}:${id}`
}

function readProgress(key: string) {
  try {
    return window.localStorage.getItem(key) === 'done'
  } catch {
    return false
  }
}

function writeProgress(key: string, done: boolean) {
  try {
    if (done) {
      window.localStorage.setItem(key, 'done')
    } else {
      window.localStorage.removeItem(key)
    }
  } catch {
    // Ignore storage failures, such as private browsing restrictions.
  }
}

function syncQuestionProgress(heading: Element, done: boolean) {
  heading.classList.toggle('qa-question-done', done)
  const answer = heading.nextElementSibling
  if (answer?.classList.contains('qa-answer')) {
    answer.classList.toggle('qa-answer-done', done)
  }
}

function enhanceQuestionProgress(headings: Element[]) {
  headings.forEach((heading, index) => {
    if (heading.querySelector('.qa-check')) {
      const input = heading.querySelector<HTMLInputElement>('.qa-check')
      syncQuestionProgress(heading, Boolean(input?.checked))
      return
    }

    const key = progressStorageKey(heading, index)
    const label = document.createElement('label')
    label.className = 'qa-check-label'
    label.title = '标记为已看懂'

    const input = document.createElement('input')
    input.className = 'qa-check'
    input.type = 'checkbox'
    input.checked = readProgress(key)
    input.setAttribute('aria-label', `标记已看懂：${normalizeQuestionText(heading)}`)

    const mark = document.createElement('span')
    mark.className = 'qa-check-mark'
    mark.setAttribute('aria-hidden', 'true')

    label.append(input, mark)
    heading.prepend(label)
    syncQuestionProgress(heading, input.checked)

    input.addEventListener('change', () => {
      writeProgress(key, input.checked)
      syncQuestionProgress(heading, input.checked)
    })
  })
}

function isWordTable(table: HTMLTableElement) {
  const headers = Array.from(table.querySelectorAll('thead th')).map((header) =>
    (header.textContent || '').trim().toLowerCase()
  )

  return (
    (headers[0] === 'word' && headers[1] === '中文' && headers[2] === 'example') ||
    (headers[0] === '掌握' && headers[1] === 'word' && headers[2] === '中文')
  )
}

function wordStorageKey(word: string, index: number) {
  return `justinzan:word-progress:${window.location.pathname}:${word.toLowerCase()}:${index}`
}

function syncWordProgress(row: HTMLTableRowElement, done: boolean) {
  row.classList.toggle('word-row-done', done)
}

function enhanceWordProgress() {
  const doc = document.querySelector('.vp-doc')
  if (!doc) return

  const tables = Array.from(doc.querySelectorAll<HTMLTableElement>('table')).filter(isWordTable)

  tables.forEach((table) => {
    table.classList.add('word-table')

    const firstHeader = table.querySelector<HTMLTableCellElement>('thead th')
    const hasProgressColumn = firstHeader?.textContent?.trim() === '掌握'

    if (!hasProgressColumn) {
      const progressHeader = document.createElement('th')
      progressHeader.className = 'word-progress-header'
      progressHeader.textContent = '掌握'
      firstHeader?.before(progressHeader)
    }

    const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>('tbody tr'))

    rows.forEach((row, index) => {
      const wordCell = row.querySelector<HTMLTableCellElement>(
        hasProgressColumn ? 'td:nth-child(2)' : 'td:first-child'
      )
      const word = wordCell?.textContent?.replace(/\s+/g, ' ').trim() || ''
      if (!wordCell || !word) return

      const progressCell = row.querySelector<HTMLTableCellElement>('.word-progress-cell')

      if (progressCell?.querySelector('.word-check')) {
        const input = progressCell.querySelector<HTMLInputElement>('.word-check')
        syncWordProgress(row, Boolean(input?.checked))
        return
      }

      const key = wordStorageKey(word, index)
      const label = document.createElement('label')
      label.className = 'word-check-label'
      label.title = '标记为已掌握'

      const input = document.createElement('input')
      input.className = 'word-check'
      input.type = 'checkbox'
      input.checked = readProgress(key)
      input.setAttribute('aria-label', `标记已掌握：${word}`)

      const mark = document.createElement('span')
      mark.className = 'word-check-mark'
      mark.setAttribute('aria-hidden', 'true')

      label.append(input, mark)

      const nextProgressCell = progressCell || document.createElement('td')
      nextProgressCell.className = 'word-progress-cell'
      nextProgressCell.textContent = ''
      nextProgressCell.append(label)

      if (!progressCell) {
        row.prepend(nextProgressCell)
      }

      wordCell.classList.add('word-text')
      syncWordProgress(row, input.checked)

      input.addEventListener('change', () => {
        writeProgress(key, input.checked)
        syncWordProgress(row, input.checked)
      })
    })
  })
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

  enhanceQuestionProgress(headings)
  enhanceWordProgress()
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
