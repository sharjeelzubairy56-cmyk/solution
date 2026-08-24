import { Sabaq } from '../types';
import { sabaqs1To5 } from './sabaq1_5';
import { sabaqs6To10 } from './sabaq6_10';
import { sabaqs11To15 } from './sabaq11_15';
import { sabaqs16To19 } from './sabaq16_19';

export const SABAQS_DATA: Sabaq[] = [
  ...sabaqs1To5,
  ...sabaqs6To10,
  ...sabaqs11To15,
  ...sabaqs16To19,
];
