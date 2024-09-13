<template>
  <el-tabs v-model="activeName">
    <el-tab-pane name="1" label="网格">
      <el-row align="middle">
        <el-col :span="10">Grid Type</el-col>
        <el-col :span="12">
          <el-select
            v-model="globalGridAttr.type"
            style="width: 100%"
            @change="
              (val) => {
                globalGridAttr.type = val;
              }
            "
          >
            <el-option :value="GRID_TYPE.DOT">Dot</el-option>
            <el-option :value="GRID_TYPE.FIXED_DOT">Fixed Dot</el-option>
            <el-option :value="GRID_TYPE.MESH">Mesh</el-option>
            <el-option :value="GRID_TYPE.DOUBLE_MESH">Double Mesh</el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="10">Grid Size</el-col>
        <el-col :span="10">
          <el-slider
            v-model="globalGridAttr.size"
            :min="1"
            :max="20"
            :step="1"
            @change="
              (val) => {
                globalGridAttr.size = val;
              }
            "
          />
        </el-col>
        <el-col :span="2">
          <div class="result">{{ globalGridAttr.size }}</div>
        </el-col>
      </el-row>
      <div v-if="globalGridAttr.type === 'doubleMesh'">
        <el-row align="middle">
          <el-col :span="10">Primary Color</el-col>
          <el-col :span="12">
            <el-color-picker
              v-model="globalGridAttr.color"
              @change="
                (val) => {
                  globalGridAttr.color = val;
                }
              "
            />
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="10">Primary Thickness</el-col>
          <el-col :span="10">
            <el-slider
              v-model="globalGridAttr.thickness"
              :min="0.5"
              :max="10"
              :step="0.5"
              @change="
                (val) => {
                  globalGridAttr.thickness = val;
                }
              "
            />
          </el-col>
          <el-col :span="2">
            <div class="result">{{ globalGridAttr.thickness.toFixed(1) }}</div>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="10">Secondary Color</el-col>
          <el-col :span="12">
            <el-color-picker
              v-model="globalGridAttr.colorSecond"
              @change="
                (val) => {
                  globalGridAttr.colorSecond = val;
                }
              "
            />
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="10">Secondary Thickness</el-col>
          <el-col :span="10">
            <el-slider
              v-model="globalGridAttr.thicknessSecond"
              :min="0.5"
              :max="10"
              :step="0.5"
              @change="
                (val) => {
                  globalGridAttr.thicknessSecond = val;
                }
              "
            />
          </el-col>
          <el-col :span="2">
            <div class="result">{{ globalGridAttr.thicknessSecond.toFixed(1) }}</div>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="10">Scale Factor</el-col>
          <el-col :span="10">
            <el-slider
              v-model="globalGridAttr.factor"
              :min="1"
              :max="10"
              :step="1"
              @change="
                (val) => {
                  globalGridAttr.factor = val;
                }
              "
            />
          </el-col>
          <el-col :span="2">
            <div class="result">{{ globalGridAttr.factor }}</div>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row align="middle">
          <el-col :span="10">Grid Color</el-col>
          <el-col :span="12">
            <el-color-picker
              v-model="globalGridAttr.color"
              @change="
                (val) => {
                  globalGridAttr.color = val;
                }
              "
            />
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="10">Thickness</el-col>
          <el-col :span="10">
            <el-slider
              v-model="globalGridAttr.thickness"
              :min="0.5"
              :max="10"
              :step="0.5"
              @change="
                (val) => {
                  globalGridAttr.thickness = val;
                }
              "
            />
          </el-col>
          <el-col :span="1">
            <div class="result">{{ globalGridAttr.thickness.toFixed(1) }}</div>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>

    <el-tab-pane name="2" label="背景">
      <el-row align="middle">
        <el-col :span="6">Color</el-col>
        <el-col :span="14">
          <el-color-picker
            v-model="globalGridAttr.bgColor"
            @change="
              (val) => {
                globalGridAttr.bgColor = val;
              }
            "
          />
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="14" :offset="6">
          <el-checkbox
            v-model="globalGridAttr.showImage"
            @change="
              (e) => {
                globalGridAttr.showImage = e;
              }
            "
          >
            Show Image
          </el-checkbox>
        </el-col>
      </el-row>
      <div v-if="globalGridAttr.showImage">
        <el-row align="middle">
          <el-col :span="6">Repeat</el-col>
          <el-col :span="14">
            <el-select
              v-model="globalGridAttr.repeat"
              style="width: 100%"
              @change="
                (val) => {
                  globalGridAttr.repeat = val;
                }
              "
            >
              <el-option :value="REPEAT_TYPE.NO_REPEAT">No Repeat</el-option>
              <el-option :value="REPEAT_TYPE.REPEAT">Repeat</el-option>
              <el-option :value="REPEAT_TYPE.REPEAT_X">Repeat X</el-option>
              <el-option :value="REPEAT_TYPE.REPEAT_Y">Repeat Y</el-option>
              <el-option :value="REPEAT_TYPE.ROUND">Round</el-option>
              <el-option :value="REPEAT_TYPE.SPACE">Space</el-option>
              <el-option :value="REPEAT_TYPE.FLIPX">Flip X</el-option>
              <el-option :value="REPEAT_TYPE.FLIPY">Flip Y</el-option>
              <el-option :value="REPEAT_TYPE.FLIPXY">Flip XY</el-option>
              <el-option :value="REPEAT_TYPE.WATERMARK">Watermark</el-option>
            </el-select>
          </el-col>
        </el-row>
        <div v-if="globalGridAttr.repeat === 'watermark'">
          <el-row align="middle">
            <el-col :span="16" :offset="6" style="font-size: 12px"> Watermark Angle </el-col>
            <el-col :span="14" :offset="6">
              <el-slider
                v-model="globalGridAttr.angle"
                :min="0"
                :max="360"
                :step="1"
                @change="
                  (val) => {
                    globalGridAttr.angle = val;
                  }
                "
              />
            </el-col>
            <el-col :span="2">
              <div class="result">{{ globalGridAttr.angle }}</div>
            </el-col>
          </el-row>
        </div>

        <el-row align="middle">
          <el-col :span="6">Position</el-col>
          <el-col :span="14">
            <el-select
              v-model="globalGridAttr.position"
              style="width: 100%"
              @change="
                (val) => {
                  globalGridAttr.position = val;
                }
              "
            >
              <el-option value="center">center</el-option>
              <el-option value="left">left</el-option>
              <el-option value="right">right</el-option>
              <el-option value="top">top</el-option>
              <el-option value="bottom">bottom</el-option>
              <el-option value="50px 50px">50px 50px</el-option>
              <el-option :value="JSON.stringify({ x: 50, y: 50 })"> {`{ x: 50, y: 50 }`} </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="6">Size</el-col>
          <el-col :span="14">
            <el-select
              v-model="globalGridAttr.bgSize"
              style="width: 100%"
              @change="
                (val) => {
                  globalGridAttr.bgSize = val;
                }
              "
            >
              <el-option value="auto auto">auto auto</el-option>
              <el-option value="cover">cover</el-option>
              <el-option value="contain">contain</el-option>
              <el-option value="30px 30px">30px 30px</el-option>
              <el-option value="100% 100%">100% 100%</el-option>
              <el-option :value="JSON.stringify({ width: 150, height: 150 })"> {`{width: 150, height: 150 }`} </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="6">Opacity</el-col>
          <el-col :span="12">
            <el-slider
              v-model="globalGridAttr.opacity"
              :min="0.05"
              :max="1"
              :step="0.05"
              @change="
                (val) => {
                  globalGridAttr.opacity = val;
                }
              "
            />
          </el-col>
          <el-col :span="4">
            <div class="result">{{ globalGridAttr.opacity.toFixed(2) }}</div>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// import FlowGraph from '@/views/graph'

import { gridOpt, backGroundOpt, gridSizeOpt } from './method'

const GRID_TYPE_ENUM = {
  DOT: 'dot',
  FIXED_DOT: 'fixedDot',
  MESH: 'mesh',
  DOUBLE_MESH: 'doubleMesh'
}

const REPEAT_TYPE_ENUM = {
  NO_REPEAT: 'no-repeat',
  REPEAT: 'repeat',
  REPEAT_X: 'repeat-x',
  REPEAT_Y: 'repeat-y',
  ROUND: 'round',
  SPACE: 'space',
  FLIPX: 'flipX',
  FLIPY: 'flipY',
  FLIPXY: 'flipXY',
  WATERMARK: 'watermark'
}

export default {
  name: 'ConfigGrid',
  components: {},
  inject: ['globalGridAttr'],
  data() {
    return {
      GRID_TYPE: GRID_TYPE_ENUM,
      REPEAT_TYPE: REPEAT_TYPE_ENUM,
      activeName: '1'
    }
  },
  watch: {
    globalGridAttr: {
      handler: function(val, oldVal) { /* ... */
        gridOpt(this.globalGridAttr)
        gridSizeOpt(this.globalGridAttr)
        backGroundOpt(this.globalGridAttr)
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    gridOpt(this.globalGridAttr)
    gridSizeOpt(this.globalGridAttr)
    backGroundOpt(this.globalGridAttr)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped></style>
