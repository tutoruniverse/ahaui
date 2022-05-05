['top', 'right', 'bottom', 'left'].map(placement => (
  <Overlay.Trigger
    key={placement}
    placement={placement}
    overlay={props => (
      <Tooltip id="tooltip-{placement}-long" {...props}>
        <b>Tooltips</b>
provide a small amount of information to an element on hover.
        <strong>{placement}</strong>
.
      </Tooltip>
    )}
  >
    <Button variant="secondary" className="u-marginHorizontalExtraSmall">
      Tooltip on
      {placement}
    </Button>
  </Overlay.Trigger>
));
