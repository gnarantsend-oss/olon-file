/* spatial-ui.js — Entry point
   Desktop 3D hover + TV D-pad navigation */

import './tv/tv-detect.js';
import './hover-3d.js';
if (window.isTV) import('./tv/tv-dpad.js');
