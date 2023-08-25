() => {
  const [current, setCurrent] = useState(2);
  return (
    <MultiSteps current={current} onChange={setCurrent} currentLabel="Current Step" direction="vertical" style={{ height: '30rem' }}>
      <MultiSteps.Item title="Step 1" />
      <MultiSteps.Item title="Step 2" />
      <MultiSteps.Item title="Step 3" />
      <MultiSteps.Item title="Step 4" />
    </MultiSteps>
  );
};
