() => {
  const Range = Slider.createSliderWithTooltip(Slider.Range);
  return (
    <Range min={0} step={0.1} max={20} defaultValue={[3, 5]} />
  );
};
