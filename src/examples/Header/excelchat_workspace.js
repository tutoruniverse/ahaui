() => {
  const [topMenuExcelchat, setTopMenuExcelchat] = useState('products.excelchat');
  return (
    <Header fullWidth>
      <Header.Brand>
        <Logo as={SafeAnchor} name="excelchat" variant="original" height={40} />
      </Header.Brand>
      <Header.Main>
        <Header.AbsoluteCenter>
          <Counter
            iconLeft="time"
            label="Time Remaining"
            number="18:23"
          >
            <Overlay.Trigger
              placement="bottom"
              overlay={props => (
                <Tooltip id="tooltip-time-remaining" {...props}>
              Time Remaining
                </Tooltip>
              )}
            >
              <Icon name="informationCircleOutline" className="u-textLight" size="small" />
            </Overlay.Trigger>
          </Counter>
        </Header.AbsoluteCenter>
        <Header.Right>
          <Button variant="positive">Done</Button>
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
