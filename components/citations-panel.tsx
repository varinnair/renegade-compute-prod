"use client";

import { useEffect, useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useCitations } from "@/hooks/use-citations";

export const CitationsPanel = () => {
  const { open, items, selectedIndex, hide, select } = useCitations();

  const current = useMemo(() => items[selectedIndex], [items, selectedIndex]);

  useEffect(() => {
    if (items.length === 0 && open) hide();
  }, [items.length, open, hide]);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && hide()}>
      <SheetContent side="right" className="w-[480px] sm:w-[520px]">
        <SheetHeader>
          <SheetTitle>Citations</SheetTitle>
        </SheetHeader>
        <div className="mt-4 grid h-full grid-rows-[auto,1fr] gap-3">
          <div className="flex gap-2 overflow-x-auto">
            {items.map((it, idx) => (
              <Button
                key={`${it.fileId}-${idx}`}
                size="sm"
                variant={idx === selectedIndex ? "default" : "outline"}
                onClick={() => select(idx)}
                className="shrink-0"
              >
                [{(it.number ?? (idx + 1)).toString()}]
              </Button>
            ))}
          </div>
          <ScrollArea className="h-full rounded border p-3">
            {current ? (
              <div className="space-y-3">
                <div>
                  <div className="font-medium">{current.fileName}</div>
                  <a
                    className="text-primary text-xs underline"
                    href={current.driveUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open in Google Drive
                  </a>
                </div>
                <pre className={cn("whitespace-pre-wrap rounded bg-muted p-2 text-xs", !current.snippet && "opacity-60")}> 
{current.snippet || "No preview available for this item."}
                </pre>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">No citation selected.</div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

