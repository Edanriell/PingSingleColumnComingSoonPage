type createRefParameters = {
	refs: any;
	ref: any;
	index: number;
};

export const createRef = ({ refs, ref, index }: createRefParameters) => {
	refs[index] = ref;
};
