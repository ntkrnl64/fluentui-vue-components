// Theme & Provider
export {
  FluentProvider,
  createCSSRuleFromTheme,
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  tokens,
  typographyStyles,
  createLightTheme,
  createDarkTheme,
  createHighContrastTheme,
  themeToTokensObject,
} from "./theme";
export type { Theme, PartialTheme, BrandVariants } from "./theme";

// Contexts
export {
  ThemeKey,
  ProviderContextKey,
  TooltipVisibilityKey,
  PortalMountNodeKey,
  TabsterKey,
  BackgroundAppearanceKey,
  AnnounceKey,
} from "./contexts";

// Composables
export {
  useTheme,
  useFluentContext,
  useId,
  useControllableState,
  useEventCallback,
  useTimeout,
  useOnClickOutside,
  useOnScrollOutside,
  useFocusVisible,
  usePositioning,
  useArrowNavigation,
  useFocusableGroup,
  useModalAttributes,
  useFocusFinders,
} from "./composables";

// Utils
export { getNativeProps, mergeCallbacks, clamp, isHTMLElement } from "./utils";

// Motion
export {
  durations,
  curves,
  usePresenceMotion,
  fadeMotion,
  fadeSlowMotion,
  scaleMotion,
  slideMotion,
  collapseMotion,
} from "./motion";

// Re-export griffel-vue for convenience
export {
  makeStyles,
  makeResetStyles,
  mergeClasses,
  shorthands,
  useStyles,
  useResetStyles,
  useStaticStyles,
} from "@ntkrnl64/griffel-vue";

// === COMPONENTS ===

// Portal
export * from "./components/Portal";

// Text (+ 17 typography presets)
export * from "./components/Text";

// Label
export * from "./components/Label";

// Image
export * from "./components/Image";

// Divider
export * from "./components/Divider";

// Spinner
export * from "./components/Spinner";

// Skeleton
export * from "./components/Skeleton";

// Progress
export * from "./components/Progress";

// Badge
export * from "./components/Badge";

// Avatar (+ AvatarGroup)
export * from "./components/Avatar";

// Link
export * from "./components/Link";

// Button (+ MenuButton, SplitButton)
export * from "./components/Button";

// Input
export * from "./components/Input";

// Textarea
export * from "./components/Textarea";

// Checkbox
export * from "./components/Checkbox";

// Radio
export * from "./components/Radio";

// Switch
export * from "./components/Switch";

// Slider
export * from "./components/Slider";

// SpinButton
export * from "./components/SpinButton";

// Select
export * from "./components/Select";

// Rating (+ RatingItem, RatingDisplay)
export * from "./components/Rating";

// Popover
export * from "./components/Popover";

// Tooltip
export * from "./components/Tooltip";

// Dialog
export * from "./components/Dialog";

// Menu (+ MenuItemRadio, MenuItemLink, MenuItemSwitch, MenuSplitGroup)
export * from "./components/Menu";

// Table (+ TableResizeHandle, TableCellActions)
export * from "./components/Table";

// DataGrid
export * from "./components/DataGrid";

// Carousel (+ CarouselButton, CarouselAutoplayButton, etc.)
export * from "./components/Carousel";

// Overflow (+ OverflowDivider)
export * from "./components/Overflow";

// SwatchPicker (+ ImageSwatch, EmptySwatch)
export * from "./components/SwatchPicker";

// ColorPicker
export * from "./components/ColorPicker";

// TeachingPopover (+ Carousel sub-components)
export * from "./components/TeachingPopover";

// TagPicker (+ TagPickerButton, TagPickerGroup, TagPickerOptionGroup)
export * from "./components/TagPicker";

// Card
export * from "./components/Card";

// Accordion
export * from "./components/Accordion";

// Tabs
export * from "./components/Tabs";

// Drawer (+ DrawerHeaderNavigation)
export * from "./components/Drawer";

// Toast (+ ToastTrigger)
export * from "./components/Toast";

// Field
export * from "./components/Field";

// Toolbar
export * from "./components/Toolbar";

// Breadcrumb
export * from "./components/Breadcrumb";

// Nav (+ NavDrawer, Hamburger, AppItem, etc.)
export * from "./components/Nav";

// Tree
export * from "./components/Tree";

// List
export * from "./components/List";

// Combobox (+ Dropdown, Listbox, OptionGroup)
export * from "./components/Combobox";

// Persona
export * from "./components/Persona";

// MessageBar
export * from "./components/MessageBar";

// SearchBox
export * from "./components/SearchBox";

// InfoLabel
export * from "./components/InfoLabel";

// InfoButton
export * from "./components/InfoButton";

// Tags (Tag, InteractionTag, TagGroup)
export * from "./components/Tags";
