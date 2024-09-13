<template>
  <div class="config">
    <config-grid v-show="type === 'grid'" />
    <config-node v-show="type === 'node'" />
    <config-edge v-show="type === 'edge'" />
  </div>
</template>

<script>
import ConfigGrid from './ConfigGrid/index.vue'
import ConfigNode from './ConfigNode/index.vue'
import ConfigEdge from './ConfigEdge/index.vue'
import FlowGraph from '../../graph/index'
import './index.scss'
import { globalGridAttr } from '../../models/global'
export default {
  name: 'ConfigPanel',
  components: {
    ConfigGrid,
    ConfigNode,
    ConfigEdge
  },
  data() {
    return {
      type: 'grid',
      id: {
        value: ''
      }
    }
  },
  provide() {
    return {
      id: this.id,
      globalGridAttr
    }
  },
  mounted() {
    this.boundEvent()
  },
  methods: {
    boundEvent() {
      const { graph } = FlowGraph
      graph.on('blank:click', () => {
        this.type = 'grid'
      })
      graph.on('cell:click', ({ cell }) => {
        this.type = cell.isNode() ? 'node' : 'edge'
        this.id.value = cell.id
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
