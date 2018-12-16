import * as React from "react"

import { storiesOf } from "@storybook/react"
import { Spinner } from "."

storiesOf("Spinner", module).add("basic example", () => <Spinner size={4} />)
