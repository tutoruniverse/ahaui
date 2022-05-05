<Modal size="small" relative>
  <Modal.Header closeButton>
    <Modal.Title>Modal title</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="u-textCenter">
      <img src="holder.js/100px90?text=Image" className="u-maxWidthFull u-marginBottomExtraSmall" alt="" />
    </div>
  </Modal.Body>
  <Modal.Footer>
    <div className="u-flex u-flexGrow1 u-justifyContentBetween">
      <Button variant="secondary">
        <Button.Icon><Icon name="arrowRoundBack" /></Button.Icon>
        <Button.Label>Back</Button.Label>
      </Button>
      <Button variant="primary">
        <Button.Label>Next</Button.Label>
        <Button.Icon><Icon name="arrowRoundForward" /></Button.Icon>
      </Button>
    </div>
  </Modal.Footer>
</Modal>;
