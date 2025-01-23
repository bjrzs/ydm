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
      lastScrollTime: 0, // 用于限制滚动处理频率
      mouseIdleTimer: null, // 添加鼠标闲置计时器
      lastMousePosition: { x: 0, y: 0 } // 记录最后鼠标位置
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
      this.editorElement =
        document.querySelector('.mu-container') ||
        document.querySelector('.editor-container')
      if (this.editorElement) {
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

      // 监听鼠标移动来重置闲置计时器
      this.editorElement.addEventListener('mousemove', this.resetIdleTimer)

      // 初始启动闲置检测
      this.startIdleDetection()
    },

    // 处理树节点点击
    handleNodeClick ({ slug }) {
      bus.$emit('scroll-to-header', slug)
    },

    // 处理编辑器点击
    handleEditorClick (event) {
      if (!this.editorElement) return

      const editorRect = this.editorElement.getBoundingClientRect()
      const mouseY = event.clientY - editorRect.top

      // 找到该位置最近的标题
      let targetElement = null
      const elements = this.editorElement.querySelectorAll(
        'h1, h2, h3, h4, h5, h6'
      )

      // 找最近的标题
      let closestDistance = Infinity
      elements.forEach(element => {
        const rect = element.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - mouseY)
        if (distance < closestDistance) {
          closestDistance = distance
          targetElement = element
        }
      })

      if (!targetElement) return

      const headingSlug =
        targetElement.id || targetElement.getAttribute('data-id')
      if (!headingSlug) return

      // 更新大纲高亮
      if (headingSlug !== this.activeHeadingId) {
        this.activeHeadingId = headingSlug
        this.$nextTick(() => {
          const { tocTree } = this.$refs
          if (tocTree) {
            tocTree.setCurrentKey(headingSlug)

            // 根据鼠标位置同步大纲滚动
            const tocContainer = tocTree.$el
            const tocRect = tocContainer.getBoundingClientRect()

            // 计算鼠标位置在编辑器中的相对比例
            const relativeMousePosition = mouseY / editorRect.height

            // 计算大纲应该滚动到的位置
            const targetScrollTop =
              tocContainer.scrollHeight * relativeMousePosition - tocRect.height / 2

            // 平滑滚动到目标位置
            tocContainer.scrollTo({
              top: targetScrollTop,
              behavior: 'smooth'
            })
          }
        })
      }
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

    // 同步大纲滚动位置到鼠标位置
    syncTocScrollPosition (mouseY, tocTree, nodeEl) {
      if (!tocTree || !nodeEl) return

      const tocContainer = tocTree.$el
      const tocRect = tocContainer.getBoundingClientRect()

      // 计算节点在大纲中的相对位置比例
      const relativeMousePosition = mouseY / window.innerHeight

      // 计算大纲应该滚动的位置
      const targetScrollTop =
        tocContainer.scrollHeight * relativeMousePosition - tocRect.height / 2

      // 平滑滚动到目标位置
      tocContainer.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      })
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
    },

    // 重置闲置计时器
    resetIdleTimer (event) {
      // 清除现有计时器
      if (this.mouseIdleTimer) {
        clearTimeout(this.mouseIdleTimer)
      }

      // 记录当前鼠标位置
      this.lastMousePosition = {
        x: event.clientX,
        y: event.clientY
      }

      // 设置新的计时器
      this.mouseIdleTimer = setTimeout(() => {
        this.handleMouseIdle()
      }, 500) // 500ms 后触发闲置处理
    },

    // 处理鼠标闲置
    handleMouseIdle () {
      if (!this.editorElement) return

      const editorRect = this.editorElement.getBoundingClientRect()
      const mouseY = this.lastMousePosition.y - editorRect.top

      // 找到该位置最近的标题
      const elements = Array.from(
        this.editorElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
      )

      // 按照在文档中的位置排序
      elements.sort((a, b) => {
        const aRect = a.getBoundingClientRect()
        const bRect = b.getBoundingClientRect()
        return aRect.top - bRect.top
      })

      // 找到鼠标位置最近的标题
      let targetElement = null
      let minDistance = Infinity

      elements.forEach(element => {
        const rect = element.getBoundingClientRect()
        const elementMiddle = rect.top + rect.height / 2 - editorRect.top
        const distance = Math.abs(elementMiddle - mouseY)

        if (distance < minDistance) {
          minDistance = distance
          targetElement = element
        }
      })

      if (!targetElement) return

      const headingSlug =
        targetElement.id || targetElement.getAttribute('data-id')
      if (!headingSlug) return

      // 更新大纲高亮
      if (headingSlug !== this.activeHeadingId) {
        this.activeHeadingId = headingSlug
        this.$nextTick(() => {
          const { tocTree } = this.$refs
          if (tocTree) {
            // 找到目标节点
            const findNodeInToc = nodes => {
              for (const node of nodes) {
                if (node.slug === headingSlug) {
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
              try {
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

                // 设置当前节点并同步滚动位置
                tocTree.setCurrentKey(headingSlug)
                const nodeEl = tocTree.$el.querySelector(
                  `[data-key="${headingSlug}"]`
                )
                if (nodeEl) {
                  // 同步大纲滚动位置
                  this.syncTocScrollPosition(
                    this.lastMousePosition.y,
                    tocTree,
                    nodeEl
                  )
                }
              } catch (error) {
                console.error('Error setting current node:', error)
              }
            }
          }
        })
      }
    },

    startIdleDetection () {
      // 初始启动闲置检测
      this.mouseIdleTimer = setTimeout(() => {
        this.handleMouseIdle()
      }, 500)
    }
  },

  beforeDestroy () {
    // 清理事件监听
    if (this.editorElement) {
      this.editorElement.removeEventListener('scroll', this.handleScroll)
      this.editorElement.removeEventListener('wheel', this.handleScroll)
      this.editorElement.removeEventListener('click', this.handleEditorClick)
      this.editorElement.removeEventListener('mousemove', this.resetIdleTimer)
    }
    document.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.handleScroll)
    if (this.mouseIdleTimer) {
      clearTimeout(this.mouseIdleTimer)
    }
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
  height: 100%; /* 确保容器占满高度 */
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  background-color: var(--theme-color);
  overflow-y: auto; /* 添加垂直滚动条 */
}

/* 自定义滚动条样式 */
.side-bar-toc::-webkit-scrollbar {
  width: 6px; /* 滚动条宽度 */
}

.side-bar-toc::-webkit-scrollbar-track {
  background: #f1f1f1; /* 滚动条轨道颜色 */
}

.side-bar-toc::-webkit-scrollbar-thumb {
  background: #888; /* 滚动条滑块颜色 */
  border-radius: 3px; /* 滑块圆角 */
}

.side-bar-toc::-webkit-scrollbar-thumb:hover {
  background: #555; /* 滚动条滑块悬停颜色 */
}

/* 确保 el-tree 组件也能正确滚动 */
.el-tree {
  height: 100%;
  overflow-y: auto;
  background-color: var(--theme-color);
  color: var(--theme-color);
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

.el-tree-node.is-current > .el-tree-node__content {
  background-color: #eb8908; /* 跳转的时候的颜色 */
  color: #0829e4; /* 跳转文字颜色 */
  font-size: 20px;
}

.el-tree-node.is-current > .el-tree-node__content:hover {
  background-color: #ebe708; /* 点击的时候的颜色 */
  color: #0829e4; /* 点击文字颜色 */
  font-size: 20px;
}
</style>
