<template>
  <div class="bar">
    <el-tooltip content="清除 (Cmd + D)" placement="bottom">
      <el-button name="delete" class="item-space" size="small" @click="handleClick"> delete </el-button>
    </el-tooltip>

    <el-tooltip content="撤销 (Cmd + Z)" placement="bottom">
      <el-button :disabled="!canUndo" name="undo" class="item-space" size="small" @click="handleClick"> undo
      </el-button>
    </el-tooltip>

    <el-tooltip content="Redo (Cmd + Shift + Z)" placement="bottom">
      <el-button :disabled="!canRedo" name="redo" class="item-space" size="small" @click="handleClick"> redo
      </el-button>
    </el-tooltip>

    <el-tooltip content="复制 (Cmd + Shift + Z)" placement="bottom">
      <el-button name="copy" class="item-space" size="small" @click="handleClick"> copy </el-button>
    </el-tooltip>

    <el-tooltip content="剪切 (Cmd + X)" placement="bottom">
      <el-button name="cut" class="item-space" size="small" @click="handleClick"> cut </el-button>
    </el-tooltip>

    <el-tooltip content="粘贴 (Cmd + V)" placement="bottom">
      <el-button name="paste" class="item-space" size="small" @click="handleClick"> paste </el-button>
    </el-tooltip>

    <el-tooltip content="保存PNG (Cmd + S)" placement="bottom">
      <el-button name="savePNG" class="item-space" size="small" @click="handleClick"> savePNG </el-button>
    </el-tooltip>

    <el-tooltip content="保存SVG (Cmd + S)" placement="bottom">
      <el-button name="saveSVG" class="item-space" size="small" @click="handleClick"> saveSVG </el-button>
    </el-tooltip>

    <el-tooltip content="打印 (Cmd + P)" placement="bottom">
      <el-button name="print" class="item-space" size="small" @click="handleClick"> print </el-button>
    </el-tooltip>

    <el-tooltip content="导出 (Cmd + P)" placement="bottom">
      <el-button name="toJSON" class="item-space" size="small" @click="handleClick"> toJSON </el-button>
    </el-tooltip>
  </div>
</template>

<script>
import FlowGraph from '../../graph'
import { DataUri } from '@antv/x6'

const { graph } = FlowGraph
export default {
  name: 'ToolBar',
  components: {},
  data() {
    return {
      canUndo: graph?.history.canUndo(),
      canRedo: graph?.history.canRedo()
    }
  },
  mounted() {
    this.$nextTick(() => {
      graph?.history.on('change', () => {
        this.canUndo = graph?.history.canUndo()
        this.canRedo = graph?.history.canRedo()
      })
      graph?.bindKey('ctrl+z', () => {
        if (graph?.history.canUndo()) {
          graph?.history.undo()
        }
        return false
      })
      graph?.bindKey('ctrl+shift+z', () => {
        if (graph?.history.canRedo()) {
          graph?.history.redo()
        }
        return false
      })
      graph?.bindKey('ctrl+d', () => {
        graph.clearCells()
        return false
      })
      graph?.bindKey('ctrl+s', () => {
        graph.toPNG((datauri) => {
          DataUri.downloadDataUri(datauri, 'chart.png')
        })
        return false
      })
      graph?.bindKey('ctrl+p', () => {
        graph.printPreview()
        return false
      })
      graph?.bindKey('ctrl+c', this.copy)
      graph?.bindKey('ctrl+v', this.paste)
      graph?.bindKey('ctrl+x', this.cut)
    })
  },
  methods: {
    copy() {
      const { graph } = FlowGraph
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    },
    cut() {
      const { graph } = FlowGraph
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells)
      }
      return false
    },
    paste() {
      const { graph } = FlowGraph
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    },
    handleClick(event) {
      const { graph } = FlowGraph
      const name = event.currentTarget.name
      switch (name) {
        case 'undo':
          graph.history.undo()
          break
        case 'redo':
          graph.history.redo()
          break
        case 'delete':
          graph.clearCells()
          break
        case 'savePNG':
          graph.toPNG(
            (dataUri) => {
              // 下载
              DataUri.downloadDataUri(dataUri, 'chartx.png')
            },
            {
              backgroundColor: 'white',
              padding: {
                top: 20,
                right: 30,
                bottom: 40,
                left: 50
              },
              quality: 1
            }
          )
          break
        case 'saveSVG':
          graph.toSVG((dataUri) => {
            // 下载
            DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'chart.svg')
          })
          break
        case 'print':
          graph.printPreview()
          break
        case 'copy':
          this.copy()
          break
        case 'cut':
          this.cut()
          break
        case 'paste':
          this.paste()
          break
        case 'toJSON':
          console.log(graph.toJSON())
          // graph.fromJSON({cells:[graph.toJSON().cells[0],graph.toJSON().cells[1]]})
          break
        default:
          break
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.bar {
  margin-right: 16px;
}

.item-space {
  margin-left: 16px;
}
</style>
