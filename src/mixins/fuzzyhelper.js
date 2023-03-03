import Constant from "es6-fuzz/lib/curve/constant";
import Grade from "es6-fuzz/lib/curve/grade";
import ReverseGrade from "es6-fuzz/lib/curve/reverse-grade";
import Trapezoid from "es6-fuzz/lib/curve/trapezoid";
import Triangle from "es6-fuzz/lib/curve/triangle";
import Sigmoid from "es6-fuzz/lib/curve/sigmoid";

export const getFuzzyObject = function(type, arr) {
    switch (type) {
        case 'constant':
            return new Constant(parseInt(arr[0]))

        case 'grade':
            return new Grade(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]),parseInt(arr[3]))

        case 'reverse':
            return new ReverseGrade(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]),parseInt(arr[3]))

        case 'trapezoid':
            return new Trapezoid(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]))

        case 'triangle':
            return new Triangle(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]),parseInt(arr[3]))

        case 'sigmoid':
            return new Sigmoid(parseInt(arr[0]), parseInt(arr[1]))

        default:
            return {}

    }
}