() => {
  const CustomToggle = ({ eventKey, children }) => {
    const [open, setOpen] = useState(false);
    const handleClick = useAccordionToggle(eventKey, () => setOpen(!open));
    return (
      <div
        className="Button Button--large u-border u-borderTransparent u-flex u-alignItemsCenter u-justifyContentBetween u-cursorPointer"
        onClick={handleClick}
      >
        {children}
        <div className="u-marginLeftTiny u-inlineBlock u-lineHeightNone">
          <Icon
            name="arrowDown"
            className={classNames(
              open && 'u-rotate180'
            )}
            size="extraSmall"
          />
        </div>
      </div>
    );
  };
  return (
    <Accordion style={{ maxWidth: 300 }}>
      <div className="u-marginBottomSmall u-border u-backgroundWhite u-roundedMedium u-overflowHidden">
        <CustomToggle eventKey="0">
          <div className="u-fontMedium">Label</div>
        </CustomToggle>
        <Accordion.Collapse eventKey="0">
          <div className="u-borderTop u-borderTopLighter u-marginHorizontalSmall u-roundedBottomMedium u-paddingVerticalExtraSmall u-textGray">
         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </div>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
};
