import { describe, expect, it } from 'vitest'
import {
  categories,
  documents,
  extractHeadings,
  extractTitle,
  homeDocument,
  resolveDocumentPath,
  toPlainText,
} from './content'

describe('course content index', () => {
  it('indexes the complete course and its legal section', () => {
    expect(documents.length).toBeGreaterThanOrEqual(121)
    expect(categories.find((category) => category.id === '04-era-ia-local')?.documents).toHaveLength(7)
    expect(categories.find((category) => category.id === '06-era-agent-tools')?.documents).toHaveLength(8)
    expect(categories.find((category) => category.id === '14-ampliacion-avanzada')?.documents).toHaveLength(18)
    expect(categories.find((category) => category.id === '15-legal')?.documents).toHaveLength(11)
    expect(categories.find((category) => category.id === '16-panorama-actual')?.documents).toHaveLength(5)
    expect(homeDocument.path).toBe('README.md')
  })

  it('opens every expandable category with its summary', () => {
    const expandableCategories = categories.filter((category) => category.id !== 'root')

    expect(expandableCategories).toHaveLength(18)
    for (const category of expandableCategories) {
      expect(category.documents[0]?.path).toBe(`${category.id}/00-resumen.md`)
    }
  })

  it('keeps document paths unique', () => {
    const paths = documents.map((document) => document.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('extracts stable, unique heading anchors', () => {
    const headings = extractHeadings('## Concepto\n### Detalle\n## Concepto')
    expect(headings.map((heading) => heading.id)).toEqual(['concepto', 'detalle', 'concepto-1'])
  })

  it('extracts titles and headings from Windows CRLF markdown', () => {
    const markdown = '# Lección\r\n\r\n## Tokenización\r\n\r\nTexto.\r\n## Embeddings\r\n'

    expect(extractTitle(markdown, 'fallback')).toBe('Lección')
    expect(extractHeadings(markdown)).toEqual([
      { depth: 2, text: 'Tokenización', id: 'tokenización' },
      { depth: 2, text: 'Embeddings', id: 'embeddings' },
    ])
  })

  it('indexes the principal headings of the tokenization lesson', () => {
    const document = documents.find((candidate) => candidate.path === '02-era-transformer/01-tokens-embeddings-y-contexto.md')

    expect(document?.headings.filter((heading) => heading.depth === 2).map((heading) => heading.text)).toEqual([
      'Tokenización',
      'Embeddings',
      'Ventana de contexto',
      'Embedding no es base de datos vectorial',
    ])
  })

  it('resolves relative markdown links within the course tree', () => {
    expect(resolveDocumentPath('00-guia/01-como-usar-el-curso.md', '../15-legal/README.md'))
      .toEqual({ path: '15-legal/README.md', anchor: undefined })
    expect(resolveDocumentPath('README.md', 'no-existe.md')).toBeNull()
  })

  it('indexes context caching and compaction in their lessons and page outlines', () => {
    const sections = [
      ['04-era-ia-local/03-inferencia-flashattention-y-kv-cache.md', 'Context cache: caché de contexto entre peticiones'],
      ['06-era-agent-tools/02-memoria-planificacion-y-fiabilidad.md', 'Compactadores de contexto'],
      ['13-prompting-loop-graph-engineering/02-contexto-evidencia-y-estructura.md', 'Práctica: caché y compactación en un bucle'],
    ]

    for (const [path, title] of sections) {
      const document = documents.find((candidate) => candidate.path === path)
      const heading = document?.headings.find((candidate) => candidate.text === title)

      expect(heading?.depth).toBe(2)
      expect(toPlainText(document?.content || '')).toContain(title)
      expect(resolveDocumentPath('README.md', `${path}#${heading?.id}`))
        .toEqual({ path, anchor: heading?.id })
    }
  })

  it('turns markdown into searchable text', () => {
    expect(toPlainText('# Título\nUn [enlace](https://example.com) y `código`.')).toContain('Título Un enlace y código')
  })

  it('indexes the reasoning technique family in the Thinking era', () => {
    const path = '05-era-thinking/01-de-chain-of-thought-a-reasoning-models.md'
    const document = documents.find((candidate) => candidate.path === path)
    const expectedHeadings = [
      'Zero-Shot, One-Shot y Few-Shot',
      'Chain-of-Thought: una ruta lineal de pasos',
      'De una cadena a varias rutas',
      'Tree of Thoughts: explorar, puntuar y retroceder',
      'Graph of Thoughts: combinar y reutilizar ramas',
      'Program of Thoughts, PAL y ReAct: sacar trabajo fuera del texto',
      'Qué técnica elegir',
    ]

    expect(document?.categoryId).toBe('05-era-thinking')
    expect(document?.headings.filter((heading) => expectedHeadings.includes(heading.text)).map((heading) => heading.text))
      .toEqual(expectedHeadings)
    expect(toPlainText(document?.content || '')).toContain('Self Consistency')
    expect(resolveDocumentPath('README.md', `${path}#tree-of-thoughts-explorar-puntuar-y-retroceder`))
      .toEqual({ path, anchor: 'tree-of-thoughts-explorar-puntuar-y-retroceder' })
  })

  it.each([
    ['03-era-chatgpt/05-sicofancia-de-modelos.md', '03-era-chatgpt', 'Sicofancia', 'Cómo apareció en la investigación'],
    ['06-era-agent-tools/05-evolucion-del-modo-plan.md', '06-era-agent-tools', 'modo plan', 'Una evolución, no una invención aislada'],
  ])('indexes the new lesson %s in its era and outline', (path, categoryId, term, headingTitle) => {
    const document = documents.find((candidate) => candidate.path === path)
    const heading = document?.headings.find((candidate) => candidate.text === headingTitle)

    expect(document?.categoryId).toBe(categoryId)
    expect(toPlainText(document?.content || '')).toContain(term)
    expect(heading?.depth).toBe(2)
    expect(resolveDocumentPath('README.md', `${path}#${heading?.id}`))
      .toEqual({ path, anchor: heading?.id })
  })

  it('indexes the agent framework comparison and its principal options', () => {
    const path = '06-era-agent-tools/06-frameworks-de-agentes.md'
    const document = documents.find((candidate) => candidate.path === path)
    const text = toPlainText(document?.content || '')
    const expectedFrameworks = [
      'LangGraph',
      'CrewAI',
      'AutoGen',
      'Microsoft Agent Framework',
      'Semantic Kernel',
      'OpenAI Agents SDK',
      'Google ADK',
      'PydanticAI',
      'Mastra',
      'LlamaIndex',
    ]

    expect(document?.categoryId).toBe('06-era-agent-tools')
    expect(document?.headings.find((heading) => heading.text === 'Mapa rápido de opciones')?.depth).toBe(2)
    expect(document?.headings.find((heading) => heading.text === 'Semantic Kernel: integrar modelos con software empresarial')?.depth).toBe(2)
    for (const framework of expectedFrameworks) {
      expect(text).toContain(framework)
    }
    expect(resolveDocumentPath('README.md', `${path}#mapa-rápido-de-opciones`))
      .toEqual({ path, anchor: 'mapa-rápido-de-opciones' })
  })

  it('indexes guardrails, hallucination controls, evals and loop breakers', () => {
    const path = '06-era-agent-tools/07-guardarrailes-evals-y-control-de-fallos.md'
    const document = documents.find((candidate) => candidate.path === path)
    const text = toPlainText(document?.content || '')
    const expectedHeadings = [
      'Defensa en profundidad: dónde colocar controles',
      'Reducir alucinaciones sin prometer eliminarlas',
      'Data exfiltration: cuando los datos salen por una ruta permitida',
      'PII redaction, masking y pseudonimización',
      'Evitar bucles infinitos y agentes que deambulan',
      'Métodos de evaluación: una escalera completa',
      'Guardarraíles que también necesitan guardarraíles',
    ]

    expect(document?.categoryId).toBe('06-era-agent-tools')
    for (const heading of expectedHeadings) {
      expect(document?.headings.find((candidate) => candidate.text === heading)?.depth).toBe(2)
    }
    expect(text).toContain('circuit breaker')
    expect(text).toContain('falso negativo')
    expect(text).toContain('Presidio')
    expect(resolveDocumentPath('README.md', `${path}#evitar-bucles-infinitos-y-agentes-que-deambulan`))
      .toEqual({ path, anchor: 'evitar-bucles-infinitos-y-agentes-que-deambulan' })
  })

  it('indexes Ragas, DeepEval and Langfuse as complementary evaluation tools', () => {
    const path = '13-prompting-loop-graph-engineering/05-verificacion-jueces-y-evals.md'
    const document = documents.find((candidate) => candidate.path === path)
    const text = toPlainText(document?.content || '')

    expect(document?.headings.find((heading) => heading.text === 'Ragas, DeepEval y Langfuse')?.depth).toBe(2)
    for (const term of ['Ragas', 'DeepEval', 'Langfuse', 'evaluación online', 'CI']) {
      expect(text).toContain(term)
    }
    expect(resolveDocumentPath('README.md', `${path}#ragas-deepeval-y-langfuse`))
      .toEqual({ path, anchor: 'ragas-deepeval-y-langfuse' })
  })

  it('indexes lexical, vector, hybrid retrieval, embeddings and reranking separately', () => {
    const path = '14-ampliacion-avanzada/08-contexto-largo-y-rag-avanzado.md'
    const document = documents.find((candidate) => candidate.path === path)
    const expectedHeadings = [
      'Lexical: palabras, identificadores y rareza',
      'Vector: embeddings y similitud semántica',
      'Hybrid retrieval: dos candidatos, una lista',
      'Reranking: leer menos candidatos con mayor profundidad',
      'Fallos por etapa',
    ]

    for (const heading of expectedHeadings) {
      expect(document?.headings.find((candidate) => candidate.text === heading)?.depth).toBe(3)
    }
    expect(resolveDocumentPath('README.md', `${path}#hybrid-retrieval-dos-candidatos-una-lista`))
      .toEqual({ path, anchor: 'hybrid-retrieval-dos-candidatos-una-lista' })
  })

  it('indexes data lake, warehouse and lakehouse architectures for AI workloads', () => {
    const path = '14-ampliacion-avanzada/06-datos-tokenizacion-y-curacion.md'
    const document = documents.find((candidate) => candidate.path === path)
    const text = toPlainText(document?.content || '')
    const expectedHeadings = [
      'Data lake, data warehouse y lakehouse',
      'Arquitectura medallion: raw, validado y consumible',
      'Cómo encaja en sistemas de IA',
      'Qué elegir',
      'Anti-patrones',
    ]

    for (const heading of expectedHeadings) {
      expect(document?.headings.find((candidate) => candidate.text === heading)?.depth).toBe(2)
    }
    for (const term of ['Data lake', 'Data warehouse', 'Lakehouse', 'Bronze', 'Silver', 'Gold', 'base vectorial']) {
      expect(text.toLowerCase()).toContain(term.toLowerCase())
    }
    expect(resolveDocumentPath('README.md', `${path}#data-lake-data-warehouse-y-lakehouse`))
      .toEqual({ path, anchor: 'data-lake-data-warehouse-y-lakehouse' })
  })

  it('indexes knowledge graph modeling, databases, embeddings and GNNs', () => {
    const path = '14-ampliacion-avanzada/16-grafos-de-conocimiento-bases-de-grafos-y-gnn.md'
    const document = documents.find((candidate) => candidate.path === path)
    const text = toPlainText(document?.content || '')
    const expectedTerms = [
      'Schema',
      'ontología',
      'resolución de entidades',
      'Neo4j',
      'Memgraph',
      'Amazon Neptune',
      'ArangoDB',
      'graph embedding',
      'Graph Convolutional Network',
      'Graph Attention Network',
    ]

    expect(document?.categoryId).toBe('14-ampliacion-avanzada')
    expect(document?.headings.find((heading) => heading.text === 'Bases de datos de grafos: cuatro opciones relevantes')?.depth).toBe(2)
    for (const term of expectedTerms) {
      expect(text).toContain(term)
    }
    expect(resolveDocumentPath('README.md', `${path}#resolución-de-entidades-saber-cuándo-dos-registros-son-el-mismo`))
      .toEqual({ path, anchor: 'resolución-de-entidades-saber-cuándo-dos-registros-son-el-mismo' })
  })
})
