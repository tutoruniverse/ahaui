() => {
  const [current, setCurrent] = useState('active');
  return (
    <Tab
      current={current}
      onSelect={setCurrent}
    >
      <Tab.Item eventKey="normal">Normal</Tab.Item>
      <Tab.Item eventKey="active">Active</Tab.Item>
      <Tab.Item disabled eventKey="disabled">Disabled</Tab.Item>
    </Tab>
  );
};
