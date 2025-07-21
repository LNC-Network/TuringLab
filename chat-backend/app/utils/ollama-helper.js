import {execFile} from 'child_process';
/**
Checks ollama installation.
```javascript
CheckOllamaInstallation().then(
    isInstalled => {
        console.log(isInstalled)
    }
)
```
Returns a Promise of `true` or `false`.
*/
export function CheckOllamaInstallation() {
    return new Promise((resolve) => {
        execFile('ollama', ['-v'], (error) => {
            if(error) {
                resolve(false); // Not installed
            } else {
                resolve(true);  // Installed
            }
        });
    });
}

// import os from "os";

/**
 * Returns a json object of system info
 * ```javascript
 * {
 * cpus:[],
 * cores: [],
 * mem:[],
 * gpus:[],
 * cuda:[],
 * cuda-cores:[],
 * tpu:[],
 * tpu-cores:[],
 * gpu-mem:[]
 * }
 * ```
 */

export function SystemInfo() {
    // TODO dont use external library dont try to support other oses only windows
    // return available cpus like if there are multiple cpus or not
    // cores of each.
    // avaivle gpu what and how many gpu is availavle
    // Total memory in system
    // GPU memory
    
}
