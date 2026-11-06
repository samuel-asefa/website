/** Skills grid on the homepage. Icons live in public/images. */
export interface Skill {
  name: string;
  icon: string;
}

export const skills: { title: string; items: Skill[] }[] = [
  {
    title: 'Programming Languages',
    items: [
      { name: 'HTML', icon: '/images/skills/html.png' },
      { name: 'CSS', icon: '/images/skills/css.png' },
      { name: 'JavaScript', icon: '/images/skills/javascript.png' },
      { name: 'TypeScript', icon: '/images/skills/typescript.svg' },
      { name: 'Python', icon: '/images/skills/python.png' },
      { name: 'Java', icon: '/images/skills/java.png' },
      { name: 'C++', icon: '/images/skills/cpp.png' },
      { name: 'C#', icon: '/images/skills/csharp.png' },
      { name: 'Swift', icon: '/images/skills/swift.png' },
      { name: 'Go', icon: '/images/skills/go.png' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React', icon: '/images/skills/react.png' },
      { name: 'Node.js', icon: '/images/skills/node.png' },
      { name: 'Tailwind', icon: '/images/skills/tailwind.png' },
      { name: 'Flask', icon: '/images/skills/flask.png' },
      { name: 'Pandas', icon: '/images/skills/pandas.png' },
      { name: 'Flutter', icon: '/images/skills/flutter.png' },
      { name: 'Unity', icon: '/images/skills/unity.png' },
    ],
  },
  {
    title: 'Tools & Technologies',
    items: [
      { name: 'Firebase', icon: '/images/skills/firebase.png' },
      { name: 'Arduino', icon: '/images/skills/arduino.png' },
      { name: 'VEX V5', icon: '/images/skills/vexicon.png' },
      { name: 'Android Studio', icon: '/images/skills/androidstudio.png' },
      { name: 'Fusion 360', icon: '/images/skills/fusion.png' },
      { name: 'Inventor', icon: '/images/skills/inventor.png' },
      { name: 'Onshape', icon: '/images/skills/onshape.png' },
      { name: 'COMSOL', icon: '/images/skills/comsol.png' },
      { name: '3D Printing', icon: '/images/skills/3dprint.png' },
    ],
  },
];
