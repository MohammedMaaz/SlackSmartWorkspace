import hello from "../actions/hello";
// import in from "../actions/in.js";
import Actions from "../actions/index";
import bolt from "../utils/bolt";

bolt.message("hello", hello);
bolt.message("in", Actions.in);
