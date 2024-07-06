import fs from "fs";
import path from 'path';

const packageJsonLocation = path.resolve(__dirname, "package.json");
const manifestJsonLocation = path.resolve(__dirname, "public/manifest.json");
const cracoConfigLocation = path.resolve(__dirname, "craco.config.js");
const contentScriptsDir = path.resolve(__dirname, "src/content-scripts");

verifyPackageAndManifestVersions();
verifyContentScriptRegistration();

function verifyPackageAndManifestVersions() {
    let packageData = fs.readFileSync(packageJsonLocation);
    let packageVersion = JSON.parse(packageData.toString())["version"];

    let manifestData = fs.readFileSync(manifestJsonLocation);
    let manifestVersion = JSON.parse(manifestData.toString())["version"];

    if (packageVersion !== manifestVersion) {
        let errorMessage : string = `package.json and manifest.json must have the same version. ` +
            `Current versions - package.json: ${packageVersion}, manifest.json: ${manifestVersion}. ` +
            `Did you forget to update a version?`;
        throw new Error(errorMessage);
    }
}

function verifyContentScriptRegistration() {
    let contentScriptFiles = fs.readdirSync(contentScriptsDir);
    contentScriptFiles.forEach(scriptFilename => {
        if (scriptFilename === "_utils.ts") return;
        verifyContentScriptManifestJsonRegistration(scriptFilename, manifestJsonLocation);
        verifyContentScriptCracoConfigRegistration(scriptFilename, cracoConfigLocation);
    });
}

function verifyContentScriptManifestJsonRegistration(scriptFilename: string, manifestJsonLocation: string) {
    let manifestData = fs.readFileSync(manifestJsonLocation);
    let manifestContentScriptsJson = JSON.parse(manifestData.toString())["content_scripts"];
    let isScriptRegisteredInManifest = false;
    manifestContentScriptsJson.forEach((contentScriptRegistration: ContentScriptRegistration) => {
        let scriptName = scriptFilename.slice(0,-3);
        if (contentScriptRegistration.js.includes(`./static/js/${scriptName}.js`)) {
            isScriptRegisteredInManifest = true;
        }
    });
    if (!isScriptRegisteredInManifest) {
        throw new Error (`${scriptFilename} is not registered in manifest.json`);
    }

    interface ContentScriptRegistration {
        matches: string[];
        js: string[];
        run_at: string;
    }
}

function verifyContentScriptCracoConfigRegistration(scriptFilename: string, cracoConfigLocation: string) {
    let cracoConfigString = fs.readFileSync(cracoConfigLocation).toString();
    let isScriptRegisteredInCracoConfig = false;

    let scriptName = scriptFilename.slice(0,-3);
    if (cracoConfigString.includes(scriptName) && cracoConfigString.includes(scriptFilename)) {
        isScriptRegisteredInCracoConfig = true;
    }

    if (!isScriptRegisteredInCracoConfig) {
        throw new Error (`${scriptFilename} is not registered in craco.config.js`);
    }
}