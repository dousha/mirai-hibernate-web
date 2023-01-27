export function getAvatarImagePath(id: number | string, spec: number = 640) {
	return `https://q.qlogo.cn/g?b=qq&nk=${id}&s=${spec}`;
}

export function getGroupAvatarImagePath(id: number | string, spec: number = 640) {
	return `http://p.qlogo.cn/gh/${id}/${id}/${spec}`;
}
