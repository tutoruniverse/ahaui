() => {
  const [topMenuExcelchat, setTopMenuExcelchat] = useState('products.excelchat');
  return (
    <Header fullWidth>
      <Header.Brand>
        <Logo as={SafeAnchor} name="excelchat" variant="original" height={40} />
      </Header.Brand>
      <Header.Main>
        <Header.Left>
          <TopMenu
            current={topMenuExcelchat}
            onSelect={setTopMenuExcelchat}
          >
            <TopMenu.SubMenu eventKey="products" title="Products">
              <TopMenu.Item eventKey="excelchat">Excelchat</TopMenu.Item>
              <TopMenu.Item eventKey="excelchat_learning">Excelchat Learning</TopMenu.Item>
              <TopMenu.Item eventKey="excelchat_slack">Excelchat for Slack</TopMenu.Item>
            </TopMenu.SubMenu>
            <TopMenu.Item eventKey="my_sessions">My sessions</TopMenu.Item>
            <TopMenu.Item eventKey="pricing">Pricing</TopMenu.Item>
          </TopMenu>
        </Header.Left>
        <Header.Right>
          <Button variant="secondary">
            <Button.Label>Session Balance</Button.Label>
            <Button.Icon>
              <Badge variant="warning" className="u-marginLeftTiny u-textTransformNone">Unlimited</Badge>
            </Button.Icon>
          </Button>
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
