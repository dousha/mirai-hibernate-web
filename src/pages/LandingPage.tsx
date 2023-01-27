import { useEffect, useState } from 'react';
import { useMiraiClient } from '../components/context/MiraiClientContext';
import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Skeleton,
	Typography,
} from '@mui/material';
import AccountInfo from '../logic/model/AccountInfo';
import { getAvatarImagePath } from '../util/ServerPathUtil';
import { Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function LandingPage(props: any) {
	const client = useMiraiClient();
	const [bots, setBots] = useState<AccountInfo[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadCount, setLoadCount] = useState(0);
	const navigate = useNavigate();

	const toListItem = function (info: AccountInfo, key: any) {
		return (<ListItem key={key} disablePadding>
			<ListItemButton onClick={() => navigate(`/log/${info.id}`)}>
				<ListItemAvatar>
					<Avatar src={getAvatarImagePath(info.id)}/>
				</ListItemAvatar>
				<ListItemText primary={info.nickname} secondary={info.id}/>
			</ListItemButton>
		</ListItem>);
	};

	useEffect(() => {
		client.fetchBots().then(result => {
			setBots(result);
		}).finally(() => {
			setLoading(false);
			console.log('boop');
		});
	}, [loadCount]);

	const loadingFramework = (<>
		<List>
			<ListItem>
				<ListItemAvatar>
					<Avatar/>
				</ListItemAvatar>
				<ListItemText>
					<Skeleton/>
				</ListItemText>
			</ListItem>
		</List>
	</>);

	return (<>
		<Grid container direction={'column'} justifyContent={'center'} alignItems={'center'} flexGrow={'1'}>
			<Grid item xs/>
			<Grid item xs>
				<Card sx={{minWidth: '30vw'}}>
					<CardContent>
						<Grid container direction={'column'} spacing={2}>
							<Grid item>
								<Grid container alignItems={'center'}>
									<Grid item>
										<Typography variant={'h5'}>
											{'选择账号'}
										</Typography>
									</Grid>
									<Grid item xs/>
									<Grid item>
										<IconButton onClick={() => navigate('/config')}>
											<Settings/>
										</IconButton>
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								{loading ? loadingFramework : <List>{bots.map((it, key) => toListItem(it, key))}</List>}
							</Grid>
						</Grid>
					</CardContent>
					<CardActions>
						<Grid container direction={'row-reverse'}>
							<Grid item>
								<Button disabled={loading} onClick={() => {
									setLoadCount(loadCount + 1);
									setLoading(true);
								}}>{'刷新'}</Button>
							</Grid>
						</Grid>
					</CardActions>
				</Card>
			</Grid>
			<Grid item xs/>
		</Grid>
	</>);
}
