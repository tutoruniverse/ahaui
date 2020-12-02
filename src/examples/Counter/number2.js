<Counter
  iconLeft="chatExtension"
  label="Chat Extensions Remaining:"
  number={() => (
    <Icon name="lock" size="medium" />
  )}
>
  <Overlay.Trigger
    placement="bottom"
    overlay={props => (
      <Tooltip id="tooltip-chat-extension2" {...props}>
      Tooltip
      </Tooltip>
    )}
  >
    <Icon name="informationCircleOutline" className="u-textLight u-cursorPointer" size="small" />
  </Overlay.Trigger>
</Counter>;
