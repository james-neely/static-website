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

const FIRST_NAMES = [
  "Aiden",
  "Amelia",
  "Avery",
  "Benjamin",
  "Chloe",
  "Daniel",
  "Eleanor",
  "Elijah",
  "Evelyn",
  "Gabriel",
  "Grace",
  "Hannah",
  "Henry",
  "Isla",
  "Jack",
  "James",
  "Layla",
  "Levi",
  "Liam",
  "Lucas",
  "Mason",
  "Mia",
  "Noah",
  "Olivia",
  "Owen",
  "Samuel",
  "Scarlett",
  "Sophia",
  "Theodore",
  "Zoe",
] as const;

const LAST_NAMES = [
  "Anderson",
  "Bennett",
  "Brooks",
  "Campbell",
  "Carter",
  "Collins",
  "Cooper",
  "Davis",
  "Edwards",
  "Foster",
  "Garcia",
  "Gray",
  "Harris",
  "Hayes",
  "Jenkins",
  "Kelly",
  "Long",
  "Mitchell",
  "Morgan",
  "Morris",
  "Parker",
  "Perry",
  "Reed",
  "Richardson",
  "Rivera",
  "Russell",
  "Simmons",
  "Taylor",
  "Turner",
  "Walker",
] as const;

export default function RandomNameGenerator() {
  const [count, setCount] = useState("8");
  const [includeMiddleInitial, setIncludeMiddleInitial] = useState(false);
  const [includeSuffix, setIncludeSuffix] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copiedValue, setCopiedValue] = useState("");

  function generateNames() {
    const total = Number.parseInt(count, 10);

    if (!Number.isFinite(total) || total < 1 || total > 100) {
      setError("Choose between 1 and 100 names.");
      setResults([]);
      return;
    }

    const generated = Array.from({ length: total }, () =>
      buildRandomName(includeMiddleInitial, includeSuffix),
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
        Generate random first and last names for demos, mock users, examples,
        and test data entirely in the browser.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="How Many Names"
            type="number"
            value={count}
            onChange={(event) => setCount(event.target.value)}
            slotProps={{ htmlInput: { min: 1, max: 100, step: 1 } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeMiddleInitial}
                onChange={(event) => setIncludeMiddleInitial(event.target.checked)}
              />
            }
            label="Include middle initial"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeSuffix}
                onChange={(event) => setIncludeSuffix(event.target.checked)}
              />
            }
            label="Include suffix"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="contained" onClick={generateNames}>
          Generate Names
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
            <Typography variant="h6">Generated Names</Typography>
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

function buildRandomName(includeMiddleInitial: boolean, includeSuffix: boolean): string {
  const firstName = FIRST_NAMES[randomIndex(FIRST_NAMES.length)];
  const lastName = LAST_NAMES[randomIndex(LAST_NAMES.length)];
  const middleInitial = includeMiddleInitial
    ? ` ${String.fromCharCode(65 + randomIndex(26))}.`
    : "";
  const suffix = includeSuffix ? [" Jr.", " Sr.", " II", " III"][randomIndex(4)] : "";

  return `${firstName}${middleInitial} ${lastName}${suffix}`;
}

function randomIndex(length: number): number {
  return crypto.getRandomValues(new Uint32Array(1))[0] % length;
}
