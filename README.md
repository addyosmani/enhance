# Enhance

![meta](https://github.com/user-attachments/assets/5b950f80-3d5e-449f-97ff-09804603566d)

Enhance is an AI-powered image enhancement tool that lets you upscale and improve image quality directly in your browser. Try it out at [enhance.addy.ie](https://enhance.addy.ie)

## Features

- 🖼️ **Multiple Enhancement Models**:
  - ESRGAN models for upscaling (2x, 3x, 4x, 8x)
  - MAXIM models for specific enhancements:
    - Deblurring
    - Denoising
    - Low-light enhancement
    - Photo retouching
    - Rain removal
    - Indoor dehazing

- 🎯 **Smart Image Processing**:
  - Automatic image size optimization
  - WebGL-aware processing
  - Efficient patch-based processing
  - Progress tracking

- 🎨 **User-Friendly Interface**:
  - Drag-and-drop image upload
  - Real-time image preview
  - Interactive size adjustment
  - Aspect ratio lock/unlock
  - One-click download

## Technical Details

### Models

- **ESRGAN Models**:
  - Slim (2.5MB): Fast, lightweight model for general use
  - Medium (5MB): Balanced performance and quality
  - Thick (12MB): High-quality upscaling with better detail preservation
  - Default (2MB): Standard upscaling model

- **MAXIM Models** (8MB each):
  - Specialized models for specific image enhancement tasks
  - Optimized for 64x64 patches
  - Automatic input size adjustment

### Implementation

- Built with React and TypeScript
- Uses TensorFlow.js for model inference
- WebGL acceleration for processing
- Efficient memory management
- Progressive enhancement support

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Support

Enhance works in modern browsers that support:
- WebGL 2.0
- WebAssembly
- Modern JavaScript features

## License

MIT © [Addy Osmani](https://github.com/addyosmani)

## Acknowledgments

- [ESRGAN](https://github.com/xinntao/ESRGAN) for the base super-resolution models
- [MAXIM](https://github.com/google-research/maxim) for the enhancement models
- [TensorFlow.js](https://www.tensorflow.org/js) team for the web ML runtime
