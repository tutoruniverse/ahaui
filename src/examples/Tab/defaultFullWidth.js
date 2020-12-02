() => {
  const [current, setCurrent] = useState('tab_1');
  return (
    <Tab
      fullWidth
      current={current}
      onSelect={setCurrent}
    >
      <Tab.Item eventKey="tab_1">Tab item 1</Tab.Item>
      <Tab.Item eventKey="tab_2">Tab item 2</Tab.Item>
      <Tab.Item eventKey="tab_3">Tab item 3</Tab.Item>
    </Tab>
  );
};
