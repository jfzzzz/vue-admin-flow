<template>
  <div class="container_warp">
    <div id="containerChart" />
    <RightDrawer
      class="right_drawer"
      :drawer-type="type"
      :select-cell="selectCell"
      :graph="graph"
      :grid="grid"
      @deleteNode="deleteNode"
    />
    <div class="operating">
      <div id="dndContainerRef" ref="dndContainerRef" class="btn-group">
        <h5 class="title">节点选择</h5>
        <div class="btn" title="圆形节点" @mousedown="startDrag('Circle', $event)">
          <i class="iconfont icon-circle" />
        </div>
        <div class="btn" title="正方形节点" @mousedown="startDrag('Rect', $event)">
          <i class="iconfont icon-square" />
        </div>
        <div class="btn" title="条件节点">
          <i class="iconfont icon-square rotate-square" @mousedown="startDrag('polygon', $event)" />
        </div>
        <div class="btn" title="卡片节点">
          <svg-icon icon-class="cardNode" @mousedown="startDrag('CardNode', $event)" />
        </div>
      </div>
      <div class="btn-group">

        <h5 class="title">边选择</h5>
        <el-tooltip content="直线箭头" placement="bottom">
          <div :class="['btn', currentArrow === 1 ? 'currentArrow' : '']" @click="changeEdgeType('normal')">
            <i class="iconfont icon-ai28" />
          </div>
        </el-tooltip>
        <el-tooltip content="曲线箭头" placement="bottom">
          <div :class="['btn', currentArrow === 2 ? 'currentArrow' : '']" @click="changeEdgeType('smooth')">
            <i class="iconfont icon-Down-Right" />
          </div>
        </el-tooltip>
        <el-tooltip content="直角箭头" placement="bottom">
          <div :class="['btn', currentArrow === 3 ? 'currentArrow' : '']" @click="changeEdgeType()">
            <i class="iconfont icon-jiantou" />
          </div>
        </el-tooltip>
      </div>
      <!-- <div class="btn-group">
          <div class="btn" @click="changeMode('edit')" title="选择模式">
            <i class="iconfont icon-mousepointershubiao"></i>
          </div>
          <div class="btn" @click="changeMode('drag')" title="拖拽模式">
            <i class="iconfont icon-tuozhuai"></i>
          </div>
        </div> -->
      <div class="btn-group">
        <h5 class="title">操作</h5>
        <el-tooltip content="删除" placement="bottom">
          <div class="btn" style="margin-top: 5px;" @click="deleteNode()">
            <i class="iconfont icon-shanchu" />
          </div>
        </el-tooltip>
        <el-tooltip content="保存PNG" placement="bottom">
          <div class="btn" title="保存" @click="saveToPNG()">
            <i class="iconfont icon-baocun" />
          </div>
        </el-tooltip>
        <el-tooltip content="保存JSON" placement="bottom">
          <div class="btn" title="保存JSON" @click="saveToJSON()">
            <i class="iconfont icon-baocun" />
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>

import '@antv/x6-vue-shape'
import { Graph, Shape, Addon, FunctionExt, DataUri } from '@antv/x6'
import RightDrawer from './components/RightDrawer'
import insertCss from 'insert-css'
import { startDragToGraph } from './Graph/methods.js'

const data = [
  {
    'shape': 'edge',
    'attrs': {
      'line': {
        'stroke': '#1890ff',
        'strokeWidth': 1,
        'targetMarker': {
          'name': 'classic',
          'size': 8
        },
        'strokeDasharray': 0,
        'style': {
          'animation': 'ant-line 30s infinite linear'
        }
      }
    },
    'id': '6b934aa1-154f-4ed2-bc70-9481120fda6c',
    'connector': 'smooth',
    'router': {
      'name': ''
    },
    'zIndex': 0,
    'labels': [
      {
        'text': ''
      }
    ],
    'source': {
      'cell': '74d7ed19-2b77-46cc-9331-1f9dee83b27c',
      'port': 'port1'
    },
    'target': {
      'cell': 'f93dafcc-95eb-4611-9adf-22b9bf17c911',
      'port': 'port1'
    }
  },
  {
    'shape': 'edge',
    'attrs': {
      'line': {
        'stroke': '#1890ff',
        'strokeWidth': 1,
        'targetMarker': {
          'name': 'classic',
          'size': 8
        },
        'strokeDasharray': 0,
        'style': {
          'animation': 'ant-line 30s infinite linear'
        }
      }
    },
    'id': '099419d4-36a9-47d6-87f9-ebd3c6b02bf0',
    'connector': 'smooth',
    'router': {
      'name': ''
    },
    'zIndex': 0,
    'labels': [
      {
        'text': ''
      }
    ],
    'source': {
      'cell': 'f93dafcc-95eb-4611-9adf-22b9bf17c911',
      'port': 'port4'
    },
    'target': {
      'cell': '07e02d7e-3a14-4588-b17d-d8e0516d40a5',
      'port': 'port2'
    }
  },
  {
    'position': {
      'x': 360,
      'y': 240
    },
    'size': {
      'width': 120,
      'height': 120
    },
    'attrs': {
      'label': {
        'text': '条件节点',
        'fill': '#000000',
        'fontSize': 14,
        'textWrap': {
          'width': -50,
          'height': '70%',
          'ellipsis': true
        }
      },
      'body': {
        'fill': '#ffffff',
        'stroke': '#000000',
        'refPoints': '0,10 10,0 20,10 10,20',
        'strokeWidth': 1
      }
    },
    'visible': true,
    'shape': 'polygon',
    'id': '74d7ed19-2b77-46cc-9331-1f9dee83b27c',
    'ports': {
      'groups': {
        'top': {
          'position': 'top',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        },
        'bottom': {
          'position': 'bottom',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        },
        'left': {
          'position': 'left',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        },
        'right': {
          'position': 'right',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        }
      },
      'items': [
        {
          'id': 'port1',
          'group': 'top'
        },
        {
          'id': 'port2',
          'group': 'bottom'
        },
        {
          'id': 'port3',
          'group': 'left'
        },
        {
          'id': 'port4',
          'group': 'right'
        }
      ]
    },
    'zIndex': 1
  },
  {
    'position': {
      'x': 581,
      'y': 270
    },
    'size': {
      'width': 100,
      'height': 60
    },
    'attrs': {
      'body': {
        'stroke': '#000000',
        'strokeWidth': 1,
        'fill': '#ffffff'
      },
      'label': {
        'text': '正方形节点',
        'fill': '#000000',
        'fontSize': 14,
        'textWrap': {
          'width': -10,
          'height': -10,
          'ellipsis': true
        }
      }
    },
    'visible': true,
    'shape': 'rect',
    'id': 'f93dafcc-95eb-4611-9adf-22b9bf17c911',
    'ports': {
      'groups': {
        'top': {
          'position': 'top',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        },
        'bottom': {
          'position': 'bottom',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        },
        'left': {
          'position': 'left',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        },
        'right': {
          'position': 'right',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        }
      },
      'items': [
        {
          'id': 'port1',
          'group': 'top'
        },
        {
          'id': 'port2',
          'group': 'bottom'
        },
        {
          'id': 'port3',
          'group': 'left'
        },
        {
          'id': 'port4',
          'group': 'right'
        }
      ]
    },
    'zIndex': 2
  },
  {
    'position': {
      'x': 830,
      'y': 250
    },
    'size': {
      'width': 100,
      'height': 100
    },
    'attrs': {
      'body': {
        'stroke': '#000000',
        'strokeWidth': 1,
        'fill': '#ffffff'
      },
      'label': {
        'text': '圆形节点',
        'fill': '#000000',
        'fontSize': 14,
        'textWrap': {
          'width': -20,
          'height': -10,
          'ellipsis': true
        }
      }
    },
    'visible': true,
    'shape': 'ellipse',
    'id': '07e02d7e-3a14-4588-b17d-d8e0516d40a5',
    'ports': {
      'groups': {
        'top': {
          'position': 'top',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        },
        'bottom': {
          'position': 'bottom',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        },
        'left': {
          'position': 'left',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        },
        'right': {
          'position': 'right',
          'attrs': {
            'circle': {
              'r': 4,
              'magnet': true,
              'stroke': '#2D8CF0',
              'strokeWidth': 2,
              'fill': '#fff'
            }
          }
        }
      },
      'items': [
        {
          'id': 'port1',
          'group': 'top'
        },
        {
          'id': 'port2',
          'group': 'bottom'
        },
        {
          'id': 'port3',
          'group': 'left'
        },
        {
          'id': 'port4',
          'group': 'right'
        }
      ]
    },
    'zIndex': 3
  }
]
export default {
  name: 'Dashboard',
  components: {
    RightDrawer
  },
  data() {
    return {
      graph: '',
      value1: true,
      type: 'grid',
      selectCell: '',
      connectEdgeType: { // 连线方式
        connector: 'normal',
        router: {
          name: ''
        }
      },
      currentArrow: 1,
      grid: { // 网格设置
        size: 20, // 网格大小 10px
        visible: true, // 渲染网格背景
        type: 'mesh',
        args: {
          color: '#D0D0D0',
          thickness: 1, // 网格线宽度/网格点大小
          factor: 10
        }
      }
    }
  },
  computed: {
  },
  mounted() {
    this.initX6()
  },
  methods: {
    initX6() {
      var _that = this
      this.graph = new Graph({
        container: document.getElementById('containerChart'),
        // width: 1700,
        // height: '100%',
        grid: _that.grid,
        resizing: { // 调整节点宽高
          enabled: true,
          orthogonal: false
        },
        selecting: true, // 可选
        snapline: true,
        interacting: {
          edgeLabelMovable: true
        },
        connecting: { // 节点连接
          anchor: 'center',
          connectionPoint: 'anchor',
          allowBlank: false,
          snap: true,
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#1890ff',
                  strokeWidth: 1,
                  targetMarker: {
                    name: 'classic',
                    size: 8
                  },
                  strokeDasharray: 0, // 虚线
                  style: {
                    animation: 'ant-line 30s infinite linear'
                  }
                }
              },
              label: {
                text: ''
              },
              connector: _that.connectEdgeType.connector,
              router: {
                name: _that.connectEdgeType.router.name || ''
              },
              zIndex: 0
            })
          }
        },
        highlighting: {
          magnetAvailable: {
            name: 'stroke',
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 4,
                stroke: '#6a6c8a'
              }
            }
          }
        }
      })
      insertCss(`
        @keyframes ant-line {
          to {
              stroke-dashoffset: -1000
          }
        }
      `)
      this.graph.fromJSON(data)
      this.graph.history.redo()
      this.graph.history.undo()
      // 鼠标移入移出节点
      this.graph.on('node:mouseenter', FunctionExt.debounce(() => {
        const container = document.getElementById('containerChart')
        const ports = container.querySelectorAll(
          '.x6-port-body'
        )
        this.showPorts(ports, true)
      }), 500)
      this.graph.on('node:mouseleave', () => {
        const container = document.getElementById('containerChart')
        const ports = container.querySelectorAll(
          '.x6-port-body'
        )
        this.showPorts(ports, false)
      })
      this.graph.on('blank:click', () => {
        this.type = 'grid'
      })
      this.graph.on('cell:click', ({ cell }) => {
        this.type = cell.isNode() ? 'node' : 'edge'
      })
      this.graph.on('selection:changed', (args) => {
        args.added.forEach(cell => {
          this.selectCell = cell
          if (cell.isEdge()) {
            cell.isEdge() && cell.attr('line/strokeDasharray', 5) // 虚线蚂蚁线
            cell.addTools([
              {
                name: 'vertices',
                args: {
                  padding: 4,
                  attrs: {
                    strokeWidth: 0.1,
                    stroke: '#2d8cf0',
                    fill: '#ffffff'
                  }
                }
              }
            ])
          }
        })
        args.removed.forEach(cell => {
          cell.isEdge() && cell.attr('line/strokeDasharray', 0) // 正常线
          cell.removeTools()
        })
      })
    },
    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
    // 拖拽生成正方形或者圆形
    startDrag(type, e) {
      startDragToGraph(this.graph, type, e)
    },
    // 删除节点
    deleteNode() {
      const cell = this.graph.getSelectedCells()
      this.graph.removeCells(cell)
      this.type = 'grid'
    },
    // 保存png
    saveToPNG() {
      this.$nextTick(() => {
        this.graph.toPNG((dataUri) => {
          console.log(dataUri)
          // 下载
          DataUri.downloadDataUri(dataUri, '资产拓扑图.png')
        }, {
          backgroundColor: 'white',
          padding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
          },
          quality: 1,
          copyStyles: false
        })
      })
    },
    // 保存JSON
    saveToJSON() {
      this.$nextTick(() => {
        console.log(this.graph.toJSON())
      })
    },
    // 改变边形状
    changeEdgeType(e) {
      if (e === 'normal') {
        this.connectEdgeType = {
          connector: 'normal',
          router: { name: '' }
        }
        this.currentArrow = 1
      } else if (e === 'smooth') {
        this.connectEdgeType = {
          connector: 'smooth',
          router: { name: '' }
        }
        this.currentArrow = 2
      } else {
        this.connectEdgeType = {
          connector: 'normal',
          router: { name: 'manhattan' }
        }
        this.currentArrow = 3
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/iconfont.css';
.container_warp {
  // position: relative;
  width: 100%;
  padding-left: 200px;
  height: 100vh;
  display: flex;

  .operating {
    position: absolute;
    top: 0;
    left: 0;

    width: 200px;
    height: 100%;

    display: flex;
    flex-direction: column;
    z-index: 99;
    background-color: #ffffff;
    padding: 20px 10px;
    box-shadow: 1px 1px 4px 0 #0a0a0a2e;
  }

  #containerChart {
    width: calc(100% - 200px);
    height: 100%;
  }
}

.btn-group {
  // border-right: 1px solid #efefef;
  display: inline-block;
  padding-left: 10px;
  padding-right: 14px;
  position: relative;

  .btn-group_tips {
    text-align: center;
    top: 63px;
    left: 1px;
    position: absolute;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 60px;
    background: #515a6e;
    border-radius: 6px;
    animation: tips 4s;
    transition: all 1s;

    &:after {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      top: -5px;
      left: 46%;
      border-width: 0 5px 5px;
      border-style: solid;
      border-color: transparent transparent #515a6e;
    }
  }

  &:last-of-type {
    border-right: 0;
  }

  .btn {
    display: inline-block;
    margin: 2px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    transition: all .4s;
    border-radius: 6px;
    border: 1px solid rgba(233, 233, 233, 0);

    i {
      font-size: 20px;
    }
  }

  .currentArrow {
    background: #2d8cf0;
    color: #fff;
  }
}

@keyframes tips {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  10% {
    opacity: 1;
    transform: scale(1);
  }

  90% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0);
  }
}

.rotate-square {
  display: inline-block;
  transform: rotate(45deg);
}

.my-snapline {
  color: #000;
}

.right_drawer {
  height: 100%;
  width: 300px;
  border-left: 1px solid #eee;
  background: #fff;
}
</style>
