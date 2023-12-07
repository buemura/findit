export interface IUsecase<In, Out> {
  execute(input?: In): Out | Promise<Out>;
}
