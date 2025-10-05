"use client";

import { useCallback, useMemo } from "react";
import useSWR from "swr";

export type CitationItem = {
  number?: string;
  fileId: string;
  fileName: string;
  snippet?: string;
  start?: number;
  end?: number;
  driveUrl: string;
};

type CitationsState = {
  items: CitationItem[];
  selectedIndex: number;
  isVisible: boolean;
};

const initialState: CitationsState = {
  items: [],
  selectedIndex: 0,
  isVisible: false,
};

export function useCitations() {
  const { data: state, mutate: setState } = useSWR<CitationsState>(
    "citations",
    null,
    { fallbackData: initialState }
  );

  const open = useMemo(() => state?.isVisible ?? false, [state]);
  const items = useMemo(() => state?.items ?? [], [state]);
  const selectedIndex = useMemo(() => state?.selectedIndex ?? 0, [state]);

  const setItems = useCallback((items: CitationItem[]) => {
    setState((current) => ({ ...(current || initialState), items }));
  }, [setState]);

  const setVisible = useCallback((isVisible: boolean) => {
    setState((current) => ({ ...(current || initialState), isVisible }));
  }, [setState]);

  const show = useCallback(() => setVisible(true), [setVisible]);
  const hide = useCallback(() => setVisible(false), [setVisible]);
  const toggle = useCallback(() => setVisible(!(state?.isVisible ?? false)), [setVisible, state]);

  const select = useCallback((index: number) => {
    setState((current) => ({ ...(current || initialState), selectedIndex: index }));
  }, [setState]);

  const openWith = useCallback((items: CitationItem[], focusIndex = 0) => {
    setState(() => ({ items, selectedIndex: Math.max(0, Math.min(focusIndex, Math.max(0, items.length - 1))), isVisible: true }));
  }, [setState]);

  return {
    open,
    items,
    selectedIndex,
    setItems,
    setVisible,
    show,
    hide,
    toggle,
    select,
    openWith,
  } as const;
}

