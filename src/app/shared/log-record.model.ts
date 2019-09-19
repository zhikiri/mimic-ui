
export function newLog(): LogRecordModel {

  return {
    timestamp: 0,
    headers: [],
    query: [],
    body: [],
  }
}

export default class LogRecordModel {
  timestamp: number;
  headers: Record<string, any>[];
  query: Record<string, any>[];
  body: Record<string, any>[];
}
