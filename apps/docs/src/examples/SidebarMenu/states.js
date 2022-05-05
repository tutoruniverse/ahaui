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
        <SidebarMenu.Item icon="refresh" eventKey="update" badge={() => <Badge>1</Badge>}>Updates</SidebarMenu.Item>
        <SidebarMenu.Item icon="multipleSkills" eventKey="appearance" disabled>Appearance</SidebarMenu.Item>
        <SidebarMenu.Item icon="lock" eventKey="privacyCenter">Privacy Center</SidebarMenu.Item>
      </SidebarMenu>
    </div>
  );
};
