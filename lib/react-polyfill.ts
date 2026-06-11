/* eslint-disable */
// @ts-nocheck
import * as React from 'react';

// Destructure all standard React exports including new React 19 APIs (use, useActionState, useOptimistic)
const {
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  startTransition,
  useTransition,
  useDeferredValue,
  useId,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  use,
  useActionState,
  useOptimistic,
  version
} = React as any;

export {
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  startTransition,
  useTransition,
  useDeferredValue,
  useId,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  use,
  useActionState,
  useOptimistic,
  version
};

// Polyfill useEffectEvent since it's experimental and not exported from stable react 19
export const useEffectEvent = (React as any).experimental_useEffectEvent || (React as any).useEffectEvent || function useEffectEvent(fn: any) {
  const ref = React.useRef(fn);
  React.useInsertionEffect(() => {
    ref.current = fn;
  });
  return React.useCallback((...args: any[]) => {
    return ref.current(...args);
  }, []);
};

export default React;
