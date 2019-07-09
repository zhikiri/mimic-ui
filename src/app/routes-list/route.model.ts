
export default class RouteModel {
  id: string;
  httpMethod: "get" | "post" | "put" | "delete";
  endpoint: string;
  response?: any;
  logs?: any;
}
