<template>
  <el-tabs v-model="activeName">
    <el-tab-pane name="1" label="节点">
      <!-- <el-row align="middle">
        <el-col :span="8">id</el-col>
        <el-col :span="14">
          <span>{{ id.value }}</span>
        </el-col>
      </el-row> -->
      <el-row align="middle">
        <el-col :span="8">Border Color</el-col>
        <el-col :span="14">
          <el-color-picker v-model="globalGridAttr.nodeStroke" @change="onStrokeChange" />
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">Border Width</el-col>
        <el-col :span="12">
          <el-slider v-model="globalGridAttr.nodeStrokeWidth" :min="1" :max="5" :step="1" @change="onStrokeWidthChange" />
        </el-col>
        <el-col :span="2">
          <div class="result">{{ globalGridAttr.nodeStrokeWidth }}</div>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">Fill</el-col>
        <el-col :span="14">
          <el-color-picker v-model="globalGridAttr.nodeFill" @change="onFillChange" />
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane name="2" label="文本">
      <el-row align="middle">
        <el-col :span="8">Font Size</el-col>
        <el-col :span="12">
          <el-slider v-model="globalGridAttr.nodeFontSize" :min="8" :max="16" :step="1" @change="onFontSizeChange" />
        </el-col>
        <el-col :span="2">
          <div class="result">{{ globalGridAttr.nodeFontSize }}</div>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">Font Color</el-col>
        <el-col :span="14">
          <el-color-picker v-model="globalGridAttr.nodeColor" @change="onColorChange" />
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane name="3" label="属性">
      <el-row align="middle">
        <el-col :span="8">Assign Users</el-col>
        <el-col :span="14">
          <el-input v-model="globalGridAttr.nodeUsers" style="width: 100%" @change="onUsersChange" />
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { nodeOpt } from './method'
export default {
  name: 'ConfigNode',
  inject: [
    'globalGridAttr',
    'id'
  ],
  data() {
    return {
      activeName: '1',
      curCel: ''
    }
  },
  watch: {
    id: {
      handler(val, oldVal) {
        this.curCel = nodeOpt(val.value, this.globalGridAttr)
      },
      deep: true,
      immediate: false
    }
  },
  mounted() {
  },
  methods: {
    onStrokeChange(val) {
      this.globalGridAttr.nodeStroke = val
      this.curCel?.attr('body/stroke', val)
    },
    onStrokeWidthChange(val) {
      this.globalGridAttr.nodeStrokeWidth = val
      this.curCel?.attr('body/strokeWidth', val)
    },
    onFillChange(val) {
      this.globalGridAttr.nodeFill = val
      this.curCel?.attr('body/fill', val)
    },
    onFontSizeChange(val) {
      this.globalGridAttr.nodeFontSize = val
      this.curCel?.attr('text/fontSize', val)
    },
    onColorChange(val) {
      this.globalGridAttr.nodeColor = val
      this.curCel?.attr('text/fill', val)
    },
    onUsersChange(val) {
      this.globalGridAttr.nodeUsers = val
      this.curCel?.attr('approve/users', val)
    }
  }

}
</script>

<style lang="scss" scoped></style>
