import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Toast, { PositionEnum, toast } from 'components/Toast';
import Icon from 'components/Icon';

export default {
  title: 'Toast',
  component: Toast,
  argTypes: {
    autoDismiss: { control: 'number' },
  },
} as ComponentMeta<typeof Toast>;

const Template : ComponentStory<typeof Toast> = (args) => {
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
      {/* Should update this to Aha button */}
      <button type="button" onClick={notify} className="u-marginHorizontalExtraSmall">Default</button>
      <button type="button" onClick={notifyPositive} className="u-marginHorizontalExtraSmall">Positive</button>
      <button type="button" onClick={notifyNegative} className="u-marginHorizontalExtraSmall">Negative</button>
      <button type="button" onClick={notifyWarning} className="u-marginHorizontalExtraSmall">Warning</button>
      <button type="button" onClick={notifyInformation} className="u-marginHorizontalExtraSmall">Information</button>
      <Toast {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  position: PositionEnum.TOP_RIGHT,
  dismissible: true,
  hideProgressBar: false,
  autoDismiss: 3000,
};
