<Overlay.Trigger
  placement="top"
  delay={{ show: 1000, hide: 2000 }}
  overlay={props => (
    <Tooltip id="tooltip-right" {...props}>
        Mouse out and I will disappear after 2 seconds
    </Tooltip>
  )}
>
  <Button variant="secondary" className="u-marginHorizontalExtraSmall">
      Hover me 1 second
  </Button>
</Overlay.Trigger>;
