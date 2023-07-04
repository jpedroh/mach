import { randomUUID } from "crypto";
import makeFlightDecoder from "./flight-decoder";

export default makeFlightDecoder({ uuid: () => randomUUID() });
