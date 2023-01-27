import {
	Avatar,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Skeleton,
	Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getAvatarImagePath, getGroupAvatarImagePath } from '../util/ServerPathUtil';
import { useEffect, useState } from 'react';
import { GroupInfo } from '../logic/model/GroupInfo';
import AccountInfo from '../logic/model/AccountInfo';
import { useMiraiClient } from '../components/context/MiraiClientContext';

export default function MessageLogPage(props: any) {
	const {botId} = useParams();
	const client = useMiraiClient();

	const [loading, setLoading] = useState(true);
	const [groups, setGroups] = useState<GroupInfo[]>([]);
	const [contacts, setContacts] = useState<AccountInfo[]>([]);
	const [loadCounter, setLoadCounter] = useState(0);

	const generateAccountInfoListItem = function (info: AccountInfo, key: any) {
		return (<ListItem key={key}>
			<ListItemAvatar>
				<Avatar src={getAvatarImagePath(info.id)}>
					{info.nickname}
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={info.nickname} secondary={info.id}/>
		</ListItem>);
	};

	const generateGroupInfoListItem = function (info: GroupInfo, key: any) {
		return (<ListItem key={key}>
			<ListItemAvatar>
				<Avatar src={getGroupAvatarImagePath(info.id)}>
					{info.nickname}
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={info.nickname} secondary={info.id}/>
		</ListItem>);
	};

	useEffect(() => {
		if (botId == null || botId.trim().length < 1) {
			setLoading(false);
			return;
		}

		const actualBotId = Number(botId);
		const groupsAsync = client.fetchGroups(actualBotId);
		const contactsAsync = client.fetchUsers(actualBotId);

		Promise.all([groupsAsync, contactsAsync]).then(results => {
			setGroups(results[0]);
			setContacts(results[1]);
		}).catch(console.error).finally(() => {
			setLoading(false);
		});
	}, [loadCounter]);

	const loadingState = (<>
		<ListItem>
			<ListItemAvatar>
				<Avatar/>
			</ListItemAvatar>
			<ListItemText>
				<Skeleton/>
			</ListItemText>
		</ListItem>
	</>);

	return (<>
		<Grid container alignItems={'stretch'} flexGrow={1}>
			<Grid item>
				<List>
					<ListItem>
						<ListItemAvatar>
							<Avatar src={getAvatarImagePath(botId!!)}/>
						</ListItemAvatar>
						<ListItemText primary={botId}/>
					</ListItem>
					<Divider/>
					{loading ? loadingState : groups.map((it, key) => generateGroupInfoListItem(it, key))}
				</List>
			</Grid>
			<Grid item xs>
				<Paper elevation={0}>
					<Typography>{botId}</Typography>
				</Paper>
			</Grid>
		</Grid>
	</>);
}
