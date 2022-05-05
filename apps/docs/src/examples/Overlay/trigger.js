<Overlay.Trigger
  placement="top"
  overlay={props => (
    <Tooltip id="tooltip-right" {...props}>
        My Tooltip
    </Tooltip>
  )}
>
  <Button variant="secondary" className="u-marginHorizontalExtraSmall">
      Overlay Trigger
  </Button>
</Overlay.Trigger>;
