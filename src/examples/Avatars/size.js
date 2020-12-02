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
    <Avatar size={item} src="https://design.got-it.io/assets/design-system/uifaces/m-20.jpg" />
  </div>
)
);
