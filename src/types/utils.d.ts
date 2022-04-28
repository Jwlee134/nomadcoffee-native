export type ArrayElement<
  ArrayType extends readonly unknown[] | null | undefined
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
