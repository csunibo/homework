import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handler } from './build/handler.js';

const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());

const apiEndpoint = '/api';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bansFilePath = path.join(__dirname, 'static', 'bans.json');

function readBans() {
	const data = fs.readFileSync(bansFilePath, 'utf8');
	return JSON.parse(data);
}

function writeBans(bans) {
	fs.writeFileSync(bansFilePath, JSON.stringify(bans, null, 2), 'utf8');
}

app.get(apiEndpoint + '/getBans', (req, res) => {
	try {
		const bans = readBans();
		res.json(bans);
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Failed to read bans' });
	}
});

app.post(apiEndpoint + '/addBan', (req, res) => {
	try {
		const newBan = { ...req.body, approved: 0 };
		const bans = readBans();
		bans.push(newBan);
		writeBans(bans);
		res.json({ message: 'Ban added successfully', ban: newBan });
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Failed to add ban' });
	}
});

app.post(apiEndpoint + '/approveBan', (req, res) => {
	try {
		const { name, description } = req.body;
		const bans = readBans();
		const banIndex = bans.findIndex((ban) => ban.name === name && ban.description === description);

		if (banIndex !== -1) {
			bans[banIndex].approved += 1;
			writeBans(bans);
			res.json({ message: 'Ban approved successfully', ban: bans[banIndex] });
		} else {
			res.status(404).json({ error: 'Ban not found' });
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Failed to approve ban' });
	}
});

app.post(apiEndpoint + '/rejectBan', (req, res) => {
	try {
		const { name, description } = req.body;
		const bans = readBans();
		const updatedBans = bans.filter(
			(ban) => !(ban.name === name && ban.description === description)
		);
		const banIndex = bans.findIndex((ban) => ban.name === name && ban.description === description);

		if (banIndex !== -1) {
			bans[banIndex].approved -= 1;
			writeBans(bans);
			res.json({ message: 'Ban disapproved successfully', ban: bans[banIndex] });
		} else if (bans.length !== updatedBans.length && bans[banIndex].approved <= -5) {
			writeBans(updatedBans);
			res.json({ message: 'Ban rejected successfully' });
		} else {
			res.status(404).json({ error: 'Ban not found' });
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Failed to reject ban' });
	}
});
app.use(handler);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
