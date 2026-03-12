"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const STRING_GROUPS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  separators: "-_",
} as const;

export default function StringGenerator() {
  const [length, setLength] = useState("16");
  const [count, setCount] = useState("5");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSeparators, setIncludeSeparators] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copiedValue, setCopiedValue] = useState("");

  function generateStrings() {
    const stringLength = Number.parseInt(length, 10);
    const stringCount = Number.parseInt(count, 10);
    const pool = [
      includeLowercase ? STRING_GROUPS.lowercase : "",
      includeUppercase ? STRING_GROUPS.uppercase : "",
      includeNumbers ? STRING_GROUPS.numbers : "",
      includeSeparators ? STRING_GROUPS.separators : "",
    ]
      .filter(Boolean)
      .join("");

    if (!Number.isFinite(stringLength) || stringLength < 1 || stringLength > 256) {
      setError("Choose a string length between 1 and 256.");
      setResults([]);
      return;
    }

    if (!Number.isFinite(stringCount) || stringCount < 1 || stringCount > 100) {
      setError("Choose between 1 and 100 strings.");
      setResults([]);
      return;
    }

    if (pool.length === 0) {
      setError("Select at least one character group.");
      setResults([]);
      return;
    }

    const generated = Array.from({ length: stringCount }, () =>
      `${prefix}${buildRandomString(stringLength, pool)}${suffix}`,
    );

    setError("");
    setCopiedValue("");
    setResults(generated);
  }

  async function copyValue(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setError("");
    } catch {
      setCopiedValue("");
      setError("Copy to clipboard is not available in this browser.");
    }
  }

  return (
    <Stack spacing={4}>
      <Typography variant="body1" color="text.secondary">
        Generate random strings for slugs, tokens, fixture data, and local test
        values without leaving the browser.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="String Length"
            type="number"
            value={length}
            onChange={(event) => setLength(event.target.value)}
            slotProps={{ htmlInput: { min: 1, max: 256, step: 1 } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="How Many Strings"
            type="number"
            value={count}
            onChange={(event) => setCount(event.target.value)}
            slotProps={{ htmlInput: { min: 1, max: 100, step: 1 } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Prefix"
            value={prefix}
            onChange={(event) => setPrefix(event.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Suffix"
            value={suffix}
            onChange={(event) => setSuffix(event.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeLowercase}
                onChange={(event) => setIncludeLowercase(event.target.checked)}
              />
            }
            label="Lowercase"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeUppercase}
                onChange={(event) => setIncludeUppercase(event.target.checked)}
              />
            }
            label="Uppercase"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeNumbers}
                onChange={(event) => setIncludeNumbers(event.target.checked)}
              />
            }
            label="Numbers"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeSeparators}
                onChange={(event) => setIncludeSeparators(event.target.checked)}
              />
            }
            label="Separators"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="contained" onClick={generateStrings}>
          Generate Strings
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setResults([]);
            setError("");
            setCopiedValue("");
          }}
          disabled={results.length === 0 && error === ""}
        >
          Clear Results
        </Button>
      </Box>

      {error ? <Alert severity="warning">{error}</Alert> : null}
      {copiedValue ? <Alert severity="success">Copied value to clipboard.</Alert> : null}

      {results.length > 0 ? (
        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Generated Strings</Typography>
            <Stack spacing={1.5}>
              {results.map((value, index) => (
                <Paper key={`${value}-${index}`} variant="outlined" sx={{ px: 2, py: 1.5 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    alignItems={{ xs: "stretch", sm: "center" }}
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "monospace", overflowWrap: "anywhere" }}
                    >
                      {value}
                    </Typography>
                    <Button size="small" variant="outlined" onClick={() => void copyValue(value)}>
                      Copy
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  );
}

function buildRandomString(length: number, pool: string): string {
  return Array.from({ length }, () => pool[randomIndex(pool.length)]).join("");
}

function randomIndex(length: number): number {
  return crypto.getRandomValues(new Uint32Array(1))[0] % length;
}
