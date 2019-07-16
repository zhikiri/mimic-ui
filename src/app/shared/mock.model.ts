
export default class MockModel {
  hash: string;
  httpMethod: 'get' | 'post' | 'put' | 'delete';
  endpoint: string;
  response?: any;
  logs?: any;
}
