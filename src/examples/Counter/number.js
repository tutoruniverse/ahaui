<Counter
  iconLeft="chatExtension"
  label="Chat Extensions Remaining:"
  number="2"
>
  <Overlay.Trigger
    placement="bottom"
    overlay={props => (
      <Tooltip id="tooltip-chat-extension" {...props}>
                Tooltip
      </Tooltip>
    )}
  >
    <Icon name="informationCircleOutline" className="u-textLight  u-cursorPointer" size="small" />
  </Overlay.Trigger>
</Counter>;
