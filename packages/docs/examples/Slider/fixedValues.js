() => {
  const min = 0;
  const max = 20;
  const step = 0.4;
  const zeroArray = [];
  for (let i = 0; i < (max - min) + 1; i++) {
    zeroArray.push(0);
  }
  const ticks = zeroArray.map((value, index) => (index)).filter(value => value % 4 === 0);
  const marks = {};
  ticks.map(
    (value) => {
      marks[value] = value.toString();
      return 0;
    }
  );
  const sliderConfig = {
    min,
    max,
    step,
    marks,
  };
  return (
    <Slider {...sliderConfig} defaultValue={8} />
  );
};
