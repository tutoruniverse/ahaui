## Release 2.0.4 - Unreleased
### Fixed
* BubbleChat: Use bottom alignment for avatar
* BubbleChat.Image: Set `lineHeight` to `0` to make image in the same baseline with avatar
* Dropdown.Container: Correct extra props that are passed to internal `div`, so incompatible props (such as `popperConfig`) are excluded
* Composer: Allow passing `className` and `style` to `attachButtonProps`, `inputProps`, and `sendButtonProps`
* Button: add className `u-fontMedium` to sync value with UI
* Message, Modal, Toggle: add aria-label for accessibility
### Added
* Type definitions

## Release 2.0.3 - January 18, 2022
### Fixed
* Code base: use absolute imports, rearrange hooks and utils
* TopMenu: TopMenu-itemAfter of TopMenu-subMenu has wrong position (need CSS changes)
* Toast: Upgrade from `react-toastify@6` to version `7.0.4` to fix issue:
  - `pauseOnFocusLoss` is not applied to windows already unfocused. [Ref](https://github.com/fkhadra/react-toastify/issues/541)
* BubbleChat: map text className from `variantTextClassNames` using variant (like `variantClassNames`)
* Form/Select: add missing `is-disabled` className on disabled
### Added
* Icons: `shapes`, `return`, `umbrella`, `game`, `tagCloud`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`
* Message: add test-id `[data-testid="message-close"]`
* Modal/Header: add test-id `[data-testid="modal-close-button"]`
### Updated
* react-toastify to fixed version
* Support React 17

## Release 2.0.2 - January 18, 2021
### Fixed
* Button: modified variant `secondary`, fixed ActionBar
* FileAttachment: modified prop `fileTypeLabel`
* BubbleChat: fixed UI bug, removed console log, map style of `type=system` to `variant=primaryLight`, improve prop `options`
* PaginationItem: removed console log
* Toast: fixed warning
### Added
* Breadcrumb: added prop `noHref`
* Icon: added icon `fileImport`, `fileExport`, `bubbles`
### Updated
* rc-slider, react-slick, react-split-pane, react-toastify to fixed version

## Release 2.0.1 - December 15, 2020
### Fixed
* BubbleChat: pass `avatar` prop value to prop `name` of Avatar, instead of `src`
* Composer: remove defaultProps `tooltipAttachButton` and `tooltipSendButton`
* Button, Tag, Badge: add prop `textClassName` to custom text color

## Release 2.0.0 - December 6, 2020
### Added
* Migrate all from Got It Design System 1.12.11
