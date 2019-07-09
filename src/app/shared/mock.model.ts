
export default class MockModel {
  id: string;
  httpMethod: "get" | "post" | "put" | "delete";
  endpoint: string;
  response?: any;
  logs?: any;
}
