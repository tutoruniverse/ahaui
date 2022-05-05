() => {
  const notify = () => toast(() => (
    <div className="u-flex u-flexGrow1">
      <div className="u-marginRightExtraSmall">
        <Icon name="helpCircle" size="medium" />
      </div>
      <div className="u-flexGrow1">
        <div className="u-fontMedium u-marginBottomExtraSmall">Default</div>
        <div>This is a default alert which give more information for users.</div>
      </div>
    </div>
  ));
  const notifyPositive = () => toast.success(() => (
    <div className="u-flex u-flexGrow1">
      <div className="u-marginRightExtraSmall">
        <Icon name="checkmarkCircle" size="medium" />
      </div>
      <div className="u-flexGrow1">
        <div className="u-fontMedium u-marginBottomExtraSmall">Positive</div>
        <div>Provides a positive response to user actions.</div>
      </div>
    </div>
  ), {
  });
  const notifyNegative = () => toast.error(() => (
    <div className="u-flex u-flexGrow1">
      <div className="u-marginRightExtraSmall">
        <Icon name="alert" size="medium" />
      </div>
      <div className="u-flexGrow1">
        <div className="u-fontMedium u-marginBottomExtraSmall">Negative</div>
        <div>Shown when something goes wrong, or provide a negative response to user actions.</div>
      </div>
    </div>
  ), {
  });
  const notifyWarning = () => toast.warn(() => (
    <div className="u-flex u-flexGrow1">
      <div className="u-marginRightExtraSmall">
        <Icon name="warning" size="medium" />
      </div>
      <div className="u-flexGrow1">
        <div className="u-fontMedium u-marginBottomExtraSmall">Warning</div>
        <div>Used to help users avoid error situations. Consists of a description of potential errors.</div>
      </div>
    </div>
  ), {
  });
  const notifyInformation = () => toast.info(() => (
    <div className="u-flex u-flexGrow1">
      <div className="u-marginRightExtraSmall">
        <Icon name="informationCircle" size="medium" />
      </div>
      <div className="u-flexGrow1">
        <div className="u-fontMedium u-marginBottomExtraSmall">Information</div>
        <div>This is a primary alert which give more information for users.</div>
      </div>
    </div>
  ), {
  });

  return (
    <div>
      <Button onClick={notify} variant="secondary" className="u-marginHorizontalExtraSmall">Default</Button>
      <Button onClick={notifyPositive} variant="secondary" className="u-marginHorizontalExtraSmall">Positive</Button>
      <Button onClick={notifyNegative} variant="secondary" className="u-marginHorizontalExtraSmall">Negative</Button>
      <Button onClick={notifyWarning} variant="secondary" className="u-marginHorizontalExtraSmall">Warning</Button>
      <Button onClick={notifyInformation} variant="secondary" className="u-marginHorizontalExtraSmall">Information</Button>
      <ToastContainer />
    </div>
  );
};
