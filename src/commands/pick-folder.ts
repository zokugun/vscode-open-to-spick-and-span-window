import path from 'path';
import vscode from 'vscode';

export async function pickFolder(): Promise<void> {
	const fileName = vscode.window.activeTextEditor?.document.fileName;

	if(!fileName) {
		return;
	}

	const quickPickItems: vscode.QuickPickItem[] = [];

	let folderPath = path.dirname(fileName);

	quickPickItems.push({
		label: folderPath,
		picked: true,
	});

	for(;;) {
		const parent = path.dirname(folderPath);

		if(parent !== folderPath && parent !== '.') {
			folderPath = parent;

			quickPickItems.push({
				label: folderPath,
			});
		}
		else {
			break;
		}
	}

	const selected = await vscode.window.showQuickPick(quickPickItems, {
		placeHolder: 'Open in New Window',
	});

	if(selected) {
		await vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(selected.label), true);
	}
}
