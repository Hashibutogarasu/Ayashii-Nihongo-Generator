import { window, TextEditor, TextDocument, Selection, SnippetString} from "vscode";

export function getActiveEditor(): TextEditor | null {
    const editor = window.activeTextEditor;
    if (!editor) {
        window.showInformationMessage("アクティブなウィンドウがありません。");
        return null;
    }
    return editor;
}

export function getSelectChars(doc: TextDocument, selection: Selection):string | null {
    let selectURL: string = "";
    return doc.getText(selection);
}