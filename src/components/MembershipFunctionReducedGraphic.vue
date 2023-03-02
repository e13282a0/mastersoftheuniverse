<template>
  <svg :viewBox="`${pos.viewBox.x} ${pos.viewBox.y} ${pos.viewBox.width} ${pos.viewBox.height}`" width="100%" :height="pos.viewBox.height" preserveAspectRatio="xMinYMid meet">

    <!-- Y axis -->
    <line :x1="pos.y.axis.x1" :y1="pos.y.axis.y1" :x2="pos.y.axis.x2" :y2="pos.y.axis.y2" stroke="#000" stroke-width="1" />
    <!-- X axis -->
    <line :x1="pos.x.axis.x1" :y1="pos.x.axis.y1" :x2="pos.x.axis.x2" :y2="pos.x.axis.y2" stroke="#000" stroke-width="1" />

    <!-- polygons -->
    <g :style="`transform: translate(${pos.padding}px, ${pos.padding}px)`">
      <g :key="`membershipFunction${index}`" v-for="(membershipFunction,index) in membershipFunctions">
        <polygon :points="membershipFunction.polygon" :fill="colors[index]" :stroke="colors[index]" stroke-width="1" style="fill-opacity: 0.2" />
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
import {makeColorGradient1} from "@/mixins/colorgenerator";

export default {
  name: "MembershipFunctionReducedGraphic",
  props:['value'],
  setup(props) {
    // grid configuration
    const gridWidth = 200
    const gridHeight = 30
    const padding = 0
    const offset = 0

    const value=structuredClone(props.value)
    const singleValue = !Array.isArray(value)

    const makeArrayForFunction = function (type, arrString) {
      if (typeof(arrString)=="undefined" || !arrString.includes(','))
        return ""
      const arr=arrString.split(',')
      if (!Array.isArray(arr))
        return ""

      let typeObject
      switch (type) {
        case 'constant':
          typeObject = new Constant(parseInt(arr[0]))
          break
        case 'grade':
          typeObject = new Grade(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]),parseInt(arr[3]))
          break
        case 'reverse':
          typeObject = new ReverseGrade(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]),parseInt(arr[3]))
          break
        case 'trapezoid':
          typeObject = new Trapezoid(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]))
          break
        case 'triangle':
          typeObject = new Triangle(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]),parseInt(arr[3]))
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

    let arrValue = singleValue?[value]:value
    const membershipFunctions = reactive(arrValue.map(function(elm){
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
      },
      x: {
        axis: {
          x1: padding,
          x2: padding + gridWidth + offset,
          y1: padding + gridHeight,
          y2: padding + gridHeight
        },
      }
    })

    return {pos,membershipFunctions, colors:makeColorGradient1()}
  }
}
</script>

<style scoped>

</style>