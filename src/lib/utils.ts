import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Faker, allLocales } from '@faker-js/faker';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const initializeFaker = (locale: keyof typeof allLocales, seed: number) => {
	const faker = new Faker({
		locale: allLocales[locale],
	});
	faker.seed(seed);
	return faker;
};

const formatAddress = (locale: string, faker: Faker) => {
	const street = faker.location.streetAddress();
	const city = faker.location.city();
	const state = faker.location.state();
	const country = faker.location.country();
	const zipCode = faker.location.zipCode();

	switch (locale) {
		case 'mx': // Mexico
			return `${street}, ${zipCode} ${city}, ${state}, ${country}`;

		case 'ru': // Russia
			return `${zipCode}, ${country}, ${state}, ${city}, ${street}`;

		case 'fr': // France
			return `${street}, ${zipCode} ${city}, ${country}`;

		default: // Fallback to default
			return `${street}, ${city}, ${state}, ${country}, ${zipCode}`;
	}
};

interface User {
	randomIdentifier: string;
	fullName: string;
	address: string;
	phone: string;
	errorsFields: string[];
}

const createRandomUser = (faker: Faker, locale: string): User => {
	const randomIdentifier = faker.string.uuid();
	const fullName = faker.person.fullName();
	const address = formatAddress(locale, faker);
	const phone = faker.phone.number({ style: 'national' });

	return {
		randomIdentifier,
		fullName,
		address,
		phone,
		errorsFields: [],
	};
};

export const introduceErrors = (
	str: string,
	errorRate: number,
	locale: string
) => {
	const chars = str.split('');
	const wholeErrors = Math.floor(errorRate);
	const fractionalError = errorRate - wholeErrors;

	const errorIndices = new Set();

	// Randomly select indices for whole errors
	while (errorIndices.size < wholeErrors) {
		errorIndices.add(Math.floor(Math.random() * chars.length));
	}

	let errorChars;
	switch (locale) {
		case 'ru':
			errorChars = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
			break;
		case 'fr':
			errorChars =
				'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZàâäéèêëîïôùûüÿçÀÂÄÉÈÊËÎÏÔÙÛÜŸÇ';
			break;
		default:
			errorChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			break;
	}
	const result = chars
		.map((char, index) => {
			if (errorIndices.has(index)) {
				// Randomly choose error type: delete, add, or swap with equal probability
				const errorType = Math.floor(Math.random() * 3);

				if (errorType === 0) {
					// Delete character
					return null; // Return null to indicate removal
				} else if (errorType === 1) {
					// Add character
					return [
						char, // Keep the current character
						errorChars[Math.floor(Math.random() * errorChars.length)], // Add new random character
					];
				} else if (errorType === 2 && index < chars.length - 1) {
					// Swap with next character
					const nextChar = chars[index + 1];
					return [nextChar, char];
				}
			}
			return char;
		})
		.flat()
		.filter(char => char !== null);

	// Handle fractional errors (50% chance for one additional error)
	if (Math.random() < fractionalError) {
		const index = Math.floor(Math.random() * chars.length);
		const errorType = Math.floor(Math.random() * 3);
		if (errorType === 0) {
			// Delete a random character
			result.splice(index, 1);
		} else if (errorType === 1) {
			// Add a random character
			result.splice(
				index,
				0,
				errorChars[Math.floor(Math.random() * errorChars.length)]
			);
		} else if (errorType === 2 && index < chars.length - 1) {
			// Swap with next character
			[result[index], result[index + 1]] = [result[index + 1], result[index]];
		}
	}

	return result.join('');
};

// Data generation function
export const generateUserData = (
	locale: keyof typeof allLocales,
	errorCount: number,
	seedValue: number,
	usersCount: number = 20
) => {
	// Initialize Faker with the specified locale and seed
	const faker = initializeFaker(locale, seedValue);
	const data = [];

	// Generate all users first
	for (let i = 1; i <= usersCount; i++) {
		const user: User = createRandomUser(faker, locale);
		data.push(user);
	}

	// Apply errors to the generated users
	data.forEach((user: User) => {
		const fields = ['fullName', 'address', 'phone'];

		// Apply errors based on the specified logic
		if (errorCount > 0) {
			// Handle integer part of error count
			const numErrors = Math.floor(errorCount); // Integer part
			const fractionalPart = errorCount % 1; // Fractional part

			// Apply the specified number of errors
			for (let i = 0; i < numErrors; i++) {
				// Randomly select a field to apply an error
				const field = fields[
					Math.floor(Math.random() * fields.length)
				] as keyof User;
				// Add the field to the errors list
				user?.errorsFields?.push(field);
				// Apply one error for example numErrors = 3, errors will be 1, 1, 1 in the fields
				(user[field] as string) = introduceErrors(
					user[field] as string,
					1,
					locale
				);
			}

			// handle fractional part (e.g., 0.5, 1.5)
			if (fractionalPart >= 0.5) {
				// Randomly select a field to apply an additional error
				const field = fields[
					Math.floor(Math.random() * fields.length)
				] as keyof User;
				// Add the field to the errors list
				user?.errorsFields?.push(field);
				// Apply one additional error
				(user[field] as string) = introduceErrors(
					user[field] as string,
					1,
					locale
				);
			}
		}
	});

	return data;
};
