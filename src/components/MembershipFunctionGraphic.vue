<template>
  <svg :viewBox="`${pos.viewBox.x} ${pos.viewBox.y} ${pos.viewBox.width} ${pos.viewBox.height}`" width="100%" :height="pos.viewBox.height" preserveAspectRatio="xMinYMid meet">
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="5"
              refX="1" refY="2.5" orient="auto">
        <polygon points="0 0, 6 2.5, 0 5"/>
      </marker>
    </defs>
    <!-- Y axis -->
    <line :x1="pos.y.axis.x1" :y1="pos.y.axis.y1" :x2="pos.y.axis.x2" :y2="pos.y.axis.y2" stroke="#000" stroke-width="2" marker-end="url(#arrowhead)"/>
    <g :key="'yMarker'+index" v-for="(marker,index) in pos.y.marker">
      <line :x1="marker.line.x1" :x2="marker.line.x2" :y1="marker.line.y1" :y2="marker.line.y2" stroke="#000" stroke-width="2"/>
      <text :x="marker.label.x" :y="marker.label.y">{{marker.label.text}}</text>
    </g>

    <!-- X axis -->
    <line :x1="pos.x.axis.x1" :y1="pos.x.axis.y1" :x2="pos.x.axis.x2" :y2="pos.x.axis.y2" stroke="#000" stroke-width="2" marker-end="url(#arrowhead)"/>
    <g :key="'xMarker'+index" v-for="(marker,index) in pos.x.marker">
      <line :x1="marker.line.x1" :x2="marker.line.x2" :y1="marker.line.y1" :y2="marker.line.y2" stroke="#000" stroke-width="2"/>
      <text :x="marker.label.x" :y="marker.label.y">{{marker.label.text}}</text>
    </g>

    <!-- polygons -->
    <g :style="`transform: translate(${pos.padding}px, ${pos.padding}px)`">
      <g :key="`membershipFunction${index}`" v-for="(membershipFunction,index) in membershipFunctions">
        <polygon :points="membershipFunction.polygon" :fill="colors[index]" :stroke="colors[index]" stroke-width="2" style="fill-opacity: 0.2" />
      </g>
    </g>
  </svg>
</template>

<script>

import {reactive} from "vue";
import {makeColorGradient1} from "@/mixins/colorgenerator";
import {getFuzzyObject} from "@/mixins/fuzzyhelper";

export default {
  name: "MembershipFunctionGraphic",
  props:['modelValue'],
  emits:['update:modelValue','save'],
  setup(props, {emit}) {
    // grid configuration
    const gridWidth = 800
    const gridHeight = gridWidth / 4
    const padding = 20
    const offset = 8

    const value=structuredClone(props.modelValue)
    const singleValue = !Array.isArray(value)

    const makeArrayForFunction = function (type, arrString) {
      if (typeof(arrString)=="undefined" || !arrString.includes(','))
        return ""
      const arr=arrString.split(',')
      if (!Array.isArray(arr))
        return ""

      let typeObject = getFuzzyObject(type,arr)

      return [...Array(101).keys()].map(function (elm) {
        return {
          x: elm,
          y: typeObject.fuzzify(elm)
        }
      })
    }

    const polygonize=function(arr){
      if (!Array.isArray(arr)) {
        return false
      }
      let result =`0,${gridHeight}`
      arr.forEach(function(elm){
        result=`${result} ${(elm.x/100)*gridWidth},${gridHeight-(elm.y*gridHeight)}`
      })
      result=`${result} ${gridWidth},${gridHeight}`
      return result
    }

    let arrValue = singleValue?[value]:value
    const membershipFunctions = reactive(arrValue.map(function(elm){
        return {
          name:elm.name,
          type:elm.type,
          values:elm.values,
          polygon:polygonize(makeArrayForFunction(elm.type, elm.values))
        }
      }))
    const save= function() {
      emit('update:modelValue',singleValue?membershipFunctions[0]:membershipFunctions)
      emit('save',singleValue?membershipFunctions[0]:membershipFunctions)
    }

    const pos = reactive({
      padding:padding,
      viewBox: {
        x: 0,
        y: 0,
        width: 2 * padding + gridWidth,
        height: 2 * padding + gridHeight
      },
      y: {
        axis: {
          x1: padding,
          x2: padding,
          y1: padding + gridHeight,
          y2: padding - offset
        },
        marker: [
          {
            line: {x1: padding, x2: padding - offset, y1: padding + gridHeight, y2: padding + gridHeight},
            label: {x: 1, y: padding + gridHeight + 4, text: "0"}
          },
          {
            line: {x1: padding, x2: padding - offset, y1: padding, y2: padding},
            label: {x: 1, y: padding + 4, text: "1"}
          },
        ]
      },
      x: {
        axis: {
          x1: padding,
          x2: padding + gridWidth + offset,
          y1: padding + gridHeight,
          y2: padding + gridHeight
        },
        marker: [
          {
            line: {x1: padding, x2: padding, y1: padding + gridHeight, y2: padding + gridHeight + offset},
            label: {x: padding - 4, y: 2 * padding + gridHeight, text: "0"}
          },
          {
            line: {x1: padding + gridWidth, x2: padding + gridWidth, y1: padding + gridHeight, y2: padding + gridHeight + offset},
            label: {x: padding + gridWidth - 12, y: 2 * padding + gridHeight, text: "100"}
          },
        ]
      }
    })
  let colors= makeColorGradient1()
    return {pos,membershipFunctions,save,colors}
  }
}
</script>

<style scoped>

</style>