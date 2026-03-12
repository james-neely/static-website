"use client";

import { useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
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

const PORT_PROFILES = {
  general: {
    label: "General Purpose",
    description: "A safe default range for most local apps and services.",
    min: 1024,
    max: 49151,
  },
  admin: {
    label: "Admin UI",
    description: "Good for dashboards, internal panels, and local admin tools.",
    min: 8000,
    max: 8999,
  },
  web: {
    label: "Web App",
    description: "Commonly used for local frontend and full-stack app development.",
    min: 3000,
    max: 3999,
  },
  data: {
    label: "Data Service",
    description: "Useful for internal APIs, workers, and data-oriented services.",
    min: 5000,
    max: 6999,
  },
} as const;

const COMMON_PORTS = [
  { port: 20, protocol: "TCP", usage: "FTP data transfer" },
  { port: 21, protocol: "TCP", usage: "FTP control" },
  { port: 22, protocol: "TCP", usage: "SSH and SFTP" },
  { port: 25, protocol: "TCP", usage: "SMTP email relay" },
  { port: 53, protocol: "TCP/UDP", usage: "DNS" },
  { port: 80, protocol: "TCP", usage: "HTTP" },
  { port: 110, protocol: "TCP", usage: "POP3 email" },
  { port: 123, protocol: "UDP", usage: "NTP time sync" },
  { port: 143, protocol: "TCP", usage: "IMAP email" },
  { port: 443, protocol: "TCP", usage: "HTTPS" },
  { port: 445, protocol: "TCP", usage: "SMB file sharing" },
  { port: 465, protocol: "TCP", usage: "SMTPS" },
  { port: 587, protocol: "TCP", usage: "SMTP submission" },
  { port: 993, protocol: "TCP", usage: "IMAPS" },
  { port: 995, protocol: "TCP", usage: "POP3S" },
  { port: 1433, protocol: "TCP", usage: "Microsoft SQL Server" },
  { port: 1521, protocol: "TCP", usage: "Oracle Database" },
  { port: 2049, protocol: "TCP/UDP", usage: "NFS" },
  { port: 2375, protocol: "TCP", usage: "Docker daemon (unencrypted)" },
  { port: 2376, protocol: "TCP", usage: "Docker daemon with TLS" },
  { port: 3000, protocol: "TCP", usage: "React and Next.js dev servers" },
  { port: 3306, protocol: "TCP", usage: "MySQL and MariaDB" },
  { port: 3389, protocol: "TCP", usage: "Remote Desktop Protocol" },
  { port: 5432, protocol: "TCP", usage: "PostgreSQL" },
  { port: 5672, protocol: "TCP", usage: "RabbitMQ" },
  { port: 5900, protocol: "TCP", usage: "VNC remote desktop" },
  { port: 6379, protocol: "TCP", usage: "Redis" },
  { port: 8000, protocol: "TCP", usage: "Python and admin app dev servers" },
  { port: 8080, protocol: "TCP", usage: "Alternate HTTP and app servers" },
  { port: 8443, protocol: "TCP", usage: "Alternate HTTPS and admin UIs" },
  { port: 9000, protocol: "TCP", usage: "SonarQube, PHP-FPM, misc services" },
  { port: 9092, protocol: "TCP", usage: "Apache Kafka" },
  { port: 9200, protocol: "TCP", usage: "Elasticsearch" },
  { port: 9418, protocol: "TCP", usage: "Git protocol" },
  { port: 27017, protocol: "TCP", usage: "MongoDB" },
] as const;

const COMMON_PORT_SET = new Set(COMMON_PORTS.map((entry) => entry.port));

type PortProfile = keyof typeof PORT_PROFILES;
type GenerationMode = "random" | "sequential";

function formatNumber(value: number): string {
  return value.toLocaleString();
}

function parseWholeNumber(value: string, fallback: number): number {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function PortGenerator() {
  const [profile, setProfile] = useState<PortProfile>("general");
  const [minPort, setMinPort] = useState("1024");
  const [maxPort, setMaxPort] = useState("49151");
  const [count, setCount] = useState("5");
  const [mode, setMode] = useState<GenerationMode>("random");
  const [skipCommonPorts, setSkipCommonPorts] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");

  const profileDetails = PORT_PROFILES[profile];

  const availability = useMemo(() => {
    const min = parseWholeNumber(minPort, profileDetails.min);
    const max = parseWholeNumber(maxPort, profileDetails.max);

    if (min > max) {
      return { valid: false, availableCount: 0 };
    }

    let availableCount = 0;
    for (let port = min; port <= max; port += 1) {
      if (!skipCommonPorts || !COMMON_PORT_SET.has(port)) {
        availableCount += 1;
      }
    }

    return { valid: true, availableCount };
  }, [maxPort, minPort, profileDetails.max, profileDetails.min, skipCommonPorts]);

  function generatePorts() {
    const min = parseWholeNumber(minPort, profileDetails.min);
    const max = parseWholeNumber(maxPort, profileDetails.max);
    const totalRequested = Math.max(1, parseWholeNumber(count, 5));

    if (min < 1 || max > 65535) {
      setError("Choose a port range between 1 and 65535.");
      setResults([]);
      return;
    }

    if (min > max) {
      setError("Minimum port must be less than or equal to the maximum port.");
      setResults([]);
      return;
    }

    if (mode === "sequential") {
      const sequence = findSequentialPorts(min, max, totalRequested, skipCommonPorts);

      if (sequence.length === 0) {
        setError("No sequential block fits the current filters and range.");
        setResults([]);
        return;
      }

      setError("");
      setResults(sequence);
      return;
    }

    const randomPorts = findRandomPorts(min, max, totalRequested, skipCommonPorts);

    if (randomPorts.length < totalRequested) {
      setError("Not enough matching ports are available in the current range.");
      setResults([]);
      return;
    }

    setError("");
    setResults(randomPorts);
  }

  return (
    <Stack spacing={4}>
      <Typography variant="body1" color="text.secondary">
        Generate local development ports with sensible presets, optional
        filtering for commonly used ports, and support for both random and
        sequential port groups.
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            select
            fullWidth
            label="Port Profile"
            value={profile}
            onChange={(event) => {
              const nextProfile = event.target.value as PortProfile;
              const preset = PORT_PROFILES[nextProfile];
              setProfile(nextProfile);
              setMinPort(String(preset.min));
              setMaxPort(String(preset.max));
              setResults([]);
              setError("");
            }}
            SelectProps={{ native: true }}
          >
            {Object.entries(PORT_PROFILES).map(([value, details]) => (
              <option key={value} value={value}>
                {details.label}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            select
            fullWidth
            label="Generation Mode"
            value={mode}
            onChange={(event) => setMode(event.target.value as GenerationMode)}
            SelectProps={{ native: true }}
          >
            <option value="random">Random Ports</option>
            <option value="sequential">Sequential Ports</option>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label={mode === "random" ? "How Many Random Ports" : "How Many Sequential Ports"}
            type="number"
            value={count}
            onChange={(event) => setCount(event.target.value)}
            slotProps={{ htmlInput: { min: 1, step: 1 } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Minimum Port"
            type="number"
            value={minPort}
            onChange={(event) => setMinPort(event.target.value)}
            slotProps={{ htmlInput: { min: 1, max: 65535, step: 1 } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Maximum Port"
            type="number"
            value={maxPort}
            onChange={(event) => setMaxPort(event.target.value)}
            slotProps={{ htmlInput: { min: 1, max: 65535, step: 1 } }}
          />
        </Grid>
        <Grid size={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={skipCommonPorts}
                onChange={(event) => setSkipCommonPorts(event.target.checked)}
              />
            }
            label="Skip commonly used ports"
          />
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack spacing={1}>
          <Typography variant="h6">{profileDetails.label}</Typography>
          <Typography variant="body2" color="text.secondary">
            {profileDetails.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current filtered availability: {formatNumber(availability.availableCount)} ports
          </Typography>
        </Stack>
      </Paper>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <Button variant="contained" onClick={generatePorts}>
          Generate Ports
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setResults([]);
            setError("");
          }}
          disabled={results.length === 0 && error === ""}
        >
          Clear Results
        </Button>
      </Box>

      {error ? <Alert severity="warning">{error}</Alert> : null}

      {results.length > 0 ? (
        <Paper variant="outlined" sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Generated Ports</Typography>
            <Grid container spacing={2}>
              {results.map((port) => (
                <Grid key={port} size={{ xs: 6, sm: 4, md: 3 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      px: 2,
                      py: 1.5,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Port
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                      {port}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Paper>
      ) : null}

      <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          Common Ports Reference
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="Common ports and typical uses">
            <TableHead>
              <TableRow>
                <TableCell>Port</TableCell>
                <TableCell>Protocol</TableCell>
                <TableCell>Typical Use</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {COMMON_PORTS.map((entry) => (
                <TableRow key={entry.port}>
                  <TableCell>{entry.port}</TableCell>
                  <TableCell>{entry.protocol}</TableCell>
                  <TableCell>{entry.usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}

function isAllowedPort(port: number, skipCommonPorts: boolean): boolean {
  return !skipCommonPorts || !COMMON_PORT_SET.has(port);
}

function findRandomPorts(
  min: number,
  max: number,
  count: number,
  skipCommonPorts: boolean,
): number[] {
  const candidates: number[] = [];

  for (let port = min; port <= max; port += 1) {
    if (isAllowedPort(port, skipCommonPorts)) {
      candidates.push(port);
    }
  }

  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    const current = candidates[index];
    candidates[index] = candidates[swapIndex];
    candidates[swapIndex] = current;
  }

  return candidates.slice(0, count);
}

function findSequentialPorts(
  min: number,
  max: number,
  count: number,
  skipCommonPorts: boolean,
): number[] {
  const startCandidates: number[] = [];

  for (let start = min; start <= max - count + 1; start += 1) {
    let valid = true;

    for (let offset = 0; offset < count; offset += 1) {
      if (!isAllowedPort(start + offset, skipCommonPorts)) {
        valid = false;
        break;
      }
    }

    if (valid) {
      startCandidates.push(start);
    }
  }

  if (startCandidates.length === 0) {
    return [];
  }

  const selectedStart = startCandidates[randomInt(0, startCandidates.length - 1)];
  return Array.from({ length: count }, (_, index) => selectedStart + index);
}
