<div style={{ maxWidth: 360 }}>
  <BubbleChat
    type="outbound"
    avatar={(() => <Avatar size="small" className="u-backgroundPrimaryLighter u-textPrimary u-text100" text="KT" />)}
    className="u-marginBottomNone"
  >
    <BubbleChat.Image
      src="holder.js/250x120?text=Image"
    />
  </BubbleChat>
  <BubbleChat
    type="outbound"
    avatar={(() => <Avatar size="small" className="u-backgroundPrimaryLighter u-textPrimary u-text100" text="KT" />)}
    text="This is an example for image"
    time="16:20"
  />
  <BubbleChat
    className="u-marginBottomNone"
  >
    <BubbleChat.Image
      src="holder.js/250x120?text=Image"
    />

  </BubbleChat>
  <BubbleChat
    text="This is an example for image"
    time="16:24"
  />
</div>;
