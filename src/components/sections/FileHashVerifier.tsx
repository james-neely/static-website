"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const ALGORITHMS = [
  { value: "SHA-256", label: "SHA-256" },
  { value: "SHA-384", label: "SHA-384" },
  { value: "SHA-512", label: "SHA-512" },
] as const;

type HashAlgorithmName = (typeof ALGORITHMS)[number]["value"];

export default function FileHashVerifier() {
  const [algorithm, setAlgorithm] = useState<HashAlgorithmName>("SHA-256");
  const [file, setFile] = useState<File | null>(null);
  const [expectedHash, setExpectedHash] = useState("");
  const [calculatedHash, setCalculatedHash] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "match" | "mismatch">("idle");
  const [copied, setCopied] = useState(false);

  async function calculateHash() {
    if (!file) {
      setError("Choose a file before verifying.");
      setCalculatedHash("");
      setStatus("idle");
      return;
    }

    try {
      const fileBuffer = await file.arrayBuffer();
      const digest = await crypto.subtle.digest(algorithm, fileBuffer);
      const hexDigest = toHex(digest);
      const normalizedExpected = normalizeHash(expectedHash);

      setCalculatedHash(hexDigest);
      setError("");
      setCopied(false);

      if (normalizedExpected === "") {
        setStatus("idle");
        return;
      }

      setStatus(normalizedExpected === hexDigest ? "match" : "mismatch");
    } catch {
      setCalculatedHash("");
      setStatus("idle");
      setError("This browser could not calculate the requested hash.");
    }
  }

  async function copyHash() {
    try {
      await navigator.clipboard.writeText(calculatedHash);
      setCopied(true);
      setError("");
    } catch {
      setCopied(false);
      setError("Copy to clipboard is not available in this browser.");
    }
  }

  return (
    <Stack spacing={4}>
      <Typography variant="body1" color="text.secondary">
        Verify a file in the browser by calculating its hash and comparing it to
        an expected signature value you provide.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            label="Hash Algorithm"
            value={algorithm}
            onChange={(event) => setAlgorithm(event.target.value as HashAlgorithmName)}
            SelectProps={{ native: true }}
          >
            {ALGORITHMS.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Button variant="outlined" component="label" sx={{ height: "56px", width: "100%" }}>
            {file ? `Selected: ${file.name}` : "Choose File"}
            <input
              hidden
              type="file"
              onChange={(event) => {
                const nextFile = event.target.files?.[0] ?? null;
                setFile(nextFile);
                setCalculatedHash("");
                setStatus("idle");
                setError("");
                setCopied(false);
              }}
            />
          </Button>
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Expected Hash (Optional)"
            placeholder="Paste a known SHA-256, SHA-384, or SHA-512 digest to compare against"
            value={expectedHash}
            onChange={(event) => setExpectedHash(event.target.value)}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="contained" onClick={() => void calculateHash()}>
          Calculate and Verify
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setFile(null);
            setExpectedHash("");
            setCalculatedHash("");
            setError("");
            setStatus("idle");
            setCopied(false);
          }}
          disabled={!file && expectedHash === "" && calculatedHash === "" && error === ""}
        >
          Clear
        </Button>
      </Box>

      {error ? <Alert severity="warning">{error}</Alert> : null}
      {copied ? <Alert severity="success">Copied hash to clipboard.</Alert> : null}
      {status === "match" ? (
        <Alert severity="success">The calculated hash matches the expected value.</Alert>
      ) : null}
      {status === "mismatch" ? (
        <Alert severity="error">The calculated hash does not match the expected value.</Alert>
      ) : null}

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Calculated Hash</Typography>
          <TextField
            multiline
            minRows={4}
            fullWidth
            value={calculatedHash}
            placeholder="Calculated digest will appear here..."
            InputProps={{ readOnly: true }}
          />
          <Box>
            <Button variant="outlined" onClick={() => void copyHash()} disabled={calculatedHash === ""}>
              Copy Hash
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
}

function normalizeHash(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
