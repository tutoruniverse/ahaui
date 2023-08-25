<Dropdown drop="up">
  <Dropdown.Button variant="secondary" size="small">
    <Button.Icon>
      <Icon name="funnel" size="extraSmall" />
    </Button.Icon>
    <Button.Label>
      Filters
    </Button.Label>
  </Dropdown.Button>
  <Dropdown.Container className="u-paddingVerticalExtraSmall" additionalStyles={{ minWidth: 320 }}>
    <div className="u-fontMedium u-paddingLeftSmall lg:u-marginBottomNone">Status</div>
    <div className=" u-paddingHorizontalSmall u-paddingVerticalTiny">
      <Form.Check id="status.check.1" label="New" />
    </div>
    <div className=" u-paddingHorizontalSmall u-paddingVerticalTiny">
      <Form.Check id="status.check.2" label="Revise" />
    </div>
    <div className=" u-paddingHorizontalSmall u-paddingVerticalTiny">
      <Form.Check id="status.check.3" label="Question Approved" />
    </div>
    <div className=" u-paddingHorizontalSmall u-paddingVerticalTiny">
      <Form.Check id="status.check.4" label="SQL Ready" />
    </div>
  </Dropdown.Container>
</Dropdown>;
