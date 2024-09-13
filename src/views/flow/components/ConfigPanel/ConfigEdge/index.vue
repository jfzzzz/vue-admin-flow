<template>
  <el-tabs default-active-key="1">
    <el-tab-pane key="1" tab="线条">
      <el-row align="middle">
        <el-col :span="8">Width</el-col>
        <el-col :span="12">
          <el-slider :min="1" :max="5" :step="1" :value="globalGridAttr.strokeWidth" @change="onStrokeWidthChange" />
        </el-col>
        <el-col :span="2">
          <div class="result">{{ globalGridAttr.strokeWidth }}</div>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">Color</el-col>
        <el-col :span="14">
          <el-input type="color" :value="globalGridAttr.stroke" style="width: 100%" @change="onStrokeChange" />
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">Connector</el-col>
        <el-col :span="14">
          <el-select style="width: 100%" :value="globalGridAttr.connector" @change="onConnectorChange">
            <el-option value="normal">Normal</el-option>
            <el-option value="smooth">Smooth</el-option>
            <el-option value="rounded">Rounded</el-option>
            <el-option value="jumpover">Jumpover</el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">Label</el-col>
        <el-col :span="14">
          <el-input :value="globalGridAttr.label" style="width: 100%" @change="onLabelChange" />
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import FlowGraph from '../../../graph/index'
export default {
  name: 'ConfigEdge',
  inject: [
    'globalGridAttr',
    'id'
  ],
  components: {},
  data() {
    return {
      curCell: ''
    }
  },
  watch: {
    id: {
      handler(val, oldVal) {
        const { graph } = FlowGraph
        const cell = graph.getCellById(this.id)
        if (!cell || !cell.isEdge()) {
          return
        }
        this.curCell = cell
        const connector = cell.getConnector() || {
          name: 'normal'
        }
        this.globalGridAttr.stroke = cell.attr('line/stroke')
        this.globalGridAttr.strokeWidth = cell.attr('line/strokeWidth')
        this.globalGridAttr.connector = connector.name
        this.globalGridAttr.label = (cell.getLabels()[0]?.attrs).text.text || ''
      },
      deep: false,
      immediate: false
    }
  },
  mounted() {
  },
  methods: {
    onStrokeWidthChange(val) {
      this.globalGridAttr.strokeWidth = val
      this.curCell?.attr('line/strokeWidth', val)
    },
    onStrokeChange(e) {
      const val = e.target.value
      this.globalGridAttr.stroke = val
      this.curCell?.attr('line/stroke', val)
    },
    onConnectorChange(val) {
      this.globalGridAttr.connector = val
      this.curCell?.setConnector(val)
    },
    onLabelChange(e) {
      const val = e.target.value
      this.globalGridAttr.label = val
      this.curCell.setLabels([
        {
          attrs: {
            text: {
              text: val
            }
          },
          position: {
            distance: 0.5
          }
        }
      ])
    }
  }
}
</script>

<style lang="scss" scoped></style>
