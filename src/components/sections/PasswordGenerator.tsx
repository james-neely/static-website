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

const CHARACTER_GROUPS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/|~",
} as const;

export default function PasswordGenerator() {
  const [length, setLength] = useState("20");
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [count, setCount] = useState("5");
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copiedValue, setCopiedValue] = useState("");

  function generatePasswords() {
    const passwordLength = Number.parseInt(length, 10);
    const passwordCount = Number.parseInt(count, 10);
    const selectedGroups = [
      includeLowercase ? CHARACTER_GROUPS.lowercase : "",
      includeUppercase ? CHARACTER_GROUPS.uppercase : "",
      includeNumbers ? CHARACTER_GROUPS.numbers : "",
      includeSymbols ? CHARACTER_GROUPS.symbols : "",
    ].filter(Boolean);

    if (!Number.isFinite(passwordLength) || passwordLength < 4 || passwordLength > 256) {
      setError("Choose a password length between 4 and 256.");
      setResults([]);
      return;
    }

    if (!Number.isFinite(passwordCount) || passwordCount < 1 || passwordCount > 50) {
      setError("Choose between 1 and 50 passwords.");
      setResults([]);
      return;
    }

    if (selectedGroups.length === 0) {
      setError("Select at least one character type.");
      setResults([]);
      return;
    }

    const generated = Array.from({ length: passwordCount }, () =>
      buildPassword(passwordLength, selectedGroups),
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
        Generate strong passwords entirely in the browser with control over
        length, character sets, and quantity.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Password Length"
            type="number"
            value={length}
            onChange={(event) => setLength(event.target.value)}
            slotProps={{ htmlInput: { min: 4, max: 256, step: 1 } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="How Many Passwords"
            type="number"
            value={count}
            onChange={(event) => setCount(event.target.value)}
            slotProps={{ htmlInput: { min: 1, max: 50, step: 1 } }}
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
                checked={includeSymbols}
                onChange={(event) => setIncludeSymbols(event.target.checked)}
              />
            }
            label="Symbols"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="contained" onClick={generatePasswords}>
          Generate Passwords
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
            <Typography variant="h6">Generated Passwords</Typography>
            <Stack spacing={1.5}>
              {results.map((password, index) => (
                <Paper key={`${password}-${index}`} variant="outlined" sx={{ px: 2, py: 1.5 }}>
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
                      {password}
                    </Typography>
                    <Button size="small" variant="outlined" onClick={() => void copyValue(password)}>
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

function buildPassword(length: number, selectedGroups: string[]): string {
  const requiredCharacters = selectedGroups.map((group) => randomCharacter(group));
  const allCharacters = selectedGroups.join("");
  const remainingCharacters = Array.from(
    { length: Math.max(length - requiredCharacters.length, 0) },
    () => randomCharacter(allCharacters),
  );

  return shuffle([...requiredCharacters, ...remainingCharacters]).join("");
}

function randomCharacter(value: string): string {
  return value[randomIndex(value.length)];
}

function randomIndex(length: number): number {
  return crypto.getRandomValues(new Uint32Array(1))[0] % length;
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1);
    const current = next[index];
    next[index] = next[swapIndex];
    next[swapIndex] = current;
  }

  return next;
}
