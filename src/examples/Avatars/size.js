[
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge',
  'extraLargePlus',
  'huge',
].map(item => (
  <div key={item} className="u-inlineBlock u-marginRightMedium">
    <Avatar size={item} src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/gotit/avatar/default.svg" />
  </div>
)
);
