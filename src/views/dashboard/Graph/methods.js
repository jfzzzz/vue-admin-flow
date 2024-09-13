import '@antv/x6-vue-shape'
import { Graph, Shape, Addon, FunctionExt, Dom } from '@antv/x6'
// 拖拽生成四边形或者圆形
Graph.registerPortLayout(
  'erPortPosition',
  (portsPositionArgs) => {
    return portsPositionArgs.map((_, index) => {
      return {
        position: {
          x: 0,
          y: (index + 1) * 24
        },
        angle: 0
      }
    })
  },
  true
)
Graph.registerNode(
  'CardNode',
  {
    inherit: 'rect',
    markup: [
      {
        tagName: 'rect',
        selector: 'body'
      },
      // {
      //   tagName: 'text',
      //   selector: 'label'
      // },
      {
        tagName: 'text',
        selector: 'subLabel'
      },
      {
        tagName: 'text',
        selector: 'subLabel2'
      },
      {
        tagName: 'text',
        selector: 'subLabel3'
      }
    ],
    attrs: {
      // body: {
      //   refWidth: '100%',
      //   refHeight: '100%',
      //   fill: '#5F95FF',
      //   stroke: '#5F95FF',
      //   strokeWidth: 1,
      //   rx: 10,
      //   ry: 10,
      //   pointerEvents: 'visiblePainted',
      // },
      rect: {
        width: 120,
        height: 24,
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#5F95FF'
      },
      label: {
        fontWeight: 'bold',
        fill: '#ffffff',
        fontSize: 12
      },
      subLabel: {
        ref: 'rect',
        refX: 6,
        refY: 12,
        fontSize: 10
      },
      subLabel2: {
        ref: 'rect',
        refX: 6,
        refY: 18,
        fontSize: 10
      },
      subLabel3: {
        ref: 'rect',
        refX: 6,
        refY: 24,
        fontSize: 10
      }
    }
    // ports: ports
  },
  true
)
export const startDragToGraph = (graph, type, e) => {
  const node =
    type === 'Rect'
      ? graph.createNode({
        width: 100,
        height: 60,
        attrs: {
          label: {
            text: '正方形节点',
            fill: '#000000',
            fontSize: 14,
            textWrap: {
              width: -10,
              height: -10,
              ellipsis: true
            }
          },
          body: {
            stroke: '#000000',
            strokeWidth: 1,
            fill: '#ffffff'
          },
          subLabel: {
            text: 'ID'
          }
        },
        ports: ports
      })
      : type === 'Circle' ? graph.createNode({
        shape: 'ellipse',
        width: 100,
        height: 100,
        attrs: {
          label: {
            text: '圆形节点',
            fill: '#000000',
            fontSize: 14,
            textWrap: {
              width: -20,
              height: -10,
              ellipsis: true
            }
          },
          body: {
            stroke: '#000000',
            strokeWidth: 1,
            fill: '#ffffff'
          }
        },
        ports: ports
      })
        : type === 'CardNode' ? graph.createNode({
          shape: 'CardNode',
          width: 150,
          height: 200,
          attrs: {
            label: {
              text: '卡片节点',
              fill: '#000000',
              fontSize: 14,
              textWrap: {
                width: -20,
                height: -10,
                ellipsis: true
              }
            },
            body: {
              stroke: '#000000',
              strokeWidth: 1,
              fill: '#ffffff'
            },
            subLabel: {
              text: '卡片节点'
            },
            subLabel2: {
              text: '卡片节点2'
            },
            subLabel3: {
              text: '卡片节点3'
            }
          },
          ports: ports
        })
          : graph.createNode({
            shape: 'polygon',
            x: 40,
            y: 40,
            width: 120,
            height: 120,
            attrs: {
              label: {
                text: '条件节点',
                fill: '#000000',
                fontSize: 14,
                textWrap: {
                  width: -50,
                  height: '70%',
                  ellipsis: true
                }
              },
              body: {
                fill: '#ffffff',
                stroke: '#000000',
                refPoints: '0,10 10,0 20,10 10,20',
                strokeWidth: 1
              }
            },
            ports: ports
          })
  const dnd = new Addon.Dnd({
    target: graph,
    dndContainer: document.getElementById('dndContainerRef'),
    validateNode(droppingNode, options) {
      return droppingNode.shape === 'html'
        ? new Promise<boolean>((resolve) => {
          const { draggingNode, draggingGraph } = options
          const view = draggingGraph.findView(draggingNode)
          if (view) {
            const contentElem = view.findOne('foreignObject > body > div')
            Dom.addClass(contentElem, 'validating')
            setTimeout(() => {
              Dom.removeClass(contentElem, 'validating')
              resolve(true)
            }, 3000)
          }
        })
        : true
    }
  })
  dnd.start(node, e)
}
const ports = {
  groups: {
    // 输入链接桩群组定义
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff'
        }
      }
    },
    // 输出链接桩群组定义
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff'
        }
      }
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff'
        }
      }
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff'
        }
      }
    }
  },
  items: [
    {
      id: 'port1',
      group: 'top'
    },
    {
      id: 'port2',
      group: 'bottom'
    },
    {
      id: 'port3',
      group: 'left'
    },
    {
      id: 'port4',
      group: 'right'
    }
  ]
}
