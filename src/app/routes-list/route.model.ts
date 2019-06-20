
export default class RouteModel {
  id: string;
  method: "get" | "post" | "put" | "delete";
  path: string;
  response?: any;
  logs?: any;
}
