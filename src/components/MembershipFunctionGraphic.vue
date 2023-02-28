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
        <polygon :points="membershipFunction.polygon" fill="none" stroke="#ccc" stroke-width="2" />
      </g>
    </g>
  </svg>
</template>

<script>

import {reactive} from "vue";
import Grade from "es6-fuzz/lib/curve/grade";
import ReverseGrade from "es6-fuzz/lib/curve/reverse-grade";
import Constant from "es6-fuzz/lib/curve/constant";
import Trapezoid from "es6-fuzz/lib/curve/trapezoid";
import Triangle from "es6-fuzz/lib/curve/triangle";
import Sigmoid from "es6-fuzz/lib/curve/sigmoid";

export default {
  name: "MembershipFunctionGraphic",
  props:['modelValue'],
  emits:['update:modelValue'],
  setup(props, {emit}) {
    // grid configuration
    const gridWidth = 800
    const gridHeight = gridWidth / 4
    const padding = 20
    const offset = 8

    const value=structuredClone(props.modelValue)
    const singleValue = !Array.isArray(value)
    const save=emit('update:modelValue',singleValue?value[0]:value)

    const makeArrayForFunction = function (type, arrString) {
      const arr=arrString.split(',')
      if (!Array.isArray(arr)) {
        return ""
      }

      let typeObject
      switch (type) {
        case 'constant':
          typeObject = new Constant(parseInt([0]))
          break
        case 'grade':
          typeObject = new Grade(parseInt(arr[0]), parseInt(arr[1]))
          break
        case 'reverse':
          typeObject = new ReverseGrade(parseInt(arr[0]), parseInt(arr[1]))
          break
        case 'trapezoid':
          typeObject = new Trapezoid(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]))
          break
        case 'triangle':
          typeObject = new Triangle(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]))
          break
        case 'sigmoid':
          typeObject = new Sigmoid(parseInt(arr[0]), parseInt(arr[1]))
          break
      }

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

    let _value = singleValue?[value]:value
    const membershipFunctions = reactive(_value.map(function(elm){
        return {
          name:elm.name,
          type:elm.type,
          values:elm.values,
          polygon:polygonize(makeArrayForFunction(elm.type, elm.values))
        }
      }))

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

    return {pos,membershipFunctions,save}
  }
}
</script>

<style scoped>

</style>