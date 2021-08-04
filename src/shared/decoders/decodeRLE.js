// import regeneratorRuntime from 'regenerator-runtime';

// import * as wasm from "./../codecs/dicomrle_wasm.js";
// import { memory } from './../codecs/dicomrle_wasm_bg.js';

// wasm.initialize();

// const local = {
//   codec: undefined,
//   decoder: undefined,
//   encoder: undefined,
// };

// async function initCharls() {
//   if (local.codec) {
//     return new Promise(resolve => {
//       resolve();
//     });
//   }

//   const charlsModule = charlsFactory();

//   charlsModule.onRuntimeInitialized = evt => {
//     console.log('runtime initialized...');
//     console.log(evt);
//   };

//   return new Promise(resolve => {
//     charlsModule.then(instance => {
//       local.codec = instance;
//       local.decoder = new instance.JpegLSDecoder();
//       local.encoder = new instance.JpegLSEncoder();
//       resolve();
//     });
//   });
// }

// // imageFrame.pixelRepresentation === 1 <-- Signed
// /**
//  *
//  * @param {*} compressedImageFrame
//  * @param {object}  imageInfo
//  * @param {boolean} imageInfo.signed -
//  */
// async function decodeAsync(compressedImageFrame, imageInfo) {
//   await initCharls();
//   const decoder = local.decoder;

//   // get pointer to the source/encoded bit stream buffer in WASM memory
//   // that can hold the encoded bitstream
//   const encodedBufferInWASM = decoder.getEncodedBuffer(
//     compressedImageFrame.length
//   );

//   // copy the encoded bitstream into WASM memory buffer
//   encodedBufferInWASM.set(compressedImageFrame);

//   // decode it
//   decoder.decode();

//   // get information about the decoded image
//   const frameInfo = decoder.getFrameInfo();
//   const interleaveMode = decoder.getInterleaveMode();
//   const nearLossless = decoder.getNearLossless();

//   // get the decoded pixels
//   const decodedPixelsInWASM = decoder.getDecodedBuffer();
//   const imageFrame = new Uint8Array(decodedPixelsInWASM.length);

//   imageFrame.set(decodedPixelsInWASM);

//   const encodedImageInfo = {
//     columns: frameInfo.width,
//     rows: frameInfo.height,
//     bitsPerPixel: frameInfo.bitsPerSample,
//     signed: imageInfo.signed,
//     bytesPerPixel: imageInfo.bytesPerPixel,
//     componentsPerPixel: frameInfo.componentCount,
//   };

//   // delete the instance.  Note that this frees up memory including the
//   // encodedBufferInWASM and decodedPixelsInWASM invalidating them.
//   // Do not use either after calling delete!
//   // decoder.delete();

//   const pixelData = getPixelData(
//     frameInfo,
//     decodedPixelsInWASM,
//     imageInfo.signed
//   );
//   const encodeOptions = {
//     nearLossless,
//     interleaveMode,
//     frameInfo,
//   };

//   return {
//     ...imageInfo,
//     // imageFrame,
//     // shim
//     pixelData,
//     // end shim
//     imageInfo: encodedImageInfo,
//     encodeOptions,
//     ...encodeOptions,
//     ...encodedImageInfo,
//   };
// }

// function getPixelData(frameInfo, decodedBuffer, signed) {
//   if (frameInfo.bitsPerSample > 8) {
//     if (signed) {
//       return new Int16Array(
//         decodedBuffer.buffer,
//         decodedBuffer.byteOffset,
//         decodedBuffer.byteLength / 2
//       );
//     }

//     return new Uint16Array(
//       decodedBuffer.buffer,
//       decodedBuffer.byteOffset,
//       decodedBuffer.byteLength / 2
//     );
//   }

//   return decodedBuffer;
// }

// export default decodeAsync;
