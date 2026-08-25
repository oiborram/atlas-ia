import { Children, isValidElement, useState, type ReactNode } from 'react'
import { Check, Copy, ArrowSquareOut } from '@phosphor-icons/react'
import ReactMarkdown from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { CourseDocument } from '../content'
import { resolveDocumentPath } from '../content'
import { MermaidBlock } from './MermaidBlock'

interface MarkdownArticleProps {
  document: CourseDocument
  content?: string
  onNavigate: (path: string, anchor?: string) => void
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children)
  return ''
}

function CodeFrame({ children }: { children?: ReactNode }) {
  const child = Children.toArray(children)[0]
  const className = isValidElement<{ className?: string }>(child) ? child.props.className || '' : ''
  const code = extractText(child).replace(/\n$/, '')
  const [copied, setCopied] = useState(false)

  if (className.includes('language-mermaid')) return <MermaidBlock chart={code} />

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="code-frame">
      <button className="copy-code" type="button" onClick={copy} aria-label="Copiar código">
        {copied ? <Check size={15} /> : <Copy size={15} />}
        <span>{copied ? 'Copiado' : 'Copiar'}</span>
      </button>
      <pre>{children}</pre>
    </div>
  )
}

export function MarkdownArticle({ document, content = document.content, onNavigate }: MarkdownArticleProps) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          rehypeHighlight,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
        components={{
          pre: CodeFrame,
          a: ({ href = '', children, ...props }) => {
            const target = resolveDocumentPath(document.path, href)
            if (target) {
              return (
                <a
                  href={`#/doc/${encodeURIComponent(target.path)}${target.anchor ? `?anchor=${encodeURIComponent(target.anchor)}` : ''}`}
                  onClick={(event) => {
                    event.preventDefault()
                    onNavigate(target.path, target.anchor)
                  }}
                  {...props}
                >
                  {children}
                </a>
              )
            }
            if (href.startsWith('#')) {
              return (
                <a
                  href={href}
                  onClick={(event) => {
                    event.preventDefault()
                    globalThis.document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  {...props}
                >
                  {children}
                </a>
              )
            }
            const external = /^https?:\/\//.test(href)
            return (
              <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...props}>
                {children}
                {external && <ArrowSquareOut className="external-link-icon" size={13} aria-hidden="true" />}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
