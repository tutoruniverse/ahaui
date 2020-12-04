() => {
  const [topMenuExcelchat, setTopMenuExcelchat] = useState('products.excelchat');
  return (
    <Header fullWidth>
      <Header.Brand>
        <Logo as={SafeAnchor} src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/origin/ahaui-logo-with-text.svg" variant="original" height={40} />
      </Header.Brand>
      <Header.Main>
        <Header.Left>
          <TopMenu
            current={topMenuExcelchat}
            onSelect={setTopMenuExcelchat}
          >
            <TopMenu.Item eventKey="my_sessions">My sessions</TopMenu.Item>
            <TopMenu.Item eventKey="pricing">Pricing</TopMenu.Item>
          </TopMenu>
        </Header.Left>
        <Header.Right>
          <Dropdown alignRight className="u-marginLeftExtraSmall">
            <Dropdown.Toggle className="u-textLight u-lineHeightNone">
              <Icon name="contact" size="medium" />
            </Dropdown.Toggle>
            <Dropdown.Container className="u-paddingVerticalExtraSmall">
              <Dropdown.Item>
                <Icon name="setting" size="small" />
                <span className="u-marginLeftExtraSmall">My Profile</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="card" size="small" />
                <span className="u-marginLeftExtraSmall">Payment</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="power" size="small" />
                <span className="u-marginLeftExtraSmall">Logout</span>
              </Dropdown.Item>
            </Dropdown.Container>
          </Dropdown>
        </Header.Right>
      </Header.Main>
    </Header>
  );
};
