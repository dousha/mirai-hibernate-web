import { useContext, useEffect, useState } from 'react';
import MiraiClientContext from '../components/context/MiraiClientContext';
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

function toListItem(info: AccountInfo, key: any) {
    return (<ListItem key={key} disablePadding>
        <ListItemButton>
            <ListItemAvatar>
                <Avatar src={getAvatarImagePath(info.id)}/>
            </ListItemAvatar>
            <ListItemText>
                <Typography>{info.nickname}</Typography>
            </ListItemText>
        </ListItemButton>
    </ListItem>);
}

export default function LandingPage(props: any) {
    const client = useContext(MiraiClientContext);
    const [bots, setBots] = useState<AccountInfo[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        client.fetchBots().then(result => {
            setBots(result);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

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
                                            {'选择机器人账号'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs/>
                                    <Grid item>
                                        <IconButton>
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
                                <Button disabled={loading}>{'刷新'}</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs/>
        </Grid>
    </>);
}
