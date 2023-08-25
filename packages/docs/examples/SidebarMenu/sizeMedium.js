() => {
  const [current, setCurrent] = useState('home');
  return (
    <div style={{
      width: 360,
    }}
    >
      <SidebarMenu
        current={current}
        onSelect={setCurrent}
        style={{
          width: 360,
        }}
      >
        <SidebarMenu.Item eventKey="home">Home</SidebarMenu.Item>
        <SidebarMenu.Item eventKey="payment">Payment</SidebarMenu.Item>
        <SidebarMenu.Item eventKey="privacyCenter">Privacy Center</SidebarMenu.Item>
      </SidebarMenu>
    </div>
  );
};
