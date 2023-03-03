// https://gitlab.com/nargarawr/fuzz
export const VARIABLE_SOURCES=['MQTT','OPCUA']
export const FUZZY_MEMBERSHIP_FUNCTIONS ={
    'Triangular': ['left','center','right'],
    'Trapezoidal':['bottomLeft', 'topLeft', 'topRight','bottomRight'],
    'Gaussian':['center','standardDeviation'],
    'Sigmoidal':['center','slope']
}

export const FUZZY_MEMBERSHIP_FUNCTION_STEP=1