<Counter
  iconLeft={() => (
    <Icon name="moneyBag" className="u-textGray" size="medium" />
  )}
  label="Next Pay Day in"
  number={() => (
    <span className="u-text600 u-fontMedium">
      <span>07</span>
              :
      <span>17</span>
              :
      <span>21</span>
    </span>
  )}
>
  <Overlay.Trigger
    placement="bottom"
    overlay={props => (
      <Tooltip id="tooltip-next-pay-day" {...props}>
                Next Pay Day
      </Tooltip>
    )}
  >
    <Icon name="informationCircleOutline" className="u-textLight u-cursorPointer" size="small" />
  </Overlay.Trigger>
</Counter>;
