<template>
  <div
    class="side-bar-toc"
    :class="[
      {
        'side-bar-toc-overflow': !wordWrapInToc,
        'side-bar-toc-wordwrap': wordWrapInToc
      }
    ]"
    ref="tocContainer"
  >
    <div class="title">{{ $t("sideBar.toc.title") }}</div>
    <el-tree
      v-if="toc.length"
      ref="tocTree"
      :data="toc"
      :default-expand-all="true"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      :indent="10"
      node-key="slug"
      :current-node-key="activeHeadingId"
      class="custom-tree"
    ></el-tree>
    <div class="no-data" v-else>
      <svg aria-hidden="true" :viewBox="EmptyIcon.viewBox">
        <use :xlink:href="EmptyIcon.url"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bus from '../../bus'
import EmptyIcon from '@/assets/icons/undraw_toc_empty.svg'

export default {
  name: 'Toc',
  data () {
    return {
      EmptyIcon,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      activeHeadingId: null,
      headingsCache: null, // 缓存标题元素
      lastScrollTime: 0 // 用于限制滚动处理频率
    }
  },

  computed: {
    ...mapState({
      toc: state => state.editor.toc,
      wordWrapInToc: state => state.preferences.wordWrapInToc
    })
  },

  mounted () {
    this.$nextTick(() => {
      // 尝试获取 Muya 编辑器容器
      this.editorElement =
        document.querySelector('.mu-container') ||
        document.querySelector('.editor-container')
      if (this.editorElement) {
        console.log('Editor element found:', this.editorElement) // DEBUG
        this.setupEventListeners()
        this.updateHeadingsCache()
      } else {
        console.warn('Editor element not found')
      }
    })
  },

  methods: {
    setupEventListeners () {
      if (!this.editorElement) return

      console.log('Setting up scroll listener on:', this.editorElement) // DEBUG

      // 同时监听文档和编辑器的滚动事件
      this.editorElement.addEventListener('scroll', this.handleScroll, {
        passive: true
      })
      document.addEventListener('scroll', this.handleScroll, { passive: true })
      window.addEventListener('scroll', this.handleScroll, { passive: true })

      // 监听鼠标滚轮事件
      this.editorElement.addEventListener('wheel', this.handleScroll, {
        passive: true
      })

      this.editorElement.addEventListener('click', this.handleEditorClick)
    },

    // 处理树节点点击
    handleNodeClick ({ slug }) {
      bus.$emit('scroll-to-header', slug)
    },

    // 处理编辑器点击
    handleEditorClick () {
      this.syncOutlinePosition()
    },

    // 处理滚动事件
    handleScroll: debounce(function (event) {
      if (!this.editorElement) return

      const editorRect = this.editorElement.getBoundingClientRect()
      const viewportTop = editorRect.top
      const viewportHeight = editorRect.height
      const targetY = viewportTop + viewportHeight / 3

      // 找到该位置最近的标题
      let targetElement = null
      const elements = this.editorElement.querySelectorAll(
        'h1, h2, h3, h4, h5, h6'
      )

      // 找最近的标题
      let closestDistance = Infinity
      elements.forEach(element => {
        const rect = element.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - targetY)
        if (distance < closestDistance) {
          closestDistance = distance
          targetElement = element
        }
      })

      if (!targetElement) return

      const headingSlug =
        targetElement.id || targetElement.getAttribute('data-id')
      if (!headingSlug) return

      // 更新大纲高亮并滚动到对应位置
      if (headingSlug !== this.activeHeadingId) {
        this.activeHeadingId = headingSlug
        this.$nextTick(() => {
          const { tocTree } = this.$refs
          if (tocTree) {
            tocTree.setCurrentKey(headingSlug)
            const nodeEl = tocTree.$el.querySelector(
              `[data-key="${headingSlug}"]`
            )
            if (nodeEl) {
              nodeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            }
          }
        })
      }
    }, 800),

    // 更新标题缓存
    updateHeadingsCache () {
      if (!this.editorElement) return

      const headings = Array.from(
        this.editorElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
      )
      const oldLength = this.headingsCache?.length || 0
      this.headingsCache = headings

      // 只在标题数量变化时打印日志
      if (headings.length !== oldLength) {
        console.log('Headings cache updated:', {
          count: headings.length,
          first: headings[0]?.textContent,
          last: headings[headings.length - 1]?.textContent
        })
      }
    },

    // 同步大纲位置
    syncOutlinePosition () {
      if (!this.editorElement || !this.headingsCache?.length) return

      let targetElement = null

      const selection = window.getSelection()
      if (selection.rangeCount > 0) {
        targetElement = selection.anchorNode?.parentElement
      } else {
        const elements = this.editorElement.querySelectorAll('*')
        for (const element of elements) {
          const rect = element.getBoundingClientRect()
          if (rect.top > 0) {
            targetElement = element
            break
          }
        }
      }

      if (!targetElement) return

      // 找到最近的标题元素
      let closestHeading = null
      let currentElement = targetElement

      // 向上查找最近的标题
      while (currentElement && currentElement !== this.editorElement) {
        if (currentElement.matches('h1, h2, h3, h4, h5, h6')) {
          closestHeading = currentElement
          break
        }
        currentElement = currentElement.parentElement
      }

      // 如果向上没找到，则查找当前位置之前最近的标题
      if (!closestHeading) {
        // 获取文档中的所有节点
        const treeWalker = document.createTreeWalker(
          this.editorElement,
          NodeFilter.SHOW_ELEMENT,
          null,
          false
        )

        let currentNode = null
        let previousHeading = null

        // 遍历所有节点直到找到目标元素
        while ((currentNode = treeWalker.nextNode())) {
          if (currentNode.matches('h1, h2, h3, h4, h5, h6')) {
            previousHeading = currentNode
          }
          if (currentNode === targetElement) {
            closestHeading = previousHeading
            break
          }
        }
      }

      if (!closestHeading) return

      const headingSlug =
        closestHeading.id || closestHeading.getAttribute('data-id')
      if (!headingSlug) return

      if (headingSlug !== this.activeHeadingId) {
        this.activeHeadingId = headingSlug
        this.$nextTick(() => {
          const { tocTree } = this.$refs
          if (tocTree) {
            tocTree.setCurrentKey(headingSlug)
            const nodeEl = tocTree.$el.querySelector(
              `[data-key="${headingSlug}"]`
            )
            if (nodeEl) {
              nodeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            }
          }
        })
      }
    },

    scrollToOutlineItem (headingId) {
      const { tocTree } = this.$refs
      if (!tocTree) {
        console.warn('TOC tree not found')
        return
      }

      console.log('Attempting to scroll to:', headingId)

      const findNodeInToc = nodes => {
        for (const node of nodes) {
          if (node.slug === headingId) {
            return node
          }
          if (node.children?.length) {
            const found = findNodeInToc(node.children)
            if (found) return found
          }
        }
        return null
      }

      const targetNode = findNodeInToc(this.toc)
      if (targetNode) {
        console.log('Found matching node in TOC:', {
          slug: targetNode.slug,
          label: targetNode.label
        })

        try {
          if (!targetNode.slug) {
            console.error('Node has no valid slug:', targetNode)
            return
          }

          tocTree.setCurrentKey(targetNode.slug)

          const nodeEl = tocTree.$el.querySelector(
            `[data-key="${targetNode.slug}"]`
          )
          if (nodeEl) {
            // 确保父节点都是展开的
            let currentNode = targetNode
            while (currentNode.parent) {
              const parentNode = tocTree.store.nodesMap[currentNode.parent]
              if (parentNode) {
                parentNode.expanded = true
                currentNode = parentNode
              } else {
                break
              }
            }

            // 滚动到可视区域
            nodeEl.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            })

            console.log('Successfully scrolled to node:', targetNode.slug)
          } else {
            console.warn('Node element not found in DOM:', targetNode.slug)
          }
        } catch (error) {
          console.error('Error setting current node:', {
            error,
            nodeKey: targetNode.slug,
            node: targetNode
          })
        }
      } else {
        console.warn('No matching node found in TOC data for:', headingId)
      }
    }
  },

  beforeDestroy () {
    // 清理事件监听
    if (this.editorElement) {
      this.editorElement.removeEventListener('scroll', this.handleScroll)
      this.editorElement.removeEventListener('wheel', this.handleScroll)
      this.editorElement.removeEventListener('click', this.handleEditorClick)
    }
    document.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.handleScroll)
  }
}

// 防抖函数
function debounce (fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
</script>

<style>
.side-bar-toc {
  height: var(--theme-color);
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  background-color: var(--theme-color);
}

.side-bar-toc-overflow {
  overflow: auto;
}

.side-bar-toc-wordwrap {
  overflow-x: hidden;
  overflow-y: auto;
  & .el-tree-node__content {
    white-space: normal;
    height: auto;
    min-height: 26px;
  }
}

.toc-item {
  cursor: pointer;
  transition: all 0.3s;
}

.toc-item.active {
  background-color: var(--theme-color);
  border-right: var(--theme-color);
}

.el-tree {
  background-color: var(--theme-color);
  color: var(--theme-color);
}

.el-tree-node.is-current > .el-tree-node__content {
  background-color: #ebe708; /* 点击的时候的颜色 */
  color: #0829e4; /* 点击文字颜色 */
  font-size: 20px;
}

.el-tree-node.is-current > .el-tree-node__content:hover {
  background-color: #ebe708; /* 点击的时候的颜色 */
  color: #0829e4; /* 点击文字颜色 */
  font-size: 20px;
}

.el-tree-node.is-current > .el-tree-node__label {
  font-size: 20px;
  color: #f4f800;
  background-color: #ff0000; /* 点击的时候的颜色 */
}
.el-tree-node.is-current > .el-tree-node__label:hover {
  font-size: 20px;
  color: #ff0000;
  background-color: #f4f800; /* 点击的时候的颜色 */
}
</style>
