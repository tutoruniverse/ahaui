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
    <Icon name="informationCircleOutline" className="u-textLight u-cursorPointer" size="small" />
  </Overlay.Trigger>
</Counter>;
