import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import * as React from 'react';

export default function MessageEntrySkeleton() {
	return (
		<Card sx={{marginBottom: '0.5em'}} id={'placeholder'}>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item>
						<Skeleton variant={'circular'} width={64} height={64}/>
					</Grid>
					<Grid item xs>
						<Grid container direction={'column'}>
							<Grid item>
								<Grid container direction={'row'}>
									<Grid item flexGrow={1}>
										<Typography>
											<Skeleton/>
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item sx={{marginLeft: '0.5em'}}>
								<Typography>
									<Skeleton/>
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
