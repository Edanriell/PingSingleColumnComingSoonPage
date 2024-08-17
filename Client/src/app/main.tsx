import "./styles/styles.less";

import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import { routes } from "@pages/routes";

const root = document.getElementById("root");

render(() => <Router>{routes}</Router>, root!);
