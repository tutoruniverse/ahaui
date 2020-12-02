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
      >
        <SidebarMenu.Item icon="store" eventKey="home">Home</SidebarMenu.Item>
        <SidebarMenu.SubMenu icon="setting" eventKey="setting" title="Settings">
          <SidebarMenu.Item icon="volumeHigh" eventKey="audio">Audio</SidebarMenu.Item>
          <SidebarMenu.Item icon="notification" eventKey="notification">Notification</SidebarMenu.Item>
        </SidebarMenu.SubMenu>
      </SidebarMenu>
    </div>
  );
};
