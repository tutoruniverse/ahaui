import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

import { COLORS } from '../constants/common';

export default function ColorPicker({
  defaultColor,
  onChangeComplete,
}) {
  const [color, setColor] = useState(defaultColor || '#375de7');

  return (
    <SketchPicker
      color={color}
      presetColors={COLORS}
      onChange={(color) => setColor(color.rgb)}
      onChangeComplete={onChangeComplete}
    />
  );
}