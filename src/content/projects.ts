import type { Project } from './types';
import { figure, photo, render, screenshot } from './media';

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
    depth: 'case-study',
    dates: '2025–26 season',
    start: '2025-06',
    status: 'Competed in the 2025–26 season',
    summary:
      'Push Back is the 2025–26 VEX V5 Robotics Competition game. Team 750W designs, builds, and programs a new robot for each season’s game. Since June 2025 I’ve been the team’s Build Lead, responsible for the build, CAD, and testing of our competition robot, which has gone through more than ten major design iterations.',
    role: 'Build Lead and Workshop Lead, Team 750W',
    team: 'Team 750W, South Brunswick High School Robotics Club',
    featured: 1,
    cover: photo(
      '/images/projects/push-back-robot/push-back-robot.jpeg',
      '750W’s Push Back robot photographed from floor level against a dark background: an aluminum VEX frame with red and green sprockets, red pneumatic cylinders, and a curved arm arching over the top.',
      {
        caption:
          'Team 750W’s Push Back robot, 2025–26. I led its build, CAD, and testing as Build Lead.',
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
    ],
    sections: {
      context: {
        title: 'My role on the team',
        blocks: [
          {
            type: 'steps',
            steps: [
              { label: 'Builder and Programmer', date: '2023–24', html: 'First season on 750W (Over Under).' },
              { label: 'CAD Lead', date: '2024–25', html: 'Led the team’s CAD for <a href="/projects/high-stakes-robot.html">High Stakes</a>. That season’s robot earned the Excellence Award at the CCHS tournament (1 of 36 teams).' },
              { label: 'Build Lead and Workshop Lead', date: '2025–present', html: 'Lead build, CAD, and testing for the competition robot, and teach the club’s workshops.' },
            ],
          },
          {
            type: 'text',
            html: 'The robot is programmed in C++ with a custom PID library. Awards on this page belong to the whole team; my part was leading the build and the design iterations behind it.',
          },
        ],
      },
      design: {
        title: 'Concepts in CAD',
        blocks: [
          {
            type: 'text',
            html: 'CAD designs from the Push Back season, from an earlier concept to a later one checked against a goal.',
          },
          {
            type: 'figures',
            media: [
              figure('/images/projects/push-back-robot/OldPushBackConcept.png', 'CAD model of a 750W robot holding a stack of red and blue Push Back blocks inside its frame, with a spiked intake roller at the front.', {
                caption: 'An earlier concept, holding red and blue blocks inside the frame.',
              }),
              figure('/images/projects/push-back-robot/PushBackConcept.png', 'CAD model of a later 750W concept: a tall aluminum frame with a row of flex-wheel rollers on an angled intake at the front and an air tank along the side.', {
                caption: 'A later concept with a flex-wheel intake on an angled arm.',
              }),
            ],
          },
          {
            type: 'figure',
            media: figure('/images/projects/push-back-robot/PushBackConceptInAction.png', 'The later concept in CAD, tilted against an orange long goal on the field, with a red block at the top of the intake.', {
              caption: 'The later concept placed against a goal in CAD, with a block at the top of the intake.',
            }),
          },
          {
            type: 'figures',
            media: [
              figure('/images/projects/push-back-robot/BasketBot.png', 'CAD model of BasketBot: a 750W robot with a large mesh basket on top and a stack of spoked roller intakes carrying a column of red blocks.', {
                caption: 'BasketBot, another Push Back design: a mesh basket above a column of roller intakes.',
              }),
              figure('/images/projects/push-back-robot/BasketBotInAction.png', 'BasketBot in CAD on the field, loaded with red blocks in its intake and blue blocks in its basket.', {
                caption: 'BasketBot on the field in CAD, loaded with red and blue blocks.',
              }),
            ],
          },
        ],
      },
      process: {
        title: 'Version 2, built',
        blocks: [
          {
            type: 'figure',
            media: photo('/images/projects/push-back-robot/V2PushBack.png', 'Version 2 of the Push Back robot on a carpeted floor, with a curved chain-mesh hood over red sprockets, an aluminum frame, and red and blue blocks scattered around it.', {
              caption: 'Version 2 of the robot, built. The competition robot went through more than ten major iterations.',
            }),
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
    related: ['high-stakes-robot', 'roboroute', 'adaptive-sensor-fusion'],
  },
  {
    slug: 'high-stakes-robot',
    title: 'VEX Robot: High Stakes',
    line: 'Team 750W’s VEX V5 robot for the 2024–25 season. I led the CAD.',
    category: 'hardware',
    tags: ['Robotics', 'CAD', 'VEX V5'],
    depth: 'overview',
    dates: '2024–25 season',
    start: '2024-05',
    status: 'Competed in the 2024–25 season',
    summary:
      'High Stakes is the 2024–25 VEX V5 Robotics Competition game, played with rings scored on stakes and mobile goals. I was Team 750W’s CAD Lead that season. BanquetBot, shown here, is one of our robot designs for it. That season’s robot earned the Excellence Award at the CCHS High Stakes Tournament, 1 of 36 teams.',
    role: 'CAD Lead, Team 750W',
    team: 'Team 750W, South Brunswick High School Robotics Club',
    cover: render('/images/projects/high-stakes-robot/BanquetBotInAction.png', 'CAD model of BanquetBot on a High Stakes field next to the ladder, with red and blue rings and orange and blue mobile-goal stakes around it.', {
      caption: 'BanquetBot placed on a High Stakes field in CAD, with rings, mobile goals, and the ladder.',
    }),
    recognition: [
      { title: 'Excellence Award, CCHS High Stakes Tournament', scope: 'team', detail: '1 of 36 teams' },
    ],
    sections: {
      design: {
        title: 'BanquetBot in CAD',
        blocks: [
          {
            type: 'figure',
            media: figure('/images/projects/high-stakes-robot/BanquetBot.png', 'CAD model of a VEX robot with a tall chain-driven conveyor in the middle, two red pneumatic air tanks, omni-wheel drive, and two clamp arms on top.', {
              caption: 'BanquetBot, a robot design for High Stakes (2024–25): a chain-driven conveyor in the middle, two air tanks, and clamp arms on top.',
            }),
          },
        ],
      },
    },
    technologies: ['VEX V5', 'CAD'],
    links: [
      { label: 'Team 750W site', href: 'https://750w.github.io/', kind: 'site' },
      { label: 'My CAD tutorial series', href: 'https://www.youtube.com/@samuel-asefa', kind: 'video', note: '7 parts on YouTube' },
    ],
    related: ['push-back-robot', 'roboroute'],
  },
  {
    slug: 'robot-tour',
    title: 'Robot Tour',
    line: 'A self-driving robot for Science Olympiad’s Robot Tour build event, built on a Pololu 3pi+ 32U4.',
    category: 'hardware',
    tags: ['Robotics', 'Science Olympiad', 'Arduino'],
    depth: 'overview',
    dates: '2025–26 season',
    start: '2025-09',
    team: 'SBHS Science Olympiad',
    summary:
      'Robot Tour is a Science Olympiad build event: teams design, build, and program a robot that drives itself along a track to a target point, aiming to arrive in a set time as accurately as possible. Our robot is built on a Pololu 3pi+ 32U4 and programmed in Arduino. The clips below are from testing in February 2026.',
    cover: photo('/images/projects/robot-tour/robot-tour.jpg', 'A small round Pololu 3pi+ robot with a blue status light sitting on a beige foam mat, with a hand holding a pencil beside it.', {
      caption: 'Marking the robot’s start position before a test run.',
    }),
    sections: {
      process: {
        title: 'Testing',
        blocks: [
          {
            type: 'videos',
            videos: [
              {
                src: '/media/video/robot-tour-imu-test.mp4',
                poster: '/media/video/robot-tour-imu-test-poster.jpg',
                width: 720,
                height: 1280,
                label: 'A hand turns the round robot beside a laptop running the Arduino IDE, whose serial monitor scrolls accelerometer, magnetometer, and gyroscope readings.',
                caption: 'Checking the inertial sensors: turning the robot by hand while the serial monitor streams accelerometer, magnetometer, and gyroscope readings (10 seconds).',
              },
              {
                src: '/media/video/robot-tour-test-run.mp4',
                poster: '/media/video/robot-tour-test-run-poster.jpg',
                width: 720,
                height: 1280,
                label: 'A hand marks the robot’s start position on a foam mat with a pencil, then the robot drives itself away across the mat.',
                caption: 'A test run: marking the start position, then the robot drives itself across the mat (17 seconds).',
              },
              {
                src: '/media/video/robot-tour-short-run.mp4',
                poster: '/media/video/robot-tour-short-run-poster.jpg',
                width: 720,
                height: 1280,
                label: 'The robot drives across the foam mat as someone walks alongside it.',
                caption: 'A short run across the mat (2 seconds).',
              },
            ],
          },
        ],
      },
    },
    technologies: ['C++', 'Arduino', 'Pololu 3pi+ 32U4'],
    related: ['push-back-robot', 'sciolytics'],
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
      'Our aerospace club proposed an NDVI (vegetation index) mapping payload that would use machine learning, and NASA selected it as a winner of the TechRise Student Challenge in the high-altitude balloon category, with $1,500 in funding. As Electronics Lead, I designed the payload’s circuitry and onboard data collection, and wrote the code that logs flight telemetry and four sensors to an SD card once per second.',
    role: 'Electronics Lead: circuitry, sensors, and logging firmware',
    team: 'South Brunswick High School Aerospace Club',
    cover: photo(
      '/images/projects/ndvi-payload/nasapayload.jpeg',
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
          { type: 'diagram', id: 'ndvi-dataflow', caption: 'How data moves through the payload, drawn from the firmware’s README; the board is identified from the build photo. This is a data-flow sketch, not a wiring schematic.' },
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
              photo('/images/projects/ndvi-payload/nasa-techrise-soldering.JPG', 'A student in a black hoodie solders at a bench under a desk lamp, with a laptop open on a video call to the left and an orange tool case to the right.', {
                caption: 'Soldering during the payload build.',
                focus: '45% 50%',
              }),
              photo('/images/projects/ndvi-payload/techrise.webp', 'Nine students stand in a row in a school lab around a woman holding a NASA TechRise certificate.', {
                caption: 'The TechRise team with the winner’s certificate.',
                focus: '50% 45%',
              }),
            ],
          },
          {
            type: 'figures',
            media: [
              photo('/images/projects/ndvi-payload/TechRise1.jpg', 'The payload in its clear enclosure, set into pink foam, with a 3D-printed plate reading South Brunswick Aerospace, NASA TechRise and an Adafruit Metro M4 Express board inside.', {
                caption: 'The finished payload in its foam case, under a 3D-printed South Brunswick Aerospace / NASA TechRise plate. The Adafruit Metro M4 Express board is visible inside.',
              }),
              photo('/images/projects/ndvi-payload/TechRise2.jpg', 'A livestream frame of a high-altitude balloon rising into a blue sky with a gondola and parachute below it, with an overlay listing launch stages and Liftoff highlighted.', {
                caption: 'World View’s launch livestream at liftoff of the TechRise balloon flight.',
              }),
            ],
          },
        ],
      },
    },
    technologies: ['Python', 'Adafruit Metro M4 Express', 'I²C sensors', 'SD logging', 'Soldering'],
    links: [
      { label: 'Payload firmware', href: 'https://github.com/SBAerospace/NDVI-Mapping', kind: 'code' },
      { label: 'SBHS Aerospace Club', href: 'https://sbaerospace.vercel.app/', kind: 'site' },
    ],
    related: ['rocketry-airbrakes', 'circuitspace'],
  },
  {
    slug: 'rocketry-airbrakes',
    title: 'Competition Rockets & Airbrakes',
    line: 'American Rocketry Challenge rockets with 3D-printed parts and an airbrake that predicts apogee in flight.',
    category: 'hardware',
    tags: ['Aerospace', 'CAD', 'Embedded'],
    depth: 'case-study',
    dates: '2024 – present',
    start: '2024-09',
    status: 'Ongoing: 2026–27 season',
    summary:
      'Our aerospace club designs, builds, and flies rockets for the American Rocketry Challenge (ARC). In 2025 the team placed 50th of 100 at the national finals. For the 2025–26 rocket I built and programmed an airbrake system: a 3D-printed module whose servo pushes flaps out through the body tube, run by flight code that predicts apogee from barometer and accelerometer readings and deploys the brakes to aim for a 750 ft target.',
    role: 'Design Lead and Electronics Lead (2025–26); Co-Vice President (2026–27)',
    team: 'South Brunswick High School Aerospace Club',
    cover: photo(
      '/images/projects/rocketry-airbrakes/LastYearRocketUpClose.png',
      'A gray rocket with a blue band and blue fins leaving the launch rail over a snowy field, with a purple-white motor flame at the base.',
      {
        caption: 'The 2025–26 rocket leaving the launch rail at a winter launch.',
        focus: '50% 45%',
        ratio: '3 / 4',
      },
    ),
    facts: [
      { value: '50th of 100', label: 'ARC national finals, 2025', condition: 'team result; top 100 of 1,001 entries qualified' },
      { value: '750 ft', label: 'airbrake target apogee', condition: '228.6 m, set in the 2025–26 flight code' },
      { value: '20+', label: 'rocket parts I designed and 3D-printed', condition: 'including fin cans, transitions, and airbrakes' },
    ],
    recognition: [
      {
        title: 'American Rocketry Challenge 2025, national finalist',
        scope: 'team',
        detail: 'Top 100 of 1,001 entries; 50th at the national finals in Virginia',
        date: 'Apr 2025',
      },
    ],
    sections: {
      context: {
        title: 'The competition',
        blocks: [
          {
            type: 'text',
            html: 'The American Rocketry Challenge is a national student rocketry competition scored on how closely a rocket matches its target altitude and flight time. Our club builds a new rocket each season. I joined as a member in 2024–25, was Design Lead and Electronics Lead in 2025–26, and am Co-Vice President this year.',
          },
          {
            type: 'figure',
            media: photo('/images/projects/rocketry-airbrakes/arc.jpg', 'Nine members of the aerospace team in matching navy shirts and lanyards stand in front of the American Rocketry Challenge backdrop.', {
              caption: 'Our team at the 2025 ARC national finals in Virginia, where we placed 50th of 100.',
            }),
          },
        ],
      },
      design: {
        title: 'The airbrake',
        blocks: [
          {
            type: 'text',
            html: 'To land closer to the target altitude, the 2025–26 rocket carries airbrakes: flaps that extend from the body tube partway through the climb to add drag. The module is 3D-printed, with a servo in the lower bay driving the flaps.',
          },
          {
            type: 'figure',
            media: figure('/images/projects/rocketry-airbrakes/Airbrakes.png', 'Section view of the airbrake module in CAD: a servo in the lower bay, a linkage above it, and thin flaps sticking out through slots on both sides of the body tube, with bolts holding the bulkheads together.', {
              caption: 'Section view of the airbrake module in CAD. The servo (lower middle) drives the flaps that extend through slots in the body tube.',
            }),
          },
          {
            type: 'text',
            html: 'The flight code (<a href="https://github.com/samuel-asefa/RocketPlus">Rocket++</a>) runs on an Arduino-compatible board with a BME280 barometer and an MPU6050 accelerometer on I²C:',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Altitude comes from barometric pressure; vertical velocity comes from integrating the accelerometer.',
              'Every loop, it simulates the rest of the climb (gravity plus quadratic drag, in 0.01 s steps) to predict apogee with the brakes deployed and without them.',
              'When the predicted apogee with brakes falls to the 228.6 m (750 ft) target, it swings the servo from 0° to 90° to deploy them.',
            ],
          },
          {
            type: 'video',
            video: {
              src: '/media/video/airbrakes-bench-test.mp4',
              poster: '/media/video/airbrakes-bench-test-poster.jpg',
              width: 720,
              height: 1280,
              label: 'Bench test: a printed airbrake section on a desk; the servo turns and the flaps slide out through slots in the tube.',
              caption: 'Bench test of the printed airbrake section: the servo turns and the flaps slide out through the body tube (4 seconds).',
            },
            beside: photo('/images/projects/rocketry-airbrakes/OriginalAirbrakesCircuit.jpeg', 'A breadboard on a white table with a small purple microcontroller board, an MPU-6050 sensor board, a second purple sensor board, and many colored jumper wires, connected by a blue USB cable.', {
              caption: 'The first airbrake circuit on a breadboard: a microcontroller with an MPU-6050 (right) and a second sensor board. The flight version moved to custom wiring and a printed circuit board.',
            }),
          },
        ],
      },
      process: {
        title: 'Three seasons of rockets',
        blocks: [
          {
            type: 'steps',
            steps: [
              { label: 'National finals', date: '2024–25', html: 'The team qualified for the ARC national finals (top 100 of 1,001 entries) and placed 50th in Virginia.' },
              { label: 'Airbrake rocket', date: '2025–26', html: 'A new rocket with the airbrake module, flown at launches on grass and on snow.' },
              { label: 'This year’s rocket', date: '2026–27', html: 'A new red-and-tan rocket, modeled in CAD and assembled.' },
            ],
          },
          {
            type: 'figure',
            media: figure('/images/projects/rocketry-airbrakes/LastYearRocketCAD.png', 'Side view CAD of the 2025–26 rocket: a blue nose cone, a gray body tube with a mechanism bay in the middle where small flaps stick out, and blue fins at the tail.', {
              caption: 'The 2025–26 rocket in CAD. The airbrake bay is in the middle of the body tube.',
            }),
          },
          {
            type: 'video',
            video: {
              src: '/media/video/rocket-launch-2025-26.mp4',
              poster: '/media/video/rocket-launch-2025-26-poster.jpg',
              width: 720,
              height: 1280,
              label: 'A rocket on a launch rail in a grassy field lifts off with a smoke trail and climbs out of frame.',
              caption: 'Launch of the 2025–26 rocket from a grassy field (6 seconds).',
            },
          },
          {
            type: 'figure',
            media: figure('/images/projects/rocketry-airbrakes/ThisYearRocketCAD.png', 'Side view CAD of the 2026–27 rocket: a gold nose cone, a copper-colored body with a mechanism bay in the middle, and gold fins at the tail.', {
              caption: 'This year’s (2026–27) rocket in CAD.',
            }),
          },
          {
            type: 'figures',
            media: [
              photo('/images/projects/rocketry-airbrakes/ThisYearRocket.png', 'A tall red rocket with tan nose cone, coupler, and fins standing upright in a room, next to a desk with a monitor and a cordless drill.', {
                caption: 'The 2026–27 rocket assembled.',
                focus: '50% 40%',
              }),
              photo('/images/projects/rocketry-airbrakes/ThisYearTeamAndRocket.jpeg', 'Nine students stand behind a table with a South Brunswick Aerospace Club banner in a park, with a red rocket and two white model rockets standing on the table.', {
                caption: 'This year’s club members with the new rocket.',
                focus: '50% 40%',
              }),
            ],
          },
        ],
      },
      evidence: {
        title: 'Printed parts',
        blocks: [
          {
            type: 'text',
            html: 'I designed and 3D-printed more than 20 rocket components, including fin cans, transition pieces, and airbrake parts, and ran finite element analysis (FEA) and computational fluid dynamics (CFD) on the designs.',
          },
          {
            type: 'figures',
            media: [
              figure('/images/projects/rocketry-airbrakes/FinCan.png', 'CAD render of a blue fin can: a short tube with four swept fins, cutouts in the wall, and a threaded ring inside.', {
                caption: 'A fin can in CAD.',
              }),
              photo('/images/projects/rocketry-airbrakes/Prints.png', '3D-printed blue parts laid out on a quilt: two body-tube sections, a finned section, two slotted discs, four small flaps, a grid plate, a square frame, and two cross-shaped brackets.', {
                caption: 'Printed rocket parts laid out before assembly.',
              }),
            ],
          },
        ],
      },
      reflection: {
        title: 'What’s next for the flight code',
        blocks: [
          {
            type: 'text',
            html: 'From the planned updates in the Rocket++ README:',
          },
          {
            type: 'list',
            items: [
              'Kalman filtering for a smoother velocity estimate (the current velocity is integrated from the accelerometer alone).',
              'Logging to flash memory instead of only over serial.',
              'A deployment override switch and fallback thresholds for manual deployment.',
            ],
          },
          {
            type: 'text',
            html: 'The drag and mass constants in the public code are placeholders that have to be set for each rocket.',
          },
        ],
      },
    },
    technologies: ['C++', 'Arduino', 'BME280', 'MPU6050', 'CAD', '3D printing', 'FEA and CFD'],
    links: [
      { label: 'Airbrake flight code (Rocket++)', href: 'https://github.com/samuel-asefa/RocketPlus', kind: 'code' },
      { label: 'SBHS Aerospace Club', href: 'https://sbaerospace.vercel.app/', kind: 'site' },
    ],
    related: ['ndvi-payload', 'circuitspace'],
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
      'DexArm is VividSense’s low-cost, modular prosthetic arm, meant to restore everyday functions such as gripping, lifting, and releasing objects. I helped build it as VividSense’s Head of Engineering. It won first place at LaunchSB in April 2026, out of more than 40 teams.',
    role: 'Head of Engineering, VividSense',
    team: 'VividSense',
    cover: photo(
      '/images/projects/dexarm/dexarm.png',
      'The DexArm prosthetic arm in black, standing upright with its palm open and fingers raised, against a dark gray backdrop.',
      { caption: 'DexArm, VividSense’s prosthetic arm.' },
    ),
    gallery: [
      photo(
        '/images/projects/dexarm/dexarm.jpg',
        'An early DexArm prototype against a dark blue backdrop: cardboard fingers and palm, with small servos and wiring held in the palm with blue tape and a power cable leading out the side.',
        { caption: 'An early DexArm prototype: cardboard fingers, with servos and wiring taped into the palm.' },
      ),
    ],
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
    role: 'Head of Engineering, VividSense',
    team: 'VividSense',
    cover: photo(
      '/images/projects/surroundscanner/surroundscanner.png',
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
    role: 'Designer and Developer',
    team: 'Solo',
    featured: 2,
    cover: screenshot(
      '/images/projects/roboroute/roboroute.png',
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
    related: ['push-back-robot'],
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
    role: 'Designer and Developer',
    team: 'Solo',
    cover: screenshot(
      '/images/projects/sciolytics/sciolytics.png',
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
    role: 'Designer and Developer',
    team: 'Solo',
    cover: screenshot(
      '/images/projects/circuitspace/circuit-space.png',
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
    role: 'Designer and Developer',
    team: 'Solo',
    cover: screenshot(
      '/images/projects/amharicquest/amharic-quest.png',
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
    slug: 'mathify',
    title: 'Mathify',
    line: 'Timed practice for the New Jersey Math League, with a large question bank.',
    category: 'software',
    tags: ['Web app', 'Education'],
    depth: 'entry',
    dates: 'Mar 2025 – 2026',
    start: '2025-03',
    team: 'Solo',
    cover: screenshot('/images/projects/mathify/mathify.png', 'Mathify’s practice screen: a timer at 04:39, a question, and five answer choices.'),
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
    cover: screenshot('/images/projects/studently/studently.png', 'Studently’s two-panel layout: color-coded categories on the left, a task list on the right.'),
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
    dates: 'May 2026 – present',
    start: '2026-05',
    status: 'Preprint (working paper)',
    summary:
      'Low-cost robots localize with sensors that fail in ordinary ways. I paired an Extended Kalman Filter with a small neural network that estimates, at every step, how much to trust each sensor. In 500 simulated Monte Carlo trials under severe sensor degradation, it reduced localization RMSE by 66.2% compared with a standard EKF.',
    role: 'First Author; wrote the simulation, training, and figure code',
    team: 'With Rohan Kunala',
    mentor: { name: 'Arav Pyati', href: 'https://www.linkedin.com/in/aravpyati', school: 'Cornell University', logo: '/images/schools/cornell.png' },
    commitment: '2–4 hours a week',
    collaborators: ['Rohan Kunala', 'Arav Pyati'],
    featured: 3,
    cover: figure(
      '/images/projects/adaptive-sensor-fusion/fig_rmse_comparison.png',
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
        statusNote: 'Working paper, version 1.',
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
              figure('/images/projects/adaptive-sensor-fusion/fig_camera_failure_error.png', 'Line chart of position error in meters over 15 seconds for standard EKF, adaptive EKF, and proposed ML fusion, with a shaded camera-failure window from 5 to 12 seconds.', {
                caption: 'One run with a camera failure injected from 5 to 12 s (shaded). The three filters track closely during the failure, with the proposed fusion slightly lowest at 12 s; after the camera returns, the adaptive EKF recovers furthest.',
              }),
              figure('/images/projects/adaptive-sensor-fusion/fig_wheel_slip_error.png', 'Line chart of position error in meters over 15 seconds for standard EKF and proposed ML fusion, with a shaded wheel-slip window from 5 to 10 seconds.', {
                caption: 'One run with wheel slip injected from 5 to 10 s. Here the proposed fusion’s error stays slightly above the standard EKF’s throughout.',
              }),
            ],
          },
          {
            type: 'figures',
            media: [
              figure('/images/projects/adaptive-sensor-fusion/fig_camera_failure_confidence.png', 'Line chart of predicted confidence from 0 to 1 for encoder, IMU, ultrasonic, and camera over 15 seconds, with the failure window shaded.', {
                caption: 'The network’s confidence in each sensor during the camera-failure run. Encoder confidence stays near 1; IMU confidence rises and falls inside the window. Camera confidence is already near zero from about 2 s, before the failure begins.',
              }),
              figure('/images/projects/adaptive-sensor-fusion/fig_training_curves.png', 'Log-scale line chart of training and validation mean squared error over 30 epochs; both fall steeply then flatten.', {
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
      { label: 'Preprint', href: 'https://doi.org/10.33774/coe-2026-n3z2n', kind: 'paper', note: 'working paper' },
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
    dates: 'Oct 2024 – present',
    start: '2024-10',
    status: 'Computational study. Accepted MIT URTC lightning talk, 2026',
    summary:
      'Biomass cookstove exhaust carries formaldehyde and acetaldehyde. Aminosilica sorbents can capture them, but a filter only stays useful if its sorbent can be regenerated with heat, which is hard to supply where these stoves are used. With Rishabh Jitender, I modeled whether a thermoelectric generator running off the stove’s own exhaust could provide that heat. Across 1,500 simulated cases, capture stayed near 100%, and none fully regenerated the bed.',
    role: 'Lead Author (2026 study); Sole Author (2025 preprint)',
    mentor: { name: 'Rishabh Jitender', href: 'https://www.linkedin.com/in/rishabh-jitender', school: 'Georgia Institute of Technology', logo: '/images/schools/georgia-tech.png' },
    commitment: '2–4 hours a week, 20 weeks a year',
    collaborators: ['Rishabh Jitender'],
    cover: figure(
      '/images/projects/cookstove-thermoelectric-regeneration/teg-cycle-traces-urtc.jpg',
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
      { title: 'MIT URTC lightning talk, accepted', scope: 'team', detail: 'MIT Undergraduate Research Technology Conference', date: 'Sep 2026' },
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
        statusNote: 'Working paper, version 1. An earlier model with different assumptions.',
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
            media: figure('/images/projects/cookstove-thermoelectric-regeneration/teg-system-concept-urtc.jpg', 'Four-panel schematic. (a) Stack: cookstove exhaust, TEG module (Bi2Te3), resistive heater, amine-functionalized porous sorbent bed with gas flow. (b) Imine-formation reactions for formaldehyde and acetaldehyde, and thermal regeneration. (c) One-dimensional computational domain with convection and axial dispersion. (d) Cycle timeline: adsorption, heating, desorption, cooling.', {
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
            media: figure('/images/projects/cookstove-thermoelectric-regeneration/teg_thermal_response.jpg', 'Four panels. (a) Heat map of bed temperature over position and time, ranging only from 25.000 to 25.022 °C. (b) TEG matched-load power rising with temperature difference to about 6 W at 300 K. (c) Mean bed temperature rising linearly by about 0.023 °C over six minutes. (d) Regeneration completeness versus regeneration temperature for 5- and 10-minute windows, approaching 100% only near 140 °C.', {
              caption: 'Why heating fell short. In this run the bed warms by about 0.02 °C over six minutes (a, c), while regeneration only approaches completion near 140 °C (d). Matched-load TEG power grows with the temperature difference across the module (b).',
              source: 'Figure 4, MIT URTC slides',
            }),
          },
          {
            type: 'figure',
            media: figure('/images/projects/cookstove-thermoelectric-regeneration/teg_sweep_histograms.png', 'Four histograms. (a) Formaldehyde capture efficiency, all at 1.000. (b) TEG power in watts, median 0.027, 5th percentile 0.015, 95th percentile 0.046. (c) Regeneration completeness from 0 to 1, median 0.237, with peaks at both ends. (d) Pressure drop, all at 16.432 Pa.', {
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
      { label: 'Lightning-talk slides (PDF)', href: '/images/projects/cookstove-thermoelectric-regeneration/thermoelectric-mit-urtc-presentation.pdf', kind: 'slides' },
      { label: 'Slides on Zenodo', href: 'https://doi.org/10.5281/zenodo.23328194', kind: 'slides' },
      {
        label: 'Model code',
        href: 'https://github.com/samuel-asefa/Thermoelectric-Assisted-Regeneration-of-Aminosilica-Sorbents-for-Cookstove-Aldehyde-Capture',
        kind: 'code',
      },
      { label: '2025 preprint', href: 'https://doi.org/10.33774/coe-2025-mj9mb', kind: 'paper', note: 'working paper' },
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
    dates: 'May 2026 – present',
    start: '2026-05',
    status: 'Preprint (working paper, v2)',
    summary:
      'High-fidelity flow simulation is too slow to repeat for every small change in geometry. This model reads a 30-step history from 12 sparse velocity sensors with a SHRED-style LSTM encoder, conditions a DeepONet on the geometry and flow parameters, and predicts velocity and speed anywhere in the domain. On 20 geometry cases it never saw in training, its mean relative L₂ error was 0.047 (median 0.045).',
    role: 'Co-Author (second of three)',
    team: 'With Rohan Kunala',
    mentor: { name: 'Irenov Joel', href: 'https://www.linkedin.com/in/irenovjoel', school: 'The University of Texas at Austin', logo: '/images/schools/ut-austin.png' },
    commitment: '2–4 hours a week',
    collaborators: ['Rohan Kunala', 'Irenov Joel'],
    cover: figure(
      '/images/projects/hybrid-flow-reconstruction/hybrid_reconstruction_example.png',
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
        statusNote: 'Working paper, version 2 (v1 posted 20 Jul 2026).',
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
            media: figure('/images/projects/hybrid-flow-reconstruction/hybrid_architecture.png', 'Block diagram. Top row: 12 sensors by 30 time steps, position-aware sensor encoder, SHRED-style LSTM encoder, temporal latent z_T. Bottom row: geometry and flow parameters, geometry encoder, geometry latent z_G. Both latents feed a fusion block and DeepONet branch coefficients; query coordinates pass through Fourier features and the DeepONet trunk; outputs are u, v, and s.', {
              caption: 'Sensor history and geometry are encoded separately, fused into the DeepONet branch, and evaluated at any query point by the trunk. The model predicts velocity components and speed together, and enforces consistency between predicted speed and the magnitude of the predicted velocity.',
              source: 'Figure from the preprint',
            }),
          },
          {
            type: 'figure',
            media: figure('/images/projects/hybrid-flow-reconstruction/sensor_layout_example.png', 'Heat map of speed magnitude for an unseen finite-core vortex-wake field over x from 0 to 4 and y from −1 to 1, with 12 numbered sensor positions.', {
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
            ],
          },
        ],
      },
    },
    technologies: ['Python', 'PyTorch', 'DeepONet', 'LSTM'],
    links: [
      { label: 'Preprint', href: 'https://doi.org/10.33774/coe-2026-6h7gp-v2', kind: 'paper', note: 'working paper' },
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
    cover: screenshot('/images/projects/life-expectancy-model/life-expectancy-prediction-model.jpg', 'Output from the life expectancy model notebook.'),
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
    cover: screenshot('/images/projects/global-trade-model/global-trade-prediction-model.png', 'Output from the global trade model.'),
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

