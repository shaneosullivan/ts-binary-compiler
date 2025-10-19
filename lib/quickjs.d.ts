// Type declarations for QuickJS runtime environment
// This file provides TypeScript definitions for the QuickJS JavaScript engine

// Console interface
declare var console: {
  log(...args: any[]): void;
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
};

// JSON global object
declare var JSON: {
  parse(text: string): any;
  stringify(value: any, replacer?: any, space?: any): string;
};

// Date constructor and interface
declare var Date: {
  new(): Date;
  now(): number;
};

interface Date {
  toISOString(): string;
}

// Array constructor with static methods
declare var Array: {
  from<T>(arrayLike: ArrayLike<T>, mapfn?: (v: T, k: number) => any, thisArg?: any): any[];
};

// Math object
declare var Math: {
  round(x: number): number;
  floor(x: number): number;
  ceil(x: number): number;
  max(...values: number[]): number;
  min(...values: number[]): number;
  random(): number;
};

// Object constructor
declare var Object: {
  keys(obj: any): string[];
  values(obj: any): any[];
  entries(obj: any): [string, any][];
};

// Promise implementation
declare class Promise<T> {
  constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void);
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2>;
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null): Promise<T | TResult>;
  finally(onfinally?: (() => void) | null): Promise<T>;
  static resolve<T>(value: T | PromiseLike<T>): Promise<T>;
  static resolve(): Promise<void>;
  static reject<T = never>(reason?: any): Promise<T>;
}

// Internal synchronous fetch function (this is what QuickJS actually provides)
declare function __quickjs_fetch_sync(url: string, init?: {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}): {
  readonly status: number;
  readonly statusText: string;
  readonly ok: boolean;
  readonly headers: Record<string, string>;
  text(): string;
  json(): any;
};

// Response type enum
type ResponseType = 'basic' | 'cors' | 'error' | 'opaque' | 'opaqueredirect';

// TextEncoder for ArrayBuffer support
declare class TextEncoder {
  encode(input?: string): Uint8Array;
}

// Minimal Blob interface
interface Blob {
  readonly size: number;
  readonly type: string;
}

// Minimal FormData interface
interface FormData {}

// ReadableStream interface (simplified)
interface ReadableStream {}

// Standard Response interface
interface Response {
  readonly status: number;
  readonly statusText: string;
  readonly ok: boolean;
  readonly headers: Headers | Record<string, string>;
  readonly redirected: boolean;
  readonly type: ResponseType;
  readonly url: string;
  readonly body: ReadableStream | null;
  readonly bodyUsed: boolean;
  text(): Promise<string>;
  json(): Promise<any>;
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<Blob>;
  formData(): Promise<FormData>;
  bytes(): Promise<Uint8Array>;
  clone(): Response;
}

// Standard Headers interface (simplified)
interface Headers {
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
  delete(name: string): void;
  forEach(callbackfn: (value: string, key: string) => void): void;
}

// RequestInit interface
interface RequestInit {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
}

type HeadersInit = Headers | Record<string, string> | string[][];
type BodyInit = string | FormData | URLSearchParams;

// Standard fetch function that returns a Promise
declare function fetch(input: string | Request, init?: RequestInit): Promise<Response>;

// Request interface (simplified)
interface Request {
  readonly url: string;
  readonly method: string;
  readonly headers: Headers;
}

export {};