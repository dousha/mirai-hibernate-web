import { Grid, Typography } from '@mui/material';
import { Face } from '@mui/icons-material';

export default function MessageLogEmpty(props: any) {
	return (<>
		<Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} height={'100%'}>
			<Grid item xs/>
			<Grid item xs>
				<Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
					<Grid item>
						<Typography variant={'h1'}>
							<Face fontSize={'inherit'}/>
						</Typography>
					</Grid>
					<Grid item>
						<Typography>
							{'从左侧选择一个聊天以查看记录'}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs/>
		</Grid>
	</>);
}
