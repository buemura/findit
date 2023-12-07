export interface IPresentation<In, Out> {
  handle(input: In): Out | Promise<Out>;
}
