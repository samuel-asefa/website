import type { Project } from './types';
import { figure, photo, screenshot } from './media';

/**
 * Projects, in no particular order (pages sort them).
 *
 * To add a project: append one entry, put its images in public/images,
 * run `npm run media`, and it appears on projects.html (and on the homepage if
 * you give it a `featured` number). See README → "Adding a project".
 */
export const projects: Project[] = [
  // ───────────────────────────── Hardware ─────────────────────────────
  {
    slug: 'push-back-robot',
    title: 'VEX Robot: Push Back',
    line: 'Team 750W’s VEX V5 robot for the 2025–26 season. I lead the build.',
    category: 'hardware',
    tags: ['Robotics', 'CAD', 'VEX V5'],
    depth: 'overview',
    dates: '2025–26 season',
    start: '2025-06',
    status: 'Competed in the 2025–26 season',
    summary:
      'Push Back is the 2025–26 VEX V5 Robotics Competition game. Team 750W designs, builds, and programs a new robot for each season’s game. Since June 2025 I’ve been the team’s build lead, responsible for the build, CAD, and testing of our competition robot, which has gone through more than ten major design iterations.',
    role: 'Build lead and workshop lead, Team 750W',
    team: 'Team 750W, South Brunswick High School Robotics Club',
    featured: 1,
    cover: photo(
      '/images/push-back-robot.jpeg',
      '750W’s Push Back robot photographed from floor level against a dark background: an aluminum VEX frame with red and green sprockets, red pneumatic cylinders, and a curved arm arching over the top.',
      {
        caption:
          'Team 750W’s Push Back robot, 2025–26. I led its build, CAD, and testing as build lead.',
        focus: '50% 40%',
        ratio: '4 / 5',
      },
    ),
    facts: [
      { value: '25–10', label: 'qualification record', condition: '2025–26 season, a 71.4% win rate' },
      { value: '10+', label: 'major design iterations', condition: 'build, CAD, and testing I’ve led since June 2025' },
      { value: '2', label: 'Amaze Awards', condition: 'SBHS and Pirate Popoff Push Back tournaments (team awards)' },
    ],
    recognition: [
      { title: 'Amaze Award, SBHS Push Back Tournament', scope: 'team' },
      { title: 'Amaze Award, Pirate Popoff Push Back Tournament', scope: 'team' },
      {
        title: 'Excellence Award, CCHS High Stakes Tournament',
        scope: 'team',
        detail: 'Previous season (2024–25), 1 of 36 teams',
      },
    ],
    sections: {
      context: {
        title: 'My role on the team',
        blocks: [
          {
            type: 'steps',
            steps: [
              { label: 'Builder and programmer', date: '2023–24', html: 'First season on 750W (Over Under).' },
              { label: 'CAD lead', date: '2024–25', html: 'Led the team’s CAD for High Stakes. That season’s robot earned the Excellence Award at the CCHS tournament (1 of 36 teams).' },
              { label: 'Build lead and workshop lead', date: '2025–present', html: 'Lead build, CAD, and testing for the competition robot, and teach the club’s workshops.' },
            ],
          },
          {
            type: 'text',
            html: 'The robot is programmed in C++ with a custom PID library. Awards on this page belong to the whole team; my part was leading the build and the design iterations behind it.',
          },
        ],
      },
      evidence: {
        title: 'Results',
        blocks: [
          {
            type: 'list',
            items: [
              '25–10 qualification record in the 2025–26 season (71.4% win rate).',
              'Two Amaze Awards in 2025–26, at the SBHS and Pirate Popoff Push Back tournaments. Across the 2024–25 and 2025–26 seasons, our three judged awards came against fields of 36, 56, and 65 teams.',
              'The team has qualified for the state championship three times.',
            ],
          },
        ],
      },
    },
    technologies: ['VEX V5', 'C++', 'PID control', 'CAD'],
    links: [
      { label: 'Team 750W site', href: 'https://750w.github.io/', kind: 'site' },
      { label: '750W on GitHub', href: 'https://github.com/750W', kind: 'code' },
      { label: 'My CAD tutorial series', href: 'https://www.youtube.com/@samuel-asefa', kind: 'video', note: '7 parts on YouTube' },
    ],
    related: ['roboroute', 'adaptive-sensor-fusion'],
  },
  {
    slug: 'ndvi-payload',
    title: 'NDVI Mapping Payload',
    line: 'A high-altitude balloon payload for NASA TechRise. I designed its circuitry and wrote the data logger.',
    category: 'hardware',
    tags: ['Aerospace', 'Embedded', 'Sensors'],
    depth: 'case-study',
    dates: '2026',
    start: '2026-01',
    status: 'Payload hardware and logging code built',
    summary:
      'Our aerospace club proposed an NDVI (vegetation index) mapping payload that would use machine learning, and NASA selected it as a winner of the TechRise Student Challenge in the high-altitude balloon category, with $1,500 in funding. As electronics lead I designed the payload’s circuitry and onboard data collection, and wrote the code that logs flight telemetry and four sensors to an SD card once per second.',
    role: 'Electronics lead: circuitry, sensors, and logging firmware',
    team: 'South Brunswick High School Aerospace Club',
    cover: photo(
      '/images/nasapayload.jpeg',
      'The payload: a tall clear acrylic enclosure on a lab table, packed with sensor boards and colored jumper wires, with a cable leaving through the white top plate.',
      {
        caption: 'The assembled payload in its clear enclosure.',
        focus: '50% 55%',
        ratio: '3 / 4',
      },
    ),
    facts: [
      { value: '$1,500', label: 'NASA TechRise funding', condition: 'High-altitude balloon category (team award)' },
      { value: '39', label: 'fields per log row', condition: 'written to SD once per second' },
      { value: '5', label: 'data sources', condition: 'flight telemetry plus four I²C sensors' },
    ],
    recognition: [
      {
        title: 'NASA TechRise Student Challenge winner',
        scope: 'team',
        detail: 'High-altitude balloon category; $1,500 to build the payload',
        date: 'Jan 2026',
      },
    ],
    sections: {
      context: {
        title: 'What NDVI measures',
        blocks: [
          {
            type: 'text',
            html: 'The Normalized Difference Vegetation Index compares how much near-infrared and red light a surface reflects: <span class="math">NDVI = (NIR − Red) / (NIR + Red)</span>. Healthy vegetation reflects strongly in near-infrared, so it scores high. The payload doesn’t compute NDVI in flight. It records raw spectral channels, including near-infrared, alongside position and attitude so the index can be mapped after recovery.',
          },
        ],
      },
      design: {
        title: 'Data path',
        blocks: [
          { type: 'diagram', id: 'ndvi-dataflow', caption: 'How data moves through the payload, drawn from the firmware’s README. This is a data-flow sketch, not a wiring schematic.' },
          {
            type: 'list',
            items: [
              '<strong>Telemetry.</strong> The WorldView flight module supplies GPS position, altitude, speed, heading, vertical velocity, pressure, temperature, and flight status.',
              '<strong>Spectral.</strong> An AS7343 provides 11 channels: eight visible bands (F1–F8) plus near-infrared, with configurable gain and integration time.',
              '<strong>Light.</strong> A TSL2591 measures lux, infrared, visible, and full-spectrum intensity.',
              '<strong>Atmosphere.</strong> A BME280 records temperature, humidity, and pressure, and estimates altitude.',
              '<strong>Motion.</strong> An MPU6050 records 3-axis acceleration and rotation.',
            ],
          },
          {
            type: 'text',
            html: 'The firmware checks each sensor at startup and keeps running if one fails, writing <code>N/A</code> in that sensor’s columns instead of halting. A Neopixel shows the flight phase (initializing, launching, floating, terminating), and a GO LED blink pattern shows whether telemetry is streaming.',
          },
        ],
      },
      evidence: {
        title: 'Build',
        blocks: [
          {
            type: 'figures',
            media: [
              photo('/images/nasa-techrise-soldering.JPG', 'A student in a black hoodie solders at a bench under a desk lamp, with a laptop open on a video call to the left and an orange tool case to the right.', {
                caption: 'Soldering during the payload build.',
                focus: '45% 50%',
              }),
              photo('/images/techrise.webp', 'Nine students stand in a row in a school lab around a woman holding a NASA TechRise certificate.', {
                caption: 'The TechRise team with the winner’s certificate.',
                focus: '50% 45%',
              }),
            ],
          },
        ],
      },
    },
    technologies: ['Python', 'I²C sensors', 'SD logging', 'Soldering'],
    links: [
      { label: 'Payload firmware', href: 'https://github.com/SBAerospace/NDVI-Mapping', kind: 'code' },
      { label: 'SBHS Aerospace Club', href: 'https://sbaerospace.vercel.app/', kind: 'site' },
    ],
    related: ['circuitspace'],
  },
  {
    slug: 'dexarm',
    title: 'Dexarm',
    line: 'A low-cost prosthetic arm prototype from VividSense, built for everyday grip-and-release tasks.',
    category: 'hardware',
    tags: ['Assistive tech', 'Arduino'],
    depth: 'overview',
    dates: '2025–26',
    start: '2025-10',
    status: 'In development',
    summary:
      'DexArm is VividSense’s low-cost, modular prosthetic arm, meant to restore everyday functions such as gripping, lifting, and releasing objects. I helped build it as VividSense’s head of engineering. It won first place at LaunchSB in April 2026, out of more than 40 teams.',
    role: 'Head of engineering, VividSense',
    team: 'VividSense',
    cover: photo(
      '/images/dexarm.jpg',
      'An early DexArm prototype against a dark blue backdrop: cardboard fingers and palm, with small servos and wiring held in the palm with blue tape and a power cable leading out the side.',
      {
        caption: 'An early DexArm prototype: cardboard fingers, with servos and wiring taped into the palm.',
        focus: '50% 40%',
        ratio: '4 / 3',
      },
    ),
    recognition: [
      { title: 'LaunchSB, 1st place', scope: 'team', detail: 'Out of 40+ teams', date: 'Apr 2026' },
    ],
    technologies: ['C++', 'Arduino', 'Servo control'],
    links: [
      { label: 'DexArm on VividSense', href: 'https://vividsense.vercel.app/product/dexarm', kind: 'site' },
      { label: 'Source', href: 'https://github.com/samuel-asefa/Dexarm', kind: 'code' },
    ],
    related: ['surroundscanner'],
  },
  {
    slug: 'surroundscanner',
    title: 'SurroundScanner',
    line: 'Ultrasonic glasses that warn a visually impaired wearer about nearby obstacles with audio.',
    category: 'hardware',
    tags: ['Assistive tech', 'Arduino', '3D printing'],
    depth: 'overview',
    dates: '2024–25',
    start: '2024-12',
    summary:
      'SurroundScanner is a pair of glasses with ultrasonic sensors that detect nearby obstacles and alert the wearer through audio feedback, as a low-cost navigation aid for people with visual impairments. I helped build it at VividSense. It placed second at LaunchSB in April 2025, out of more than 40 teams.',
    role: 'Head of engineering, VividSense',
    team: 'VividSense',
    cover: photo(
      '/images/surroundscanner.png',
      'A pair of glasses with two round ultrasonic sensors mounted on the bridge, lit blue and photographed low over a grid of glowing dots.',
      {
        caption: 'The SurroundScanner glasses, with two ultrasonic sensors mounted at the bridge.',
        focus: '50% 40%',
        ratio: '16 / 9',
      },
    ),
    recognition: [
      { title: 'LaunchSB, 2nd place', scope: 'team', detail: 'Out of 40+ teams', date: 'Apr 2025' },
    ],
    technologies: ['C++', 'Arduino', 'Ultrasonic sensing', '3D printing'],
    links: [
      { label: 'SurroundScanner on VividSense', href: 'https://vividsense.vercel.app/product/surrounding-scanner', kind: 'site' },
      { label: 'Source', href: 'https://github.com/samuel-asefa/SurroundScanner', kind: 'code' },
    ],
    related: ['dexarm'],
  },

  // ───────────────────────────── Software ─────────────────────────────
  {
    slug: 'roboroute',
    title: 'RoboRoute',
    line: 'A route planner for VEX autonomous routines. Click waypoints on a scaled field, export LemLib code.',
    category: 'software',
    tags: ['Robotics', 'Web app'],
    depth: 'case-study',
    dates: 'Dec 2024 – May 2026',
    start: '2024-12',
    status: 'Live, version 3.0',
    summary:
      'Planning a VEX autonomous routine means turning a strategy into field coordinates and headings, then into code. RoboRoute does that in the browser: you place waypoints on a to-scale field, set a heading at each one, and copy out <a href="https://github.com/LemLib/LemLib">LemLib</a> motion commands.',
    role: 'Designer and developer',
    team: 'Solo',
    featured: 2,
    cover: screenshot(
      '/images/roboroute.png',
      'RoboRoute’s editor: a dark top-down VEX field with numbered waypoints joined by yellow path lines, and a toolbar for path modes, insert, delete, trim, and code generation.',
      {
        caption: 'An earlier version of the editor on the High Stakes skills field.',
      },
    ),
    facts: [
      { value: '8', label: 'field presets', condition: 'match and skills layouts for four VEX seasons' },
      { value: '144 in', label: 'square field model', condition: 'coordinates from −72 to 72 in, origin at center' },
      { value: 'v3.0', label: 'current version', condition: 'live on GitHub Pages' },
    ],
    sections: {
      design: {
        title: 'How it works',
        blocks: [
          {
            type: 'text',
            html: 'The field is modeled in inches, 144 on a side, with the origin at its center. Every click is converted from canvas pixels into field inches (the canvas is 800 px for 144 in, about 5.56 px per inch, with the y-axis flipped), so exported coordinates are in field units, not screen units.',
          },
          {
            type: 'text',
            html: 'Each waypoint stores <code>x</code>, <code>y</code>, and a heading measured clockwise from the field’s +y direction. You adjust a heading with the scroll wheel or type it in. Export writes one <code>chassis.setPose()</code> for the starting point, then one <code>chassis.moveToPose(x, y, θ, timeout)</code> per waypoint.',
          },
          {
            type: 'list',
            items: [
              'Field presets for four games (Over Under, High Stakes, Push Back, Override), each in match and skills layouts, plus an empty field and custom image upload.',
              'Insert a point mid-segment (it takes the average of its neighbors’ headings, handling the wrap at 360°), delete, trim, undo, and redo.',
              'Save and load routes as JSON, and a sketch layer for marking up strategy on the field.',
            ],
          },
        ],
      },
      process: {
        title: 'One change between versions',
        blocks: [
          {
            type: 'text',
            html: 'Earlier versions (screenshot above) offered both straight and Bézier path modes. Version 3.0 draws straight segments only. Each exported line is a <code>moveToPose</code> target, so the curve a robot actually drives comes from LemLib’s controller rather than from the drawing; the planner’s job is to get positions and headings right.',
          },
        ],
      },
      evidence: {
        title: 'Try the idea',
        blocks: [{ type: 'demo', id: 'route-sketch' }],
      },
      reflection: {
        title: 'Limits',
        blocks: [
          {
            type: 'list',
            items: [
              'RoboRoute plans geometry. It doesn’t simulate the drivetrain, so the timeout on each move is set by hand (1000 ms by default).',
              'Exports target LemLib’s chassis API. Teams using another motion library would have to translate the commands.',
            ],
          },
        ],
      },
    },
    technologies: ['JavaScript', 'HTML Canvas', 'CSS', 'LemLib'],
    links: [
      { label: 'Open RoboRoute', href: 'https://samuel-asefa.github.io/RoboRoute/src/', kind: 'demo' },
      { label: 'Source', href: 'https://github.com/samuel-asefa/RoboRoute', kind: 'code' },
    ],
    related: ['push-back-robot', 'heavy'],
  },
  {
    slug: 'sciolytics',
    title: 'Sciolytics',
    line: 'A Science Olympiad practice platform with 1,750+ questions across 15+ events.',
    category: 'software',
    tags: ['Web app', 'Education'],
    depth: 'overview',
    dates: 'Apr 2025 – 2026',
    start: '2025-04',
    status: 'Live',
    summary:
      'A practice platform for Science Olympiad competitors, coaches, and teams: 1,750+ practice questions across 15+ events, event wikis, analytics on accuracy by event and subtopic, custom tests, and teams that can assign tests to members. A Gemini-based importer turns study guides into draft questions. I built it while competing in Science Olympiad and captaining our build events.',
    role: 'Designer and developer',
    team: 'Solo',
    cover: screenshot(
      '/images/sciolytics.png',
      'The Sciolytics dashboard in dark mode, greeting the user and showing practice counts, an accuracy chart over time, and a 92% score tile.',
      { caption: 'The Sciolytics dashboard.' },
    ),
    technologies: ['TypeScript', 'React', 'Firebase', 'Gemini API'],
    links: [
      { label: 'Open Sciolytics', href: 'https://sciolytics.vercel.app', kind: 'demo' },
      { label: 'Source', href: 'https://github.com/samuel-asefa/Sciolytics', kind: 'code' },
    ],
  },
  {
    slug: 'circuitspace',
    title: 'CircuitSpace',
    line: 'A schematic editor for rocket avionics with electrical rule checks and live power and mass budgets.',
    category: 'software',
    tags: ['Aerospace', 'Web app'],
    depth: 'overview',
    dates: 'Jun 2025 – 2026',
    start: '2025-06',
    status: 'Live',
    summary:
      'CircuitSpace is a design tool for low-voltage rocket and payload electronics. You wire components from a library of 60+ parts on a schematic canvas, and it runs 25+ electrical rule checks (floating inputs, I²C address collisions, regulator overloads, power-budget limits) while tracking voltage, current, power, mass, and battery runtime. It exports BOMs, netlists, reports, and schematics.',
    role: 'Designer and developer',
    team: 'Solo',
    cover: screenshot(
      '/images/circuit-space.png',
      'The CircuitSpace workspace: a component library on the left, an empty schematic canvas in the center, and a project summary panel on the right.',
      { caption: 'The CircuitSpace workspace.' },
    ),
    technologies: ['TypeScript', 'React', 'Zustand', 'SVG'],
    links: [
      { label: 'Open CircuitSpace', href: 'https://circuitspace.vercel.app', kind: 'demo' },
      { label: 'Source', href: 'https://github.com/samuel-asefa/CircuitSpace', kind: 'code' },
    ],
    related: ['ndvi-payload'],
  },
  {
    slug: 'amharicquest',
    title: 'AmharicQuest',
    line: 'A course for learning Amharic, built around the Fidel script.',
    category: 'software',
    tags: ['Web app', 'Language'],
    depth: 'overview',
    dates: 'Jan 2025 – 2026',
    start: '2025-01',
    status: 'Live',
    summary:
      'AmharicQuest teaches Amharic starting from its script, the Fidel: all 33 consonant families, each in seven vowel orders (230+ characters with romanization), then 42 vocabulary words across nine categories and nine lessons from beginner to intermediate, with quizzes and progress tracking.',
    role: 'Designer and developer',
    team: 'Solo',
    cover: screenshot(
      '/images/amharic-quest.png',
      'The AmharicQuest home screen in dark mode, greeting the learner and showing streak, XP, and level tiles, a highlighted lesson card for Basic Greetings, and quick practice options.',
      { caption: 'The AmharicQuest home screen.' },
    ),
    technologies: ['TypeScript', 'Firebase'],
    links: [
      { label: 'Open AmharicQuest', href: 'https://amharicquest.vercel.app/', kind: 'demo' },
      { label: 'Source', href: 'https://github.com/samuel-asefa/AmharicQuest', kind: 'code' },
    ],
  },
  {
    slug: 'heavy',
    title: 'Heavy',
    line: 'A weight calculator for VEX V5 robots: pick parts and lengths, get total mass.',
    category: 'software',
    tags: ['Robotics', 'Web app'],
    depth: 'entry',
    dates: 'Mar – May 2025',
    start: '2025-03',
    team: 'Solo',
    cover: screenshot(
      '/images/heavy.png',
      'The Heavy calculator: a list of VEX metal structure parts with per-length weights, and a running total weight panel.',
    ),
    technologies: ['JavaScript'],
    links: [
      { label: 'Open Heavy', href: 'https://samuel-asefa.github.io/Heavy/', kind: 'demo' },
      { label: 'Source', href: 'https://github.com/samuel-asefa/Heavy', kind: 'code' },
    ],
  },
  {
    slug: 'mathify',
    title: 'Mathify',
    line: 'Timed practice for the New Jersey Math League, with a large question bank.',
    category: 'software',
    tags: ['Web app', 'Education'],
    depth: 'entry',
    dates: 'Mar 2025 – 2026',
    start: '2025-03',
    team: 'Solo',
    cover: screenshot('/images/mathify.png', 'Mathify’s practice screen: a timer at 04:39, a question, and five answer choices.'),
    technologies: ['JavaScript', 'Firebase'],
    links: [
      { label: 'Open Mathify', href: 'https://math-ify.vercel.app/', kind: 'demo' },
      { label: 'Source', href: 'https://github.com/samuel-asefa/Mathify', kind: 'code' },
    ],
  },
  {
    slug: 'studently',
    title: 'Studently',
    line: 'A student task manager with color-coded categories and cloud sync.',
    category: 'software',
    tags: ['Web app'],
    depth: 'entry',
    dates: 'Dec 2024 – Jan 2026',
    start: '2024-12',
    team: 'Solo',
    cover: screenshot('/images/studently.png', 'Studently’s two-panel layout: color-coded categories on the left, a task list on the right.'),
    technologies: ['Svelte', 'JavaScript'],
    links: [
      { label: 'Open Studently', href: 'https://studentlyy.vercel.app/', kind: 'demo' },
      { label: 'Source', href: 'https://github.com/samuel-asefa/Studently', kind: 'code' },
    ],
  },

  // ───────────────────────────── Research ─────────────────────────────
  {
    slug: 'adaptive-sensor-fusion',
    title: 'Adaptive Sensor Fusion for Autonomous Robots',
    line: 'A Kalman filter that learns which sensors to trust. In simulation, 66.2% lower error than a standard EKF under severe degradation.',
    category: 'research',
    tags: ['Robotics', 'Machine learning', 'Simulation'],
    depth: 'case-study',
    dates: '2026',
    start: '2026-07',
    status: 'Preprint (working paper), not peer reviewed',
    summary:
      'Low-cost robots localize with sensors that fail in ordinary ways. I paired an Extended Kalman Filter with a small neural network that estimates, at every step, how much to trust each sensor. In 500 simulated Monte Carlo trials under severe sensor degradation, it reduced localization RMSE by 66.2% compared with a standard EKF.',
    role: 'First author; wrote the simulation, training, and figure code',
    team: 'With Rohan Kunala and Arav Pyati',
    collaborators: ['Rohan Kunala', 'Arav Pyati'],
    featured: 3,
    cover: figure(
      '/images/fig_rmse_comparison.png',
      'Bar chart titled Average Localization Error by Scenario. Localization RMSE in centimeters for dead reckoning, standard EKF, adaptive EKF, and ML adaptive fusion under normal, moderate, and severe conditions. The standard EKF bar rises to about 740 cm under severe conditions with a very large error bar; the others stay near 250 cm or below.',
      {
        caption:
          'Average localization RMSE for four estimators at three degradation levels. The headline comparison is the severe case: standard EKF 743.6 cm, proposed method 251.7 cm. Error bars as plotted in the preprint.',
        source: 'Figure from the preprint',
      },
    ),
    facts: [
      { value: '66.2%', label: 'lower RMSE than a standard EKF', condition: 'severe degradation, in simulation (743.6 → 251.7 cm)' },
      { value: '500', label: 'Monte Carlo trials', condition: 'across three degradation levels' },
      { value: '4', label: 'sensors weighted', condition: 'wheel encoder, IMU, ultrasonic, camera' },
    ],
    publications: [
      {
        title: 'Adaptive Sensor Fusion Using Machine Learning for Robust Localization in Low-Cost Autonomous Robots',
        status: 'preprint',
        statusNote: 'Working paper, version 1. Not peer reviewed.',
        venue: 'Cambridge Open Engage',
        date: '31 Aug 2026',
        authors: ['Samuel Asefa', 'Rohan Kunala', 'Arav Pyati'],
        href: 'https://doi.org/10.33774/coe-2026-n3z2n',
        doi: '10.33774/coe-2026-n3z2n',
      },
    ],
    sections: {
      context: {
        title: 'The problem',
        blocks: [
          {
            type: 'text',
            html: 'Wheel encoders slip. IMUs drift. Ultrasonic sensors bounce off reflective surfaces, and cameras lose track in poor light or behind occlusions. A standard EKF weights each sensor with fixed noise covariances, so when a sensor starts failing, the filter keeps trusting it at the old level.',
          },
        ],
      },
      design: {
        title: 'Approach',
        blocks: [
          {
            type: 'text',
            html: 'A lightweight network (<code>ConfidenceNet</code> in the code) predicts a confidence for each of the four sensors, and those confidences scale the measurement covariances before every EKF update. A sensor the network distrusts gets a larger covariance, so its measurements move the estimate less. The network was trained on 100,000 samples from a Python robot simulator.',
          },
          {
            type: 'text',
            html: 'Baselines: dead reckoning, a conventional EKF, and an innovation-based adaptive EKF, which adjusts covariances from the filter’s own residuals instead of a learned model.',
          },
        ],
      },
      evidence: {
        title: 'Results in simulation',
        blocks: [
          {
            type: 'figures',
            media: [
              figure('/images/fig_camera_failure_error.png', 'Line chart of position error in meters over 15 seconds for standard EKF, adaptive EKF, and proposed ML fusion, with a shaded camera-failure window from 5 to 12 seconds.', {
                caption: 'One run with a camera failure injected from 5 to 12 s (shaded). The three filters track closely during the failure, with the proposed fusion slightly lowest at 12 s; after the camera returns, the adaptive EKF recovers furthest.',
              }),
              figure('/images/fig_wheel_slip_error.png', 'Line chart of position error in meters over 15 seconds for standard EKF and proposed ML fusion, with a shaded wheel-slip window from 5 to 10 seconds.', {
                caption: 'One run with wheel slip injected from 5 to 10 s. Here the proposed fusion’s error stays slightly above the standard EKF’s throughout.',
              }),
            ],
          },
          {
            type: 'figures',
            media: [
              figure('/images/fig_camera_failure_confidence.png', 'Line chart of predicted confidence from 0 to 1 for encoder, IMU, ultrasonic, and camera over 15 seconds, with the failure window shaded.', {
                caption: 'The network’s confidence in each sensor during the camera-failure run. Encoder confidence stays near 1; IMU confidence rises and falls inside the window. Camera confidence is already near zero from about 2 s, before the failure begins.',
              }),
              figure('/images/fig_training_curves.png', 'Log-scale line chart of training and validation mean squared error over 30 epochs; both fall steeply then flatten.', {
                caption: 'Training and validation loss (MSE, log scale) over 30 epochs.',
              }),
            ],
          },
        ],
      },
      reflection: {
        title: 'Limits',
        blocks: [
          {
            type: 'list',
            items: [
              'Every result is from simulation. The preprint doesn’t report tests on a physical robot.',
              'The 66.2% figure compares against a conventional EKF under severe degradation. Against the innovation-based adaptive EKF, the preprint reports no statistically significant difference.',
              'Single runs, like the two above, include cases where the learned weighting isn’t the best filter.',
            ],
          },
        ],
      },
    },
    technologies: ['Python', 'PyTorch', 'NumPy', 'Extended Kalman filter'],
    links: [
      { label: 'Preprint', href: 'https://doi.org/10.33774/coe-2026-n3z2n', kind: 'paper', note: 'working paper, not peer reviewed' },
      {
        label: 'Simulation and training code',
        href: 'https://github.com/samuel-asefa/Adaptive-Sensor-Fusion-Using-Machine-Learning-for-Robust-Localization-in-Low-Cost-Autonomous-Robots',
        kind: 'code',
      },
    ],
    related: ['push-back-robot', 'hybrid-flow-reconstruction'],
  },
  {
    slug: 'cookstove-thermoelectric-regeneration',
    title: 'Thermoelectric-Assisted Amine Regeneration for Cookstove Pollution Capture',
    line: 'A computational test of thermoelectric regeneration for aldehyde-capturing sorbents. Capture worked; regeneration didn’t.',
    category: 'research',
    tags: ['Energy', 'Chemical engineering', 'Simulation'],
    depth: 'case-study',
    dates: '2024 – 2026',
    start: '2025-12',
    status: 'Computational study. Accepted MIT URTC lightning talk, 2026',
    summary:
      'Biomass cookstove exhaust carries formaldehyde and acetaldehyde. Aminosilica sorbents can capture them, but a filter only stays useful if its sorbent can be regenerated with heat, which is hard to supply where these stoves are used. With Rishabh Jitender, I modeled whether a thermoelectric generator running off the stove’s own exhaust could provide that heat. Across 1,500 simulated cases, capture stayed near 100%, and none fully regenerated the bed.',
    role: 'Lead author (2026 study); sole author (2025 preprint)',
    team: 'With Rishabh Jitender, Georgia Institute of Technology (2026 study)',
    collaborators: ['Rishabh Jitender'],
    cover: figure(
      '/images/teg-cycle-traces-urtc.jpg',
      'Four stacked time-series panels over 180 minutes of repeated adsorption and regeneration: outlet concentration ratio near zero, average sorbent loading climbing in steps, mean bed temperature rising from 25.0 to about 26.2 °C, and TEG power switching between about 0.027 W and zero.',
      {
        caption:
          'Three hours of repeated cycles. Outlet concentration (a) stays at essentially zero, but average sorbent loading (b) climbs with every adsorption step and barely falls during regeneration. TEG power (d) sits near 0.027 W.',
        source: 'Figure 5, MIT URTC slides',
      },
    ),
    facts: [
      { value: '≈100%', label: 'modeled aldehyde capture', condition: 'across the 1,500-case sweep' },
      { value: '0.002–0.152 W', label: 'single-module TEG output', condition: 'range across the 1,500 cases' },
      { value: '0 of 1,500', label: 'cases fully regenerated the bed', condition: '2026 computational study' },
    ],
    recognition: [
      { title: 'MIT URTC lightning talk, accepted', scope: 'project', detail: 'MIT Undergraduate Research Technology Conference', date: 'Sep 2026' },
    ],
    publications: [
      {
        title: 'Thermoelectric-Assisted Regeneration of Aminosilica Sorbents for Cookstove Aldehyde Capture',
        status: 'conference-talk-accepted',
        statusNote: 'Accepted lightning talk. Slides published on Zenodo.',
        venue: 'MIT Undergraduate Research Technology Conference (URTC)',
        date: '2026',
        authors: ['Samuel Asefa', 'Rishabh Jitender'],
        href: 'https://doi.org/10.5281/zenodo.23328194',
        doi: '10.5281/zenodo.23328194',
      },
      {
        title: 'Thermoelectric Powered Regeneration of Incomplete Combustion Cooking Pollutant Capturing Amines',
        status: 'preprint',
        statusNote: 'Working paper, version 1. Not peer reviewed. An earlier model with different assumptions.',
        venue: 'Cambridge Open Engage',
        date: '1 Dec 2025',
        authors: ['Samuel Asefa'],
        href: 'https://doi.org/10.33774/coe-2025-mj9mb',
        doi: '10.33774/coe-2025-mj9mb',
      },
    ],
    sections: {
      context: {
        title: 'The question',
        blocks: [
          {
            type: 'text',
            html: 'Amine sites on the sorbent bind aldehydes, but capacity is finite. Restoring it takes heat, which is hard to add in low-resource cooking settings. The stove itself is hot, though. The question: can waste heat, harvested through a thermoelectric generator, provide enough local heating to regenerate the sorbent without external power?',
          },
        ],
      },
      design: {
        title: 'The model',
        blocks: [
          {
            type: 'figure',
            size: 'wide',
            media: figure('/images/teg-system-concept-urtc.jpg', 'Four-panel schematic. (a) Stack: cookstove exhaust, TEG module (Bi2Te3), resistive heater, amine-functionalized porous sorbent bed with gas flow. (b) Imine-formation reactions for formaldehyde and acetaldehyde, and thermal regeneration. (c) One-dimensional computational domain with convection and axial dispersion. (d) Cycle timeline: adsorption, heating, desorption, cooling.', {
              caption: 'System concept (a), capture and regeneration chemistry (b), the 1D computational domain (c), and one cycle (d).',
              source: 'Figure 1, MIT URTC slides',
            }),
          },
          {
            type: 'text',
            html: 'The filter has three paths. Exhaust passes through a porous aminosilica bed (gas path). Hot exhaust on one side of a TEG and ambient cooling on the other create a temperature difference (thermal path). The TEG’s output drives a resistive heater during regeneration (electrical path). The design conflict: capture pollutants, keep pressure drop low, and still deliver enough heat to reset the bed.',
          },
          {
            type: 'list',
            items: [
              '<strong>Transport:</strong> 1D axial packed-bed species balance.',
              '<strong>Sorption:</strong> kinetic uptake and thermal desorption.',
              '<strong>Thermal and TEG:</strong> temperature difference, voltage, matched-load power.',
              '<strong>Pressure drop:</strong> packed-bed flow resistance.',
              '<strong>Checks:</strong> grid convergence, solver tolerance, and TEG power and pressure-drop scaling against literature values.',
            ],
          },
        ],
      },
      process: {
        title: 'How the question changed',
        blocks: [
          {
            type: 'steps',
            steps: [
              {
                label: 'BeniFlow',
                date: 'Apr 2024',
                html: 'An earlier entry on the same problem: a device to redirect incomplete-combustion cooking pollutants away from households. 3rd place at LaunchSB, out of 30+ teams.',
              },
              {
                label: 'First model',
                date: 'Dec 2025',
                html: 'A COMSOL Multiphysics model of TEG-powered regeneration for amine sorbents capturing carbon monoxide and VOCs. It reported up to 2.8 W from a TEG array across a 220 K temperature difference, 87.6% (CO) and 81.3% (VOC) drops in surface concentration within a six-minute regeneration window, and under 4% capacity loss over 50 simulated cycles.',
              },
              {
                label: 'Second model',
                date: '2026',
                html: 'With Rishabh Jitender: narrowed the chemistry to formaldehyde and acetaldehyde on aminosilica sorbents, modeled a single TEG module, and ran the model on 1,500 random sets of operating parameters.',
              },
            ],
          },
          {
            type: 'note',
            title: 'Not comparable',
            html: 'The two models make different assumptions (a TEG array across a fixed 220 K difference versus a single module across a sampled design space). Their power numbers shouldn’t be compared with each other.',
          },
        ],
      },
      evidence: {
        title: 'What the sweep showed',
        blocks: [
          {
            type: 'text',
            html: 'Capture was never the problem: both aldehydes stayed below breakthrough during the modeled adsorption window in every sampled design. The bed wasn’t running out of capacity, which made regeneration energy the deciding constraint. A single module produced 0.002–0.152 W across the 1,500 cases, and none of them fully regenerated the whole bed.',
          },
          {
            type: 'figure',
            size: 'wide',
            media: figure('/images/teg_thermal_response.jpg', 'Four panels. (a) Heat map of bed temperature over position and time, ranging only from 25.000 to 25.022 °C. (b) TEG matched-load power rising with temperature difference to about 6 W at 300 K. (c) Mean bed temperature rising linearly by about 0.023 °C over six minutes. (d) Regeneration completeness versus regeneration temperature for 5- and 10-minute windows, approaching 100% only near 140 °C.', {
              caption: 'Why heating fell short. In this run the bed warms by about 0.02 °C over six minutes (a, c), while regeneration only approaches completion near 140 °C (d). Matched-load TEG power grows with the temperature difference across the module (b).',
              source: 'Figure 4, MIT URTC slides',
            }),
          },
          {
            type: 'figure',
            media: figure('/images/teg_sweep_histograms.png', 'Four histograms. (a) Formaldehyde capture efficiency, all at 1.000. (b) TEG power in watts, median 0.027, 5th percentile 0.015, 95th percentile 0.046. (c) Regeneration completeness from 0 to 1, median 0.237, with peaks at both ends. (d) Pressure drop, all at 16.432 Pa.', {
              caption: 'Distributions across the designs plotted here: capture efficiency is 1.000 at the 5th, 50th, and 95th percentiles (a); median TEG power is 0.027 W (b); regeneration completeness spreads from 0 to 1 with a median of 0.237 (c).',
            }),
          },
        ],
      },
      reflection: {
        title: 'What I’d change next',
        blocks: [
          {
            type: 'list',
            ordered: true,
            items: [
              '<strong>Localize regeneration.</strong> Heat the active sorbent region instead of treating the whole bed as one thermal mass.',
              '<strong>Increase the usable temperature difference.</strong> Improve cold-side heat rejection, or use a multi-module TEG path.',
              '<strong>Reduce pressure drop.</strong> Lower superficial velocity, larger particles, and higher porosity.',
            ],
          },
          {
            type: 'text',
            html: 'Everything so far is computational. The next step is a small instrumented prototype, so measured temperature, VOC, and pressure-drop data can correct the model.',
          },
        ],
      },
    },
    technologies: ['Python', 'Numerical modeling', 'COMSOL Multiphysics (2025 model)'],
    links: [
      { label: 'Lightning-talk slides (PDF)', href: '/thermoelectric-mit-urtc-presentation.pdf', kind: 'slides' },
      { label: 'Slides on Zenodo', href: 'https://doi.org/10.5281/zenodo.23328194', kind: 'slides' },
      {
        label: 'Model code',
        href: 'https://github.com/samuel-asefa/Thermoelectric-Assisted-Regeneration-of-Aminosilica-Sorbents-for-Cookstove-Aldehyde-Capture',
        kind: 'code',
      },
      { label: '2025 preprint', href: 'https://doi.org/10.33774/coe-2025-mj9mb', kind: 'paper', note: 'working paper, not peer reviewed' },
    ],
    related: ['adaptive-sensor-fusion'],
  },
  {
    slug: 'hybrid-flow-reconstruction',
    title: 'Hybrid DeepONet-SHRED-ROM for Flow Field Prediction',
    line: 'A hybrid neural operator that predicts 2D flow for unseen geometries. Mean relative L₂ error 0.047.',
    category: 'research',
    tags: ['Fluid dynamics', 'Machine learning'],
    depth: 'overview',
    dates: '2026',
    start: '2026-06',
    status: 'Preprint (working paper, v2), not peer reviewed',
    summary:
      'High-fidelity flow simulation is too slow to repeat for every small change in geometry. This model reads a 30-step history from 12 sparse velocity sensors with a SHRED-style LSTM encoder, conditions a DeepONet on the geometry and flow parameters, and predicts velocity and speed anywhere in the domain. On 20 geometry cases it never saw in training, its mean relative L₂ error was 0.047 (median 0.045).',
    role: 'Co-author (second of three)',
    team: 'With Rohan Kunala and Irenov Joel',
    collaborators: ['Rohan Kunala', 'Irenov Joel'],
    cover: figure(
      '/images/hybrid_reconstruction_example.png',
      'Three heat maps side by side for unseen test geometry 0 at time step 60: target speed field, hybrid prediction, and absolute error, with 12 sensor locations marked as white dots. Relative L2 error 0.0477.',
      {
        caption:
          'One unseen test geometry at time step 60: target speed field, the model’s prediction, and absolute error, with the 12 sensors marked. Relative L₂ error for this frame: 0.0477.',
        source: 'Figure from the preprint',
      },
    ),
    facts: [
      { value: '0.047', label: 'mean relative L₂ error', condition: '20 unseen geometries, all valid time steps' },
      { value: '12', label: 'sparse sensors', condition: '30-step history each' },
    ],
    publications: [
      {
        title: 'Hybrid DeepONet–SHRED-ROM Framework for Rapid Prediction of Flow Fields Across Geometry Variations',
        status: 'preprint',
        statusNote: 'Working paper, version 2 (v1 posted 20 Jul 2026). Not peer reviewed.',
        venue: 'Cambridge Open Engage',
        date: '4 Sep 2026',
        authors: ['Rohan Kunala', 'Samuel Asefa', 'Irenov Joel'],
        href: 'https://doi.org/10.33774/coe-2026-6h7gp-v2',
        doi: '10.33774/coe-2026-6h7gp-v2',
      },
    ],
    sections: {
      design: {
        title: 'Architecture',
        blocks: [
          {
            type: 'figure',
            size: 'wide',
            media: figure('/images/hybrid_architecture.png', 'Block diagram. Top row: 12 sensors by 30 time steps, position-aware sensor encoder, SHRED-style LSTM encoder, temporal latent z_T. Bottom row: geometry and flow parameters, geometry encoder, geometry latent z_G. Both latents feed a fusion block and DeepONet branch coefficients; query coordinates pass through Fourier features and the DeepONet trunk; outputs are u, v, and s.', {
              caption: 'Sensor history and geometry are encoded separately, fused into the DeepONet branch, and evaluated at any query point by the trunk. The model predicts velocity components and speed together, and enforces consistency between predicted speed and the magnitude of the predicted velocity.',
              source: 'Figure from the preprint',
            }),
          },
          {
            type: 'figure',
            media: figure('/images/sensor_layout_example.png', 'Heat map of speed magnitude for an unseen finite-core vortex-wake field over x from 0 to 4 and y from −1 to 1, with 12 numbered sensor positions.', {
              caption: 'The 12 sensor positions over an unseen vortex-wake field. The dataset varies obstacle position, size, aspect ratio, shedding frequency, and vortex strength.',
            }),
          },
        ],
      },
      reflection: {
        title: 'Limits',
        blocks: [
          {
            type: 'list',
            items: [
              'Tested on a single parameterized vortex-wake dataset, in two dimensions.',
              'Working paper, not peer reviewed.',
            ],
          },
        ],
      },
    },
    technologies: ['Python', 'PyTorch', 'DeepONet', 'LSTM'],
    links: [
      { label: 'Preprint', href: 'https://doi.org/10.33774/coe-2026-6h7gp-v2', kind: 'paper', note: 'working paper, not peer reviewed' },
    ],
    related: ['adaptive-sensor-fusion'],
  },
  {
    slug: 'life-expectancy-model',
    title: 'Life Expectancy Prediction Model',
    line: 'Predicting country-level life expectancy from economic, educational, and environmental factors.',
    category: 'research',
    tags: ['Data analysis', 'Machine learning'],
    depth: 'entry',
    dates: '2025',
    start: '2025-09',
    team: 'Solo',
    cover: screenshot('/images/life-expectancy-prediction-model.jpg', 'Output from the life expectancy model notebook.'),
    technologies: ['Python', 'pandas', 'scikit-learn'],
    links: [{ label: 'Source', href: 'https://github.com/samuel-asefa/LifeExpectancyModel', kind: 'code' }],
  },
  {
    slug: 'global-trade-model',
    title: 'Global Trade Prediction Model',
    line: 'Predicting bilateral trade flows from economic, geographic, and policy variables.',
    category: 'research',
    tags: ['Data analysis', 'Machine learning'],
    depth: 'entry',
    dates: '2025',
    start: '2025-12',
    team: 'Solo',
    cover: screenshot('/images/global-trade-prediction-model.png', 'Output from the global trade model.'),
    technologies: ['Python', 'pandas', 'scikit-learn'],
    links: [{ label: 'Source', href: 'https://github.com/samuel-asefa/GlobalTradeModel', kind: 'code' }],
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

/** Projects with their own page. */
export const projectsWithPages = (): Project[] => projects.filter((p) => p.depth !== 'entry');

export const featuredProjects = (): Project[] =>
  projects
    .filter((p) => p.featured !== undefined)
    .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

