"use client";

import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const AI_MODELS = [
  { name: "Claude 3.5 Sonnet / Claude 4 Opus", contextWindow: 200_000 },
  { name: "GPT-4o", contextWindow: 128_000 },
  { name: "GPT-4 Turbo", contextWindow: 128_000 },
  { name: "Gemini 1.5 Pro", contextWindow: 1_000_000 },
  { name: "Llama 3", contextWindow: 128_000 },
] as const;

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function formatNumber(value: number): string {
  return value.toLocaleString();
}

export default function ContextCalculator() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characterCount = text.length;
    const wordCount = countWords(text);
    const tokenCount = estimateTokens(text);
    return { characterCount, wordCount, tokenCount };
  }, [text]);

  return (
    <Stack spacing={3}>
      <Typography variant="body1" color="text.secondary">
        Paste text to estimate token counts and see how much of each AI
        model&apos;s context window it would consume. Token estimation uses the
        ~4 characters per token heuristic for English text.
      </Typography>

      <TextField
        multiline
        minRows={6}
        maxRows={16}
        fullWidth
        placeholder="Paste or type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Text input for token estimation"
      />

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", alignItems: "center" }}>
        <StatChip label="Characters" value={stats.characterCount} />
        <StatChip label="Words" value={stats.wordCount} />
        <StatChip label="Estimated Tokens" value={stats.tokenCount} />
        <Button variant="outlined" onClick={() => setText("")} disabled={text.length === 0}>
          Clear
        </Button>
      </Box>

      <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          Context Window Usage
        </Typography>
        {AI_MODELS.map((model) => (
          <ModelUsageBar
            key={model.name}
            modelName={model.name}
            contextWindow={model.contextWindow}
            tokenCount={stats.tokenCount}
          />
        ))}
      </Stack>
    </Stack>
  );
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" fontWeight={600}>
        {formatNumber(value)}
      </Typography>
    </Box>
  );
}

interface ModelUsageBarProps {
  modelName: string;
  contextWindow: number;
  tokenCount: number;
}

function ModelUsageBar({ modelName, contextWindow, tokenCount }: ModelUsageBarProps) {
  const percentage = Math.min((tokenCount / contextWindow) * 100, 100);
  const remaining = Math.max(contextWindow - tokenCount, 0);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="body2" fontWeight={600}>
          {modelName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatNumber(contextWindow)} tokens
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ height: 8, borderRadius: 1, mb: 0.5 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption" color="text.secondary">
          {percentage.toFixed(2)}% used
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatNumber(remaining)} tokens remaining
        </Typography>
      </Box>
    </Paper>
  );
}
