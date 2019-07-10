
export default class LogRecord {
  timestamp: number;
  headers: Record<string, any>[];
  query: Record<string, any>[];
  body: Record<string, any>[];
}
