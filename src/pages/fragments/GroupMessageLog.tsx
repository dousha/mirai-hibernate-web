import { useOutletContext, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CircularProgress, FormControl, Grid, TextField } from '@mui/material';
import { useMiraiClient } from '../../components/context/MiraiClientContext';
import React, { useEffect, useState } from 'react';
import { toUnixTimestamp } from '../../util/DateTimeUtil';
import MessageEntrySkeleton from '../../components/MessageEntrySkeleton';
import { GroupMessageFilterOptions, MessageRecord } from '../../types';
import MessageEntry from '../../components/MessageEntry';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function GroupMessageLog(props: any) {
	const {botId} = useOutletContext<{ botId: number }>();
	const {groupId} = useParams();
	const mirai = useMiraiClient();
	const now = toUnixTimestamp(new Date());
	const [startTime, setStartTime] = useState(now - 24 * 60 * 60);
	const [endTime, setEndTime] = useState(now);
	const [messages, setMessages] = useState<MessageRecord[]>([]);
	const [loading, setLoading] = useState(true);
	const [displayStartTime, setDisplayStartTime] = useState(startTime);
	const [displayEndTime, setDisplayEndTime] = useState(endTime);

	useEffect(() => {
		setLoading(true);
		const criteria: GroupMessageFilterOptions = {
			bot: botId,
			group: Number(groupId),
			from: startTime,
			to: endTime,
		};
		mirai.fetchMessages(criteria).then(result => {
			setMessages(result);
		}).catch(console.error).finally(() => {
			setLoading(false);
		});
	}, [startTime, endTime, botId, groupId]);

	const loadingPlaceholder = (<>
		<Grid item>
			<MessageEntrySkeleton/>
		</Grid>
	</>);

	const toMessageCard = function (msg: MessageRecord, key: any) {
		return (<>
			<Grid item key={key}>
				<MessageEntry {...msg} />
			</Grid>
		</>);
	};

	return (<>
		<Grid container direction={'column'} alignItems={'stretch'} padding={'0.5rem'} spacing={1}>
			<Grid item key={-1}>
				<Card>
					<CardContent>
						<Grid container direction={'row'} spacing={1} alignItems={'center'}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<Grid item xs={4}>
									<DateTimePicker
										value={displayStartTime * 1000}
										onChange={(event) => {
											if (event == null) {
												return;
											}

											const date = event as any as Date;
											const startingTime = toUnixTimestamp(date);
											console.log(startingTime);
											if (startingTime >= displayEndTime) {
												const newEndTime = startingTime + 60 * 60;
												setDisplayStartTime(startingTime);
												setDisplayEndTime(newEndTime);
											} else {
												setDisplayStartTime(toUnixTimestamp(date));
											}
										}}
										onAccept={() => {
											setStartTime(displayStartTime);
											setEndTime(displayEndTime);
										}}
										renderInput={(value) => {
											return (
												<FormControl fullWidth>
													<TextField {...value} label={'开始时间'}/>
												</FormControl>
											);
										}}/>
								</Grid>
								<Grid item xs={4}>
									<DateTimePicker
										value={displayEndTime * 1000}
										onChange={(event) => {
											if (event == null) {
												return;
											}

											const date = event as any as Date;
											const endingTime = toUnixTimestamp(date);
											console.log(endingTime);
											if (endingTime <= displayStartTime) {
												const newStartTime = displayStartTime - 60 * 60;
												setDisplayEndTime(endingTime);
												setDisplayStartTime(newStartTime);
											} else {
												setDisplayEndTime(toUnixTimestamp(date));
											}
										}}
										onAccept={() => {
											setStartTime(displayStartTime);
											setEndTime(displayEndTime);
										}}
										renderInput={(value) => {
											return (
												<FormControl fullWidth>
													<TextField {...value} label={'结束时间'}/>
												</FormControl>
											);
										}}/>
								</Grid>
							</LocalizationProvider>
							<Grid item xs={1}>
								<Box sx={{position: 'relative'}}>
									<Button disabled={loading} onClick={() => {
									}}>刷新</Button>
									{
										loading && (
											<CircularProgress
												size={24}
												sx={{
													position: 'absolute',
													top: '50%',
													left: '50%',
													marginTop: '-12px',
													marginLeft: '-12px',
												}}/>
										)
									}
								</Box>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
			{loading ? loadingPlaceholder : messages.map((it, key) => toMessageCard(it, key))}
		</Grid>
	</>);
}
