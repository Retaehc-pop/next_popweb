import {
  IconDefinition,
  IconName,
  IconPrefix
} from "@fortawesome/fontawesome-common-types";
import { library, dom } from "@fortawesome/fontawesome-svg-core";

export const faArduino: IconDefinition = {
  prefix: "fab" as IconPrefix,
  iconName: "Cplusplus" as IconName,
  icon: [
    500,
    500,
    [],
    "e001",
    "M84 485l-6.4-23H37l-6.6 23H8.7l34.4-116h30.6l34.4 116zm-26.4-95l-15.3 54.1h30.4zM180 485s-11.7-27.6-18.3-41c-3.83-5.76-11.4-8.02-18-7.1-.6 15.7-.48 48.1-.48 48.1h-21.9V369s33-.97 49.4 1.2c34.7 3.92 37 54.4 2.13 59.7 6.54 2.6 10.5 8.65 13.3 14.8l17.5 36.2c1.23 2.48 1.2 4.4-2.34 4.38zm-5.42-82.1c-.1-17.9-18-15.9-31.3-16v32.8c15.7.53 31-1.07 31.3-16.8zM302 455c-10.6 24.5-33.8 30.2-55.8 29.8h-26.9v-116l40.9.2c50.6 1.65 52.4 56.2 41.7 86.4zm-28-61.3c-10.2-8.76-21.4-6.97-32.8-6.97v79.7c10 0 20.9.8 29.4-5.4 18.1-11.4 15.8-54.6 3.35-67.3zM407 442c2.17 58.6-81.5 58.4-84 12.7-1.53-14-.27-28-.68-42v-44.2h21.9l.4 83c2.57 22.9 33 20.9 37.6 8.2 4.66-10.1 2.5-21.5 2.98-32.3v-58.9h21.9V442zm21-56v-17.9h73.5V386h-25.6v80.4h25.6v18.1H428v-18.1h25.6V386zm155 99l-37.6-84.4V485h-19.9V369h26.9l37.4 83.6c.1-6 .04-83.6.04-83.6h19.9v116zm117-10c-24.3 20.9-66.7 16.3-75.1-24.9-11.5-62.6 22.4-98.6 69.6-77.6 29 16.3 27.4 83.4 5.5 103zm-29.3-88.7c-20.7-.55-23.7 20.6-24.5 30.8-.17 19.3-1.88 51.4 24.9 50 8.3 0 15.5-6.02 18.2-13.7 5.45-12.1 9.56-68.1-18.6-67.1zM676 13.4v2.34h5.15v13.6h2.66v-13.6h5.2V13.4zm14.8 0v15.9h2.43V15.7l4.3 13.6h2.4l4.1-13.3v13.3h2.4V13.4h-3.8l-3.9 12.7-4-12.7z m486 165h100m-51-50v100 m118 165h120"
  ]
};

library.add(faArduino);
dom.watch();

