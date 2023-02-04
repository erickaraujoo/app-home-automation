export type InterfaceToType<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
