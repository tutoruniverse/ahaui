<div style={{ width: 350 }}>
  <Overlay.Trigger
    placement="top"
    overlay={props => (
      <Tooltip id="tooltip-session-type" {...props}>
        Tooltip on SessionType
      </Tooltip>
    )}
  >
    <SessionType label="With tooltip" />
  </Overlay.Trigger>
</div>;
