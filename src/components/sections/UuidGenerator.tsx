"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const UUID_VERSIONS = [
  {
    value: "v7",
    label: "UUIDv7",
    summary: "Newest general-purpose choice with time ordering for modern systems.",
  },
  {
    value: "v6",
    label: "UUIDv6",
    summary: "Time-ordered legacy-friendly layout derived from UUIDv1 timestamps.",
  },
  {
    value: "v4",
    label: "UUIDv4",
    summary: "Random-only UUID that remains widely used and easy to integrate.",
  },
  {
    value: "v1",
    label: "UUIDv1",
    summary: "Older timestamp-based UUID that some existing systems still expect.",
  },
] as const;

const UUID_REFERENCE = [
  {
    version: "UUIDv7",
    typicalUse: "Recommended default for new apps, databases, and APIs",
    notes: "Time-ordered and random enough for general use",
  },
  {
    version: "UUIDv6",
    typicalUse: "Ordered identifiers in systems that previously used UUIDv1",
    notes: "Reorders timestamp bits for better sort behavior",
  },
  {
    version: "UUIDv4",
    typicalUse: "General random identifiers and older integrations",
    notes: "No embedded timestamp",
  },
  {
    version: "UUIDv1",
    typicalUse: "Compatibility with legacy timestamp-based workflows",
    notes: "Includes time-based structure and older semantics",
  },
] as const;

const UUID_EPOCH_OFFSET = BigInt("0x01b21dd213814000");
const BIGINT_MASK_32 = BigInt("0xffffffff");
const BIGINT_MASK_16 = BigInt("0xffff");
const BIGINT_MASK_12 = BigInt("0x0fff");
const BIGINT_SHIFT_12 = BigInt(12);
const BIGINT_SHIFT_28 = BigInt(28);
const BIGINT_SHIFT_32 = BigInt(32);
const BIGINT_SHIFT_48 = BigInt(48);
const BIGINT_TICKS_PER_MILLISECOND = BigInt(10000);

type UuidVersion = (typeof UUID_VERSIONS)[number]["value"];

export default function UuidGenerator() {
  const [version, setVersion] = useState<UuidVersion>("v7");
  const [count, setCount] = useState("5");
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copiedUuid, setCopiedUuid] = useState("");

  const activeVersion = UUID_VERSIONS.find((entry) => entry.value === version) ?? UUID_VERSIONS[0];

  function generateUuids() {
    const total = Number.parseInt(count, 10);

    if (!Number.isFinite(total) || total < 1 || total > 100) {
      setError("Choose a quantity between 1 and 100.");
      setResults([]);
      return;
    }

    const generated = Array.from({ length: total }, () => generateUuid(version));
    setError("");
    setCopiedUuid("");
    setResults(generated);
  }

  async function copyUuid(uuid: string) {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedUuid(uuid);
      setError("");
    } catch {
      setCopiedUuid("");
      setError("Copy to clipboard is not available in this browser.");
    }
  }

  return (
    <Stack spacing={4}>
      <Typography variant="body1" color="text.secondary">
        Generate modern UUIDs with UUIDv7 selected by default, while still
        supporting earlier versions for compatibility with existing systems.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            label="UUID Version"
            value={version}
            onChange={(event) => setVersion(event.target.value as UuidVersion)}
            SelectProps={{ native: true }}
          >
            {UUID_VERSIONS.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="How Many UUIDs"
            type="number"
            value={count}
            onChange={(event) => setCount(event.target.value)}
            slotProps={{ htmlInput: { min: 1, max: 100, step: 1 } }}
          />
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack spacing={1}>
          <Typography variant="h6">{activeVersion.label}</Typography>
          <Typography variant="body2" color="text.secondary">
            {activeVersion.summary}
          </Typography>
        </Stack>
      </Paper>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="contained" onClick={generateUuids}>
          Generate UUIDs
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setResults([]);
            setError("");
            setCopiedUuid("");
          }}
          disabled={results.length === 0 && error === ""}
        >
          Clear Results
        </Button>
      </Box>

      {error ? <Alert severity="warning">{error}</Alert> : null}
      {copiedUuid ? <Alert severity="success">Copied UUID to clipboard.</Alert> : null}

      {results.length > 0 ? (
        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Generated UUIDs</Typography>
            <Stack spacing={1.5}>
              {results.map((uuid, index) => (
                <Paper key={`${uuid}-${index}`} variant="outlined" sx={{ px: 2, py: 1.5 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    alignItems={{ xs: "stretch", sm: "center" }}
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {uuid}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        void copyUuid(uuid);
                      }}
                    >
                      Copy
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
      ) : null}

      <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          UUID Version Reference
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="UUID versions and typical uses">
            <TableHead>
              <TableRow>
                <TableCell>Version</TableCell>
                <TableCell>Typical Use</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {UUID_REFERENCE.map((entry) => (
                <TableRow key={entry.version}>
                  <TableCell>{entry.version}</TableCell>
                  <TableCell>{entry.typicalUse}</TableCell>
                  <TableCell>{entry.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}

function generateUuid(version: UuidVersion): string {
  switch (version) {
    case "v1":
      return generateUuidV1();
    case "v4":
      return generateUuidV4();
    case "v6":
      return generateUuidV6();
    case "v7":
    default:
      return generateUuidV7();
  }
}

function generateUuidV1(): string {
  const bytes = new Uint8Array(16);
  const timestamp = createGregorianTimestamp();
  const timeLow = Number(timestamp & BIGINT_MASK_32);
  const timeMid = Number((timestamp >> BIGINT_SHIFT_32) & BIGINT_MASK_16);
  const timeHigh = Number((timestamp >> BIGINT_SHIFT_48) & BIGINT_MASK_12);
  const clockSequence = random14BitNumber();
  const node = randomBytes(6);

  node[0] |= 0x01;

  bytes[0] = (timeLow >>> 24) & 0xff;
  bytes[1] = (timeLow >>> 16) & 0xff;
  bytes[2] = (timeLow >>> 8) & 0xff;
  bytes[3] = timeLow & 0xff;
  bytes[4] = (timeMid >>> 8) & 0xff;
  bytes[5] = timeMid & 0xff;
  bytes[6] = ((timeHigh >>> 8) & 0x0f) | 0x10;
  bytes[7] = timeHigh & 0xff;
  bytes[8] = ((clockSequence >>> 8) & 0x3f) | 0x80;
  bytes[9] = clockSequence & 0xff;
  bytes.set(node, 10);

  return bytesToUuid(bytes);
}

function generateUuidV4(): string {
  const bytes = randomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return bytesToUuid(bytes);
}

function generateUuidV6(): string {
  const bytes = new Uint8Array(16);
  const timestamp = createGregorianTimestamp();
  const reorderedHigh = Number((timestamp >> BIGINT_SHIFT_28) & BIGINT_MASK_32);
  const reorderedMid = Number((timestamp >> BIGINT_SHIFT_12) & BIGINT_MASK_16);
  const reorderedLow = Number(timestamp & BIGINT_MASK_12);
  const clockSequence = random14BitNumber();
  const node = randomBytes(6);

  node[0] |= 0x01;

  bytes[0] = (reorderedHigh >>> 24) & 0xff;
  bytes[1] = (reorderedHigh >>> 16) & 0xff;
  bytes[2] = (reorderedHigh >>> 8) & 0xff;
  bytes[3] = reorderedHigh & 0xff;
  bytes[4] = (reorderedMid >>> 8) & 0xff;
  bytes[5] = reorderedMid & 0xff;
  bytes[6] = ((reorderedLow >>> 8) & 0x0f) | 0x60;
  bytes[7] = reorderedLow & 0xff;
  bytes[8] = ((clockSequence >>> 8) & 0x3f) | 0x80;
  bytes[9] = clockSequence & 0xff;
  bytes.set(node, 10);

  return bytesToUuid(bytes);
}

function generateUuidV7(): string {
  const bytes = randomBytes(16);
  const timestamp = Date.now();

  bytes[0] = (timestamp / 0x10000000000) & 0xff;
  bytes[1] = (timestamp / 0x100000000) & 0xff;
  bytes[2] = (timestamp >>> 24) & 0xff;
  bytes[3] = (timestamp >>> 16) & 0xff;
  bytes[4] = (timestamp >>> 8) & 0xff;
  bytes[5] = timestamp & 0xff;
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return bytesToUuid(bytes);
}

function createGregorianTimestamp(): bigint {
  const unixMilliseconds = BigInt(Date.now());
  const subMillisecondTicks = BigInt(randomInt(0, 9_999));
  return unixMilliseconds * BIGINT_TICKS_PER_MILLISECOND + UUID_EPOCH_OFFSET + subMillisecondTicks;
}

function random14BitNumber(): number {
  const bytes = randomBytes(2);
  return ((bytes[0] << 8) | bytes[1]) & 0x3fff;
}

function randomBytes(length: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length));
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function bytesToUuid(bytes: Uint8Array): string {
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}
