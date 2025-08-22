declare global {
  interface Window {
    React: typeof import('react');
    ReactDOM: typeof import('react-dom');
  }
}

declare namespace React {
  interface FormEvent<T = Element> extends SyntheticEvent<T> {
    currentTarget: EventTarget & T;
  }
  
  interface SyntheticEvent<T = Element, E = Event> {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: EventTarget & T;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: E;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    target: EventTarget | null;
    timeStamp: number;
    type: string;
  }
}

export {};
