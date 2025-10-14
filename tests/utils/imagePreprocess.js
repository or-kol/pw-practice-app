const sharp = require('sharp');

/**
 * Preprocesses an image for OCR by converting to grayscale, thresholding, sharpening, and increasing contrast.
 * Optionally crops to a region if specified.
 * @param {string} inputPath - Path to the input image file.
 * @param {string} outputPath - Path to save the preprocessed image.
 * @param {object} [crop] - Optional crop region: { left, top, width, height }
 */
async function preprocessImage(inputPath, outputPath, crop) {
  let img = sharp(inputPath)
    .grayscale()
    .threshold(180)
    .sharpen()
    .modulate({ contrast: 2 });

  if (crop) {
    img = img.extract(crop);
  }

  await img.toFile(outputPath);
}

module.exports = { preprocessImage };
