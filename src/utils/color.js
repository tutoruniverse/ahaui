function hexToR(h) {
  return parseInt((cutHex(h)).substring(0,2),16);
}

function hexToG(h) {
  return parseInt((cutHex(h)).substring(2,4),16);
}

function hexToB(h) {
  return parseInt((cutHex(h)).substring(4,6),16);
}

function cutHex(h) {
  return (h.charAt(0)=="#") ? h.substring(1,7) : h;
}

/*
From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast

Color brightness is determined by the following formula: 
((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000

I know this could be more compact, but I think this is easier to read/explain.
*/
export function getContrastBackgroundColor(hex, options = {}) {
  const mergedOptions = {
    lightBg: '#ffffff',
    darkBg: '#000000',
    ...options,
  }

  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */
  
  const hRed = hexToR(hex);
  const hGreen = hexToG(hex);
  const hBlue = hexToB(hex);

  const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
  if (cBrightness > threshold) {
    return mergedOptions.darkBg;
  } else {
    return mergedOptions.lightBg;
  }	
}

export const rgbaToHex8 = ({ r, g, b , a }) => {
  let hexR = r.toString(16);
  let hexG = g.toString(16);
  let hexB = b.toString(16);
  if (hexR.length === 1) hexR = `0${hexR}`;
  if (hexG.length === 1) hexG = `0${hexG}`;
  if (hexB.length === 1) hexB = `0${hexB}`;
  const hexA = a === 1.0
    ? ''
    : (Math.round((Math.round(a * 100) / 100) * 255) + 0x10000).toString(16).substr(-2);
  return `#${hexR}${hexG}${hexB}${hexA}`
}