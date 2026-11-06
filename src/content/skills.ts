/** Skills grid on the homepage. Icons live in public/images. */
export interface Skill {
  name: string;
  icon: string;
}

export const skills: { title: string; items: Skill[] }[] = [
  {
    title: 'Programming Languages',
    items: [
      { name: 'HTML', icon: '/images/html.png' },
      { name: 'CSS', icon: '/images/css.png' },
      { name: 'JavaScript', icon: '/images/javascript.png' },
      { name: 'TypeScript', icon: '/images/typescript.svg' },
      { name: 'Python', icon: '/images/python.png' },
      { name: 'Java', icon: '/images/java.png' },
      { name: 'C++', icon: '/images/cpp.png' },
      { name: 'C#', icon: '/images/csharp.png' },
      { name: 'Swift', icon: '/images/swift.png' },
      { name: 'Go', icon: '/images/go.png' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React', icon: '/images/react.png' },
      { name: 'Node.js', icon: '/images/node.png' },
      { name: 'Tailwind', icon: '/images/tailwind.png' },
      { name: 'Flask', icon: '/images/flask.png' },
      { name: 'Pandas', icon: '/images/pandas.png' },
      { name: 'Flutter', icon: '/images/flutter.png' },
      { name: 'Unity', icon: '/images/unity.png' },
    ],
  },
  {
    title: 'Tools & Technologies',
    items: [
      { name: 'Firebase', icon: '/images/firebase.png' },
      { name: 'Arduino', icon: '/images/arduino.png' },
      { name: 'VEX V5', icon: '/images/vexicon.png' },
      { name: 'Android Studio', icon: '/images/androidstudio.png' },
      { name: 'Fusion 360', icon: '/images/fusion.png' },
      { name: 'Inventor', icon: '/images/inventor.png' },
      { name: 'Onshape', icon: '/images/onshape.png' },
      { name: 'COMSOL', icon: '/images/comsol.png' },
      { name: '3D Printing', icon: '/images/3dprint.png' },
    ],
  },
];
