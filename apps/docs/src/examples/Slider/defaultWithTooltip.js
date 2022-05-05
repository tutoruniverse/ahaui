() => {
  const SliderWithTooltip = Slider.createSliderWithTooltip(Slider);
  return (
    <SliderWithTooltip min={0} step={0.1} max={20} defaultValue={8} />
  );
};
