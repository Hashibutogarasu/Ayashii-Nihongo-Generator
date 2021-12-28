"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectChars = exports.getActiveEditor = void 0;
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
    return doc.getText(selection);
}
exports.getSelectChars = getSelectChars;
//# sourceMappingURL=funcs.js.map