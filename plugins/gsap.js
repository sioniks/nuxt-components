import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MorphSVGPlugin, DrawSVGPlugin, MotionPathPlugin);
// if (process.client) {
//   gsap.registerPlugin(MorphSVGPlugin, DrawSVGPlugin);
// }
