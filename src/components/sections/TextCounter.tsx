"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function countWords(text: string): number {
  const matches = text.match(/\S+/g);
  return matches ? matches.length : 0;
}

function countSentences(text: string): number {
  const matches = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  return matches
    ? matches.map((sentence) => sentence.trim()).filter(Boolean).length
    : 0;
}

function formatNumber(value: number): string {
  return value.toLocaleString();
}

export default function TextCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmedText = text.trim();

    return {
      characterCount: text.length,
      wordCount: countWords(text),
      sentenceCount: trimmedText === "" ? 0 : countSentences(text),
    };
  }, [text]);

  return (
    <Stack spacing={3}>
      <Typography variant="body1" color="text.secondary">
        Paste text to get a quick count of characters, words, and sentences.
        This is handy for editing, content QA, and checking copy length before
        publishing.
      </Typography>

      <TextField
        multiline
        minRows={8}
        maxRows={18}
        fullWidth
        placeholder="Paste or type your text here..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        aria-label="Text input for counting characters, words, and sentences"
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <StatCard label="Characters" value={stats.characterCount} />
        <StatCard label="Words" value={stats.wordCount} />
        <StatCard label="Sentences" value={stats.sentenceCount} />
        <Button variant="outlined" onClick={() => setText("")} disabled={text.length === 0}>
          Clear
        </Button>
      </Box>
    </Stack>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        minWidth: 140,
        px: 2,
        py: 1.5,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h5" fontWeight={700}>
        {formatNumber(value)}
      </Typography>
    </Paper>
  );
}
