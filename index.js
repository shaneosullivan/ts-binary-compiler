#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function showUsage() {
  console.log('Usage: tsbc <input_file> [output_path]');
  console.log('');
  console.log('Arguments:');
  console.log('  input_file   - TypeScript file to compile (required)');
  console.log('  output_path  - Output file or directory (optional, defaults to current directory)');
  console.log('                 If directory: uses input filename without extension');
  console.log('                 If file: uses exact path');
  console.log('                 On Windows: adds .exe extension if not specified');
  console.log('');
  console.log('Environment variables:');
  console.log('  TEMP_DIR     - Directory for temporary artifacts (default: ~/.ts-binary-compiler)');
  console.log('');
  console.log('Examples:');
  console.log('  tsbc main.ts                           # Output: ./main (or ./main.exe on Windows)');
  console.log('  tsbc main.ts myapp                     # Output: ./myapp (or ./myapp.exe on Windows)');
  console.log('  tsbc main.ts ./build/                  # Output: ./build/main (or ./build/main.exe on Windows)');
  console.log('  tsbc main.ts ./build/myapp             # Output: ./build/myapp');
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showUsage();
    process.exit(args.length === 0 ? 1 : 0);
  }

  const packageRoot = path.dirname(__filename);
  const buildScript = path.join(packageRoot, 'build.sh');
  const userCwd = process.cwd();

  // Check if build.sh exists
  if (!fs.existsSync(buildScript)) {
    console.error('❌ Error: build.sh not found in package directory');
    console.error('Package may not be properly installed');
    process.exit(1);
  }

  // Resolve input file path relative to user's current directory
  const inputFile = args[0];
  const absoluteInputPath = path.isAbsolute(inputFile)
    ? inputFile
    : path.join(userCwd, inputFile);

  // Check if input file exists
  if (!fs.existsSync(absoluteInputPath)) {
    console.error(`❌ Error: Input file not found: ${inputFile}`);
    process.exit(1);
  }

  // Resolve output path relative to user's current directory (if provided)
  let outputPath = args[1];
  if (outputPath && !path.isAbsolute(outputPath)) {
    outputPath = path.join(userCwd, outputPath);
  }

  // Build arguments with absolute paths
  const buildArgs = [absoluteInputPath];
  if (outputPath) {
    buildArgs.push(outputPath);
  }

  // Set environment variable for package root so build.sh can find its resources
  const env = {
    ...process.env,
    TSBC_PACKAGE_ROOT: packageRoot
  };

  // Execute build.sh from user's directory with absolute paths
  const child = spawn('bash', [buildScript, ...buildArgs], {
    stdio: 'inherit',
    cwd: userCwd,
    env: env
  });

  child.on('close', (code) => {
    process.exit(code);
  });

  child.on('error', (err) => {
    console.error('❌ Error executing build script:', err.message);
    process.exit(1);
  });
}

main();