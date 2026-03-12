"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function encodeValue() {
    setOutput(encodeURIComponent(input));
    setError("");
    setCopied(false);
  }

  function decodeValue() {
    try {
      setOutput(decodeURIComponent(input));
      setError("");
      setCopied(false);
    } catch {
      setOutput("");
      setError("That value could not be decoded as a valid URL-encoded string.");
      setCopied(false);
    }
  }

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(output);
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
        Encode and decode URL-safe strings directly in the browser for query
        params, redirects, callbacks, and debugging.
      </Typography>

      <TextField
        multiline
        minRows={6}
        maxRows={14}
        fullWidth
        label="Input"
        placeholder="Paste text or a URL-encoded value here..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="contained" onClick={encodeValue}>
          Encode
        </Button>
        <Button variant="contained" color="secondary" onClick={decodeValue}>
          Decode
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
            setCopied(false);
          }}
          disabled={input === "" && output === "" && error === ""}
        >
          Clear
        </Button>
      </Box>

      {error ? <Alert severity="warning">{error}</Alert> : null}
      {copied ? <Alert severity="success">Copied result to clipboard.</Alert> : null}

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Output</Typography>
          <TextField multiline minRows={6} fullWidth value={output} InputProps={{ readOnly: true }} />
          <Box>
            <Button variant="outlined" onClick={() => void copyValue()} disabled={output === ""}>
              Copy Output
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
}
