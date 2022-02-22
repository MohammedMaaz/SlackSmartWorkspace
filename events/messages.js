import hello from "../actions/hello";
// import in from "../actions/in.js";
import _in from "../actions/in";
import bolt from "../utils/bolt";

bolt.message("hello", hello);
bolt.message("in", _in)