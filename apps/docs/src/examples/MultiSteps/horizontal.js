() => {
  const [current, setCurrent] = useState(2);
  return (
    <MultiSteps current={current} currentLabel="Current Step" onChange={setCurrent}>
      <MultiSteps.Item title="Step 1" />
      <MultiSteps.Item title="Step 2" />
      <MultiSteps.Item title="Step 3" />
      <MultiSteps.Item title="Step 4" />
    </MultiSteps>
  );
};
