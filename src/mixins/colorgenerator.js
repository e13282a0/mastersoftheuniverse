function RGB2Color(r,g,b)
{
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n)
{
    const nybHexString = "0123456789ABCDEF";
    const first = (n >> 4) & 0x0f;
    const second = n & 0x0f;
    return nybHexString[first] + nybHexString[second];
}

function makeColorGradient(frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width, len)
{
    if (center === undefined)   center = 128;
    if (width === undefined)    width = 127;
    if (len === undefined)      len = 50;
    let result = []
    for (let i = 0; i < len; ++i)
    {
        let red = Math.sin(frequency1*i + phase1) * width + center;
        let grn = Math.sin(frequency2*i + phase2) * width + center;
        let blu = Math.sin(frequency3*i + phase3) * width + center;
        result.push( RGB2Color(red,grn,blu) )
    }
    return result
}


export const makeColorGradient1 = function(len=50){
    const center = 128;
    const width = 127;
    const redFrequency = 1.666;
    const grnFrequency = 2.666;
    const bluFrequency = 3.666;
    return makeColorGradient(redFrequency,grnFrequency,bluFrequency,0,0,0,center,width,len)
}

export const makeColorGradient2 = function(len=50){
    const center = 128;
    const width = 127;
    const frequency = 2.4;
    return makeColorGradient(frequency,frequency,frequency,0,2,4,center,width,len);
}