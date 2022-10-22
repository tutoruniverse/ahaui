// Type definitions for @ahaui/react v2.1.0
// Project: https://github.com/gotitinc/ahaui
// Definitions by: KyleTV <https://github.com/tinhvqbk>
// TypeScript Version: 2.8

declare module '@ahaui/react' {
  import React from 'react';
  import { TextareaAutosizeProps } from 'react-textarea-autosize';
  import { ReactNodeLike } from 'prop-types';
  import { CalendarProps as ReactCalendarProps } from 'react-calendar';
  import { DatePickerProps as ReactDatePickerProps } from 'react-date-picker';
  import { Settings as SlickSettingsProps } from 'react-slick';
  import { PopperOptions, Placement as PopperPlacement } from 'popper.js';
  import { toast as toastBase, ToastPosition } from 'react-toastify';
  import ReactTagsInput from 'react-tagsinput';
  import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';

  export type RefElement = undefined | HTMLElement;
  export type RefHandler<
    RefElement extends undefined | HTMLElement,
    ImplicitRefHandler extends (node: HTMLElement, ...args: any[]) => void,
    ExplicitRefHandler extends (...args: any[]) => void,
  > = {
    implicit: ImplicitRefHandler;
    explicit: ExplicitRefHandler;
  }[RefElement extends undefined ? 'implicit' : 'explicit'];

  export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

  export interface BasicWithAsProps<
    As extends React.ElementType = React.ElementType,
  > {
    as?: As;
  }

  export interface BaseProps<As extends React.ElementType = React.ElementType>
    extends BasicWithAsProps<As> {
    children?: ReactNodeLike;
    'data-testid'?: string;
    id?: string;
  }

  export type ReplaceProps<Inner extends React.ElementType, P> = Omit<
    React.ComponentPropsWithRef<Inner>,
    P
  > &
    P;
  export interface RefForwardingComponent<
    TInitial extends React.ElementType,
    P = unknown,
  > {
    <As extends React.ElementType = TInitial>(
      props: React.PropsWithChildren<ReplaceProps<As, BaseProps<As> & P>>,
      context?: any,
    ): React.ReactElement | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  export interface ImageBaseProps
    extends React.ImgHTMLAttributes<HTMLImageElement> {}

  export interface InputBaseProps
    extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {}
  export interface SelectBaseProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    checked?: boolean;
  }
  export interface ButtonBaseProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
  export interface LinkBaseProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}
  export interface IframeBaseProps
    extends React.IframeHTMLAttributes<HTMLIFrameElement> {}
  export interface MediaBaseProps
    extends React.MediaHTMLAttributes<HTMLElement> {}
  export interface ButtonBaseProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
  export interface DOMBaseProps extends React.DOMAttributes<HTMLElement> {}
  export interface HTMLBaseProps extends React.HTMLAttributes<HTMLElement> {}

  export type DOMEventType =
    | 'click'
    | 'dblclick'
    | 'mousedown'
    | 'mouseup'
    | 'mousemove'
    | 'mouseover'
    | 'mouseout'
    | 'mouseenter'
    | 'mouseleave'
    | 'select'
    | 'submit'
    | 'keydown'
    | 'keypress'
    | 'keyup'
    | 'focus'
    | 'blur'
    | 'load'
    | 'resize'
    | 'scroll'
    | 'unload'
    | 'beforeunload';
  export type DOMEventHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
  export type InputChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  export type TriggerType = 'click' | 'hover' | 'focus';
  export type InputSize = 'small' | 'medium' | 'large';
  export type IconType =
    | 'rotate'
    | 'gitBranch'
    | 'options'
    | 'apps'
    | 'fastForward'
    | 'mail'
    | 'trash'
    | 'helpCircle'
    | 'helpCircleOutline'
    | 'cloudUpload'
    | 'location'
    | 'send'
    | 'share'
    | 'unlock'
    | 'volumeHigh'
    | 'volumeOff'
    | 'zoomIn'
    | 'zoomOut'
    | 'expand'
    | 'minus'
    | 'plus'
    | 'column'
    | 'data'
    | 'table'
    | 'cart'
    | 'store'
    | 'workflow'
    | 'bill'
    | 'bag'
    | 'funnel'
    | 'playCircle'
    | 'pin'
    | 'card'
    | 'chatExtension'
    | 'chatBubbles'
    | 'bubbles'
    | 'code'
    | 'create'
    | 'earth'
    | 'flag'
    | 'journal'
    | 'levelBeginner'
    | 'levelImmediate'
    | 'levelAdvanced'
    | 'list'
    | 'lock'
    | 'moneyBag'
    | 'multipleSkills'
    | 'power'
    | 'refresh'
    | 'replace'
    | 'search'
    | 'setting'
    | 'speedometer'
    | 'starOutline'
    | 'starHalf'
    | 'star'
    | 'thumbsDown'
    | 'thumbsUp'
    | 'alert'
    | 'informationCircle'
    | 'informationCircleOutline'
    | 'notification'
    | 'warning'
    | 'attach'
    | 'attachSpreadsheet'
    | 'attachImage'
    | 'attachPpt'
    | 'attachTxt'
    | 'attachSql'
    | 'attachUndefined'
    | 'attachCode'
    | 'cloud'
    | 'cloudDownload'
    | 'copy'
    | 'document'
    | 'images'
    | 'videoCam'
    | 'arrowBack'
    | 'arrowDown'
    | 'arrowDropdownCircle'
    | 'arrowDropdown'
    | 'arrowDropleftCircle'
    | 'arrowDropleft'
    | 'arrowDroprightCircle'
    | 'arrowDropright'
    | 'arrowDropupCircle'
    | 'arrowDropup'
    | 'arrowForward'
    | 'arrowRoundBack'
    | 'arrowRoundDown'
    | 'arrowRoundForward'
    | 'arrowRoundUp'
    | 'arrowUp'
    | 'checkmark'
    | 'checkmarkCircle'
    | 'checkmarkCircleOutline'
    | 'close'
    | 'closeCircle'
    | 'closeCircleOutline'
    | 'menu'
    | 'more'
    | 'facebook'
    | 'google'
    | 'instagram'
    | 'linkedin'
    | 'twitter'
    | 'youtube'
    | 'hourglass'
    | 'time'
    | 'timer'
    | 'contact'
    | 'people'
    | 'mic'
    | 'calendar'
    | 'micOff'
    | 'videoCamOff'
    | 'camera'
    | 'airplane'
    | 'screen'
    | 'screenOff'
    | 'map'
    | 'raiseHand'
    | 'editOff'
    | 'edit'
    | 'cursor'
    | 'eraser'
    | 'font'
    | 'colorPalette'
    | 'save'
    | 'flash'
    | 'aim'
    | 'fileTrayFull'
    | 'fileImport'
    | 'fileExport'
    | 'objects'
    | 'reply'
    | 'bot'
    | 'shapes'
    | 'return'
    | 'umbrella'
    | 'game'
    | 'tagCloud'
    | 'one'
    | 'two'
    | 'three'
    | 'four'
    | 'five'
    | 'six'
    | 'seven'
    | 'eight'
    | 'nine'
    | 'ten'
    | 'logOut'
    | 'wallet'
    | 'bulb'
    | 'home'
    | 'call'
    | 'launch'
    | 'binoculars'
    | 'openExternal'
    | 'math'
    | 'magic'
    | 'pause'
    | 'hammer';
  export type FuncType = (...args: any[]) => any;
  export type EventHandler = React.EventHandler<React.SyntheticEvent>;
  export interface OptionType {
    name: string;
    id: string | number;
  }

  export interface AccordionToggleProps extends HTMLBaseProps {
    eventKey: string;
    disabled?: boolean;
  }

  export interface AccordionCollapseProps extends HTMLBaseProps {
    eventKey: string;
  }

  export function useAccordionToggle(
    eventKey: string,
    onClick?: EventHandler,
  ): EventHandler;

  export interface AccordionProps extends HTMLBaseProps {
    activeKey: string;
  }
  export const Accordion: RefForwardingComponent<'div', AccordionProps> & {
    Toggle: RefForwardingComponent<'div', AccordionToggleProps>;
    Collapse: RefForwardingComponent<'div', AccordionCollapseProps>;
  };

  export interface AskBoxProps extends HTMLBaseProps {}
  export const AskBox: RefForwardingComponent<'div', AskBoxProps> & {
    Title: RefForwardingComponent<'div', HTMLBaseProps>;
    Header: RefForwardingComponent<'div', HTMLBaseProps>;
    Body: RefForwardingComponent<'div', HTMLBaseProps>;
    Footer: RefForwardingComponent<'div', HTMLBaseProps>;
    Note: RefForwardingComponent<'div', HTMLBaseProps>;
  };

  export interface AvatarProps extends ImageBaseProps {
    as?: React.ElementType;
    name?: string;
    size?:
      | 'extraSmall'
      | 'small'
      | 'medium'
      | 'large'
      | 'extraLarge'
      | 'extraLargePlus'
      | 'huge';
    text?: string;
  }

  export const Avatar: React.FC<AvatarProps>;

  export interface BadgeProps extends HTMLBaseProps {
    variant?:
      | 'default'
      | 'white'
      | 'black'
      | 'primary'
      | 'primary_subtle'
      | 'warning'
      | 'warning_subtle'
      | 'positive'
      | 'positive_subtle'
      | 'information'
      | 'information_subtle'
      | 'negative'
      | 'negative_subtle';
    textClassName?: string;
  }
  export const Badge: React.FC<BadgeProps>;
  export interface BreadcrumbItemProps extends HTMLBaseProps {
    href?: string;
    noHref?: boolean;
    title?: string;
    target?: string;
  }

  export interface BreadcrumbProps extends HTMLBaseProps {
    schema?: boolean;
  }
  export const Breadcrumb: React.FC<BreadcrumbProps> & {
    Item: React.FC<BreadcrumbItemProps>;
  };

  export interface BubbleChatImageProps extends HTMLBaseProps {}

  export interface BubbleChatProps extends HTMLBaseProps {
    isTyping?: boolean;
    text?: string | React.ReactNode;
    type?: 'inbound' | 'outbound' | 'system';
    variant?:
      | 'light'
      | 'primary'
      | 'primaryLight'
      | 'dark'
      | 'transparentDark'
      | 'transparentLight';
    avatar?: string | FuncType;
    time?: string | FuncType;
    options?: OptionType[];
    currentOption?: string | number;
    onSelectOption?: (_: string | number) => void;
    disabledOption?: boolean;
    onClickText?: () => void;
    textClassName?: string;
    actionBar?: React.ReactNode;
    actionBarClassName?: string;
  }
  export const BubbleChat: RefForwardingComponent<'div', BubbleChatProps> & {
    Image: React.FC<BubbleChatImageProps>;
  };

  export interface ButtonGroupProps extends HTMLBaseProps {
    sizeControl?: InputSize;
    disabledControl?: boolean;
  }
  export const ButtonGroup: React.FC<ButtonGroupProps>;
  export interface ButtonProps extends BasicWithAsProps, ButtonBaseProps {
    variant?:
      | 'primary'
      | 'primary_outline'
      | 'secondary'
      | 'accent'
      | 'accent_outline'
      | 'positive'
      | 'positive_outline'
      | 'negative'
      | 'negative_outline'
      | 'white'
      | 'white_outline'
      | 'link';
    size?: InputSize;
    onClick?: DOMEventHandler;
    width?: 'auto' | 'full' | 'min';
    disabled?: boolean;
    nonUppercase?: boolean;
    onlyIcon?: boolean;
    textClassName?: string;
  }
  export const Button: React.FC<ButtonProps> & {
    Icon: React.FC<HTMLBaseProps>;
    Label: React.FC<HTMLBaseProps>;
    Group: typeof ButtonGroup;
  };

  export interface CalendarProps extends ReactCalendarProps {
    className?: string;
  }
  export const Calendar: React.FC<CalendarProps>;

  export interface DatePickerProps extends ReactDatePickerProps {
    className?: string;
    noClearIcon?: boolean;
    size?: Pick<IconProps, 'size'>;
    version?: 1 | 2;
    calendarClassName?: string | string[];
  }
  export const DatePicker: React.FC<DatePickerProps>;

  export interface DateRangePickerProps {
    className?: string | string[];
    noClearIcon?: boolean;
    size?: Pick<IconProps, 'size'>;
    autoFocus?: boolean;
    calendarAriaLabel?: string;
    calendarClassName?: string | string[];
    clearAriaLabel?: string;
    closeCalendar?: boolean;
    dayAriaLabel?: string;
    dayPlaceholder?: string;
    disabled?: boolean;
    disableCalendar?: boolean;
    format?: string;
    isOpen?: boolean;
    locale?: string;
    maxDate?: Pick<CalendarProps, 'maxDate'>;
    minDate?: Pick<CalendarProps, 'minDate'>;
    maxDetail?: Pick<CalendarProps, 'maxDetail'>;
    minDetail?: Pick<CalendarProps, 'minDetail'>;
    monthAriaLabel?: string;
    monthPlaceholder?: string;
    name?: string;
    nativeInputAriaLabel?: string;
    onCalendarClose?: () => void;
    onCalendarOpen?: () => void;
    onChange?: Pick<CalendarProps, 'onChange'>;
    openCalendarOnFocus?: boolean;
    rangeDivider?: string;
    required?: boolean;
    showLeadingZeros?: boolean;
    value?: Pick<CalendarProps, 'value'>;
    yearAriaLabel?: string;
    yearPlaceholder?: string;
  }
  export const DateRangePicker: React.FC<DateRangePickerProps>;

  export interface TimePickerProps extends HTMLBaseProps {
    noClearIcon?: boolean;
    size?: InputSize;
  }
  export const TimePicker: React.FC<TimePickerProps>;

  export interface CardProps extends HTMLBaseProps {
    body?: boolean;
    size?: InputSize;
  }
  export const Card: React.FC<CardProps> & {
    Header: React.FC<BasicWithAsProps>;
    Title: React.FC<BasicWithAsProps>;
    Body: React.FC<BasicWithAsProps>;
  };

  export interface CarouselProps extends HTMLBaseProps {
    dotInside?: boolean;
    settings?: SlickSettingsProps;
  }
  export const Carousel: React.FC<CarouselProps> & {
    Item: React.FC<BasicWithAsProps>;
  };

  export interface ChatBoxListProps extends HTMLBaseProps {
    innerClassName?: string;
  }
  export interface ChatBoxProps extends HTMLBaseProps {}
  export const ChatBox: React.FC<ChatBoxProps> & {
    List: React.FC<ChatBoxListProps>;
    Attachment: React.FC<HTMLBaseProps>;
    Info: React.FC<HTMLBaseProps>;
    Context: React.FC<HTMLBaseProps>;
    Notice: React.FC<HTMLBaseProps>;
  };

  export interface CollapseProps extends HTMLBaseProps {
    eventKey?: string;
    timeout?: number;
    dimension?: 'height' | 'width' | FuncType;
    getDimensionValue?: (
      dimension: Pick<CollapseProps, 'dimension'>,
      elem: React.ReactElement,
    ) => number;
  }
  export const Collapse: React.FC<CollapseProps>;

  export interface ComposerInputProps extends TextareaAutosizeProps {
    className?: string;
  }
  export interface ComposerProps extends HTMLBaseProps {
    inputProps?: ComposerInputProps;
    attachButtonProps?: object;
    sendButtonProps?: object;
    sendButtonActive?: boolean;
    disabledSendButton?: boolean;
    disabledAttachButton?: boolean;
    tooltipAttachButton?: string | FuncType;
    tooltipSendButton?: string | FuncType;
    sendButtonIcon?: IconType | FuncType;
  }
  export const Composer: React.FC<ComposerProps>;

  export interface CounterProps extends HTMLBaseProps {
    variant?:
      | 'primary'
      | 'secondary'
      | 'accent'
      | 'information'
      | 'warning'
      | 'positive'
      | 'negative'
      | 'white';

    label?: string | FuncType;
    number?: string | FuncType;
    iconLeft?: IconType | FuncType;
  }
  export const Counter: React.FC<CounterProps>;

  export interface DropdownButtonProps extends BasicWithAsProps {
    caret?: Pick<IconProps, 'size'>;
  }
  export interface DropdownContainerProps extends BasicWithAsProps {
    popperConfig?: PopperOptions;
    additionalStyles?: React.CSSProperties;
    flip?: boolean;
    shouldUsePopper?: boolean;
    rootCloseEvent?: string;
  }
  export interface DropdownToggleProps extends HTMLBaseProps {
    disabled?: boolean;
  }
  export interface DropdownProps extends BasicWithAsProps {
    drop?: 'up' | 'down' | 'left' | 'right';
    flip?: boolean;
    show?: boolean;
    alignRight?: boolean;
    onToggle?: () => void;
  }
  export const Dropdown: React.FC<DropdownProps> & {
    Item: React.FC<HTMLBaseProps>;
    Container: React.FC<DropdownContainerProps>;
    Button: React.FC<DropdownButtonProps>;
    Toggle: React.FC<DropdownToggleProps>;
  };
  export function useToggle(): [
    {
      ref: () => void;
      'aria-haspopup': boolean;
      'aria-expanded': boolean;
    },
    {
      show: boolean;
      toggle: () => void;
    },
  ];

  export interface EmptyStateProps extends ImageBaseProps {
    name?: string;
  }

  export const EmptyState: React.FC<EmptyStateProps> & {
    Heading: React.FC<BasicWithAsProps>;
    Description: React.FC<BasicWithAsProps>;
  };

  export interface FadeProps extends HTMLBaseProps {
    in?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    appear?: boolean;
    timeout?: number;
    onEnter?: EnterHandler<RefElement>;
    onEntering?: EnterHandler<RefElement>;
    onEntered?: EnterHandler<RefElement>;
    onExit?: ExitHandler<RefElement>;
    onExiting?: ExitHandler<RefElement>;
    onExited?: ExitHandler<RefElement>;
  }
  export const Fade: React.FC<FadeProps>;

  export interface FileAttachmentProps extends HTMLBaseProps {
    fileType?:
      | 'undefined'
      | 'text'
      | 'image'
      | 'code'
      | 'spreadsheet'
      | 'query'
      | 'powerpoint';
    fileTypeLabel?: string | FuncType;
    show?: boolean;
    onClose?: () => void;
    closeButton?: boolean;
    actionLeft?: FuncType;
    actionRight?: FuncType;
    fileName?: string;
  }
  export const FileAttachment: React.FC<FileAttachmentProps>;

  export interface FormBaseProps {
    isValid?: boolean;
    isInvalid?: boolean;
    sizeInput?: InputSize;
    placeholder?: string;
    disabled?: boolean;
  }

  export interface FormCheckProps
    extends Omit<FormBaseProps, 'placeholder'>,
      SelectBaseProps {
    type?: 'checkbox' | 'radio' | 'checkbox_button';
    label?: string | FuncType;
    inline?: boolean;
  }
  export interface FormFeedbackProps extends HTMLBaseProps {
    type: 'valid' | 'invalid';
    visible?: boolean;
  }
  export interface FormFileProps extends FormBaseProps, InputBaseProps {
    fileName?: string;
    browseText?: string;
    isBorderNone?: boolean;
    isBackgroundReset?: boolean;
  }
  export interface FormGroupProps
    extends React.HTMLAttributes<HTMLElement>,
      BasicWithAsProps {
    controlId?: string;
    sizeControl?: InputSize;
    requiredControl?: boolean;
  }
  export interface FormInputProps extends FormBaseProps, InputBaseProps {
    type?: string;
    as?: 'input' | 'textarea';
    value?: string | number;
    required?: boolean;
    readOnly?: boolean;
    isBorderNone?: boolean;
    isBackgroundReset?: boolean;
    rows?: number;
  }
  export interface FormLabelProps extends HTMLBaseProps {
    sizeLabel?: InputSize;
    required?: boolean;
    htmlFor?: string;
  }
  export interface FormSelectProps extends FormBaseProps {
    value?: string | number;
    required?: boolean;
    isBorderNone?: boolean;
    isBackgroundReset?: boolean;
  }
  export interface FormProps extends HTMLBaseProps, DOMBaseProps {}
  export const Form: React.FC<FormProps> & {
    Check: React.FC<FormCheckProps>;
    Feedback: React.FC<FormFeedbackProps>;
    File: React.FC<FormFileProps>;
    Group: React.FC<FormGroupProps>;
    Input: React.FC<FormInputProps>;
    Label: React.FC<FormLabelProps>;
    InputGroup: React.FC<HTMLBaseProps>;
    Select: React.FC<FormSelectProps>;
  };
  export interface HeaderProps extends BasicWithAsProps {
    show?: boolean;
    innerClassName?: string;
    fullWidth?: boolean;
  }

  export const Header: React.FC<HeaderProps> & {
    Left: React.FC<BasicWithAsProps>;
    AbsoluteCenter: React.FC<BasicWithAsProps>;
    Right: React.FC<BasicWithAsProps>;
    Main: React.FC<BasicWithAsProps>;
    Brand: React.FC<BasicWithAsProps>;
  };

  export interface HeaderMobileProps extends HTMLBaseProps {
    show?: boolean;
    showMenu?: boolean;
    hasDropContext?: boolean;
    onToggle?: () => void;
  }
  export const HeaderMobile: React.FC<HeaderMobileProps> & {
    Main: React.FC<HTMLBaseProps>;
    Brand: React.FC<HTMLBaseProps>;
    AfterContext: React.FC<HTMLBaseProps>;
    Context: React.FC<HTMLBaseProps>;
    DropContext: React.FC<HTMLBaseProps>;
  };

  export interface IconProps extends HTMLBaseProps {
    name?: IconType;
    size?:
      | 'tiny'
      | 'extraSmall'
      | 'small'
      | 'medium'
      | 'large'
      | 'extraLarge'
      | 'extraLargePlus'
      | 'huge';

    path?: string;
    style?: React.CSSProperties;
  }
  export const Icon: React.FC<IconProps>;

  export interface LoaderProps extends HTMLBaseProps {
    size?: InputSize;
    duration?: number;
  }
  export const Loader: React.FC<LoaderProps>;

  export interface LogoProps extends ImageBaseProps {
    name?: string;
  }
  export const Logo: React.FC<LogoProps>;

  export interface MediaProps extends MediaBaseProps {
    aspectRatio?: 'square' | 'classic' | 'wide' | 'cinema';
  }
  export const Media: React.FC<MediaProps>;

  export interface MessageProps extends HTMLBaseProps {
    type?: 'form' | 'system';
    variant?: 'information' | 'positive' | 'warning' | 'negative';
    dismissible?: boolean;
    show?: boolean;
    onClose?: () => void;
  }
  export const Message: React.FC<MessageProps> & {
    Content: React.FC<BasicWithAsProps>;
    Container: React.FC<BasicWithAsProps>;
    Title: React.FC<BasicWithAsProps>;
  };

  export interface ModalHeaderProps extends HTMLBaseProps {
    onHide?: () => void;
    closeButton?: boolean;
  }
  export interface ModalProps extends HTMLBaseProps {
    size?: 'small' | 'medium' | 'large' | 'extraLarge';
    relative?: boolean;
    centered?: boolean;
    show?: boolean;
    onHide?: () => void;
  }
  export const Modal: React.FC<ModalProps> & {
    Title: React.FC<ModalHeaderProps>;
    Body: React.FC<HTMLBaseProps>;
    Footer: React.FC<HTMLBaseProps>;
    Header: React.FC<ModalHeaderProps>;
    Inside: React.FC<HTMLBaseProps>;
  };

  export interface MultiStepsItemProps extends HTMLBaseProps {
    isLast?: boolean;
    isCompleted?: boolean;
    isActive?: boolean;
    title?: string;
    disabled?: boolean;
  }
  export interface MultiStepsProps extends BasicWithAsProps {
    current?: number;
    currentLabel?: string;
    onChange?: (current: number) => void;
    direction?: 'horizontal' | 'vertical';
    variant?:
      | 'primary'
      | 'accent'
      | 'positive'
      | 'warning'
      | 'negative'
      | 'white';
  }
  export const MultiSteps: React.FC<MultiStepsProps> & {
    Item: React.FC<MultiStepsItemProps>;
  };

  interface OverlayHTMLBaseProps extends HTMLBaseProps {
    children: React.ReactNode;
    popperConfig?: PopperOptions;
    placement?: PopperPlacement;
    rootClose?: boolean;
    rootCloseEvent?: string;
    rootCloseDisabled?: boolean;
  }
  export type OverlayTriggerEvent = 'click' | 'hover' | 'focus';
  export interface OverlayTriggerProps extends OverlayHTMLBaseProps {
    trigger?: OverlayTriggerEvent | OverlayTriggerEvent[];
    delay?: number | { show: number; hide: number };
    hoverOverlay?: boolean;
    defaultShow?: boolean;
    overlay: FuncType | React.ReactNode;
  }

  export interface OverlayProps extends OverlayHTMLBaseProps {
    show?: boolean;
    target?: React.RefObject<HTMLElement>;
    container?: HTMLElement;
    flip?: boolean;
    containerPadding?: number;
    onHide?: () => void;
  }
  export const Overlay: React.FC<OverlayProps> & {
    Trigger: React.FC<OverlayTriggerProps>;
  };

  export interface PageLayoutProps extends BasicWithAsProps {
    headerProps?: object;
    footerProps?: object;
    bodyProps?: object;
  }
  export const PageLayout: React.FC<PageLayoutProps> & {
    Header: React.FC<BasicWithAsProps>;
    Footer: React.FC<BasicWithAsProps>;
    Body: React.FC<BasicWithAsProps>;
  };

  export interface PaginationItemProps extends HTMLBaseProps {
    active?: boolean;
    disabled?: boolean;
  }
  export interface PaginationProps extends HTMLBaseProps {
    sizeControl?: InputSize;
  }
  export const Pagination: React.FC<PaginationProps> & {
    Item: React.FC<PaginationItemProps>;
  };

  export interface ProblemInfoProps extends HTMLBaseProps {
    topicLabel?: string;
    topicName?: string;
    descriptionLabel?: string;
    descriptionValue?: string | FuncType;
    additionalLabel?: string;
    additionalValue?: string | FuncType;
    src?: string;
    onClickImage?: () => void;
    action?: string | FuncType;
  }
  export const ProblemInfo: React.FC<ProblemInfoProps>;

  export interface ProgressProps extends BasicWithAsProps {
    variant?: 'primary' | 'accent' | 'positive' | 'warning' | 'negative';
    now?: number;
    height?: number;
    label?: ReactNodeLike;
    labelClassName?: string;
    border?: boolean;
    striped?: boolean;
    animated?: boolean;
  }
  export const Progress: React.FC<ProgressProps>;

  export interface RatingProps extends BasicWithAsProps {
    disabled?: boolean;
    emptyIcon?: IconType;
    readOnly?: boolean;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement>,
      value: number,
    ) => void;
    onChangeActive?: (event: MouseEvent, value: number) => void;
    getLabelText?: (value: number | string) => string;
    value?: number | any;
    max?: number;
    precision?: number;
    name?: string;
    size?: 'tiny' | 'extraSmall' | 'small' | 'medium' | 'large';
  }
  export const Rating: React.FC<RatingProps>;

  export interface SafeAnchorProps extends BasicWithAsProps {
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
    disabled?: boolean;
    role?: string;
    tabIndex?: number | string;
  }
  export const SafeAnchor: React.FC<SafeAnchorProps>;

  export interface SearchProps extends HTMLBaseProps {
    onClickButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    buttonIcon?: IconType;
    sizeControl?: InputSize;
    buttonText?: string;
  }
  export const Search: React.FC<SearchProps>;

  export interface SeparatorProps extends HTMLBaseProps {
    label?: string;
    variant?:
      | 'light'
      | 'lighter'
      | 'primary'
      | 'positive'
      | 'negative'
      | 'gray';
    lineType?: 'dashed' | 'solid';
  }
  export const Separator: React.FC<SeparatorProps>;

  export interface SessionTypeProps extends BasicWithAsProps {
    label?: string | FuncType;
    leftLabel?: string;
    variant?: 'default' | 'positive' | 'accent' | 'warning';
  }
  export const SessionType: React.FC<SessionTypeProps>;

  export interface SidebarMenuItemProps extends BasicWithAsProps {
    eventKey?: string;
    disabled?: boolean;
    icon?: IconType;
    badge?: string | FuncType;
    size?: 'small' | 'medium';
  }

  export interface SidebarMenuSubMenuProps extends SidebarMenuItemProps {
    title: string;
  }
  export interface SidebarMenuProps extends BasicWithAsProps {
    size?: 'small' | 'medium';
    current?: string;
    onSelect?: (eventKey: string) => void;
  }

  export const SidebarMenu: React.FC<SidebarMenuProps> & {
    Item: React.FC<SidebarMenuItemProps>;
    SubMenu: React.FC<SidebarMenuSubMenuProps>;
    Divider: React.FC<HTMLBaseProps>;
    Header: React.FC<HTMLBaseProps>;
  };

  export interface SkeletonProps extends HTMLBaseProps {
    variant?: 'circle' | 'text';
    width?: number | string;
    height?: number | string;
    duration?: number;
  }
  export const Skeleton: React.FC<SkeletonProps>;

  interface RCSliderBaseProps {
    className?: string;
    min?: number;
    max?: number;
    marks:
      | ReactNodeLike
      | {
          number: {
            style?: React.CSSProperties;
            label?: ReactNodeLike;
          };
        };
    step?: number;
    vertical?: boolean;
    handle?: ReactNodeLike;
    included?: boolean;
    reverse?: boolean;
    disabled?: boolean;
    dots?: boolean;
    onBeforeChange?: (value: number) => void;
    onChange?: (value: number) => void;
    onAfterChange?: (value: number) => void;
    minimumTrackStyle?: React.CSSProperties;
    maximumTrackStyle?: React.CSSProperties;
    handleStyle?: React.CSSProperties;
    trackStyle?: React.CSSProperties;
    railStyle?: React.CSSProperties;
    dotStyle?: React.CSSProperties;
    activeDotStyle?: React.CSSProperties;
  }
  export interface SliderHandleProps {
    vertical?: boolean;
    reverse?: boolean;
    offset?: number;
    style?: React.CSSProperties;
    disabled?: boolean;
    min?: number;
    max?: number;
    value?: number;
    tabIndex?: number;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaValueTextFormatter?: (value: number) => string;
  }
  export function createSliderWithTooltip(
    Component: React.ComponentType<any>,
  ): React.ComponentType<RCSliderBaseProps>;
  export interface SliderProps extends RCSliderBaseProps {
    variant?: 'primary' | 'accent' | 'positive' | 'warning' | 'negative';
    vertical?: boolean;
  }
  export const Slider: React.FC<SliderProps> & {
    Handle: React.FC<SliderHandleProps>;
    Range: React.FC<SliderProps>;
    createSliderWithTooltip: {
      tipFormatter?: (value: number) => string;
      handleStyle?: React.CSSProperties;
      tipProps?: object;
    };
  };

  export interface TabItemProps extends HTMLBaseProps {
    eventKey?: string;
    disabled?: boolean;
  }
  export interface TabProps extends BasicWithAsProps {
    current?: string;
    children?: ReactNodeLike;
    fullWidth?: boolean;
    direction?: 'horizontal' | 'vertical';
    onSelect?: (eventKey: string) => void;
    visual?: 'default' | 'filled';
  }
  export const Tab: React.FC<TabProps> & {
    Item: React.FC<TabItemProps>;
  };

  export interface TagProps extends HTMLBaseProps {
    variant?:
      | 'black'
      | 'white'
      | 'primary'
      | 'primary_subtle'
      | 'accent'
      | 'accent_subtle'
      | 'warning'
      | 'warning_subtle'
      | 'positive'
      | 'positive_subtle'
      | 'information'
      | 'information_subtle'
      | 'negative'
      | 'negative_subtle';
    textClassName?: string;
  }
  export const Tag: React.FC<TagProps>;

  export interface TagInputProps extends ReactTagsInput {
    variant?:
      | 'black'
      | 'white'
      | 'primary'
      | 'primary_subtle'
      | 'warning'
      | 'warning_subtle'
      | 'positive'
      | 'positive_subtle'
      | 'negative'
      | 'negative_subtle';
    size?: InputSize;
  }
  export const TagInput: React.FC<TagInputProps>;

  export interface ToastContainerProps extends HTMLBaseProps {
    position?: ToastPosition;
    autoDismiss?: boolean | number;
    dismissible?: boolean;
    hideProgressBar?: boolean;
  }
  export const ToastContainer: React.FC<ToastContainerProps>;
  export const toast: typeof toastBase;

  export interface ToggleProps extends HTMLBaseProps {
    checked?: boolean;
    disabled?: boolean;
    nonLabel?: boolean;
    textLabelOn?: string;
    textLabelOff?: string;
    ariaLabel?: string;
  }
  export const Toggle: React.FC<ToggleProps>;

  export interface TooltipProps extends HTMLBaseProps {
    noArrow?: boolean;
    placement?: PopperPlacement;
    arrowProps?: {
      style?: React.CSSProperties;
      ref: React.Ref<HTMLDivElement>;
    };
    variant?: 'white' | 'black';
    styleTooltip?: React.CSSProperties;
  }
  export const Tooltip: React.FC<TooltipProps>;

  export interface TopBannerProps extends HTMLBaseProps {
    bgImage?: ReactNodeLike;
    dismissible?: boolean;
    show?: boolean;
    onClose?: () => void;
  }
  export const TopBanner: React.FC<TopBannerProps>;

  export interface TopMenuItemProps extends HTMLBaseProps {
    eventKey?: string;
    disabled?: boolean;
    badge?: string | FuncType;
  }
  export interface TopMenuSubMenuProps extends TopMenuItemProps {
    title: string;
  }
  export interface TopMenuProps extends BasicWithAsProps {
    current?: string;
    onSelect?: (eventKey: string) => void;
  }
  export const TopMenu: React.FC<TopMenuProps> & {
    Item: React.FC<TopMenuItemProps>;
    SubMenu: React.FC<TopMenuSubMenuProps>;
  };

  interface BlockBaseProps<As extends React.ElementType = 'div'> {
    displayName?: string;
    Component?: As;
    defaultProps?: Partial<React.ComponentProps<As>>;
  }
  export function createBlock<As extends React.ElementType = 'div'>(
    prefix: string,
    _?: BlockBaseProps<As>,
  ): RefForwardingComponent<As>;

  interface RootCloseProps {
    disabled?: boolean;
    clickTrigger?: string;
  }

  export function useRootClose(
    ref?: React.Ref<HTMLElement>,
    onRootClose?: () => void,
    _?: RootCloseProps,
  ): void;

  class AssetPlugin extends PluginsType {
    constructor(param: {
      prefix: 'avatar' | 'logo' | 'emptyState';
      assets: Record<string, any>;
    });
    type: 'asset';
    prefix: 'avatar' | 'logo' | 'emptyState';
    assets: Record<string, any>;
    validateAssets(assets: Record<string, any>): void;
    getAsset(): undefined;
    getAsset(assetName: string): any;
    getAsset(prefix: string, assetName: string): any;
  }

  class PluginArray<T = PluginsType> extends Array<T> {
    traverseCall(methodName: string, ...args: any[]): any;
  }

  class PluginsType {
    plugins: PluginArray;
    validatePlugin(plugin: PluginsType): void;
    loadPlugin(plugin: PluginsType): void;
    getPlugins(): PluginArray;
    getPlugins(type: string): PluginArray;
  }

  export const Plugins: PluginsType;
}
