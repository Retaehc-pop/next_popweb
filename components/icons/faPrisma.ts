
import {
  IconDefinition,
  IconName,
  IconPrefix
} from "@fortawesome/fontawesome-common-types";
import { library, dom } from "@fortawesome/fontawesome-svg-core";

export const faPrisma: IconDefinition = {
  prefix: "fab" as IconPrefix,
  iconName: "Prisma" as IconName,
  icon: [
    424,
    512,
    [],
    "e001",
    "m381.38934 405.88714-229.67062 67.92744c-7.01651 2.07778-13.74132-3.99173-12.2669-11.07217l82.04834-392.9335c1.53436-7.352147 11.69152-8.514905 14.89609-1.710173l151.9177 322.59543c2.86494 6.08949-.40357 13.26702-6.92461 15.19297zm39.38512-16.02808-175.89887-373.53306c-11.59465-21.691431-39.0351-20.904032-49.75484-2.749064l-190.77231 308.99c-5.9096786 9.63371-5.7938027 21.50903.3356409 31.01887l93.252489 144.4589c9.615412 11.46292 18.506512 16.87006 33.692012 12.37878l270.68561-80.05849c18.03265-5.40039 26.72265-22.82202 18.46027-40.50593z"
  ]
};

library.add(faPrisma);
dom.watch();