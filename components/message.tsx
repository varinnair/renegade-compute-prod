"use client";
import type { UseChatHelpers } from "@ai-sdk/react";
import equal from "fast-deep-equal";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import type { Vote } from "@/lib/db/schema";
import type { ChatMessage } from "@/lib/types";
import { cn, sanitizeText } from "@/lib/utils";
import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationSource,
  InlineCitationQuote,
} from "./elements/inline-citation";
import { useCitations } from "@/hooks/use-citations";
import { useDataStream } from "./data-stream-provider";
import { DocumentToolResult } from "./document";
import { DocumentPreview } from "./document-preview";
import { MessageContent } from "./elements/message";
import { Response } from "./elements/response";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "./elements/tool";
import { SparklesIcon } from "./icons";
import { MessageActions } from "./message-actions";
import { MessageEditor } from "./message-editor";
import { MessageReasoning } from "./message-reasoning";
import { PreviewAttachment } from "./preview-attachment";
import { Weather } from "./weather";

const SemanticResultsSync = ({ results }: { results: any[] }) => {
  const { setItems } = useCitations();
  useEffect(() => {
    if (Array.isArray(results)) {
      setItems(
        results.map((r: any) => ({
          fileId: r.fileId,
          fileName: r.fileName,
          driveUrl: r.driveUrl,
        }))
      );
    }
  }, [results, setItems]);
  return null;
};

const AssistantTextWithCitations = ({ text }: { text: string }) => {
  // Keep using citation store to resolve metadata for badges,
  // but do not open any side panel or render numbers.
  const citations = useCitations();
  // Split on citation markers like [1], [2], ... without capturing the inner digits
  // to avoid rendering stray numbers as separate segments.
  const parts = text.split(/(\[\d+\])/g);
  return (
    <span className="inline">
      {parts.map((part, index) => {
        const match = part.match(/^\[(\d+)\]$/);
        if (match) {
          const num = Number(match[1]);
          const item = citations.items[num - 1];
          const url = item?.driveUrl ?? "";
          if (!item) {
            // If there is no corresponding metadata, omit the marker entirely.
            return null;
          }
          return (
            <InlineCitation key={`cit-${index}`}>
              <InlineCitationCard>
                <InlineCitationCardTrigger
                  sources={url ? [url] : []}
                />
                <InlineCitationCardBody>
                  <InlineCitationCarousel>
                    <InlineCitationCarouselHeader>
                      <InlineCitationCarouselIndex />
                    </InlineCitationCarouselHeader>
                    <InlineCitationCarouselContent>
                      <InlineCitationCarouselItem>
                        <InlineCitationSource
                          title={item?.fileName || "Unknown source"}
                          url={url || undefined}
                          description={undefined}
                        />
                      </InlineCitationCarouselItem>
                    </InlineCitationCarouselContent>
                  </InlineCitationCarousel>
                </InlineCitationCardBody>
              </InlineCitationCard>
            </InlineCitation>
          );
        }
        // Non-marker segment: preserve paragraph breaks while keeping
        // intra-paragraph content inline so citations don't force new blocks.
        const paraChunks = part.split(/\n{2,}/g);
        return (
          <span key={`md-${index}`} className="contents">
            {paraChunks.map((chunk, i) => (
              <span key={`md-${index}-chunk-${i}`} className="contents">
                <Response className="contents [&>p]:inline [&>p]:m-0">
                  {chunk}
                </Response>
                {i < paraChunks.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
};

const PurePreviewMessage = ({
  chatId,
  message,
  vote,
  isLoading,
  setMessages,
  regenerate,
  isReadonly,
  requiresScrollPadding,
}: {
  chatId: string;
  message: ChatMessage;
  vote: Vote | undefined;
  isLoading: boolean;
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
  regenerate: UseChatHelpers<ChatMessage>["regenerate"];
  isReadonly: boolean;
  requiresScrollPadding: boolean;
}) => {
  const [mode, setMode] = useState<"view" | "edit">("view");

  const attachmentsFromMessage = message.parts.filter(
    (part) => part.type === "file"
  );

  useDataStream();
  const citations = useCitations();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="group/message w-full"
      data-role={message.role}
      data-testid={`message-${message.role}`}
      initial={{ opacity: 0 }}
    >
      <div
        className={cn("flex w-full items-start gap-2 md:gap-3", {
          "justify-end": message.role === "user" && mode !== "edit",
          "justify-start": message.role === "assistant",
        })}
      >
        {message.role === "assistant" && (
          <div className="-mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
            <SparklesIcon size={14} />
          </div>
        )}

        <div
          className={cn("flex flex-col", {
            "gap-2 md:gap-4": message.parts?.some(
              (p) => p.type === "text" && p.text?.trim()
            ),
            "min-h-96": message.role === "assistant" && requiresScrollPadding,
            "w-full":
              (message.role === "assistant" &&
                message.parts?.some(
                  (p) => p.type === "text" && p.text?.trim()
                )) ||
              mode === "edit",
            "max-w-[calc(100%-2.5rem)] sm:max-w-[min(fit-content,80%)]":
              message.role === "user" && mode !== "edit",
          })}
        >
          {attachmentsFromMessage.length > 0 && (
            <div
              className="flex flex-row justify-end gap-2"
              data-testid={"message-attachments"}
            >
              {attachmentsFromMessage.map((attachment) => (
                <PreviewAttachment
                  attachment={{
                    name: attachment.filename ?? "file",
                    contentType: attachment.mediaType,
                    url: attachment.url,
                  }}
                  key={attachment.url}
                />
              ))}
            </div>
          )}

          {message.parts?.map((part, index) => {
            const { type } = part;
            const key = `message-${message.id}-part-${index}`;

            if (type === "reasoning" && part.text?.trim().length > 0) {
              return (
                <MessageReasoning
                  isLoading={isLoading}
                  key={key}
                  reasoning={part.text}
                />
              );
            }

            if (type === "text") {
              if (mode === "view") {
                return (
                  <div key={key}>
                    <MessageContent
                      className={cn({
                        "w-fit break-words rounded-2xl px-3 py-2 text-right text-white":
                          message.role === "user",
                        "bg-transparent px-0 py-0 text-left":
                          message.role === "assistant",
                      })}
                      data-testid="message-content"
                      style={
                        message.role === "user"
                          ? { backgroundColor: "#006cff" }
                          : undefined
                      }
                    >
                      {message.role === "assistant" ? (
                        <AssistantTextWithCitations
                          text={sanitizeText(part.text)}
                        />
                      ) : (
                        <Response>{sanitizeText(part.text)}</Response>
                      )}
                    </MessageContent>
                  </div>
                );
              }

              if (mode === "edit") {
                return (
                  <div
                    className="flex w-full flex-row items-start gap-3"
                    key={key}
                  >
                    <div className="size-8" />
                    <div className="min-w-0 flex-1">
                      <MessageEditor
                        key={message.id}
                        message={message}
                        regenerate={regenerate}
                        setMessages={setMessages}
                        setMode={setMode}
                      />
                    </div>
                  </div>
                );
              }
            }

            if (type === "tool-getWeather") {
              const { toolCallId, state } = part;

              return (
                <Tool defaultOpen={true} key={toolCallId}>
                  <ToolHeader state={state} type="tool-getWeather" />
                  <ToolContent>
                    {state === "input-available" && (
                      <ToolInput input={part.input} />
                    )}
                    {state === "output-available" && (
                      <ToolOutput
                        errorText={undefined}
                        output={<Weather weatherAtLocation={part.output} />}
                      />
                    )}
                  </ToolContent>
                </Tool>
              );
            }

            if (type === "tool-createDocument") {
              const { toolCallId } = part;

              if (part.output && "error" in part.output) {
                return (
                  <div
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-500 dark:bg-red-950/50"
                    key={toolCallId}
                  >
                    Error creating document: {String(part.output.error)}
                  </div>
                );
              }

              return (
                <DocumentPreview
                  isReadonly={isReadonly}
                  key={toolCallId}
                  result={part.output}
                />
              );
            }

            if (type === "tool-updateDocument") {
              const { toolCallId } = part;

              if (part.output && "error" in part.output) {
                return (
                  <div
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-500 dark:bg-red-950/50"
                    key={toolCallId}
                  >
                    Error updating document: {String(part.output.error)}
                  </div>
                );
              }

              return (
                <div className="relative" key={toolCallId}>
                  <DocumentPreview
                    args={{ ...part.output, isUpdate: true }}
                    isReadonly={isReadonly}
                    result={part.output}
                  />
                </div>
              );
            }

            if (type === "tool-requestSuggestions") {
              const { toolCallId, state } = part;

              return (
                <Tool defaultOpen={true} key={toolCallId}>
                  <ToolHeader state={state} type="tool-requestSuggestions" />
                  <ToolContent>
                    {state === "input-available" && (
                      <ToolInput input={part.input} />
                    )}
                    {state === "output-available" && (
                      <ToolOutput
                        errorText={undefined}
                        output={
                          "error" in part.output ? (
                            <div className="rounded border p-2 text-red-500">
                              Error: {String(part.output.error)}
                            </div>
                          ) : (
                            <DocumentToolResult
                              isReadonly={isReadonly}
                              result={part.output}
                              type="request-suggestions"
                            />
                          )
                        }
                      />
                    )}
                  </ToolContent>
                </Tool>
              );
            }

            if (type === "tool-semanticSearch") {
              const { toolCallId, state } = part;
              const output = (state === "output-available" && !("error" in part.output)) ? part.output : null;
              return (
                <Tool defaultOpen={true} key={toolCallId}>
                  <ToolHeader state={state} type="tool-semanticSearch" />
                  <ToolContent>
                    {state === "input-available" && <ToolInput input={part.input} />}
                    {state === "output-available" && (
                      <ToolOutput
                        errorText={undefined}
                        output={
                          "error" in part.output ? (
                            <div className="rounded border p-2 text-red-500">
                              Error: {String(part.output.error)}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <SemanticResultsSync results={output?.results || []} />
                              {(output?.results || []).map(
                                (r: any, idx: number) => (
                                  <div key={`${toolCallId}-${idx}`} className="rounded border p-2">
                                    <div className="font-medium flex items-center justify-between gap-2">
                                      <span>{r.fileName}</span>
                                      {r.driveUrl && (
                                        <a
                                          className="text-primary text-xs underline"
                                          href={r.driveUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          Open in Drive
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                )
                              )}
                              {(!output?.results || output.results.length === 0) && (
                                <div className="text-muted-foreground text-sm">No results.</div>
                              )}
                            </div>
                          )
                        }
                      />
                    )}
                  </ToolContent>
                </Tool>
              );
            }

            if (type === "tool-viewFile") {
              const { toolCallId, state } = part;
              return (
                <Tool defaultOpen={false} key={toolCallId}>
                  <ToolHeader state={state} type="tool-viewFile" />
                  <ToolContent>
                    {state === "input-available" && <ToolInput input={part.input} />}
                    {state === "output-available" && (
                      <ToolOutput
                        errorText={undefined}
                        output={
                          "error" in part.output ? (
                            <div className="rounded border p-2 text-red-500">
                              Error: {String(part.output.error)}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="font-medium">{part.output.fileName}</div>
                              {(() => {
                                const content: string = part.output.content ?? "";
                                const lines = content.split(/\r?\n/);
                                const maxLines = 5;
                                const showLines = lines.slice(0, maxLines);
                                const truncated = lines.length > maxLines;
                                const preview = truncated
                                  ? `${showLines.join("\n")}\n...`
                                  : content;
                                return (
                                  <pre className="max-h-64 overflow-auto rounded border bg-muted p-2 text-xs whitespace-pre-wrap">
                                    {preview}
                                  </pre>
                                );
                              })()}
                            </div>
                          )
                        }
                      />
                    )}
                  </ToolContent>
                </Tool>
              );
            }

            return null;
          })}

          {!isReadonly && (
            <MessageActions
              chatId={chatId}
              isLoading={isLoading}
              key={`action-${message.id}`}
              message={message}
              setMode={setMode}
              vote={vote}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) {
      return false;
    }
    if (prevProps.message.id !== nextProps.message.id) {
      return false;
    }
    if (prevProps.requiresScrollPadding !== nextProps.requiresScrollPadding) {
      return false;
    }
    if (!equal(prevProps.message.parts, nextProps.message.parts)) {
      return false;
    }
    if (!equal(prevProps.vote, nextProps.vote)) {
      return false;
    }

    return false;
  }
);

export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="group/message w-full"
      data-role={role}
      data-testid="message-assistant-loading"
      initial={{ opacity: 0 }}
    >
      <div className="flex items-start justify-start gap-3">
        <div className="-mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
          <SparklesIcon size={14} />
        </div>

        <div className="flex w-full flex-col gap-2 md:gap-4">
          <div className="p-0 text-muted-foreground text-sm">
            <LoadingText>Thinking...</LoadingText>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LoadingText = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      animate={{ backgroundPosition: ["100% 50%", "-100% 50%"] }}
      className="flex items-center text-transparent"
      style={{
        background:
          "linear-gradient(90deg, hsl(var(--muted-foreground)) 0%, hsl(var(--muted-foreground)) 35%, hsl(var(--foreground)) 50%, hsl(var(--muted-foreground)) 65%, hsl(var(--muted-foreground)) 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
};
