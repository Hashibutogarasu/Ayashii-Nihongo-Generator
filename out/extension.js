"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const vscode_1 = require("vscode");
const funcs_1 = require("./util/funcs");
const { generate } = require('cjp');
function activate(context) {
    const jpController = new JPController();
    let disposableReplace = vscode.commands.registerCommand("ajg.gen", () => {
        jpController.replaceJapanese();
    });
    context.subscriptions.push(jpController);
    context.subscriptions.push(disposableReplace);
}
exports.activate = activate;
class JPController {
    constructor() {
        let subscriptions = [];
        this._disposable = vscode.Disposable.from(...subscriptions);
    }
    async replaceJapanese() {
        const editor = (0, funcs_1.getActiveEditor)();
        if (editor === null) {
            return;
        }
        ;
        const doc = editor.document;
        const selection = editor.selection;
        const url = (0, funcs_1.getSelectChars)(doc, selection);
        if (url === null) {
            return;
        }
        ;
        var texts = generate(url);
        if (texts.length === 1) {
            vscode.window.showInformationMessage(texts);
            return;
        }
        const snippets = new vscode_1.SnippetString();
        snippets.appendText(texts);
        editor.insertSnippet(snippets);
    }
    dispose() {
        this._disposable.dispose();
    }
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map