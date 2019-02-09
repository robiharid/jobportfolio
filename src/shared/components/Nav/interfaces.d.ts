interface NavPropsInterface {
  isShown: boolean,
  setShown(value: boolean): void,
  navOptions:  {link: string, label: string}[]
}