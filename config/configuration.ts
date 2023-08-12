import { readFileSync } from "fs";

import * as yaml from 'js-yaml'
import { join } from "path";


const CONFIG = 'config.yaml';

export default ()=>{
    return yaml.load(
        readFileSync(join(__dirname,CONFIG),'utf-8')
    ) as Record<string,any>;
}