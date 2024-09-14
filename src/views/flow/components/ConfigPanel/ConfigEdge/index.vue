<template>
  <el-form :model="form" label-width="80px">
    <el-tabs v-model="activeName">
      <el-tab-pane name="1" label="线条">
        <el-form-item label="宽度">
          <el-slider v-model="globalGridAttr.strokeWidth" style="width: 90%;" :min="1" :max="5" :step="1" @change="onStrokeWidthChange" />
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker
            v-model="globalGridAttr.stroke"
            @change="onStrokeChange"
          />
        </el-form-item>
        <el-form-item label="连线类型">
          <el-select v-model="globalGridAttr.connector" style="width: 90%" @change="onConnectorChange">
            <el-option value="normal">Normal</el-option>
            <el-option value="smooth">Smooth</el-option>
            <el-option value="rounded">Rounded</el-option>
            <el-option value="jumpover">Jumpover</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Label">
          <el-input v-model="globalGridAttr.label" style="width: 90%" @change="onLabelChange" />
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </el-form>
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
      form: {},
      curCell: '',
      activeName: '1'
    }
  },
  watch: {
    id: {
      handler: function(val, oldVal) {
        const { graph } = FlowGraph
        const cell = graph.getCellById(val.value)
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
        this.globalGridAttr.label = (cell.getLabels()[0]?.attrs)?.text?.text || ''
      },
      deep: true,
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
    onStrokeChange(val) {
      this.globalGridAttr.stroke = val
      this.curCell?.attr('line/stroke', val)
    },
    onConnectorChange(val) {
      this.globalGridAttr.connector = val
      this.curCell?.setConnector(val)
    },
    onLabelChange(val) {
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
