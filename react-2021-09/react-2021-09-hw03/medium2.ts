// Задание второго уровня 2
// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;

// Hint: infer
export const getDefaultProps = (
  component: React.ComponentType
): FIXME => {
  return component.defaultProps;
};