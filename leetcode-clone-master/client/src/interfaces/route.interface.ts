export type TRouteType = {
  path: string;
  element: React.ReactNode;
  children?: TRouteType[];
  errorElement?: React.ReactNode;
};

export type TCustomRoute = {
  private?: TRouteType[];
  public?: TRouteType[];
  protected?: TRouteType[];
};
