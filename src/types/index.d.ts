declare global {
	interface User {
		randomIdentifier: string;
		fullName: string;
		address: string;
		phone: string;
		errorsFields?: string[];
	}

	interface UserField {
		[key: string]: string;
	}
}

export {};
