import Axios from "axios";
import makeUpdateChecker from "./update-checker";

export default makeUpdateChecker({
  http: Axios,
});
