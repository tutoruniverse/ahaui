import Base, { OverlayProps, OverlayChildrenProps } from './Base';
import Trigger, { OverlayTriggerProps } from './Trigger';

const Overlay = Object.assign(Base, {
  Trigger,
  displayName: 'Overlay',
});

export default Overlay;
export type { OverlayProps, OverlayChildrenProps, OverlayTriggerProps };
