## Release 2.0.4 - January 18, 2022
### Fixed
* SCSS:
  - TopMenu-itemAfter, TopMenu-itemBefore of TopMenu-subMenu has wrong position
  - BubbleChat: update opacity of typing indicators (three dots)
  - Form: update `is-disabled` styles
  - Toastify: Toastify--animate and Toastify__toast to support new version
* CSSUtilities:
  - u-fontRegular, u-fontMedium, u-fontBold are now using variables
  - u-webkitScrollbar: update styles
### Updated
* Shadow: increase `y` value of all sizes
* Size: added `u-minHeightFull`, `u-maxHeightFull`

## Release 2.0.3 - December 23, 2020
### Fixed
* SCSS: fixed variables that affected disabled Button style

## Release 2.0.2 - December 17, 2020
### Fixed
* CSSUtilities: revert some deprecated class, details in [_deprecated.scss](https://github.com/gotitinc/aha-css/blob/master/scss/utilities/_deprecated.scss
)
## Release 2.0.1 - December 6, 2020
### Fixed
* CSSUtilities: fix `hr` and `u-listItemUnderline`
* Dependencies: bump node-sass from 4.12.0 to 4.13.1

## Release 2.0.0 - December 5, 2020
### Added
* Migrate all SCSS from Got It Design System 1.12.11
