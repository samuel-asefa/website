/**
 * Explanatory diagrams drawn from documented material (READMEs, papers).
 * Built in HTML so they reflow on narrow screens; captions say where the
 * information comes from and label them as diagrams, not measurements.
 */
export const diagrams: Record<string, string> = {
  'ndvi-dataflow': `<div class="flow">
  <div class="flow__col">
    <p class="flow__head">Inputs</p>
    <ul class="flow__list">
      <li><strong>WorldView flight module</strong><span>GPS, altitude, speed, heading, vertical velocity, pressure, temperature, flight status</span></li>
      <li><strong>AS7343 spectral sensor</strong><span>11 channels: F1–F8 visible bands and near-infrared</span></li>
      <li><strong>TSL2591 light sensor</strong><span>Lux, infrared, visible, full spectrum</span></li>
      <li><strong>BME280</strong><span>Temperature, humidity, pressure, estimated altitude</span></li>
      <li><strong>MPU6050 IMU</strong><span>3-axis acceleration and rotation</span></li>
    </ul>
  </div>
  <div class="flow__arrow" aria-hidden="true"></div>
  <div class="flow__col flow__col--core">
    <p class="flow__head">Logger</p>
    <div class="flow__core">
      <strong>Adafruit Metro M4 Express</strong>
      <ol>
        <li>Mount SD card, start I²C bus</li>
        <li>Detect and configure each sensor</li>
        <li>Every second: update telemetry, detect flight-phase changes, read sensors</li>
        <li>Format one CSV row; write <code>N/A</code> for any failed sensor</li>
      </ol>
    </div>
  </div>
  <div class="flow__arrow" aria-hidden="true"></div>
  <div class="flow__col">
    <p class="flow__head">Outputs</p>
    <ul class="flow__list">
      <li><strong>SD card</strong><span>CSV log, 39 fields per row, plus an error log</span></li>
      <li><strong>Neopixel</strong><span>Flight phase: yellow initializing, green launching, cyan floating, blue terminating</span></li>
      <li><strong>GO LED</strong><span>Blink pattern shows whether telemetry is streaming</span></li>
    </ul>
  </div>
</div>`,
};
