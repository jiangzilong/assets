const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

function extractCrx(crxPath, outputDir) {
  // Read the CRX file
  const crxBuffer = fs.readFileSync(crxPath);

  // Check the magic number
  if (crxBuffer.toString("utf8", 0, 4) !== "Cr24") {
    throw new Error("Invalid CRX magic number");
  }

  // Read the version
  const version = crxBuffer.readUInt32LE(4);
  if (version !== 2 && version !== 3) {
    throw new Error("Unsupported CRX version: " + version);
  }

  // Read the header size
  const headerSize = crxBuffer.readUInt32LE(8);

  // Extract the zip file
  const zipStartOffset = 12 + headerSize;
  const zipBuffer = crxBuffer.slice(zipStartOffset);
  const zip = new AdmZip(zipBuffer);
  zip.extractAllTo(outputDir, true);

  console.log(`Extracted to ${outputDir}`);
}

// Replace with your CRX file path and output directory
const crxPath = "../ext-new.crx";
const outputDir = "./output";

extractCrx(crxPath, outputDir);