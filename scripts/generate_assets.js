import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const assetsDir = path.resolve(process.cwd(), 'public/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 1. Mausam Brand Logo (The Weather Beetle / Shield)
const mausamLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Background transparent -->
  <g>
    <!-- Top Blue Head & Antennae -->
    <!-- Antennae -->
    <path d="M 185 105 C 160 80, 140 45, 175 42 C 205 38, 205 75, 215 102 Z" fill="#0088cc" />
    <path d="M 327 105 C 352 80, 372 45, 337 42 C 307 38, 307 75, 297 102 Z" fill="#0088cc" />
    
    <!-- Top Dome Head -->
    <path d="M 80 185 C 80 185, 130 65, 256 65 C 382 65, 432 185, 432 185 Z" fill="#0088cc" />
    
    <!-- Left Wing (Olive Green with Lightning) -->
    <path d="M 70 205 C 68 335, 160 455, 246 458 L 246 205 Z" fill="#9dbd28" />
    
    <!-- Right Wing (Olive Green with Snowflake & Droplet) -->
    <path d="M 266 205 L 266 458 C 352 455, 444 335, 442 205 Z" fill="#9dbd28" />

    <!-- Separator Gap Lines (White) -->
    <!-- Curved Arch under Blue Head -->
    <path d="M 66 195 Q 256 168 446 195" fill="none" stroke="#ffffff" stroke-width="16" stroke-linecap="round" />
    <!-- Vertical Center Divider -->
    <line x1="256" y1="180" x2="256" y2="465" stroke="#ffffff" stroke-width="16" stroke-linecap="round" />

    <!-- Left Wing: White Lightning Bolt -->
    <polygon points="198,225 120,318 178,318 135,378 214,282 158,282" fill="#ffffff" />

    <!-- Right Wing Top: White Snowflake -->
    <g transform="translate(354, 276)" stroke="#ffffff" stroke-width="9" stroke-linecap="round">
      <!-- 6 radiating branches -->
      <!-- branch 1: 90 deg (up) -->
      <line x1="0" y1="-44" x2="0" y2="44" />
      <path d="M -13 -28 L 0 -18 L 13 -28" fill="none" />
      <path d="M -13 28 L 0 18 L 13 28" fill="none" />
      
      <!-- branch 2: 30 deg -->
      <line x1="-38" y1="-22" x2="38" y2="22" />
      <path d="M -30 -6 L -19 -11 L -14 -24" fill="none" />
      <path d="M 30 6 L 19 11 L 14 24" fill="none" />
      
      <!-- branch 3: 150 deg -->
      <line x1="38" y1="-22" x2="-38" y2="22" />
      <path d="M 14 -24 L 19 -11 L 30 -6" fill="none" />
      <path d="M -14 24 L -19 11 L -30 6" fill="none" />
      
      <!-- Center node -->
      <circle cx="0" cy="0" r="4" fill="#ffffff" />
    </g>

    <!-- Right Wing Bottom: White Water Droplet -->
    <path d="M 354 345 C 354 345, 326 385, 326 405 C 326 422, 338 434, 354 434 C 370 434, 382 422, 382 405 C 382 385, 354 345, 354 345 Z" fill="#ffffff" />
  </g>
</svg>`;

// 2. Commuter Logo (Flame + Snowflake Dual Extremes)
const commuterLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <g fill="#111827">
    <!-- Left Half: Stylized Flame -->
    <path d="M 230 108 C 215 150, 240 185, 235 228 C 230 265, 190 285, 185 305 C 178 335, 202 360, 206 395 C 195 385, 172 345, 178 300 C 182 270, 218 240, 222 205 C 226 170, 195 145, 230 108 Z" />
    <path d="M 235 105 C 210 160, 242 205, 230 250 C 220 290, 160 315, 140 355 C 120 395, 138 440, 190 470 C 130 450, 105 380, 128 320 C 150 260, 218 220, 228 150 C 232 135, 230 115, 235 105 Z" />
    
    <!-- Center Spine & Right Half: Geometric Snowflake -->
    <line x1="256" y1="160" x2="256" y2="445" stroke="#111827" stroke-width="16" stroke-linecap="round" />
    
    <!-- Snowflake branch 1 (Top-diagonal: ~40 deg) -->
    <g stroke="#111827" stroke-width="16" stroke-linecap="round" stroke-linejoin="miter">
      <line x1="256" y1="260" x2="350" y2="185" />
      <!-- Upper spur 1 -->
      <polyline points="295,190 325,180 340,210" fill="none" />
      <polyline points="265,225 295,215 310,245" fill="none" />
      
      <!-- Snowflake branch 2 (Middle horizontal) -->
      <line x1="256" y1="300" x2="385" y2="300" />
      <!-- Middle spur -->
      <polyline points="350,265 370,300 350,335" fill="none" />
      <polyline points="305,265 325,300 305,335" fill="none" />

      <!-- Snowflake branch 3 (Bottom-diagonal: ~-40 deg) -->
      <line x1="256" y1="340" x2="350" y2="415" />
      <!-- Bottom spur -->
      <polyline points="295,410 325,420 340,390" fill="none" />
      <polyline points="265,375 295,385 310,355" fill="none" />
    </g>
  </g>
</svg>`;

// 3. Family Logo (Parents embracing children)
const familyLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Parent 1 (Left / Dark Charcoal) -->
  <!-- Head -->
  <circle cx="225" cy="150" r="44" fill="#3f474e" />
  <!-- Left Wrapping Body -->
  <path d="M 278 200 C 230 200, 140 225, 128 310 C 115 390, 190 460, 242 470 C 185 440, 150 375, 172 305 C 190 250, 240 236, 278 236 Z" fill="#3f474e" />

  <!-- Parent 2 (Right / Medium Slate) -->
  <!-- Head -->
  <circle cx="305" cy="186" r="32" fill="#717a82" />
  <!-- Right Wrapping Body -->
  <path d="M 285 240 C 330 240, 385 270, 385 345 C 385 410, 330 468, 220 488 C 300 465, 345 420, 342 360 C 340 310, 310 270, 280 268 Z" fill="#717a82" />

  <!-- Inner Cradle & Children -->
  <!-- Child 1 Head -->
  <circle cx="236" cy="272" r="28" fill="#656e75" />
  <!-- Child 2 Head -->
  <circle cx="298" cy="272" r="26" fill="#656e75" />
  <!-- Swaddle / Crescent Embrace -->
  <path d="M 184 316 C 184 316, 240 380, 340 286 C 332 346, 252 368, 184 316 Z" fill="#656e75" />
</svg>`;

// 4. Farmer Logo (Farmer with hat holding wheat harvest in field)
const farmerLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <g fill="none" stroke="#111827" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <!-- Conical Hat -->
    <path d="M 172 170 C 155 135, 180 110, 205 115 C 235 120, 260 120, 260 148 C 245 152, 230 152, 218 152 C 185 152, 172 170, 172 170 Z" fill="#ffffff" />
    <path d="M 172 170 C 172 170, 200 135, 232 145 C 255 152, 265 170, 265 170" />
    <path d="M 160 185 C 160 185, 195 120, 245 125 C 258 128, 265 155, 245 180 Z" />
    <!-- Hat Brim Arc -->
    <path d="M 160 185 C 190 140, 250 145, 260 180" />

    <!-- Face profile & Neck -->
    <path d="M 218 178 C 235 182, 240 195, 235 212 C 230 222, 222 225, 226 235 C 230 245, 235 252, 235 252" />
    <path d="M 198 185 C 198 205, 206 220, 214 235" />
    <!-- Collar & Sleeveless Vest -->
    <path d="M 214 235 C 218 248, 228 268, 232 272 C 240 255, 248 245, 252 235" />
    <path d="M 180 230 C 195 220, 214 235, 214 235" />

    <!-- Left Arm & Chest -->
    <path d="M 178 230 C 145 255, 132 300, 132 345 C 132 355, 160 365, 215 365" />
    <!-- Torso vest line -->
    <path d="M 170 345 C 162 375, 165 415, 168 440" />

    <!-- Hands & Arms holding wheat sheaf -->
    <path d="M 215 365 C 235 365, 250 348, 250 338 C 250 328, 240 325, 228 332 C 220 338, 208 348, 215 365" />
    <path d="M 252 332 C 265 330, 280 338, 275 350 C 270 358, 255 362, 248 358" />

    <!-- Wheat Sheaf Bundle (Fanning out to the right) -->
    <path d="M 240 335 L 370 230" />
    <path d="M 245 342 L 395 242" />
    <path d="M 250 348 L 412 275" />
    <path d="M 235 330 L 360 220" />
    <path d="M 248 355 L 390 310" />
    <path d="M 245 338 L 380 255" stroke-width="9" />

    <!-- Wheat grains/awns on sheaf -->
    <path d="M 330 255 L 350 240 M 345 268 L 372 248 M 365 285 L 392 262" />
    <path d="M 315 280 L 335 260 M 340 295 L 368 275 M 360 310 L 388 290" />
    <path d="M 350 225 L 360 215 M 370 235 L 385 220 M 390 250 L 408 235" />

    <!-- Sprouting Wheat in Foreground -->
    <!-- Plant 1 -->
    <g transform="translate(295, 330)">
      <line x1="0" y1="90" x2="0" y2="15" stroke-width="8" />
      <path d="M -12 40 C -12 25, 0 15, 0 15 C 0 15, 12 25, 12 40 Z" fill="#ffffff" />
      <path d="M -15 58 C -15 45, 0 35, 0 35 C 0 35, 15 45, 15 58 Z" fill="#ffffff" />
      <path d="M -15 76 C -15 65, 0 55, 0 55 C 0 55, 15 65, 15 76 Z" fill="#ffffff" />
      <!-- Lower leaves -->
      <path d="M 0 75 C -25 70, -30 95, -30 95" />
      <path d="M 0 80 C 25 75, 30 95, 30 95" />
    </g>

    <!-- Plant 2 -->
    <g transform="translate(340, 335)">
      <line x1="0" y1="85" x2="0" y2="20" stroke-width="8" />
      <path d="M -12 42 C -12 28, 0 20, 0 20 C 0 20, 12 28, 12 42 Z" fill="#ffffff" />
      <path d="M -14 60 C -14 48, 0 40, 0 40 C 0 40, 14 48, 14 60 Z" fill="#ffffff" />
      <path d="M -14 78 C -14 66, 0 58, 0 58 C 0 58, 14 66, 14 78 Z" fill="#ffffff" />
      <!-- Lower leaves -->
      <path d="M 0 75 C 20 70, 24 90, 24 90" />
    </g>

    <!-- Grass blades along the bottom -->
    <path d="M 125 425 L 128 395 M 135 435 L 140 390 M 145 430 L 150 405 M 158 440 L 160 398" />
    <path d="M 220 435 L 222 400 M 230 440 L 235 395 M 245 435 L 246 410 M 260 435 L 265 400" />
    <path d="M 320 435 L 324 415 M 365 435 L 368 410 M 378 438 L 380 415 M 390 435 L 392 420" />
  </g>
</svg>`;

// 5. Traveler Logo (Vintage Camper Van on Horizon)
const travelerLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <g fill="#273344">
    <!-- Van Body -->
    <path d="M 135 315 L 135 240 C 135 210, 175 185, 235 185 L 335 185 C 365 185, 385 200, 395 230 L 395 315 Z" />
    
    <!-- Van Lower Chassis & Bumpers -->
    <path d="M 130 310 L 400 310 C 405 310, 408 316, 405 320 L 390 326 C 390 326, 380 326, 375 326 L 142 326 C 138 326, 126 322, 126 318 Z" />
    
    <!-- Van Wheels cutouts -->
    <circle cx="198" cy="328" r="28" fill="#273344" />
    <circle cx="342" cy="328" r="28" fill="#273344" />
    <circle cx="198" cy="328" r="14" fill="#ffffff" />
    <circle cx="342" cy="328" r="14" fill="#ffffff" />

    <!-- Van Windows (Cutouts / White in graphic) -->
    <!-- Front/Driver Quarter Window (Curved) -->
    <path d="M 160 215 C 180 205, 205 205, 218 205 L 218 250 L 160 250 C 154 235, 154 222, 160 215 Z" fill="#ffffff" />
    <!-- Center Passenger Window -->
    <rect x="230" y="205" width="65" height="45" rx="6" fill="#ffffff" />
    <!-- Rear Window -->
    <path d="M 307 205 L 360 205 C 368 205, 374 215, 372 230 L 368 250 L 307 250 Z" fill="#ffffff" />

    <!-- Door handle seam -->
    <rect x="304" y="260" width="18" height="4" rx="2" fill="#ffffff" />

    <!-- Curved Horizon / Road Arch -->
    <path d="M 105 372 Q 256 342 430 372 C 400 370, 256 348, 105 372 Z" fill="#273344" />
  </g>
</svg>`;

const assets = [
  { name: 'mausam-logo', svg: mausamLogoSvg },
  { name: 'commuter', svg: commuterLogoSvg },
  { name: 'family', svg: familyLogoSvg },
  { name: 'farmer', svg: farmerLogoSvg },
  { name: 'traveler', svg: travelerLogoSvg },
];

console.log('Generating assets in:', assetsDir);

for (const asset of assets) {
  const svgPath = path.join(assetsDir, `${asset.name}.svg`);
  const pngPath = path.join(assetsDir, `${asset.name}.png`);
  
  // Write SVG file
  fs.writeFileSync(svgPath, asset.svg.trim(), 'utf8');
  console.log(`Wrote SVG: ${svgPath}`);

  // Render PNG with resvg
  try {
    const resvg = new Resvg(asset.svg, {
      fitTo: { mode: 'width', value: 512 }
    });
    const pngBuffer = resvg.render().asPng();
    fs.writeFileSync(pngPath, pngBuffer);
    console.log(`Rendered PNG: ${pngPath} (${pngBuffer.length} bytes)`);
  } catch (err) {
    console.error(`Error rendering PNG for ${asset.name}:`, err);
  }
}

console.log('All 5 assets generated successfully!');
