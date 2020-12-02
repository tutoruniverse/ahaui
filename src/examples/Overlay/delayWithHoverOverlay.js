<Overlay.Trigger
  placement="top"
  delay={{ show: 0, hide: 1000 }}
  hoverOverlay
  overlay={props => (
    <Tooltip id="tooltip-right" {...props}>
        Then hover me, I will not leave you!
    </Tooltip>
  )}
>
  <Button variant="secondary" className="u-marginHorizontalExtraSmall">
      Hover me then hover tooltip
  </Button>
</Overlay.Trigger>;
