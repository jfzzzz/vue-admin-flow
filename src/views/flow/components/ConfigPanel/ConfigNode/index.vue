<template>
  <el-form :model="form" label-width="80px">
    <el-tabs v-model="activeName">
      <el-tab-pane name="1" label="节点">
        <el-form-item label="边框颜色">
          <el-color-picker v-model="globalGridAttr.nodeStroke" size="medium" @change="onStrokeChange" />
        </el-form-item>
        <el-form-item label="边框宽度">
          <el-slider v-model="globalGridAttr.nodeStrokeWidth" style="width: 90%;" :min="1" :max="5" :step="1" @change="onStrokeWidthChange" />
        </el-form-item>
        <el-form-item label="填充颜色">
          <el-color-picker v-model="globalGridAttr.nodeFill" size="medium" @change="onFillChange" />
        </el-form-item>
        <el-form-item v-if="globalGridAttr.title" style="width: 90%;" label="title">
          <el-input v-model="globalGridAttr.title" @change="onTitleChange" />
        </el-form-item>
        <el-form-item v-if="globalGridAttr.text" style="width: 90%;" label="text">
          <el-input v-model="globalGridAttr.text" @change="onTextChange" />
        </el-form-item>
        <el-form-item v-if="globalGridAttr.text2" style="width: 90%;" label="text2">
          <el-input v-model="globalGridAttr.text2" @change="onText2Change" />
        </el-form-item>
        <el-form-item v-if="globalGridAttr.text3" style="width: 90%;" label="text3">
          <el-input v-model="globalGridAttr.text3" @change="onText3Change" />
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane name="2" label="文本">
        <el-form-item label="文本大小">
          <el-slider v-model="globalGridAttr.nodeFontSize" style="width: 90%;" :min="8" :max="16" :step="1" @change="onFontSizeChange" />
        </el-form-item>
        <el-form-item label="文本颜色">
          <el-color-picker v-model="globalGridAttr.nodeColor" size="medium" @change="onColorChange" />
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane name="3" label="属性">
        <el-form-item label="用户">
          <el-input v-model="globalGridAttr.nodeUsers" style="width: 90%;" @change="onUsersChange" />
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </el-form>
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
      form: {},
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
    },
    onTitleChange(val) {
      // this.globalGridAttr.title = val
      this.curCel?.attr('title/text', this.globalGridAttr.title)
    },
    onTextChange(val) {
      // this.globalGridAttr.title = val
      this.curCel?.attr('text/text', this.globalGridAttr.text)
    },
    onText2Change(val) {
      // this.globalGridAttr.title = val
      this.curCel?.attr('text2/text', this.globalGridAttr.text2)
    },
    onText3Change(val) {
      // this.globalGridAttr.title = val
      this.curCel?.attr('text3/text', this.globalGridAttr.text3)
    }
  }

}
</script>

<style lang="scss" scoped></style>
