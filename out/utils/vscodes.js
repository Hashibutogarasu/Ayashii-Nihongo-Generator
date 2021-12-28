"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSnippet = exports.getSelectChars = exports.getActiveEditor = void 0;
const vscode_1 = require("vscode");
function getActiveEditor() {
    const editor = vscode_1.window.activeTextEditor;
    if (!editor) {
        vscode_1.window.showInformationMessage("アクティブなウィンドウがありません。");
        return null;
    }
    return editor;
}
exports.getActiveEditor = getActiveEditor;
function getSelectChars(doc, selection) {
    let selectURL = "";
    const temp = doc.getText(selection);
    selectURL = temp;
    return selectURL;
}
exports.getSelectChars = getSelectChars;
function generateSnippet(titles, url) {
    const snippets = new vscode_1.SnippetString();
    snippets.appendText(`${titles}`);
    return snippets;
}
exports.generateSnippet = generateSnippet;
//# sourceMappingURL=vscodes.js.map