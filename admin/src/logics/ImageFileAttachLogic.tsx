export const ImageAttachLogic = {
	attach: (ref: any, setBannerFileName: any, setBanner: any) => {
		try {
			if (ref != null) {
				// @ts-ignore
				const file = ref.current.files[0];
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = () => {
					setBanner(reader.result);
					setBannerFileName(ref.current.files[0].name);
				}
			}
		} catch {
		
		}
	},
	
}

