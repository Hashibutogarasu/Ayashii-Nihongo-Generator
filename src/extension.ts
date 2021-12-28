// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SnippetString } from "vscode";
import { getActiveEditor, getSelectChars } from "./util/funcs";
const { generate } = require('cjp');

export function activate(context: vscode.ExtensionContext) {

	const jpController = new JPController();

	let disposableReplace = vscode.commands.registerCommand("ajg.gen", () => {
		jpController.replaceJapanese();
	});

	context.subscriptions.push(jpController);
	context.subscriptions.push(disposableReplace);
}

class JPController {
	private _disposable: vscode.Disposable;
	
	constructor () {
		let subscriptions: vscode.Disposable[] = [];
		this._disposable = vscode.Disposable.from(...subscriptions);
	}

	public async replaceJapanese() {

		const editor = getActiveEditor();
		if (editor === null) { return; };

		const doc = editor.document;

		const selection  = editor.selection;
		const url = getSelectChars(doc, selection);
		if (url === null) { return; };

		var texts = generate(url);

		if (texts.length === 1) {
			vscode.window.showInformationMessage(texts);
			return;
		}

		const snippets = new SnippetString();
    	snippets.appendText(texts);
		
		editor.insertSnippet(snippets);
	}

	dispose() {
        this._disposable.dispose();
    }
}

export function deactivate() {}