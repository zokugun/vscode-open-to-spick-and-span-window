import vscode from 'vscode';

export async function openFolder(document: vscode.Uri): Promise<void> {
	const stat = await vscode.workspace.fs.stat(document);

	if(stat.type === vscode.FileType.Directory) {
		await vscode.commands.executeCommand('vscode.openFolder', document, true);
	}
	else {
		await vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.joinPath(document, '..'), true);
	}
}
