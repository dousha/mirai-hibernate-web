import { useUserConfig } from '../components/context/UserConfigContext';
import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ConfigPage() {
	const config = useUserConfig();
	const navigate = useNavigate();

	const [backendAddress, setBackendAddress] = useState(config.getBackendAddress());

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
											{'系统配置'}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								<TextField fullWidth label={'后端地址'}
										   placeholder={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/`}
										   value={backendAddress} onChange={e => setBackendAddress(e.target.value)}/>
							</Grid>
						</Grid>
					</CardContent>
					<CardActions>
						<Grid container direction={'row-reverse'}>
							<Grid item>
								<Button onClick={() => {
									config.setBackendAddress(backendAddress);
									config.markConfigured();
									navigate('/');
								}}>{'保存'}</Button>
							</Grid>
							<Grid item>
								<Button onClick={() => {
									navigate('/');
								}}>{'取消'}</Button>
							</Grid>
						</Grid>
					</CardActions>
				</Card>
			</Grid>
			<Grid item xs/>
		</Grid>
	</>);
}
